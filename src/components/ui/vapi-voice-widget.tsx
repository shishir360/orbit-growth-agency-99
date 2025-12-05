import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, MessageCircle, X, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    vapiSDK: any;
  }
}

const VAPI_ASSISTANT_ID = '8dcb4c2f-b585-454c-aba5-e97165192629';
const VAPI_PUBLIC_KEY = '3250cbd5-7851-455f-bd67-d3a6356b5cee';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const VapiVoiceWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load VAPI SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/vapi-web.js';
    script.async = true;
    script.onload = () => {
      if (window.vapiSDK) {
        const vapi = new window.vapiSDK.default(VAPI_PUBLIC_KEY);
        setVapiInstance(vapi);

        // Event listeners
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

        vapi.on('speech-start', () => {
          setCurrentTranscript('');
        });

        vapi.on('speech-end', () => {
          setCurrentTranscript('');
        });

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
          console.error('VAPI Error:', error);
          setIsConnecting(false);
          setIsCallActive(false);
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript]);

  const startCall = async () => {
    if (!vapiInstance) return;
    
    setIsConnecting(true);
    setMessages([]);
    
    try {
      await vapiInstance.start(VAPI_ASSISTANT_ID);
    } catch (error) {
      console.error('Failed to start call:', error);
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    if (vapiInstance) {
      vapiInstance.stop();
    }
  };

  const toggleMute = () => {
    if (vapiInstance && isCallActive) {
      vapiInstance.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 animate-pulse hover:animate-none"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat/Voice Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/user-logo-optimized.webp" 
                  alt="Lunexo Media" 
                  className="w-10 h-10 rounded-full bg-white/10 p-1"
                />
                {isCallActive && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-primary animate-pulse" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Farhan AI</h3>
                <p className="text-xs text-primary-foreground/70">
                  {isCallActive ? 'On call...' : isConnecting ? 'Connecting...' : 'Voice Assistant'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (isCallActive) endCall();
                setIsOpen(false);
              }}
              className="text-primary-foreground hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-background/50">
            {messages.length === 0 && !isCallActive && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Voice Assistant Ready</h4>
                <p className="text-sm text-muted-foreground">
                  Click the button below to start a voice conversation with Farhan AI
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[85%] p-3 rounded-2xl text-sm",
                  msg.role === 'user'
                    ? "ml-auto bg-primary text-primary-foreground rounded-br-md"
                    : "mr-auto bg-muted text-foreground rounded-bl-md"
                )}
              >
                {msg.content}
              </div>
            ))}

            {currentTranscript && (
              <div className="max-w-[85%] p-3 rounded-2xl text-sm bg-muted/50 text-muted-foreground rounded-bl-md animate-pulse">
                {currentTranscript}...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-border bg-card">
            {!isCallActive ? (
              <Button
                onClick={startCall}
                disabled={isConnecting || !vapiInstance}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium gap-2"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
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
                    "flex-1 h-12 gap-2",
                    isMuted && "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                  )}
                >
                  {isMuted ? (
                    <>
                      <MicOff className="h-5 w-5" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5" />
                      Mute
                    </>
                  )}
                </Button>
                <Button
                  onClick={endCall}
                  className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white gap-2"
                >
                  <PhoneOff className="h-5 w-5" />
                  End Call
                </Button>
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground mt-3">
              Powered by Lunexo Media AI
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VapiVoiceWidget;
