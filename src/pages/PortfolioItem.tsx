import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import SEO from "@/components/ui/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DOMPurify from 'dompurify';

const PortfolioItem = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('slug', id)
        .eq('published', true)
        .maybeSingle();

      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide section-padding py-20">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-96 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container-wide section-padding py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${project.title} | Portfolio Case Study | LUNEXO MEDIA`}
        description={project.description}
        url={`https://www.lunexomedia.com/portfolio/${id}`}
        image={project.image_url || "https://www.lunexomedia.com/og-image-new.jpg"}
        keywords={`${project.category}, portfolio, case study, ${project.title}, web design, digital marketing`}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container-wide section-padding">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
            </Button>
            <Badge className="mb-4">{project.category}</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{project.description}</p>
          </div>

          {/* Technologies Used */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
                  <Badge key={index} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Main Image */}
          {project.image_url && (
            <div className="aspect-video rounded-lg overflow-hidden mb-12">
              <img 
                src={project.image_url} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Project Content */}
      {project.content && (
        <section className="py-20 bg-muted/30">
          <div className="container-wide section-padding">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(project.content, {
                    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'img', 'blockquote', 'code', 'pre', 'br', 'hr'],
                    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                    ALLOW_DATA_ATTR: false
                  })
                }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project URL */}
      {project.project_url && (
        <section className="py-12 bg-white">
          <div className="container-wide section-padding text-center">
            <Button size="lg" asChild>
              <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                Visit Live Project
              </a>
            </Button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-wide section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your {project.category} Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how we can create similar results for your business.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/contact">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioItem;
