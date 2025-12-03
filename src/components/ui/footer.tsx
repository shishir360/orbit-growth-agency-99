import SocialMedia from "./social-media";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0f] overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>
      
      <div className="container-wide section-padding py-16 md:py-20 relative z-10">
        {/* Top Section - Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src="/user-logo-optimized.webp" alt="LUNEXO MEDIA" className="w-9 h-9 object-contain" loading="lazy" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-wide">LUNEXO</span>
                <span className="text-[10px] font-medium text-red-400 tracking-[0.2em] -mt-1">MEDIA</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Transforming businesses with cutting-edge web design, strategic advertising, and intelligent automation solutions. Build faster, scale better.
            </p>
            <div className="flex items-center gap-4">
              <SocialMedia variant="footer" />
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-white/60 mb-0.5">Email us</div>
                  <a href="mailto:hello@lunexomedia.com" className="text-sm">hello@lunexomedia.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-white/60 mb-0.5">Call us</div>
                  <a href="tel:+8801234567890" className="text-sm">+880 1234 567890</a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/70 group">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-white/60 mb-0.5">Location</div>
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12">
          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {[
                { to: "/website-design", label: "Website Design" },
                { to: "/ads-management", label: "Ads Management" },
                { to: "/ai-automation", label: "AI Automation" },
                { to: "/portfolio", label: "Portfolio" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center gap-1 text-sm text-white/60 hover:text-white transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {[
                { to: "/blog", label: "Blog" },
                { to: "/tutorials", label: "Tutorials" },
                { to: "/contact", label: "Contact" },
                { to: "/reviews", label: "Reviews" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center gap-1 text-sm text-white/60 hover:text-white transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "About Us" },
                { to: "/founder", label: "Our Founder" },
                { to: "/pricing", label: "Pricing" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center gap-1 text-sm text-white/60 hover:text-white transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/sitemap", label: "Sitemap" },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center gap-1 text-sm text-white/60 hover:text-white transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} LUNEXO MEDIA. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-white/50">Build Faster. Scale Better.</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-white/60">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
