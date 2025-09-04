import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Mail, Phone, Sparkles, Zap, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SocialMedia from "@/components/ui/social-media";
import SEO from "@/components/ui/seo";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const webhookUrl = "https://hook.eu2.make.com/wvpplt3xrjgpmpfhneucen1ywgladsfo";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Setup Required",
        description: "Please enter your Zapier webhook URL in the admin section above.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      countryCode: formData.get("countryCode"),
      company: formData.get("company"),
      service: formData.get("service"),
      message: formData.get("message"),
      timestamp: new Date().toISOString(),
      source: "Contact Form"
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

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
    }

    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "WhatsApp",
      description: "Get instant responses to quick questions",
      action: "Message us",
      href: "https://wa.me/8801339731664"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "Send us detailed project information",
      action: "hello@lunexomedia.com",
      href: "mailto:hello@lunexomedia.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Speak directly with our team",
      action: "+1 (702) 483-0749",
      href: "tel:+17024830749"
    }
  ];

  useEffect(() => {
    document.title = "Contact Lunexo Media | Let's Grow Your Business";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with Lunexo Media for SEO, paid ads, and web design solutions. Let\'s discuss how we can scale your business together.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Lunexo Media | Let's Grow Your Business"
        description="Get in touch with Lunexo Media for SEO, paid ads, and web design solutions. Let's discuss how we can scale your business together."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/contact"
      />
      
      <Navigation />
      
      {/* Modern Hero Section */}
      <section className="py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-primary/10 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium border border-primary/20 glass-card mb-8">
              <Sparkles className="w-4 h-4 icon-glow" />
              GET IN TOUCH
            </div>
            <h1 className="text-5xl lg:text-7xl font-space font-bold mb-8 leading-tight">
              <span className="text-foreground">Contact</span>
              <br />
              <span className="text-gradient">
                Lunexo Media
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Ready to launch your next project? We'd love to hear about your vision 
              and discuss how we can help bring it to life with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Contact Methods */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-gradient">
                Get in Touch with Our Team
              </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose the method that works best for you. We're here to help you succeed!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={index} className="group animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="modern-card text-center h-full">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-glow group-hover:animate-float">
                      {method.icon}
                    </div>
                    <CardTitle className="font-space text-foreground">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-8 leading-relaxed">{method.description}</p>
                    <Button asChild variant="outline" className="w-full bg-gradient-primary/5 hover:bg-gradient-primary hover:text-white border-primary/20 hover:border-primary transition-all duration-300 hover:scale-105">
                      <a href={method.href} target="_blank" rel="noopener noreferrer">
                        {method.action}
                      </a>
                    </Button>
                  </CardContent>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Form */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-accent-cta/15 to-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md text-primary px-8 py-4 rounded-full text-lg font-bold border border-primary/30 mb-8">
                <Sparkles className="w-6 h-6" />
                Book Your Free Consultation
              </div>
              <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                <span className="text-foreground">Let's Discuss</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent-cta to-accent bg-clip-text text-transparent">Your Project</span>
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Ready to transform your business? Fill out our premium booking form and we'll schedule your 
                <span className="text-accent-cta font-bold"> free strategy session</span> within 24 hours.
              </p>
            </div>

            <div className="animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-accent-cta/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  {/* Premium Header */}
                  <div className="bg-gradient-to-r from-primary via-accent to-accent-cta p-8 text-white text-center">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2">Premium Consultation Booking</h3>
                    <p className="text-white/90 text-lg">Get expert insights tailored to your business goals</p>
                  </div>
                  
                  <div className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Personal Information */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                          <h4 className="text-xl font-bold text-foreground">Personal Information</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="firstName" className="text-foreground font-semibold text-lg">First Name *</Label>
                            <Input 
                              id="firstName" 
                              name="firstName" 
                              required 
                              className="h-14 text-lg bg-white/50 border-2 border-primary/20 focus:border-primary focus:bg-white transition-all duration-300 rounded-xl"
                              placeholder="Enter your first name"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="lastName" className="text-foreground font-semibold text-lg">Last Name *</Label>
                            <Input 
                              id="lastName" 
                              name="lastName" 
                              required 
                              className="h-14 text-lg bg-white/50 border-2 border-primary/20 focus:border-primary focus:bg-white transition-all duration-300 rounded-xl"
                              placeholder="Enter your last name"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-foreground font-semibold text-lg">Email Address *</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            required 
                            className="h-14 text-lg bg-white/50 border-2 border-primary/20 focus:border-primary focus:bg-white transition-all duration-300 rounded-xl"
                            placeholder="your.email@company.com"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="phone" className="text-foreground font-semibold text-lg">Phone Number *</Label>
                          <div className="flex gap-3">
                            <select 
                              id="countryCode" 
                              name="countryCode"
                              required
                              className="h-14 px-4 border-2 border-primary/20 rounded-xl bg-white/50 text-foreground text-lg min-w-[120px] focus:border-primary focus:bg-white transition-all duration-300"
                            >
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+44">🇬🇧 +44</option>
                              <option value="+33">🇫🇷 +33</option>
                              <option value="+49">🇩🇪 +49</option>
                              <option value="+39">🇮🇹 +39</option>
                              <option value="+34">🇪🇸 +34</option>
                              <option value="+31">🇳🇱 +31</option>
                              <option value="+32">🇧🇪 +32</option>
                              <option value="+41">🇨🇭 +41</option>
                              <option value="+43">🇦🇹 +43</option>
                              <option value="+45">🇩🇰 +45</option>
                              <option value="+46">🇸🇪 +46</option>
                              <option value="+47">🇳🇴 +47</option>
                              <option value="+358">🇫🇮 +358</option>
                              <option value="+61">🇦🇺 +61</option>
                              <option value="+64">🇳🇿 +64</option>
                              <option value="+81">🇯🇵 +81</option>
                              <option value="+82">🇰🇷 +82</option>
                              <option value="+86">🇨🇳 +86</option>
                              <option value="+91">🇮🇳 +91</option>
                              <option value="+55">🇧🇷 +55</option>
                              <option value="+52">🇲🇽 +52</option>
                              <option value="+27">🇿🇦 +27</option>
                            </select>
                            <Input 
                              id="phone" 
                              name="phone" 
                              type="tel" 
                              required
                              placeholder="123 456 7890"
                              className="flex-1 h-14 text-lg bg-white/50 border-2 border-primary/20 focus:border-primary focus:bg-white transition-all duration-300 rounded-xl"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Business Information */}
                      <div className="space-y-6 pt-8 border-t border-primary/20">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent-cta rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                          <h4 className="text-xl font-bold text-foreground">Business Information</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="company" className="text-foreground font-semibold text-lg">Company Name</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            className="h-14 text-lg bg-white/50 border-2 border-primary/20 focus:border-primary focus:bg-white transition-all duration-300 rounded-xl"
                            placeholder="Your company or organization"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="service" className="text-foreground font-semibold text-lg">Primary Service Interest *</Label>
                          <select 
                            id="service" 
                            name="service"
                            className="w-full h-14 px-4 border-2 border-primary/20 rounded-xl bg-white/50 text-foreground text-lg focus:border-primary focus:bg-white transition-all duration-300"
                            required
                          >
                            <option value="">Choose your primary interest</option>
                            <option value="website-design">🎨 Website Design & Development</option>
                            <option value="ads-management">📈 Google & Meta Ads Management</option>
                            <option value="ai-automation">🤖 AI Automation & Workflows</option>
                            <option value="complete-package">⭐ Complete Digital Package</option>
                            <option value="consultation">💬 Strategy Consultation Only</option>
                          </select>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="space-y-6 pt-8 border-t border-primary/20">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 bg-gradient-to-r from-accent-cta to-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                          <h4 className="text-xl font-bold text-foreground">Project Details</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="message" className="text-foreground font-semibold text-lg">Tell Us About Your Project *</Label>
                          <Textarea 
                            id="message" 
                            name="message"
                            placeholder="Describe your project goals, current challenges, timeline, and any specific requirements. The more details you provide, the better we can prepare for our consultation."
                            className="min-h-[150px] text-lg bg-white/50 border-2 border-primary/20 focus:border-primary focus:bg-white transition-all duration-300 rounded-xl resize-none"
                            required 
                          />
                        </div>
                      </div>
                      
                      {/* Premium Submit Button */}
                      <div className="pt-8">
                        <Button 
                          type="submit" 
                          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary via-accent to-accent-cta hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] rounded-2xl" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Zap className="w-6 h-6 mr-3 animate-spin" />
                              Booking Your Consultation...
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6 mr-3" />
                              Book My Free Strategy Session
                            </>
                          )}
                        </Button>
                        
                        <p className="text-center text-muted-foreground mt-4 text-sm">
                          🔒 Your information is secure and confidential. We'll respond within 24 hours.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern FAQ Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-space font-bold mb-6 text-gradient">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on scope and complexity. Website projects typically take 2-6 weeks, while AI automation implementations can take 1-4 weeks. We'll provide a detailed timeline during our initial consultation."
              },
              {
                question: "Do you offer ongoing support?",
                answer: "Yes! We offer various support packages including maintenance, updates, ad management, and performance optimization to ensure your project continues to deliver results."
              },
              {
                question: "What's included in the initial consultation?",
                answer: "Our free consultation includes project scoping, timeline estimation, technology recommendations, and a detailed proposal with transparent pricing. No obligations, just valuable insights for your project."
              },
              {
                question: "Do you work with startups?",
                answer: "Absolutely! We love working with startups and entrepreneurs. We offer flexible pricing options and can help prioritize features to launch your MVP quickly and cost-effectively."
              }
            ].map((faq, index) => (
              <div key={index} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="modern-card p-8">
                  <h3 className="text-xl font-space font-semibold mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Social Media Section */}
      <section className="py-16 bg-muted/20 relative">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center">
            <SocialMedia variant="contact" className="max-w-md mx-auto" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;