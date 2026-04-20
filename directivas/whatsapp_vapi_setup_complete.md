# WhatsApp VAPI Setup - Complete

## Current Status

### Running Services
- **Webhook Server**: Running on `http://localhost:8000`
- **Public Tunnel**: `https://chilly-lions-enter.loca.lt`

### Environment Variables (`.env`)
```
WHATSAPP_VERIFY_TOKEN="lunexo_verify_123"
VAPI_API_KEY=""
```

## Next Steps: Configure WhatsApp Webhook

### 1. Meta Developer Dashboard Setup

1. Go to https://developers.facebook.com/apps/
2. Select your WhatsApp Business App
3. Navigate to **WhatsApp > Configuration**
4. Set the webhook URL:
   - **Callback URL**: `https://ten-parrots-peel.loca.lt/webhook`
   - **Verify Token**: `lunexo_verify_123`
5. Click **Verify and Save**
6. Subscribe to these fields: `calls`

### 2. Test the Webhook

The webhook will log all incoming events to:
```
.tmp/whatsapp_calls.log
```

### 3. Vapi AI Integration (Optional)

To enable AI voice handling:

1. Get your API key from https://dashboard.vapi.ai
2. Add it to `.env`:
   ```
   VAPI_API_KEY="your_vapi_api_key_here"
   ```
3. Update `scripts/whatsapp_call_webhook.py` to implement the Vapi handoff logic in the `ring` event section.

## Important Notes

- **Localtunnel URL may change** each time you restart the tunnel. If the webhook stops working, get the new URL and update it in Meta Dashboard.
- Keep the webhook server running in the background to receive calls.
- All call events are logged to `.tmp/whatsapp_calls.log` for debugging.

## Files Created

- `scripts/whatsapp_call_webhook.py` - FastAPI webhook server
- `.tmp/whatsapp_calls.log` - Event log file
- `.env` - Updated with `WHATSAPP_VERIFY_TOKEN` and `VAPI_API_KEY`
