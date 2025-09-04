import { useState } from 'react';

interface SafeImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallbackSrc?: string;
  width?: string | number;
  height?: string | number;
  sizes?: string;
  srcSet?: string;
}

// A resilient image component with graceful fallback and lazy loading
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackSrc = '/placeholder.svg',
  width,
  height,
  sizes,
  srcSet,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src || undefined);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    if (!errored) {
      setErrored(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  // Generate responsive srcSet for Unsplash images
  const generateResponsiveSrc = (originalSrc: string) => {
    if (originalSrc && originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      return {
        srcSet: `
          ${baseUrl}?auto=format&fit=crop&w=400&q=80 400w,
          ${baseUrl}?auto=format&fit=crop&w=800&q=80 800w,
          ${baseUrl}?auto=format&fit=crop&w=1200&q=80 1200w
        `,
        sizes: sizes || '(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px'
      };
    }
    return { srcSet, sizes };
  };

  const { srcSet: responsiveSrcSet, sizes: responsiveSizes } = generateResponsiveSrc(currentSrc || '');

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      width={width}
      height={height}
      srcSet={responsiveSrcSet}
      sizes={responsiveSizes}
      onError={handleError}
    />
  );
};

export default SafeImage;
