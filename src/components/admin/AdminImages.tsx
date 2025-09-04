import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload, Trash2, Download, Eye, Search } from 'lucide-react';

interface ImageFile {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
  usedIn: string[];
}

const AdminImages = () => {
  const [images, setImages] = useState<ImageFile[]>([
    {
      id: '1',
      name: 'hero-banner.jpg',
      url: '/placeholder.svg',
      size: '2.4 MB',
      type: 'image/jpeg',
      uploadedAt: '2024-01-15',
      usedIn: ['Homepage', 'About Page']
    },
    {
      id: '2',
      name: 'service-icon-1.png',
      url: '/placeholder.svg',
      size: '156 KB',
      type: 'image/png',
      uploadedAt: '2024-01-16',
      usedIn: ['Services Page']
    },
    {
      id: '3',
      name: 'team-photo.jpg',
      url: '/placeholder.svg',
      size: '1.8 MB',
      type: 'image/jpeg',
      uploadedAt: '2024-01-17',
      usedIn: ['About Page']
    },
    {
      id: '4',
      name: 'blog-thumbnail.jpg',
      url: '/placeholder.svg',
      size: '890 KB',
      type: 'image/jpeg',
      uploadedAt: '2024-01-18',
      usedIn: ['Blog Post']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };

  const handlePreview = (image: ImageFile) => {
    setSelectedImage(image);
    setIsPreviewDialogOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newImage: ImageFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type,
          uploadedAt: new Date().toISOString().split('T')[0],
          usedIn: []
        };
        setImages(prev => [...prev, newImage]);
      });
    }
    setIsUploadDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Management</h1>
          <p className="text-gray-600 mt-2">Upload and manage your website images</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Images</DialogTitle>
              <DialogDescription>
                Select one or more images to upload to your media library
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="file-upload">Choose Files</Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: JPG, PNG, GIF, WebP. Max size: 10MB per file.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-gray-600">
          {filteredImages.length} of {images.length} images
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-square bg-gray-100 relative group">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handlePreview(image)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    asChild
                  >
                    <a href={image.url} download={image.name}>
                      <Download className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm truncate" title={image.name}>
                  {image.name}
                </h3>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{image.size}</span>
                  <span>{image.uploadedAt}</span>
                </div>
                {image.usedIn.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {image.usedIn.map((usage, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {usage}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Filename:</span> {selectedImage.name}
                </div>
                <div>
                  <span className="font-medium">Size:</span> {selectedImage.size}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {selectedImage.type}
                </div>
                <div>
                  <span className="font-medium">Uploaded:</span> {selectedImage.uploadedAt}
                </div>
              </div>
              {selectedImage.usedIn.length > 0 && (
                <div>
                  <span className="font-medium">Used in:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedImage.usedIn.map((usage, index) => (
                      <Badge key={index} variant="outline">
                        {usage}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button asChild>
              <a href={selectedImage?.url} download={selectedImage?.name}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {filteredImages.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No images found' : 'No images uploaded'}
            </h3>
            <p className="text-gray-500 text-center mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Upload your first image to get started'
              }
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsUploadDialogOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminImages;