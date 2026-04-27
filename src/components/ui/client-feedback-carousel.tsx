import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Star, Quote } from 'lucide-react';

interface FeedbackScreenshot {
  id: string;
  title: string;
  category: string;
  image_url: string;
  client_name: string | null;
}

const ClientFeedbackCarousel: React.FC = () => {
  const [screenshots, setScreenshots] = useState<FeedbackScreenshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScreenshots();
  }, []);

  const fetchScreenshots = async () => {
    try {
      const { data, error } = await supabase
        .from('client_feedback_screenshots')
        .select('*')
        .eq('visible', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setScreenshots(data || []);
    } catch (error) {
      console.error('Error fetching feedback screenshots:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse h-64 bg-slate-100 rounded-3xl"></div>
        </div>
      </section>
    );
  }

  if (screenshots.length === 0) {
    return null;
  }

  // Duplicate for seamless loop
  const duplicatedScreenshots = [...screenshots, ...screenshots, ...screenshots];

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-background">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-primary/5 backdrop-blur-xl border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-sm">
            <MessageSquare className="h-5 h-5 text-primary" />
            <span className="text-sm">Real Client Feedback</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-6 text-slate-900">
            What Our Clients <span className="text-primary">Say</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-body">
            Real screenshots from happy clients sharing their success stories
          </p>
        </motion.div>

        {/* Auto-scrolling Carousel - Row 1 (Left to Right) */}
        <div className="relative mb-6">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [0, -100 * screenshots.length + '%']
              }}
              transition={{
                x: {
                  duration: screenshots.length * 8,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop'
                }
              }}
            >
              {duplicatedScreenshots.map((screenshot, index) => (
                <motion.div
                  key={`${screenshot.id}-${index}`}
                  className="flex-shrink-0 w-72 md:w-80"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="relative group rounded-[2rem] overflow-hidden border border-white/40 bg-white/40 backdrop-blur-xl shadow-glass transition-all duration-500">
                    {/* Image */}
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={screenshot.image_url}
                        alt={screenshot.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/90 to-transparent">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-white font-heading font-bold text-sm truncate">{screenshot.title}</p>
                      {screenshot.client_name && (
                        <p className="text-white/70 text-xs mt-1 font-body">— {screenshot.client_name}</p>
                      )}
                    </div>

                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 p-3 rounded-full bg-primary/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Quote className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Auto-scrolling Carousel - Row 2 (Right to Left) */}
        {screenshots.length > 3 && (
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: [-100 * screenshots.length + '%', 0]
                }}
                transition={{
                  x: {
                    duration: screenshots.length * 8,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop'
                  }
                }}
              >
                {duplicatedScreenshots.reverse().map((screenshot, index) => (
                  <motion.div
                    key={`reverse-${screenshot.id}-${index}`}
                    className="flex-shrink-0 w-72 md:w-80"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm shadow-xl">
                      {/* Image */}
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={screenshot.image_url}
                          alt={screenshot.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-white font-medium text-sm truncate">{screenshot.title}</p>
                        {screenshot.client_name && (
                          <p className="text-white/70 text-xs mt-1">— {screenshot.client_name}</p>
                        )}
                      </div>

                      {/* Quote icon */}
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-purple-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Quote className="h-4 w-4 text-purple-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientFeedbackCarousel;
