import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

const TrustedBy = () => {
  const [api, setApi] = useState<any>();

  const logos = [
    { name: "TechCorp", icon: "🚀" },
    { name: "StartupX", icon: "⚡" },
    { name: "InnovateLab", icon: "🔬" },
    { name: "GrowthCo", icon: "📈" },
    { name: "NextGen", icon: "💎" },
    { name: "DigitalFlow", icon: "🌊" },
    { name: "CloudSync", icon: "☁️" },
    { name: "DataMax", icon: "📊" },
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative py-20 bg-[#0a0a0f] overflow-hidden">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 rounded-full blur-[100px]"></div>
      
      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/30 mb-3">
            Trusted Worldwide
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
            Partnering with <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Industry Leaders</span>
          </h3>
        </div>
        
        <Carousel 
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2">
            {logos.map((logo) => (
              <CarouselItem key={logo.name} className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative flex flex-col items-center justify-center h-24 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm group-hover:border-white/10 group-hover:bg-white/[0.04] transition-all duration-300">
                    <span className="text-2xl mb-1 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">{logo.icon}</span>
                    <span className="text-white/40 font-semibold text-sm group-hover:text-white/70 transition-colors duration-300">
                      {logo.name}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white/50' : 'bg-white/20'}`}></div>
          ))}
        </div>
      </div>
      
      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};

export default TrustedBy;
