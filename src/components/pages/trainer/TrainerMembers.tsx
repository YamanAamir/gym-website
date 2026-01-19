import { TrainerLayout } from "@/components/TrainerLayout";
import { Users, Mail, Phone, Calendar, User, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { trainerAPI } from "@/lib/api/api";

export default function TrainerMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const response = await trainerAPI.listMembers();
        // The response is an array of members
        setMembers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching members:", error);
        setMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const memberImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  ];

  return (
    <TrainerLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            MY <span className="text-gradient">MEMBERS</span>
          </h1>
          <p className="text-muted-foreground">Detailed view of all members assigned to your training programs</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active Members</p>
                <p className="font-display text-2xl">{isLoading ? "..." : members.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Active Subscriptions</p>
                <p className="font-display text-2xl">
                  {isLoading ? "..." : members.filter((m: any) => m.membership?.status === "active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Sessions This Week</p>
                <p className="font-display text-2xl">{isLoading ? "..." : members.length * 3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : members.length === 0 ? (
          <div className="glass-card p-20 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h3 className="font-display text-xl mb-2">No Members Found</h3>
            <p className="text-muted-foreground">Once members are assigned to you by an admin, they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {members.map((member: any, index: number) => (
              <div key={member.id} className="glass-card overflow-hidden hover:border-primary/50 transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={memberImages[index % memberImages.length]}
                      alt={member.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-border/50"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl">{member.name}</h3>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${member.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                          }`}>
                          {member.status || "active"}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {member.email}
                      </p>
                      {member.membership?.plan && (
                        <div className="mt-3 inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          <CreditCard className="w-3 h-3" />
                          {member.membership.plan.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Billing Cycle</p>
                      <p className="text-sm capitalize">{member.membership?.billing_cycle || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Expiry Date</p>
                      <p className="text-sm">
                        {member.membership?.end_date
                          ? new Date(member.membership.end_date).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TrainerLayout>
  );
}
