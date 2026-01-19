import { TrainerLayout } from "@/components/TrainerLayout";
import { Users, Calendar, TrendingUp, Target, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { trainerAPI } from "@/lib/api/api";

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = {
    assignedMembers: dashboardData?.assigned_members || 0,
    activePlans: dashboardData?.active_plans || 0,
    recentMembers: dashboardData?.recent_members || [],
  };

  return (
    <TrainerLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            TRAINER <span className="text-gradient">DASHBOARD</span>
          </h1>
          <p className="text-muted-foreground">Overview of your training activities and members</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">Assigned Members</p>
            <p className="font-display text-3xl">{isLoading ? "..." : stats.assignedMembers}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">Active Plans</p>
            <p className="font-display text-3xl">{isLoading ? "..." : stats.activePlans}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">Member Progress Rate</p>
            <p className="font-display text-3xl">{isLoading ? "..." : "85%"}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/trainer/members" className="glass-card p-6 hover:border-primary/50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-lg mb-1">My Members</h3>
                <p className="text-muted-foreground text-sm">View and manage all assigned gym enthusiasts</p>
              </div>
            </div>
          </Link>

          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-display text-lg mb-1">Active Updates</h3>
                <p className="text-muted-foreground text-sm">
                  {isLoading ? "Loading..." : `${stats.activePlans} members have active plans`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Members */}
        <div className="glass-card p-6">
          <h2 className="font-display text-xl mb-4">RECENTLY ASSIGNED MEMBERS</h2>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-6 text-muted-foreground italic">Fetching members...</div>
            ) : stats.recentMembers.length > 0 ? (
              stats.recentMembers.map((member: any) => (
                <div key={member.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-border/50">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-display text-primary">
                    {member.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{member.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {member.email}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${member.status === "active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                    {member.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">No recent members found.</div>
            )}
          </div>
        </div>
      </div>
    </TrainerLayout>
  );
}
