import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail, Phone, Sparkles, Zap, Send, ArrowRight, Clock, MapPin, Play, ShieldCheck, Activity, Globe, Database, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/ui/seo";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email") as string,
      phone: `${formData.get("countryCode")} ${formData.get("phone")}`,
      company: formData.get("company") as string || undefined,
      message: `Service: ${formData.get("service")}\n\n${formData.get("message")}`,
    };

    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: payload,
      });

      if (error) throw error;

      toast({
        title: "Protocol Transmitted",
        description: "Your absolute intelligence has been received. We will respond within 24 business hours sync.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Transmission Failed",
        description: "Neural node error. Please try again or contact us directly via email protocol.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp Logic",
      description: "Instant absolute neural responses sync",
      action: "Initialize Node",
      href: "https://wa.me/8801339731664",
      color: "primary"
    },
    {
      icon: Mail,
      title: "Email Protocol",
      description: "Detailed architectures and blueprints",
      action: "hello@lunexomedia.com",
      href: "mailto:hello@lunexomedia.com",
      color: "accent"
    },
    {
      icon: Phone,
      title: "Voice Intelligence",
      description: "Direct operational sync",
      action: "+1 (702) 483-0749",
      href: "tel:+17024830749",
      color: "primary"
    }
  ];

  useEffect(() => {
    document.title = "Contact Absolute Intelligence | LUNEXO MEDIA";
  }, []);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Contact Absolute Intelligence | LUNEXO MEDIA"
        description="Initialize your absolute protocol with Lunexo Media. Transmit your vision and let us architect your scalable digital growth logic."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/contact"
        keywords="contact us, digital marketing consultation, web design quote, absolute intelligence"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                <Sparkles className="w-5 h-5 mr-4" />
                Initiate Absolute Growth
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Contact <span className="text-primary italic">Intelligence.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Ready to initialize your next operational node? Transmit your <span className="text-primary italic font-bold">absolute vision</span> and discuss how we can architect your scaling logic.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Nodes */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 text-center hover:shadow-glass transition-all duration-1000 hover:translate-y-[-15px]"
              >
                <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center border border-white/20 mx-auto mb-10 group-hover:bg-primary transition-all duration-700 shadow-2xl group-hover:rotate-12">
                  <method.icon className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-6 mb-8">
                   <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">{method.title}</h3>
                   <p className="text-2xl text-slate-500 font-medium leading-relaxed">{method.description}</p>
                </div>
                <div className="pt-8 border-t border-white/60">
                   <span className="text-primary font-black uppercase tracking-[0.4em] text-xs group-hover:text-slate-900 transition-colors">{method.action}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto items-start">
            <div className="space-y-16">
              <div className="space-y-12">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                    <Clock className="w-5 h-5 mr-4" />
                    Operational Velocity
                  </Badge>
                </motion.div>
                <h2 className="text-6xl lg:text-[8rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
                  Transmit <br /> <span className="text-primary italic">Project Logic.</span>
                </h2>
                <p className="text-3xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  Fill out the protocol form to book your absolute strategy consultation. We execute responses within 24 business hours sync.
                </p>
              </div>

              <div className="space-y-12 pt-8">
                <div className="flex items-center gap-10 group bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-[3rem] hover:shadow-glass transition-all duration-700 hover:translate-x-5">
                  <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white group-hover:bg-primary transition-all duration-700 shadow-2xl flex-shrink-0 group-hover:rotate-12">
                    <Zap className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-4xl font-heading font-bold text-slate-900">Absolute Execution</h4>
                    <p className="text-2xl text-slate-500 font-medium">Telemetry response within 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-center gap-10 group bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-[3rem] hover:shadow-glass transition-all duration-700 hover:translate-x-5">
                  <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white group-hover:bg-primary transition-all duration-700 shadow-2xl flex-shrink-0 group-hover:rotate-12">
                    <Globe className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-4xl font-heading font-bold text-slate-900">Global Node Network</h4>
                    <p className="text-2xl text-slate-500 font-medium">Servicing absolute clients worldwide.</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-16 lg:p-24 shadow-glass hover:shadow-2xl transition-all duration-700"
            >
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <Label htmlFor="firstName" className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs ml-4">First Name *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      required 
                      className="h-24 bg-white/60 border-white/60 rounded-[3rem] px-10 focus:border-primary/50 focus:bg-white text-slate-900 font-bold text-xl placeholder:text-slate-400 transition-all duration-300 shadow-inner"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="lastName" className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs ml-4">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      required 
                      className="h-24 bg-white/60 border-white/60 rounded-[3rem] px-10 focus:border-primary/50 focus:bg-white text-slate-900 font-bold text-xl placeholder:text-slate-400 transition-all duration-300 shadow-inner"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="email" className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs ml-4">Email Architecture *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="h-24 bg-white/60 border-white/60 rounded-[3rem] px-10 focus:border-primary/50 focus:bg-white text-slate-900 font-bold text-xl placeholder:text-slate-400 transition-all duration-300 shadow-inner"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="phone" className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs ml-4">Voice Protocol *</Label>
                  <div className="flex gap-6">
                    <select 
                      id="countryCode" 
                      name="countryCode"
                      required
                      className="h-24 px-10 border-white/60 border rounded-[3rem] bg-white/60 text-slate-900 font-bold text-xl focus:border-primary/50 focus:bg-white min-w-[160px] appearance-none transition-all duration-300 shadow-inner"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+880">🇧🇩 +880</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required
                      placeholder="123 456 7890"
                      className="flex-1 h-24 bg-white/60 border-white/60 rounded-[3rem] px-10 focus:border-primary/50 focus:bg-white text-slate-900 font-bold text-xl placeholder:text-slate-400 transition-all duration-300 shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="service" className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs ml-4">Service Logic *</Label>
                  <select 
                    id="service" 
                    name="service"
                    className="w-full h-24 px-10 border-white/60 border rounded-[3rem] bg-white/60 text-slate-900 font-bold text-xl focus:border-primary/50 focus:bg-white appearance-none transition-all duration-300 shadow-inner"
                    required
                  >
                    <option value="">Select a protocol</option>
                    <option value="website-design">Digital Architecture</option>
                    <option value="ads-management">ROI Orchestration</option>
                    <option value="ai-automation">Intelligence Logic</option>
                    <option value="consultation">Strategic Consultation</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="message" className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs ml-4">Project Details *</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required
                    rows={5}
                    className="bg-white/60 border-white/60 rounded-[3rem] px-10 py-8 focus:border-primary/50 focus:bg-white text-slate-900 font-bold text-xl placeholder:text-slate-400 min-h-[250px] transition-all duration-300 shadow-inner resize-none"
                    placeholder="Tell us about your absolute project goals..."
                  />
                </div>

                <div className="pt-8">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full py-16 rounded-[4rem] font-bold text-3xl bg-slate-900 text-white hover:bg-primary hover:text-white shadow-2xl transition-all duration-700 group hover:scale-105"
                  >
                    {isSubmitting ? (
                      "Transmitting..."
                    ) : (
                      <span className="flex items-center justify-center">
                        Transmit Protocol
                        <Send className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gateway CTA */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                Absolute Telemetry Sync
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-[1] tracking-tighter">
              Prefer a <br /> <span className="text-primary italic">Quick Sync?</span>
            </h2>
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Book a free absolute strategy session with our team. No obligation, pure intelligence value.
            </p>
            <div className="pt-16">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group"
              >
                <a href="https://lunexomedia.com/book-apartment" className="flex items-center">
                  Book Strategy Session <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </a>
              </Button>
            </div>
             <div className="pt-24 flex items-center justify-center gap-16 opacity-30 text-white">
               <ShieldCheck className="w-10 h-10" />
               <Cpu className="w-10 h-10" />
               <Database className="w-10 h-10" />
               <Activity className="w-10 h-10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
