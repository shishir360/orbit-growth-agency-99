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

interface VisitorActivityData {
  activity_type: 'contact_form' | 'booking' | 'pdf_download' | 'page_view' | 'review_submission';
  related_id?: string;
  metadata?: any;
}

let cachedLocationData: LocationData | null = null;

// Primary API: ipapi.co
async function fetchFromIpApi(): Promise<LocationData | null> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`ipapi.co failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check for rate limit or error response
    if (data.error) {
      throw new Error(data.reason || 'ipapi.co rate limited');
    }
    
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

// Fallback API: ip-api.com (free, no key required)
async function fetchFromIpApiCom(): Promise<LocationData | null> {
  try {
    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,lat,lon,timezone,isp,org,query', {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error(`ip-api.com failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'fail') {
      throw new Error(data.message || 'ip-api.com failed');
    }
    
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

// Second fallback: ipinfo.io (free tier)
async function fetchFromIpInfo(): Promise<LocationData | null> {
  try {
    const response = await fetch('https://ipinfo.io/json', {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error(`ipinfo.io failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    const [lat, lon] = (data.loc || '0,0').split(',').map(Number);
    
    return {
      ip: data.ip,
      country: data.country, // Returns country code, need to map
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
  // Return cached data if available
  if (cachedLocationData) {
    return cachedLocationData;
  }

  // Try primary API first
  let locationData = await fetchFromIpApi();
  
  // If primary fails, try first fallback
  if (!locationData) {
    locationData = await fetchFromIpApiCom();
  }
  
  // If first fallback fails, try second fallback
  if (!locationData) {
    locationData = await fetchFromIpInfo();
  }

  if (locationData) {
    cachedLocationData = locationData;
    console.log('Visitor location detected:', locationData.country, locationData.city);
  } else {
    console.error('All IP geolocation APIs failed');
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
      console.log('Visitor activity tracked:', activityData.activity_type, locationData?.country || 'Unknown');
    }
  } catch (error) {
    console.error('Error tracking visitor activity:', error);
  }
}

export async function trackPageView() {
  await trackVisitorActivity({
    activity_type: 'page_view',
    metadata: {
      url: window.location.href,
      title: document.title,
    },
  });
}

// Auto-track page views
if (typeof window !== 'undefined') {
  // Track initial page view after a short delay
  setTimeout(() => {
    trackPageView();
  }, 1500);

  // Track navigation changes (for SPA navigation)
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      // Small delay to ensure page title is updated
      setTimeout(() => {
        trackPageView();
      }, 500);
    }
  }, 2000);
}
