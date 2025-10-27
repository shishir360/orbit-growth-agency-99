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
    const notification = new Notification(title, {
      icon: '/logo.png',
      badge: '/favicon.png',
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);

    return notification;
  }
};

export const checkNotificationPermission = (): NotificationPermission => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
};

export const notifyNewContact = (name: string, email: string) => {
  sendBrowserNotification('🔔 New Contact Submission', {
    body: `${name} (${email}) sent you a message`,
    tag: 'contact-submission',
    requireInteraction: true,
    data: { type: 'contact', email }
  });
};

export const notifyNewBooking = (name: string, date: string, time: string) => {
  sendBrowserNotification('📅 New Booking', {
    body: `${name} scheduled an appointment for ${date} at ${time}`,
    tag: 'booking',
    requireInteraction: true,
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
