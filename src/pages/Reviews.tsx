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
    <div className="min-h-screen bg-black">
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
        <section className="py-24 relative overflow-hidden bg-black">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/25 to-cyan-500/20 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-r from-cyan-600/20 to-teal-500/15 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          
          <div className="container-wide section-padding relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-full text-sm font-medium backdrop-blur-xl mb-8">
                <Star className="w-4 h-4" />
                Client Reviews
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                Client Reviews &
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"> Testimonials</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                See what our clients say about working with LUNEXO MEDIA, and share your own experience.
              </p>
            </div>
          </div>
        </section>

        {/* Review Submission Section */}
        <section className="py-20 bg-black relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/15 to-cyan-500/15 rounded-full blur-[150px]"></div>
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                Share Your <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
              </h2>
              <p className="text-xl text-white/70">
                Your feedback helps us improve and helps others make informed decisions
              </p>
            </div>
            <ReviewSubmission />
          </div>
        </section>

        {/* Existing Reviews */}
        <section className="py-20 bg-black relative">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/15 to-teal-500/15 rounded-full blur-[150px]"></div>
          <div className="container-wide section-padding relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
                What Our <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Clients Say</span>
              </h2>
              <p className="text-xl text-white/70">
                Real feedback from real clients who've worked with us
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {existingReviews.map((review) => (
                <Card key={review.id} className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4 text-emerald-400">
                      <Quote className="w-8 h-8 text-emerald-400 mr-3" />
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    
                    <p className="text-white/70 mb-6 leading-relaxed">
                      "{review.review}"
                    </p>
                    
                    <div className="border-t border-white/10 pt-4">
                      <div className="font-semibold text-white">{review.name}</div>
                      <div className="text-sm text-white/60">{review.company}</div>
                      <div className="text-xs text-emerald-400 mt-1">{review.service}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/15 via-transparent to-cyan-600/15"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 rounded-full blur-[100px]"></div>
          
          <div className="container-wide section-padding text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" style={{fontFamily: "'Playfair Display', serif"}}>
              Ready to Create Your <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Success Story?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join our satisfied clients and let us help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#C5FF4A] text-black font-semibold rounded-full hover:bg-[#d4ff6a] transition-colors shadow-2xl shadow-[#C5FF4A]/30"
              >
                Get Started Today
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-medium rounded-full bg-white/5 hover:bg-white/10 transition-colors"
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
