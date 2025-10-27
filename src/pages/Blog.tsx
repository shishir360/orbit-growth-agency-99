import { useEffect, useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import BreadcrumbSEO from "@/components/ui/breadcrumb-seo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock, ArrowRight, Sparkles, BookOpen, TrendingUp, Search, Filter } from "lucide-react";
// React Router Link removed for full page reloads
import { useBlog } from "@/contexts/BlogContext";
import SEO from "@/components/ui/seo";
import SafeImage from "@/components/ui/safe-image";

const Blog = () => {
  const { getPublishedPosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Get all published and non-blocked posts
  const allBlogPosts = getPublishedPosts();
  
  // Debug: Log the posts to console
  console.log("All blog posts:", allBlogPosts);
  console.log("Posts count:", allBlogPosts.length);
  
  // Filter posts based on search and category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const blogPosts = filteredPosts;
  const categories = ["All", "Website Design", "Ads Management", "AI Automation"];
  const recentPosts = allBlogPosts.slice(0, 3);
  const featuredPost = allBlogPosts.find(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    document.title = "Digital Marketing Blog | Tips, Trends & Insights";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stay updated with Lunexo Media\'s blog. Read expert articles on SEO, paid ads, web design, and AI automation to grow your online presence.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Digital Marketing Blog | Tips, Trends & Insights"
        description="Stay updated with Lunexo Media's blog. Read expert articles on SEO, paid ads, web design, and AI automation to grow your online presence."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/blog"
        keywords="digital marketing, SEO tips, advertising insights, AI tools, business growth, Lunexo Media blog"
      />
      
      <Navigation />
      
      <div className="container-wide section-padding pt-8">
        <BreadcrumbSEO 
          items={[]}
          currentPage="Blog"
        />
      </div>
      
      {/* Hero Section */}
      <section className="py-16 bg-background">
        <div className="container-wide section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Digital Marketing Insights & Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Discover the latest trends, strategies, and tips for building successful digital 
              products and membership platforms.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Browse Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container-wide section-padding">
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{blogPosts.map((post, index) => (
              <Card key={post.slug} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <SafeImage
                    src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime || '5 min read'}
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {post.category || 'Development'}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto text-primary">
                    <a href={`/blog/${post.slug}`} className="flex items-center gap-1">
                      Read more
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Blog;