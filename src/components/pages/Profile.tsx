import { DashboardLayout } from "@/components/DashboardLayout";
import { currentUser } from "@/components/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, CreditCard, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
  });

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            PROFILE <span className="text-gradient">SETTINGS</span>
          </h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-accent-gradient rounded-full flex items-center justify-center">
              <span className="font-display text-3xl text-primary-foreground">
                {currentUser.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <h2 className="font-display text-xl">{currentUser.name}</h2>
              <p className="text-primary">{currentUser.plan.name} Member</p>
              <p className="text-muted-foreground text-sm">
                Member since {new Date(currentUser.memberSince).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <Button variant="hero" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Membership Info */}
        <div className="glass-card p-6">
          <h3 className="font-display text-xl mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            MEMBERSHIP
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Current Plan</p>
              <p className="font-display text-xl">{currentUser.plan.name}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Billing Cycle</p>
              <p className="font-display text-xl capitalize">{currentUser.plan.type}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Start Date</p>
              <p className="font-display text-xl">{new Date(currentUser.plan.startDate).toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Renewal Date</p>
              <p className="font-display text-xl">{new Date(currentUser.plan.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Manage Subscription
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 border-destructive/50">
          <h3 className="font-display text-xl mb-2 text-destructive">DANGER ZONE</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
