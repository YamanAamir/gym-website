import { AdminLayout } from "@/components/AdminLayout";
import { adminAPI } from "@/lib/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Check, DollarSign, Save, Loader2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPlans() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<number | string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    monthlyPrice: "",
    yearlyPrice: "",
    features: "",
    isPopular: false
  });

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.listPlans();
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      monthlyPrice: "",
      yearlyPrice: "",
      features: "",
      isPopular: false
    });
    setEditingPlanId(null);
  };

  const handleEditClick = (plan: any) => {
    setEditingPlanId(plan.id);
    setFormData({
      name: plan.name || "",
      monthlyPrice: plan.monthly_price?.toString() || "",
      yearlyPrice: plan.yearly_price?.toString() || "",
      features: Array.isArray(plan.features) ? plan.features.join("\n") : (typeof plan.features === 'string' ? plan.features.replace(/,/g, '\n') : ""),
      isPopular: plan.is_popular === 1 || plan.is_popular === true
    });
    setIsEditDialogOpen(true);
  };

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const featuresArray = formData.features.split("\n").map(f => f.trim()).filter(f => f !== "");

      const planData = {
        name: formData.name,
        features: featuresArray,
        monthly_price: formData.monthlyPrice,
        yearly_price: formData.yearlyPrice,
        is_popular: formData.isPopular ? 1 : 0
      };

      if (isEditDialogOpen && editingPlanId) {
        await adminAPI.updatePlan(editingPlanId, planData);
        toast({ title: "Success", description: "Plan updated successfully" });
      } else {
        await adminAPI.createPlan(planData);
        toast({ title: "Success", description: "Plan added successfully" });
      }

      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      resetForm();
      fetchPlans();
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

  const handleDeletePlan = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await adminAPI.deletePlan(id);
        toast({ title: "Deleted", description: "Plan removed successfully" });
        fetchPlans();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete plan", variant: "destructive" });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              MANAGE <span className="text-gradient">PLANS</span>
            </h1>
            <p className="text-muted-foreground">Configure membership plans and pricing</p>
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
                <Plus className="w-4 h-4" />
                Add Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isEditDialogOpen ? "Edit Membership Plan" : "Add New Membership Plan"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddPlan} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="planName">Plan Name</Label>
                  <Input
                    id="planName"
                    placeholder="e.g. Elite Performance"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mPrice">Monthly Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="mPrice"
                        type="number"
                        className="pl-8"
                        required
                        value={formData.monthlyPrice}
                        onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yPrice">Yearly Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="yPrice"
                        type="number"
                        className="pl-8"
                        required
                        value={formData.yearlyPrice}
                        onChange={(e) => setFormData({ ...formData, yearlyPrice: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features">Features (One per line)</Label>
                  <Textarea
                    id="features"
                    placeholder="24/7 Access&#10;Personal Trainer&#10;Spa Access"
                    className="min-h-[100px]"
                    required
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  />
                  <Label htmlFor="isPopular" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mark as Most Popular
                  </Label>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : (isEditDialogOpen ? "Update Plan" : "Create Plan")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Plans Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.length > 0 ? (
              plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`glass-card p-6 ${(plan.is_popular === 1 || plan.is_popular === true) ? "border-primary shadow-glow" : ""}`}
                >
                  {(plan.is_popular === 1 || plan.is_popular === true) && (
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-2xl">{plan.name}</h3>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(plan)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-display text-4xl text-primary">${plan.monthly_price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      or ${plan.yearly_price}/year
                      {plan.monthly_price > 0 && ` (save ${Math.round((1 - plan.yearly_price / (plan.monthly_price * 12)) * 100)}%)`}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {Array.isArray(plan.features) ? plan.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    )) : (typeof plan.features === 'string' && plan.features.split(',').map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{feature.trim()}</span>
                      </li>
                    )))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-10 text-center text-muted-foreground">
                No plans found.
              </div>
            )}
          </div>
        )}

        {/* Stats Placeholder */}
        {!loading && plans.length > 0 && (
          <div className="glass-card p-6">
            <h2 className="font-display text-xl mb-4">PLAN DISTRIBUTION</h2>
            <div className="grid grid-cols-3 gap-4">
              {plans.slice(0, 3).map((plan) => (
                <div key={plan.id} className="text-center">
                  <p className="font-display text-3xl text-primary">{Math.floor(Math.random() * 1000)}</p>
                  <p className="text-muted-foreground text-sm">{plan.name} Members</p>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.floor(Math.random() * 60 + 20)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
