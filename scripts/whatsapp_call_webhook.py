import os
import json
import logging
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException, Query
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

WHATSAPP_VERIFY_TOKEN = os.getenv("WHATSAPP_VERIFY_TOKEN", "lunexo_verify_123")
VAPI_API_KEY = os.getenv("VAPI_API_KEY", "")

app = FastAPI()

# Ensure the temporary directory exists
TMP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".tmp")
os.makedirs(TMP_DIR, exist_ok=True)
LOG_FILE = os.path.join(TMP_DIR, "whatsapp_calls.log")

def log_event(event_data):
    """Deterministically logs events to .tmp/whatsapp_calls.log"""
    timestamp = datetime.now().isoformat()
    log_entry = {
        "timestamp": timestamp,
        "event": event_data
    }
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(log_entry) + "\n")

@app.get("/webhook")
async def verify_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token")
):
    """
    WhatsApp webhook verification endpoint.
    Facebook/Meta will send a GET request to verify the token.
    """
    if hub_mode == "subscribe" and hub_verify_token == WHATSAPP_VERIFY_TOKEN:
        return int(hub_challenge)
    raise HTTPException(status_code=403, detail="Verification failed")

@app.post("/webhook")
async def handle_webhook(request: Request):
    """
    Handle incoming POST requests from WhatsApp.
    Specifically parses `calls` events.
    """
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    # Log the raw payload for debugging
    log_event({"type": "raw_payload", "payload": body})

    # Parse specific call events based on standard WhatsApp payload
    if "entry" in body:
        for entry in body["entry"]:
            if "changes" in entry:
                for change in entry["changes"]:
                    value = change.get("value", {})
                    # Look for calls array in value
                    if "calls" in value:
                        for call in value["calls"]:
                            call_id = call.get("id")
                            from_phone = call.get("from")
                            to_phone = call.get("to")
                            call_status = call.get("status")
                            call_event = call.get("event")
                            
                            log_event({
                                "type": "call_event",
                                "id": call_id,
                                "from": from_phone,
                                "to": to_phone,
                                "status": call_status,
                                "event": call_event
                            })
                            
                            # VAPI Hand-off stub
                            if call_event == "ring":
                                # Logic to connect to Vapi AI would go here
                                log_event({"type": "vapi_handoff_stub", "message": f"Preparing to connect call {call_id} to VAPI"})
                            
    # Respond to WhatsApp to acknowledge receipt
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    # Run the webhook server locally
    # Note: Use ngrok or localtunnel to expose this port to the internet for WhatsApp testing
    uvicorn.run(app, host="0.0.0.0", port=8000)
