import { Button } from "@/components/ui/button";
import { Play, BarChart3, Users, MessageCircle, Zap } from "lucide-react";

const Demo = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            See <span className="text-gradient">LeadAI</span> in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch how our AI-powered platform transforms lead generation for businesses of all sizes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video/Demo Area */}
          <div className="relative">
            <div className="glass-card p-8 aspect-video flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-6 group-hover:from-gold/30 group-hover:to-gold/20 transition-all duration-300">
                  <Play className="w-10 h-10 text-gold ml-1" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Watch Demo</h3>
                <p className="text-muted-foreground">See how we generated 1,000+ leads in 48 hours</p>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 glass-card p-4 animate-pulse">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium">+347% ROI</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card p-4 animate-pulse">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-gold" />
                <span className="text-sm font-medium">10x Faster</span>
              </div>
            </div>
          </div>

          {/* Features Highlights */}
          <div className="space-y-8">
            <div className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multi-Channel Dashboard</h3>
                  <p className="text-muted-foreground">Manage all your outreach campaigns from one unified platform. Track performance across email, WhatsApp, and LinkedIn.</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Responses</h3>
                  <p className="text-muted-foreground">Our intelligent chatbot handles inquiries 24/7, qualifying leads and scheduling meetings automatically.</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                  <p className="text-muted-foreground">Track campaign performance with detailed insights on open rates, response rates, and conversion metrics.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="btn-gold w-full text-lg">
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;