import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./button";
import { Menu, X, ChevronDown, Sparkles, Zap } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigation = content.navigation
    .filter(item => item.visible)
    .sort((a, b) => a.order - b.order);

  const serviceItems = navigation.filter(item => 
    item.href === '/website-design' || 
    item.href === '/ads-management' || 
    item.href === '/ai-automation'
  );
  
  const otherNavItems = navigation.filter(item => 
    item.href !== '/website-design' && 
    item.href !== '/ads-management' && 
    item.href !== '/ai-automation' &&
    item.href !== '/'
  );

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      {/* Dark solid background */}
      <div className={`absolute inset-0 transition-all duration-500 bg-[#0d0d0d] ${
        scrolled 
          ? 'shadow-[0_2px_20px_rgba(0,0,0,0.5)]' 
          : ''
      }`} />
      
      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#2e2e2e]" />
      
      
      <div className="container-wide section-padding relative">
        <div className="flex justify-between items-center">
          {/* Premium Logo */}
          <a href="https://lunexomedia.com" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground/20 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-secondary to-background rounded-xl border border-border group-hover:border-primary/50 flex items-center justify-center overflow-hidden transition-all duration-300">
                <img 
                  src="/user-logo-optimized.webp" 
                  alt="LUNEXO MEDIA" 
                  className="w-9 h-9 object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                className="text-xl font-bold text-white tracking-wide"
                whileHover={{ scale: 1.02 }}
              >
                LUNEXO
              </motion.span>
              <span className="text-[10px] font-semibold text-[#888888] tracking-[0.25em] -mt-0.5">
                MEDIA
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Home Link */}
            <motion.a
              href="https://lunexomedia.com"
              whileHover={{ scale: 1.05 }}
              className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group overflow-hidden ${
                isActive("/")
                  ? "text-white"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              {isActive("/") && (
                <motion.span 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#1e1e1e] rounded-xl"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Home
              </span>
            </motion.a>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="relative px-5 py-2.5 text-sm font-medium text-[#888888] hover:text-white transition-all duration-300 rounded-xl group flex items-center outline-none"
                >
                  Services
                  <ChevronDown className="w-4 h-4 ml-1.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-56 bg-[#161616] border-[#2e2e2e] p-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                {serviceItems.map((item, index) => (
                  <DropdownMenuItem key={item.id} asChild>
                    <motion.a 
                      href={`https://lunexomedia.com${item.href}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full rounded-xl px-4 py-3 text-sm transition-all duration-300 flex items-center gap-3 ${
                        isActive(item.href) 
                          ? "text-white bg-[#1e1e1e]" 
                          : "text-[#888888] hover:text-white hover:bg-[#1e1e1e]"
                      }`}
                    >
                      <Zap className="w-4 h-4 text-[#3ECF8E]" />
                      {item.name}
                    </motion.a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Portfolio Link */}
            <motion.a
              href="https://lunexomedia.com/portfolio"
              whileHover={{ scale: 1.05 }}
              className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group ${
                isActive("/portfolio")
                  ? "text-white"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              {isActive("/portfolio") && (
                <motion.span 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#1e1e1e] rounded-xl"
                />
              )}
              <span className="relative z-10">Portfolio</span>
            </motion.a>
            
            {/* Other Navigation Items */}
            {otherNavItems.map((item) => (
              <motion.a
                key={item.id}
                href={`https://lunexomedia.com${item.href}`}
                whileHover={{ scale: 1.05 }}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-[#888888] hover:text-white"
                }`}
              >
                {isActive(item.href) && (
                  <motion.span 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#1e1e1e] rounded-xl"
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </motion.a>
            ))}
            
            {/* CTA Button */}
            <motion.a 
              href="https://lunexomedia.com/book-apartment" 
              className="relative ml-6 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3ECF8E] hover:bg-[#34B27B] text-[#0d0d0d] text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(62,207,142,0.3)]">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Book Now
              </div>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 text-white hover:text-white rounded-xl bg-[#1e1e1e] border border-[#2e2e2e] flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 border-t border-[#2e2e2e] mt-4">
                <div className="flex flex-col space-y-2">
                  {/* Home Link */}
                  <motion.a
                    href="https://lunexomedia.com"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`px-5 py-4 text-base font-medium transition-all rounded-xl flex items-center gap-3 ${
                      isActive("/")
                        ? "text-white bg-[#1e1e1e]"
                        : "text-[#888888] hover:text-white hover:bg-[#1e1e1e]"
                    }`}
                  >
                    Home
                  </motion.a>
                  
                  {/* Services Collapsible Category */}
                  <div className="space-y-1">
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="w-full px-5 py-4 text-base font-medium transition-all rounded-xl flex items-center justify-between text-[#888888] hover:text-white hover:bg-[#1e1e1e]"
                    >
                      <span className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-[#3ECF8E]" />
                        Services
                      </span>
                      <motion.div
                        animate={{ rotate: servicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 space-y-1 py-2 border-l-2 border-[#2e2e2e]">
                            {serviceItems.map((item, index) => (
                              <motion.a
                                key={item.id}
                                href={`https://lunexomedia.com${item.href}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`px-5 py-3 text-base font-medium transition-all rounded-xl ml-2 flex items-center gap-3 ${
                                  isActive(item.href)
                                    ? "text-white bg-[#1e1e1e]"
                                    : "text-[#888888] hover:text-white hover:bg-[#1e1e1e]"
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
                                {item.name}
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Portfolio Link */}
                  <motion.a
                    href="https://lunexomedia.com/portfolio"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className={`px-5 py-4 text-base font-medium transition-all rounded-xl flex items-center gap-3 ${
                      isActive("/portfolio")
                        ? "text-white bg-[#1e1e1e]"
                        : "text-[#888888] hover:text-white hover:bg-[#1e1e1e]"
                    }`}
                  >
                    Portfolio
                  </motion.a>
                  
                  {/* Other Navigation Items */}
                  {otherNavItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={`https://lunexomedia.com${item.href}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`px-5 py-4 text-base font-medium transition-all rounded-xl flex items-center gap-3 ${
                        isActive(item.href)
                          ? "text-white bg-[#1e1e1e]"
                          : "text-[#888888] hover:text-white hover:bg-[#1e1e1e]"
                      }`}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  
                  {/* CTA Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4"
                  >
                    <a 
                      href="https://lunexomedia.com/book-apartment" 
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-[#3ECF8E] hover:bg-[#34B27B] text-[#0d0d0d] text-base font-semibold rounded-xl shadow-[0_0_20px_rgba(62,207,142,0.3)]"
                    >
                      <Sparkles className="w-5 h-5" />
                      Book Now
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
