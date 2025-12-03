import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./button";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { content } = useContent();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigation = content.navigation
    .filter(item => item.visible)
    .sort((a, b) => a.order - b.order);

  // Separate services from other navigation items
  const serviceItems = navigation.filter(item => 
    item.href === '/website-design' || 
    item.href === '/ads-management' || 
    item.href === '/ai-automation'
  );
  
  const otherNavItems = navigation.filter(item => 
    item.href !== '/website-design' && 
    item.href !== '/ads-management' && 
    item.href !== '/ai-automation' &&
    item.href !== '/' // Exclude home from regular nav items
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999]">
      {/* Gradient border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      
      {/* Glass background */}
      <div className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-xl"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container-wide section-padding relative">
        <div className="flex justify-between items-center h-18 py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-11 h-11 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="/user-logo-optimized.webp" 
                  alt="LUNEXO MEDIA" 
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-wide">LUNEXO</span>
              <span className="text-[10px] font-medium text-red-400 tracking-[0.2em] -mt-1">MEDIA</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Home Link */}
            <a
              href="/"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                isActive("/")
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isActive("/") && (
                <span className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"></span>
              )}
              <span className="relative">Home</span>
            </a>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 rounded-lg group flex items-center outline-none">
                Services
                <ChevronDown className="w-3.5 h-3.5 ml-1 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52 bg-[#0a0a0f]/95 backdrop-blur-xl border-white/10 p-2">
                {serviceItems.map((item) => (
                 <DropdownMenuItem key={item.id} asChild>
                    <a 
                      href={item.href}
                      className={`w-full rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                        isActive(item.href) 
                          ? "text-white bg-white/10" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Portfolio Link */}
            <a
              href="/portfolio"
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                isActive("/portfolio")
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isActive("/portfolio") && (
                <span className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"></span>
              )}
              <span className="relative">Portfolio</span>
            </a>
            
            {/* Other Navigation Items */}
            {otherNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {isActive(item.href) && (
                  <span className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"></span>
                )}
                <span className="relative">{item.name}</span>
              </a>
            ))}
            
            {/* CTA Button */}
            <a 
              href="/book-apartment" 
              className="relative ml-4 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 border border-red-400/20">
                <Sparkles className="w-4 h-4" />
                Book Now
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 text-white hover:text-white hover:bg-white/5 rounded-lg"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {/* Home Link */}
              <a
                href="/"
                className={`px-4 py-3 text-sm font-medium transition-all rounded-lg ${
                  isActive("/")
                    ? "text-white bg-white/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Home
              </a>
              
              {/* Services Section */}
              <div className="space-y-1 pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">Services</div>
                {serviceItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`px-4 py-3 text-sm font-medium transition-all rounded-lg ml-2 block ${
                      isActive(item.href)
                        ? "text-white bg-white/5"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              {/* Portfolio Link */}
              <a
                href="/portfolio"
                className={`px-4 py-3 text-sm font-medium transition-all rounded-lg ${
                  isActive("/portfolio")
                    ? "text-white bg-white/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Portfolio
              </a>
              
              {/* Other Navigation Items */}
              {otherNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-3 text-sm font-medium transition-all rounded-lg ${
                    isActive(item.href)
                      ? "text-white bg-white/5"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              {/* CTA Button */}
              <div className="pt-4">
                <a 
                  href="/book-apartment" 
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold rounded-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
