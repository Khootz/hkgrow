import { 
  MapPin, 
  Store, 
  Mail, 
  MessageCircle, 
  Users, 
  Bot 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Google Maps Scraping",
      description: "Find businesses instantly by keyword & location with intelligent data extraction."
    },
    {
      icon: Store,
      title: "OpenRice SME vs Chain Detection", 
      description: "Target the right businesses with smart classification algorithms."
    },
    {
      icon: Mail,
      title: "Website & Email Extraction",
      description: "Automatic website scans to pull valid contact emails with 95% accuracy."
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Outreach Automation",
      description: "Personalized WhatsApp campaigns at scale with AI-powered messaging."
    },
    {
      icon: Users,
      title: "LinkedIn Lead Targeting",
      description: "Find top management and connect automatically with precision targeting."
    },
    {
      icon: Bot,
      title: "AI Chatbot for Inbound",
      description: "RAG-powered chatbot to manage replies across WhatsApp, Email, and Web."
    }
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="text-gradient">Modern Growth</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to automate lead generation and scale your outreach with AI-powered precision.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="feature-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-4 group-hover:from-gold/30 group-hover:to-gold/20 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-gold" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;