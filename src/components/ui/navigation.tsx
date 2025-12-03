import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import SocialMedia from "./social-media";
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
    <nav className="bg-slate-900 backdrop-blur-md shadow-lg border-b border-slate-700 fixed top-0 left-0 right-0 z-[9999]">
      <div className="container-wide section-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Social Media */}
          <div className="flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-2">
              <img 
                src="/user-logo-optimized.webp" 
                alt="LUNEXO MEDIA" 
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
              <span className="text-2xl font-bold text-white">LUNEXO MEDIA</span>
            </a>
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            <a
              href="/"
              className={`text-sm font-medium transition-colors hover:text-red-400 ${
                isActive("/")
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
            >
              Home
            </a>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-300 hover:text-red-400 transition-colors">
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {serviceItems.map((item) => (
                 <DropdownMenuItem key={item.id} asChild>
                    <a 
                      href={item.href}
                      className={`w-full ${
                        isActive(item.href) ? "text-primary" : ""
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
              className={`text-sm font-medium transition-colors hover:text-red-400 ${
                isActive("/portfolio")
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
            >
              Portfolio
            </a>
            
            {/* Other Navigation Items */}
            {otherNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-red-400 ${
                  isActive(item.href)
                    ? "text-red-400"
                    : "text-gray-300"
                }`}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="/book-apartment" 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
            >
              Book Apartment
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-red-400"
              >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <div className="flex flex-col space-y-4">
              {/* Home Link */}
              <a
                href="/"
                className={`text-sm font-medium transition-colors hover:text-red-400 ${
                  isActive("/")
                    ? "text-red-400"
                    : "text-gray-300"
                }`}
              >
                Home
              </a>
              
              {/* Services Section */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white px-2">Services</div>
                {serviceItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-red-400 pl-4 ${
                      isActive(item.href)
                        ? "text-red-400"
                        : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              
              {/* Portfolio Link */}
              <a
                href="/portfolio"
                className={`text-sm font-medium transition-colors hover:text-red-400 ${
                  isActive("/portfolio")
                    ? "text-red-400"
                    : "text-gray-300"
                }`}
              >
                Portfolio
              </a>
              
              {/* Other Navigation Items */}
              {otherNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-red-400 ${
                    isActive(item.href)
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="/book-apartment" 
                className="w-fit inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
              >
                Book Apartment
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;