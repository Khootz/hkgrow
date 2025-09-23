import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  Send, 
  Sparkles, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Target,
  Zap,
  Eye,
  Heart,
  BarChart3
} from "lucide-react";

export default function EmailPage() {
  const [emailMessage, setEmailMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setSubject("Exclusive Partnership Opportunity - Let's Connect!");
      setEmailMessage(`Hi {FirstName},

I hope this email finds you well. I came across {CompanyName} and was impressed by your recent {Achievement/News}.

I believe there's a fantastic opportunity for us to collaborate and help {CompanyName} achieve even greater success in {Industry}.

Would you be open to a brief 15-minute conversation this week to explore how we could potentially work together?

Best regards,
{YourName}`);
      setIsGenerating(false);
    }, 2000);
  };

  // Mock data for dashboard
  const stats = [
    { label: "Emails Sent", value: 1247, icon: Send, color: "text-primary", bg: "bg-primary/10" },
    { label: "Replies", value: 89, icon: MessageSquare, color: "text-accent", bg: "bg-accent/10" },
    { label: "Warm Leads", value: 156, icon: Heart, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Cold Leads", value: 892, icon: Eye, color: "text-muted-foreground", bg: "bg-muted/20" }
  ];

  const conversionRate = 12.4;
  const responseRate = 7.1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-background/60 p-4">
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Email Outreach Hub
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">Create compelling email campaigns and track your success</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 bg-glass backdrop-blur-xl shadow-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value.toLocaleString()}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.bg} ml-3 flex-shrink-0`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card className="border-0 bg-glass backdrop-blur-xl shadow-glow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-base font-semibold">Conversion Rate</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">{conversionRate}%</span>
                <span className="text-xs text-green-500 font-medium">+2.3% this month</span>
              </div>
              <Progress value={conversionRate} className="h-1.5" />
              <p className="text-xs text-muted-foreground">156 conversions from 1,247 emails sent</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-glass backdrop-blur-xl shadow-glow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-accent" />
              <h3 className="text-base font-semibold">Response Rate</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-accent">{responseRate}%</span>
                <span className="text-xs text-green-500 font-medium">+1.8% this month</span>
              </div>
              <Progress value={responseRate} className="h-1.5" />
              <p className="text-xs text-muted-foreground">89 replies from 1,247 emails sent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Composer */}
      <Card className="border-0 bg-glass backdrop-blur-xl shadow-glow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-accent to-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold">Craft Your Outreach Message</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message Composer */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Label htmlFor="subject" className="text-foreground font-medium mb-2 block">
                  Email Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Enter a compelling subject line..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-background/50 border-primary/20 focus:border-primary h-12"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground font-medium mb-2 block">
                  Email Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Write your personalized outreach message here..."
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  className="min-h-[300px] bg-background/50 border-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI Generate
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-primary/20 hover:bg-primary/10"
                >
                  <Target className="mr-2 h-4 w-4" />
                  Send Campaign
                </Button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Pro Tips
              </h3>
              
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <h4 className="font-medium text-sm mb-1">Personalization</h4>
                  <p className="text-xs text-muted-foreground">Use {`{FirstName}`}, {`{CompanyName}`} to personalize your message</p>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
                  <h4 className="font-medium text-sm mb-1">Subject Lines</h4>
                  <p className="text-xs text-muted-foreground">Keep it under 50 characters for better open rates</p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/5 border border-muted/10">
                  <h4 className="font-medium text-sm mb-1">Call to Action</h4>
                  <p className="text-xs text-muted-foreground">End with a clear, specific ask or question</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Suggestions
                </h4>
                <p className="text-xs text-muted-foreground mb-3">Let AI help you craft the perfect message based on industry best practices.</p>
                <Button size="sm" variant="ghost" className="w-full text-xs h-8">
                  Get AI Tips
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}