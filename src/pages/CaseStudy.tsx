import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3
} from "lucide-react";

const CaseStudy = () => {
  const { id } = useParams();

  // Case study data
  const caseStudyData = {
    "ecommerce-platform": {
      title: "E-commerce Platform Transformation",
      category: "Retail",
      client: "TechStart Solutions",
      duration: "3 months",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
      challenge: "The client's existing e-commerce platform was outdated, slow, and had a 70% bounce rate. Sales were declining, and the user experience was poor across all devices.",
      solution: "We redesigned the entire platform with a focus on performance, user experience, and conversion optimization. Implemented modern design principles and advanced functionality.",
      results: "300% increase in sales, 65% reduction in bounce rate, 400% improvement in page speed",
      metrics: [
        { label: "Sales Increase", value: "300%", icon: <TrendingUp className="w-6 h-6" /> },
        { label: "Bounce Rate Reduction", value: "65%", icon: <Target className="w-6 h-6" /> },
        { label: "Page Speed Improvement", value: "400%", icon: <Zap className="w-6 h-6" /> },
        { label: "User Satisfaction", value: "95%", icon: <Users className="w-6 h-6" /> }
      ]
    },
    "saas-dashboard": {
      title: "SaaS Dashboard Redesign",
      category: "Technology",
      client: "GrowthCorp Analytics",
      duration: "2 months",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      challenge: "Complex data visualization platform with poor usability and high user churn. Users struggled to find insights and perform key actions.",
      solution: "Complete UX/UI overhaul with intuitive navigation, streamlined workflows, and beautiful data visualizations. Focus on user onboarding and feature discovery.",
      results: "50% reduction in bounce rate, 80% increase in user engagement, 200% improvement in feature adoption",
      metrics: [
        { label: "Bounce Rate Reduction", value: "50%", icon: <Target className="w-6 h-6" /> },
        { label: "User Engagement", value: "80%", icon: <Users className="w-6 h-6" /> },
        { label: "Feature Adoption", value: "200%", icon: <BarChart3 className="w-6 h-6" /> },
        { label: "Customer Retention", value: "90%", icon: <TrendingUp className="w-6 h-6" /> }
      ]
    },
    "healthcare-portal": {
      title: "Healthcare Portal Development",
      category: "Healthcare",
      client: "MediCare Solutions",
      duration: "4 months",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
      challenge: "Healthcare providers needed a secure, HIPAA-compliant portal for patient management with complex regulatory requirements and accessibility needs.",
      solution: "Built a comprehensive healthcare portal with advanced security features, patient management systems, and full accessibility compliance.",
      results: "90% user satisfaction, 100% HIPAA compliance, 75% reduction in administrative tasks",
      metrics: [
        { label: "User Satisfaction", value: "90%", icon: <Users className="w-6 h-6" /> },
        { label: "HIPAA Compliance", value: "100%", icon: <CheckCircle className="w-6 h-6" /> },
        { label: "Admin Efficiency", value: "75%", icon: <Target className="w-6 h-6" /> },
        { label: "Patient Engagement", value: "85%", icon: <TrendingUp className="w-6 h-6" /> }
      ]
    }
  };

  const currentCase = caseStudyData[id as keyof typeof caseStudyData] || caseStudyData["ecommerce-platform"];

  const features = [
    "Custom UI/UX Design",
    "Responsive Development",
    "Performance Optimization",
    "SEO Implementation",
    "Security Measures",
    "Analytics Integration",
    "User Testing",
    "Ongoing Support"
  ];

  const testimonial = {
    quote: "The team exceeded our expectations in every way. The new platform not only looks stunning but has transformed our business results.",
    author: "Sarah Johnson",
    role: "CEO",
    company: currentCase.client
  };

  useEffect(() => {
    document.title = `${currentCase.title} | Premium Case Study | LUNEXO MEDIA`;
  }, [currentCase.title]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${currentCase.title} | Premium Case Study | LUNEXO MEDIA`}
        description={`Discover how we transformed ${currentCase.client} with premium web design. ${currentCase.results}`}
        image="https://www.lunexomedia.com/og-image.jpg"
        url={`https://www.lunexomedia.com/case-study/${id}`}
      />
      
      <Navigation />
      
      {/* Back Navigation */}
      <section className="pt-32 pb-8">
        <div className="container-wide section-padding">
          <Button variant="outline" className="mb-8" asChild>
            <a href="https://lunexomedia.com/website-design">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website Design
            </a>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-16">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="px-6 py-2 text-base font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
                  <Trophy className="w-5 h-5 mr-2" />
                  {currentCase.category}
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                  <span className="premium-gradient-text">{currentCase.title}</span>
                </h1>
                
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    <span>{currentCase.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{currentCase.duration}</span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {currentCase.challenge}
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-primary mb-2">Results Achieved</h3>
                <p className="text-lg font-semibold text-foreground">{currentCase.results}</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative luxury-card overflow-hidden">
                <img 
                  src={currentCase.image} 
                  alt={currentCase.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-gradient-to-b from-muted/10 to-background">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">
              <span className="text-foreground">Measurable</span>{" "}
              <span className="premium-gradient-text">Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every project is measured by real results that matter to your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentCase.metrics.map((metric, index) => (
              <Card key={index} className="luxury-card p-8 text-center group hover:scale-105 transition-all duration-500">
                <CardContent className="space-y-4 p-0">
                  <div className="text-primary">{metric.icon}</div>
                  <div className="text-3xl font-black text-primary">{metric.value}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution Section */}
      <section className="py-16">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Card className="luxury-card p-10">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-black">The Challenge</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentCase.challenge}
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-card p-10">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-black">Our Solution</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {currentCase.solution}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Key Features Delivered:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-accent/5">
        <div className="container-wide section-padding">
          <Card className="luxury-card p-12 text-center max-w-4xl mx-auto">
            <CardContent className="space-y-8 p-0">
              <blockquote className="text-2xl italic leading-relaxed text-muted-foreground font-light">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="space-y-2">
                <div className="text-xl font-bold text-foreground">{testimonial.author}</div>
                <div className="text-lg text-muted-foreground">{testimonial.role}</div>
                <div className="text-lg text-primary font-bold">{testimonial.company}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-wide section-padding text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-black">
              <span className="text-foreground">Ready for</span>{" "}
              <span className="premium-gradient-text">Similar Results?</span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Let's discuss how we can transform your business with premium design
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="group text-base font-bold px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-glow" asChild>
                <a href="https://lunexomedia.com/book-apartment">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="text-base font-bold px-12 py-6 rounded-2xl border-2 border-primary/30 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300" asChild>
                <a href="https://lunexomedia.com/portfolio">
                  View More Work
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudy;