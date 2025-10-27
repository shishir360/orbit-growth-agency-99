import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
// React Router Link removed for full page reloads
import SEO from "@/components/ui/seo";
import { Check, Zap, Clock, Users, Heart, ArrowRight, Sparkles, Code, Palette, Rocket, Target, Globe, Bot, Star, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import founderImage from "@/assets/founder-farhan.jpg";

const About = () => {
  const services = [
    {
      icon: <Globe className="w-10 h-10" />,
      bgGradient: "from-blue-500 via-purple-500 to-indigo-600",
      iconBg: "bg-gradient-to-br from-blue-100 to-purple-100",
      title: "Website Design & Development", 
      description: "We create stunning, high-converting websites that not only look incredible but drive real business results. From concept to launch, every detail is crafted to perfection.",
      perfectFor: ["Small Businesses", "E-commerce Stores", "Professional Services", "SaaS Platforms"],
      included: ["Custom responsive design", "Advanced SEO optimization", "Performance optimization", "CMS integration", "E-commerce functionality"],
      cta: "Start Your Website",
      accent: "bg-gradient-to-r from-blue-600 to-purple-600",
      stats: "300+ websites built"
    },
    {
      icon: <Target className="w-10 h-10" />,
      bgGradient: "from-emerald-500 via-teal-500 to-cyan-500",
      iconBg: "bg-gradient-to-br from-emerald-100 to-teal-100",
      title: "Google & Facebook Ads",
      description: "Data-driven advertising campaigns that maximize your ROI. We don't just run ads - we create strategic campaigns that turn clicks into customers and scale your business profitably.",
      perfectFor: ["Lead Generation", "E-commerce Sales", "Brand Awareness", "Local Businesses"],
      included: ["Campaign strategy & setup", "Ad creative development", "Advanced targeting", "Performance optimization", "Detailed analytics & reporting"],
      cta: "Scale Your Ads",
      accent: "bg-gradient-to-r from-emerald-600 to-teal-600",
      stats: "$2M+ ad spend managed"
    },
    {
      icon: <Bot className="w-10 h-10" />,
      bgGradient: "from-purple-500 via-pink-500 to-rose-500",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
      title: "AI Automation Solutions",
      description: "Transform your business operations with intelligent automation. From chatbots to workflow automation, we help you work smarter, not harder, with cutting-edge AI technology.",
      perfectFor: ["Customer Support", "Lead Qualification", "Data Processing", "Marketing Automation"],
      included: ["AI chatbot development", "Workflow automation", "CRM integrations", "Custom AI models", "24/7 monitoring & support"],
      cta: "Automate Your Business",
      accent: "bg-gradient-to-r from-purple-600 to-pink-600",
      stats: "80% efficiency increase"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award className="w-10 h-10" />,
      title: "Proven Results",
      description: "Track record of delivering measurable growth for 500+ businesses",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Lightning Fast", 
      description: "Get your project launched in weeks, not months",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "White-Glove Service",
      description: "Dedicated support and personalized attention for every client",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Growth Focused",
      description: "Every solution is designed to scale and grow with your business",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const approach = [
    "Fast turnaround on all projects",
    "User-focused design principles", 
    "Ongoing support & maintenance"
  ];

  useEffect(() => {
    document.title = "About Lunexo Media | Your Partner in Digital Growth";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn more about Lunexo Media, our mission, vision, and expert team dedicated to driving your business success with innovative marketing.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO
        title="About Lunexo Media | Your Partner in Digital Growth"
        description="Learn more about Lunexo Media, our mission, vision, and expert team dedicated to driving your business success with innovative marketing."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/about"
        keywords="about us, digital agency, Farhan Tanvir, our story, our mission, digital marketing team"
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 ultra-premium-hero">
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary bg-white/60 backdrop-blur-sm border border-white/20 rounded-full mb-8 shadow-lg">
                <Sparkles className="w-4 h-4" />
                Our Story
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  About Lunexo Media
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                We're not just another digital agency. We're your strategic partner in building 
                <span className="font-semibold premium-gradient-text"> scalable, profitable digital solutions</span> that drive real business growth.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From stunning websites to powerful AI automation, we combine cutting-edge technology with proven strategies to deliver exceptional results.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { number: "50+", label: "Clients Served" },
                  { number: "300+", label: "Websites Built" },
                  { number: "$2M+", label: "Ad Spend Managed" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold premium-gradient-text">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <a href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            
            <div className="relative animate-fade-in delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="luxury-card relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-muted-foreground ml-2">Our Mission</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Making Digital Growth Accessible
                </h3>
                <div className="space-y-4">
                  {approach.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group hover:bg-white/50 p-3 rounded-xl transition-all duration-200">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent to-gray-50/30">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-purple-600 bg-purple-100/60 backdrop-blur-sm border border-purple-200/50 rounded-full mb-6">
              <Code className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three core services designed to accelerate your digital growth and maximize your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.bgGradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="luxury-card relative h-full p-8">
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-r ${service.bgGradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {service.title}
                    </h3>
                    <Badge variant="outline" className="mb-4">
                      {service.stats}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 text-center">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold text-foreground">Perfect for:</span>
                    </div>
                    <div className="space-y-2">
                      {service.perfectFor.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-bold text-foreground">What's Included:</span>
                    </div>
                    <div className="space-y-2">
                      {service.included.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    asChild 
                    className={`w-full group/btn ${service.accent} hover:shadow-xl hover:scale-105 transition-all duration-300 text-white border-0`}
                    size="lg"
                  >
                    <a href="/contact">
                      {service.cta} 
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 bg-indigo-100/60 backdrop-blur-sm border border-indigo-200/50 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don't just deliver projects—we create partnerships that drive long-term success and measurable growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="luxury-card relative text-center h-full p-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Note Section */}
      <section className="relative py-20 bg-white">
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl p-8 lg:p-12 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src={founderImage}
                  alt="Farhan Tanvir - Founder & CEO"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-600 bg-teal-100/60 backdrop-blur-sm border border-teal-200/50 rounded-full">
                <Users className="w-4 h-4" />
                Meet Our Founder
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-800 to-blue-800 bg-clip-text text-transparent">
                Our Story
              </h2>
              <div className="prose prose-xl text-gray-600 space-y-6">
                <p className="text-lg leading-relaxed">
                  Hi, I'm Farhan Tanvir, Founder & CEO of Lunexo Media. I started Lunexo Media with a clear vision – to help businesses grow faster and smarter through modern web design, SEO, and digital marketing solutions.
                </p>
                <p className="text-lg leading-relaxed">
                  With strong expertise in website development, search engine optimization, social media marketing, and AI-driven automation tools, I have helped businesses build a professional online presence that attracts customers and increases sales.
                </p>
                <p className="text-lg leading-relaxed">
                  At Lunexo Media, we believe every business deserves the right digital strategy to succeed. That's why we offer comprehensive solutions tailored to your unique needs and goals.
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">— Farhan Tanvir</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container-wide section-padding text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <Rocket className="w-4 h-4" />
            Ready to Launch?
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
            Let's Build Something
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Need help deciding between a website or an AI automation? Book a free discovery call—we'll walk you through both options and help map out a plan.
          </p>
          <Button asChild size="lg" className="group bg-white text-gray-900 hover:bg-gray-100 text-xl px-10 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <a href="/book-apartment">
              Book a Discovery Call 
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;