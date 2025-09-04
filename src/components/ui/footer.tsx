import SocialMedia from "./social-media";
// React Router Link removed for full page reloads

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border relative z-10">
      <div className="container-wide section-padding py-8 md:py-12">
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm md:text-base text-foreground">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/website-design" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Website Design
                </a>
              </li>
              <li>
                <a href="/ads-management" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Ads Management
                </a>
              </li>
              <li>
                <a href="/ai-automation" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  AI Automation
                </a>
              </li>
              <li>
                <a href="/portfolio" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm md:text-base text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/blog" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Blog
                </a>
              </li>
              <li>
                <a href="/tutorials" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/contact" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Contact
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm md:text-base text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  About Us
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/contact" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Join Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm md:text-base text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/sitemap" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8">
          {/* Logo and tagline */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <img src="/user-logo-optimized.webp" alt="LUNEXO MEDIA" className="w-6 h-6 object-contain" loading="lazy" />
                </div>
                <span className="text-lg md:text-xl font-bold text-foreground">LUNEXO MEDIA</span>
              </div>
              <span className="text-sm text-muted-foreground md:ml-4">Build Faster. Scale Better.</span>
            </div>
            
            {/* Social media for desktop */}
            <div className="hidden md:block">
              <SocialMedia variant="footer" />
            </div>
          </div>
          
          {/* Mobile social media and copyright */}
          <div className="mt-6 md:hidden">
            <SocialMedia variant="footer" />
          </div>
          
          <div className="mt-4 pt-4 border-t border-border md:border-0 md:pt-0 md:mt-6 text-center md:text-right">
            <span className="text-xs md:text-sm text-muted-foreground">© 2024 LUNEXO MEDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;