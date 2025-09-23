import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Send, 
  User, 
  Brain, 
  Zap, 
  MessageSquare, 
  Settings, 
  Globe,
  Clock,
  Sparkles,
  Key,
  AlertCircle,
  Target
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant powered by Perplexity. I can help you with research, answer questions, and provide insights. What would you like to know?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your Perplexity API key to use the chatbot."
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for a lead generation and business automation platform called HK Grow. Be precise, concise, and focus on helping with business-related queries, lead generation, sales automation, and growth strategies.'
            },
            {
              role: 'user',
              content: inputMessage
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from AI. Please check your API key and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const saveApiKey = () => {
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "You can now start chatting with the AI assistant."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-medium to-background-light p-4">
      {/* Header */}
      <div className="mb-6 bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
              <p className="text-muted-foreground text-sm">Powered by Perplexity AI for intelligent conversations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Online
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="border-border bg-card/50 text-foreground hover:bg-card"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chat Interface */}
        <div className="lg:col-span-3 space-y-4">
          {/* API Key Configuration */}
          {showApiKeyInput && (
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg border-orange-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                  <Key className="w-5 h-5 text-orange-400" />
                  API Configuration
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  Enter your Perplexity API key to start chatting
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter your Perplexity API key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-background/50 border-border text-foreground"
                  />
                  <Button onClick={saveApiKey} className="bg-gradient-primary hover:opacity-90">
                    Save
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Get your API key from{" "}
                  <a href="https://docs.perplexity.ai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Perplexity AI Dashboard
                  </a>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Chat Messages */}
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
                Chat Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-96 w-full pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted/50 text-foreground'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <div className={`text-xs mt-2 flex items-center gap-1 ${
                          message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
              
              <Separator className="my-4" />
              
              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading || !apiKey}
                  className="bg-background/50 border-border text-foreground resize-none"
                  rows={2}
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim() || !apiKey}
                  className="bg-gradient-primary hover:opacity-90 self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* AI Stats */}
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Model</span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Sonar Small</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Messages</span>
                <span className="text-sm font-semibold text-foreground">{messages.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">Status</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs text-emerald-400">Ready</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-border bg-card/50 text-foreground hover:bg-card"
                onClick={() => setInputMessage("What are the latest trends in lead generation?")}
              >
                <Globe className="w-4 h-4 mr-2" />
                Lead Gen Trends
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-border bg-card/50 text-foreground hover:bg-card"
                onClick={() => setInputMessage("How can I improve my sales conversion rate?")}
              >
                <Target className="w-4 h-4 mr-2" />
                Sales Tips
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start border-border bg-card/50 text-foreground hover:bg-card"
                onClick={() => setInputMessage("What are the best automation tools for businesses?")}
              >
                <Bot className="w-4 h-4 mr-2" />
                Automation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;