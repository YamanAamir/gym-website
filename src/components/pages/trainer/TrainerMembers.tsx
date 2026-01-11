import { TrainerLayout } from "@/components/TrainerLayout";
import { Users, Mail, Phone, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
import { trainerAPI } from "@/lib/api";

// Placeholder images
const memberImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
];

export default function TrainerMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await trainerAPI.listMembers();
        setMembers(response.data || []);
      } catch (error) {
        console.error("Error fetching members:", error);
        setMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <TrainerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            MY <span className="text-gradient">MEMBERS</span>
          </h1>
          <p className="text-muted-foreground">Members assigned to you for training</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Members</p>
                <p className="font-display text-2xl">{isLoading ? "..." : members.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active Sessions</p>
                <p className="font-display text-2xl">
                  {isLoading ? "..." : members.filter((m: any) => m.status === "Active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">New This Month</p>
                <p className="font-display text-2xl">
                  {isLoading ? "..." : members.filter((m: any) => {
                    const joinDate = new Date(m.joinDate || m.created_at);
                    const now = new Date();
                    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-display text-xl mb-2">No Members Assigned</h3>
            <p className="text-muted-foreground">You don't have any members assigned to you yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member: any, index: number) => (
              <div key={member.id || index} className="glass-card p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={memberImages[index % memberImages.length]}
                    alt={member.name || "Member"}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-lg mb-1">{member.name || "N/A"}</h3>
                    <p className="text-muted-foreground text-sm">
                      Member ID: {member.id || "N/A"}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    member.status === "Active" ? "bg-green-500/20 text-green-500" :
                    member.status === "Inactive" ? "bg-red-500/20 text-red-500" :
                    "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {member.status || "Active"}
                  </span>
                </div>

                <div className="space-y-2">
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.plan && (
                    <div className="mt-3">
                      <span className="bg-secondary px-3 py-1 rounded-full text-sm">
                        {member.plan}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TrainerLayout>
  );
}

