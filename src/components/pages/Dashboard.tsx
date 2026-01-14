import { DashboardLayout } from "@/components/DashboardLayout";
import { userAPI } from "@/lib/api/api";
import { Calendar, Clock, User, CreditCard, Dumbbell, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [trainer, setTrainer] = useState<any>(null);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const [dashboardRes, trainerRes, workoutRes] = await Promise.all([
          userAPI.getDashboard(),
          userAPI.getAssignedTrainer(),
          userAPI.getCurrentWorkoutPlan()
        ]);

        setUserData(dashboardRes.data);
        setTrainer(trainerRes.data);
        setWorkoutPlan(workoutRes.data);
      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  // Map backend fields or fallback to dummy-style defaults
  const user = userData || {};
  const plan = user.plan || {};
  const expiryDate = plan.expiryDate ? new Date(plan.expiryDate) : new Date();
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            WELCOME BACK, <span className="text-gradient">{(user.name || "User").split(" ")[0].toUpperCase()}</span>
          </h1>
          <p className="text-muted-foreground">Track your progress and stay on top of your fitness journey.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Current Plan</p>
                <p className="font-display text-2xl">{plan.name || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Billing</p>
                <p className="font-display text-2xl capitalize">{plan.type || "Monthly"}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Days Until Renewal</p>
                <p className="font-display text-2xl">{daysUntilExpiry > 0 ? daysUntilExpiry : 0}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Member Since</p>
                <p className="font-display text-2xl">
                  {user.memberSince
                    ? new Date(user.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Trainer */}
          <div className="glass-card p-6">
            <h2 className="font-display text-xl mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              YOUR TRAINER
            </h2>
            {trainer ? (
              <div className="flex items-center gap-4">
                <img
                  src={trainer.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-display text-lg">{trainer.name}</h3>
                  <p className="text-primary text-sm">{trainer.specialty}</p>
                  <p className="text-muted-foreground text-sm">{trainer.experience} experience</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No trainer assigned yet.</p>
            )}
          </div>

          {/* Today's Workout */}
          <div className="glass-card p-6 lg:col-span-2">
            <h2 className="font-display text-xl mb-4 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              THIS WEEK'S SCHEDULE
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {workoutPlan && Object.entries(workoutPlan).length > 0 ? (
                Object.entries(workoutPlan).map(([day, workout]: [string, any], index) => {
                  const isToday = new Date().getDay() === (index === 6 ? 0 : index + 1);
                  return (
                    <div
                      key={day}
                      className={`p-3 rounded-lg text-center ${isToday ? "bg-primary text-primary-foreground" : "bg-secondary"
                        }`}
                    >
                      <p className="text-xs uppercase mb-1">{day.slice(0, 3)}</p>
                      <p className={`text-xs ${isToday ? "text-primary-foreground" : "text-muted-foreground"}`}>
                        {String(workout).split(" ")[0] || "Rest"}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-7 py-4 text-center text-muted-foreground">
                  Workout plan not available.
                </div>
              )}
            </div>
            <Link to="/dashboard/workout">
              <Button variant="outline" className="w-full mt-4">
                View Full Workout Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* Membership Details */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-display text-xl mb-2">MEMBERSHIP DETAILS</h2>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Plan:</span>{" "}
                  <span className="font-medium">{plan.name || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>{" "}
                  <span className="font-medium">${plan.price || 0}/{plan.type === "yearly" ? "yr" : "mo"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Expires:</span>{" "}
                  <span className="font-medium">
                    {plan.expiryDate ? new Date(plan.expiryDate).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="hero">Upgrade Plan</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
