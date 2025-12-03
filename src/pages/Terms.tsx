import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Scale, FileCheck, CreditCard, Shield, Users, AlertTriangle, Gavel, FileText, Sparkles, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SocialMedia from "@/components/ui/social-media";
import { Link } from "react-router-dom";

const Terms = () => {
  const sections = [
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Introduction & Services",
      content: "These Terms and Conditions govern your use of Lunexo Media's website and services. By accessing our site or submitting a booking form, you acknowledge that you have read, understood, and agreed to these terms.",
      details: [
        "Website Design & Development",
        "SEO (Search Engine Optimization)",
        "Ads Management (Google, Facebook, Instagram)",
        "AI Automation Solutions",
        "We reserve the right to modify, discontinue, or update any service at any time"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Website Use & Client Responsibilities",
      content: "You agree to use this website only for lawful purposes and must not cause damage or interfere with other users' experience. When submitting our booking form, you agree to provide accurate information.",
      details: [
        "Use website only for lawful purposes",
        "Do not damage, impair availability, or interfere with site functionality",
        "Unauthorized access attempts are strictly prohibited",
        "Provide accurate and complete information in booking forms",
        "Booking form submission does not guarantee service confirmation"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Collection & Privacy",
      content: "Through our Booking Form, we collect your Name, Email Address, and Phone Number solely for communication, service booking, and customer support purposes.",
      details: [
        "Data used only for communication and service booking",
        "We do not sell or share personal information with third parties",
        "Information shared only when required by law",
        "Please review our Privacy Policy for complete details",
        "Your data is protected and handled responsibly"
      ]
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Intellectual Property Rights",
      content: "All content on this website, including text, graphics, logos, designs, and software, is the property of Lunexo Media and is protected under copyright laws.",
      details: [
        "All website content is Lunexo Media property",
        "Content protected under copyright laws",
        "Reproduction or distribution requires written permission",
        "Modification of our content is prohibited without consent",
        "Unauthorized use may result in legal action"
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Limitation of Liability & Third-Party Links",
      content: "Lunexo Media shall not be held liable for any direct, indirect, or incidental damages. We make no guarantees about website availability and are not responsible for third-party services.",
      details: [
        "No liability for direct, indirect, or incidental damages",
        "No guarantee of constant website availability or security",
        "Third-party links included but not endorsed by us",
        "Not responsible for third-party content or practices",
        "Use third-party services at your own discretion"
      ]
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: "Terms Changes & Governing Law",
      content: "We may update these Terms and Conditions at any time without prior notice. These terms are governed by the laws of Bangladesh.",
      details: [
        "Terms may be updated without prior notice",
        "Continued use means acceptance of changes",
        "Check terms regularly for updates",
        "Governed by laws of Bangladesh",
        "Contact us with any questions about these terms"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms & Conditions | Service Agreement | LUNEXO MEDIA"
        description="Read LUNEXO MEDIA's comprehensive terms and conditions for our digital marketing services. Important legal information about our service agreements."
        url="https://www.lunexomedia.com/terms"
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
              <Gavel className="w-6 h-6 text-primary" />
              Terms & Service Agreement
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight mb-8">
              <span className="text-foreground">Service Terms &</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent-cta to-accent bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
              Clear, transparent terms that protect both our clients and our business. 
              <span className="text-accent-cta font-bold"> Fair agreements for exceptional results.</span>
            </p>
            
            <div className="flex items-center justify-center gap-4 text-muted-foreground mb-8">
              <Clock className="w-5 h-5" />
              <span className="text-lg">Effective Date: 01 September 2025</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" asChild className="text-lg font-bold px-8 py-4 rounded-2xl">
                <a href="https://drive.google.com/file/d/1TJbJMpFBMNoVa34l_pdDAMBuGZuKNVDV/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-5 h-5 mr-2" />
                  Download PDF Version
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg font-bold px-8 py-4 rounded-2xl border-2 border-primary/30">
                <Gavel className="w-5 h-5 mr-2" />
                Get Legal Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Terms Sections */}
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
                        <h4 className="text-lg font-bold text-foreground mb-4">Key Points:</h4>
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

      {/* Legal Support & Contact Section */}
      <section className="py-20 bg-gradient-to-br from-muted/10 to-background">
        <div className="container-wide section-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-full mb-8">
                <Scale className="w-6 h-6 text-primary" />
                Legal Support
              </Badge>
              
              <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
                <span className="text-foreground">Need Clarification on</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent-cta to-accent bg-clip-text text-transparent">Our Terms?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We believe in transparent communication. Our legal team is available to clarify any questions about our service terms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Legal Inquiries</h3>
                <p className="text-muted-foreground mb-4">Questions about terms and agreements</p>
                <a href="mailto:hello@lunexomedia.com" className="text-primary font-bold hover:underline">
                  hello@lunexomedia.com
                </a>
              </div>
              
              <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-cta rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Contract Support</h3>
                <p className="text-muted-foreground mb-4">Help with service agreements</p>
                <a href="tel:+17024830749" className="text-primary font-bold hover:underline">
                  +1 (702) 483-0749
                </a>
              </div>
              
              <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-cta to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Gavel className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dispute Resolution</h3>
                <p className="text-muted-foreground mb-4">Professional mediation services</p>
                <a href="mailto:disputes@lunexomedia.com" className="text-primary font-bold hover:underline">
                  disputes@lunexomedia.com
                </a>
              </div>
            </div>
            
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-12">
              <SocialMedia variant="contact" className="max-w-md mx-auto" />
            </div>
            
            <div className="text-center">
              <Button size="lg" asChild className="text-xl font-bold px-12 py-6 rounded-2xl mr-4">
                <Link to="/contact">Contact Legal Team</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-xl font-bold px-12 py-6 rounded-2xl border-2 border-primary/30">
                <Link to="/privacy">View Privacy Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;