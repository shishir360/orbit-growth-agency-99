import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Shield, Lock, Eye, FileText, Sparkles, Users, Database, Bell, Settings, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialMedia from "@/components/ui/social-media";

const Privacy = () => {
  const sections = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Information We Collect",
      content: "When you use our website or submit a booking form, we may collect the following information to provide our services and support.",
      details: [
        "Name",
        "Email Address",
        "Phone Number",
        "Service Requirements or Project Details"
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "How We Use Your Information",
      content: "We use the collected information for purposes including responding to inquiries, providing services, and improving our website quality.",
      details: [
        "Responding to inquiries and booking requests",
        "Providing our services and support",
        "Improving our website and service quality",
        "Sending updates, promotional offers, or important notices (only if you consent)"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Protection",
      content: "We implement appropriate security measures to protect your personal data and do not sell, trade, or rent users' personal information to third parties.",
      details: [
        "We implement appropriate security measures to protect your personal data",
        "We do not sell, trade, or rent users' personal information to third parties",
        "Information may only be shared if required by law or legal processes"
      ]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Cookies & Tracking",
      content: "Our website may use cookies to improve user experience, track preferences, and analyze website performance.",
      details: [
        "Cookies used to improve user experience and track preferences",
        "Analytics to monitor website performance",
        "You may disable cookies in your browser settings",
        "Some website features may not function properly without cookies"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Third-Party Services",
      content: "We may use third-party services for analytics and advertising tools. These providers have their own privacy policies.",
      details: [
        "Third-party analytics and advertising tools may be used",
        "These providers have their own privacy policies",
        "We are not responsible for third-party practices"
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Data Retention & User Rights",
      content: "We retain personal information only as long as necessary and you have rights to access, correct, or delete your data.",
      details: [
        "We retain personal information only for as long as necessary to provide our services",
        "Access your personal data",
        "Request corrections or updates",
        "Request deletion of your data (where applicable)",
        "Opt out of promotional communications"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy | Data Protection & Security | LUNEXO MEDIA"
        description="Learn how LUNEXO MEDIA protects your privacy and personal data. Comprehensive privacy policy covering data collection, usage, and your rights."
        url="https://www.lunexomedia.com/privacy"
      />
      
      <Navigation />
      
      {/* Modern Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent-cta/15 to-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container-wide section-padding relative z-10">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <Badge variant="outline" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-full mb-8">
              <Shield className="w-6 h-6 text-primary" />
              Privacy & Data Protection
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-8">
              <span className="text-foreground">Your Privacy</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent-cta to-accent bg-clip-text text-transparent">
                Is Our Priority
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
              At Lunexo Media, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website. 
              <span className="text-accent-cta font-bold"> Your trust is everything to us.</span>
            </p>
            
            <div className="flex items-center justify-center gap-4 text-muted-foreground mb-8">
              <Clock className="w-5 h-5" />
              <span className="text-lg">Effective Date: 01 September 2025</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg font-bold px-8 py-4 rounded-2xl">
                <Settings className="w-5 h-5 mr-2" />
                Manage Privacy Settings
              </Button>
              <Button size="lg" variant="outline" className="text-lg font-bold px-8 py-4 rounded-2xl border-2 border-primary/30">
                <FileText className="w-5 h-5 mr-2" />
                Download Your Data
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Privacy Sections */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/10">
        <div className="container-wide section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {sections.map((section, index) => (
                <div key={index} className="group">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-accent-cta/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:scale-[1.02] transition-all duration-500">
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-primary via-accent to-accent-cta p-8 text-white">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                            {section.icon}
                          </div>
                          <h3 className="text-2xl font-bold">{section.title}</h3>
                        </div>
                        <p className="text-white/90 text-lg leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-8">
                        <h4 className="text-lg font-bold text-foreground mb-4">What This Means:</h4>
                        <ul className="space-y-3">
                          {section.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                              <span className="text-muted-foreground leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Section */}
      <section className="py-20 bg-gradient-to-br from-muted/10 to-background">
        <div className="container-wide section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-full mb-12">
              <Users className="w-6 h-6 text-primary" />
              Stay Connected
            </Badge>
            
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="text-foreground">Questions About Your</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent-cta to-accent bg-clip-text text-transparent">Privacy?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              We're committed to transparency and protecting your data. Reach out if you need any clarification about our privacy practices.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Privacy Support</h3>
                <p className="text-muted-foreground mb-4">Get help with privacy settings and data requests</p>
                <a href="mailto:hello@lunexomedia.com" className="text-primary font-bold hover:underline">
                  hello@lunexomedia.com
                </a>
              </div>
              
              <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-cta rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">General Inquiries</h3>
                <p className="text-muted-foreground mb-4">Questions about our privacy policy and practices</p>
                <a href="tel:+17024830749" className="text-primary font-bold hover:underline">
                  +1 (702) 483-0749
                </a>
              </div>
            </div>
            
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <SocialMedia variant="contact" className="max-w-md mx-auto" />
            </div>
            
            <div className="mt-12">
              <Button size="lg" asChild className="text-xl font-bold px-12 py-6 rounded-2xl">
                <a href="/book-appointment">Book Appointment</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;