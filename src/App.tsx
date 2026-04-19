
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ContentProvider } from "@/contexts/ContentContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { NotificationService } from "@/components/NotificationService";
import Index from "./pages/Index";
import WebsiteDesign from "./pages/WebsiteDesign";
import AdsManagement from "./pages/AdsManagement";
import AIAutomation from "./pages/AIAutomation";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogCategories from "./pages/BlogCategories";
import BlogPost from "./pages/BlogPost";
import Tutorials from "./pages/Tutorials";
import TutorialPost from "./pages/TutorialPost";
import Portfolio from "./pages/Portfolio";
import PortfolioItem from "./pages/PortfolioItem";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import MobileOptimized from "./pages/services/MobileOptimized";
import FastLoading from "./pages/services/FastLoading";
import SEOFriendly from "./pages/services/SEOFriendly";
import ConversionFocused from "./pages/services/ConversionFocused";
import ServicesExplore from "./pages/ServicesExplore";
import AdsManagementLearnMore from "./pages/services/AdsManagementLearnMore";
import AIAutomationLearnMore from "./pages/services/AIAutomationLearnMore";
import WebsiteDesignLearnMore from "./pages/services/WebsiteDesignLearnMore";
import AIChatbotsLearnMore from "./pages/services/AIChatbotsLearnMore";
import EmailAutomationLearnMore from "./pages/services/EmailAutomationLearnMore";
import VoiceAgentsLearnMore from "./pages/services/VoiceAgentsLearnMore";
import WorkflowAutomationLearnMore from "./pages/services/WorkflowAutomationLearnMore";
import LearnPlatform from "./pages/services/LearnPlatform";
import CaseStudy from "./pages/CaseStudy";
import Sitemap from "./pages/Sitemap";
import PortfolioWebsiteDesign from "./pages/PortfolioWebsiteDesign";
import PortfolioAIAutomation from "./pages/PortfolioAIAutomation";
import PortfolioAdsManagement from "./pages/PortfolioAdsManagement";
import BookApartment from "./pages/BookApartment";
import DynamicPage from "./pages/DynamicPage";
import LandingPage from "./pages/LandingPage";
import CatchAllPage from "./pages/CatchAllPage";
import GuidePage from "./pages/GuidePage";
import PDFLandingPage from "./pages/PDFLandingPage";
import Founder from "./pages/Founder";
import FounderFarhan from "./pages/FounderFarhan";
import AffiliateLandingPage from "./pages/AffiliateLandingPage";
import VapiVoiceWidget from "./components/ui/vapi-voice-widget";
import { CookieConsent } from "./components/ui/cookie-consent";
import ChatVoiceWidget from "./components/ui/chat-voice-widget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AdminAuthProvider>
        <ContentProvider>
          <BlogProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <NotificationService />
              <VapiVoiceWidget />
              <ChatVoiceWidget />
              <CookieConsent />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/website-design" element={<WebsiteDesign />} />
                  <Route path="/services" element={<ServicesExplore />} />
                  <Route path="/services/mobile-optimized" element={<MobileOptimized />} />
                  <Route path="/services/fast-loading" element={<FastLoading />} />
                  <Route path="/services/seo-friendly" element={<SEOFriendly />} />
                  <Route path="/services/conversion-focused" element={<ConversionFocused />} />
                  <Route path="/services/ads-management-learn-more" element={<AdsManagementLearnMore />} />
                  <Route path="/services/ai-automation-learn-more" element={<AIAutomationLearnMore />} />
                  <Route path="/services/website-design-learn-more" element={<WebsiteDesignLearnMore />} />
                  <Route path="/services/ai-chatbots-learn-more" element={<AIChatbotsLearnMore />} />
                  <Route path="/services/email-automation-learn-more" element={<EmailAutomationLearnMore />} />
                  <Route path="/services/voice-agents-learn-more" element={<VoiceAgentsLearnMore />} />
                  <Route path="/services/workflow-automation-learn-more" element={<WorkflowAutomationLearnMore />} />
                  <Route path="/services/learn-platform" element={<LearnPlatform />} />
                  <Route path="/ads-management" element={<AdsManagement />} />
                  <Route path="/ai-automation" element={<AIAutomation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/founder" element={<Founder />} />
                  <Route path="/farhan-tanvier" element={<FounderFarhan />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/book-apartment" element={<BookApartment />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/categories" element={<BlogCategories />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/tutorials/:slug" element={<TutorialPost />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/website-design" element={<PortfolioWebsiteDesign />} />
                  <Route path="/portfolio/ai-automation" element={<PortfolioAIAutomation />} />
                  <Route path="/portfolio/ads-management" element={<PortfolioAdsManagement />} />
                  <Route path="/portfolio/:id" element={<PortfolioItem />} />
                  <Route path="/case-study/:id" element={<CaseStudy />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                  
                  <Route path="/page/:slug" element={<DynamicPage />} />
                  <Route path="/guide/:slug" element={<GuidePage />} />
                  <Route path="/pdf/:slug" element={<PDFLandingPage />} />
                  <Route path="/promo/:slug" element={<AffiliateLandingPage />} />
                  {/* Catch-all to resolve dynamic admin-created pages by slug, else 404 */}
                  <Route path="*" element={<CatchAllPage />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </BlogProvider>
        </ContentProvider>
      </AdminAuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
