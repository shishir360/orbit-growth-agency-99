import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Zap, Globe, Target, Bot, ArrowRight, Shield, HeadphonesIcon } from "lucide-react";
import SEO from "@/components/ui/seo";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const services = [
    {
      category: "Website Design",
      icon: Globe,
      color: "from-red-500 to-orange-500",
      packages: [
        {
          name: "Starter",
          price: "$150 - $200",
          period: "one-time",
          description: "Perfect for small businesses",
          features: ["5 pages", "Mobile-friendly", "Basic SEO", "Contact form", "1 month support"],
          popular: false
        },
        {
          name: "Professional",
          price: "$250 - $350",
          period: "one-time",
          description: "For growing businesses",
          features: ["Custom design", "Advanced UI/UX", "Blog & CMS", "Advanced SEO", "Analytics", "3 months support"],
          popular: true
        },
        {
          name: "E-commerce",
          price: "$400 - $600",
          period: "one-time",
          description: "Complete online store",
          features: ["Online store", "Payment gateway", "Product catalog", "Inventory", "6 months support"],
          popular: false
        }
      ]
    },
    {
      category: "Ads Management",
      icon: Target,
      color: "from-orange-500 to-yellow-500",
      packages: [
        {
          name: "Campaign Setup",
          price: "$50 - $70",
          period: "one-time",
          description: "Initial campaign setup",
          features: ["Google Ads", "Facebook Ads", "Targeting setup", "Conversion tracking"],
          popular: false
        },
        {
          name: "Monthly Management",
          price: "$80 - $120",
          period: "per month",
          description: "Ongoing optimization",
          features: ["Performance monitoring", "Budget optimization", "Keyword optimization", "ROI tracking"],
          popular: true
        },
        {
          name: "Complete Package",
          price: "$150 - $200",
          period: "per month",
          description: "Full management",
          features: ["Setup + Management", "Ad creative design", "Monthly reports", "Priority support"],
          popular: false
        }
      ]
    },
    {
      category: "AI Automation",
      icon: Bot,
      color: "from-purple-500 to-pink-500",
      packages: [
        {
          name: "AI Chatbot",
          price: "$60 - $100",
          period: "one-time",
          description: "Chatbot integration",
          features: ["Website chatbot", "Messenger bot", "Auto-replies", "FAQ setup"],
          popular: false
        },
        {
          name: "Workflow Automation",
          price: "$80 - $120",
          period: "one-time",
          description: "Process automation",
          features: ["Email automation", "CRM integration", "Task automation", "Custom triggers"],
          popular: true
        },
        {
          name: "Full Automation",
          price: "$150 - $250",
          period: "one-time",
          description: "Complete setup",
          features: ["Chatbot + Workflows", "Content automation", "Social automation", "3 months support"],
          popular: false
        }
      ]
    }
  ];

  const categories = ["all", "Website Design", "Ads Management", "AI Automation"];
  const filteredServices = selectedCategory === "all" ? services : services.filter(s => s.category === selectedCategory);

  useEffect(() => {
    document.title = "Affordable Digital Marketing Packages | Lunexo Media Pricing";
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEO
        title="Affordable Digital Marketing Packages | Lunexo Media Pricing"
        description="Transparent pricing for SEO, ads, website design, and AI automation."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/pricing"
        keywords="pricing, packages, digital marketing pricing, web design cost"
      />
      
      <Navigation />
      
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-r from-purple-600/15 to-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Sparkles className="w-4 h-4" />
              Transparent Pricing
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Simple
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Pricing Plans
              </span>
            </h1>
            
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12">
              Choose the perfect plan for your business. No hidden fees, just results.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0"
                      : "border-white/20 text-white/70 bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Services" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 relative">
        <div className="container-wide section-padding space-y-24">
          {filteredServices.map((service) => (
            <div key={service.category}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                    {service.category}
                  </h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {service.packages.map((pkg) => (
                  <div key={pkg.name} className={`relative group ${pkg.popular ? 'md:-mt-4 md:mb-4' : ''}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    <div className={`relative bg-white/5 border rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 h-full ${
                      pkg.popular ? 'border-blue-500/50 bg-white/8' : 'border-white/10 hover:bg-white/8'
                    }`}>
                      {pkg.popular && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                          <Star className="w-3 h-3 mr-1" /> Popular
                        </Badge>
                      )}
                      
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                        <p className="text-white/50 text-sm mb-4">{pkg.description}</p>
                        <div className="text-3xl font-bold text-white">
                          {pkg.price}
                          <span className="text-sm text-white/50 font-normal">/{pkg.period}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/70">
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button asChild className={`w-full rounded-xl ${
                        pkg.popular 
                          ? `bg-gradient-to-r ${service.color} text-white hover:opacity-90`
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                      }`}>
                        <Link to="/contact">
                          Get Started <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-transparent to-emerald-600/5"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Why <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Choose Us?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Money-Back Guarantee", desc: "30-day risk-free trial", color: "from-green-500 to-emerald-500" },
              { icon: Zap, title: "Fast Implementation", desc: "Get started in 24-48 hours", color: "from-yellow-500 to-orange-500" },
              { icon: HeadphonesIcon, title: "Expert Support", desc: "Dedicated team for all clients", color: "from-blue-500 to-cyan-500" }
            ].map((benefit, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center hover:bg-white/8 transition-all">
                <div className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/50 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Need a <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Custom Quote?</span>
            </h2>
            <p className="text-lg text-white/50 mb-10">
              Let's discuss your specific requirements and create a tailored solution.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-full px-10 py-7">
              <Link to="/contact">
                Get Custom Quote <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
