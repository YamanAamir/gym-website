import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { membershipPlans } from "@/components/lib/data";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    plan: "Pro",
    billing: "monthly" as "monthly" | "yearly",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl tracking-wide">VENOM</span>
          </Link>

          {/* Steps indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className="text-sm font-medium">Account</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                2
              </div>
              <span className="text-sm font-medium">Plan</span>
            </div>
          </div>

          {step === 1 ? (
            <>
              <h1 className="font-display text-4xl mb-2">CREATE ACCOUNT</h1>
              <p className="text-muted-foreground mb-8">Start your fitness transformation today.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="John Smith"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-display text-4xl mb-2">CHOOSE YOUR PLAN</h1>
              <p className="text-muted-foreground mb-6">Select the membership that fits your goals.</p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setFormData({ ...formData, billing: "monthly" })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.billing === "monthly"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setFormData({ ...formData, billing: "yearly" })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.billing === "yearly"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Yearly
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {membershipPlans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`glass-card p-4 flex items-center gap-4 cursor-pointer transition-all ${
                      formData.plan === plan.name ? "border-primary shadow-glow" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.name}
                      checked={formData.plan === plan.name}
                      onChange={() => setFormData({ ...formData, plan: plan.name })}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.plan === plan.name ? "border-primary bg-primary" : "border-border"
                    }`}>
                      {formData.plan === plan.name && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg">{plan.name}</span>
                        {plan.popular && (
                          <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">Popular</span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{plan.features[0]}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl text-primary">
                        ${formData.billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /{formData.billing === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                  </label>
                ))}

                <div className="pt-4">
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Start Membership
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              <button
                onClick={() => setStep(1)}
                className="text-center text-muted-foreground mt-4 hover:text-foreground transition-colors w-full"
              >
                ← Back to account details
              </button>
            </>
          )}

          <p className="text-center text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-12">
            <h2 className="font-display text-6xl text-foreground mb-4">
              START<br />YOUR<br /><span className="text-gradient">JOURNEY</span>
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Join thousands of members transforming their lives at VENOM Fitness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
