import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function Login() {
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
      // const res = await authAPI.googleLogin({ token: response.credential });

      toast({
        title: "Google Login Successful",
        description: "Welcome back! Redirecting...",
      });

      // Simulate backend login for demo purposes
      localStorage.setItem('userToken', 'google-mock-token');
      localStorage.setItem('user', JSON.stringify({ name: "Google User", email: "user@gmail.com" }));

      setTimeout(() => navigate("/dashboard"), 1000);
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
        description: "Google Login is still loading. Please wait a moment.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.userLogin({ email, password });

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));

        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to your dashboard...",
        });

        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard");
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

          <h1 className="font-display text-4xl mb-2">WELCOME BACK</h1>
          <p className="text-muted-foreground mb-8">Sign in to access your dashboard and continue your fitness journey.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="john@example.com"
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
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
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

          <p className="text-center text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>

          <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
            <Link to="/trainer/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Trainer Login →
            </Link>
            <Link to="/admin/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Admin Login →
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-12">
            <h2 className="font-display text-6xl text-foreground mb-4">
              PUSH<br />YOUR<br /><span className="text-gradient">LIMITS</span>
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Track your progress, connect with trainers, and achieve your fitness goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
