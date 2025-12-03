import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconName?: string; // Add this for 3D icon
  href: string;
  image?: string;
}

const ServiceCard = ({ title, description, icon, iconName, href, image }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        <div className="flex items-start space-x-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-tight">{title}</h3>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-col gap-2 sm:gap-3">
          <Button asChild size="sm" className="w-full justify-center text-xs sm:text-sm">
            <a href="/contact" className="flex items-center">
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Order Now
            </a>
          </Button>
          
          <Button asChild variant="outline" size="sm" className="w-full justify-center text-xs sm:text-sm">
            <a href={href} className="flex items-center">
              Learn more
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
