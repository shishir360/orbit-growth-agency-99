import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Trash2, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  visible: boolean;
  source: string;
  created_at: string;
  updated_at: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
      return;
    }

    setReviews(data || []);
  };

  const toggleVisibility = async (review: Review) => {
    const { error } = await supabase
      .from('reviews')
      .update({ visible: !review.visible })
      .eq('id', review.id);

    if (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
      return;
    }

    toast.success(review.visible ? 'Review hidden' : 'Review visible');
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
      return;
    }

    toast.success('Review deleted successfully');
    fetchReviews();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      website: 'bg-blue-100 text-blue-800',
      google: 'bg-green-100 text-green-800',
      facebook: 'bg-purple-100 text-purple-800'
    };
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews & Feedback</h1>
          <p className="text-gray-600 mt-2">Manage customer reviews and testimonials</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{reviews.length} Total</Badge>
          <Badge variant="default">{reviews.filter(r => r.visible).length} Published</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{reviews.length}</p>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <div>
                <p className="text-2xl font-bold">{avgRating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{reviews.filter(r => r.visible).length}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>
            Manage and moderate customer reviews from all sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} />
                      <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.email}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500 ml-2">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getSourceBadge(review.source)}>
                      {review.source}
                    </Badge>
                    <Badge variant={review.visible ? "default" : "secondary"}>
                      {review.visible ? 'Published' : 'Hidden'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{review.comment}</p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleVisibility(review)}
                  >
                    {review.visible ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-1" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-1" />
                        Show
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteReview(review.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No reviews yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReviews;
