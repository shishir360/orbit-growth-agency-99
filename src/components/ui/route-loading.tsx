import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setFadeOut(false);
    
    // Loading time
    const loadingTime = 600;
    
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, loadingTime - 200);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setFadeOut(false);
    }, loadingTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Logo Container with Animation */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 blur-xl animate-pulse" />
          
          {/* Rotating ring */}
          <div className="absolute -inset-3 rounded-full border-2 border-primary/30 animate-[spin_3s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
          </div>
          
          {/* Second rotating ring (opposite direction) */}
          <div className="absolute -inset-6 rounded-full border border-primary/20 animate-[spin_4s_linear_infinite_reverse]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/60" />
          </div>
          
          {/* Logo with scale animation */}
          <div className="relative w-20 h-20 animate-[pulse_2s_ease-in-out_infinite]">
            <img 
              src="/user-logo-optimized.webp" 
              alt="Lunexo Media" 
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            />
          </div>
        </div>

        {/* Company Name with Gradient */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-wider animate-pulse">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              LUNEXO
            </span>
            <span className="text-foreground/80 ml-2">MEDIA</span>
          </h2>
          
          {/* Loading dots */}
          <div className="flex items-center justify-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteLoading;