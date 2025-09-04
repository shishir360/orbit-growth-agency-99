import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Bookmark, ThumbsUp, MessageCircle, ArrowRight, Star, Trophy, TrendingUp } from "lucide-react";
// React Router Link removed for full page reloads

interface BlogEngagementProps {
  postId: string;
  title: string;
  category: string;
  readTime: string;
}

export const BlogEngagement = ({ postId, title, category, readTime }: BlogEngagementProps) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const updateReadingProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          setReadingProgress(Math.min(scrolled, 100));
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttle scroll events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledUpdateProgress = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateReadingProgress, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledUpdateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledUpdateProgress);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Engagement Panel */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <Card className="modern-card p-3 space-y-3 bg-white/95 backdrop-blur-sm border-border/50 shadow-lg">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-2">Reading Progress</div>
            <div className="w-12 h-12 rounded-full border-4 border-muted relative">
              <div 
                className="absolute inset-0 rounded-full border-4 border-primary transition-all duration-300"
                style={{
                  background: `conic-gradient(hsl(var(--primary)) ${readingProgress * 3.6}deg, transparent 0deg)`,
                  clipPath: 'inset(0 round 50%)'
                }}
              />
              <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{Math.round(readingProgress)}%</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLiked(!liked)}
            className={`w-full justify-start ${liked ? 'text-red-500 bg-red-50' : 'hover:bg-red-50 hover:text-red-500'}`}
          >
            <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
            <span className="text-xs">{liked ? 'Liked' : 'Like'}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBookmarked(!bookmarked)}
            className={`w-full justify-start ${bookmarked ? 'text-blue-500 bg-blue-50' : 'hover:bg-blue-50 hover:text-blue-500'}`}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
            <span className="text-xs">{bookmarked ? 'Saved' : 'Save'}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-green-50 hover:text-green-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="text-xs">Comment</span>
          </Button>
        </Card>
      </div>

      {/* Article Stats and Engagement */}
      <div className="my-8 p-6 bg-muted/30 rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>1.2k views</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>89 likes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>23 comments</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Star className="w-3 h-3 mr-1" />
              Trending
            </Badge>
            <Badge variant="outline">
              {readTime}
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

// Key Takeaways Component
interface KeyTakeawaysProps {
  points: string[];
}

export const KeyTakeaways = ({ points }: KeyTakeawaysProps) => {
  return (
    <div className="my-12 p-8 bg-gradient-primary/5 border border-primary/20 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-xl font-space font-bold text-gradient">Key Takeaways</h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary font-semibold text-sm">{index + 1}</span>
            </div>
            <p className="text-foreground/90 leading-relaxed">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Quick Action CTA Component
export const QuickActionCTA = () => {
  return (
    <div className="my-16 p-8 bg-gradient-primary rounded-2xl text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
      <div className="relative z-10">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🎯</span>
        </div>
        <h3 className="text-2xl font-space font-bold mb-4">
          Ready to Apply What You've Learned?
        </h3>
        <p className="text-white/90 mb-6 max-w-md mx-auto">
          Don't let this knowledge go to waste. Our experts can help you implement these strategies for maximum impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 border-0 font-semibold"
          >
            <a href="/contact">
              Start Your Project Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
          >
            <a href="/pricing">
              View Our Packages
            </a>
          </Button>
        </div>
        <p className="text-white/70 text-sm mt-4">
          ⚡ Free consultation • 💯 Money-back guarantee • 🚀 Quick turnaround
        </p>
      </div>
    </div>
  );
};

export default BlogEngagement;