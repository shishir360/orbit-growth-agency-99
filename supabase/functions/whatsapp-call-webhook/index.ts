import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const requestBody = await req.json();
    console.log("=== WhatsApp Inbound Call Webhook ===");
    console.log(JSON.stringify(requestBody, null, 2));

    const calls = requestBody.entry?.[0]?.changes?.[0]?.value?.calls || [];

    if (!calls.length) {
      return new Response(
        JSON.stringify({ status: "ok", message: "No calls found" }),
        { status: 200, headers: corsHeaders }
      );
    }

    for (const call of calls) {
      const callId = call.id;
      const fromNumber = call.from;
      const toNumber = call.to;
      const callStatus = call.status;
      const callEvent = call.event;

      console.log(`Call ${callId}: ${callEvent} - ${fromNumber} -> ${toNumber}`);

      const { data: savedCall, error: dbError } = await supabaseClient
        .from("whatsapp_calls")
        .insert({
          call_id: callId,
          from_number: fromNumber,
          to_number: toNumber,
          status: callStatus,
          event: callEvent,
          metadata: call
        })
        .select()
        .single();

      if (dbError) {
        console.error("DB error:", dbError);
      }

      if (callEvent === "ring") {
        console.log("🔔 Incoming call - connecting to VAPI AI...");

        const VAPI_API_KEY = Deno.env.get("VAPI_API_KEY");
        const VAPI_WORKFLOW_ID = Deno.env.get("VAPI_WORKFLOW_ID");

        if (VAPI_API_KEY && VAPI_WORKFLOW_ID) {
          try {
            const vapiResponse = await fetch("https://api.vapi.ai/call", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${VAPI_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                workflowId: VAPI_WORKFLOW_ID,
                customer: { number: fromNumber },
                metadata: {
                  whatsapp_call_id: callId,
                  direction: "inbound_whatsapp",
                }
              }),
            });

            const vapiData = await vapiResponse.json();
            console.log("VAPI initiated:", vapiData);

            if (vapiData.id && savedCall) {
              await supabaseClient
                .from("whatsapp_calls")
                .update({
                  vapi_call_id: vapiData.id,
                  vapi_status: "connected"
                })
                .eq("id", savedCall.id);
            }
          } catch (vapiError) {
            console.error("VAPI error:", vapiError);
          }
        } else {
          console.log("⚠️ Set VAPI_API_KEY and VAPI_WORKFLOW_ID in secrets");
        }
      }

      if (savedCall) {
        const updates: any = {};
        if (callEvent === "accepted" || callStatus === "accepted") updates.accepted_at = new Date().toISOString();
        if (callEvent === "connected" || callStatus === "connected") updates.connected_at = new Date().toISOString();
        if (callEvent === "completed" || callStatus === "completed") {
          updates.completed_at = new Date().toISOString();
          updates.duration_seconds = call.duration_seconds || 0;
        }
        if (callEvent === "failed" || callStatus === "failed") {
          updates.failed_at = new Date().toISOString();
          updates.failure_reason = call.failure_reason || "unknown";
        }

        if (Object.keys(updates).length > 0) {
          await supabaseClient.from("whatsapp_calls").update(updates).eq("id", savedCall.id);
        }
      }
    }

    return new Response(
      JSON.stringify({ status: "ok", calls_processed: calls.length }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
};

serve(handler);
