import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  Zap, 
  CheckCircle, 
  ArrowLeft,
  TrendingUp,
  Clock,
  Gauge,
  Image,
  Code,
  Server,
  Globe
} from "lucide-react";

const FastLoading = () => {
  const optimizations = [
    "Image Optimization & Compression",
    "Code Minification & Bundling", 
    "CDN Integration",
    "Performance Monitoring",
    "Lazy Loading Implementation",
    "Browser Caching Strategies",
    "Database Query Optimization",
    "Asset Preloading"
  ];

  const stats = [
    { icon: <Clock className="w-6 h-6" />, stat: "2.5s", label: "Average Load Time" },
    { icon: <TrendingUp className="w-6 h-6" />, stat: "40%", label: "Conversion Increase" },
    { icon: <Gauge className="w-6 h-6" />, stat: "95+", label: "Google PageSpeed Score" },
    { icon: <Globe className="w-6 h-6" />, stat: "99.9%", label: "Uptime Guarantee" }
  ];

  const techniques = [
    {
      icon: <Image className="w-8 h-8" />,
      title: "Image Optimization",
      description: "Advanced compression and modern formats (WebP, AVIF) for faster loading without quality loss.",
      impact: "60% faster image loading"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code Optimization",
      description: "Minified CSS/JS, tree shaking, and efficient bundling to reduce file sizes significantly.",
      impact: "50% smaller bundle size"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "CDN Implementation",
      description: "Global content distribution network ensures fast loading from anywhere in the world.",
      impact: "70% faster global loading"
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "Performance Monitoring",
      description: "Continuous monitoring and optimization to maintain peak performance standards.",
      impact: "99.9% optimal performance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Fast Loading Website Optimization | Lunexo Media"
        description="Boost your website speed with our performance optimization services. Get faster loading times, better SEO rankings, and higher conversion rates."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services/fast-loading"
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
              <Zap className="w-4 h-4 mr-2" />
              Speed Optimization
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Lightning Fast Websites
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              Every second counts in the digital world. Our speed optimization techniques ensure your website loads faster than 95% of sites on the web, improving user experience and search rankings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <a href="https://lunexomedia.com/contact">
                  Optimize My Website Speed
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                <a href="https://lunexomedia.com/portfolio">
                  See Speed Results
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Impact Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Website Speed Matters
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Website speed directly impacts your business success, user experience, and search engine rankings.
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

          <div className="bg-gradient-to-r from-red-50 to-green-50 p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Speed Impact on Conversions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-red-600 mb-2">1s → 3s</div>
                <div className="text-sm text-muted-foreground">32% conversion drop</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-orange-600 mb-2">1s → 5s</div>
                <div className="text-sm text-muted-foreground">90% conversion drop</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">Our Sites</div>
                <div className="text-sm text-muted-foreground">2.5s average load</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Techniques */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Speed Optimization Techniques
            </h2>
            <p className="text-xl text-muted-foreground">
              Advanced methods we use to make your website lightning fast
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {techniques.map((technique, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {technique.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {technique.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {technique.description}
                      </p>
                      <Badge variant="secondary" className="text-primary">
                        {technique.impact}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Complete Optimization Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {optimizations.map((optimization, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{optimization}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Guarantee */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 p-8 max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Gauge className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold">Performance Guarantee</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We guarantee your website will achieve a Google PageSpeed score of 90+ and load in under 3 seconds, or we'll continue optimizing at no extra cost.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-primary mb-2">90+ Score</div>
                <div className="text-sm text-muted-foreground">Google PageSpeed</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary mb-2">&lt; 3s Load</div>
                <div className="text-sm text-muted-foreground">Time Guarantee</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary mb-2">100% Satisfaction</div>
                <div className="text-sm text-muted-foreground">Or Money Back</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container-narrow section-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Speed Up Your Website?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Don't let slow loading times cost you customers. Get professional speed optimization that delivers real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
              <a href="https://lunexomedia.com/contact">
                Start Speed Optimization
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

export default FastLoading;