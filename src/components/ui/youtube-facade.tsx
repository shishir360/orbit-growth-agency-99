import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  loop?: boolean;
  controls?: boolean;
  modestbranding?: boolean;
  mute?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({
  videoId,
  title,
  width = "100%",
  height = "315",
  autoplay = false,
  loop = false,
  controls = true,
  modestbranding = false,
  mute = false,
  loading = "lazy",
  className = ""
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    setIsLoaded(true);
  };

  if (isLoaded) {
    const params = new URLSearchParams();
    if (autoplay) params.append('autoplay', '1');
    if (loop) {
      params.append('loop', '1');
      params.append('playlist', videoId);
    }
    if (!controls) params.append('controls', '0');
    if (modestbranding) params.append('modestbranding', '1');
    if (mute) params.append('mute', '1');

    const src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

    return (
      <iframe
        width={width}
        height={height}
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={className}
      />
    );
  }

  return (
    <div 
      className={`relative cursor-pointer group ${className}`}
      style={{ width, height }}
      onClick={handleClick}
    >
      {/* YouTube thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        loading={loading}
        fetchPriority="high"
      />
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
        <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
      
      {/* YouTube logo overlay */}
      <div className="absolute bottom-4 right-4 opacity-80">
        <div className="bg-red-600 px-2 py-1 rounded text-white text-xs font-bold">
          YouTube
        </div>
      </div>
    </div>
  );
};