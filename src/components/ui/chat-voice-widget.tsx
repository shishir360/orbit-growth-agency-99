import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, MessageCircle, X, Mic, MicOff, Loader2, Send, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Vapi from '@vapi-ai/web';

const VAPI_ASSISTANT_ID = '9ec8940c-71aa-4b68-a750-c11a7a9f569c';
const VAPI_PUBLIC_KEY = '3572c083-2548-4b2b-bb37-d88f0d5dcef4';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type WidgetMode = 'closed' | 'select' | 'chat' | 'voice';

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

  const endCall = () => {
    if (vapiInstance) vapiInstance.stop();
  };

  const toggleMute = () => {
    if (vapiInstance && isCallActive) {
      vapiInstance.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Thanks for reaching out! I'm Farhan AI from Lunexo Media. How can I help you with your digital marketing needs today? We offer Website Design, Ads Management, and AI Automation services." 
      }]);
      setIsChatLoading(false);
    }, 1500);
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-16 w-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_40px_rgba(139,92,246,0.5)] flex items-center justify-center group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 animate-ping opacity-30" />
              <MessageCircle className="h-7 w-7 text-white" />
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
            className="fixed bottom-6 right-6 z-[9999] w-[320px] max-w-[calc(100vw-48px)]"
          >
            <div className="bg-[#0a0a0f]/98 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center">
                      <img src="/user-logo-optimized.webp" alt="Logo" className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Farhan AI</h3>
                      <p className="text-sm text-white/70">How can I help?</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeWidget}
                    className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Options */}
              <div className="p-5 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMode('chat')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-white text-lg">Chat with AI</h4>
                    <p className="text-sm text-white/50">Type your message</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-emerald-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMode('voice')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 hover:border-violet-500/40 transition-all group flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-white text-lg">Voice Call</h4>
                    <p className="text-sm text-white/50">Talk with Farhan AI</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-violet-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              <div className="px-5 pb-5">
                <p className="text-xs text-center text-white/30">
                  Powered by Lunexo Media AI
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
            className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-48px)]"
          >
            <div className="bg-[#0a0a0f]/98 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setMode('select')} className="text-white/70 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Farhan AI Chat</h3>
                    <p className="text-xs text-white/70">Online • Quick replies</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeWidget} className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-[350px] overflow-y-auto p-4 space-y-3">
                {chatMessages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <MessageCircle className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h4 className="font-medium text-white mb-2">Start a Conversation</h4>
                    <p className="text-sm text-white/50">Ask me anything about our services!</p>
                  </div>
                )}

                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-sm",
                      msg.role === 'user'
                        ? "ml-auto bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-br-md"
                        : "mr-auto bg-white/5 border border-white/10 text-white/90 rounded-bl-md"
                    )}
                  >
                    {msg.content}
                  </motion.div>
                ))}

                {isChatLoading && (
                  <div className="flex gap-1 p-4 bg-white/5 rounded-2xl rounded-bl-md w-fit">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50"
                  />
                  <Button 
                    type="submit" 
                    disabled={!chatInput.trim() || isChatLoading}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 rounded-xl px-4"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
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
            className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-48px)]"
          >
            <div className="bg-[#0a0a0f]/98 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => { if (isCallActive) endCall(); setMode('select'); }} className="text-white/70 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="relative w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                    {isCallActive && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-violet-600 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Voice Call</h3>
                    <p className="text-xs text-white/70">
                      {isCallActive ? 'Connected' : isConnecting ? 'Connecting...' : 'Ready to call'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeWidget} className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-[300px] overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && !isCallActive && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                      <Phone className="h-10 w-10 text-violet-400" />
                    </div>
                    <h4 className="font-medium text-white mb-2">Voice Assistant Ready</h4>
                    <p className="text-sm text-white/50">Start a voice call with Farhan AI</p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-sm",
                      msg.role === 'user'
                        ? "ml-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-md"
                        : "mr-auto bg-white/5 border border-white/10 text-white/90 rounded-bl-md"
                    )}
                  >
                    {msg.content}
                  </motion.div>
                ))}

                {currentTranscript && (
                  <div className="max-w-[85%] p-4 rounded-2xl text-sm bg-white/5 text-white/50 rounded-bl-md animate-pulse">
                    {currentTranscript}...
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-white/10">
                {!isCallActive ? (
                  <Button
                    onClick={startCall}
                    disabled={isConnecting || !sdkReady}
                    className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold gap-3 rounded-xl disabled:opacity-50 text-lg"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Phone className="h-6 w-6" />
                        Start Voice Call
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      onClick={toggleMute}
                      variant="outline"
                      className={cn(
                        "flex-1 h-14 gap-2 rounded-xl border-white/10",
                        isMuted && "bg-amber-500/10 border-amber-500/50 text-amber-400"
                      )}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      {isMuted ? 'Unmute' : 'Mute'}
                    </Button>
                    <Button
                      onClick={endCall}
                      className="flex-1 h-14 bg-red-600 hover:bg-red-500 text-white gap-2 rounded-xl"
                    >
                      <PhoneOff className="h-5 w-5" />
                      End Call
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
