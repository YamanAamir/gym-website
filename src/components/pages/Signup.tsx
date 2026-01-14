import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Mail, Lock, User, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { membershipPlans } from "@/components/lib/data";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/api/api";

export default function Signup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    plan: "Pro",
    billing: "monthly" as "monthly" | "yearly",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Google API
    const initGoogle = () => {
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
      }
    };

    // Try to initialize immediately or wait for script to load
    initGoogle();
    const timer = setInterval(() => {
      if ((window as any).google) {
        initGoogle();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGoogleResponse = async (response: any) => {
    try {
      setIsLoading(true);
      console.log("Google response:", response);

      // Here you would typically send response.credential (JWT) to your backend
      // const res = await authAPI.googleSignup({ token: response.credential });

      toast({
        title: "Google Account Connected",
        description: "Successfully authenticated with Google. Please complete your registration.",
      });

      // For demo: pre-fill some info and proceed to step 2
      // In a real app, you would verify the JWT and check if user already exists
      localStorage.setItem('userToken', 'google-mock-token');
      localStorage.setItem('user', JSON.stringify({ name: "Google User", email: "user@gmail.com" }));

      setStep(2);
    } catch (error) {
      toast({
        title: "Google Signup Failed",
        description: "Could not authenticate with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerGoogleLogin = () => {
    if ((window as any).google) {
      (window as any).google.accounts.id.prompt();
    } else {
      toast({
        title: "Error",
        description: "Google identity service is still loading. Please wait a moment.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      try {
        setIsLoading(true);
        const response = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          membership_plan: formData.plan, // Adjust field names as per backend expectation
          billing_cycle: formData.billing
        });

        if (response.data.token) {
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user || {}));

          toast({
            title: "Account Created",
            description: "Welcome to VENOM Fitness! Your account has been setup.",
          });

          setTimeout(() => navigate("/dashboard"), 500);
        }
      } catch (error: any) {
        toast({
          title: "Registration Failed",
          description: error.response?.data?.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
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
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 h-12"
                  onClick={triggerGoogleLogin}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.billing === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setFormData({ ...formData, billing: "yearly" })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.billing === "yearly"
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
                    className={`glass-card p-4 flex items-center gap-4 cursor-pointer transition-all ${formData.plan === plan.name ? "border-primary shadow-glow" : ""
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
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.plan === plan.name ? "border-primary bg-primary" : "border-border"
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
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? "Setting up account..." : "Start Membership"}
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
