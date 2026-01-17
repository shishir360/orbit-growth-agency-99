import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Briefcase, 
  Users, 
  TrendingUp,
  ArrowRight, 
  Linkedin, 
  Twitter,
  Mail,
  Facebook,
  CheckCircle2,
  Calendar,
  Rocket,
  Heart,
  Globe,
  Star,
  Zap
} from "lucide-react";

import founderImage from "@/assets/founder-farhan.jpg";

const FounderFarhan = () => {
  const stats = [
    { icon: Briefcase, value: "50+", label: "Projects Completed" },
    { icon: Users, value: "30+", label: "Happy Clients" },
    { icon: TrendingUp, value: "$10K+", label: "Revenue Generated" },
    { icon: Award, value: "5+", label: "Years Experience" }
  ];

  const skills = [
    "Digital Marketing Strategy",
    "Web Design & Development", 
    "AI & Automation Solutions",
    "Google & Meta Ads",
    "SEO & Content Marketing",
    "Business Growth Consulting"
  ];

  const timeline = [
    { year: "2019", title: "Digital Journey Begins", description: "Started learning web development and digital marketing fundamentals" },
    { year: "2020", title: "First Clients", description: "Began freelancing and building websites for local businesses" },
    { year: "2021", title: "Founded Lunexo Media", description: "Launched the agency to help businesses grow digitally" },
    { year: "2022", title: "Services Expansion", description: "Added AI automation and advanced marketing services" },
    { year: "2023", title: "50+ Projects Milestone", description: "Reached milestone of 50+ successful client projects" },
    { year: "2024", title: "Global Reach", description: "Now serving clients across USA, UK, and worldwide" }
  ];

  const values = [
    { icon: Rocket, title: "Innovation", description: "Always exploring cutting-edge solutions" },
    { icon: Heart, title: "Passion", description: "Genuinely care about client success" },
    { icon: Globe, title: "Global Vision", description: "Thinking big, acting local" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEO
        title="Farhan Tanvier - Founder & CEO | Lunexo Media"
        description="Meet Farhan Tanvier, the visionary founder and CEO of Lunexo Media. Passionate about helping businesses thrive through innovative digital solutions."
        url="https://www.lunexomedia.com/farhan-tanvier"
        keywords="Farhan Tanvier, Lunexo Media founder, CEO, digital marketing expert, entrepreneur"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-[700px] h-[700px] bg-gradient-to-r from-violet-600/25 to-fuchsia-500/20 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-r from-cyan-600/20 to-blue-500/15 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-amber-600/10 to-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 border border-violet-500/30 text-violet-300 px-8 py-4 rounded-full text-sm font-medium backdrop-blur-xl mb-10 animate-fade-in">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                Founder & Chief Executive Officer
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              
              {/* Name */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-8 animate-fade-in" style={{fontFamily: "'Playfair Display', serif", animationDelay: '0.2s'}}>
                Farhan
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Tanvier
                </span>
              </h1>
              
              {/* Tagline */}
              <p className="text-xl lg:text-2xl text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light mb-10 animate-fade-in" style={{animationDelay: '0.4s'}}>
                Visionary digital strategist and entrepreneur dedicated to transforming businesses through innovative web design, marketing, and AI-powered solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl flex items-center justify-center hover:bg-white/15 hover:border-white/25 hover:scale-110 transition-all duration-300 group">
                  <Linkedin className="w-6 h-6 text-white/70 group-hover:text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl flex items-center justify-center hover:bg-white/15 hover:border-white/25 hover:scale-110 transition-all duration-300 group">
                  <Twitter className="w-6 h-6 text-white/70 group-hover:text-white" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl flex items-center justify-center hover:bg-white/15 hover:border-white/25 hover:scale-110 transition-all duration-300 group">
                  <Facebook className="w-6 h-6 text-white/70 group-hover:text-white" />
                </a>
                <a href="mailto:farhan@lunexomedia.com" className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl flex items-center justify-center hover:bg-white/15 hover:border-white/25 hover:scale-110 transition-all duration-300 group">
                  <Mail className="w-6 h-6 text-white/70 group-hover:text-white" />
                </a>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{animationDelay: '0.8s'}}>
                <Button asChild size="lg" className="group text-lg px-12 py-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-2xl shadow-violet-500/30">
                  <a href="https://lunexomedia.com/book-appointment" className="flex items-center gap-3">
                    Let's Work Together
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-12 py-8 border-2 border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/30 rounded-full transition-all duration-300 backdrop-blur-sm">
                  <a href="https://lunexomedia.com/portfolio">
                    View My Work
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="absolute -inset-6 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/25 to-pink-500/20 rounded-3xl blur-3xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-2 rounded-3xl backdrop-blur-sm border border-white/15 shadow-2xl">
                <img
                  src={founderImage}
                  alt="Farhan Tanvier - Founder & CEO of Lunexo Media"
                  className="w-full h-auto rounded-2xl"
                />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-green-500/30 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Available for Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="group relative bg-gradient-to-br from-white/8 to-white/3 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/50 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-cyan-600/15 to-blue-500/15 rounded-full blur-[180px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/25 text-cyan-300 px-6 py-3 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                About Me
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Passionate About
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Digital Excellence
                </span>
              </h2>
              
              <div className="space-y-5 text-white/60 leading-relaxed text-lg">
                <p>
                  I'm Farhan Tanvier, a digital entrepreneur and the founder of Lunexo Media. My journey began with a simple passion: helping businesses succeed in the digital world.
                </p>
                <p>
                  Over the years, I've had the privilege of working with startups, small businesses, and established brands, helping them build their online presence and scale their operations.
                </p>
                <p>
                  At Lunexo Media, we combine creativity with strategy to deliver results that matter. Whether it's a stunning website, a high-converting ad campaign, or AI-powered automation, we're here to help your business thrive.
                </p>
              </div>
            </div>
            
            {/* Skills Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-3xl p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Zap className="w-7 h-7 text-amber-400" />
                  Areas of Expertise
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/80 text-lg group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="group-hover:text-white transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 relative">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 text-amber-300 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Core Values
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              What Drives
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"> Me Forward</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="group bg-gradient-to-br from-white/8 to-white/3 border border-white/10 rounded-3xl p-10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/50">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/15 to-fuchsia-500/15 rounded-full blur-[180px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 border border-violet-500/25 text-violet-300 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              My Journey
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              The Path to
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"> Success</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((item, i) => (
              <div key={i} className="group relative bg-gradient-to-br from-white/8 to-white/3 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/15 to-violet-600/20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-violet-500/25 to-fuchsia-500/25 rounded-full blur-[150px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 text-white/80 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-10">
              <Zap className="w-5 h-5 text-amber-400" />
              Let's Connect
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8" style={{fontFamily: "'Playfair Display', serif"}}>
              Ready to Build
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Something Amazing?
              </span>
            </h2>
            
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto font-light">
              I'm always excited to work on new projects and help businesses grow. Let's discuss how we can work together to achieve your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="group text-lg px-14 py-8 bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-2xl">
                <a href="https://lunexomedia.com/book-appointment" className="flex items-center gap-3">
                  Get In Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-14 py-8 border-2 border-white/25 text-white bg-white/5 hover:bg-white/10 hover:border-white/35 rounded-full transition-all duration-300 backdrop-blur-sm">
                <a href="https://lunexomedia.com/about">
                  About Lunexo Media
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

export default FounderFarhan;