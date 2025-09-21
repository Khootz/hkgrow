import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Final CTA Section */}
        <div className="text-center mb-16">
          <div className="glass-card p-12 mb-8">
            <h2 className="text-5xl font-bold mb-6">
              Start Growing Your Leads{" "}
              <span className="text-gradient">Today</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of businesses using AI to scale their lead generation. 
              Get started with a free trial and see results in 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-gold text-lg px-12 py-4">
                Get Started Free
              </Button>
              <Button variant="outline" className="btn-silver text-lg px-12 py-4">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4">
                <div className="text-3xl font-bold">
                  <span className="text-gradient">LeadAI</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The future of lead generation. Automate, qualify, and convert leads 
                with AI-powered precision across all channels.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="glass-card hover:text-gold">
                  <Mail className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="glass-card hover:text-gold">
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="glass-card hover:text-gold">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-gold transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-gold transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">API</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-gold transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 LeadAI. All rights reserved. Built with AI for the future of business growth.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;