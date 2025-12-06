import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageCircle, Phone, RefreshCw, Bot, User, Mic, MousePointer } from "lucide-react";
import { format } from "date-fns";

interface WhatsAppMessage {
  id: string;
  activity_type: string;
  metadata: {
    from?: string;
    to?: string;
    name?: string;
    message?: string;
    original_message?: string;
    ai_response?: string;
    sent_successfully?: boolean;
    type?: string;
    timestamp?: string;
    is_voice?: boolean;
    was_voice_message?: boolean;
    had_buttons?: boolean;
  };
  created_at: string;
}

const AdminWhatsApp = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageText, setMessageText] = useState("");
  const [includeButtons, setIncludeButtons] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("visitor_activities")
        .select("*")
        .in("activity_type", ["whatsapp_message_received", "whatsapp_message_sent"])
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setMessages((data as WhatsAppMessage[]) || []);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch WhatsApp messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("whatsapp-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "visitor_activities",
          filter: "activity_type=in.(whatsapp_message_received,whatsapp_message_sent)",
        },
        (payload) => {
          setMessages((prev) => [payload.new as WhatsAppMessage, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!phoneNumber || !messageText) {
      toast({
        title: "Error",
        description: "Please enter phone number and message",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const body: any = {
        to: phoneNumber,
        message: messageText,
      };

      // Add quick reply buttons if enabled
      if (includeButtons) {
        body.buttons = [
          { id: "book_call", title: "📞 Book a Call" },
          { id: "view_services", title: "🚀 View Services" },
          { id: "get_pricing", title: "💰 Get Pricing" },
        ];
      }

      const response = await supabase.functions.invoke("send-whatsapp-message", {
        body,
      });

      if (response.error) throw response.error;

      toast({
        title: "Message Sent",
        description: includeButtons 
          ? "WhatsApp message sent with quick reply buttons" 
          : "WhatsApp message sent successfully",
      });

      setMessageText("");
      fetchMessages();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // Group messages by phone number
  const groupedMessages = messages.reduce((acc, msg) => {
    const phone = msg.metadata?.from || msg.metadata?.to || "unknown";
    if (!acc[phone]) {
      acc[phone] = [];
    }
    acc[phone].push(msg);
    return acc;
  }, {} as Record<string, WhatsAppMessage[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-green-500" />
            WhatsApp AI Agent
          </h2>
          <p className="text-muted-foreground">
            Send messages and view Farhan AI conversations
          </p>
        </div>
        <Button onClick={fetchMessages} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Send Message Card */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Send className="h-5 w-5 text-green-500" />
            Send WhatsApp Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">
                Phone Number (with country code)
              </label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="8801XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Message
            </label>
            <Textarea
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-buttons"
              checked={includeButtons}
              onCheckedChange={(checked) => setIncludeButtons(checked === true)}
            />
            <label
              htmlFor="include-buttons"
              className="text-sm text-muted-foreground cursor-pointer flex items-center gap-2"
            >
              <MousePointer className="h-4 w-4" />
              Include Quick Reply Buttons (Book a Call, View Services, Get Pricing)
            </label>
          </div>
          <Button
            onClick={sendMessage}
            disabled={sending || !phoneNumber || !messageText}
            className="bg-green-600 hover:bg-green-700"
          >
            {sending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Conversations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Conversations</h3>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading messages...
          </div>
        ) : Object.keys(groupedMessages).length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No WhatsApp conversations yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              When users message your WhatsApp Business number, conversations will appear here
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {Object.entries(groupedMessages).map(([phone, msgs]) => (
              <Card key={phone} className="overflow-hidden">
                <CardHeader className="bg-muted/50 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-500" />
                      <span className="font-mono text-sm">{phone}</span>
                      {msgs[0]?.metadata?.name && (
                        <Badge variant="secondary">{msgs[0].metadata.name}</Badge>
                      )}
                    </div>
                    <Badge variant="outline">{msgs.length} messages</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {msgs
                    .slice()
                    .reverse()
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.activity_type === "whatsapp_message_received"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.activity_type === "whatsapp_message_received"
                              ? "bg-muted"
                              : "bg-green-600 text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {msg.activity_type === "whatsapp_message_received" ? (
                              <>
                                <User className="h-3 w-3" />
                                {msg.metadata?.is_voice && (
                                  <Mic className="h-3 w-3 text-blue-400" />
                                )}
                              </>
                            ) : (
                              <>
                                <Bot className="h-3 w-3" />
                                {msg.metadata?.had_buttons && (
                                  <MousePointer className="h-3 w-3 opacity-70" />
                                )}
                              </>
                            )}
                            <span className="text-xs opacity-70">
                              {msg.activity_type === "whatsapp_message_received"
                                ? msg.metadata?.is_voice 
                                  ? "Customer (Voice)" 
                                  : "Customer"
                                : "Farhan AI"}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">
                            {msg.activity_type === "whatsapp_message_received"
                              ? msg.metadata?.message
                              : msg.metadata?.ai_response || msg.metadata?.message}
                          </p>
                          {msg.metadata?.had_buttons && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="secondary" className="text-xs">📞 Book a Call</Badge>
                              <Badge variant="secondary" className="text-xs">🚀 Services</Badge>
                              <Badge variant="secondary" className="text-xs">💰 Pricing</Badge>
                            </div>
                          )}
                          <p className="text-xs opacity-50 mt-1">
                            {format(new Date(msg.created_at), "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWhatsApp;
