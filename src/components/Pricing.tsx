import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "$99",
      period: "/month",
      description: "Perfect for small businesses starting their lead generation journey",
      features: [
        "Up to 1,000 leads/month",
        "Google Maps scraping",
        "Email extraction",
        "WhatsApp automation (500 messages)",
        "Basic AI chatbot",
        "Email support"
      ],
      isPopular: false,
      buttonText: "Start Free Trial"
    },
    {
      name: "Growth",
      icon: Rocket,
      price: "$299",
      period: "/month",
      description: "Ideal for growing companies scaling their outreach efforts",
      features: [
        "Up to 5,000 leads/month",
        "All Starter features",
        "LinkedIn automation",
        "OpenRice SME detection",
        "Advanced AI chatbot with RAG",
        "Multi-channel campaigns",
        "Priority support",
        "Custom integrations"
      ],
      isPopular: true,
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      period: "",
      description: "For large organizations with advanced automation needs",
      features: [
        "Unlimited leads",
        "All Growth features",
        "Custom AI model training",
        "White-label solution",
        "Dedicated account manager",
        "Advanced analytics & reporting",
        "24/7 phone support",
        "Custom API access",
        "On-premise deployment"
      ],
      isPopular: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Growth Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free, scale fast. All plans include our core AI automation features with no setup fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative glass-card p-8 ${
                  plan.isPopular 
                    ? 'ring-2 ring-gold/50 scale-105 lg:scale-110' 
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-gold to-gold-dark text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-gold" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gradient">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5 mr-3" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    plan.isPopular ? 'btn-gold' : 'btn-silver'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Trusted by 500+ businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="glass-card px-6 py-3 text-sm font-medium">
              14-day free trial
            </div>
            <div className="glass-card px-6 py-3 text-sm font-medium">
              Cancel anytime
            </div>
            <div className="glass-card px-6 py-3 text-sm font-medium">
              24/7 support
            </div>
            <div className="glass-card px-6 py-3 text-sm font-medium">
              99.9% uptime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;