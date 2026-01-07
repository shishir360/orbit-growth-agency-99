import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

// Import logo images
import nexusLogo from "@/assets/logos/nexus-logo.png";
import apexLogo from "@/assets/logos/apex-logo.png";
import stellarLogo from "@/assets/logos/stellar-logo.png";
import quantumLogo from "@/assets/logos/quantum-logo.png";
import forgeLogo from "@/assets/logos/forge-logo.png";
import vertexLogo from "@/assets/logos/vertex-logo.png";
import prismLogo from "@/assets/logos/prism-logo.png";
import onyxLogo from "@/assets/logos/onyx-logo.png";

const TrustedBy = () => {
  const [api, setApi] = useState<any>();

  const logos = [
    { name: "NEXUS", logo: nexusLogo },
    { name: "APEX", logo: apexLogo },
    { name: "STELLAR", logo: stellarLogo },
    { name: "QUANTUM", logo: quantumLogo },
    { name: "FORGE", logo: forgeLogo },
    { name: "VERTEX", logo: vertexLogo },
    { name: "PRISM", logo: prismLogo },
    { name: "ONYX", logo: onyxLogo },
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
                  <div className="relative flex items-center justify-center h-28 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-sm group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all duration-500 p-4">
                    <img 
                      src={logo.logo} 
                      alt={`${logo.name} logo`}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
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
