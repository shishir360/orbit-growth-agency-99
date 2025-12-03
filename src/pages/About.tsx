import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import SEO from "@/components/ui/seo";
import { Check, Zap, Users, Heart, ArrowRight, Sparkles, Globe, Target, Bot, Star, Award, TrendingUp, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import founderImage from "@/assets/founder-farhan.jpg";

const About = () => {
  useEffect(() => {
    document.title = "About Lunexo Media | Your Partner in Digital Growth";
  }, []);

  const services = [
    {
      icon: Globe,
      title: "Website Design",
      description: "Stunning, high-converting websites that drive business results.",
      stats: "300+ websites built",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Ads Management",
      description: "Data-driven campaigns that maximize your ROI.",
      stats: "$10K+ ad spend managed",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Bot,
      title: "AI Automation",
      description: "Intelligent automation that streamlines operations.",
      stats: "80% efficiency increase",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const values = [
    { icon: Award, title: "Proven Results", desc: "Track record of delivering measurable growth", color: "from-yellow-500 to-orange-500" },
    { icon: Zap, title: "Lightning Fast", desc: "Get your project launched in weeks, not months", color: "from-blue-500 to-purple-500" },
    { icon: Heart, title: "White-Glove Service", desc: "Dedicated support for every client", color: "from-pink-500 to-rose-500" },
    { icon: TrendingUp, title: "Growth Focused", desc: "Every solution designed to scale", color: "from-emerald-500 to-teal-500" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEO
        title="About Lunexo Media | Your Partner in Digital Growth"
        description="Learn more about Lunexo Media, our mission, vision, and expert team dedicated to driving your business success."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/about"
        keywords="about us, digital agency, Farhan Tanvir, our story, digital marketing team"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-cyan-500/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-r from-purple-600/15 to-pink-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl">
                <Sparkles className="w-4 h-4" />
                Our Story
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight" style={{fontFamily: "'Playfair Display', serif"}}>
                About
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Lunexo Media
                </span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                We're not just another digital agency. We're your strategic partner in building scalable, profitable digital solutions that drive real business growth.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: "50+", label: "Clients" },
                  { number: "300+", label: "Projects" },
                  { number: "$10K+", label: "Revenue" }
                ].map((stat, i) => (
                  <div key={i} className="text-center bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-full px-8">
                <Link to="/contact">
                  Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Our Mission</h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  Making digital growth accessible to businesses of all sizes through innovative technology and proven strategies.
                </p>
                <div className="space-y-3">
                  {["Fast turnaround on all projects", "User-focused design principles", "Ongoing support & maintenance"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/70">
                      <Check className="w-5 h-5 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-[150px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              What We <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Do Best</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/8 transition-all duration-300 h-full text-center">
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-sm text-white/60 mb-2">{service.stats}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/70">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-green-600/10 to-emerald-500/10 rounded-full blur-[150px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Our <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Values</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/8 transition-all duration-300 text-center">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/70 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-teal-600/10 to-cyan-500/10 rounded-full blur-[150px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-teal-500/30 to-cyan-500/20 rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl p-8 flex items-center justify-center">
                <img
                  src={founderImage}
                  alt="Farhan Tanvir - Founder & CEO"
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 text-teal-400 px-6 py-3 rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                Meet Our Founder
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Farhan <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Tanvir</span>
              </h2>
              
              <p className="text-white/70 leading-relaxed">
                I started Lunexo Media with a clear vision – to help businesses grow faster and smarter through modern web design, SEO, and digital marketing solutions.
              </p>
              
              <p className="text-white/70 leading-relaxed">
                With years of experience in the digital space, I've helped countless businesses transform their online presence and achieve their goals.
              </p>
              
              <Button asChild className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 rounded-full px-8">
                <Link to="/founder">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Ready to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Get Started?</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Let's discuss your project and create a strategy for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-full px-10 py-7">
                <Link to="/contact">
                  Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full px-10 py-7">
                <Link to="/portfolio">
                  View Our Work
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

export default About;
