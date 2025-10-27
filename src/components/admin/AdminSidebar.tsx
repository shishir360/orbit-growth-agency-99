import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Settings,
  FileText,
  Globe,
  LogOut,
  Shield,
  Target,
  Bot,
  MessageSquare,
  Users,
  BookOpen,
  Briefcase,
  Mail,
  Star,
  Navigation,
  Building2,
  PlayCircle,
  Activity,
  Search,
  Folder,
  HelpCircle,
  DollarSign,
  Calendar,
  Receipt,
  Image,
} from 'lucide-react';

export function AdminSidebar() {
  const { signOut } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const handleLogout = async () => {
    await signOut();
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
    { to: '/admin-dashboard/pricing', icon: DollarSign, label: 'Pricing Plans', section: 'services' },
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
    { to: '/admin-dashboard/clients', icon: Users, label: 'Clients', section: 'company' },
    { to: '/admin-dashboard/testimonials', icon: Star, label: 'Testimonials', section: 'company' },
    { to: '/admin-dashboard/contact', icon: Mail, label: 'Contact Forms', section: 'company' },
    { to: '/admin-dashboard/contact-submissions', icon: MessageSquare, label: 'Contact Submissions', section: 'company' },
    { to: '/admin-dashboard/bookings', icon: Calendar, label: 'Bookings', section: 'company' },
    { to: '/admin-dashboard/invoices', icon: Receipt, label: 'Invoices', section: 'company' },
    { to: '/admin-dashboard/accounting', icon: DollarSign, label: 'Accounting', section: 'company' },
    { to: '/admin-dashboard/pdf-documents', icon: FileText, label: 'PDF Documents', section: 'company' },
    { to: '/admin-dashboard/pdf-leads', icon: Users, label: 'PDF Leads', section: 'company' },
    
    // Technical & Analytics
    { to: '/admin-dashboard/seo-meta', icon: Search, label: 'SEO & Meta Tags', section: 'technical' },
    { to: '/admin-dashboard/tracking', icon: Activity, label: 'Analytics & Tracking', section: 'technical' },
    { to: '/admin-dashboard/reviews', icon: MessageSquare, label: 'Reviews & Feedback', section: 'technical' },
    { to: '/admin-dashboard/images', icon: Image, label: 'Media Library', section: 'technical' },
    { to: '/admin-dashboard/users', icon: Users, label: 'User Management', section: 'technical' }
  ];

  const getNavCls = (path: string) => {
    const isActive = location.pathname === path || (path === '/admin-dashboard' && location.pathname === '/admin-dashboard');
    return isActive;
  };

  const sections = [
    { id: 'core', label: 'Dashboard' },
    { id: 'content', label: 'Content' },
    { id: 'services', label: 'Services' },
    { id: 'resources', label: 'Resources' },
    { id: 'company', label: 'Company' },
    { id: 'technical', label: 'Technical' },
  ];

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-60'} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
          {!collapsed && <span className="font-bold text-base sm:text-lg truncate">Admin Panel</span>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          {sections.map((section) => {
            const sectionItems = menuItems.filter(item => item.section === section.id);
            
            return (
              <SidebarGroup key={section.id}>
                <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sectionItems.map((item) => {
                      const isActive = getNavCls(item.to);
                      return (
                        <SidebarMenuItem key={item.to}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <NavLink to={item.to} end={item.to === '/admin-dashboard'}>
                              <item.icon className="h-4 w-4" />
                              {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2 sm:p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-sm sm:text-base"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-2 sm:ml-3 truncate">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}