import { Search, Target, MessageSquare, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search & Collect",
      description: "Scrape leads from Google Maps or OpenRice with advanced filtering and smart data extraction.",
      features: ["Location-based targeting", "Industry classification", "Real-time data validation"]
    },
    {
      icon: Target,
      title: "Qualify & Outreach", 
      description: "Target with emails, WhatsApp, LinkedIn using AI-powered personalization at scale.",
      features: ["Smart lead scoring", "Multi-channel campaigns", "Automated follow-ups"]
    },
    {
      icon: MessageSquare,
      title: "Engage & Convert",
      description: "Let our AI chatbot handle inbound replies across all channels with intelligent responses.",
      features: ["24/7 automated responses", "Lead qualification", "CRM integration"]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to transform your lead generation and scale your business with AI automation.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="glass-card p-8 text-center group relative z-10">
                    {/* Step Number */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-6 pt-6">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-4 group-hover:from-gold/30 group-hover:to-gold/20 transition-all duration-300">
                        <IconComponent className="w-10 h-10 text-gold" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                      <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-gold" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;