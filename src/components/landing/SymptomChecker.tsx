import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Send, Loader2, User, Bot, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/symptom-checker`;

const exampleSymptoms = [
  "I have had fever for 3 days with body pain",
  "मुझे 3 दिनों से बुखार है और शरीर में दर्द है",
  "Sugar level is high since morning",
  "सांस लेने में तकलीफ हो रही है",
];

type Message = { role: "user" | "assistant"; content: string };

const SymptomChecker = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  const streamChat = useCallback(async (userMessages: Message[]) => {
    abortControllerRef.current = new AbortController();
    
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        messages: userMessages.map(m => ({ 
          role: m.role === "assistant" ? "assistant" : "user", 
          content: m.content 
        }))
      }),
      signal: abortControllerRef.current.signal,
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        throw new Error("Rate limit exceeded. Please wait a moment and try again.");
      }
      if (resp.status === 402) {
        throw new Error("Service temporarily unavailable. Please try again later.");
      }
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);
    setInput("");

    try {
      await streamChat(newMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      // Remove the failed assistant message if any
      setMessages(prev => prev.filter((_, i) => i < newMessages.length));
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
            Try It Now • अभी आज़माएं
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            AI Health Assistant{" "}
            <span className="text-gradient-hero">Demo</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Describe your symptoms in any language. Our AI understands you.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl shadow-card border border-border/50 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-hero px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground">Swasthya AI</p>
                  <p className="text-sm text-primary-foreground/80">Always here to help • हमेशा मदद के लिए तैयार</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-foreground/80 animate-pulse" />
                  <span className="text-sm text-primary-foreground/80">Online</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Start a conversation</p>
                    <p className="text-sm text-muted-foreground">Tell me your symptoms in any language</p>
                  </div>
                  {/* Example prompts */}
                  <div className="flex flex-wrap gap-2 justify-center pt-4">
                    {exampleSymptoms.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => handleExampleClick(example)}
                        className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                      >
                        {example.length > 30 ? example.substring(0, 30) + "..." : example}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
              messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user" ? "bg-secondary/20" : "bg-primary/10"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 text-secondary" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-secondary text-secondary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-soft" />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-soft [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-soft [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4">
              <div className="flex gap-2">
                <button className="p-3 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your symptoms... अपने लक्षण लिखें..."
                  className="flex-1 px-4 py-3 rounded-xl bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-4"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground mt-4 max-w-md mx-auto">
            This is a demo. For actual medical advice, please consult a healthcare professional.
            यह एक डेमो है। वास्तविक चिकित्सा सलाह के लिए कृपया डॉक्टर से परामर्श लें।
          </p>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;