import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  requestNotificationPermission, 
  notifyNewContact, 
  notifyNewBooking 
} from '@/utils/notifications';
import { setupPushNotifications } from '@/utils/pushNotifications';
import { toast } from '@/hooks/use-toast';

/**
 * Global notification service that runs in the background
 * Handles real-time notifications for bookings and contacts
 */
export function NotificationService() {
  useEffect(() => {
    // Setup both browser notifications and push notifications
    const enableNotifications = async () => {
      // First request basic notification permission
      const granted = await requestNotificationPermission();
      if (granted) {
        console.log('✅ Browser notification permission granted');
        
        // Then setup push notifications for background delivery
        const pushEnabled = await setupPushNotifications();
        if (pushEnabled) {
          console.log('✅ Push notifications enabled');
          toast({
            title: "নোটিফিকেশন চালু হয়েছে ✅",
            description: "এখন অ্যাপ বন্ধ থাকলেও আপনি পুশ নোটিফিকেশন পাবেন",
          });

          // Send initial push notification from backend when new events occur
          await sendPushOnNewEvents();
        }
      } else {
        console.log('❌ Notification permission denied');
      }
    };
    
    enableNotifications();

    // Function to trigger push notifications from backend
    const sendPushOnNewEvents = async () => {
      // Subscribe to new contact submissions
      const contactChannel = supabase
        .channel('push-contact-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'contact_submissions'
          },
          async (payload: any) => {
            console.log('New contact submission:', payload.new);
            
            // Show browser notification (for when app is open)
            notifyNewContact(payload.new.name, payload.new.email);
            
            // Send push notification (for when app is closed)
            await supabase.functions.invoke('send-push', {
              body: {
                title: '🔔 নতুন কন্টাক্ট মেসেজ',
                body: `${payload.new.name} (${payload.new.email}) আপনাকে মেসেজ পাঠিয়েছে`,
                data: { type: 'contact', id: payload.new.id }
              }
            });
            
            // Show toast notification
            toast({
              title: "🔔 নতুন কন্টাক্ট মেসেজ",
              description: `${payload.new.name} আপনাকে মেসেজ পাঠিয়েছে`,
            });
          }
        )
        .subscribe();

      // Subscribe to new bookings
      const bookingChannel = supabase
        .channel('push-booking-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'apartment_bookings'
          },
          async (payload: any) => {
            console.log('New booking:', payload.new);
            
            // Show browser notification (for when app is open)
            notifyNewBooking(payload.new.name, payload.new.date, payload.new.time);
            
            // Send push notification (for when app is closed)
            await supabase.functions.invoke('send-push', {
              body: {
                title: '📅 নতুন অ্যাপয়েন্টমেন্ট বুকিং',
                body: `${payload.new.name} ${payload.new.date} তারিখে ${payload.new.time} সময়ে বুক করেছে`,
                data: { type: 'booking', id: payload.new.id }
              }
            });
            
            // Show toast notification
            toast({
              title: "🔔 নতুন বুকিং",
              description: `${payload.new.name} একটি অ্যাপয়েন্টমেন্ট বুক করেছে`,
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(contactChannel);
        supabase.removeChannel(bookingChannel);
      };
    };

    // Subscribe to new contact submissions
    const contactChannel = supabase
      .channel('global-contact-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload: any) => {
          console.log('New contact submission:', payload.new);
          
          // Show browser notification
          notifyNewContact(payload.new.name, payload.new.email);
          
          // Show toast notification
          toast({
            title: "🔔 নতুন কন্টাক্ট মেসেজ",
            description: `${payload.new.name} আপনাকে মেসেজ পাঠিয়েছে`,
          });
        }
      )
      .subscribe();

    // Subscribe to new bookings
    const bookingChannel = supabase
      .channel('global-booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'apartment_bookings'
        },
        (payload: any) => {
          console.log('New booking:', payload.new);
          
          // Show browser notification
          notifyNewBooking(payload.new.name, payload.new.date, payload.new.time);
          
          // Show toast notification
          toast({
            title: "🔔 নতুন বুকিং",
            description: `${payload.new.name} একটি অ্যাপয়েন্টমেন্ট বুক করেছে`,
          });
        }
      )
      .subscribe();

    console.log('Notification service started');

    return () => {
      console.log('Notification service stopped');
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(bookingChannel);
    };
  }, []);

  return null; // This component doesn't render anything
}
