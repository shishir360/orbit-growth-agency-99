import { useParams } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User } from "lucide-react";
import DOMPurify from 'isomorphic-dompurify';

const TutorialPost = () => {
  const { slug } = useParams();

  // Mock tutorial data (in a real app, this would come from an API or CMS)
  const tutorials = {
    "building-first-saas-mvp": {
      title: "Building Your First SaaS MVP: A Complete Guide",
      content: `
        <h2>Introduction</h2>
        <p>Building a SaaS MVP doesn't have to take months. With the right approach and tools, you can go from idea to first customers in just 30 days.</p>
        
        <h2>Step 1: Validate Your Idea</h2>
        <p>Before writing any code, make sure there's real demand for your solution. Here's how:</p>
        <ul>
          <li>Survey potential customers</li>
          <li>Create a landing page to gauge interest</li>
          <li>Research competitors and market size</li>
        </ul>

        <h2>Step 2: Define Your MVP Features</h2>
        <p>Focus on the core problem your SaaS solves. Your MVP should have just enough features to satisfy early customers and provide feedback for future development.</p>

        <h2>Step 3: Choose Your Tech Stack</h2>
        <p>For rapid development, we recommend:</p>
        <ul>
          <li>Frontend: React with Vite</li>
          <li>Backend: Supabase for database and auth</li>
          <li>Payments: Stripe</li>
          <li>Hosting: Vercel or Netlify</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Building an MVP is about speed and validation. Get something working quickly, gather feedback, and iterate based on real user needs.</p>
      `,
      category: "SaaS Development",
      readTime: "15 min read",
      author: "LUNEXO MEDIA Team",
      difficulty: "Beginner",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
    },
    "membership-site-setup": {
      title: "Membership Site Setup: From Zero to Launch",
      content: `
        <h2>Planning Your Membership Site</h2>
        <p>A successful membership site starts with a clear understanding of your audience and the value you'll provide.</p>
        
        <h2>Content Strategy</h2>
        <p>Plan your content tiers and member benefits:</p>
        <ul>
          <li>Free tier: Basic content to attract users</li>
          <li>Premium tier: Exclusive content and features</li>
          <li>VIP tier: One-on-one access and premium perks</li>
        </ul>

        <h2>Technical Implementation</h2>
        <p>Set up your membership infrastructure with these tools:</p>
        <ul>
          <li>Memberstack for user management</li>
          <li>Stripe for recurring payments</li>
          <li>Webflow or custom site for content delivery</li>
        </ul>
      `,
      category: "Membership Sites",
      readTime: "12 min read",
      author: "LUNEXO MEDIA Team",
      difficulty: "Intermediate",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const tutorial = tutorials[slug as keyof typeof tutorials];

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Tutorial Not Found</h1>
          <p className="text-muted-foreground mb-8">The tutorial you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="https://lunexomedia.com/tutorials">Back to Tutorials</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${tutorial.title} | LUNEXO MEDIA Tutorials`}
        description={`Learn ${tutorial.title} - ${tutorial.category} tutorial with step-by-step instructions. Perfect for ${tutorial.difficulty.toLowerCase()} level learners.`}
        url={`https://www.lunexomedia.com/tutorials/${slug}`}
        image={tutorial.image || "https://www.lunexomedia.com/og-image-new.jpg"}
        type="article"
        keywords={`${tutorial.category}, ${tutorial.title}, tutorial, guide, ${tutorial.difficulty}, LUNEXO MEDIA`}
        author={tutorial.author}
        article={{
          publishedTime: new Date().toISOString(),
          author: tutorial.author,
          section: tutorial.category,
          tags: [tutorial.category, tutorial.difficulty, 'Tutorial', 'Guide', 'LUNEXO MEDIA']
        }}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <a href="https://lunexomedia.com/tutorials">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tutorials
              </a>
            </Button>
            
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline">{tutorial.category}</Badge>
              <Badge className={getDifficultyColor(tutorial.difficulty)}>
                {tutorial.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {tutorial.readTime}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {tutorial.author}
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              {tutorial.title}
            </h1>
            
            <div className="aspect-video mb-12 rounded-lg overflow-hidden">
              <img 
                src={tutorial.image} 
                alt={tutorial.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(tutorial.content, {
                  ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'img', 'blockquote', 'code', 'pre', 'br', 'hr'],
                  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                  ALLOW_DATA_ATTR: false
                })
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Implementing This?
          </h2>
          <p className="text-xl mb-8 opacity-90">
          Our team can help you build and launch your project in 30 days or less.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="https://lunexomedia.com/book-appointment">Book Appointment</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TutorialPost;