import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import ServiceSchema from "@/components/ui/service-schema";
import FAQSchema from "@/components/ui/faq-schema";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  ArrowUpRight,
  Check,
  Star,
  Play,
  Sparkles,
  Globe,
  Palette,
  Code,
  Smartphone,
  Search,
  Gauge,
  Users,
  Shield,
  Zap,
  Target,
  LineChart,
  Clock,
  Award,
  ChevronRight,
  Layout,
  Monitor,
  ShieldCheck,
  Activity,
  Database,
  Layers,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image_url: string | null;
  technologies: string[] | null;
}

const WebsiteDesign = () => {
  const [activeService, setActiveService] = useState(0);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = "Website Design & Digital Identity | Lunexo Media";
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('published', true)
        .eq('blocked', false)
        .eq('category', 'Website Design')
        .limit(6)
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setPortfolioProjects(data);
      }
      setIsLoaded(true);
    };
    fetchProjects();
  }, []);

  const services = [
    {
      number: "01",
      title: "Responsive Architecture",
      description: "Create stunning, mobile-first architectures that resonate on every device. Our responsive designs ensure seamless user trajectories across all nodes.",
      features: ["Mobile-First Logic", "Cross-Browser Sync", "Retina Ready Assets", "Fluid Layouts"]
    },
    {
      number: "02",
      title: "UX/UI Intelligence Audit",
      description: "Transform your digital presence with intuitive logic flows. We analyze user behavior DNA and create designs that drive engagement velocity.",
      features: ["User DNA Research", "Wireframing Logic", "Interactive Prototypes", "Usability Telemetry"]
    },
    {
      number: "03",
      title: "Custom Logic Development",
      description: "Build powerful, scalable web applications using state-of-the-art technologies. From simple landing nodes to complex platforms.",
      features: ["React/Next.js Core", "Velocity Optimization", "Node Integration", "Scalable Architecture"]
    },
    {
      number: "04",
      title: "E-commerce Orchestration",
      description: "Launch your digital store with absolute confidence. We create conversion-locked e-commerce experiences that turn visitors into partners.",
      features: ["Shopify/Woo Logic", "Payment Integration", "Inventory Telemetry", "Analytics Dashboard"]
    },
    {
      number: "05",
      title: "SEO & Velocity Performance",
      description: "Boost your visibility and trajectory. We optimize every node of your website to rank higher and load faster than competitors.",
      features: ["Technical SEO Logic", "Core Web Vitals", "Speed Telemetry", "Schema Architecture"]
    }
  ];

  const processSteps = [
    { step: "01", title: "Discovery", description: "We dive deep into your business DNA, target audience, and competitive landscape." },
    { step: "02", title: "Strategy", description: "Develop a comprehensive plan including sitemap logic, user flows, and content strategy." },
    { step: "03", title: "Design", description: "Create stunning visual architectures with multiple iterations until absolute perfection." },
    { step: "04", title: "Development", description: "Build your website with clean, scalable code nodes and state-of-the-art technologies." },
    { step: "05", title: "Launch", description: "Rigorous testing, velocity optimization, and seamless deployment to production nodes." }
  ];

  const faqs = [
    {
      question: "How long does a website project take?",
      answer: "Typically 4-8 weeks depending on complexity. Simple landing nodes can be done in 2-3 weeks, while complex web architectures may take 12+ weeks."
    },
    {
      question: "What technologies do you use?",
      answer: "We primarily use React, Next.js, and TypeScript for the core architecture. For backend nodes, we leverage Node.js, Supabase, and various cloud repositories."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! We offer monthly maintenance protocols that include updates, security syncs, content changes, and velocity monitoring."
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Website Design & Digital Identity | Lunexo Media"
        description="Transform your digital presence with stunning, conversion-focused websites. Expert web design and development services that drive results."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/website-design"
        keywords="web design, website development, responsive design, UI/UX design, custom websites"
      />
      
      <ServiceSchema
        name="Website Design & Digital Identity"
        description="Professional web design and development services. We create fast, mobile-friendly, and conversion-focused websites tailored to your business needs."
        provider="Lunexo Media"
        areaServed="Worldwide"
        serviceType="Web Design, Web Development, UI/UX Design"
        url="https://www.lunexomedia.com/website-design"
        image="https://www.lunexomedia.com/og-image-new.jpg"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
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
                <Palette className="w-5 h-5 mr-3" />
                Absolute Digital Craftsmanship
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Architecting <br /> <span className="text-primary italic">Digital Excellence.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Experience the absolute repository of <span className="text-primary italic font-bold">digital masterpieces</span> engineered for high-velocity growth and absolute market dominance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center pt-8"
            >
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-20 py-12 rounded-full font-bold shadow-2xl transition-all duration-500 group" asChild>
                <Link to="/contact">
                  Begin Building
                  <ArrowRight className="w-8 h-8 ml-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-2xl px-16 py-10 rounded-full border-2 border-white/60 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 transition-all duration-500 font-bold" asChild>
                <Link to="/portfolio" className="flex items-center">
                  <Globe className="w-8 h-8 mr-4 text-primary" />
                  View Repository
                </Link>
              </Button>
            </motion.div>

            {/* Premium Visual Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative mt-32 max-w-6xl mx-auto"
            >
              <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[5rem] p-6 lg:p-12 shadow-glass overflow-hidden">
                <div className="relative rounded-[4rem] overflow-hidden group shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
                    alt="Digital Identity Preview" 
                    className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-32 h-32 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-700">
                      <Play className="w-12 h-12 text-slate-900 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Intelligence Node */}
              <motion.div 
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-16 -right-16 hidden lg:block"
              >
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3.5rem] p-12 shadow-glass space-y-6 w-96 text-center">
                  <div className="flex items-center gap-6 justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center shadow-sm">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quality Logic</div>
                      <div className="text-3xl font-black text-slate-900 tracking-tighter">Absolute.</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-32 relative overflow-hidden bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="text-center mb-24 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                <Layout className="w-5 h-5 mr-3" />
                Digital Craftsmanship Spectrum
              </Badge>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              Uncompromising <span className="text-primary italic">Quality.</span>
            </motion.h2>
          </div>

          <div className="space-y-16 max-w-7xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className={`group relative bg-white/40 border border-white/60 rounded-[4rem] p-16 lg:p-24 hover:shadow-glass transition-all duration-1000 ${activeService === i ? 'shadow-glass border-primary/30' : ''}`}
                onMouseEnter={() => setActiveService(i)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
                  <span className="text-7xl lg:text-[10rem] font-heading font-black text-primary/5 group-hover:text-primary/10 transition-colors leading-none">
                    {service.number}
                  </span>
                  <div className="flex-1 space-y-10">
                    <h3 className="text-4xl lg:text-6xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">{service.title}</h3>
                    <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-4xl">{service.description}</p>
                    <div className="flex flex-wrap gap-6 pt-6">
                      {service.features.map((feat, fi) => (
                        <div key={fi} className="flex items-center gap-5 bg-white/60 backdrop-blur-xl border border-white/60 px-10 py-5 rounded-[2rem] shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                          <ShieldCheck className="w-6 h-6 text-primary" />
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-32 h-32 rounded-full border-2 border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm">
                    <ArrowUpRight className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Iconic Masterpieces (Portfolio) */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container-wide section-padding">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-slate-900 text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em] shadow-2xl">
                Iconic Masterpieces
              </Badge>
            </motion.div>
            <h2 className="text-5xl lg:text-8xl font-heading font-bold text-slate-900 leading-tight">
              The Absolute <span className="text-primary italic">Repository.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {portfolioProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative h-full"
              >
                <Link to={`/portfolio/${project.slug}`} className="block relative bg-white/40 border border-white/60 rounded-[4rem] overflow-hidden hover:shadow-glass transition-all duration-1000 h-full hover:translate-y-[-12px] flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                        <Globe className="w-20 h-20 text-primary/10" />
                      </div>
                    )}
                    <div className="absolute top-8 left-8">
                      <Badge className="bg-white/90 backdrop-blur-xl text-primary px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-16 space-y-8 flex-1 flex flex-col">
                    <h3 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed line-clamp-2 flex-1">{project.description}</p>
                    <div className="pt-10 border-t border-white/60 flex items-center gap-5 text-primary font-black uppercase tracking-[0.4em] text-[10px] group-hover:translate-x-5 transition-transform duration-700">
                      Explore Case Study <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Lifecycle (Process) */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Creative Lifecycle
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-[10rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Digital <span className="text-primary italic">Metamorphosis.</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-20">
              {processSteps.map((process, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-16 space-y-10 hover:border-primary/50 transition-all duration-700 group text-center"
                >
                  <div className="w-20 h-20 bg-primary text-white text-3xl font-heading font-black flex items-center justify-center mx-auto rounded-[1.5rem] shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                    {process.step}
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-white leading-tight">{process.title}</h3>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Gateway */}
      <section className="py-40 bg-background relative overflow-hidden">
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-6xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 text-primary border-primary/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                Initialize Protocol
              </Badge>
            </motion.div>
            
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl lg:text-9xl font-heading font-bold text-slate-900 leading-tight">
              Ready to Architect <br /> <span className="text-primary italic">Your Legacy?</span>
            </motion.h2>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl text-slate-500 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Join our absolute repository of elite digital architectures engineered to accelerate your global trajectory and define absolute market dominance.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-10 justify-center pt-12">
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 text-2xl px-24 py-14 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-105 group" asChild>
                <Link to="/contact">
                  Start Your Journey
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-4 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/10 bg-white/40 backdrop-blur-xl text-slate-900 hover:bg-white/60 text-2xl px-20 py-12 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/portfolio">Explore Repository</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebsiteDesign;
