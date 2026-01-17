import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  Search, 
  CheckCircle, 
  ArrowLeft,
  TrendingUp,
  Eye,
  Target,
  FileText,
  Globe,
  Code,
  BarChart
} from "lucide-react";

const SEOFriendly = () => {
  const seoFeatures = [
    "Meta Tag Optimization",
    "Schema Markup Implementation", 
    "Site Speed Optimization",
    "Content Structure & Headings",
    "XML Sitemap Generation",
    "Robot.txt Configuration",
    "URL Structure Optimization",
    "Internal Link Strategy"
  ];

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, stat: "250%", label: "Organic Traffic Increase" },
    { icon: <Eye className="w-6 h-6" />, stat: "Top 3", label: "Average Search Ranking" },
    { icon: <Target className="w-6 h-6" />, stat: "85%", label: "Keyword Ranking Success" },
    { icon: <BarChart className="w-6 h-6" />, stat: "6 Months", label: "Average Results Time" }
  ];

  const seoElements = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Technical SEO",
      description: "Clean code, proper HTML structure, and fast-loading pages that search engines love to crawl and index.",
      features: ["HTML5 Semantic Structure", "Clean URL Structure", "Fast Loading Speed", "Mobile-First Design"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "On-Page Optimization",
      description: "Strategic placement of keywords, optimized meta tags, and content structure for maximum search visibility.",
      features: ["Meta Title & Description", "Header Tag Optimization", "Keyword Strategy", "Content Optimization"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Schema Markup",
      description: "Rich snippets and structured data help search engines understand your content and display enhanced results.",
      features: ["Local Business Schema", "Product Schema", "FAQ Schema", "Breadcrumb Markup"]
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "SEO Analytics",
      description: "Track rankings, monitor traffic, and measure the success of your SEO efforts with detailed reporting.",
      features: ["Ranking Tracking", "Traffic Analysis", "Conversion Monitoring", "Monthly Reports"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="SEO Friendly Website Design | Lunexo Media"
        description="Build SEO-optimized websites that rank higher in search results. Our SEO-friendly designs drive organic traffic and improve search engine visibility."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services/seo-friendly"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background/50 to-muted/30">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="outline" size="sm" className="mb-6" asChild>
              <Link to="/website-design">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website Design
              </Link>
            </Button>
            
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              <Search className="w-4 h-4 mr-2" />
              SEO Optimization
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              SEO-Friendly Websites
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              Get found on Google with websites built for search engine success. Our SEO-optimized designs help you rank higher, drive organic traffic, and reach more customers online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <a href="https://lunexomedia.com/contact">
                  Boost My SEO Rankings
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                <a href="https://lunexomedia.com/portfolio">
                  See SEO Success Stories
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Impact Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              SEO Results That Drive Business Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our SEO-optimized websites consistently deliver improved search rankings and increased organic traffic.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
            {stats.map((item, index) => (
              <div key={index} className="group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{item.stat}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Search Engine Visibility Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-primary mb-2">Week 1-2</div>
                <div className="text-sm text-muted-foreground">Indexing & Crawling</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary mb-2">Month 1-2</div>
                <div className="text-sm text-muted-foreground">Initial Rankings</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary mb-2">Month 3-4</div>
                <div className="text-sm text-muted-foreground">Traffic Growth</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary mb-2">Month 6+</div>
                <div className="text-sm text-muted-foreground">Top Rankings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Elements */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Complete SEO Optimization
            </h2>
            <p className="text-xl text-muted-foreground">
              Every aspect of your website optimized for search engine success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {seoElements.map((element, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {element.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {element.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {element.description}
                      </p>
                      <div className="space-y-2">
                        {element.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">SEO Best Practices Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seoFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Local SEO Optimization
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Dominate local search results and attract customers in your area
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Google My Business</h3>
                  <p className="text-muted-foreground text-sm">
                    Optimized business listings and local citations for maximum visibility
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Local Keywords</h3>
                  <p className="text-muted-foreground text-sm">
                    Strategic targeting of location-based search terms and phrases
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <BarChart className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Review Management</h3>
                  <p className="text-muted-foreground text-sm">
                    Systems to encourage and manage customer reviews for better rankings
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container-narrow section-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Stop losing customers to competitors. Get an SEO-optimized website that ranks higher and drives more organic traffic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
              <a href="https://lunexomedia.com/contact">
                Start SEO Optimization
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/20 border-white/30 text-white hover:bg-white/30">
              <a href="https://lunexomedia.com/website-design">
                Back to Services
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SEOFriendly;