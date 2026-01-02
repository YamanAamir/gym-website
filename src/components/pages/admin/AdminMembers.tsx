import { AdminLayout } from "@/components/AdminLayout";
import { allMembers } from "@/components/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import { useState } from "react";

export default function AdminMembers() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMembers = allMembers.filter(
    member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              MANAGE <span className="text-gradient">MEMBERS</span>
            </h1>
            <p className="text-muted-foreground">View and manage all gym members</p>
          </div>
          <Button variant="hero">
            <UserPlus className="w-4 h-4" />
            Add Member
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Members Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left py-4 px-6 text-muted-foreground text-sm font-medium">Member</th>
                  <th className="text-left py-4 px-6 text-muted-foreground text-sm font-medium">Plan</th>
                  <th className="text-left py-4 px-6 text-muted-foreground text-sm font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-muted-foreground text-sm font-medium">Join Date</th>
                  <th className="text-right py-4 px-6 text-muted-foreground text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="font-display text-primary">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-muted-foreground text-sm">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        member.plan === "Elite" ? "bg-primary/20 text-primary" :
                        member.plan === "Pro" ? "bg-blue-500/20 text-blue-500" :
                        "bg-secondary text-secondary-foreground"
                      }`}>
                        {member.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        member.status === "Active" ? "bg-green-500/20 text-green-500" :
                        member.status === "Expired" ? "bg-red-500/20 text-red-500" :
                        "bg-yellow-500/20 text-yellow-500"
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{member.joinDate}</td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing {filteredMembers.length} of {allMembers.length} members
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
