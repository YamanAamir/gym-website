import { Link } from "react-router-dom";
import { ArrowRight, Users, User, Apple, Heart, Shield, Target, TrendingUp, Moon, Droplets, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/PublicLayout";
import { membershipPlans, services, stats, trainers } from "@/components/lib/data";
import { useState } from "react";
// Placeholder images - replace with actual images when available
const heroImage = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop";
const trainerImages = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
];

const serviceIcons: Record<string, React.ReactNode> = {
  User: <User className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Apple: <Apple className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
};

const Index = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fitness hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 px-4 md:px-8 py-20">
          <div className="max-w-3xl space-y-8">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none animate-fade-in">
              PUSH YOUR
              <br />
              <span className="text-gradient">LIMITS</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Transform your body and elevate your mind at VENOM Fitness. World-class equipment, expert trainers, and a community dedicated to excellence.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/trainers">
                <Button variant="glass" size="xl">
                  Meet Our Trainers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y border-border">
        <div className="container-custom px-4 md:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="font-display text-4xl md:text-5xl text-primary">{stat.value}</div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              OUR <span className="text-gradient">SERVICES</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive fitness solutions designed to help you achieve your goals faster and more effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="stat-card group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {serviceIcons[service.icon]}
                </div>
                <h3 className="font-display text-xl mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-card">
        <div className="container-custom px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              MEMBERSHIP <span className="text-gradient">PLANS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your fitness journey. All plans include access to our state-of-the-art facilities.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-secondary rounded-full p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly <span className="text-xs opacity-75">(Save 17%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {membershipPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative glass-card p-8 animate-fade-in ${
                  plan.popular ? "border-primary shadow-glow" : ""
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gradient text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-display text-2xl mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-5xl text-primary">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="block">
                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Preview */}
      <section className="section-padding">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                EXPERT <span className="text-gradient">TRAINERS</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Our certified trainers bring years of experience and passion to help you reach your potential.
              </p>
            </div>
            <Link to="/trainers">
              <Button variant="outline">
                View All Trainers
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.slice(0, 4).map((trainer, index) => (
              <div
                key={trainer.id}
                className="group relative overflow-hidden rounded-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square">
                  <img
                    src={trainerImages[index]}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl">{trainer.name}</h3>
                  <p className="text-primary text-sm">{trainer.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-hero-gradient">
        <div className="container-custom px-4 md:px-8 text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            READY TO <span className="text-gradient">TRANSFORM?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of members who have already started their fitness journey with VENOM. Your transformation begins today.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;
