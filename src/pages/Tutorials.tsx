import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, ArrowRight, BookOpen, Sparkles, GraduationCap, Play, Search, Filter, Star, TrendingUp, Code, Palette, Bot } from "lucide-react";
// React Router Link removed for full page reloads
import { Input } from "@/components/ui/input";

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const tutorials = [
    {
      title: "Building Your First SaaS MVP: A Complete Guide",
      excerpt: "Learn how to build and launch a SaaS product from concept to first customers in 30 days using modern no-code and low-code tools.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      category: "SaaS Development",
      readTime: "15 min read",
      author: "LUNEXO MEDIA Team",
      slug: "building-first-saas-mvp",
      difficulty: "Beginner",
      featured: true,
      tags: ["MVP", "SaaS", "Startup", "Product Launch"]
    },
    {
      title: "Membership Site Setup: From Zero to Launch",
      excerpt: "Step-by-step tutorial on creating a profitable membership site with payment integration and user management.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
      category: "Membership Sites",
      readTime: "12 min read",
      author: "LUNEXO MEDIA Team",
      slug: "membership-site-setup",
      difficulty: "Intermediate",
      featured: false,
      tags: ["Membership", "Payments", "User Management"]
    },
    {
      title: "AI Chatbot Integration for Customer Support",
      excerpt: "Implement an AI chatbot to handle 80% of customer inquiries automatically and improve response times.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      category: "AI Automation",
      readTime: "10 min read",
      author: "LUNEXO MEDIA Team",
      slug: "ai-chatbot-integration",
      difficulty: "Advanced",
      featured: true,
      tags: ["AI", "Chatbot", "Automation", "Customer Support"]
    },
    {
      title: "Converting Landing Pages: Design Best Practices",
      excerpt: "Design principles and strategies to maximize your landing page conversion rates and drive more sales.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      category: "Web Design",
      readTime: "8 min read",
      author: "LUNEXO MEDIA Team",
      slug: "converting-landing-pages",
      difficulty: "Beginner",
      featured: false,
      tags: ["Landing Pages", "Conversion", "Design", "UX"]
    },
    {
      title: "Google Ads Optimization: Double Your ROI",
      excerpt: "Advanced strategies to optimize your Google Ads campaigns and achieve better return on investment.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
      category: "Digital Marketing",
      readTime: "12 min read",
      author: "LUNEXO MEDIA Team",
      slug: "google-ads-optimization",
      difficulty: "Intermediate",
      featured: true,
      tags: ["Google Ads", "PPC", "ROI", "Marketing"]
    },
    {
      title: "Facebook Ads Mastery: Complete Setup Guide",
      excerpt: "Master Facebook advertising with this comprehensive guide covering campaign setup, targeting, and optimization.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&q=80",
      category: "Digital Marketing",
      readTime: "14 min read",
      author: "LUNEXO MEDIA Team",
      slug: "facebook-ads-mastery",
      difficulty: "Intermediate",
      featured: false,
      tags: ["Facebook Ads", "Social Media", "Targeting", "Marketing"]
    },
    {
      title: "SEO Fundamentals: Rank Higher on Google",
      excerpt: "Learn the essential SEO strategies to improve your website's search engine rankings and organic traffic.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
      category: "SEO",
      readTime: "16 min read",
      author: "LUNEXO MEDIA Team",
      slug: "seo-fundamentals",
      difficulty: "Beginner",
      featured: false,
      tags: ["SEO", "Google", "Organic Traffic", "Keywords"]
    },
    {
      title: "Email Automation Workflows That Convert",
      excerpt: "Build powerful email automation sequences that nurture leads and convert them into paying customers.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
      category: "AI Automation",
      readTime: "11 min read",
      author: "LUNEXO MEDIA Team",
      slug: "email-automation-workflows",
      difficulty: "Intermediate",
      featured: false,
      tags: ["Email Marketing", "Automation", "Lead Nurturing", "Conversion"]
    }
  ];

  const categories = ["All", "SaaS Development", "Membership Sites", "AI Automation", "Web Design", "Digital Marketing", "SEO"];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Advanced":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  useEffect(() => {
    document.title = "Marketing & Automation Tutorials | Learn with Lunexo Media";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free tutorials on SEO, ads, website tools, and AI automation. Learn from experts and take your digital skills to the next level.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEO
        title="Marketing & Automation Tutorials | Learn with Lunexo Media"
        description="Free tutorials on SEO, ads, website tools, and AI automation. Learn from experts and take your digital skills to the next level."
        url="https://www.lunexomedia.com/tutorials"
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 ultra-premium-hero">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary bg-white/60 backdrop-blur-sm border border-white/20 rounded-full mb-8 shadow-lg">
              <GraduationCap className="w-4 h-4" />
              FREE TUTORIALS & GUIDES
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Master Digital
              </span>
              <br />
              <span className="premium-gradient-text">
                Growth & Automation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-4xl mx-auto">
              Comprehensive tutorials and step-by-step guides to help you build, launch, and scale your digital business. 
              Learn from real-world experience with proven strategies and modern tools.
            </p>
            
            {/* Search and Stats */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-sm border-white/40 focus:border-primary/40"
                />
              </div>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="font-bold text-2xl premium-gradient-text">{tutorials.length}+</div>
                  <div>Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl premium-gradient-text">50K+</div>
                  <div>Students</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl premium-gradient-text">4.9★</div>
                  <div>Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-12 relative border-b border-border/50">
        <div className="container-wide section-padding relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">Featured Tutorials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTutorials.map((tutorial, index) => (
              <Card key={index} className="luxury-card group">
                <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getDifficultyColor(tutorial.difficulty)} border`}>
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Badge variant="outline">{tutorial.category}</Badge>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tutorial.readTime}
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {tutorial.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="group/btn p-0 h-auto" asChild>
                    <a href={`/tutorials/${tutorial.slug}`}>
                      Read Tutorial
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 relative border-b border-border/50">
        <div className="container-wide section-padding relative z-10">
          <div className="flex flex-wrap gap-3 justify-center">
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
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Tutorials Grid */}
      <section className="py-20 relative">
        <div className="container-wide section-padding relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory === "All" ? "All Tutorials" : `${selectedCategory} Tutorials`}
              </h2>
              <p className="text-muted-foreground">
                {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl filter blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <Card className="luxury-card relative overflow-hidden h-full">
                  <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={tutorial.image} 
                      alt={tutorial.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getDifficultyColor(tutorial.difficulty)} border`}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    {tutorial.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Badge variant="outline">{tutorial.category}</Badge>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tutorial.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {tutorial.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed flex-1 line-clamp-3">
                      {tutorial.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tutorial.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {tutorial.author}
                      </div>
                      
                      <Button variant="ghost" size="sm" className="group/btn" asChild>
                        <a href={`/tutorials/${tutorial.slug}`}>
                          Read Tutorial
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No tutorials found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50/50 to-blue-50/30">
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="luxury-card p-12">
              <TrendingUp className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Stay Ahead of the Curve
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Join thousands of entrepreneurs and creators who get our latest tutorials, tips, and strategies delivered weekly. 
                Never miss a breakthrough technique or industry insight.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
                <Input
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/80 border-white/40 focus:border-primary/40"
                />
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Subscribe Free
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-8">
                Need help with implementation?{" "}
                <a href="/contact" className="text-primary hover:underline font-medium">
                  Book a free consultation
                </a>
              </p>

              {/* CTA Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold mb-2">Free Consultation</h3>
                  <p className="text-muted-foreground text-sm mb-4">Get personalized advice for your project</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/book-apartment">Book Call</a>
                  </Button>
                </div>

                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold mb-2">Custom Development</h3>
                  <p className="text-muted-foreground text-sm mb-4">We build it for you, done-for-you style</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/contact">Get Quote</a>
                  </Button>
                </div>

                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold mb-2">Join Community</h3>
                  <p className="text-muted-foreground text-sm mb-4">Connect with fellow builders and creators</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/contact">Join Discord</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tutorials;