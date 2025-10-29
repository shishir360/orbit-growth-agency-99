import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  requestNotificationPermission, 
  notifyNewContact, 
  notifyNewBooking 
} from '@/utils/notifications';
import { toast } from '@/hooks/use-toast';

/**
 * Global notification service that runs in the background
 * Handles real-time notifications for bookings and contacts
 */
export function NotificationService() {
  useEffect(() => {
    // Request notification permission on mount with user interaction
    const enableNotifications = async () => {
      const granted = await requestNotificationPermission();
      if (granted) {
        console.log('✅ Notification permission granted');
        toast({
          title: "নোটিফিকেশন চালু হয়েছে",
          description: "আপনি এখন নতুন বুকিং এবং মেসেজের নোটিফিকেশন পাবেন",
        });
      } else {
        console.log('❌ Notification permission denied');
      }
    };
    
    enableNotifications();

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
