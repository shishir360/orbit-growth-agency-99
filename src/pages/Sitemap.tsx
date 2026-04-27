import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { ArrowRight, Sparkles, Map, ChevronRight, Activity, Cpu, ShieldCheck, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sitemap = () => {
  const sitemapSections = [
    {
      title: "Core Repository",
      links: [
        { name: "Home", url: "https://lunexomedia.com/" },
        { name: "The Agency", url: "https://lunexomedia.com/about" },
        { name: "Intelligence", url: "https://lunexomedia.com/blog" },
        { name: "Uplink", url: "https://lunexomedia.com/contact" },
        { name: "Investment", url: "https://lunexomedia.com/pricing" },
        { name: "Protocol", url: "https://lunexomedia.com/terms" },
        { name: "Sovereignty", url: "https://lunexomedia.com/privacy" },
        { name: "Vault", url: "https://lunexomedia.com/portfolio" }
      ]
    },
    {
      title: "Visual Logic",
      links: [
        { name: "Architecture", url: "https://lunexomedia.com/website-design" },
        { name: "Visibility (SEO)", url: "https://lunexomedia.com/services/seo-friendly" },
        { name: "Velocity (Speed)", url: "https://lunexomedia.com/services/fast-loading" },
        { name: "Mobile Logic", url: "https://lunexomedia.com/services/mobile-optimized" },
        { name: "Conversion Intel", url: "https://lunexomedia.com/services/conversion-focused" },
        { name: "Dental Uplink", url: "https://lunexomedia.com/dental-marketing" },
        { name: "MedSpa Uplink", url: "https://lunexomedia.com/med-spa-marketing" }
      ]
    },
    {
      title: "AI Automations",
      links: [
        { name: "Core Automation", url: "https://lunexomedia.com/ai-automation" },
        { name: "Intelligent Chat", url: "https://lunexomedia.com/services/ai-chatbots-learn-more" },
        { name: "Auditory Agents", url: "https://lunexomedia.com/services/voice-agents-learn-more" },
        { name: "Retention Logic", url: "https://lunexomedia.com/services/email-automation-learn-more" },
        { name: "Workflow Sync", url: "https://lunexomedia.com/services/workflow-automation-learn-more" }
      ]
    },
    {
      title: "Growth Logic",
      links: [
        { name: "Ads Management", url: "https://lunexomedia.com/ads-management" },
        { name: "Google Strategy", url: "https://lunexomedia.com/ads-management" },
        { name: "Meta Strategy", url: "https://lunexomedia.com/ads-management" },
        { name: "Case Evidence", url: "https://lunexomedia.com/case-study" },
        { name: "Verified Reviews", url: "https://lunexomedia.com/reviews" }
      ]
    },
    {
      title: "Intelligence",
      links: [
        { name: "Main Blog", url: "https://lunexomedia.com/blog" },
        { name: "Categories", url: "https://lunexomedia.com/blog/categories" },
        { name: "Tutorials", url: "https://lunexomedia.com/tutorials" },
        { name: "Scaling Intel", url: "https://lunexomedia.com/services/learn-platform" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body text-slate-900 overflow-hidden">
      <SEO
        title="Absolute Repository Index | Sitemap | LUNEXO MEDIA"
        description="Browse our complete absolute repository index to find all architecture and intelligence nodes offered by LUNEXO MEDIA."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/sitemap"
        keywords="sitemap, navigation, website structure, LUNEXO MEDIA pages, services directory"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-7xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="bg-primary/10 border border-primary/20 text-primary px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.4em] backdrop-blur-xl">
                <Map className="w-5 h-5 mr-4" />
                Absolute Repository Index
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl sm:text-7xl lg:text-[11rem] font-heading font-bold text-slate-900 leading-[1] tracking-tighter"
            >
              Digital <br /> <span className="text-primary italic">Repository.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-3xl text-slate-500 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              Navigate every node and architecture in our absolute digital repository. Discover the absolute scaling potential of Lunexo Media.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-48 bg-white/50 backdrop-blur-md border-y border-white/40">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-16 max-w-7xl mx-auto">
            {sitemapSections.map((section, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 1 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-4 tracking-tight">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-lg" />
                    {section.title}
                  </h2>
                  <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
                </div>
                <ul className="space-y-8">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        to={link.url.replace('https://lunexomedia.com', '') || '/'}
                        className="flex items-center gap-4 text-2xl text-slate-500 hover:text-primary transition-all duration-500 group font-medium"
                      >
                        <div className="w-8 h-8 bg-white/40 border border-white/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 shadow-sm">
                           <ChevronRight className="w-5 h-5 text-primary" />
                        </div>
                        <span className="group-hover:translate-x-2 transition-transform duration-500">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 opacity-40" />
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="max-w-7xl mx-auto space-y-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Badge className="bg-white/10 text-white border-white/20 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.4em]">
                The Absolute Execution
              </Badge>
            </motion.div>
            
            <h2 className="text-6xl lg:text-[11rem] font-heading font-bold text-white leading-tight tracking-tighter">
              Ready to <span className="text-primary italic">Scale?</span>
            </h2>
            
            <p className="text-3xl text-slate-300 font-body leading-relaxed max-w-5xl mx-auto font-medium">
              Discuss your project nodes and bring your architecture to life with our absolute team of specialists.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-10 justify-center pt-16">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-3xl px-24 py-16 rounded-full font-bold shadow-2xl transition-all duration-500 hover:scale-110 group" asChild>
                <Link to="/contact">
                  Start Execution
                  <ArrowRight className="w-10 h-10 ml-8 group-hover:translate-x-5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 text-3xl px-20 py-12 rounded-full font-bold transition-all duration-500" asChild>
                <Link to="/pricing">
                  View Investment
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

export default Sitemap;