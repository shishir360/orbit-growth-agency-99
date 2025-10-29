import { supabase } from '@/integrations/supabase/client';

// Setup push notifications
export async function setupPushNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return false;
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);

    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;

    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return false;
    }

    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        // This is a dummy key - we'll use endpoint-only push
        'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
      )
    });

    console.log('Push subscription:', subscription);

    // Save subscription to backend
    const { error } = await supabase.functions.invoke('setup-push', {
      body: { subscription: subscription.toJSON() }
    });

    if (error) {
      console.error('Error saving subscription:', error);
      return false;
    }

    console.log('✅ Push notifications enabled successfully');
    return true;
  } catch (error) {
    console.error('Error setting up push notifications:', error);
    return false;
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Send a test push notification
export async function sendTestPush() {
  try {
    const { error } = await supabase.functions.invoke('send-push', {
      body: {
        title: '🔔 টেস্ট নোটিফিকেশন',
        body: 'পুশ নোটিফিকেশন কাজ করছে!',
        data: { test: true }
      }
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error sending test push:', error);
    return false;
  }
}
