import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbSEOProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

const BreadcrumbSEO: React.FC<BreadcrumbSEOProps> = ({ items, currentPage }) => {
  // Generate structured data for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.lunexomedia.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://www.lunexomedia.com${item.href}`
      })),
      {
        "@type": "ListItem",
        "position": items.length + 2,
        "name": currentPage
      }
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <li className="flex items-center gap-2">
            <Link 
              to="/" 
              className="hover:text-primary transition-colors flex items-center gap-1"
              aria-label="Go to homepage"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <Link 
                to={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
              <ChevronRight className="w-4 h-4" />
            </li>
          ))}
          
          <li className="text-foreground font-medium" aria-current="page">
            {currentPage}
          </li>
        </ol>
      </nav>
    </>
  );
};

export default BreadcrumbSEO;
