import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Mail, Lock, ArrowRight, Users, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { authAPI } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function TrainerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      // const res = await authAPI.googleLogin({ token: response.credential, role: 'trainer' });

      toast({
        title: "Google Login Successful",
        description: "Welcome back, Coach! Redirecting...",
      });

      // Simulate backend login for demo purposes
      localStorage.setItem('trainerToken', 'google-mock-token');
      localStorage.setItem('trainer', JSON.stringify({ name: "Google Trainer", email: "coach@gmail.com" }));

      setTimeout(() => navigate("/trainer/dashboard"), 1000);
    } catch (error) {
      toast({
        title: "Google Login Failed",
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
    setIsLoading(true);

    try {
      const response = await authAPI.trainerLogin({ email, password });

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('trainerToken', response.data.token);
        localStorage.setItem('trainer', JSON.stringify(response.data.trainer || {}));

        toast({
          title: "Trainer Login Successful",
          description: "Welcome! Redirecting to trainer dashboard...",
        });

        // Navigate to trainer dashboard after a short delay
        setTimeout(() => {
          navigate("/trainer/dashboard");
        }, 500);
      } else {
        throw new Error("No token received");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-accent-gradient rounded-lg flex items-center justify-center">
              <Dumbbell className="w-7 h-7 text-primary-foreground" />
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">TRAINER ACCESS</span>
          </div>
          <h1 className="font-display text-4xl">TRAINER LOGIN</h1>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Trainer Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="trainer@VENOMfitness.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Accessing..." : "Access Dashboard"}
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
              Sign in with Google
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground mt-6">
          <Link to="/login" className="text-primary hover:underline">← Back to Member Login</Link>
        </p>
      </div>
    </div>
  );
}


