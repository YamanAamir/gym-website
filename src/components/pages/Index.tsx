import { Link } from "react-router-dom";
import { ArrowRight, Users, User, Apple, Heart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/PublicLayout";
import { useState, useEffect } from "react";
import { publicAPI } from "@/lib/api/api";

// Placeholder images
const heroImage = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop";

const serviceIcons: Record<string, React.ReactNode> = {
  User: <User className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Apple: <Apple className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
};

// STATIC SERVICES - to match requested design
const services = [
  {
    id: 1,
    name: "PERSONAL TRAINING",
    description: "One-on-one sessions tailored to your goals with expert trainers.",
    icon: "User",
  },
  {
    id: 2,
    name: "GROUP CLASSES",
    description: "High-energy group sessions including HIIT, yoga, spin, and more.",
    icon: "Users",
  },
  {
    id: 3,
    name: "NUTRITION COACHING",
    description: "Personalized meal plans and nutritional guidance for optimal results.",
    icon: "Apple",
  },
  {
    id: 4,
    name: "RECOVERY ZONE",
    description: "Sauna, steam room, and massage therapy for muscle recovery.",
    icon: "Heart",
  },
];

const Index = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [homeData, setHomeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getHomepage();
        setHomeData(response.data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground font-display tracking-widest animate-pulse">LOADING VENOM EXPERIENCE...</p>
        </div>
      </PublicLayout>
    );
  }

  const membershipPlans = homeData?.plans || [];
  const trainers = homeData?.trainers || [];
  const stats = homeData?.stats || [
    { label: "Active Members", value: "2,500+" },
    { label: "Expert Trainers", value: "25" },
    { label: "Classes Weekly", value: "100+" },
    { label: "Years Experience", value: "15" }
  ];

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
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none animate-fade-in uppercase">
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
            {stats.map((stat: any, index: number) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="font-display text-4xl md:text-5xl text-primary">{stat.value}</div>
                <div className="text-muted-foreground mt-2 uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - REMAINS STATIC AS REQUESTED */}
      <section className="section-padding bg-background">
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
                className="glass-card p-8 group animate-fade-in flex flex-col items-start text-left hover:border-primary/50 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {serviceIcons[service.icon]}
                </div>
                <h3 className="font-display text-xl mb-3 tracking-wide">{service.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - API DRIVEN */}
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
                className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                Yearly <span className="text-xs opacity-75">(Save 17%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {membershipPlans.map((plan: any, index: number) => {
              const monthlyPrice = plan.monthly_price || plan.monthlyPrice || 0;
              const yearlyPrice = plan.yearly_price || plan.yearlyPrice || 0;
              const isPopular = plan.is_popular || plan.popular;

              return (
                <div
                  key={plan.id}
                  className={`relative glass-card p-8 animate-fade-in ${isPopular ? "border-primary shadow-glow ring-1 ring-primary/20" : ""
                    }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gradient text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="font-display text-2xl mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-display text-5xl text-primary">
                        {billingCycle === "monthly" ? monthlyPrice : yearlyPrice}
                      </span>
                      RS
                      <span className="text-muted-foreground text-xs uppercase ml-1">
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {(Array.isArray(plan.features) ? plan.features : []).map((feature: string) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup" className="block">
                    <Button
                      variant={isPopular ? "hero" : "outline"}
                      className="w-full group"
                      size="lg"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trainers Preview - API DRIVEN */}
      <section className="section-padding bg-background">
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
              <Button variant="outline" className="group">
                View All Trainers
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer: any, index: number) => (
              <div
                key={trainer.id}
                className="group relative overflow-hidden rounded-xl animate-fade-in border border-border/50 hover:border-primary/50 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={trainer.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-xl mb-1">{trainer.name}</h3>
                  <p className="text-primary text-sm font-medium tracking-wide uppercase">{trainer.trainer_profile?.specialty || "Fitness Coach"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-hero-gradient relative overflow-hidden">
        <div className="container-custom px-4 md:px-8 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl mb-6 uppercase tracking-tight">
            BUILD YOUR <span className="text-gradient">STRONGEST SELF</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10  text-lg">
            Train smarter, push harder, and unlock your true potential with VENOM.
            Personalized workouts, expert guidance, and real results — all in one place.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl" className="group shadow-glow">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;
