import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
  siteName?: string;
  locale?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: any | any[];
}

const SEO: React.FC<SEOProps> = ({
  title = "LUNEXO MEDIA | Digital Services Agency",
  description = "Launch faster, grow smarter. Lunexo Media helps you scale with SEO, paid ads, web design, and AI automations — everything your business needs to thrive.",
  image = "https://www.lunexomedia.com/og-image-new.jpg",
  url = "https://www.lunexomedia.com",
  type = "website",
  keywords = "website design, digital marketing, SEO, Google ads, Facebook ads, AI automation, web development",
  author = "Lunexo Media",
  siteName = "LUNEXO MEDIA",
  locale = "en_US",
  article,
  structuredData: customStructuredData
}) => {
  // Ensure absolute URL for image
  const absoluteImageUrl = image?.startsWith('http') ? image : `https://www.lunexomedia.com${image}`;
  
  // Generate structured data based on content type
  const structuredData = customStructuredData || (type === 'article' && article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": absoluteImageUrl,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://www.lunexomedia.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LUNEXO MEDIA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.lunexomedia.com/favicon.png"
      }
    },
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": article.section,
    "keywords": article.tags?.join(', ')
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": "https://www.lunexomedia.com",
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "LUNEXO MEDIA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.lunexomedia.com/favicon.png"
      }
    }
  });
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Article specific tags */}
      {article && type === 'article' && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lunexomedia" />
      <meta name="twitter:creator" content="@lunexomedia" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      {Array.isArray(structuredData) ? (
        structuredData.map((sd: any, i: number) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(sd)}
          </script>
        ))
      ) : (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;