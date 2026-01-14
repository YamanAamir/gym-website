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
  const [editingMemberId, setEditingMemberId] = useState<string | number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    membership_plan_id: "",
    billing_cycle: "monthly"
  });

  const [showPassword, setShowPassword] = useState(false);

  const fetchMembers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await adminAPI.listMembers();
      const data = res.data;
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

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      membership_plan_id: "",
      billing_cycle: "monthly"
    });
    setEditingMemberId(null);
  };

  const handleEditClick = (member: any) => {
    setEditingMemberId(member.id);
    setFormData({
      name: member.name || "",
      email: member.email || "",
      password: "", // Leave blank if not changing
      phone: member.phone || "",
      membership_plan_id: member.membership?.membership_plan_id?.toString() || "",
      billing_cycle: member.membership?.billing_cycle || "monthly"
    });
    setIsEditDialogOpen(true);
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (isEditDialogOpen && editingMemberId) {
        // Update logic
        const updateData = { ...formData };
        if (!updateData.password) delete (updateData as any).password;
        await adminAPI.updateMember(editingMemberId, updateData);
        toast({ title: "Success", description: "Member updated successfully" });
      } else {
        // Create logic
        await adminAPI.createMember(formData);
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
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan</Label>
                    <Select
                      value={formData.membership_plan_id}
                      onValueChange={(value) => setFormData({ ...formData, membership_plan_id: value })}
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
                  <div className="space-y-2">
                    <Label htmlFor="billing">Billing</Label>
                    <Select
                      value={formData.billing_cycle}
                      onValueChange={(value) => setFormData({ ...formData, billing_cycle: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
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
