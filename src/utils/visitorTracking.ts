import { supabase } from '@/integrations/supabase/client';

interface LocationData {
  ip: string;
  country: string;
  country_code: string;
  city: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  org: string;
}

type ActivityType = 
  | 'page_view' 
  | 'contact_form' 
  | 'booking' 
  | 'pdf_download' 
  | 'review_submission'
  | 'scroll_depth'
  | 'time_on_page'
  | 'button_click'
  | 'link_click'
  | 'form_interaction'
  | 'video_play'
  | 'exit_intent';

interface VisitorActivityData {
  activity_type: ActivityType;
  related_id?: string;
  metadata?: any;
}

let cachedLocationData: LocationData | null = null;
let scrollTracked = false;
let maxScrollDepth = 0;
let pageStartTime = Date.now();
let currentPageUrl = '';

// Primary API: ipapi.co
async function fetchFromIpApi(): Promise<LocationData | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) throw new Error(`ipapi.co failed: ${response.status}`);
    
    const data = await response.json();
    if (data.error) throw new Error(data.reason || 'ipapi.co rate limited');
    
    return {
      ip: data.ip,
      country: data.country_name,
      country_code: data.country_code,
      city: data.city,
      region: data.region,
      timezone: data.timezone,
      latitude: data.latitude,
      longitude: data.longitude,
      org: data.org,
    };
  } catch (error) {
    console.warn('ipapi.co failed:', error);
    return null;
  }
}

// Fallback API: ip-api.com
async function fetchFromIpApiCom(): Promise<LocationData | null> {
  try {
    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,query', {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) throw new Error(`ip-api.com failed: ${response.status}`);
    
    const data = await response.json();
    if (data.status === 'fail') throw new Error(data.message || 'ip-api.com failed');
    
    return {
      ip: data.query,
      country: data.country,
      country_code: data.countryCode,
      city: data.city,
      region: data.regionName,
      timezone: data.timezone,
      latitude: data.lat,
      longitude: data.lon,
      org: data.isp || data.org,
    };
  } catch (error) {
    console.warn('ip-api.com failed:', error);
    return null;
  }
}

// Second fallback: ipinfo.io
async function fetchFromIpInfo(): Promise<LocationData | null> {
  try {
    const response = await fetch('https://ipinfo.io/json', {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) throw new Error(`ipinfo.io failed: ${response.status}`);
    
    const data = await response.json();
    const [lat, lon] = (data.loc || '0,0').split(',').map(Number);
    
    return {
      ip: data.ip,
      country: data.country,
      country_code: data.country,
      city: data.city,
      region: data.region,
      timezone: data.timezone,
      latitude: lat,
      longitude: lon,
      org: data.org,
    };
  } catch (error) {
    console.warn('ipinfo.io failed:', error);
    return null;
  }
}

export async function getVisitorLocation(): Promise<LocationData | null> {
  if (cachedLocationData) return cachedLocationData;

  let locationData = await fetchFromIpApi();
  if (!locationData) locationData = await fetchFromIpApiCom();
  if (!locationData) locationData = await fetchFromIpInfo();

  if (locationData) {
    cachedLocationData = locationData;
    console.log('Visitor location detected:', locationData.country, locationData.city);
  }
  
  return locationData;
}

export async function trackVisitorActivity(activityData: VisitorActivityData) {
  try {
    const locationData = await getVisitorLocation();
    
    const activityRecord = {
      activity_type: activityData.activity_type,
      visitor_ip: locationData?.ip || null,
      visitor_country: locationData?.country || null,
      visitor_country_code: locationData?.country_code || null,
      visitor_city: locationData?.city || null,
      visitor_region: locationData?.region || null,
      visitor_timezone: locationData?.timezone || null,
      visitor_latitude: locationData?.latitude || null,
      visitor_longitude: locationData?.longitude || null,
      visitor_isp: locationData?.org || null,
      page_url: window.location.href,
      page_title: document.title,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      related_id: activityData.related_id,
      metadata: activityData.metadata,
    };

    const { error } = await supabase
      .from('visitor_activities')
      .insert([activityRecord]);

    if (error) {
      console.error('Failed to track visitor activity:', error);
    } else {
      console.log('Activity tracked:', activityData.activity_type, activityData.metadata);
    }
  } catch (error) {
    console.error('Error tracking visitor activity:', error);
  }
}

// Track page view
export async function trackPageView() {
  pageStartTime = Date.now();
  currentPageUrl = window.location.href;
  maxScrollDepth = 0;
  scrollTracked = false;
  
  await trackVisitorActivity({
    activity_type: 'page_view',
    metadata: {
      url: window.location.href,
      title: document.title,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
    },
  });
}

// Track scroll depth
function trackScrollDepth() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  
  if (scrollPercent > maxScrollDepth) {
    maxScrollDepth = scrollPercent;
  }
  
  // Track milestones: 25%, 50%, 75%, 100%
  const milestones = [25, 50, 75, 100];
  milestones.forEach(milestone => {
    const key = `scroll_${milestone}_${currentPageUrl}`;
    if (scrollPercent >= milestone && !sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true');
      trackVisitorActivity({
        activity_type: 'scroll_depth',
        metadata: {
          depth_percent: milestone,
          url: window.location.href,
          title: document.title,
        },
      });
    }
  });
}

