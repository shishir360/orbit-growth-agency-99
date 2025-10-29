import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export function BlogNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if we should show the prompt
    const hasRequestedBefore = localStorage.getItem('blog-notification-requested');
    const currentPermission = Notification.permission;
    
    setPermission(currentPermission);
    
    // Show prompt if:
    // 1. Browser supports notifications
    // 2. Permission hasn't been granted yet
    // 3. User hasn't dismissed it before (or it was more than 7 days ago)
    if ('Notification' in window && currentPermission === 'default') {
      if (!hasRequestedBefore) {
        // Show after 5 seconds on page
        setTimeout(() => setShowPrompt(true), 5000);
      } else {
        const lastRequested = parseInt(hasRequestedBefore);
        const daysSince = (Date.now() - lastRequested) / (1000 * 60 * 60 * 24);
        if (daysSince > 7) {
          setTimeout(() => setShowPrompt(true), 5000);
        }
      }
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        // Register service worker for push notifications
        const registration = await navigator.serviceWorker.register('/sw.js');
        await navigator.serviceWorker.ready;

        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
          )
        });

        // Save subscription to backend
        await supabase.functions.invoke('setup-push', {
          body: { 
            subscription: subscription.toJSON(),
            is_admin: false // This is for blog visitors
          }
        });

        toast({
          title: "নোটিফিকেশন চালু হয়েছে! 🔔",
          description: "নতুন ব্লগ পোস্ট পাবলিশ হলে আপনি নোটিফিকেশন পাবেন",
        });

        localStorage.setItem('blog-notification-requested', Date.now().toString());
        setShowPrompt(false);
      } else {
        toast({
          title: "নোটিফিকেশন বন্ধ আছে",
          description: "পরে চাইলে আবার চালু করতে পারবেন",
          variant: "destructive",
        });
        localStorage.setItem('blog-notification-requested', Date.now().toString());
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast({
        title: "সমস্যা হয়েছে",
        description: "নোটিফিকেশন চালু করা যায়নি",
        variant: "destructive",
      });
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('blog-notification-requested', Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt || permission !== 'default') return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 p-4 shadow-xl border-2 border-primary/20 bg-background/95 backdrop-blur animate-slide-up">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1">নতুন পোস্টের নোটিফিকেশন পান 🔔</h3>
          <p className="text-xs text-muted-foreground">
            নতুন ব্লগ পোস্ট পাবলিশ হলে সবার আগে জানতে চাইলে নোটিফিকেশন চালু করুন
          </p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={handleEnableNotifications}
          className="flex-1"
          size="sm"
        >
          <Bell className="h-4 w-4 mr-2" />
          চালু করুন
        </Button>
        <Button 
          onClick={handleDismiss}
          variant="outline"
          size="sm"
        >
          পরে
        </Button>
      </div>
    </Card>
  );
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
