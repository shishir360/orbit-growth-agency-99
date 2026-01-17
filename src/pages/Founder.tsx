import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Briefcase, 
  Users, 
  Target, 
  Zap, 
  ArrowRight, 
  Linkedin, 
  Twitter,
  Mail,
  Globe,
  TrendingUp,
  Star,
  CheckCircle2,
  Calendar
} from "lucide-react";

import founderImage from "@/assets/founder-farhan.jpg";

const Founder = () => {
  const achievements = [
    { icon: Briefcase, value: "50+", label: "Projects Delivered" },
    { icon: Users, value: "30+", label: "Happy Clients" },
    { icon: TrendingUp, value: "$10K+", label: "Revenue Generated" },
    { icon: Award, value: "5+", label: "Years Experience" }
  ];

  const expertise = [
    "Digital Marketing Strategy",
    "Web Design & Development",
    "AI & Automation Solutions",
    "Google & Meta Ads",
    "SEO & Content Marketing",
    "Business Growth Consulting"
  ];

  const journey = [
    { year: "2019", title: "Started Digital Journey", description: "Began learning web development and digital marketing" },
    { year: "2020", title: "First Clients", description: "Started freelancing and building websites for local businesses" },
    { year: "2021", title: "Agency Foundation", description: "Founded Lunexo Media to help businesses grow digitally" },
    { year: "2022", title: "Expanded Services", description: "Added AI automation and advanced marketing services" },
    { year: "2023", title: "50+ Projects", description: "Reached milestone of 50+ successful client projects" },
    { year: "2024", title: "Global Reach", description: "Serving clients across USA, UK, and beyond" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <SEO
        title="Farhan Tanvier - Founder & CEO | Lunexo Media"
        description="Meet Farhan Tanvier, the founder and CEO of Lunexo Media. A passionate digital strategist helping businesses grow through web design, marketing, and AI automation."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/founder"
        keywords="Farhan Tanvier, Lunexo Media founder, CEO, digital marketing expert, web design, AI automation, business growth"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-cyan-500/15 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/15 to-pink-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl">
                <Award className="w-4 h-4" />
                Founder & CEO
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Farhan
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Tanvier
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl font-light">
                A passionate digital strategist and entrepreneur dedicated to helping businesses thrive in the digital age. Founder of Lunexo Media, transforming brands through innovative web design, marketing, and AI solutions.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all">
                  <Linkedin className="w-5 h-5 text-white/70" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all">
                  <Twitter className="w-5 h-5 text-white/70" />
                </a>
                <a href="mailto:farhan@lunexomedia.com" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all">
                  <Mail className="w-5 h-5 text-white/70" />
                </a>
              </div>
              
              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="group text-base px-10 py-7 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg shadow-blue-500/25">
                  <a href="https://lunexomedia.com/book-appointment" className="flex items-center gap-2">
                    Work With Me
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base px-10 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
                  <a href="https://lunexomedia.com/portfolio">
                    View My Work
                  </a>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-scale-in" style={{animationDelay: '0.3s'}}>
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 via-cyan-500/25 to-teal-500/20 rounded-3xl blur-3xl opacity-60"></div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((stat, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/10 to-pink-500/10 rounded-full blur-[150px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 px-6 py-3 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                My Story
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
                Passionate About
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Digital Growth
                </span>
              </h2>
              
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  I'm Farhan Tanvier, a digital entrepreneur and the founder of Lunexo Media. My journey began with a simple passion: helping businesses succeed in the digital world.
                </p>
                <p>
                  Over the years, I've had the privilege of working with startups, small businesses, and established brands, helping them build their online presence, attract customers, and scale their operations.
                </p>
                <p>
                  At Lunexo Media, we combine creativity with strategy to deliver results that matter. Whether it's a stunning website, a high-converting ad campaign, or AI-powered automation, we're here to help your business thrive.
                </p>
              </div>
            </div>
            
            {/* Expertise */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-cyan-400" />
                Areas of Expertise
              </h3>
              <div className="space-y-3">
                {expertise.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 relative">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-orange-400 px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              My Journey
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              The Path to
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent"> Success</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journey.map((item, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                  {item.year}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-blue-600/20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <Zap className="w-4 h-4 text-yellow-400" />
              Let's Connect
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
              Ready to Build
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Something Amazing?
              </span>
            </h2>
            
            <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto font-light">
              I'm always excited to work on new projects and help businesses grow. Let's discuss how we can work together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group text-base px-10 py-7 bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 hover:scale-105 font-semibold">
                <a href="https://lunexomedia.com/book-appointment" className="flex items-center gap-2">
                  Get In Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-10 py-7 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-sm">
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

export default Founder;