// Track time on page
function trackTimeOnPage() {
  const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
  
  // Track milestones: 30s, 60s, 120s, 300s
  const milestones = [30, 60, 120, 300];
  milestones.forEach(milestone => {
    const key = `time_${milestone}_${currentPageUrl}`;
    if (timeSpent >= milestone && !sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true');
      trackVisitorActivity({
        activity_type: 'time_on_page',
        metadata: {
          seconds: milestone,
          url: window.location.href,
          title: document.title,
        },
      });
    }
  });
}

// Track button clicks
function trackButtonClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const button = target.closest('button, [role="button"], .btn');
  
  if (button) {
    const buttonText = button.textContent?.trim().substring(0, 100) || 'Unknown';
    const buttonId = button.id || '';
    const buttonClass = button.className?.toString().substring(0, 100) || '';
    
    trackVisitorActivity({
      activity_type: 'button_click',
      metadata: {
        button_text: buttonText,
        button_id: buttonId,
        button_class: buttonClass,
        url: window.location.href,
      },
    });
  }
}

// Track link clicks
function trackLinkClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const link = target.closest('a');
  
  if (link) {
    const href = link.href || '';
    const linkText = link.textContent?.trim().substring(0, 100) || 'Unknown';
    const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
    
    trackVisitorActivity({
      activity_type: 'link_click',
      metadata: {
        link_url: href.substring(0, 500),
        link_text: linkText,
        is_external: isExternal,
        url: window.location.href,
      },
    });
  }
}

// Track form interactions
function trackFormInteraction(event: Event) {
  const target = event.target as HTMLElement;
  const form = target.closest('form');
  const input = target.closest('input, textarea, select');
  
  if (input && form) {
    const formId = form.id || form.className?.toString().substring(0, 50) || 'unknown-form';
    const inputName = (input as HTMLInputElement).name || (input as HTMLInputElement).placeholder || 'unknown-field';
    const inputType = (input as HTMLInputElement).type || input.tagName.toLowerCase();
    
    // Only track once per field per session
    const key = `form_${formId}_${inputName}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true');
      trackVisitorActivity({
        activity_type: 'form_interaction',
        metadata: {
          form_id: formId,
          field_name: inputName,
          field_type: inputType,
          url: window.location.href,
        },
      });
    }
  }
}

// Track exit intent
function trackExitIntent(event: MouseEvent) {
  if (event.clientY < 10) {
    const key = `exit_intent_${currentPageUrl}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true');
      trackVisitorActivity({
        activity_type: 'exit_intent',
        metadata: {
          time_on_page: Math.round((Date.now() - pageStartTime) / 1000),
          scroll_depth: maxScrollDepth,
          url: window.location.href,
        },
      });
    }
  }
}

// Initialize all tracking
if (typeof window !== 'undefined') {
  // Track initial page view after a short delay
  setTimeout(() => {
    trackPageView();
  }, 1500);

  // Track scroll depth (debounced)
  let scrollTimeout: NodeJS.Timeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScrollDepth, 500);
  }, { passive: true });

  // Track time on page every 10 seconds
  setInterval(trackTimeOnPage, 10000);

  // Track button clicks
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    // Track button clicks
    if (target.closest('button, [role="button"], .btn')) {
      trackButtonClick(event);
    }
    
    // Track link clicks
    if (target.closest('a')) {
      trackLinkClick(event);
    }
  }, { capture: true });

  // Track form interactions
  document.addEventListener('focus', trackFormInteraction, { capture: true });

  // Track exit intent
  document.addEventListener('mouseout', (event) => {
    trackExitIntent(event as MouseEvent);
  });

  // Track navigation changes (for SPA navigation)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      setTimeout(() => {
        trackPageView();
      }, 500);
    }
  }, 2000);

  // Track when user leaves page
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
    if (timeSpent > 5) {
      // Use sendBeacon for reliable tracking on page exit
      const data = {
        activity_type: 'time_on_page',
        metadata: {
          seconds: timeSpent,
          scroll_depth: maxScrollDepth,
          url: window.location.href,
          final: true,
        },
      };
      
      // Note: sendBeacon doesn't support complex data, so we just log
      console.log('Page exit:', timeSpent, 'seconds, scroll:', maxScrollDepth, '%');
    }
  });
}
