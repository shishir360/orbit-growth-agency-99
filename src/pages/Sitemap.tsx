import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


const Sitemap = () => {
  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", url: "https://lunexomedia.com/" },
        { name: "About Us", url: "https://lunexomedia.com/about" },
        { name: "Reviews", url: "https://lunexomedia.com/reviews" },
        { name: "Contact Us", url: "https://lunexomedia.com/contact" },
        { name: "Pricing", url: "https://lunexomedia.com/pricing" },
        { name: "Terms & Conditions", url: "https://lunexomedia.com/terms" },
        { name: "Privacy Policy", url: "https://lunexomedia.com/privacy" },
        { name: "Portfolio", url: "https://lunexomedia.com/portfolio" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Website Design", url: "https://lunexomedia.com/website-design" },
        { name: "Local SEO", url: "https://lunexomedia.com/services/local-seo" },
        { name: "Dental Marketing", url: "https://lunexomedia.com/dental-marketing" },
        { name: "Med Spa Marketing", url: "https://lunexomedia.com/med-spa-marketing" },
        { name: "Overview", url: "https://lunexomedia.com/services/website-design-learn-more" },
        { name: "Why Choose Us", url: "https://lunexomedia.com/services/seo-friendly" },
        { name: "Website Process", url: "https://lunexomedia.com/services/fast-loading" },
        { name: "Portfolio", url: "https://lunexomedia.com/portfolio/website-design" },
        { name: "Mobile Optimized", url: "https://lunexomedia.com/services/mobile-optimized" },
        { name: "Website 101", url: "https://lunexomedia.com/services/conversion-focused" },
        { name: "Our Guarantee", url: "https://lunexomedia.com/contact" }
      ]
    },
    {
      title: "AI Automation",
      links: [
        { name: "AI Automation", url: "https://lunexomedia.com/ai-automation" },
        { name: "Overview", url: "https://lunexomedia.com/services/ai-automation-learn-more" },
        { name: "AI Chatbots", url: "https://lunexomedia.com/services/ai-chatbots-learn-more" },
        { name: "Voice Agents", url: "https://lunexomedia.com/services/voice-agents-learn-more" },
        { name: "Email Automation", url: "https://lunexomedia.com/services/email-automation-learn-more" },
        { name: "Workflow Automation", url: "https://lunexomedia.com/services/workflow-automation-learn-more" },
        { name: "Portfolio", url: "https://lunexomedia.com/portfolio/ai-automation" },
        { name: "AI 101", url: "https://lunexomedia.com/tutorials" }
      ]
    },
    {
      title: "Ads Management",
      links: [
        { name: "Ads Management", url: "https://lunexomedia.com/ads-management" },
        { name: "Overview", url: "https://lunexomedia.com/services/ads-management-learn-more" },
        { name: "Google Ads", url: "https://lunexomedia.com/ads-management" },
        { name: "Facebook Ads", url: "https://lunexomedia.com/ads-management" },
        { name: "Portfolio", url: "https://lunexomedia.com/portfolio/ads-management" },
        { name: "Case Studies", url: "https://lunexomedia.com/case-study" },
        { name: "Reviews", url: "https://lunexomedia.com/reviews" },
        { name: "Our Guarantee", url: "https://lunexomedia.com/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", url: "https://lunexomedia.com/blog" },
        { name: "Blog Categories", url: "https://lunexomedia.com/blog/categories" },
        { name: "Tutorials", url: "https://lunexomedia.com/tutorials" },
        { name: "Case Studies", url: "https://lunexomedia.com/case-study" },
        { name: "Learn Platform", url: "https://lunexomedia.com/services/learn-platform" },
        { name: "FAQs", url: "https://lunexomedia.com/contact" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sitemap | LUNEXO MEDIA - Website Structure & Navigation"
        description="Browse our complete sitemap to find all pages and services offered by LUNEXO MEDIA. Easy navigation to website design, AI automation, ads management, and more."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/sitemap"
        keywords="sitemap, navigation, website structure, LUNEXO MEDIA pages, services directory"
      />
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/20">
          <div className="container-wide section-padding">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Sitemap
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find all pages and services on our website. Navigate easily to discover everything LUNEXO MEDIA has to offer.
              </p>
            </div>
          </div>
        </section>

        {/* Sitemap Grid */}
        <section className="py-20 bg-white">
          <div className="container-wide section-padding">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
              {sitemapSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-xl font-bold text-primary mb-6 border-b border-primary/20 pb-2">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.url}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <ArrowRight className="w-4 h-4 text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container-wide section-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready To Place Your Order?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Have questions about our services? Ready to get started? Let's discuss your project and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="https://lunexomedia.com/contact">
                  Get Started Today
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href="https://lunexomedia.com/pricing">
                  View Pricing
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;