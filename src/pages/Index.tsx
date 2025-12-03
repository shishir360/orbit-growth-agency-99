import { YouTubeFacade } from '@/components/ui/youtube-facade';
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import TrustedBy from "@/components/ui/trusted-by";
import SEO from "@/components/ui/seo";
import { useContent } from "@/contexts/ContentContext";
import { Globe, Target, Bot, Sparkles, ArrowRight, Zap, Check, Star, Calendar, Users, Award, TrendingUp, Play, ChevronRight, MessageSquare, Clock, Shield } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import heroDashboard from "@/assets/hero-dashboard-optimized.webp";
import { Link } from "react-router-dom";

const Index = () => {
  const { content } = useContent();

  const visibleTestimonials = useMemo(() => 
    content.testimonials
      .filter(testimonial => testimonial.visible)
      .sort((a, b) => a.order - b.order), [content.testimonials]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEO
        title="Lunexo Media | Digital Marketing & Growth Solutions"
        description="Lunexo Media helps businesses grow with SEO, paid ads, web design, and AI automation. Get data-driven strategies to scale your brand."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com"
        keywords="digital marketing, SEO services, Google ads, web design, AI automation, business growth, Lunexo Media"
      />
      
      <Navigation />
      
      {/* Ultra Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-red-600/30 to-orange-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-pink-500/15 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-white/3 to-transparent rounded-full"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in" style={{ animationDuration: '0.4s' }}>
              {/* Premium badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 text-white/90 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <Award className="w-4 h-4 text-yellow-400" />
                </span>
                Trusted by 50+ businesses worldwide
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                We Build
                <br />
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Digital Empires
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl font-light">
                Premium website design, performance ads & AI automation — crafted for ambitious brands ready to dominate their market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="group text-base px-10 py-7 bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-red-500/25">
                  <Link to="/contact" className="flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group text-base px-10 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    View Portfolio
                  </Link>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-6 lg:gap-10 pt-10 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white">200%</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Avg. Growth</div>
                </div>
                <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white">50+</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Projects</div>
                </div>
                <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white">10x</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mt-1">ROI</div>
                </div>
              </div>
            </div>

            {/* Video with premium frame */}
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="absolute -inset-6 bg-gradient-to-r from-red-500/30 via-orange-500/25 to-yellow-500/20 rounded-3xl blur-3xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 p-1.5 rounded-3xl backdrop-blur-sm border border-white/15 shadow-2xl">
                <YouTubeFacade
                  videoId="jQJqW8JAWWU"
                  title="YouTube video player"
                  width="100%"
                  height="315"
                  autoplay={true}
                  loop={true}
                  mute={false}
                  loading="eager"
                  className="relative w-full aspect-video rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-green-500/30 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Live Results
              </div>
            </div>
          </div>

          {/* Service Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-20 lg:mt-28">
            {[
              { icon: Globe, label: "Web Design", color: "from-red-500 to-orange-500", href: "/website-design" },
              { icon: Target, label: "Paid Ads", color: "from-orange-500 to-yellow-500", href: "/ads-management" },
              { icon: Bot, label: "AI Automation", color: "from-purple-500 to-pink-500", href: "/ai-automation" },
              { icon: Sparkles, label: "Strategy", color: "from-blue-500 to-cyan-500", href: "/contact" },
            ].map((service, i) => (
              <Link 
                key={i} 
                to={service.href}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-full px-6 py-4 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/80 font-medium">{service.label}</span>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* Services Section */}
      <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/15 to-cyan-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Zap className="w-4 h-4" />
              Our Services
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              What We <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Offer</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/50 max-w-3xl mx-auto font-light">
              Three core services designed to accelerate your digital growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Website Design",
                description: "Stunning, SEO-optimized websites that convert visitors into customers.",
                features: ["Custom Design", "SEO Optimization", "Mobile Responsive", "Fast Loading"],
                color: "from-red-500 to-orange-500",
                href: "/website-design"
              },
              {
                icon: Target,
                title: "Ads Management",
                description: "Data-driven campaigns on Google, Facebook & TikTok that maximize ROI.",
                features: ["Multi-Platform", "ROI Focused", "Advanced Targeting", "Analytics"],
                color: "from-orange-500 to-yellow-500",
                href: "/ads-management"
              },
              {
                icon: Bot,
                title: "AI Automation",
                description: "Intelligent automation and chatbots that streamline your operations.",
                features: ["Custom AI Solutions", "Workflow Automation", "Chatbots", "Integration"],
                color: "from-purple-500 to-pink-500",
                href: "/ai-automation"
              }
            ].map((service, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/50 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-white/60">
                        <Check className="w-4 h-4 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full bg-gradient-to-r ${service.color} text-white hover:opacity-90 rounded-xl`}>
                    <Link to={service.href}>
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-purple-600/5"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "200%", label: "Avg Growth", icon: TrendingUp, color: "from-red-500 to-orange-500" },
              { value: "50+", label: "Happy Clients", icon: Users, color: "from-orange-500 to-yellow-500" },
              { value: "10x", label: "ROI Achieved", icon: Award, color: "from-purple-500 to-pink-500" },
              { value: "24/7", label: "Support", icon: Clock, color: "from-blue-500 to-cyan-500" }
            ].map((stat, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/8 transition-all duration-300 text-center">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-green-600/15 to-emerald-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl">
                <Shield className="w-4 h-4" />
                Why Lunexo Media
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Built for <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">Success</span>
              </h2>
              
              <p className="text-lg text-white/50 leading-relaxed">
                We don't just build websites or run ads. We create comprehensive digital strategies that drive real business growth.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "30-Day Launch", desc: "From concept to live in 30 days" },
                  { title: "Results Focused", desc: "Every decision driven by data" },
                  { title: "Full Support", desc: "24/7 support and maintenance" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-white/50 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded-full px-8">
                <Link to="/contact">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-green-500/30 to-emerald-500/20 rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-2 rounded-3xl border border-white/15">
                <img
                  src={heroDashboard}
                  alt="Dashboard Preview"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {visibleTestimonials.length > 0 && (
        <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-r from-yellow-600/10 to-orange-500/10 rounded-full blur-[120px]"></div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
                <Star className="w-4 h-4" />
                Client Reviews
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                What Clients <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">Say</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {visibleTestimonials.slice(0, 3).map((testimonial, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-white/50 text-sm">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-orange-500/5 to-red-600/10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-[100px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Zap className="w-4 h-4 text-yellow-400" />
              Ready to Grow?
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Let's Build Your
              <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Digital Empire
              </span>
            </h2>
            
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto font-light">
              Ready to transform your business? Let's discuss your project and create a strategy for success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group text-base px-10 py-7 bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-red-500/25">
                <Link to="/contact" className="flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-10 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
                <Link to="/book-apartment">
                  Book a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
