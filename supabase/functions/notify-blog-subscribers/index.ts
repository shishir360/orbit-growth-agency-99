import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

// Web Push helper
async function sendWebPush(subscription: any, payload: string) {
  const endpoint = subscription.endpoint
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'TTL': '86400'
      },
      body: payload
    })
    
    return response.ok
  } catch (error) {
    console.error('Push send error:', error)
    return false
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Verify authentication - only admins should notify blog subscribers
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const anonClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token)
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const { postTitle, postSlug } = await req.json()

    // Input validation
    if (!postTitle || typeof postTitle !== 'string' || postTitle.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Invalid postTitle' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    if (!postSlug || typeof postSlug !== 'string' || postSlug.length > 200 || !/^[a-z0-9\-]+$/.test(postSlug)) {
      return new Response(
        JSON.stringify({ error: 'Invalid postSlug' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all blog subscriber subscriptions (not admin)
    const { data: subscriptions, error } = await supabaseClient
      .from('push_subscriptions')
      .select('*')
      .eq('is_admin', false)

    if (error) {
      console.error('Error fetching subscriptions:', error)
      throw error
    }

    console.log(`Found ${subscriptions?.length || 0} blog subscribers`)

    const payload = JSON.stringify({
      title: '📝 নতুন ব্লগ পোস্ট!',
      body: postTitle,
      icon: '/app-icon.webp',
      badge: '/app-icon.webp',
      data: { 
        url: `https://www.lunexomedia.com/blog/${postSlug}`,
        type: 'blog-post'
      },
      tag: 'blog-notification',
      requireInteraction: true
    })

    // Send to all blog subscribers
    const sendPromises = subscriptions?.map(sub => 
      sendWebPush({
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth
        }
      }, payload)
    ) || []

    const results = await Promise.all(sendPromises)
    const successCount = results.filter(r => r).length

    console.log(`Sent ${successCount}/${results.length} blog notifications`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: successCount,
        total: results.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in notify-blog-subscribers:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
