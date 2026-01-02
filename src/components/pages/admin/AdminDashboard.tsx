import { AdminLayout } from "@/components/AdminLayout";
import { adminStats, allMembers } from "@/components/lib/data";
import { Users, DollarSign, UserPlus, Dumbbell, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            ADMIN <span className="text-gradient">DASHBOARD</span>
          </h1>
          <p className="text-muted-foreground">Overview of your gym's performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <span className="flex items-center text-green-500 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12%
              </span>
            </div>
            <p className="text-muted-foreground text-sm">Total Members</p>
            <p className="font-display text-3xl">{adminStats.totalMembers.toLocaleString()}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <span className="flex items-center text-green-500 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8%
              </span>
            </div>
            <p className="text-muted-foreground text-sm">Monthly Revenue</p>
            <p className="font-display text-3xl">${adminStats.monthlyRevenue.toLocaleString()}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <span className="flex items-center text-green-500 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +23%
              </span>
            </div>
            <p className="text-muted-foreground text-sm">New This Month</p>
            <p className="font-display text-3xl">{adminStats.newMembersThisMonth}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Active Trainers</p>
            <p className="font-display text-3xl">{adminStats.trainersCount}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/members" className="glass-card p-6 hover:border-primary/50 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg mb-1">Manage Members</h3>
                <p className="text-muted-foreground text-sm">View and edit member accounts</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
          <Link to="/admin/trainers" className="glass-card p-6 hover:border-primary/50 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg mb-1">Manage Trainers</h3>
                <p className="text-muted-foreground text-sm">Add or update trainer profiles</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
          <Link to="/admin/plans" className="glass-card p-6 hover:border-primary/50 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg mb-1">Manage Plans</h3>
                <p className="text-muted-foreground text-sm">Edit membership pricing</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </div>

        {/* Recent Members */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl">RECENT MEMBERS</h2>
            <Link to="/admin/members" className="text-primary text-sm hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm font-medium">Plan</th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {allMembers.slice(0, 5).map((member) => (
                  <tr key={member.id} className="border-b border-border/50 hover:bg-secondary/50">
                    <td className="py-3 px-4 font-medium">{member.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{member.email}</td>
                    <td className="py-3 px-4">
                      <span className="bg-secondary px-3 py-1 rounded-full text-sm">{member.plan}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        member.status === "Active" ? "bg-green-500/20 text-green-500" :
                        member.status === "Expired" ? "bg-red-500/20 text-red-500" :
                        "bg-yellow-500/20 text-yellow-500"
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{member.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
