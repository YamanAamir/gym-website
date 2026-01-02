import { DashboardLayout } from "@/components/DashboardLayout";
import { currentUser, trainers } from "@/components/lib/data";
import { Calendar, Clock, User, CreditCard, Dumbbell, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Placeholder image - replace with actual image when available
const trainer1 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop";

export default function Dashboard() {
  const daysUntilExpiry = Math.ceil(
    (new Date(currentUser.plan.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            WELCOME BACK, <span className="text-gradient">{currentUser.name.split(" ")[0].toUpperCase()}</span>
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
                <p className="font-display text-2xl">{currentUser.plan.name}</p>
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
                <p className="font-display text-2xl capitalize">{currentUser.plan.type}</p>
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
                <p className="font-display text-2xl">{daysUntilExpiry}</p>
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
                  {new Date(currentUser.memberSince).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
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
            <div className="flex items-center gap-4">
              <img
                src={trainer1}
                alt={currentUser.trainer.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-display text-lg">{currentUser.trainer.name}</h3>
                <p className="text-primary text-sm">{currentUser.trainer.specialty}</p>
                <p className="text-muted-foreground text-sm">{currentUser.trainer.experience} experience</p>
              </div>
            </div>
          </div>

          {/* Today's Workout */}
          <div className="glass-card p-6 lg:col-span-2">
            <h2 className="font-display text-xl mb-4 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              THIS WEEK'S SCHEDULE
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {Object.entries(currentUser.workoutPlan).map(([day, workout], index) => {
                const isToday = new Date().getDay() === (index === 6 ? 0 : index + 1);
                return (
                  <div
                    key={day}
                    className={`p-3 rounded-lg text-center ${
                      isToday ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    <p className="text-xs uppercase mb-1">{day.slice(0, 3)}</p>
                    <p className={`text-xs ${isToday ? "text-primary-foreground" : "text-muted-foreground"}`}>
                      {workout.split(" ")[0]}
                    </p>
                  </div>
                );
              })}
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
                  <span className="font-medium">{currentUser.plan.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>{" "}
                  <span className="font-medium">${currentUser.plan.price}/{currentUser.plan.type === "yearly" ? "yr" : "mo"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Expires:</span>{" "}
                  <span className="font-medium">{new Date(currentUser.plan.expiryDate).toLocaleDateString()}</span>
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
