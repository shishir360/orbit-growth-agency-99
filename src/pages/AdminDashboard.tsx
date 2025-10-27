import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminNotifications } from '@/components/admin/AdminNotifications';
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
import AdminContacts from '@/components/admin/AdminContacts';
import AdminPDFDocuments from '@/components/admin/AdminPDFDocuments';
import AdminPDFLeads from '@/components/admin/AdminPDFLeads';
import AdminAccounting from '@/components/admin/AdminAccounting';

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center justify-between flex-1">
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <AdminNotifications />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6">
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
              <Route path="contact-submissions" element={<AdminContacts />} />
              <Route path="pdf-documents" element={<AdminPDFDocuments />} />
              <Route path="pdf-leads" element={<AdminPDFLeads />} />
              <Route path="accounting" element={<AdminAccounting />} />
            </Routes>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;