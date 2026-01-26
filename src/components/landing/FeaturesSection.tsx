import { Brain, Link2, Languages, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Diagnosis",
    titleHindi: "AI-संचालित निदान",
    description: "GenAI analyzes your symptoms with medical expertise, providing accurate preliminary assessments and treatment suggestions.",
    color: "primary",
  },
  {
    icon: Link2,
    title: "ABDM Integration",
    titleHindi: "ABDM एकीकरण",
    description: "Seamlessly connects with your ABHA records for personalized insights based on your complete health history.",
    color: "secondary",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    titleHindi: "बहुभाषी समर्थन",
    description: "Speak in Hindi, Kannada, Telugu, or any of 10+ Indian languages. Healthcare in your mother tongue.",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    titleHindi: "गोपनीयता सुरक्षित",
    description: "Your health data stays yours. Consent-based access with end-to-end encryption and ABDM compliance.",
    color: "primary",
  },
  {
    icon: Clock,
    title: "Instant Access",
    titleHindi: "तत्काल पहुंच",
    description: "No more waiting weeks for specialist appointments. Get preliminary guidance in minutes, not days.",
    color: "secondary",
  },
  {
    icon: Users,
    title: "ASHA Worker Support",
    titleHindi: "आशा कार्यकर्ता सहायता",
    description: "Empowers frontline health workers with AI tools to serve communities better and more efficiently.",
    color: "accent",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Features • विशेषताएं
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Healthcare That Understands{" "}
            <span className="text-gradient-hero">Rural India</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for the 70% of India that lives in villages. Accessible, affordable, and in your language.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border/50 hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  feature.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : feature.color === "secondary"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-accent/20 text-accent-foreground"
                }`}
              >
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-hindi mb-3">{feature.titleHindi}</p>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;