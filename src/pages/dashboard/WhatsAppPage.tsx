import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
  MoreHorizontal
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
      color: "text-green-600", 
      bg: "bg-green-500/10",
      accent: "border-green-500/20"
    },
    { 
      label: "Delivered", 
      value: 2739, 
      icon: CheckCheck, 
      color: "text-blue-600", 
      bg: "bg-blue-500/10",
      accent: "border-blue-500/20"
    },
    { 
      label: "Read", 
      value: 1456, 
      icon: Eye, 
      color: "text-purple-600", 
      bg: "bg-purple-500/10",
      accent: "border-purple-500/20"
    },
    { 
      label: "Replies", 
      value: 234, 
      icon: MessageSquare, 
      color: "text-orange-600", 
      bg: "bg-orange-500/10",
      accent: "border-orange-500/20"
    }
  ];

  const responseRate = 8.2;
  const readRate = 51.2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/20 via-background to-emerald-50/10 p-4">
      {/* Header with WhatsApp vibes */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              WhatsApp Outreach
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Connected & Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat-style Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative">
            <Card className="border-0 glass-card hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
                  </div>
                  <div className={`p-2.5 rounded-full ${stat.bg} ml-3 flex-shrink-0`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                {/* Chat bubble tail */}
                <div className={`absolute -bottom-2 left-6 w-4 h-4 ${stat.bg} rotate-45 border-r border-green-500/20 border-b`}></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Performance Cards with WhatsApp Status Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card className="border-0 glass-card bg-gradient-to-br from-green-500/10 to-emerald-500/10 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-full bg-green-500/20">
                <Eye className="h-4 w-4 text-green-400" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Read Rate</h3>
              <div className="ml-auto text-xs text-green-400 font-medium">📈 High</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-400">{readRate}%</span>
                <span className="text-xs text-green-400 font-medium">+3.2% this week</span>
              </div>
              <Progress value={readRate} className="h-1.5" />
              <p className="text-xs text-muted-foreground">1,456 reads from 2,847 messages sent</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 glass-card bg-gradient-to-br from-blue-500/10 to-purple-500/10 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-full bg-blue-500/20">
                <MessageSquare className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Response Rate</h3>
              <div className="ml-auto text-xs text-blue-400 font-medium">💬 Active</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-400">{responseRate}%</span>
                <span className="text-xs text-blue-400 font-medium">+2.1% this week</span>
              </div>
              <Progress value={responseRate} className="h-1.5" />
              <p className="text-xs text-muted-foreground">234 replies from 2,847 messages sent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Composer - Chat Interface Style */}
      <Card className="border-0 bg-white/95 backdrop-blur-sm shadow-xl border border-green-500/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Craft Your WhatsApp Message</h2>
            <div className="ml-auto flex items-center gap-2 text-xs text-gray-600">
              <Clock className="h-3 w-3" />
              <span>Best time: 10AM - 6PM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message Composer */}
            <div className="lg:col-span-2 space-y-4">
              {/* Phone Preview */}
              <div className="bg-gradient-to-b from-green-600 to-green-700 p-4 rounded-t-3xl">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Prospect Name</h3>
                    <p className="text-xs text-green-100">Online</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Phone className="h-4 w-4" />
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-b-3xl min-h-[200px] border">
                {message ? (
                  <div className="flex justify-end mb-4">
                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                      <p className="text-sm whitespace-pre-wrap">{message}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs text-green-100">12:34</span>
                        <CheckCheck className="h-3 w-3 text-green-100" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Your message preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-900 font-medium mb-2 block">
                  Your Message
                </Label>
                <div className="relative">
                  <Textarea
                    id="message"
                    placeholder="Type your WhatsApp message here... Use emojis to make it friendly! 😊"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] bg-white border-green-500/20 focus:border-green-500 resize-none pr-12"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Smile className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Mic className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Image className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI Generate Message
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-green-500/30 hover:bg-green-500/10 text-green-400 hover:text-green-300"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Campaign
                </Button>
              </div>
            </div>

            {/* Live Activity & Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-white" />
                </div>
                Live Activity
              </h3>
              
              {/* Recent Activity Feed */}
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">Sarah replied to your message</p>
                        <p className="text-xs text-muted-foreground">2 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">Message delivered to 15 contacts</p>
                        <p className="text-xs text-muted-foreground">5 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">Campaign "Tech Leads" started</p>
                        <p className="text-xs text-muted-foreground">12 min ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-3 flex items-center gap-2 text-foreground">
                    <Zap className="h-4 w-4 text-gold" />
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <Button size="sm" variant="ghost" className="w-full justify-start text-xs h-8 text-foreground hover:bg-green-500/10">
                      📞 Import Contacts
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full justify-start text-xs h-8 text-foreground hover:bg-green-500/10">
                      📋 Save as Template
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full justify-start text-xs h-8 text-foreground hover:bg-green-500/10">
                      📈 View Full Analytics
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full justify-start text-xs h-8 text-foreground hover:bg-green-500/10">
                      ⚙️ Campaign Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Best Practices */}
              <Card className="glass-card bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-3 flex items-center gap-2 text-foreground">
                    💡 Pro Tips
                  </h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• Use {`{FirstName}`} for personalization</p>
                    <p>• Send between 10AM-6PM</p>
                    <p>• Keep messages under 160 chars</p>
                    <p>• Add relevant emojis 😊</p>
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