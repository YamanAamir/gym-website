import { AdminLayout } from "@/components/AdminLayout";
import { membershipPlans } from "@/components/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Check, DollarSign, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPlans() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [plans, setPlans] = useState(membershipPlans);

  const handleSave = () => {
    setEditingId(null);
    toast({
      title: "Plan Updated",
      description: "Membership plan has been updated successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              MANAGE <span className="text-gradient">PLANS</span>
            </h1>
            <p className="text-muted-foreground">Configure membership plans and pricing</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            Add Plan
          </Button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-card p-6 ${plan.popular ? "border-primary" : ""}`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl">{plan.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingId(editingId === plan.id ? null : plan.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              {editingId === plan.id ? (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-muted-foreground">Monthly Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={plan.monthlyPrice}
                        className="pl-8"
                        onChange={(e) => {
                          setPlans(plans.map(p =>
                            p.id === plan.id ? { ...p, monthlyPrice: parseInt(e.target.value) } : p
                          ));
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Yearly Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={plan.yearlyPrice}
                        className="pl-8"
                        onChange={(e) => {
                          setPlans(plans.map(p =>
                            p.id === plan.id ? { ...p, yearlyPrice: parseInt(e.target.value) } : p
                          ));
                        }}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-4xl text-primary">${plan.monthlyPrice}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    or ${plan.yearlyPrice}/year (save {Math.round((1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100)}%)
                  </div>
                </div>
              )}

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="glass-card p-6">
          <h2 className="font-display text-xl mb-4">PLAN DISTRIBUTION</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { plan: "Basic", count: 847, percentage: 33 },
              { plan: "Pro", count: 1203, percentage: 47 },
              { plan: "Elite", count: 497, percentage: 20 },
            ].map((stat) => (
              <div key={stat.plan} className="text-center">
                <p className="font-display text-3xl text-primary">{stat.count}</p>
                <p className="text-muted-foreground text-sm">{stat.plan} Members</p>
                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
