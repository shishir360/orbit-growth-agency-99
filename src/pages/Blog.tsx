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
import { BlogNotificationPrompt } from "@/components/BlogNotificationPrompt";

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
    <div className="min-h-screen bg-black">
      <SEO
        title="Digital Marketing Blog | Tips, Trends & Insights"
        description="Stay updated with Lunexo Media's blog. Read expert articles on SEO, paid ads, web design, and AI automation to grow your online presence."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/blog"
        keywords="digital marketing, SEO tips, advertising insights, AI tools, business growth, Lunexo Media blog"
      />
      
      <BlogNotificationPrompt />
      <Navigation />
      
      <div className="container-wide section-padding pt-8">
        <BreadcrumbSEO 
          items={[]}
          currentPage="Blog"
        />
      </div>
      
      {/* Hero Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/25 to-cyan-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-r from-cyan-600/20 to-teal-500/15 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
              <BookOpen className="w-4 h-4" />
              Our Blog
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              Digital Marketing
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Insights & Blog
              </span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Discover the latest trends, strategies, and tips for building successful digital 
              products and membership platforms.
            </p>
            <Button size="lg" className="bg-[#C5FF4A] text-black hover:bg-[#d4ff6a] font-semibold shadow-2xl shadow-[#C5FF4A]/30 rounded-full px-8">
              Browse Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-black relative">
        <div className="container-wide section-padding">
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={post.slug} className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/5 border-white/10 backdrop-blur-sm">
                <div className="aspect-video relative overflow-hidden">
                  <SafeImage
                    src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime || '5 min read'}
                    </div>
                  </div>
                  <Badge className="mb-3 text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {post.category || 'Development'}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto text-emerald-400 hover:text-emerald-300">
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
            <Button variant="outline" size="lg" className="border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-full px-8">
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