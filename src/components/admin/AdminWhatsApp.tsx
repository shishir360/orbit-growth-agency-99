import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, MessageCircle, Phone, RefreshCw, Bot, User, Mic, 
  MousePointer, ArrowLeft, Calendar, CheckCircle2 
} from "lucide-react";
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
    is_ai_response?: boolean;
    is_admin_reply?: boolean;
  };
  created_at: string;
}

const AdminWhatsApp = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("visitor_activities")
        .select("*")
        .in("activity_type", ["whatsapp_message_received", "whatsapp_message_sent"])
        .order("created_at", { ascending: false })
        .limit(200);

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
        },
        (payload) => {
          const newMessage = payload.new as WhatsAppMessage;
          if (
            newMessage.activity_type === "whatsapp_message_received" ||
            newMessage.activity_type === "whatsapp_message_sent"
          ) {
            setMessages((prev) => [newMessage, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when new message arrives in selected conversation
    if (selectedConversation) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedConversation]);

  const sendReply = async () => {
    if (!selectedConversation || !replyMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const response = await supabase.functions.invoke("send-whatsapp-message", {
        body: {
          to: selectedConversation,
          message: replyMessage,
          isAdminReply: true,
        },
      });

      if (response.error) throw response.error;

      toast({
        title: "Message Sent",
        description: "Your reply has been sent",
      });

      setReplyMessage("");
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

  const sendBookingTemplate = async () => {
    if (!selectedConversation) return;

    const bookingMessage = `📅 *Book Your Free Discovery Call*

Ready to grow your business? Let's schedule a call!

Please provide the following details:
1️⃣ Your preferred date
2️⃣ Your preferred time (with timezone)
3️⃣ Which service are you interested in?

Or book directly at: lunexomedia.com/contact

Looking forward to connecting! 🚀`;

    setReplyMessage(bookingMessage);
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

  // Get conversation for selected phone
  const selectedMessages = selectedConversation
    ? (groupedMessages[selectedConversation] || []).slice().reverse()
    : [];

  // Get contact name for selected conversation
  const selectedContactName = selectedMessages.find(m => m.metadata?.name)?.metadata?.name || "Unknown";

  // Get last message time for each conversation
  const getLastMessageTime = (phone: string) => {
    const msgs = groupedMessages[phone];
    if (msgs && msgs.length > 0) {
      return new Date(msgs[0].created_at);
    }
    return new Date(0);
  };

  // Sort conversations by last message time
  const sortedPhones = Object.keys(groupedMessages).sort((a, b) => {
    return getLastMessageTime(b).getTime() - getLastMessageTime(a).getTime();
  });

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-green-500" />
            WhatsApp Inbox
          </h2>
          <p className="text-muted-foreground">
            Chat with customers and view AI conversations
          </p>
        </div>
        <Button onClick={fetchMessages} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden md:block' : ''} col-span-12 md:col-span-4 border rounded-lg overflow-hidden bg-card`}>
          <div className="p-3 border-b bg-muted/50">
            <h3 className="font-semibold">Conversations</h3>
          </div>
          <ScrollArea className="h-[calc(100%-48px)]">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">
                Loading...
              </div>
            ) : sortedPhones.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {sortedPhones.map((phone) => {
                  const msgs = groupedMessages[phone];
                  const lastMsg = msgs[0];
                  const contactName = msgs.find(m => m.metadata?.name)?.metadata?.name || "Unknown";
                  const unreadCount = msgs.filter(m => 
                    m.activity_type === "whatsapp_message_received" && 
                    new Date(m.created_at) > new Date(Date.now() - 3600000)
                  ).length;

                  return (
                    <div
                      key={phone}
                      onClick={() => setSelectedConversation(phone)}
                      className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation === phone ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                          {contactName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{contactName}</span>
                            {unreadCount > 0 && (
                              <Badge className="bg-green-600">{unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-mono">{phone}</p>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {lastMsg.activity_type === "whatsapp_message_received"
                              ? lastMsg.metadata?.message
                              : lastMsg.metadata?.ai_response || lastMsg.metadata?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(lastMsg.created_at), "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className={`${selectedConversation ? '' : 'hidden md:flex'} col-span-12 md:col-span-8 border rounded-lg overflow-hidden bg-card flex flex-col`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b bg-muted/50 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                  {selectedContactName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedContactName}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{selectedConversation}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sendBookingTemplate}
                  className="hidden sm:flex"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Booking Template
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {selectedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.activity_type === "whatsapp_message_received"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          msg.activity_type === "whatsapp_message_received"
                            ? "bg-muted"
                            : msg.metadata?.is_admin_reply
                            ? "bg-blue-600 text-white"
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
                              <span className="text-xs opacity-70">
                                {msg.metadata?.is_voice ? "Voice" : "Customer"}
                              </span>
                            </>
                          ) : (
                            <>
                              {msg.metadata?.is_admin_reply ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3" />
                                  <span className="text-xs opacity-70">Admin</span>
                                </>
                              ) : (
                                <>
                                  <Bot className="h-3 w-3" />
                                  {msg.metadata?.had_buttons && (
                                    <MousePointer className="h-3 w-3 opacity-70" />
                                  )}
                                  <span className="text-xs opacity-70">Farhan AI</span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <p className="text-sm whitespace-pre-wrap">
                          {msg.activity_type === "whatsapp_message_received"
                            ? msg.metadata?.message
                            : msg.metadata?.ai_response || msg.metadata?.message}
                        </p>
                        {msg.metadata?.had_buttons && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs bg-white/20">📞 Book a Call</Badge>
                            <Badge variant="secondary" className="text-xs bg-white/20">🚀 Services</Badge>
                            <Badge variant="secondary" className="text-xs bg-white/20">💰 Pricing</Badge>
                          </div>
                        )}
                        <p className="text-xs opacity-50 mt-1">
                          {format(new Date(msg.created_at), "h:mm a")}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Reply Input */}
              <div className="p-3 border-t bg-muted/30">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="min-h-[44px] max-h-32 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendReply();
                      }
                    }}
                  />
                  <Button
                    onClick={sendReply}
                    disabled={sending || !replyMessage.trim()}
                    className="bg-green-600 hover:bg-green-700 h-auto"
                  >
                    {sending ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setReplyMessage("Thanks for reaching out! How can I help you today? 😊")}
                  >
                    Quick Hello
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setReplyMessage("I'll check on this and get back to you shortly!")}
                  >
                    Follow Up
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:hidden"
                    onClick={sendBookingTemplate}
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Book
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  Select a conversation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminWhatsApp;
