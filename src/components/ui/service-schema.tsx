import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
  url: string;
  image?: string;
}

const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  provider,
  areaServed,
  serviceType,
  url,
  image
}) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://www.lunexomedia.com",
      "logo": "https://www.lunexomedia.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-702-483-0749",
        "contactType": "customer support",
        "email": "hello@lunexomedia.com",
        "areaServed": areaServed,
        "availableLanguage": ["English"]
      }
    },
    "serviceType": serviceType,
    "areaServed": {
      "@type": "Place",
      "name": areaServed
    },
    "url": url,
    ...(image && { "image": image }),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${name} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": name
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

export default ServiceSchema;
