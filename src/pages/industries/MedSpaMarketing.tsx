import React from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Gem, CalendarCheck } from "lucide-react";

const MedSpaMarketing = () => {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Med Spa Marketing Agency | High-End Client Acquisition"
        description="Elevate your Med Spa with premium digital marketing. We specialize in aesthetic clinic SEO, Instagram/Meta Ads, and high-converting websites."
        url="https://lunexomedia.com/med-spa-marketing"
      />
      <Navigation />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 to-black z-0"></div>
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Aesthetic Practice Growth</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Attract High-Paying <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Med Spa Clients</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            We help premium medical spas and aesthetic clinics scale their revenue. Drive more bookings for Botox, fillers, and laser treatments with our specialized digital marketing.
          </p>
          <Button size="lg" className="bg-rose-500 text-white hover:bg-rose-600 rounded-full px-8 font-semibold">
            Get Your Growth Plan <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container-wide section-padding">
          <h2 className="text-3xl font-bold text-center text-white mb-16">The Growth Engine for Aesthetics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Meta & Instagram Ads", icon: <Gem className="w-8 h-8 text-rose-400" />, desc: "Visually stunning ad campaigns that target affluent demographics in your area." },
              { title: "Premium Web Design", icon: <Sparkles className="w-8 h-8 text-pink-400" />, desc: "Luxury, high-converting websites that reflect the quality of your aesthetic services." },
              { title: "Lead Nurturing", icon: <CalendarCheck className="w-8 h-8 text-[#C5FF4A]" />, desc: "Automated SMS and email sequences to turn inquiries into loyal, returning clients." }
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-rose-500/30 transition-all">
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

export default MedSpaMarketing;
