import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dumbbell, LayoutDashboard, User, LogOut, Dna, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Workout Plan", href: "/dashboard/workout", icon: Dna },
  { label: "Nutrition", href: "/dashboard/nutrition", icon: Apple },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

import { authAPI } from "@/lib/api/api";

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem('userToken');
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl tracking-wide">VENOM</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-gradient rounded-lg flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg">VENOM</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
        <nav className="flex overflow-x-auto pb-2 px-2 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:p-8 p-4 pt-32 md:pt-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
