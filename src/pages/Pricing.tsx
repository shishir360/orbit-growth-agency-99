import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Zap, Globe, Target, Bot, ArrowRight, Shield, HeadphonesIcon, Play, ChevronRight, Layers, ShieldCheck, Activity, Cpu, Database } from "lucide-react";
import SEO from "@/components/ui/seo";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const services = [
    {
      category: "Digital Architecture",
      icon: Globe,
      packages: [
        {
          name: "Starter Node",
          price: "$150 – $200",
          period: "one-time",
          description: "Perfect for foundational brand logic and initial presence sync.",
          features: ["5 Precision Pages", "Mobile-First Logic", "Foundational SEO Sync", "Contact Protocol Node", "1 Month Support"],
          popular: false
        },
        {
          name: "Professional Logic",
          price: "$250 – $350",
          period: "one-time",
          description: "For high-velocity growth brands requiring absolute architecture.",
          features: ["Custom Architecture", "Advanced UI Intelligence", "Blog & CMS Nodes", "Advanced SEO Protocol", "Velocity Telemetry", "3 Months Support"],
          popular: true
        },
        {
          name: "E-commerce Sync",
          price: "$400 – $600",
          period: "one-time",
          description: "Complete digital store absolute orchestration logic.",
          features: ["Store Architecture", "Payment Protocol Node", "Catalog Logic Sync", "Inventory Telemetry", "6 Months Support"],
          popular: false
        }
      ]
    },
    {
      category: "ROI Orchestration",
      icon: Target,
      packages: [
        {
          name: "Campaign Launch",
          price: "$50 – $70",
          period: "one-time",
          description: "Initial absolute performance activation sync node.",
          features: ["Google Ads Core Logic", "Meta Ads Core Sync", "Targeting Node Logic", "Conversion Telemetry"],
          popular: false
        },
        {
          name: "Velocity Management",
          price: "$80 – $120",
          period: "mo",
          description: "Ongoing absolute ROI optimization protocol.",
          features: ["Performance Telemetry", "Budget Logic Node", "Keyword Evolution Sync", "ROI Tracking Protocol"],
          popular: true
        },
        {
          name: "Complete Sync",
          price: "$150 – $200",
          period: "mo",
          description: "Full spectrum absolute orchestration architecture.",
          features: ["Activation + Management", "Creative Node Design", "Monthly Telemetry Reports", "Priority Support Logic"],
          popular: false
        }
      ]
    },
    {
      category: "Intelligence Logic",
      icon: Bot,
      packages: [
        {
          name: "Neural Bot",
          price: "$60 – $100",
          period: "one-time",
          description: "Intelligent chatbot absolute integration node.",
          features: ["Website Intelligence Node", "Messenger Node Sync", "Auto-Logic Replies", "FAQ Architecture"],
          popular: false
        },
        {
          name: "Workflow Sync",
          price: "$80 – $120",
          period: "one-time",
          description: "Operational process absolute automation protocol.",
          features: ["Email Logic Sync", "CRM Integration Node", "Task Automation", "Custom Trigger Logic"],
          popular: true
        },
        {
          name: "Absolute Logic",
          price: "$150 – $250",
          period: "one-time",
          description: "Full absolute intelligence orchestration architecture.",
          features: ["Neural Bots + Workflows", "Content Logic Sync", "Social Sync Node", "3 Months Support"],
          popular: false
        }
      ]
    }
  ];

  const categories = ["all", "Digital Architecture", "ROI Orchestration", "Intelligence Logic"];
  const filteredServices = selectedCategory === "all" ? services : services.filter(s => s.category === selectedCategory);

  useEffect(() => {
    document.title = "Absolute Investment Protocol | LUNEXO MEDIA Pricing";
  }, []);

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Investment Protocol | LUNEXO MEDIA Pricing"
        description="Transparent pricing for absolute Digital Architecture, ROI Orchestration, and Intelligence Logic. No hidden nodes, just absolute results."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/pricing"
        keywords="pricing, packages, digital marketing pricing, web design cost, absolute investment"
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                <Sparkles className="w-5 h-5 mr-4" />
                Absolute ROI Transparency
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Strategic <br /> <span className="text-primary italic">Investment.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Choose the absolute protocol for your business velocity. No hidden nodes, <span className="text-primary italic font-bold">just absolute results.</span>
            </motion.p>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-wrap gap-6 justify-center pt-8"
            >
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-12 py-8 text-2xl font-bold transition-all duration-700 ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white shadow-2xl scale-110"
                      : "bg-white/40 backdrop-blur-xl border-2 border-white/60 text-slate-500 hover:bg-white/60 hover:text-slate-900 hover:scale-105"
                  }`}
                >
                  {cat === "all" ? "All Protocols" : cat}
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Grids */}
      <section className="py-24 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding space-y-48">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, sIndex) => (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                {/* Category Header */}
                <div className="text-center mb-32 space-y-10">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                      <service.icon className="w-5 h-5 mr-4" />
                      {service.category}
                    </Badge>
                  </motion.div>
                  <h2 className="text-6xl lg:text-[9rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
                    {service.category.split(" ")[0]} <span className="text-primary italic">{service.category.split(" ").slice(1).join(" ")}.</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto items-center">
                  {service.packages.map((pkg, pIndex) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pIndex * 0.1, duration: 1 }}
                      className={`group relative bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-16 hover:shadow-glass transition-all duration-1000 flex flex-col hover:translate-y-[-15px] ${
                        pkg.popular ? "border-primary/40 shadow-glass scale-110 z-10 bg-white/60" : ""
                      }`}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl whitespace-nowrap">
                          Recommended Protocol
                        </Badge>
                      )}

                      <div className="mb-16 text-center space-y-8">
                        <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">{pkg.name}</h3>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed min-h-[56px]">{pkg.description}</p>
                        <div className="flex items-baseline justify-center gap-3 pt-4">
                          <span className="text-5xl font-heading font-black text-primary tracking-tighter">{pkg.price}</span>
                          <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">/{pkg.period}</span>
                        </div>
                      </div>

                      <div className="space-y-12 flex-1">
                        <div className="h-px bg-white/60 w-full" />
                        <div className="space-y-8">
                          {pkg.features.map((feat, fi) => (
                            <div key={fi} className="flex items-center gap-6 group/feat">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/feat:bg-primary transition-all duration-500">
                                <ShieldCheck className="w-5 h-5 text-primary group-hover/feat:text-white" />
                              </div>
                              <span className="text-xl text-slate-700 font-bold group-hover/feat:text-slate-900 transition-colors">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-16">
                        <Button
                          size="lg"
                          className={`w-full py-12 rounded-[3rem] font-bold text-2xl transition-all duration-700 shadow-2xl hover:scale-105 group/btn ${
                            pkg.popular
                              ? "bg-primary text-white hover:bg-primary/90"
                              : "bg-slate-900 text-white hover:bg-slate-800"
                          }`}
                          asChild
                        >
                          <Link to="/contact" className="flex items-center justify-center gap-6">
                            Acquire Protocol
                            <ArrowRight className="w-8 h-8 group-hover/btn:translate-x-4 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Absolute Standard Benefits */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="container-wide section-padding relative z-10">
          <div className="text-center mb-32 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 text-sm font-black uppercase tracking-[0.4em] rounded-full backdrop-blur-xl">
                <Database className="w-5 h-5 mr-4" />
                Every Protocol Includes
              </Badge>
            </motion.div>
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter">
              The Absolute <span className="text-primary italic">Standard.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { icon: Shield, title: "Risk Mitigation", desc: "30-day absolute performance guarantee node for complete peace of mind sync." },
              { icon: Zap, title: "Rapid Deployment", desc: "Kickoff and absolute strategy activation within 48 operational hours logic." },
              { icon: HeadphonesIcon, title: "Dedicated Support", desc: "Elite absolute intelligence management for every protocol tier sync." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] p-20 text-center hover:shadow-glass transition-all duration-1000 hover:translate-y-[-15px] flex flex-col items-center gap-12"
              >
                <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto group-hover:bg-primary transition-all duration-700 shadow-2xl group-hover:rotate-12">
                  <benefit.icon className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-heading font-bold text-slate-900 tracking-tight">{benefit.title}</h3>
                  <p className="text-2xl text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Gateway */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                Bespoke Intelligence Solutions
              </Badge>
            </motion.div>

            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-[1] tracking-tighter">
              Need a <br /> <span className="text-primary italic">Custom Quote?</span>
            </h2>

            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Let's discuss your specific absolute requirements and architect a tailored intelligence protocol that fits your exact growth trajectory.
            </p>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-700 hover:scale-110 group" asChild>
                <Link to="/contact" className="flex items-center gap-6">
                  Request Bespoke Quote
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
            </motion.div>

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

export default Pricing;
