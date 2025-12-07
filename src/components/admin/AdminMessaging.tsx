import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, MessageCircle, Phone, RefreshCw, Bot, User, Mic, 
  MousePointer, ArrowLeft, Calendar, CheckCircle2, Plus, Image, Search,
  Instagram, Facebook, Check, CheckCheck
} from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  activity_type: string;
  platform: 'whatsapp' | 'messenger' | 'instagram';
  metadata: {
    from?: string;
    to?: string;
    sender_id?: string;
    recipient_id?: string;
    name?: string;
    message?: string;
    original_message?: string;
    ai_response?: string;
    sent_successfully?: boolean;
    type?: string;
    timestamp?: string;
    is_voice?: boolean;
    was_voice_message?: boolean;
    is_image?: boolean;
    was_image_message?: boolean;
    image_analysis?: string;
    had_buttons?: boolean;
    is_ai_response?: boolean;
    is_admin_reply?: boolean;
    booking_created?: boolean;
    profile_pic?: string;
  };
  created_at: string;
}

const AdminMessaging = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'messenger' | 'instagram'>('whatsapp');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("visitor_activities")
        .select("*")
        .in("activity_type", [
          "whatsapp_message_received", 
          "whatsapp_message_sent",
          "messenger_message_received",
          "messenger_message_sent",
          "instagram_message_received",
          "instagram_message_sent"
        ])
        .order("created_at", { ascending: false })
        .limit(500);

      if (error) throw error;
      
      const processedMessages = (data || []).map(msg => ({
        ...msg,
        platform: msg.activity_type.includes('whatsapp') ? 'whatsapp' : 
                  msg.activity_type.includes('messenger') ? 'messenger' : 'instagram'
      })) as Message[];
      
      setMessages(processedMessages);
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel("all-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "visitor_activities",
        },
        (payload) => {
          const newMessage = payload.new as any;
          if (
            newMessage.activity_type.includes('message_received') ||
            newMessage.activity_type.includes('message_sent')
          ) {
            const platform = newMessage.activity_type.includes('whatsapp') ? 'whatsapp' : 
                            newMessage.activity_type.includes('messenger') ? 'messenger' : 'instagram';
            setMessages((prev) => [{ ...newMessage, platform } as Message, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
      const functionName = activeTab === 'whatsapp' ? 'send-whatsapp-message' : 
                          activeTab === 'messenger' ? 'send-messenger-message' : 'send-instagram-message';
      
      const response = await supabase.functions.invoke(functionName, {
        body: {
          to: selectedConversation,
          message: replyMessage,
          isAdminReply: true,
        },
      });

      if (response.error) throw response.error;

      toast({ title: "Message Sent" });
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

  const startNewConversation = async () => {
    if (!newPhoneNumber || !newMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter recipient and message",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const response = await supabase.functions.invoke("send-whatsapp-message", {
        body: {
          to: newPhoneNumber.replace(/[^\d]/g, ""),
          message: newMessage,
          isAdminReply: true,
        },
      });

      if (response.error) throw response.error;

      toast({ title: "Message Sent", description: `Message sent to ${newPhoneNumber}` });
      setShowNewChat(false);
      setNewPhoneNumber("");
      setNewMessage("");
      setSelectedConversation(newPhoneNumber.replace(/[^\d]/g, ""));
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

  // Filter messages by platform
  const platformMessages = messages.filter(m => m.platform === activeTab);

  // Group messages by sender/receiver (handle both WhatsApp and Messenger/Instagram formats)
  const groupedMessages = platformMessages.reduce((acc, msg) => {
    // WhatsApp uses 'from'/'to', Messenger/Instagram use 'sender_id'/'recipient_id'
    const id = msg.metadata?.from || msg.metadata?.to || 
               msg.metadata?.sender_id || msg.metadata?.recipient_id || "unknown";
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  // Filter conversations by search
  const filteredIds = Object.keys(groupedMessages).filter(id => {
    if (!searchTerm) return true;
    const msgs = groupedMessages[id];
    const name = msgs.find(m => m.metadata?.name)?.metadata?.name || "";
    return id.includes(searchTerm) || name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Sort by last message time
  const sortedIds = filteredIds.sort((a, b) => {
    const aTime = new Date(groupedMessages[a][0].created_at).getTime();
    const bTime = new Date(groupedMessages[b][0].created_at).getTime();
    return bTime - aTime;
  });

  const selectedMessages = selectedConversation
    ? (groupedMessages[selectedConversation] || []).slice().reverse()
    : [];

  const selectedContactName = selectedMessages.find(m => m.metadata?.name)?.metadata?.name || "Unknown";

  const getPlatformColor = () => {
    switch (activeTab) {
      case 'whatsapp': return 'bg-[#25D366]';
      case 'messenger': return 'bg-[#0084FF]';
      case 'instagram': return 'bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]';
    }
  };

  const getPlatformIcon = () => {
    switch (activeTab) {
      case 'whatsapp': return <MessageCircle className="h-5 w-5" />;
      case 'messenger': return <Facebook className="h-5 w-5" />;
      case 'instagram': return <Instagram className="h-5 w-5" />;
    }
  };

  const getPlatformName = () => {
    switch (activeTab) {
      case 'whatsapp': return 'WhatsApp';
      case 'messenger': return 'Messenger';
      case 'instagram': return 'Instagram';
    }
  };

  return (
    <div className="h-[calc(100vh-150px)] flex flex-col">
      {/* Platform Tabs */}
      <div className="mb-4">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as any); setSelectedConversation(null); }}>
          <div className="flex items-center justify-between">
            <TabsList className="h-12 p-1 bg-muted/50">
              <TabsTrigger 
                value="whatsapp" 
                className="h-10 px-4 data-[state=active]:bg-[#25D366] data-[state=active]:text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
                {messages.filter(m => m.platform === 'whatsapp').length > 0 && (
                  <Badge className="ml-2 bg-white/20 text-current">
                    {Object.keys(groupedMessages).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="messenger" 
                className="h-10 px-4 data-[state=active]:bg-[#0084FF] data-[state=active]:text-white"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Messenger
              </TabsTrigger>
              <TabsTrigger 
                value="instagram" 
                className="h-10 px-4 data-[state=active]:bg-gradient-to-tr data-[state=active]:from-[#833AB4] data-[state=active]:via-[#FD1D1D] data-[state=active]:to-[#FCAF45] data-[state=active]:text-white"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              {activeTab === 'whatsapp' && (
                <Dialog open={showNewChat} onOpenChange={setShowNewChat}>
                  <DialogTrigger asChild>
                    <Button className={`${getPlatformColor()} hover:opacity-90 text-white`}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Chat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-[#25D366]" />
                        New WhatsApp Chat
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">
                          Phone Number (with country code)
                        </label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="8801XXXXXXXXX"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNewMessage("Hi! This is Farhan from Lunexo Media. How can I help you today? 😊")}
                        >
                          Hello
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNewMessage("Hi! Following up on our conversation. Ready to discuss further?")}
                        >
                          Follow-up
                        </Button>
                      </div>
                      <Button
                        onClick={startNewConversation}
                        disabled={sending || !newPhoneNumber || !newMessage}
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                      >
                        {sending ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        Send Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button onClick={fetchMessages} variant="outline" size="icon">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Main Chat Interface - WhatsApp Style */}
      <div className="flex-1 flex overflow-hidden rounded-xl border bg-[#0B141A] shadow-xl">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-[350px] border-r border-[#222D34] bg-[#111B21]`}>
          {/* Search Header */}
          <div className="p-3 bg-[#202C33]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8696A0]" />
              <Input
                placeholder="Search or start new chat"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#2A3942] border-0 text-white placeholder:text-[#8696A0] focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Conversations */}
          <ScrollArea className="flex-1">
            {loading ? (
              <div className="p-8 text-center text-[#8696A0]">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
                Loading conversations...
              </div>
            ) : sortedIds.length === 0 ? (
              <div className="p-8 text-center">
                {getPlatformIcon()}
                <p className="text-[#8696A0] mt-4">No conversations yet</p>
                {activeTab !== 'whatsapp' && (
                  <p className="text-[#8696A0] text-sm mt-2">
                    Send a message to your {activeTab === 'messenger' ? 'Facebook Page' : 'Instagram'} to start
                  </p>
                )}
              </div>
            ) : (
              sortedIds.map((id) => {
                const msgs = groupedMessages[id];
                const lastMsg = msgs[0];
                const contactName = msgs.find(m => m.metadata?.name)?.metadata?.name || id;
                const hasBooking = msgs.some(m => m.metadata?.booking_created);
                const isUnread = msgs.some(m => 
                  m.activity_type.includes('received') && 
                  new Date(m.created_at) > new Date(Date.now() - 3600000)
                );

                return (
                  <div
                    key={id}
                    onClick={() => setSelectedConversation(id)}
                    className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors hover:bg-[#2A3942] ${
                      selectedConversation === id ? 'bg-[#2A3942]' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`relative w-12 h-12 rounded-full ${getPlatformColor()} flex items-center justify-center text-white font-semibold text-lg`}>
                      {contactName.charAt(0).toUpperCase()}
                      {isUnread && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center text-xs">
                          {msgs.filter(m => m.activity_type.includes('received')).length}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 border-b border-[#222D34] pb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium truncate">{contactName}</span>
                        <span className={`text-xs ${isUnread ? 'text-[#25D366]' : 'text-[#8696A0]'}`}>
                          {format(new Date(lastMsg.created_at), "h:mm a")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lastMsg.activity_type.includes('sent') && (
                          <CheckCheck className="h-4 w-4 text-[#53BDEB] flex-shrink-0" />
                        )}
                        <p className="text-sm text-[#8696A0] truncate">
                          {lastMsg.metadata?.is_image ? "📷 Photo" : 
                           lastMsg.metadata?.is_voice ? "🎤 Voice message" :
                           lastMsg.activity_type.includes('received')
                            ? lastMsg.metadata?.message
                            : lastMsg.metadata?.ai_response || lastMsg.metadata?.message}
                        </p>
                        {hasBooking && <Calendar className="h-4 w-4 text-[#25D366] flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-col flex-1 bg-[#0B141A]`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-4 py-2 bg-[#202C33]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-[#AEBAC1] hover:bg-[#2A3942]"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className={`w-10 h-10 rounded-full ${getPlatformColor()} flex items-center justify-center text-white font-semibold`}>
                  {selectedContactName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{selectedContactName}</h3>
                  <p className="text-xs text-[#8696A0]">{selectedConversation}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyMessage(`📅 *Book Your Free Discovery Call*\n\nReady to grow your business? Let's schedule a call!\n\nPlease provide:\n1️⃣ Your full name\n2️⃣ Your email address\n3️⃣ Preferred date & time\n4️⃣ Which service interests you?\n\nI'll confirm your booking right away! 🚀`)}
                  className="text-[#AEBAC1] hover:bg-[#2A3942]"
                >
                  <Calendar className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea 
                className="flex-1 px-4 py-2" 
                style={{ 
                  backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182229' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                }}
              >
                <div className="space-y-2 py-2">
                  {selectedMessages.map((msg) => {
                    const isReceived = msg.activity_type.includes('received');
                    
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isReceived ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-3 py-2 shadow-md ${
                            isReceived
                              ? "bg-[#202C33] text-white rounded-tl-none"
                              : msg.metadata?.is_admin_reply
                              ? "bg-[#005C4B] text-white rounded-tr-none"
                              : "bg-[#005C4B] text-white rounded-tr-none"
                          }`}
                        >
                          {/* Sender indicator */}
                          {!isReceived && (
                            <div className="flex items-center gap-1 mb-1">
                              {msg.metadata?.is_admin_reply ? (
                                <CheckCircle2 className="h-3 w-3 text-[#53BDEB]" />
                              ) : (
                                <Bot className="h-3 w-3 text-[#53BDEB]" />
                              )}
                              <span className="text-xs text-[#8696A0]">
                                {msg.metadata?.is_admin_reply ? 'You' : 'Farhan AI'}
                              </span>
                            </div>
                          )}

                          {isReceived && (msg.metadata?.is_voice || msg.metadata?.is_image) && (
                            <div className="flex items-center gap-1 mb-1">
                              {msg.metadata?.is_voice && <Mic className="h-3 w-3 text-[#8696A0]" />}
                              {msg.metadata?.is_image && <Image className="h-3 w-3 text-[#8696A0]" />}
                              <span className="text-xs text-[#8696A0]">
                                {msg.metadata?.is_voice ? 'Voice message' : 'Photo'}
                              </span>
                            </div>
                          )}

                          {/* Message content */}
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {isReceived
                              ? msg.metadata?.message
                              : msg.metadata?.ai_response || msg.metadata?.message}
                          </p>

                          {/* Image analysis */}
                          {msg.metadata?.image_analysis && (
                            <div className="mt-2 p-2 bg-black/20 rounded text-xs text-[#8696A0]">
                              🔍 {msg.metadata.image_analysis.substring(0, 150)}...
                            </div>
                          )}

                          {/* Quick reply buttons indicator */}
                          {msg.metadata?.had_buttons && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className="text-xs text-[#8696A0] flex items-center gap-1">
                                <MousePointer className="h-3 w-3" />
                                Quick replies sent
                              </span>
                            </div>
                          )}

                          {/* Booking badge */}
                          {msg.metadata?.booking_created && (
                            <Badge className="mt-2 bg-[#25D366]/20 text-[#25D366] border-0">
                              ✅ Booking Created
                            </Badge>
                          )}

                          {/* Time and status */}
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[10px] text-[#8696A0]">
                              {format(new Date(msg.created_at), "h:mm a")}
                            </span>
                            {!isReceived && (
                              <CheckCheck className="h-3 w-3 text-[#53BDEB]" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-3 bg-[#202C33]">
                <div className="flex items-end gap-2">
                  <Textarea
                    placeholder="Type a message"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="min-h-[44px] max-h-32 resize-none bg-[#2A3942] border-0 text-white placeholder:text-[#8696A0] focus-visible:ring-0 rounded-lg"
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
                    size="icon"
                    className={`h-11 w-11 rounded-full ${getPlatformColor()} hover:opacity-90`}
                  >
                    {sending ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                {/* Quick replies */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#8696A0] hover:text-white hover:bg-[#2A3942] border border-[#2A3942]"
                    onClick={() => setReplyMessage("Thanks for reaching out! How can I help you today? 😊")}
                  >
                    👋 Hello
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#8696A0] hover:text-white hover:bg-[#2A3942] border border-[#2A3942]"
                    onClick={() => setReplyMessage("I'll check on this and get back to you shortly!")}
                  >
                    ⏳ Follow Up
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#8696A0] hover:text-white hover:bg-[#2A3942] border border-[#2A3942]"
                    onClick={() => setReplyMessage("Our pricing varies based on your needs:\n💻 Website Design: $500-$5000\n🔍 SEO: $300-$1500/mo\n📈 Ads: $400-$2000/mo\n🤖 AI Automation: $500-$2000\n\nWant to discuss what's best for you?")}
                  >
                    💰 Pricing
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#8696A0] hover:text-white hover:bg-[#2A3942] border border-[#2A3942]"
                    onClick={() => setReplyMessage("Visit our website for more info: www.lunexomedia.com")}
                  >
                    🌐 Website
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#222E35]">
              <div className="text-center p-8">
                <div className={`w-20 h-20 rounded-full ${getPlatformColor()} flex items-center justify-center mx-auto mb-6`}>
                  {getPlatformIcon()}
                </div>
                <h3 className="text-xl font-light text-[#D1D7DB] mb-2">
                  {getPlatformName()} Web
                </h3>
                <p className="text-sm text-[#8696A0] max-w-md">
                  {activeTab === 'whatsapp' 
                    ? 'Select a conversation to view messages and reply to customers'
                    : `${getPlatformName()} integration coming soon. Connect your ${getPlatformName()} to start receiving messages.`
                  }
                </p>
                {activeTab === 'whatsapp' && (
                  <Button 
                    onClick={() => setShowNewChat(true)} 
                    className="mt-6 bg-[#25D366] hover:bg-[#128C7E] text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Chat
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessaging;
