import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminNotifications } from '@/components/admin/AdminNotifications';
import { PWAInstallPrompt } from '@/components/admin/PWAInstallPrompt';
import { NotificationService } from '@/components/NotificationService';
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
import AdminLandingPages from '@/components/admin/AdminLandingPages';
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
import AdminPDFLandingPages from '@/components/admin/AdminPDFLandingPages';
import AdminAccounting from '@/components/admin/AdminAccounting';
import AdminClients from '@/components/admin/AdminClients';
import AdminVisitorTracking from '@/components/admin/AdminVisitorTracking';
import AdminKnowledge from '@/components/admin/AdminKnowledge';
import AdminMessaging from '@/components/admin/AdminMessaging';
import AdminEmail from '@/components/admin/AdminEmail';
import AdminSocialAutomation from '@/components/admin/AdminSocialAutomation';
import AdminTrustedLogos from '@/components/admin/AdminTrustedLogos';
import AdminCompletedClients from '@/components/admin/AdminCompletedClients';
import AdminWallet from '@/components/admin/AdminWallet';
import AdminFeedbackScreenshots from '@/components/admin/AdminFeedbackScreenshots';
import AdminTemplates from '@/components/admin/AdminTemplates';
import AdminVideoReviews from '@/components/admin/AdminVideoReviews';

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
    <SidebarProvider defaultOpen={true}>
      <NotificationService isAdmin={true} />
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar />
        
        <SidebarInset className="flex-1 w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center justify-between flex-1 min-w-0">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">Manage your business operations</p>
              </div>
              <AdminNotifications />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
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
              <Route path="landing-pages" element={<AdminLandingPages />} />
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
              <Route path="pdf-landing-pages" element={<AdminPDFLandingPages />} />
              <Route path="accounting" element={<AdminAccounting />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="visitor-tracking" element={<AdminVisitorTracking />} />
              <Route path="knowledge" element={<AdminKnowledge />} />
              <Route path="messaging" element={<AdminMessaging />} />
              <Route path="whatsapp" element={<AdminMessaging />} />
              <Route path="email" element={<AdminEmail />} />
              <Route path="social-automation" element={<AdminSocialAutomation />} />
              <Route path="trusted-logos" element={<AdminTrustedLogos />} />
              <Route path="completed-clients" element={<AdminCompletedClients />} />
              <Route path="wallet" element={<AdminWallet />} />
              <Route path="feedback-screenshots" element={<AdminFeedbackScreenshots />} />
              <Route path="templates" element={<AdminTemplates />} />
              <Route path="video-reviews" element={<AdminVideoReviews />} />
            </Routes>
          </main>
        </SidebarInset>
        
        <PWAInstallPrompt />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;