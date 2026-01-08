import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Award } from 'lucide-react';

interface CompletedClient {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  display_order: number;
}

const CompletedClients = () => {
  const [clients, setClients] = useState<CompletedClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('completed_clients')
        .select('*')
        .eq('visible', true)
        .order('display_order', { ascending: true });

      if (!error && data) {
        setClients(data);
      }
      setIsLoading(false);
    };

    fetchClients();
  }, []);

  if (isLoading || clients.length === 0) return null;

  // Duplicate clients for seamless infinite scroll
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px]" />
      
      <div className="container-wide section-padding relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold mb-8"
          >
            <Award className="w-5 h-5" />
            Our Clients
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold mb-6" 
            style={{fontFamily: "'Playfair Display', serif"}}
          >
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Clients We've{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Worked With
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            Proud to have delivered exceptional results for these amazing businesses
          </motion.p>
        </div>

        {/* Infinite Scroll Animation */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />
          
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-8"
              animate={{ x: ['0%', '-33.33%'] }}
              transition={{ 
                duration: 30,
                ease: 'linear',
                repeat: Infinity 
              }}
            >
              {duplicatedClients.map((client, index) => (
                <motion.div
                  key={`${client.id}-${index}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-shrink-0"
                >
                  {client.website_url ? (
                    <a
                      href={client.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block w-48 h-32 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 rounded-2xl transition-all duration-500" />
                      
                      {/* Logo */}
                      <div className="relative h-full flex items-center justify-center">
                        <img 
                          src={client.logo_url} 
                          alt={client.name}
                          className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      
                      {/* External link icon */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-4 h-4 text-emerald-400" />
                      </div>
                      
                      {/* Name tooltip */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-lg text-xs text-white/80 whitespace-nowrap">
                        {client.name}
                      </div>
                    </a>
                  ) : (
                    <div className="group relative w-48 h-32 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-500">
                      <div className="relative h-full flex items-center justify-center">
                        <img 
                          src={client.logo_url} 
                          alt={client.name}
                          className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-lg text-xs text-white/80 whitespace-nowrap">
                        {client.name}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedClients;
