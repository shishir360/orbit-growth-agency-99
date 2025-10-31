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

export async function getVisitorLocation(): Promise<LocationData | null> {
  // Return cached data if available
  if (cachedLocationData) {
    return cachedLocationData;
  }

  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    cachedLocationData = {
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
    
    return cachedLocationData;
  } catch (error) {
    console.error('Failed to get visitor location:', error);
    return null;
  }
}

export async function trackVisitorActivity(activityData: VisitorActivityData) {
  try {
    const locationData = await getVisitorLocation();
    
    const activityRecord = {
      activity_type: activityData.activity_type,
      visitor_ip: locationData?.ip,
      visitor_country: locationData?.country,
      visitor_country_code: locationData?.country_code,
      visitor_city: locationData?.city,
      visitor_region: locationData?.region,
      visitor_timezone: locationData?.timezone,
      visitor_latitude: locationData?.latitude,
      visitor_longitude: locationData?.longitude,
      visitor_isp: locationData?.org,
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
  // Track initial page view
  setTimeout(() => {
    trackPageView();
  }, 1000);

  // Track navigation changes
  let lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      trackPageView();
    }
  }, 2000);
}
