import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import ReviewSubmission from "@/components/ui/review-submission";
import VideoReviewsCarousel from "@/components/ui/video-reviews-carousel";
import SEO from "@/components/ui/seo";
import { Star, Quote, ArrowRight, Sparkles, Trophy, Play, ChevronRight, ShieldCheck, Database, Activity, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  source: string;
  visible: boolean;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('visible', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating ? "fill-primary text-primary" : "text-slate-200"
        } transition-transform duration-500 hover:scale-125`}
      />
    ));
  };

  useEffect(() => {
    document.title = "Absolute Success Stories | Voices of Excellence | Lunexo Media";
  }, []);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Success Stories | Voices of Excellence | Lunexo Media"
        description="Hear from our absolute partners who achieved growth through Lunexo Media's SEO, ads, and digital marketing services."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/reviews"
        keywords="testimonials, client reviews, success stories, customer feedback, Lunexo Media reviews"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Trophy className="w-5 h-5 mr-3" />
                Absolute Excellence
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter"
            >
              Voices of <br /> <span className="text-primary italic">Absolute Success.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl lg:text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Discover why leading businesses trust LUNEXO MEDIA to architect their <span className="text-primary italic font-bold">digital legacies.</span> Absolute words from our global partners.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      <section className="py-40 bg-white/50 backdrop-blur-md border-y border-white/40 overflow-hidden">
        <div className="container-wide section-padding text-center mb-24 space-y-12">
           <Badge className="bg-primary/10 border border-primary/20 text-primary px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
            <Play className="w-5 h-5 mr-3" />
            Visual Proof
          </Badge>
          <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 tracking-tighter">
            Digital <span className="text-primary italic">Testimony.</span>
          </h2>
        </div>
        <VideoReviewsCarousel showOnHomepage={false} />
      </section>

      {/* Review Submission Section */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Feedback Protocol
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[10rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter">
              Share Your <span className="text-primary italic">Absolute Logic.</span>
            </h2>
            <p className="text-2xl lg:text-3xl text-slate-500 leading-relaxed max-w-4xl mx-auto font-medium">
              Your growth is our absolute mission. Help us refine our architecture and inspire others by documenting your journey with our agency.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-32 shadow-glass"
            >
              <ReviewSubmission />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wall of Love (Reviews Grid) */}
      <section className="py-40 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1.05] tracking-tighter">
              The Absolute <span className="text-primary italic">Wall of Love.</span>
            </h2>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-64 space-y-8">
              <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Testimonies...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-64 space-y-12">
              <div className="w-32 h-32 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] flex items-center justify-center mx-auto shadow-glass text-slate-400">
                <Quote className="w-16 h-16" />
              </div>
              <p className="text-4xl text-slate-400 font-heading font-bold italic">No absolute testimonies recorded. Be the first to leave a digital legacy.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
              <AnimatePresence mode="popLayout">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass hover:translate-y-[-15px] transition-all duration-1000 relative overflow-hidden"
                  >
                    <Quote className="absolute top-10 right-16 w-32 h-32 text-primary/5 group-hover:text-primary/10 transition-all duration-1000 group-hover:rotate-12 group-hover:scale-125" />
                    
                    <div className="relative z-10 space-y-12 flex flex-col h-full">
                      <div className="flex gap-2">{renderStars(review.rating)}</div>
                      
                      <p className="text-2xl text-slate-600 font-body italic leading-relaxed flex-1">
                        "{review.comment}"
                      </p>
                      
                      <div className="pt-12 border-t border-white/60">
                        <div className="text-3xl font-heading font-bold text-slate-900">{review.name}</div>
                        <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-4 flex items-center gap-3">
                          <Activity className="w-4 h-4" /> {review.source}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Next Absolute Success
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Create Your <br /> <span className="text-primary italic">Absolute Legacy.</span>
            </h2>
            
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Join our elite collective of satisfied absolute partners and let us help you achieve your ultimate digital trajectories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group"
              >
                <a href="https://lunexomedia.com/contact">
                  Start Execution <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-20 py-12 rounded-full font-bold transition-all duration-500"
              >
                <a href="https://lunexomedia.com/portfolio">
                  View Repository
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
