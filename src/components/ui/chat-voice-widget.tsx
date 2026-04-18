import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, MessageCircle, X, Mic, MicOff, Loader2, Send, Sparkles, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Vapi from '@vapi-ai/web';
import { supabase } from '@/integrations/supabase/client';

const VAPI_ASSISTANT_ID = '9ec8940c-71aa-4b68-a750-c11a7a9f569c';
const VAPI_PUBLIC_KEY = '3572c083-2548-4b2b-bb37-d88f0d5dcef4';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type WidgetMode = 'closed' | 'select' | 'chat' | 'voice';

const QUICK_REPLIES = [
  "I need a website",
  "Run my Google/FB ads",
  "Build me an AI chatbot",
  "What's your pricing?",
];

const ChatVoiceWidget = () => {
  const [mode, setMode] = useState<WidgetMode>('closed');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize VAPI SDK
  useEffect(() => {
    try {
      const vapi = new Vapi(VAPI_PUBLIC_KEY);

      vapi.on('call-start', () => {
        setIsCallActive(true);
        setIsConnecting(false);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Hi! This is Farhan AI from Lunexo Media. How can I help you today?"
        }]);
      });

      vapi.on('call-end', () => {
        setIsCallActive(false);
        setIsConnecting(false);
        setIsMuted(false);
      });

      vapi.on('speech-start', () => setCurrentTranscript(''));
      vapi.on('speech-end', () => setCurrentTranscript(''));

      vapi.on('message', (message: any) => {
        if (message.type === 'transcript') {
          if (message.transcriptType === 'final') {
            if (message.role === 'user') {
              setMessages(prev => [...prev, { role: 'user', content: message.transcript }]);
            } else if (message.role === 'assistant') {
              setMessages(prev => [...prev, { role: 'assistant', content: message.transcript }]);
            }
            setCurrentTranscript('');
          } else {
            setCurrentTranscript(message.transcript);
          }
        }
      });

      vapi.on('error', (error: any) => {
        toast.error('Voice call error: ' + (error?.message || 'Unknown error'));
        setIsConnecting(false);
        setIsCallActive(false);
      });

      setVapiInstance(vapi);
      setSdkReady(true);
    } catch (err) {
      console.error('Error initializing VAPI:', err);
    }

    return () => {
      if (vapiInstance) vapiInstance.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatMessages, currentTranscript]);

  const startCall = async () => {
    if (!vapiInstance) {
      toast.error('Voice SDK not ready. Please try again.');
      return;
    }
    setIsConnecting(true);
    setMessages([]);
    const timeoutId = setTimeout(() => {
      if (isConnecting && !isCallActive) {
        vapiInstance.stop();
        setIsConnecting(false);
        toast.error('Connection timeout. Please try again.');
      }
    }, 30000);
    try {
      await vapiInstance.start(VAPI_ASSISTANT_ID);
      clearTimeout(timeoutId);
    } catch (error: any) {
      clearTimeout(timeoutId);
      toast.error('Failed to start call: ' + (error?.message || 'Please allow microphone access'));
      setIsConnecting(false);
    }
  };

  const endCall = () => { if (vapiInstance) vapiInstance.stop(); };
  const toggleMute = () => {
    if (vapiInstance && isCallActive) {
      vapiInstance.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const sendChatMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isChatLoading) return;
    const newMessages: Message[] = [...chatMessages, { role: 'user', content: userMessage }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: { messages: newMessages },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const reply = data?.reply ?? "Sorry, I didn't catch that. Could you try again?";
      setChatMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      console.error('chat-ai error:', err);
      toast.error(err?.message || 'Chat unavailable. Please try again.');
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble right now. Please book a free consultation at lunexomedia.com/contact and our team will reach out!"
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendChatMessage(chatInput);
  };

  const closeWidget = () => {
    if (isCallActive) endCall();
    setMode('closed');
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {mode === 'closed' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-[9999]"
          >
            <motion.button
              onClick={() => setMode('select')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-14 w-14 rounded-full bg-slate-900 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex items-center justify-center"
              aria-label="Open chat"
            >
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <MessageCircle className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Selection */}
      <AnimatePresence>
        {mode === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] w-[340px] max-w-[calc(100vw-32px)]"
          >
            <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 p-5 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center ring-1 ring-white/20">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-base">Farhan AI</h3>
                      <p className="text-xs text-white/60 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online · replies instantly
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeWidget}
                    className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-500 px-1">How would you like to talk?</p>
                <button
                  onClick={() => setMode('chat')}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition flex items-center gap-3 text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm">Chat with AI</h4>
                    <p className="text-xs text-slate-500">Get instant answers via text</p>
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-900 transition">→</span>
                </button>

                <button
                  onClick={() => setMode('voice')}
                  className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition flex items-center gap-3 text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm">Voice call</h4>
                    <p className="text-xs text-slate-500">Talk live with Farhan AI</p>
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-900 transition">→</span>
                </button>
              </div>

              <div className="px-5 pb-4 pt-1">
                <p className="text-[10px] text-center text-slate-400">
                  Powered by Lunexo Media · AI may make mistakes
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Mode */}
      <AnimatePresence>
        {mode === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-32px)]"
          >
            <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col max-h-[80vh]">
              {/* Header */}
              <div className="bg-slate-900 p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMode('select')}
                    className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-9 h-9 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Farhan AI</h3>
                    <p className="text-[11px] text-white/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Typically replies in seconds
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeWidget}
                  className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 min-h-[320px]">
                {chatMessages.length === 0 && (
                  <div className="space-y-3">
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md p-3 text-sm text-slate-700 max-w-[85%] shadow-sm">
                      👋 Hi! I'm Farhan AI from Lunexo Media. I can help you with websites, ads, or AI automation. What are you looking for today?
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {QUICK_REPLIES.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendChatMessage(q)}
                          disabled={isChatLoading}
                          className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition disabled:opacity-50"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap break-words",
                      msg.role === 'user'
                        ? "ml-auto bg-slate-900 text-white rounded-2xl rounded-br-md"
                        : "mr-auto bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-md"
                    )}
                  >
                    {msg.content}
                  </motion.div>
                ))}

                {isChatLoading && (
                  <div className="flex gap-1 px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-bl-md w-fit shadow-sm">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleChatSubmit} className="p-3 border-t border-slate-100 bg-white shrink-0">
                <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-full pl-4 pr-1.5 py-1 focus-within:border-slate-900 transition">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none py-2"
                    disabled={isChatLoading}
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isChatLoading}
                    className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
                    aria-label="Send"
                  >
                    {isChatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Mode */}
      <AnimatePresence>
        {mode === 'voice' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-32px)]"
          >
            <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
              {/* Header */}
              <div className="bg-slate-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { if (isCallActive) endCall(); setMode('select'); }}
                    className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="relative w-9 h-9 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                    {isCallActive && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Voice call</h3>
                    <p className="text-[11px] text-white/60">
                      {isCallActive ? 'Connected' : isConnecting ? 'Connecting…' : 'Ready to call'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeWidget}
                  className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="h-[320px] overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                {messages.length === 0 && !isCallActive && (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-slate-900 flex items-center justify-center shadow-lg">
                      <Phone className="h-9 w-9 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">Voice assistant ready</h4>
                    <p className="text-sm text-slate-500 px-4">Tap the button below to start a real-time voice call with Farhan AI.</p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                      msg.role === 'user'
                        ? "ml-auto bg-slate-900 text-white rounded-2xl rounded-br-md"
                        : "mr-auto bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-md"
                    )}
                  >
                    {msg.content}
                  </motion.div>
                ))}

                {currentTranscript && (
                  <div className="max-w-[85%] px-3.5 py-2.5 text-sm bg-white text-slate-400 border border-slate-100 rounded-2xl rounded-bl-md italic animate-pulse">
                    {currentTranscript}…
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-slate-100 bg-white">
                {!isCallActive ? (
                  <Button
                    onClick={startCall}
                    disabled={isConnecting || !sdkReady}
                    className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium gap-2 rounded-full"
                  >
                    {isConnecting ? (
                      <><Loader2 className="h-5 w-5 animate-spin" />Connecting…</>
                    ) : (
                      <><Phone className="h-5 w-5" />Start voice call</>
                    )}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={toggleMute}
                      variant="outline"
                      className={cn(
                        "flex-1 h-12 gap-2 rounded-full border-slate-200 text-slate-700",
                        isMuted && "bg-amber-50 border-amber-200 text-amber-700"
                      )}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      {isMuted ? 'Unmute' : 'Mute'}
                    </Button>
                    <Button
                      onClick={endCall}
                      className="flex-1 h-12 bg-red-600 hover:bg-red-500 text-white gap-2 rounded-full"
                    >
                      <PhoneOff className="h-4 w-4" />
                      End call
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatVoiceWidget;
