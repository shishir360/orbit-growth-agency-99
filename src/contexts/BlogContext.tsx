import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  blocked: boolean;
  author: string;
  publishDate: string;
  updatedAt: string;
  image?: string;
  readTime?: string;
  category?: string;
  featured?: boolean;
}

interface BlogContextType {
  posts: BlogPost[];
  getPostBySlug: (slug: string) => BlogPost | undefined;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  addPost: (post: Omit<BlogPost, 'id' | 'updatedAt'>) => void;
  deletePost: (id: string) => void;
  getPublishedPosts: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [posts, setPosts] = useState<BlogPost[]>([]);

// Load published posts from backend on mount
useEffect(() => {
  const fetchPublished = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('blocked', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load blog posts:', error);
      return;
    }

    const mapped = (data || []).map((r: any) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt,
      content: r.content,
      published: r.published,
      blocked: r.blocked,
      author: r.author,
      publishDate: r.publish_date,
      updatedAt: r.updated_at || r.created_at,
      image: r.image_url || undefined,
      readTime: undefined,
      category: undefined,
      featured: false,
    }));

    setPosts(mapped);
    console.log('Loaded posts from backend:', mapped.length);
  };

  fetchPublished();
}, []);

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return posts.find(post => post.slug === slug);
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
        : post
    ));
  };

  const addPost = (newPost: Omit<BlogPost, 'id' | 'updatedAt'>) => {
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setPosts([...posts, post]);
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const getPublishedPosts = (): BlogPost[] => {
    return posts.filter(post => post.published && !post.blocked);
  };

  return (
    <BlogContext.Provider value={{
      posts,
      getPostBySlug,
      updatePost,
      addPost,
      deletePost,
      getPublishedPosts
    }}>
      {children}
    </BlogContext.Provider>
  );
};