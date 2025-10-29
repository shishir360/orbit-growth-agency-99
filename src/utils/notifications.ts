// Browser Push Notification Utilities

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }

  if (Notification.permission === 'granted') {
    const notificationOptions: NotificationOptions = {
      icon: '/app-icon.webp',
      badge: '/app-icon.webp',
      requireInteraction: true,
      ...options
    };

    const notification = new Notification(title, notificationOptions);

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto close after 15 seconds
    setTimeout(() => {
      notification.close();
    }, 15000);

    return notification;
  } else {
    console.log('Notification permission not granted:', Notification.permission);
  }
};

export const checkNotificationPermission = (): NotificationPermission => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
};

export const notifyNewContact = (name: string, email: string) => {
  sendBrowserNotification('🔔 নতুন কন্টাক্ট মেসেজ', {
    body: `${name} (${email}) আপনাকে মেসেজ পাঠিয়েছে`,
    tag: 'contact-submission',
    requireInteraction: true,
    icon: '/app-icon.webp',
    badge: '/app-icon.webp',
    data: { type: 'contact', email }
  });
};

export const notifyNewBooking = (name: string, date: string, time: string) => {
  sendBrowserNotification('📅 নতুন অ্যাপয়েন্টমেন্ট বুকিং', {
    body: `${name} ${date} তারিখে ${time} সময়ে অ্যাপয়েন্টমেন্ট বুক করেছে`,
    tag: 'booking',
    requireInteraction: true,
    icon: '/app-icon.webp',
    badge: '/app-icon.webp',
    data: { type: 'booking', name, date, time }
  });
};

export const notifyNewIncome = (amount: number, source: string) => {
  sendBrowserNotification('💰 New Income', {
    body: `Received $${amount} from ${source}`,
    tag: 'income',
    data: { type: 'income', amount }
  });
};

export const notifyNewExpense = (amount: number, category: string) => {
  sendBrowserNotification('💸 New Expense', {
    body: `$${amount} expense recorded in ${category}`,
    tag: 'expense',
    data: { type: 'expense', amount }
  });
};
