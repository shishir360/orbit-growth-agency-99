# Directive: WhatsApp Vapi/Call API Setup

## Objective
Configure and run a local Python webhook to receive WhatsApp `calls` events, enabling the system to only receive incoming calls, and setting the groundwork for an AI voice integration (e.g., Vapi.ai) or manual call receiving setups.

## Inputs
- WhatsApp Business Account Webhook JSON payload (specifically tracking `calls` fields and `terminate` / `ring` events).
- `WHATSAPP_VERIFY_TOKEN` and `VAPI_API_KEY` (or other related keys) loaded from `.env`.

## Outputs
- A Python FastAPI server in `scripts/whatsapp_call_webhook.py` that listens to `GET` and `POST` requests.
- `GET` handles WhatsApp webhook verification.
- `POST` handles incoming call events and logs them deterministically to `.tmp/whatsapp_calls.log`.

## Logic Flow
1. **Verification**: Respond to WhatsApp webhook verification challenges (`hub.mode`, `hub.verify_token`, `hub.challenge`).
2. **Payload Parsing**: Parse incoming JSON payloads for `entry` > `changes` > `value` > `calls`.
3. **Call Handling**: If a call event is detected (e.g., `terminate`, `ring`, `answered`), log the details (From, To, Status, Timestamp).
4. **Vapi Integration Stub**: Prepare the logic where, upon receiving a call, the system can hand off the call session to Vapi AI if configured.

## Known Risks and Constraints
- Webhook endpoints must be publicly accessible (e.g., via ngrok) for WhatsApp to reach them.
- WhatsApp API requires HTTPS.
- Do not print raw output directly; write all structured logs to `.tmp/` directories to remain deterministic and maintain state.

## Rules
- Code must be deterministic and robust.
- Secrets must be fetched from `.env`.
- No side effects outside of the `.tmp` logging until specifically requested.
