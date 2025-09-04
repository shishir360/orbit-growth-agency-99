// React Router Link removed for full page reloads
import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Sparkles, Zap, Globe, Target, Bot, ArrowRight, Shield, Clock, HeadphonesIcon } from "lucide-react";
import SEO from "@/components/ui/seo";

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const services = [
    {
      category: "Website Design",
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-blue-500 to-purple-600",
      packages: [
        {
          name: "Starter",
          price: "$150 - $200",
          period: "one-time",
          description: "Perfect for small businesses getting started online",
          features: [
            "5 pages (Home, About, Services, Blog, Contact)",
            "Basic design & content",
            "Mobile-friendly responsive design",
            "Basic SEO optimization",
            "Contact form integration",
            "1 month support"
          ],
          popular: false,
          highlight: "Great for beginners"
        },
        {
          name: "Professional",
          price: "$250 - $350",
          period: "one-time",
          description: "Ideal for growing businesses with advanced needs",
          features: [
            "Custom design & branding",
            "Advanced UI/UX design",
            "Blog & CMS integration",
            "Advanced SEO optimization",
            "Social media integration",
            "Google Analytics setup",
            "3 months support",
            "Content management system"
          ],
          popular: true,
          highlight: "Most popular choice"
        },
        {
          name: "E-commerce / Advanced",
          price: "$400 - $600",
          period: "one-time",
          description: "Complete online store solution for businesses",
          features: [
            "Online store setup",
            "Payment gateway integration",
            "Product pages & catalog",
            "Custom design & branding",
            "Full SEO optimization",
            "Analytics integration",
            "Inventory management",
            "6 months support",
            "Mobile-optimized checkout"
          ],
          popular: false,
          highlight: "E-commerce ready"
        }
      ]
    },
    {
      category: "Ads Management",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-emerald-500 to-cyan-600",
      packages: [
        {
          name: "Campaign Setup",
          price: "$50 - $70",
          period: "one-time",
          description: "Initial setup of Google/Facebook/Instagram campaigns",
          features: [
            "Google Ads campaign setup",
            "Facebook Ads campaign setup",
            "Instagram Ads campaign setup",
            "Target audience configuration",
            "Budget allocation setup",
            "Conversion tracking implementation",
            "Campaign optimization checklist"
          ],
          popular: false,
          highlight: "Get started quickly"
        },
        {
          name: "Monthly Management",
          price: "$80 - $120",
          period: "per month",
          description: "Ongoing optimization, audience targeting, budget monitoring",
          features: [
            "Campaign performance monitoring",
            "Audience targeting optimization",
            "Budget monitoring & adjustment",
            "Keyword optimization",
            "Ad performance analysis",
            "Monthly strategy adjustments",
            "Competitor analysis",
            "ROI tracking & reporting"
          ],
          popular: true,
          highlight: "Ongoing success"
        },
        {
          name: "Complete Package",
          price: "$150 - $200",
          period: "per month",
          description: "Full ads management with creative design and reporting",
          features: [
            "Campaign setup & management",
            "Ad creative design (2-3 per month)",
            "Monthly performance reports",
            "Advanced analytics tracking",
            "A/B testing campaigns",
            "Landing page optimization",
            "Budget optimization",
            "Priority support"
          ],
          popular: false,
          highlight: "Everything included"
        }
      ]
    },
    {
      category: "AI Automation",
      icon: <Bot className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600",
      packages: [
        {
          name: "AI Chatbot Integration",
          price: "$60 - $100",
          period: "one-time",
          description: "For website or Messenger, with auto-replies & FAQ",
          features: [
            "Website chatbot integration",
            "Facebook Messenger bot setup",
            "Auto-reply configuration",
            "FAQ database setup",
            "Customer support automation",
            "Lead capture integration",
            "Basic analytics tracking"
          ],
          popular: false,
          highlight: "Smart conversations"
        },
        {
          name: "Workflow Automation",
          price: "$80 - $120",
          period: "one-time",
          description: "Automate emails, notifications, or processes",
          features: [
            "Email automation workflows",
            "Notification system setup",
            "Process automation design",
            "CRM integration",
            "Task automation",
            "Follow-up sequences",
            "Performance monitoring",
            "Custom triggers setup"
          ],
          popular: true,
          highlight: "Streamline operations"
        },
        {
          name: "Full Automation Setup",
          price: "$150 - $250",
          period: "one-time",
          description: "Complete setup including chatbots, workflows, and content automation",
          features: [
            "AI chatbot integration",
            "Complete workflow automation",
            "AI content generation setup",
            "Social media automation",
            "Email marketing automation",
            "Lead nurturing sequences",
            "Analytics & reporting setup",
            "Ongoing optimization guide",
            "3 months support included"
          ],
          popular: false,
          highlight: "Complete solution"
        }
      ]
    }
  ];

  const categories = ["all", "Website Design", "Ads Management", "AI Automation"];

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  useEffect(() => {
    document.title = "Affordable Digital Marketing Packages | Lunexo Media Pricing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transparent pricing for SEO, ads, website design, and AI automation. Find the perfect plan for your business with Lunexo Media.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO
        title="Affordable Digital Marketing Packages | Lunexo Media Pricing"
        description="Transparent pricing for SEO, ads, website design, and AI automation. Find the perfect plan for your business."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/pricing"
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navigation />
      
      <main className="pt-16 relative z-10">
        {/* Hero Section */}
        <section className="py-20 ultra-premium-hero">
          <div className="container-wide section-padding">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary bg-white/60 backdrop-blur-sm border border-white/20 rounded-full mb-8 shadow-lg">
                <Sparkles className="w-4 h-4" />
                Transparent Pricing
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Choose Your Perfect
                </span>
                <br />
                <span className="premium-gradient-text">
                  Growth Package
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
                Transparent pricing designed to grow with your business. No hidden fees, no surprises - just results-driven solutions.
              </p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 border-0 shadow-lg shadow-purple-500/25"
                        : "bg-white/80 backdrop-blur-sm border-white/40 hover:bg-white hover:border-primary/40"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Services" : category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Sections */}
        <section className="py-20">
          <div className="container-wide section-padding space-y-20">
            {filteredServices.map((service, serviceIndex) => (
              <div key={service.category} className="relative">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {service.icon}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                      {service.category}
                    </h2>
                  </div>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Choose the perfect plan for your {service.category.toLowerCase()} needs
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {service.packages.map((pkg, index) => (
                    <div key={pkg.name} className="group relative">
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                      
                      <Card className={`luxury-card relative h-full ${pkg.popular ? 'border-primary/50 ring-2 ring-primary/20' : ''}`}>
                        {pkg.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg px-4 py-2">
                              <Star className="w-3 h-3 mr-1" />
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-8 pt-8">
                          <div className="mb-4">
                            <Badge variant="outline" className="mb-2">
                              {pkg.highlight}
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                          <CardDescription className="text-muted-foreground text-base mb-6">
                            {pkg.description}
                          </CardDescription>
                          <div className="mb-6">
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                {pkg.price}
                              </span>
                              <span className="text-muted-foreground">
                                /{pkg.period}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <ul className="space-y-4 mb-8">
                            {pkg.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-3">
                                <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-foreground leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            className={`w-full group transition-all duration-300 hover:scale-105 ${
                              pkg.popular 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-purple-500/25' 
                                : 'bg-white hover:bg-gray-50 border-2 hover:border-primary/40'
                            }`}
                            size="lg"
                            asChild
                          >
                            <a href="/contact">
                              {pkg.popular ? "Get Started Now" : "Choose This Plan"}
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative overflow-hidden">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Why Choose Our Plans?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every plan includes premium features designed to maximize your success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Money-Back Guarantee",
                  description: "30-day risk-free trial on all plans",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Fast Implementation",
                  description: "Get started within 24-48 hours",
                  color: "from-yellow-500 to-orange-600"
                },
                {
                  icon: <HeadphonesIcon className="w-8 h-8" />,
                  title: "Expert Support",
                  description: "Dedicated support team for all clients",
                  color: "from-blue-500 to-purple-600"
                }
              ].map((benefit, index) => (
                <div key={index} className="group text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            {/* Custom Quote CTA */}
            <div className="text-center">
              <div className="inline-block p-8 bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Need Something Custom?</h3>
                <p className="text-muted-foreground mb-6 max-w-lg">
                  We create tailored solutions for unique business needs. Get a personalized quote today.
                </p>
                <Button variant="outline" size="lg" className="group" asChild>
                  <a href="/contact">
                    Contact Us for Custom Quote
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto grid gap-6">
              {[
                {
                  question: "What's included in the support period?",
                  answer: "Our support includes bug fixes, minor content updates, and technical assistance via email and phone."
                },
                {
                  question: "Can I upgrade my package later?",
                  answer: "Absolutely! You can upgrade to a higher package at any time. We'll credit your previous payment towards the upgrade."
                },
                {
                  question: "Do you provide hosting?",
                  answer: "Yes, we include free hosting for the specified period in Professional and Enterprise packages. After that, hosting is available for a small monthly fee."
                },
                {
                  question: "What if I need changes after launch?",
                  answer: "Minor changes are included during your support period. For major revisions, we offer maintenance packages at competitive rates."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;