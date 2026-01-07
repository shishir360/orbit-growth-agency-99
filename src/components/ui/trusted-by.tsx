import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

const TrustedBy = () => {
  const [api, setApi] = useState<any>();

  const logos = [
    { name: "NEXUS", subtitle: "DYNAMICS" },
    { name: "APEX", subtitle: "SYSTEMS" },
    { name: "STELLAR", subtitle: "CORP" },
    { name: "QUANTUM", subtitle: "LABS" },
    { name: "FORGE", subtitle: "DIGITAL" },
    { name: "VERTEX", subtitle: "GROUP" },
    { name: "PRISM", subtitle: "MEDIA" },
    { name: "ONYX", subtitle: "TECH" },
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-blue-500/8 via-cyan-500/8 to-purple-500/8 rounded-full blur-[120px]"></div>
      
      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.4em] uppercase text-white/40 mb-4">
            Trusted Worldwide
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
            Partnering with <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Industry Leaders</span>
          </h3>
        </div>
        
        <Carousel 
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {logos.map((logo) => (
              <CarouselItem key={logo.name} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                  <div className="relative flex flex-col items-center justify-center h-32 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-sm group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all duration-500">
                    <span className="text-2xl md:text-3xl font-black tracking-tight text-white/60 group-hover:text-white transition-colors duration-300" style={{fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em'}}>
                      {logo.name}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/30 group-hover:text-white/50 transition-colors duration-300 mt-1">
                      {logo.subtitle}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Premium scroll indicator */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === 0 ? 'w-8 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400' : 'w-1.5 h-1.5 bg-white/20'}`}></div>
          ))}
        </div>
      </div>
      
      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
};

export default TrustedBy;
