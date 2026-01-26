import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-healthcare.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">ABDM Integrated • आभा एकीकृत</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                AI-Powered Healthcare for{" "}
                <span className="text-gradient-hero">Every Village</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Personalized health guidance in your language, powered by your ABHA records. 
                Bridging the gap between rural India and quality healthcare.
              </p>
              <p className="text-base text-muted-foreground font-hindi">
                हर गाँव के लिए AI-संचालित स्वास्थ्य सेवा
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Health Check
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                <Globe className="w-5 h-5" />
                हिंदी में देखें
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">300M+</p>
                  <p className="text-muted-foreground">ABHA Records</p>
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">100%</p>
                  <p className="text-muted-foreground">Privacy First</p>
                </div>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">10+</p>
                  <p className="text-muted-foreground">Languages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-float">
            <div className="relative rounded-3xl overflow-hidden shadow-hero">
              <img
                src={heroImage}
                alt="ASHA health worker helping rural family with digital healthcare"
                className="w-full h-auto object-cover"
              />
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md rounded-2xl p-4 shadow-card border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Health Assistant</p>
                    <p className="text-sm text-muted-foreground">Analyzing your symptoms...</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;