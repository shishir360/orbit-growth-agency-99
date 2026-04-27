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
import AdminOutreachDashboard from '@/components/admin/AdminOutreachDashboard';
import AdminOutreachLeads from '@/components/admin/AdminOutreachLeads';
import AdminOutreachEmails from '@/components/admin/AdminOutreachEmails';
import AdminOutreachDMs from '@/components/admin/AdminOutreachDMs';
import AdminOutreachPosts from '@/components/admin/AdminOutreachPosts';
import AdminOutreachTracker from '@/components/admin/AdminOutreachTracker';
import AdminOutreachDeals from '@/components/admin/AdminOutreachDeals';
import AdminOutreachTasks from '@/components/admin/AdminOutreachTasks';
import AdminOutreachCalendar from '@/components/admin/AdminOutreachCalendar';
import AdminAffiliatePages from '@/components/admin/AdminAffiliatePages';
import AdminAIBotSettings from '@/components/admin/AdminAIBotSettings';
import { ShieldCheck, Activity, Cpu, Database } from 'lucide-react';
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        <p className="text-2xl font-heading font-bold text-slate-900 tracking-tighter">Synchronizing Absolute Control...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <NotificationService isAdmin={true} />
      <div className="flex min-h-screen w-full bg-background font-body text-slate-900 relative overflow-hidden">
        {/* Visual background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-5%] right-[-5%] w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <AdminSidebar />
        
        <SidebarInset className="flex-1 w-full bg-transparent relative z-10">
          <header className="sticky top-0 z-50 flex h-24 items-center gap-6 border-b border-white/60 bg-white/40 backdrop-blur-xl px-8 lg:px-12 shadow-sm">
            <SidebarTrigger className="-ml-2 h-12 w-12 rounded-2xl hover:bg-white/60 transition-all duration-500" />
            <div className="flex items-center justify-between flex-1 min-w-0">
              <div className="space-y-1">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold tracking-tighter text-slate-900">
                  Absolute <span className="text-primary italic">Control.</span>
                </h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                  <Activity className="w-3 h-3 text-primary" /> Managing Absolute Operational Assets
                </p>
              </div>
              <div className="flex items-center gap-8">
                <div className="hidden lg:flex items-center gap-4 bg-white/60 border border-white/80 rounded-full px-6 py-3 shadow-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">System Healthy</span>
                </div>
                <AdminNotifications />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-8 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
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
                <Route path="outreach" element={<AdminOutreachDashboard />} />
                <Route path="outreach/leads" element={<AdminOutreachLeads />} />
                <Route path="outreach/emails" element={<AdminOutreachEmails />} />
                <Route path="outreach/dms" element={<AdminOutreachDMs />} />
                <Route path="outreach/posts" element={<AdminOutreachPosts />} />
                <Route path="outreach/tracker" element={<AdminOutreachTracker />} />
                <Route path="outreach/deals" element={<AdminOutreachDeals />} />
                <Route path="outreach/tasks" element={<AdminOutreachTasks />} />
                <Route path="outreach/calendar" element={<AdminOutreachCalendar />} />
                <Route path="affiliate-pages" element={<AdminAffiliatePages />} />
                <Route path="ai-bot-settings" element={<AdminAIBotSettings />} />
              </Routes>
            </motion.div>
          </main>
        </SidebarInset>
        
        <PWAInstallPrompt />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;