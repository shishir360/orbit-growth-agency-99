import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight, Folder, BookOpen, Grid3X3 } from "lucide-react";
// React Router Link removed for full page reloads
import { useBlog } from "@/contexts/BlogContext";
import SEO from "@/components/ui/seo";

const BlogCategories = () => {
  const { getPublishedPosts } = useBlog();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const allPosts = getPublishedPosts();
  
  // Get all unique categories
  const categories = Array.from(new Set(allPosts.map(post => post.category).filter(Boolean)));
  
  // Group posts by category
  const postsByCategory = categories.reduce((acc, category) => {
    acc[category!] = allPosts.filter(post => post.category === category);
    return acc;
  }, {} as Record<string, typeof allPosts>);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    document.title = "Blog Categories | LUNEXO MEDIA - Browse by Topic";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse our blog posts by category. Find content on Website Design, SEO, Ads Management, AI Automation and more digital marketing topics.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog Categories | LUNEXO MEDIA - Browse by Topic"
        description="Browse our blog posts by category. Find content on Website Design, SEO, Ads Management, AI Automation and more digital marketing topics."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/blog/categories"
        keywords="blog categories, digital marketing topics, SEO articles, web design blog, AI automation guides"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-primary/10 backdrop-blur-md text-primary px-6 py-3 rounded-full text-sm font-medium border border-primary/20 glass-card mb-8">
              <Folder className="w-4 h-4 icon-glow" />
              BROWSE BY TOPIC
            </div>
            <h1 className="text-5xl lg:text-6xl font-space font-bold mb-8 leading-tight">
              <span className="text-gradient">
                Blog Categories
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Explore our expert insights organized by topic. Find exactly what you're looking for with our categorized content.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container-wide section-padding relative z-10">
          
          {/* Category Filter */}
          <div className="mb-12 animate-fade-in">
            <div className="modern-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Grid3X3 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-space font-semibold">Filter by Category</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  className={selectedCategory === null 
                    ? "bg-gradient-primary text-white border-0" 
                    : "hover:bg-primary/10 hover:text-primary border-primary/20"
                  }
                >
                  All Categories ({allPosts.length})
                </Button>
                {categories.map((category) => {
                  const count = postsByCategory[category!]?.length || 0;
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category!)}
                      className={selectedCategory === category 
                        ? "bg-gradient-primary text-white border-0" 
                        : "hover:bg-primary/10 hover:text-primary border-primary/20"
                      }
                    >
                      {category} ({count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category Sections */}
          {selectedCategory === null ? (
            // Show all categories
            <div className="space-y-16">
              {categories.map((category, index) => (
                <div key={category} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="w-6 h-6 text-primary icon-glow" />
                    <h2 className="text-3xl font-space font-bold text-gradient">{category}</h2>
                    <Badge variant="outline" className="border-primary/20">
                      {postsByCategory[category!]?.length || 0} posts
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postsByCategory[category!]?.slice(0, 6).map((post) => (
                      <div key={post.id} className="group">
                        <div className="modern-card overflow-hidden h-full">
                          <div className="aspect-video relative">
                            <img 
                              src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                {formatDate(post.publishDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                              </div>
                            </div>
                            <h3 className="text-xl font-space font-bold mb-3 group-hover:text-gradient transition-colors">
                              <a href={`https://lunexomedia.com/blog/${post.slug}`}>{post.title}</a>
                            </h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                            <Button variant="outline" size="sm" asChild className="hover:bg-primary/5 border-primary/20 hover:border-primary/40 transition-all">
                              <a href={`https://lunexomedia.com/blog/${post.slug}`}>
                                Read More
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {(postsByCategory[category!]?.length || 0) > 6 && (
                    <div className="text-center mt-8">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedCategory(category!)}
                        className="bg-gradient-primary/5 hover:bg-gradient-primary hover:text-white border-primary/20 hover:border-primary transition-all duration-300"
                      >
                        View All {category} Posts
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Show selected category only
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-6 h-6 text-primary icon-glow" />
                <h2 className="text-3xl font-space font-bold text-gradient">{selectedCategory}</h2>
                <Badge variant="outline" className="border-primary/20">
                  {postsByCategory[selectedCategory]?.length || 0} posts
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsByCategory[selectedCategory]?.map((post, index) => (
                  <div key={post.id} className="group animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="modern-card overflow-hidden h-full">
                      <div className="aspect-video relative">
                        <img 
                          src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {formatDate(post.publishDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-space font-bold mb-3 group-hover:text-gradient transition-colors">
                          <a href={`/blog/${post.slug}`}>{post.title}</a>
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                        <Button variant="outline" size="sm" asChild className="hover:bg-primary/5 border-primary/20 hover:border-primary/40 transition-all">
                          <a href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogCategories;