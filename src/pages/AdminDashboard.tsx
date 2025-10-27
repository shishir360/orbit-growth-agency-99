import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminServices from '@/components/admin/AdminServices';
import AdminHero from '@/components/admin/AdminHero';
import AdminBlog from '@/components/admin/AdminBlog';
import AdminImages from '@/components/admin/AdminImages';
import AdminNavigation from '@/components/admin/AdminNavigation';
import AdminAnalytics from '@/components/admin/AdminAnalytics';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminCompany from '@/components/admin/AdminCompany';
import AdminPages from '@/components/admin/AdminPages';
import AdminSEOMeta from '@/components/admin/AdminSEOMeta';
import AdminTracking from '@/components/admin/AdminTracking';
import AdminReviews from '@/components/admin/AdminReviews';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminContact from '@/components/admin/AdminContact';
import AdminTutorials from '@/components/admin/AdminTutorials';
import AdminPortfolio from '@/components/admin/AdminPortfolio';
import AdminWebsiteDesign from '@/components/admin/AdminWebsiteDesign';
import AdminAdsManagement from '@/components/admin/AdminAdsManagement';
import AdminAIAutomation from '@/components/admin/AdminAIAutomation';
import AdminQuestions from '@/components/admin/AdminQuestions';
import AdminCategories from '@/components/admin/AdminCategories';
import AdminPricing from '@/components/admin/AdminPricing';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminInvoices from '@/components/admin/AdminInvoices';

const AdminDashboard = () => {
  const { isAuthenticated } = useAdminAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            className="text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4 md:p-6">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="website-design" element={<AdminWebsiteDesign />} />
            <Route path="ads-management" element={<AdminAdsManagement />} />
            <Route path="ai-automation" element={<AdminAIAutomation />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="questions" element={<AdminQuestions />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="tutorials" element={<AdminTutorials />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="company" element={<AdminCompany />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="images" element={<AdminImages />} />
            <Route path="navigation" element={<AdminNavigation />} />
            <Route path="seo-meta" element={<AdminSEOMeta />} />
            <Route path="tracking" element={<AdminTracking />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="invoices" element={<AdminInvoices />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;