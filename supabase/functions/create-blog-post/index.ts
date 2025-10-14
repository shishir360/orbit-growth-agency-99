import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    console.log('Received blog post data:', body);

    // Validate required fields
    if (!body.title || !body.slug || !body.excerpt || !body.content) {
      throw new Error('Missing required fields: title, slug, excerpt, content');
    }

    // Prepare blog post data
    const blogPostData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      image_url: body.image_url || null,
      published: body.published ?? true,
      blocked: body.blocked ?? false,
      author: body.author || 'Admin',
      publish_date: body.publish_date || new Date().toISOString().split('T')[0],
    };

    console.log('Inserting blog post:', blogPostData);

    // Insert blog post
    const { data, error } = await supabaseClient
      .from('blog_posts')
      .insert([blogPostData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Blog post created successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        message: 'Blog post created successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error creating blog post:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});