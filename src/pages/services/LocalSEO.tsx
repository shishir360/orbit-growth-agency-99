import React from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, MapPin, Search } from "lucide-react";

const LocalSEO = () => {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Local SEO Services for Small Businesses | Lunexo Media"
        description="Dominate your local market with our expert Local SEO services. We help service-based businesses rank higher on Google Maps and search results to attract more customers."
        url="https://lunexomedia.com/services/local-seo"
      />
      <Navigation />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-black z-0"></div>
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-8">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Local SEO Domination</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Be the First Choice in Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Local Area</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Stop losing customers to your competitors. We optimize your Google Business Profile and website so you appear exactly when local customers are searching for your services.
          </p>
          <Button size="lg" className="bg-[#C5FF4A] text-black hover:bg-[#b0f030] rounded-full px-8 font-semibold">
            Get Your Free SEO Audit <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container-wide section-padding">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Google Business Optimization", icon: <Search className="w-8 h-8 text-emerald-400" />, desc: "Complete optimization of your GBP to rank in the coveted Google Local 3-Pack." },
              { title: "Local Citations", icon: <MapPin className="w-8 h-8 text-cyan-400" />, desc: "Building consistent NAP (Name, Address, Phone) citations across top local directories." },
              { title: "On-Page SEO", icon: <TrendingUp className="w-8 h-8 text-[#C5FF4A]" />, desc: "Optimizing your website content with location-specific keywords that drive traffic." }
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-all">
                <div className="bg-black/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocalSEO;
