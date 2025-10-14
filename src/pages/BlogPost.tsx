import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, ArrowLeft, Share2, Copy, Check, BookOpen, ArrowRight } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBlog } from "@/contexts/BlogContext";
import SEO from "@/components/ui/seo";
import { BlogEngagement, KeyTakeaways, QuickActionCTA } from "@/components/ui/blog-engagement";
import SafeImage from "@/components/ui/safe-image";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const { getPostBySlug, getPublishedPosts, loading } = useBlog();

  // Get the blog post from context
  const blogPost = getPostBySlug(slug || '');

  // Show loading state while posts are being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  // If post doesn't exist, is not published, or is blocked, redirect to blog page
  if (!blogPost || !blogPost.published || blogPost.blocked) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (published and not blocked, excluding current post)
  const relatedPosts = getPublishedPosts()
    .filter(post => post.id !== blogPost.id)
    .slice(0, 2);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const currentUrl = window.location.href;
  const shareText = `Check out this article: ${blogPost.title}`;

  // Only allow sharing if post is published and not blocked
  const canShare = blogPost.published && !blogPost.blocked;

  const handleShare = async () => {
    if (!canShare) {
      toast({
        title: "Cannot share",
        description: "This post is not available for sharing.",
        variant: "destructive",
      });
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: shareText,
          url: currentUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShareLinkedIn = () => {
    if (!canShare) {
      toast({
        title: "Cannot share",
        description: "This post is not available for sharing.",
        variant: "destructive",
      });
      return;
    }
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    if (!canShare) {
      toast({
        title: "Cannot share",
        description: "This post is not available for sharing.",
        variant: "destructive",
      });
      return;
    }
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = async () => {
    if (!canShare) {
      toast({
        title: "Cannot share",
        description: "This post is not available for sharing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually from your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${blogPost.title} | LUNEXO MEDIA Blog`}
        description={blogPost.excerpt}
        url={`https://www.lunexomedia.com/blog/${blogPost.slug}`}
        image={blogPost.image?.startsWith('http') ? blogPost.image : `https://www.lunexomedia.com${blogPost.image}`}
        type="article"
        keywords={`${blogPost.category}, ${blogPost.title}, digital marketing, business growth, LUNEXO MEDIA`}
        author={blogPost.author}
        article={{
          publishedTime: new Date(blogPost.publishDate).toISOString(),
          modifiedTime: new Date(blogPost.updatedAt).toISOString(),
          author: blogPost.author,
          section: blogPost.category,
          tags: [blogPost.category || 'Digital Marketing', 'Business Growth', 'LUNEXO MEDIA']
        }}
      />
      
      {/* Blog Engagement Features */}
      <BlogEngagement 
        postId={blogPost.id}
        title={blogPost.title}
        category={blogPost.category}
        readTime={blogPost.readTime}
      />
      
      <Navigation />
      
      {/* Back to Blog */}
      <section className="bg-white py-8 border-b">
        <div className="container-wide section-padding">
          <Button variant="ghost" asChild>
            <a href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </a>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="bg-white py-12">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <Badge variant="outline">{blogPost.category}</Badge>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {formatDate(blogPost.publishDate)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {blogPost.excerpt}
            </p>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">L</span>
                </div>
                <div>
                  <p className="font-medium">{blogPost.author}</p>
                  <p className="text-sm text-muted-foreground">LUNEXO MEDIA Team</p>
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare} disabled={!canShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {blogPost.image && (
              <div className="aspect-video mb-12 rounded-lg overflow-hidden">
                <SafeImage
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="space-y-8">
                  {/* Article Body */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-space prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground/90 prose-ul:mb-6 prose-ol:mb-6 prose-li:mb-2 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-medium"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />
                  
                  {/* Key Takeaways */}
                  <KeyTakeaways 
                    points={[
                      "Focus on user experience and conversion optimization to maximize results",
                      "Implement A/B testing to validate changes before full deployment",
                      "Monitor analytics regularly to identify improvement opportunities",
                      "Consider mobile-first design for better reach and engagement",
                      "Use data-driven insights to guide your strategic decisions"
                    ]}
                  />
                  
                  {/* Quick Action CTA */}
                  <QuickActionCTA />
                  
                  {/* Mid-Article CTA */}
                  <div className="my-16 animate-fade-in">
                    <div className="bg-gradient-primary/5 border border-primary/20 rounded-2xl p-8 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-space font-bold mb-4 text-gradient">
                          Ready to Implement These Strategies?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Let our expert team help you apply these insights to grow your business faster with proven results.
                        </p>
                        <Button 
                          asChild 
                          size="lg" 
                          className="bg-gradient-primary text-white border-0 shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105"
                        >
                          <a href="/contact">
                            Get Expert Help Today
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-8 sticky top-8">
                  
                  {/* Table of Contents */}
                  <Card className="modern-card">
                    <CardContent className="p-6">
                      <h3 className="font-space font-semibold mb-4 text-gradient">Jump to Section</h3>
                      <nav className="space-y-3 text-sm">
                        <a href="#understanding" className="block text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                          Understanding the Basics
                        </a>
                        <a href="#strategies" className="block text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                          Key Strategies
                        </a>
                        <a href="#implementation" className="block text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                          Implementation Tips
                        </a>
                        <a href="#results" className="block text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                          Expected Results
                        </a>
                        <a href="#conclusion" className="block text-muted-foreground hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3">
                          Next Steps
                        </a>
                      </nav>
                    </CardContent>
                  </Card>

                  {/* Quick Action CTA */}
                  <Card className="modern-card bg-gradient-primary/5 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-lg">🚀</span>
                      </div>
                      <h3 className="font-space font-semibold mb-3 text-gradient">Need Help?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get personalized advice from our experts
                      </p>
                      <Button 
                        asChild 
                        size="sm" 
                        className="w-full bg-gradient-primary text-white border-0 hover:shadow-glow transition-all"
                      >
                        <a href="/contact">
                          Book Consultation
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Share */}
                  <Card className="modern-card">
                    <CardContent className="p-6">
                      <h3 className="font-space font-semibold mb-4 text-gradient">Share This Article</h3>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all" 
                          onClick={handleShareLinkedIn}
                          disabled={!canShare}
                        >
                          📱 Share on LinkedIn
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start hover:bg-blue-50 hover:text-blue-400 hover:border-blue-200 transition-all" 
                          onClick={handleShareTwitter}
                          disabled={!canShare}
                        >
                          🐦 Share on Twitter
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start hover:bg-gray-50 hover:border-gray-300 transition-all" 
                          onClick={handleCopyLink}
                          disabled={!canShare}
                        >
                          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          {copied ? 'Copied!' : 'Copy Link'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <SafeImage
                      src={post.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </h3>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/blog/${post.slug}`}>
                        Read Article
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action-Oriented CTA Section */}
      <section className="py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
        <div className="container-wide section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20 mb-8">
                🎯 TAKE ACTION NOW
              </div>
              <h2 className="text-4xl lg:text-5xl font-space font-bold mb-8 leading-tight">
                Ready to Turn Insights Into Results?
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
                Don't just read about success strategies—implement them with our expert team. 
                We've helped 500+ businesses achieve their goals with proven methods.
              </p>
              
              {/* Action Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    💬
                  </div>
                  <h3 className="font-space font-semibold mb-2">Free Consultation</h3>
                  <p className="text-white/80 text-sm">
                    30-minute strategy session to discuss your goals
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    📊
                  </div>
                  <h3 className="font-space font-semibold mb-2">Free Audit</h3>
                  <p className="text-white/80 text-sm">
                    Comprehensive review of your current setup
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    🚀
                  </div>
                  <h3 className="font-space font-semibold mb-2">Quick Start</h3>
                  <p className="text-white/80 text-sm">
                    Get immediate help with your most urgent needs
                  </p>
                </div>
              </div>
              
              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 border-0 shadow-glow transition-all duration-300 hover:scale-105 font-semibold px-8"
                >
                  <a href="/contact">
                    Book Your Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  <a href="/portfolio">
                    See Our Success Stories
                  </a>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="font-medium">500+ Happy Clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span className="font-medium">98% Success Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    <span className="font-medium">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-space font-bold mb-4 text-gradient">
              Stay Ahead of the Competition
            </h3>
            <p className="text-muted-foreground mb-8">
              Get weekly insights, tips, and strategies delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-input rounded-md bg-background focus:border-primary transition-colors"
              />
              <Button size="lg" className="sm:w-auto bg-gradient-primary">
                Subscribe Free
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. 1000+ marketers trust our weekly insights.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;