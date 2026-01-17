import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { 
  TrendingUp, 
  CheckCircle, 
  ArrowLeft,
  Target,
  Users,
  MousePointer,
  Brain,
  Eye,
  ShieldCheck,
  BarChart
} from "lucide-react";

const ConversionFocused = () => {
  const conversionFeatures = [
    "Strategic CTAs Placement",
    "Trust Signals Integration", 
    "User Journey Optimization",
    "A/B Testing Ready",
    "Psychological Design Triggers",
    "Social Proof Elements",
    "Urgency & Scarcity Tactics",
    "Mobile-First Conversion"
  ];

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, stat: "180%", label: "Average Conversion Boost" },
    { icon: <Target className="w-6 h-6" />, stat: "4.2%", label: "Average Conversion Rate" },
    { icon: <Users className="w-6 h-6" />, stat: "73%", label: "User Engagement Increase" },
    { icon: <BarChart className="w-6 h-6" />, stat: "2.8x", label: "Revenue Multiplier" }
  ];

  const conversionElements = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Psychology-Driven Design",
      description: "We use proven psychological principles to influence user behavior and guide visitors toward conversion actions.",
      techniques: ["Color Psychology", "Visual Hierarchy", "Cognitive Load Reduction", "Decision Architecture"]
    },
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: "Strategic CTA Placement",
      description: "Call-to-action buttons positioned at optimal locations using heat map data and user behavior analysis.",
      techniques: ["Above-the-Fold CTAs", "Exit-Intent Popups", "Sticky Navigation", "Multiple CTA Variations"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Trust Signal Integration",
      description: "Build credibility and reduce purchase anxiety with strategically placed trust elements throughout the site.",
      techniques: ["Customer Reviews", "Security Badges", "Money-Back Guarantees", "Client Testimonials"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "User Experience Optimization",
      description: "Seamless user journeys that eliminate friction and guide visitors naturally toward your conversion goals.",
      techniques: ["Simplified Forms", "Progress Indicators", "Mobile Optimization", "Fast Loading Speed"]
    }
  ];

  const caseStudy = {
    title: "E-commerce Fashion Store",
    challenge: "Low conversion rate of 0.8% despite high traffic",
    solution: "Complete UX redesign with conversion optimization",
    results: [
      { metric: "Conversion Rate", before: "0.8%", after: "3.2%", improvement: "+300%" },
      { metric: "Average Order Value", before: "$45", after: "$78", improvement: "+73%" },
      { metric: "Cart Abandonment", before: "85%", after: "42%", improvement: "-51%" },
      { metric: "Revenue", before: "$15K/mo", after: "$48K/mo", improvement: "+220%" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Conversion Focused Website Design | Lunexo Media"
        description="Increase your website conversions with psychology-driven design. Our conversion optimization strategies turn more visitors into customers and boost your revenue."
        image="https://www.lunexomedia.com/og-image.jpg"
        url="https://www.lunexomedia.com/services/conversion-focused"
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
              <TrendingUp className="w-4 h-4 mr-2" />
              Conversion Optimization
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Conversion-Focused Websites
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              Transform your website into a customer-generating machine. Our conversion-focused designs use psychology, data, and proven strategies to turn more visitors into paying customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <a href="https://lunexomedia.com/contact">
                  Boost My Conversions
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                <a href="https://lunexomedia.com/portfolio">
                  See Conversion Results
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Impact Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Proven Conversion Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our conversion-optimized websites consistently outperform industry averages and drive measurable business growth.
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

          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Industry Conversion Rate Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-red-600 mb-2">2.35%</div>
                <div className="text-sm text-muted-foreground">Industry Average</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-orange-600 mb-2">3.68%</div>
                <div className="text-sm text-muted-foreground">Top 25% Websites</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">5.31%</div>
                <div className="text-sm text-muted-foreground">Our Client Average</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Elements */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Conversion Optimization Strategies
            </h2>
            <p className="text-xl text-muted-foreground">
              Science-backed techniques we use to maximize your website conversions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {conversionElements.map((element, index) => (
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
                        {element.techniques.map((technique, techIndex) => (
                          <div key={techIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{technique}</span>
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
            <h3 className="text-2xl font-bold text-center mb-8">Conversion Features Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conversionFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Real Conversion Success Story
              </h2>
              <p className="text-xl text-muted-foreground">
                How we transformed an underperforming website into a conversion powerhouse
              </p>
            </div>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                  <p className="text-muted-foreground mb-4">{caseStudy.challenge}</p>
                  <Badge variant="secondary" className="text-primary">
                    {caseStudy.solution}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">{result.metric}</div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-lg text-muted-foreground">{result.before}</span>
                        <span className="text-primary">→</span>
                        <span className="text-lg font-bold">{result.after}</span>
                      </div>
                      <Badge variant="secondary" className="text-green-600 bg-green-100">
                        {result.improvement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* A/B Testing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Continuous Optimization Process
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              We don't just build and leave. Our process includes ongoing testing and optimization to maximize your results.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Analyze", description: "Study user behavior and identify optimization opportunities" },
                { step: "2", title: "Design", description: "Create conversion-focused variations based on data insights" },
                { step: "3", title: "Test", description: "Run A/B tests to validate which design performs better" },
                { step: "4", title: "Optimize", description: "Implement winning variations and repeat the process" }
              ].map((item, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container-narrow section-padding text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Maximize Your Conversions?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Stop leaving money on the table. Get a conversion-optimized website that turns more visitors into customers and grows your revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
              <a href="https://lunexomedia.com/contact">
                Start Conversion Optimization
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

export default ConversionFocused;