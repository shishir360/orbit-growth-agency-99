import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Play, User } from 'lucide-react';
import { YouTubeFacade } from './youtube-facade';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoReview {
  id: string;
  title: string;
  description: string | null;
  video_type: string;
  youtube_video_id: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  client_name: string | null;
  client_company: string | null;
}

interface VideoReviewsCarouselProps {
  showOnHomepage?: boolean;
  projectId?: string;
}

const VideoReviewsCarousel: React.FC<VideoReviewsCarouselProps> = ({ 
  showOnHomepage = true,
  projectId 
}) => {
  const [videos, setVideos] = useState<VideoReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoReview | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let query = supabase
          .from('video_reviews')
          .select('id, title, description, video_type, youtube_video_id, video_url, thumbnail_url, client_name, client_company')
          .eq('visible', true)
          .order('display_order', { ascending: true });

        if (projectId) {
          query = query.eq('portfolio_project_id', projectId);
        } else if (showOnHomepage) {
          query = query.eq('show_on_homepage', true);
        } else {
          // For reviews page, show videos marked for reviews
          query = query.eq('show_on_reviews', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        setVideos(data || []);
      } catch (err) {
        console.error('Error fetching video reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [showOnHomepage, projectId]);

  if (loading || videos.length === 0) return null;

  const getThumbnail = (video: VideoReview) => {
    if (video.thumbnail_url) return video.thumbnail_url;
    if (video.video_type === 'youtube' && video.youtube_video_id) {
      return `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`;
    }
    return null;
  };

  // Duplicate for infinite scroll effect
  const duplicatedVideos = [...videos, ...videos, ...videos];

  return (
    <>
      <section className="py-16 md:py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-emerald-500/10 text-emerald-400 rounded-full">
              Video Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Real Results, Real Stories
            </h2>
            <p className="text-white/60 text-lg">
              Watch what our clients have to say about working with us
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Left gradient mask */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          
          {/* Right gradient mask */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -100 * videos.length + '%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: videos.length * 10,
                ease: 'linear',
              },
            }}
          >
            {duplicatedVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                onClick={() => setSelectedVideo(video)}
                className="group flex-shrink-0 w-[320px] md:w-[420px] cursor-pointer"
              >
                <motion.div
                  className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video overflow-hidden relative">
                    {getThumbnail(video) ? (
                      <img
                        src={getThumbnail(video)!}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/30" />
                      </div>
                    )}
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <div className="bg-emerald-500 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-emerald-500/30">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Info section */}
                  <div className="p-4 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0">
                    <h3 className="font-semibold text-white truncate">{video.title}</h3>
                    {video.client_name && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white/90">{video.client_name}</p>
                          {video.client_company && (
                            <p className="text-xs text-white/50">{video.client_company}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-white/10">
          {selectedVideo && (
            <div className="aspect-video">
              {selectedVideo.video_type === 'youtube' && selectedVideo.youtube_video_id ? (
                <YouTubeFacade
                  videoId={selectedVideo.youtube_video_id}
                  title={selectedVideo.title}
                  width="100%"
                  height="100%"
                  autoplay
                  className="w-full h-full"
                />
              ) : selectedVideo.video_url ? (
                <video
                  src={selectedVideo.video_url}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              ) : null}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoReviewsCarousel;
