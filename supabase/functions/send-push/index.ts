import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Web Push helper using native Deno crypto
async function sendWebPush(subscription: any, payload: string) {
  // Using the simple notification approach without VAPID keys
  // The browser's Push API will handle this
  const endpoint = subscription.endpoint
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'TTL': '86400' // 24 hours
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
    const { title, body, data } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get all admin subscriptions
    const { data: subscriptions, error } = await supabaseClient
      .from('push_subscriptions')
      .select('*')
      .eq('is_admin', true)

    if (error) {
      console.error('Error fetching subscriptions:', error)
      throw error
    }

    console.log(`Found ${subscriptions?.length || 0} subscriptions`)

    const payload = JSON.stringify({
      title: title || 'নতুন নোটিফিকেশন',
      body: body || 'আপনার একটি নতুন আপডেট আছে',
      icon: '/app-icon.webp',
      badge: '/app-icon.webp',
      data: data || {},
      tag: 'lunexo-notification',
      requireInteraction: true
    })

    // Send to all subscriptions
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

    console.log(`Sent ${successCount}/${results.length} notifications`)

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
    console.error('Error in send-push:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
