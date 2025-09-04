import { Button } from "./button";

interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  image?: string;
  imageAlt?: string;
  video?: string;
}

const HeroSection = ({ 
  badge,
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta, 
  image, 
  imageAlt,
  video 
}: HeroSectionProps) => {
  return (
    <section className="bg-white">
      <div className="container-wide section-padding py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {badge && (
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  {badge}
                </div>
              )}
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <a href={primaryCta.href}>
                  {primaryCta.text}
                </a>
              </Button>
              {secondaryCta && (
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <a href={secondaryCta.href}>
                    {secondaryCta.text}
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Media */}
          {(video || image) && (
            <div className="relative">
              {video ? (
                <iframe 
                  width="560" 
                  height="315" 
                  src={video} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full aspect-video rounded-lg shadow-lg"
                />
              ) : (
                <img
                  src={image}
                  alt={imageAlt || "Hero image"}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;