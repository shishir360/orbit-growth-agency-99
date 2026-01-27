import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(essentialOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);

    // Apply preferences (e.g., enable/disable analytics)
    applyPreferences(prefs);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Enable/disable Google Analytics based on preferences
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
      });
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
              {/* Main Banner */}
              {!showPreferences ? (
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Icon & Text */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                        <Cookie className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground text-lg">
                          🍪 We use cookies
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                        By clicking "Accept All", you consent to our use of cookies. 
                          <a href="https://lunexomedia.com/privacy" className="text-primary hover:underline ml-1">
                            Learn more
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreferences(true)}
                        className="order-3 sm:order-1"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Customize
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRejectNonEssential}
                        className="order-2"
                      >
                        Reject All
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleAcceptAll}
                        className="order-1 sm:order-3 bg-primary hover:bg-primary/90"
                      >
                        Accept All
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Preferences Panel */
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">
                        Cookie Preferences
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPreferences(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">Necessary Cookies</p>
                        <p className="text-sm text-muted-foreground">
                          Essential for the website to function properly
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        Always On
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">Analytics Cookies</p>
                        <p className="text-sm text-muted-foreground">
                          Help us understand how visitors use our website
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) =>
                            setPreferences({ ...preferences, analytics: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground">Marketing Cookies</p>
                        <p className="text-sm text-muted-foreground">
                          Used to deliver personalized advertisements
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) =>
                            setPreferences({ ...preferences, marketing: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRejectNonEssential}
                    >
                      Reject All
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSavePreferences}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export a hook to check cookie consent
export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const prefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    setHasConsent(consent === 'true');
    if (prefs) {
      setPreferences(JSON.parse(prefs));
    }
  }, []);

  return { hasConsent, preferences };
}
