import { useEffect, useState } from 'react';
import { Bell, X, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'contact' | 'booking';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
    
    // Subscribe to new contact submissions
    const contactChannel = supabase
      .channel('contact-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload: any) => {
          const newNotification: Notification = {
            id: `contact-${payload.new.id}`,
            type: 'contact',
            title: 'New Contact Submission',
            message: `${payload.new.name} sent a message`,
            createdAt: payload.new.created_at,
            read: false,
          };
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          toast({
            title: "🔔 New Contact Submission",
            description: `${payload.new.name} sent you a message`,
          });
        }
      )
      .subscribe();

    // Subscribe to new bookings
    const bookingChannel = supabase
      .channel('booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'apartment_bookings'
        },
        (payload: any) => {
          const newNotification: Notification = {
            id: `booking-${payload.new.id}`,
            type: 'booking',
            title: 'New Booking',
            message: `${payload.new.name} scheduled for ${payload.new.date} at ${payload.new.time}`,
            createdAt: payload.new.created_at,
            read: false,
          };
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          toast({
            title: "🔔 New Booking",
            description: `${payload.new.name} scheduled an appointment`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(contactChannel);
      supabase.removeChannel(bookingChannel);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      // Load recent contact submissions
      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Load recent bookings
      const { data: bookings } = await supabase
        .from('apartment_bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const contactNotifs: Notification[] = (contacts || []).map(c => ({
        id: `contact-${c.id}`,
        type: 'contact',
        title: 'Contact Submission',
        message: `${c.name} sent a message`,
        createdAt: c.created_at,
        read: false,
      }));

      const bookingNotifs: Notification[] = (bookings || []).map(b => ({
        id: `booking-${b.id}`,
        type: 'booking',
        title: 'Booking',
        message: `${b.name} scheduled for ${b.date} at ${b.time}`,
        createdAt: b.created_at,
        read: false,
      }));

      const allNotifs = [...contactNotifs, ...bookingNotifs]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);

      setNotifications(allNotifs);
      setUnreadCount(allNotifs.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));

    // Navigate to appropriate page
    if (notification.type === 'contact') {
      navigate('/admin-dashboard/contact-submissions');
    } else {
      navigate('/admin-dashboard/bookings');
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearNotifications}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No new notifications
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-3 p-4 cursor-pointer ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className={`mt-1 ${notification.type === 'contact' ? 'text-blue-500' : 'text-green-500'}`}>
                  {notification.type === 'contact' ? (
                    <MessageSquare className="h-5 w-5" />
                  ) : (
                    <Calendar className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
