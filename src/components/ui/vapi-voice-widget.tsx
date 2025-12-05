import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, MessageCircle, X, Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Vapi from '@vapi-ai/web';

const VAPI_ASSISTANT_ID = '9ec8940c-71aa-4b68-a750-c11a7a9f569c';
const VAPI_PUBLIC_KEY = '3572c083-2548-4b2b-bb37-d88f0d5dcef4';

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
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize VAPI SDK
  useEffect(() => {
    try {
      const vapi = new Vapi(VAPI_PUBLIC_KEY);
      console.log('VAPI instance created');
      
      // Event listeners
      vapi.on('call-start', () => {
        console.log('Call started');
        setIsCallActive(true);
        setIsConnecting(false);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Hi! This is Farhan AI from Lunexo Media. How can I help you today?"
        }]);
      });

      vapi.on('call-end', () => {
        console.log('Call ended');
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
        console.log('VAPI message:', message);
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
        toast.error('Voice call error: ' + (error?.message || 'Unknown error'));
        setIsConnecting(false);
        setIsCallActive(false);
      });

      setVapiInstance(vapi);
      setSdkReady(true);
    } catch (err) {
      console.error('Error initializing VAPI:', err);
      toast.error('Failed to initialize voice SDK');
    }

    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript]);

  const startCall = async () => {
    if (!vapiInstance) {
      toast.error('Voice SDK not ready. Please try again.');
      return;
    }
    
    setIsConnecting(true);
    setMessages([]);
    
    // Add connection timeout
    const timeoutId = setTimeout(() => {
      if (isConnecting && !isCallActive) {
        console.log('Connection timeout - stopping call');
        vapiInstance.stop();
        setIsConnecting(false);
        toast.error('Connection timeout. Please try again.');
      }
    }, 30000); // 30 second timeout
    
    try {
      console.log('Starting call with assistant:', VAPI_ASSISTANT_ID);
      await vapiInstance.start(VAPI_ASSISTANT_ID);
      clearTimeout(timeoutId);
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Failed to start call:', error);
      toast.error('Failed to start call: ' + (error?.message || 'Please allow microphone access'));
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
      <div className="fixed bottom-6 right-6 z-[9999]">
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
        <div className="fixed bottom-6 right-6 z-[9999] w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
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
                disabled={isConnecting || !sdkReady}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium gap-2 disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
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
