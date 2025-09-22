import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechStart HK",
      content: "We scaled outreach to 1,000 restaurants in Hong Kong in under a week. The AI chatbot handles inquiries perfectly, and our conversion rate increased by 340%.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Sales Manager", 
      company: "Growth Labs",
      content: "HK Grow transformed our lead generation completely. The WhatsApp automation alone saved us 20 hours per week, and the email accuracy is incredible.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emma Thompson",
      role: "Founder",
      company: "Digital Boost",
      content: "The LinkedIn targeting feature is a game-changer. We're connecting with C-level executives at a scale we never thought possible. ROI increased by 450%.",
      rating: 5,
      avatar: "ET"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Trusted by <span className="text-gradient">Growth Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of businesses that have transformed their lead generation with AI.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="glass-card p-12 text-center min-h-[400px] flex flex-col justify-center">
            <Quote className="w-12 h-12 text-gold mx-auto mb-8 opacity-60" />
            
            <div className="mb-8">
              <p className="text-2xl leading-relaxed text-foreground mb-8 max-w-4xl mx-auto">
                "{testimonials[currentSlide].content}"
              </p>
              
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-gold fill-current" />
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center text-gold font-bold text-lg">
                {testimonials[currentSlide].avatar}
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg text-foreground">
                  {testimonials[currentSlide].name}
                </div>
                <div className="text-muted-foreground">
                  {testimonials[currentSlide].role} at {testimonials[currentSlide].company}
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gold scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-2">500+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-2">2M+</div>
            <div className="text-muted-foreground">Leads Generated</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-2">95%</div>
            <div className="text-muted-foreground">Email Accuracy</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-muted-foreground">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;