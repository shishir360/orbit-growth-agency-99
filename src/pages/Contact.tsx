import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail, Phone, Sparkles, Zap, Send, ArrowRight, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Instant responses",
      action: "Message us",
      href: "https://wa.me/8801339731664",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Detailed inquiries",
      action: "hello@lunexomedia.com",
      href: "mailto:hello@lunexomedia.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly",
      action: "+1 (702) 483-0749",
      href: "tel:+17024830749",
      color: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    document.title = "Contact Lunexo Media | Let's Grow Your Business";
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Contact Lunexo Media | Let's Grow Your Business"
        description="Get in touch with Lunexo Media for SEO, paid ads, and web design solutions."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/contact"
        keywords="contact us, digital marketing consultation, web design quote"
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-black">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/25 to-cyan-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-r from-cyan-600/20 to-teal-500/15 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Sparkles className="w-4 h-4" />
              Get In Touch
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Contact
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Lunexo Media
              </span>
            </h1>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Ready to launch your next project? We'd love to hear about your vision and discuss how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 relative bg-black">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, i) => (
              <a
                key={i}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{method.title}</h3>
                <p className="text-white/70 text-sm mb-3">{method.description}</p>
                <span className="text-emerald-400 font-medium">{method.action}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/15 to-cyan-500/15 rounded-full blur-[150px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Book Your Free Consultation
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                Let's Discuss Your <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Project</span>
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      required 
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      required 
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500"
                    placeholder="john@company.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                  <div className="flex gap-3">
                    <select 
                      id="countryCode" 
                      name="countryCode"
                      required
                      className="h-12 px-4 border border-white/10 rounded-md bg-zinc-900 text-white min-w-[100px] focus:border-emerald-500"
                    >
                      <option value="+1" className="bg-zinc-900 text-white">🇺🇸 +1</option>
                      <option value="+44" className="bg-zinc-900 text-white">🇬🇧 +44</option>
                      <option value="+91" className="bg-zinc-900 text-white">🇮🇳 +91</option>
                      <option value="+61" className="bg-zinc-900 text-white">🇦🇺 +61</option>
                      <option value="+49" className="bg-zinc-900 text-white">🇩🇪 +49</option>
                    </select>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required
                      placeholder="123 456 7890"
                      className="flex-1 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">Company Name</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500"
                    placeholder="Your company"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-white">Service Interest *</Label>
                  <select 
                    id="service" 
                    name="service"
                    className="w-full h-12 px-4 border border-white/10 rounded-md bg-zinc-900 text-white focus:border-emerald-500"
                    required
                  >
                    <option value="" className="bg-zinc-900 text-white">Select a service</option>
                    <option value="website-design" className="bg-zinc-900 text-white">Website Design</option>
                    <option value="ads-management" className="bg-zinc-900 text-white">Ads Management</option>
                    <option value="ai-automation" className="bg-zinc-900 text-white">AI Automation</option>
                    <option value="complete-package" className="bg-zinc-900 text-white">Complete Package</option>
                    <option value="consultation" className="bg-zinc-900 text-white">Consultation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Project Details *</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-emerald-500"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#C5FF4A] hover:bg-[#d4ff6a] text-black rounded-xl h-14 text-lg font-semibold shadow-2xl shadow-[#C5FF4A]/30"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/15 via-transparent to-cyan-600/15"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Prefer a <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Quick Call?</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Book a free 15-minute strategy call with our team.
            </p>
            <Button asChild size="lg" className="bg-[#C5FF4A] hover:bg-[#d4ff6a] text-black rounded-full px-10 py-7 font-semibold shadow-2xl shadow-[#C5FF4A]/30">
              <a href="/book-appointment">
                Book a Call <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
