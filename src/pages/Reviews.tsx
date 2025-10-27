import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import ReviewSubmission from "@/components/ui/review-submission";
import SEO from "@/components/ui/seo";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Reviews = () => {
  // Sample existing reviews - replace with actual data
  const existingReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      service: "Website Design",
      rating: 5,
      review: "LUNEXO MEDIA transformed our online presence completely. The website they built is not only beautiful but also highly functional. Our conversion rate increased by 40% within the first month!",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "Digital Solutions",
      service: "Ads Management",
      rating: 5,
      review: "Outstanding ad management service! They helped us scale our campaigns from $5K to $50K monthly spend while maintaining excellent ROAS. Highly professional team.",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "E-Commerce Plus",
      service: "AI Automation",
      rating: 4,
      review: "The AI automation solutions they implemented saved us countless hours. Customer support response time improved dramatically with their chatbot integration.",
      date: "2024-01-05"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Client Testimonials | Success Stories with Lunexo Media"
        description="Hear from our happy clients who achieved growth through Lunexo Media's SEO, ads, and digital marketing services."
        image="https://www.lunexomedia.com/og-image-new.jpg"
        url="https://www.lunexomedia.com/reviews"
        keywords="testimonials, client reviews, success stories, customer feedback, Lunexo Media reviews"
      />
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container-wide section-padding">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Client Reviews &
                <span className="text-primary"> Testimonials</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                See what our clients say about working with LUNEXO MEDIA, and share your own experience.
              </p>
            </div>
          </div>
        </section>

        {/* Review Submission Section */}
        <section className="py-20 bg-white">
          <div className="container-wide section-padding">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Share Your Experience
              </h2>
              <p className="text-xl text-muted-foreground">
                Your feedback helps us improve and helps others make informed decisions
              </p>
            </div>
            <ReviewSubmission />
          </div>
        </section>

        {/* Existing Reviews */}
        <section className="py-20 bg-muted/30">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Real feedback from real clients who've worked with us
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {existingReviews.map((review) => (
                <Card key={review.id} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-primary mr-3" />
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{review.review}"
                    </p>
                    
                    <div className="border-t pt-4">
                      <div className="font-semibold text-foreground">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.company}</div>
                      <div className="text-xs text-primary mt-1">{review.service}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container-wide section-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our satisfied clients and let us help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors"
              >
                Get Started Today
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
