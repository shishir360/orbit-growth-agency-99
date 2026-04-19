import React from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Users, Activity, Heart } from "lucide-react";

const DentalMarketing = () => {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Dental Marketing Agency | High-Converting SEO & Ads for Dentists"
        description="Grow your dental practice with Lunexo Media. We specialize in local SEO, Google Ads, and patient-converting website designs tailored for dentists."
        url="https://lunexomedia.com/dental-marketing"
        image="https://lunexomedia.com/og-dental-marketing.jpg"
      />
      <Navigation />
      
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0"></div>
        <div className="container-wide section-padding relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-8">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Specialized Dental Marketing</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get More High-Value <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dental Patients</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            We help dental clinics dominate their local market. From high-converting websites to targeted Google Ads and Local SEO, we turn clicks into booked appointments.
          </p>
          <Button size="lg" className="bg-[#C5FF4A] text-black hover:bg-[#b0f030] rounded-full px-8 font-semibold">
            Book a Strategy Call <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container-wide section-padding">
          <h2 className="text-3xl font-bold text-center text-white mb-16">Our Proven System for Dentists</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Local SEO for Dentists", icon: <Users className="w-8 h-8 text-blue-400" />, desc: "Rank #1 on Google Maps when patients search for 'dentist near me'." },
              { title: "Patient-First Websites", icon: <Activity className="w-8 h-8 text-cyan-400" />, desc: "Fast, mobile-friendly websites designed to build trust and increase bookings." },
              { title: "Automated Booking", icon: <CalendarCheck className="w-8 h-8 text-[#C5FF4A]" />, desc: "AI chatbots and automation to answer questions and book patients 24/7." }
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-blue-500/30 transition-all">
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

export default DentalMarketing;
