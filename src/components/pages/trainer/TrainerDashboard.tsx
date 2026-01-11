import { TrainerLayout } from "@/components/TrainerLayout";
import { Users, Calendar, TrendingUp, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { trainerAPI } from "@/lib/api";

export default function TrainerDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await trainerAPI.getDashboard();
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        // Set default data if API fails
        setDashboardData({
          totalMembers: 0,
          activeSessions: 0,
          upcomingSessions: 0,
          performance: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = dashboardData || {
    totalMembers: 0,
    activeSessions: 0,
    upcomingSessions: 0,
    performance: 0,
  };

  return (
    <TrainerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            TRAINER <span className="text-gradient">DASHBOARD</span>
          </h1>
          <p className="text-muted-foreground">Overview of your training activities and members</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Total Members</p>
            <p className="font-display text-3xl">{isLoading ? "..." : stats.totalMembers || 0}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Active Sessions</p>
            <p className="font-display text-3xl">{isLoading ? "..." : stats.activeSessions || 0}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Upcoming Sessions</p>
            <p className="font-display text-3xl">{isLoading ? "..." : stats.upcomingSessions || 0}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Performance</p>
            <p className="font-display text-3xl">{isLoading ? "..." : `${stats.performance || 0}%`}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/trainer/members" className="glass-card p-6 hover:border-primary/50 transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-1">My Members</h3>
                  <p className="text-muted-foreground text-sm">View and manage your assigned members</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-display text-lg mb-1">Today's Schedule</h3>
                <p className="text-muted-foreground text-sm">
                  {isLoading ? "Loading..." : `You have ${stats.upcomingSessions || 0} sessions today`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h2 className="font-display text-xl mb-4">RECENT ACTIVITY</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">No recent activity</p>
                <p className="text-muted-foreground text-sm">Your recent training sessions will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TrainerLayout>
  );
}

