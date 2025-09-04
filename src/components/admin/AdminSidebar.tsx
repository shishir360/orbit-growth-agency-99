import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Settings,
  FileText,
  Image,
  Menu,
  Globe,
  LogOut,
  Shield,
  BarChart3,
  Target,
  Bot,
  MessageSquare,
  Eye,
  Code,
  Users,
  BookOpen,
  Briefcase,
  Mail,
  Star,
  Navigation,
  Building2,
  Home,
  Zap,
  Grid,
  Monitor,
  PlayCircle,
  Activity,
  Search,
  Folder,
  HelpCircle
} from 'lucide-react';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle, mobileOpen, setMobileOpen }) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const menuItems = [
    // Core Dashboard
    { to: '/admin-dashboard', icon: LayoutDashboard, label: 'Overview', section: 'core' },
    
    // Content Management
    { to: '/admin-dashboard/hero', icon: Shield, label: 'Hero Section', section: 'content' },
    { to: '/admin-dashboard/pages', icon: Globe, label: 'Pages Management', section: 'content' },
    { to: '/admin-dashboard/navigation', icon: Navigation, label: 'Navigation', section: 'content' },
    
    // Services
    { to: '/admin-dashboard/services', icon: Settings, label: 'All Services', section: 'services' },
    { to: '/admin-dashboard/website-design', icon: Globe, label: 'Website Design', section: 'services' },
    { to: '/admin-dashboard/ads-management', icon: Target, label: 'Ads Management', section: 'services' },
    { to: '/admin-dashboard/ai-automation', icon: Bot, label: 'AI Automation', section: 'services' },
    
    // Content & Resources
    { to: '/admin-dashboard/blog', icon: BookOpen, label: 'Blog Posts', section: 'resources' },
    { to: '/admin-dashboard/questions', icon: HelpCircle, label: 'FAQ Management', section: 'resources' },
    { to: '/admin-dashboard/categories', icon: Folder, label: 'Categories & Tags', section: 'resources' },
    { to: '/admin-dashboard/tutorials', icon: PlayCircle, label: 'Tutorials', section: 'resources' },
    { to: '/admin-dashboard/portfolio', icon: Briefcase, label: 'Portfolio', section: 'resources' },
    
    // Company & Contact
    { to: '/admin-dashboard/company', icon: Building2, label: 'Company Info', section: 'company' },
    { to: '/admin-dashboard/testimonials', icon: Star, label: 'Testimonials', section: 'company' },
    { to: '/admin-dashboard/contact', icon: Mail, label: 'Contact Forms', section: 'company' },
    
    // Technical & Analytics
    { to: '/admin-dashboard/seo-meta', icon: Search, label: 'SEO & Meta Tags', section: 'technical' },
    { to: '/admin-dashboard/tracking', icon: Activity, label: 'Analytics & Tracking', section: 'technical' },
    { to: '/admin-dashboard/reviews', icon: MessageSquare, label: 'Reviews & Feedback', section: 'technical' },
    { to: '/admin-dashboard/images', icon: Image, label: 'Media Library', section: 'technical' },
    { to: '/admin-dashboard/users', icon: Users, label: 'User Management', section: 'technical' }
  ];

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-white hover:bg-slate-800 hidden md:flex"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Core Dashboard */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dashboard</h3>
          <ul className="space-y-1">
            {menuItems.filter(item => item.section === 'core').map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/admin-dashboard'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Management */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Content</h3>
          <ul className="space-y-1">
            {menuItems.filter(item => item.section === 'content').map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Services</h3>
          <ul className="space-y-1">
            {menuItems.filter(item => item.section === 'services').map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resources</h3>
          <ul className="space-y-1">
            {menuItems.filter(item => item.section === 'resources').map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Company</h3>
          <ul className="space-y-1">
            {menuItems.filter(item => item.section === 'company').map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical & Analytics */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Technical</h3>
          <ul className="space-y-1">
            {menuItems.filter(item => item.section === 'technical').map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Separator className="bg-slate-700" />

      {/* Footer */}
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="ml-3">Logout</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex bg-slate-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen flex-col`}>
        <SidebarContent />
      </div>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 bg-slate-900 text-white border-slate-700 p-0">
          <div className="min-h-screen flex flex-col">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminSidebar;