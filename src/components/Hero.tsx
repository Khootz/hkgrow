import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Floating Glass Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-orb w-32 h-32 top-20 left-20 animation-delay-0" />
        <div className="glow-orb w-24 h-24 top-40 right-32 animation-delay-2000" />
        <div className="glow-orb w-40 h-40 bottom-32 left-1/4 animation-delay-4000" />
        <div className="glow-orb w-28 h-28 bottom-20 right-20 animation-delay-6000" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="glass-card p-12 mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Automated Lead Generation.{" "}
            <span className="text-gradient">Reinvented.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            End-to-end AI-powered business growth — scrape, qualify, and reach leads seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="btn-gold text-lg">
              <Link to="/dashboard">Get Started Free</Link>
            </Button>
            <Button variant="outline" className="btn-silver text-lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="glass-card p-6">
            <div className="text-3xl font-bold text-gradient mb-2">10K+</div>
            <div className="text-muted-foreground">Leads Generated</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl font-bold text-gradient mb-2">95%</div>
            <div className="text-muted-foreground">Email Accuracy</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl font-bold text-gradient mb-2">3x</div>
            <div className="text-muted-foreground">Faster Outreach</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;