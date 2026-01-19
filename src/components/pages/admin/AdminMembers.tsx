import { AdminLayout } from "@/components/AdminLayout";
import { adminAPI } from "@/lib/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, UserPlus, Loader2, Trash2, Edit2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminMembers() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | number | null>(null);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    plan_id: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const fetchMembers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await adminAPI.listMembers();
      const data = res.data.data;
      if (data && data.data) {
        setMembers(data.data);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total,
          per_page: data.per_page,
          from: data.from,
          to: data.to
        });
      } else {
        setMembers(Array.isArray(res.data) ? res.data : []);
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await adminAPI.listPlans();
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await adminAPI.listTrainers();
      setTrainers(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Failed to fetch trainers:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
    fetchTrainers();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      plan_id: "",
    });
    setEditingMemberId(null);
  };

  const handleEditClick = (member: any) => {
    setEditingMemberId(member.id);
    setFormData({
      name: member.name || "",
      email: member.email || "",
      password: "", // Leave blank if not changing
      plan_id: member.membership?.plan_id?.toString() || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (isEditDialogOpen && editingMemberId) {
        // Update logic
        const updateData = {
          ...formData,
          plan_id: formData.plan_id ? parseInt(formData.plan_id) : undefined
        };
        if (!updateData.password) delete (updateData as any).password;
        await adminAPI.updateMember(editingMemberId, updateData);
        toast({ title: "Success", description: "Member updated successfully" });
      } else {
        // Create logic
        const payload = {
          ...formData,
          plan_id: parseInt(formData.plan_id)
        };
        await adminAPI.createMember(payload);
        toast({ title: "Success", description: "Member added successfully" });
      }

      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      resetForm();
      fetchMembers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Operation failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignTrainer = async () => {
    if (!editingMemberId || !selectedTrainerId) return;
    try {
      setIsSubmitting(true);
      await adminAPI.assignTrainerToMember(editingMemberId, selectedTrainerId);
      toast({ title: "Success", description: "Trainer assigned successfully" });
      setIsAssignDialogOpen(false);
      setSelectedTrainerId("");
      fetchMembers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Assignment failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await adminAPI.deleteMember(id);
        toast({
          title: "Deleted",
          description: "Member has been removed",
        });
        fetchMembers();
      } catch (error) {
        console.error("Failed to delete member:", error);
        toast({
          title: "Error",
          description: "Failed to delete member",
          variant: "destructive",
        });
      }
    }
  };

  const filteredMembers = members.filter(
    member =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              MANAGE <span className="text-gradient">MEMBERS</span>
            </h1>
            <p className="text-muted-foreground">View and manage all gym members</p>
          </div>

          <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setIsAddDialogOpen(false);
              setIsEditDialogOpen(false);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={() => setIsAddDialogOpen(true)}>
                <UserPlus className="w-4 h-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isEditDialogOpen ? "Edit Member" : "Add New Member"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password {isEditDialogOpen && "(Leave blank to keep current)"}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required={!isEditDialogOpen}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan</Label>
                    <Select
                      value={formData.plan_id}
                      onValueChange={(value) => setFormData({ ...formData, plan_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id.toString()}>
                            {plan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : (isEditDialogOpen ? "Update Member" : "Add Member")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Assign Trainer Dialog */}
          <Dialog open={isAssignDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setIsAssignDialogOpen(false);
              setSelectedTrainerId("");
            }
          }}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Assign Trainer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Trainer</Label>
                  <Select
                    value={selectedTrainerId}
                    onValueChange={(value) => setSelectedTrainerId(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                          {trainer.name} ({trainer.trainer_profile?.specialty || "Fitness Coach"})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="w-full"
                  onClick={handleAssignTrainer}
                  disabled={isSubmitting || !selectedTrainerId}
                >
                  {isSubmitting ? "Assigning..." : "Confirm Assignment"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
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
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr key={member.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="font-display text-primary uppercase">
                                {member.name ? member.name.split(" ").map((n: string) => n[0]).join("") : "?"}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-muted-foreground text-sm">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm capitalize ${member.membership?.plan?.name?.includes("Elite") ? "bg-primary/20 text-primary" :
                            member.membership?.plan?.name?.includes("Pro") ? "bg-blue-500/20 text-blue-500" :
                              "bg-secondary text-secondary-foreground"
                            }`}>
                            {member.membership?.plan?.name || "No Plan"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm capitalize ${member.status?.toLowerCase() === "active" ? "bg-green-500/20 text-green-500" :
                            member.status?.toLowerCase() === "expired" ? "bg-red-500/20 text-red-500" :
                              "bg-yellow-500/20 text-yellow-500"
                            }`}>
                            {member.status || "Pending"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {member.created_at ? new Date(member.created_at).toLocaleDateString() : (member.joined_at ? new Date(member.joined_at).toLocaleDateString() : "N/A")}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2" onClick={() => handleEditClick(member)}>
                                <Edit2 className="w-4 h-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" onClick={() => {
                                setEditingMemberId(member.id);
                                setSelectedTrainerId(member.trainer_id?.toString() || "");
                                setIsAssignDialogOpen(true);
                              }}>
                                <UserPlus className="w-4 h-4" /> Assign Trainer
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 text-destructive focus:text-destructive"
                                onClick={() => handleDeleteMember(member.id)}
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-muted-foreground">
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {pagination ? `Showing ${pagination.from || 0} to ${pagination.to || 0} of ${pagination.total} members` : `Showing ${filteredMembers.length} members`}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination || pagination.current_page === 1}
              onClick={() => fetchMembers(pagination.current_page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination || pagination.current_page === pagination.last_page}
              onClick={() => fetchMembers(pagination.current_page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
