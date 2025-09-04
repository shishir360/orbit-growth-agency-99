import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle, 
  ArrowLeft,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

const MobileOptimized = () => {
  const benefits = [
    "Cross-device Compatibility",
    "Touch-friendly Interface", 
    "Adaptive Content Layout",
    "Fast Mobile Performance",
    "Mobile-first Design Approach",
    "Responsive Navigation",
    "Optimized Images & Media",
    "Mobile SEO Best Practices"
  ];

  const stats = [
    { icon: <Smartphone className="w-6 h-6" />, stat: "60%", label: "Mobile Traffic Average" },
    { icon: <TrendingUp className="w-6 h-6" />, stat: "200%", label: "Mobile Conversion Boost" },
    { icon: <Users className="w-6 h-6" />, stat: "85%", label: "User Retention Increase" },
    { icon: <Zap className="w-6 h-6" />, stat: "3x", label: "Faster Load Times" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Mobile Optimized Website Design | Lunexo Media"
        description="Get responsive, mobile-first website designs that work perfectly on all devices. Boost your mobile traffic and conversions with our expert optimization services."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services/mobile-optimized"
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
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile Optimization
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Mobile Optimized Websites
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              In today's mobile-first world, your website must deliver an exceptional experience across all devices. Our mobile optimization ensures your site looks perfect and performs flawlessly on smartphones, tablets, and desktops.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/contact">
                  Get Mobile Optimization
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                <Link to="/portfolio">
                  View Mobile Examples
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Device Preview Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Perfect on Every Device
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our responsive designs automatically adapt to provide the optimal viewing experience across all screen sizes and devices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Mobile Phones</h3>
                <p className="text-muted-foreground mb-4">
                  Optimized for touch interactions with finger-friendly buttons and intuitive navigation.
                </p>
                <div className="text-sm text-primary font-semibold">
                  320px - 768px screens
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Tablet className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Tablets</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect balance of mobile convenience and desktop functionality for tablet users.
                </p>
                <div className="text-sm text-primary font-semibold">
                  768px - 1024px screens
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Monitor className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Desktop</h3>
                <p className="text-muted-foreground mb-4">
                  Full-featured experience with advanced layouts and comprehensive navigation.
                </p>
                <div className="text-sm text-primary font-semibold">
                  1024px+ screens
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Mobile Optimization Benefits
              </h2>
              <p className="text-xl text-muted-foreground">
                Why mobile optimization is crucial for your business success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Mobile Optimization Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from our mobile-optimized websites
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container-narrow section-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready for Mobile Success?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Don't lose customers to poor mobile experience. Get a mobile-optimized website that converts visitors into customers across all devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Link to="/contact">
                Start Mobile Optimization
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Link to="/website-design">
                Back to Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileOptimized;