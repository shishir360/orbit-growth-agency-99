import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

// Fallback logos
import nexusLogo from "@/assets/logos/nexus-logo.png";
import apexLogo from "@/assets/logos/apex-logo.png";
import stellarLogo from "@/assets/logos/stellar-logo.png";
import quantumLogo from "@/assets/logos/quantum-logo.png";
import forgeLogo from "@/assets/logos/forge-logo.png";
import vertexLogo from "@/assets/logos/vertex-logo.png";
import prismLogo from "@/assets/logos/prism-logo.png";
import onyxLogo from "@/assets/logos/onyx-logo.png";

interface TrustedLogo {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
}

const fallbackLogos = [
  { id: "1", name: "NEXUS", logo_url: nexusLogo, display_order: 1 },
  { id: "2", name: "APEX", logo_url: apexLogo, display_order: 2 },
  { id: "3", name: "STELLAR", logo_url: stellarLogo, display_order: 3 },
  { id: "4", name: "QUANTUM", logo_url: quantumLogo, display_order: 4 },
  { id: "5", name: "FORGE", logo_url: forgeLogo, display_order: 5 },
  { id: "6", name: "VERTEX", logo_url: vertexLogo, display_order: 6 },
  { id: "7", name: "PRISM", logo_url: prismLogo, display_order: 7 },
  { id: "8", name: "ONYX", logo_url: onyxLogo, display_order: 8 },
];

const TrustedBy = () => {
  const [logos, setLogos] = useState<TrustedLogo[]>(fallbackLogos);

  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from("trusted_logos")
        .select("*")
        .eq("visible", true)
        .order("display_order");

      if (!error && data && data.length > 0) {
        setLogos(data);
      }
    };
    fetchLogos();
  }, []);

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      
      {/* Background glow - Orange themed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-orange-500/10 via-orange-400/8 to-orange-500/10 rounded-full blur-[120px]"></div>
      
      <div className="container-wide section-padding relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold tracking-[0.4em] uppercase text-orange-400/60 mb-4">
            Trusted Worldwide
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
            Partnering with <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Industry Leaders</span>
          </h3>
        </motion.div>
        
        {/* Infinite Scroll Logo Animation */}
        <div className="relative overflow-hidden">
          {/* Gradient masks for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10"></div>
          
          <motion.div 
            className="flex gap-8"
            animate={{
              x: [0, -50 * logos.length * 2.5],
            }}
            transition={{
              x: {
                duration: logos.length * 4,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="group relative flex-shrink-0"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Floating animation */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                  
                  <div className="relative flex items-center justify-center w-40 h-28 bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm group-hover:border-orange-500/30 group-hover:bg-white/[0.08] transition-all duration-500 p-4">
                    <img 
                      src={logo.logo_url} 
                      alt={`${logo.name} logo`}
                      className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Animated dots indicator */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i} 
              className={`rounded-full ${i === 0 ? 'w-8 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500' : 'w-1.5 h-1.5 bg-white/20'}`}
              animate={{
                scale: i === 0 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
    </section>
  );
};

export default TrustedBy;
