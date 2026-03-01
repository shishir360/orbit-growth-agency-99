/// <reference types="vite/client" />

interface PushSubscriptionOptionsInit {
  userVisibleOnly?: boolean;
  applicationServerKey?: BufferSource | string | null;
}

interface PushManager {
  subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
  getSubscription(): Promise<PushSubscription | null>;
}

interface ServiceWorkerRegistration {
  pushManager: PushManager;
}
