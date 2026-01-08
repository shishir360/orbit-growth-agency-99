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
      {/* Premium glass background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
          : 'bg-[#0a0a0f]/80 backdrop-blur-xl'
      }`} />
      
      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <motion.div 
          className="h-full w-[200%] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Subtle top glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none" />
      
      <div className="container-wide section-padding relative">
        <div className="flex justify-between items-center">
          {/* Premium Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] rounded-xl border border-white/10 group-hover:border-violet-500/50 flex items-center justify-center overflow-hidden transition-all duration-300">
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
                className="text-xl font-bold bg-gradient-to-r from-white via-white to-violet-200 bg-clip-text text-transparent tracking-wide"
                whileHover={{ scale: 1.02 }}
              >
                LUNEXO
              </motion.span>
              <span className="text-[10px] font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent tracking-[0.25em] -mt-0.5">
                MEDIA
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Home Link */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group overflow-hidden ${
                isActive("/")
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isActive("/") && (
                <motion.span 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-xl border border-violet-500/30"
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
                  className="relative px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-all duration-300 rounded-xl group flex items-center outline-none"
                >
                  Services
                  <ChevronDown className="w-4 h-4 ml-1.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-56 bg-[#0a0a0f]/98 backdrop-blur-2xl border-white/10 p-3 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                {serviceItems.map((item, index) => (
                  <DropdownMenuItem key={item.id} asChild>
                    <motion.a 
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full rounded-xl px-4 py-3 text-sm transition-all duration-300 flex items-center gap-3 ${
                        isActive(item.href) 
                          ? "text-white bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Zap className="w-4 h-4 text-violet-400" />
                      {item.name}
                    </motion.a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Portfolio Link */}
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group ${
                isActive("/portfolio")
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isActive("/portfolio") && (
                <motion.span 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-xl border border-violet-500/30"
                />
              )}
              <span className="relative z-10">Portfolio</span>
            </motion.a>
            
            {/* Other Navigation Items */}
            {otherNavItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {isActive(item.href) && (
                  <motion.span 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-xl border border-violet-500/30"
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </motion.a>
            ))}
            
            {/* Premium CTA Button */}
            <motion.a 
              href="/book-apartment" 
              className="relative ml-6 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500" />
              <div className="relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 border border-violet-400/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
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
              className="relative w-12 h-12 text-white hover:text-white rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
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
              <div className="py-6 border-t border-white/10 mt-4">
                <div className="flex flex-col space-y-2">
                  {/* Home Link */}
                  <motion.a
                    href="/"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`px-5 py-4 text-base font-medium transition-all rounded-xl flex items-center gap-3 ${
                      isActive("/")
                        ? "text-white bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Home
                  </motion.a>
                  
                  {/* Services Section */}
                  <div className="space-y-2 pt-2">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="px-5 py-2 text-xs font-bold text-violet-400/80 uppercase tracking-widest flex items-center gap-2"
                    >
                      <Zap className="w-3 h-3" />
                      Services
                    </motion.div>
                    {serviceItems.map((item, index) => (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className={`px-5 py-4 text-base font-medium transition-all rounded-xl ml-3 flex items-center gap-3 ${
                          isActive(item.href)
                            ? "text-white bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {item.name}
                      </motion.a>
                    ))}
                  </div>
                  
                  {/* Portfolio Link */}
                  <motion.a
                    href="/portfolio"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className={`px-5 py-4 text-base font-medium transition-all rounded-xl flex items-center gap-3 ${
                      isActive("/portfolio")
                        ? "text-white bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Portfolio
                  </motion.a>
                  
                  {/* Other Navigation Items */}
                  {otherNavItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`px-5 py-4 text-base font-medium transition-all rounded-xl flex items-center gap-3 ${
                        isActive(item.href)
                          ? "text-white bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30"
                          : "text-white/60 hover:text-white hover:bg-white/5"
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
                      href="/book-apartment" 
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-base font-semibold rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-violet-400/30"
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
