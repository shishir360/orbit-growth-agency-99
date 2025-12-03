import SocialMedia from "./social-media";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/10 relative z-10">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container-wide section-padding py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm md:text-base text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/website-design" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Website Design
                </Link>
              </li>
              <li>
                <Link to="/ads-management" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Ads Management
                </Link>
              </li>
              <li>
                <Link to="/ai-automation" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  AI Automation
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm md:text-base text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm md:text-base text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/founder" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Our Founder
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm md:text-base text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors block">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 mt-10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <img src="/user-logo-optimized.webp" alt="LUNEXO MEDIA" className="w-7 h-7 object-contain" loading="lazy" />
                </div>
                <span className="text-xl font-bold text-white">LUNEXO MEDIA</span>
              </div>
              <span className="text-sm text-white/40 md:ml-4">Build Faster. Scale Better.</span>
            </div>
            
            <div className="hidden md:block">
              <SocialMedia variant="footer" />
            </div>
          </div>
          
          <div className="mt-6 md:hidden">
            <SocialMedia variant="footer" />
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center md:text-right">
            <span className="text-xs md:text-sm text-white/40">© 2024 LUNEXO MEDIA. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
