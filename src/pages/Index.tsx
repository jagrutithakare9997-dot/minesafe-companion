import { Shield, Radio, MapPin, AlertTriangle, HeartPulse, MessageSquare } from "lucide-react";
import heroImage from "@/assets/hero-mining.jpg";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
    <div className="container mx-auto flex h-16 items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Shield className="h-7 w-7 text-primary" />
        <span className="font-display text-xl font-bold tracking-wide text-foreground">
          MINE<span className="text-primary">GUARD</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
        <a href="#stats" className="hover:text-primary transition-colors">Impact</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
      <button className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-safety">
        Request Demo
      </button>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Mine worker with smart safety helmet" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
    </div>
    <div className="container relative mx-auto px-6 pt-20">
      <div className="max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          AI-Powered Safety Platform
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground mb-6">
          Intelligent Mobile{" "}
          <span className="text-gradient-safety">Safety Companion</span>{" "}
          for Mine Workers
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
          Real-time hazard detection, gas monitoring, and emergency response — protecting every worker, every shift, every day.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:opacity-90 glow-safety">
            Get Started
          </button>
          <button className="rounded-md border border-border bg-secondary px-8 py-3 text-base font-semibold text-secondary-foreground transition-all hover:border-primary/50">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: AlertTriangle,
    title: "Hazard Detection",
    description: "AI-powered real-time detection of environmental hazards including roof falls, seismic activity, and structural risks.",
  },
  {
    icon: Radio,
    title: "Gas Monitoring",
    description: "Continuous monitoring of methane, CO, CO2, and oxygen levels with instant alerts when thresholds are breached.",
  },
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Underground positioning system tracks worker locations in real-time for rapid emergency response.",
  },
  {
    icon: Shield,
    title: "Emergency SOS",
    description: "One-tap emergency beacon with automated location broadcast and rescue team coordination.",
  },
  {
    icon: HeartPulse,
    title: "Health Monitoring",
    description: "Wearable integration monitors heart rate, fatigue levels, and body temperature continuously.",
  },
  {
    icon: MessageSquare,
    title: "Team Communication",
    description: "Mesh network communication works underground without cellular coverage for reliable team coordination.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 bg-card">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Core Features</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Safety Technology That <span className="text-gradient-safety">Saves Lives</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Comprehensive suite of intelligent tools designed specifically for the harsh underground mining environment.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-lg border border-border bg-background p-8 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  { step: "01", title: "Deploy Sensors", description: "Install IoT sensors and mesh network nodes throughout the mine." },
  { step: "02", title: "Equip Workers", description: "Each worker receives a smart wearable device synced with the platform." },
  { step: "03", title: "Monitor & Alert", description: "AI analyzes data in real-time and triggers instant alerts when hazards are detected." },
  { step: "04", title: "Respond & Rescue", description: "Automated emergency protocols coordinate rescue teams with precise location data." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">How It Works</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">
          Simple Setup, <span className="text-gradient-safety">Maximum Protection</span>
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.step} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 font-display text-2xl font-bold text-primary">
              {s.step}
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const stats = [
  { value: "99.7%", label: "Hazard Detection Rate" },
  { value: "<2s", label: "Alert Response Time" },
  { value: "45%", label: "Accident Reduction" },
  { value: "10K+", label: "Workers Protected" },
];

const StatsSection = () => (
  <section id="stats" className="py-24 bg-card">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Impact</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">
          Proven Results in <span className="text-gradient-safety">Mine Safety</span>
        </h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-background p-8 text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section id="contact" className="py-24">
    <div className="container mx-auto px-6">
      <div className="rounded-2xl border border-primary/20 bg-card p-12 md:p-16 text-center glow-safety">
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Ready to Protect Your Workforce?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          Join leading mining companies using MineGuard to keep their workers safe. Schedule a demo today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:opacity-90">
            Schedule Demo
          </button>
          <button className="rounded-md border border-border bg-secondary px-8 py-3 text-base font-semibold text-secondary-foreground transition-all hover:border-primary/50">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-display text-lg font-bold text-foreground">
          MINE<span className="text-primary">GUARD</span>
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        © 2026 MineGuard. Intelligent Mobile Safety Companion for Mine Workers.
      </p>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
