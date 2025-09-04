import React, { createContext, useContext, useState, useEffect } from 'react';

// Define interfaces for all website content
export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  image: string;
  imageAlt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  image: string;
  visible: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  visible: boolean;
  order: number;
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  visible: boolean;
  order: number;
}

export interface WebsiteContent {
  hero: HeroContent;
  services: Service[];
  testimonials: Testimonial[];
  navigation: NavItem[];
  companyName: string;
  logo: string;
}

interface ContentContextType {
  content: WebsiteContent;
  updateHero: (hero: HeroContent) => void;
  updateServices: (services: Service[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateNavigation: (navigation: NavItem[]) => void;
  updateCompanyInfo: (name: string, logo: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContent>({
    hero: {
      badge: "Trusted partner of 50+ businesses",
      title: "Digital solutions that maximize your business growth & ROI",
      subtitle: "Website design, ads management and AI automation - all under one roof.",
      primaryCta: {
        text: "🔥 Book Free Consultation",
        href: "/contact"
      },
      secondaryCta: {
        text: "View Our Work",
        href: "/portfolio"
      },
      image: "/src/assets/hero-dashboard-optimized.webp",
      imageAlt: "LUNEXO MEDIA client success dashboard"
    },
    services: [
      {
        id: '1',
        title: "Website Design & Conversion Optimization",
        description: "Build beautiful, responsive websites that convert visitors into customers with our expert design and optimization services.",
        icon: "Globe",
        href: "/website-design",
        image: "/src/assets/website-design-hero.jpg",
        visible: true,
        order: 1
      },
      {
        id: '2',
        title: "Google & Facebook Ads Management",
        description: "Drive targeted traffic and maximize ROI with our data-driven approach to Google and Facebook advertising campaigns.",
        icon: "Target",
        href: "/ads-management",
        image: "/src/assets/ads-management-hero.jpg",
        visible: true,
        order: 2
      },
      {
        id: '3',
        title: "AI Automation Solutions",
        description: "Streamline your business operations with custom AI chatbots, email automation, and intelligent voice agents.",
        icon: "Bot",
        href: "/ai-automation",
        image: "/src/assets/ai-automation-hero.jpg",
        visible: true,
        order: 3
      }
    ],
    testimonials: [
      {
        id: '1',
        quote: "LUNEXO MEDIA transformed our online presence completely. Our conversion rate increased by 200% within just 3 months of launching our new website.",
        author: "Sarah Johnson",
        role: "CEO",
        company: "TechStartup Inc",
        image: "https://images.unsplash.com/photo-1494790108755-2616b9dc5ca2?w=400&h=400&fit=crop&crop=face",
        visible: true,
        order: 1
      },
      {
        id: '2',
        quote: "The team's expertise in Facebook and Google Ads is unmatched. They helped us scale from $10K to $100K monthly revenue in 6 months.",
        author: "Michael Chen",
        role: "Founder",
        company: "GrowthLab",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        visible: true,
        order: 2
      },
      {
        id: '3',
        quote: "Their AI automation solutions saved us 20 hours per week. The chatbot handles 80% of our customer inquiries automatically.",
        author: "Emily Rodriguez",
        role: "Operations Director",
        company: "InnovateCorp",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        visible: true,
        order: 3
      }
    ],
    navigation: [
      { id: '1', name: "Home", href: "/", visible: true, order: 1 },
      { id: '2', name: "Website Design", href: "/website-design", visible: true, order: 2 },
      { id: '3', name: "Ads Management", href: "/ads-management", visible: true, order: 3 },
      { id: '4', name: "AI Automation", href: "/ai-automation", visible: true, order: 4 },
      { id: '5', name: "Pricing", href: "/pricing", visible: true, order: 5 },
      { id: '6', name: "About", href: "/about", visible: true, order: 6 },
      { id: '7', name: "Blog", href: "/blog", visible: true, order: 7 },
      { id: '8', name: "Contact", href: "/contact", visible: true, order: 8 }
    ],
    companyName: "LUNEXO MEDIA",
    logo: "L"
  });

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('website-content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('website-content', JSON.stringify(content));
  }, [content]);

  const updateHero = (hero: HeroContent) => {
    setContent(prev => ({ ...prev, hero }));
  };

  const updateServices = (services: Service[]) => {
    setContent(prev => ({ ...prev, services }));
  };

  const updateTestimonials = (testimonials: Testimonial[]) => {
    setContent(prev => ({ ...prev, testimonials }));
  };

  const updateNavigation = (navigation: NavItem[]) => {
    setContent(prev => ({ ...prev, navigation }));
  };

  const updateCompanyInfo = (companyName: string, logo: string) => {
    setContent(prev => ({ ...prev, companyName, logo }));
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateHero,
      updateServices,
      updateTestimonials,
      updateNavigation,
      updateCompanyInfo
    }}>
      {children}
    </ContentContext.Provider>
  );
};