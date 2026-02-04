import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  image_url: string;
  link: string;
  category: string;
}

const TemplatesCarousel: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data, error } = await supabase
          .from('website_templates')
          .select('id, title, image_url, link, category')
          .eq('visible', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setTemplates(data || []);
      } catch (err) {
        console.error('Error fetching templates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading || templates.length === 0) return null;

  // Duplicate for infinite scroll effect
  const duplicatedTemplates = [...templates, ...templates, ...templates];

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Template Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Website Templates
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse our collection of professionally designed templates that convert visitors into customers
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Left gradient mask */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        
        {/* Right gradient mask */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -100 * templates.length + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: templates.length * 8,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTemplates.map((template, index) => (
            <a
              key={`${template.id}-${index}`}
              href={template.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-[300px] md:w-[400px]"
            >
              <motion.div
                className="relative rounded-xl overflow-hidden bg-card border shadow-lg"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={template.image_url}
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-lg">{template.title}</p>
                        <span className="text-white/70 text-sm">{template.category}</span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full shadow-lg">
                    {template.category}
                  </span>
                </div>
              </motion.div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesCarousel;
