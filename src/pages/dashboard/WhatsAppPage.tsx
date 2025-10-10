import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  Users, 
  CheckCheck, 
  Clock, 
  Eye,
  Phone,
  Zap,
  MessageSquare,
  TrendingUp,
  Smile,
  Mic,
  Image,
  MoreHorizontal,
  Activity,
  Star,
  Calendar,
  Target,
  Rocket,
  Wifi
} from "lucide-react";

export default function WhatsAppPage() {
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setMessage(`Hi {FirstName}! 👋

Hope you're having a great day! 

I came across {CompanyName} and I'm really impressed with what you're doing in {Industry}. 

I'd love to share something that could help you {solve specific problem/achieve goal} - would you be open to a quick 5-min chat this week? 

No pressure at all! 😊

Best,
{YourName}`);
      setIsGenerating(false);
    }, 2000);
  };

  // Mock data with WhatsApp-style metrics
  const stats = [
    { 
      label: "Messages Sent", 
      value: 2847, 
      icon: Send, 
      color: "text-green-400", 
      bg: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      pulse: "animate-pulse"
    },
    { 
      label: "Delivered", 
      value: 2739, 
      icon: CheckCheck, 
      color: "text-blue-400", 
      bg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      pulse: ""
    },
    { 
      label: "Read", 
      value: 1456, 
      icon: Eye, 
      color: "text-purple-400", 
      bg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      pulse: ""
    },
    { 
      label: "Replies", 
      value: 234, 
      icon: MessageSquare, 
      color: "text-orange-400", 
      bg: "bg-gradient-to-br from-orange-500/20 to-yellow-500/20",
      pulse: "animate-bounce"
    }
  ];

  const responseRate = 8.2;
  const readRate = 51.2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-background to-emerald-900/10 p-4">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-green-400/10 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Header with WhatsApp vibes */}
      <div className="mb-6 relative z-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="relative">
            <div className="p-3 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-2xl shadow-green-500/30 animate-scale-in">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              WhatsApp Outreach
            </h1>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Wifi className="h-3 w-3 text-green-400" />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Connected & Ready</span>
              </div>
              <div className="text-muted-foreground">•</div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span className="text-xs">Real-time sync</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat-style Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <Card className="border-0 glass-card hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-105 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground group-hover:text-green-400 transition-colors duration-300">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl ${stat.bg} ml-3 flex-shrink-0 ${stat.pulse}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                {/* Animated Progress Bar */}
                <div className="w-full bg-gray-700/20 rounded-full h-1 mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((stat.value / 3000) * 100, 100)}%` }}
                  ></div>
                </div>
                {/* WhatsApp-style bubble tail */}
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rotate-45 border-r border-green-500/30 border-b opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Performance Cards with Enhanced Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-0 glass-card bg-gradient-to-br from-green-500/10 to-emerald-500/10 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-102 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-green-500/20 group-hover:bg-green-500/30 transition-colors duration-300">
                <Eye className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Read Rate</h3>
              <div className="ml-auto flex items-center gap-2">
                <Star className="h-4 w-4 text-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full">📈 High Performance</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-green-400">{readRate}%</span>
                <span className="text-sm text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full">+3.2% this week</span>
              </div>
              <Progress value={readRate} className="h-2 bg-green-500/20" />
              <p className="text-sm text-muted-foreground">1,456 reads from 2,847 messages sent</p>
              <div className="flex items-center gap-2 text-xs text-green-400">
                <TrendingUp className="h-3 w-3" />
                <span>Trending upward consistently</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 glass-card bg-gradient-to-br from-blue-500/10 to-purple-500/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-102 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                <MessageSquare className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Response Rate</h3>
              <div className="ml-auto flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400 animate-pulse" />
                <span className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded-full">💬 Active Engagement</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-blue-400">{responseRate}%</span>
                <span className="text-sm text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded-full">+2.1% this week</span>
              </div>
              <Progress value={responseRate} className="h-2 bg-blue-500/20" />
              <p className="text-sm text-muted-foreground">234 replies from 2,847 messages sent</p>
              <div className="flex items-center gap-2 text-xs text-blue-400">
                <Target className="h-3 w-3" />
                <span>Quality conversations initiated</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Composer - Enhanced Chat Interface */}
      <Card className="border-0 glass-card shadow-2xl border border-green-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">Craft Your WhatsApp Message</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Best time: 10AM - 6PM</span>
                <div className="text-muted-foreground">•</div>
                <Calendar className="h-4 w-4" />
                <span>Weekdays preferred</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-xl">
              <Rocket className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">AI Powered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Message Composer */}
            <div className="lg:col-span-2 space-y-6">
              {/* Phone Preview */}
              <div className="bg-gradient-to-b from-green-600 to-green-700 p-5 rounded-t-3xl shadow-xl">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">Prospect Name</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <p className="text-xs text-green-100">Online now</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 hover:scale-110 transition-transform cursor-pointer" />
                    <MoreHorizontal className="h-5 w-5 hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-b-3xl min-h-[250px] border shadow-inner relative">
                {message ? (
                  <div className="flex justify-end mb-4 animate-fade-in">
                    <div className="bg-green-500 text-white p-4 rounded-2xl rounded-br-md max-w-xs shadow-lg hover:shadow-xl transition-shadow">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message}</p>
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <span className="text-xs text-green-100">12:34</span>
                        <CheckCheck className="h-4 w-4 text-green-100" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center animate-pulse">
                      <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-base font-medium">Your message preview will appear here</p>
                      <p className="text-sm opacity-75 mt-1">Start typing to see the magic ✨</p>
                    </div>
                  </div>
                )}
                
                {/* WhatsApp-style background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,.1) 8px, rgba(0,0,0,.1) 16px)',
                  }}></div>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-900 font-semibold mb-3 block text-base">
                  Your Message
                </Label>
                <div className="relative">
                  <Textarea
                    id="message"
                    placeholder="Type your WhatsApp message here... Use emojis to make it friendly! 😊"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[140px] bg-white/90 border-2 border-green-500/30 focus:border-green-500 resize-none pr-14 text-gray-900 placeholder:text-gray-500 rounded-2xl shadow-inner"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-500/10 rounded-full">
                      <Smile className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-500/10 rounded-full">
                      <Mic className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-500/10 rounded-full">
                      <Image className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                  <span>💡</span>
                  Character count: {message.length}/160 (optimal for WhatsApp)
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="flex-1 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-base font-semibold rounded-2xl"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="mr-3 h-5 w-5 animate-spin" />
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      AI Generate Message
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-14 border-2 border-green-500/40 hover:bg-green-500/10 text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-105 px-6 rounded-2xl font-semibold"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Campaign
                </Button>
              </div>
            </div>

            {/* Live Activity & Quick Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Live Activity</h3>
              </div>
              
              {/* Recent Activity Feed */}
              <Card className="glass-card border border-green-500/20 overflow-hidden">
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-green-500/5 hover:bg-green-500/10 transition-colors animate-fade-in">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Sarah replied to your message</p>
                        <p className="text-xs text-muted-foreground">2 min ago</p>
                      </div>
                      <div className="text-green-400">🎉</div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 transition-colors animate-fade-in" style={{animationDelay: '100ms'}}>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Message delivered to 15 contacts</p>
                        <p className="text-xs text-muted-foreground">5 min ago</p>
                      </div>
                      <div className="text-blue-400">📱</div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-orange-500/5 hover:bg-orange-500/10 transition-colors animate-fade-in" style={{animationDelay: '200ms'}}>
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">Campaign "Tech Leads" started</p>
                        <p className="text-xs text-muted-foreground">12 min ago</p>
                      </div>
                      <div className="text-orange-400">🚀</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border border-green-500/20">
                <CardContent className="p-5">
                  <h4 className="font-bold text-base mb-4 flex items-center gap-2 text-foreground">
                    <Zap className="h-5 w-5 text-gold animate-pulse" />
                    Quick Actions
                  </h4>
                  <div className="space-y-3">
                    <Button size="sm" variant="ghost" className="w-full justify-start text-sm h-10 text-foreground hover:bg-green-500/10 rounded-xl font-medium">
                      📞 Import Contacts
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full justify-start text-sm h-10 text-foreground hover:bg-green-500/10 rounded-xl font-medium">
                      📋 Save as Template
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full justify-start text-sm h-10 text-foreground hover:bg-green-500/10 rounded-xl font-medium">
                      📈 View Full Analytics
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full justify-start text-sm h-10 text-foreground hover:bg-green-500/10 rounded-xl font-medium">
                      ⚙️ Campaign Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Tips */}
              <Card className="glass-card bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                <CardContent className="p-5">
                  <h4 className="font-bold text-base mb-4 flex items-center gap-2 text-foreground">
                    💡 Pro Tips
                  </h4>
                  <div className="space-y-3 text-sm text-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <p>Use <code className="bg-green-500/20 px-1 rounded text-green-400">{`{FirstName}`}</code> for personalization</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <p>Send between <strong>10AM-6PM</strong> for best results</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <p>Keep messages <strong>under 160 chars</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <p>Add relevant emojis <span className="text-lg">😊</span> for friendliness</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}