import SocialMedia from "./social-media";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-background overflow-hidden border-t border-white/20">
      {/* Soft background glow */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] -ml-32 -mb-32 rounded-full" />
      
      {/* Remove background effects for clean look */}
      
      <div className="container-wide section-padding py-16 md:py-20 relative z-10">
        {/* Top Section - Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-12 border-b border-[#e0e0e0]">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="relative w-12 h-12 bg-white rounded-xl border border-[#e0e0e0] flex items-center justify-center overflow-hidden">
                  <img src="/user-logo-optimized.webp" alt="LUNEXO MEDIA" className="w-9 h-9 object-contain" loading="lazy" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-slate-900 tracking-wide">LUNEXO</span>
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.25em] -mt-1 uppercase">Media</span>
              </div>
            </div>
            <p className="text-[#666666] text-sm leading-relaxed mb-6">
              Transforming businesses with cutting-edge web design, strategic advertising, and intelligent automation solutions. Build faster, scale better.
            </p>
            <div className="flex items-center gap-4">
              <SocialMedia variant="footer" />
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/40 border border-white/40 flex items-center justify-center group-hover:border-primary/30 transition-colors backdrop-blur-xl shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email us</div>
                  <a href="mailto:hello@lunexomedia.com" className="text-sm font-bold text-slate-900">hello@lunexomedia.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/40 border border-white/40 flex items-center justify-center group-hover:border-primary/30 transition-colors backdrop-blur-xl shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Call us</div>
                  <a href="tel:+17024830749" className="text-sm font-bold text-slate-900">+1 (702) 483-0749</a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-[#666666] group">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#e0e0e0] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-[#999999] mb-0.5">Location</div>
                <span className="text-sm text-[#1a1a1a]">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12">
          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] font-heading">Services</h3>
            <ul className="space-y-3">
              {[
                { to: "https://lunexomedia.com/website-design", label: "Website Design" },
                { to: "https://lunexomedia.com/ads-management", label: "Ads Management" },
                { to: "https://lunexomedia.com/ai-automation", label: "AI Automation" },
                { to: "https://lunexomedia.com/portfolio", label: "Portfolio" },
              ].map((link) => (
                <li key={link.to}>
                  <a 
                    href={link.to} 
                    className="group flex items-center gap-1 text-sm text-[#666666] hover:text-[#1a1a1a] transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] font-heading">Resources</h3>
            <ul className="space-y-3">
              {[
                { to: "https://lunexomedia.com/blog", label: "Blog" },
                { to: "https://lunexomedia.com/tutorials", label: "Tutorials" },
                { to: "https://lunexomedia.com/contact", label: "Contact" },
                { to: "https://lunexomedia.com/reviews", label: "Reviews" },
              ].map((link) => (
                <li key={link.to}>
                  <a 
                    href={link.to} 
                    className="group flex items-center gap-1 text-sm text-[#666666] hover:text-[#1a1a1a] transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] font-heading">Company</h3>
            <ul className="space-y-3">
              {[
                { to: "https://lunexomedia.com/about", label: "About Us" },
                { to: "https://lunexomedia.com/founder", label: "Our Founder" },
                { to: "https://lunexomedia.com/pricing", label: "Pricing" },
              ].map((link) => (
                <li key={link.to}>
                  <a 
                    href={link.to} 
                    className="group flex items-center gap-1 text-sm text-[#666666] hover:text-[#1a1a1a] transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] font-heading">Legal</h3>
            <ul className="space-y-3">
              {[
                { to: "https://lunexomedia.com/privacy", label: "Privacy Policy" },
                { to: "https://lunexomedia.com/terms", label: "Terms & Conditions" },
                { to: "https://lunexomedia.com/sitemap", label: "Sitemap" },
              ].map((link) => (
                <li key={link.to}>
                  <a 
                    href={link.to} 
                    className="group flex items-center gap-1 text-sm text-[#666666] hover:text-[#1a1a1a] transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 font-bold tracking-tight">
              © {new Date().getFullYear()} LUNEXO MEDIA. ARCHITECTED FOR GROWTH.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-primary font-black uppercase tracking-widest">Build Faster. Scale Better.</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Systems Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
