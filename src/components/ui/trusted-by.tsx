import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

const TrustedBy = () => {
  const [api, setApi] = useState<any>();

  const logos = [
    { name: "TechCorp", width: "120" },
    { name: "StartupX", width: "100" },
    { name: "InnovateLab", width: "140" },
    { name: "GrowthCo", width: "110" },
    { name: "NextGen", width: "130" },
    { name: "DigitalFlow", width: "125" },
    { name: "CloudSync", width: "115" },
    { name: "DataMax", width: "105" },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500); // Auto-scroll every 2.5 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-muted/50 py-12">
      <div className="container-wide section-padding">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            Trusted by industry leaders
          </p>
        </div>
        
        <Carousel 
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {logos.map((logo, index) => (
              <CarouselItem key={logo.name} className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div className="flex items-center justify-center h-16">
                  <div
                    className="text-muted-foreground font-semibold text-lg opacity-60 hover:opacity-100 transition-opacity duration-300"
                    style={{ width: `${logo.width}px` }}
                  >
                    {logo.name}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TrustedBy;