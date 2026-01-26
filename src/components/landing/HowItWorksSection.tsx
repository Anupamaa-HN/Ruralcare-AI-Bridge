import { Smartphone, FileSearch, Sparkles, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Enter Your Symptoms",
    titleHindi: "अपने लक्षण दर्ज करें",
    description: "Tell us how you're feeling in your own words, in any language you're comfortable with.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Connect ABHA Records",
    titleHindi: "ABHA रिकॉर्ड जोड़ें",
    description: "With your consent, we securely access your health history for personalized insights.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "AI Analysis",
    titleHindi: "AI विश्लेषण",
    description: "Our GenAI engine analyzes symptoms against your records and medical knowledge.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Get Your Plan",
    titleHindi: "अपनी योजना प्राप्त करें",
    description: "Receive a personalized treatment plan with low-cost, rural-appropriate interventions.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
            How It Works • यह कैसे काम करता है
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            From Symptoms to Solutions in{" "}
            <span className="text-gradient-hero">4 Simple Steps</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Card */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-card hover:border-primary/20 transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-6 px-3 py-1 rounded-full bg-gradient-hero text-primary-foreground text-sm font-bold shadow-md">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mt-4 mb-6 group-hover:bg-primary/10 transition-colors">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground font-hindi mb-3">{step.titleHindi}</p>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow connector for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center">
                    <div className="w-2 h-2 border-r-2 border-b-2 border-primary/40 rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;