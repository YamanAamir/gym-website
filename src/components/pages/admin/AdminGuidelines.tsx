import { AdminLayout } from "@/components/AdminLayout";
import { adminAPI } from "@/lib/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, Shield, Apple, Moon, Droplets, Target, TrendingUp, Loader2 } from "lucide-react";
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

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-6 h-6" />,
  Apple: <Apple className="w-6 h-6" />,
  Moon: <Moon className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
};

export default function AdminGuidelines() {
  const { toast } = useToast();
  const [guidelines, setGuidelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    icon: "Shield"
  });
  const mockGuidelines = [
    {
      id: 1,
      title: "Maintain Proper Hygiene",
      content: "Always clean gym equipment before and after use to prevent the spread of germs and infections.",
      category: "Safety",
      icon: "Shield"
    },
    {
      id: 2,
      title: "Balanced Diet Intake",
      content: "Include proteins, carbs, and healthy fats in your daily diet to support muscle recovery and growth.",
      category: "Diet",
      icon: "Apple"
    },
    {
      id: 3,
      title: "Adequate Sleep",
      content: "Ensure 7–8 hours of quality sleep daily to allow your body to recover and perform optimally.",
      category: "Lifestyle",
      icon: "Moon"
    },
    {
      id: 4,
      title: "Stay Hydrated",
      content: "Drink water before, during, and after workouts to maintain hydration and improve performance.",
      category: "Health",
      icon: "Droplets"
    },
    {
      id: 5,
      title: "Set Clear Fitness Goals",
      content: "Define realistic and achievable fitness goals to stay motivated and track progress effectively.",
      category: "Motivation",
      icon: "Target"
    },
    {
      id: 6,
      title: "Track Your Progress",
      content: "Regularly monitor your workouts and body measurements to evaluate improvement over time.",
      category: "Progress",
      icon: "TrendingUp"
    }
  ];

  const fetchGuidelines = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.listGuidelines();
      setGuidelines(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching guidelines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const handleEdit = (guideline: any) => {
    setEditingId(guideline.id);
    setFormData({
      title: guideline.title || "",
      content: guideline.content || "",
      category: guideline.category || "",
      icon: guideline.icon || "Shield"
    });
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", category: "", icon: "Shield" });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editingId) {
        await adminAPI.updateGuideline(editingId, formData);
        toast({ title: "Success", description: "Guideline updated successfully" });
      } else {
        await adminAPI.createGuideline(formData);
        toast({ title: "Success", description: "Guideline added successfully" });
      }
      setIsAddDialogOpen(false);
      resetForm();
      fetchGuidelines();
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

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this guideline?")) {
      try {
        await adminAPI.deleteGuideline(id);
        toast({ title: "Deleted", description: "Guideline removed successfully" });
        fetchGuidelines();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete guideline", variant: "destructive" });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              MANAGE <span className="text-gradient">GUIDELINES</span>
            </h1>
            <p className="text-muted-foreground">Edit fitness and safety guidelines content</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            if (!open) {
              setIsAddDialogOpen(false);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                Add Guideline
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Guideline</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    required
                    placeholder="e.g. Safety, Diet, etc."
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon Name</Label>
                  <Input
                    id="icon"
                    placeholder="Shield, Apple, Moon, etc."
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Create Guideline"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Guidelines List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {guidelines.length > 0 ? (
              guidelines.map((guideline) => (
                <div key={guideline.id} className="glass-card p-6">
                  {editingId === guideline.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Title</label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Category</label>
                          <Input
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <Textarea
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                          <Save className="w-4 h-4" />
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button variant="outline" onClick={() => resetForm()}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0 text-2xl">
                        {iconMap[guideline.icon] || <Shield className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs text-primary font-medium uppercase tracking-wider">
                              {guideline.category}
                            </span>
                            <h3 className="font-display text-lg">{guideline.title}</h3>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(guideline)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(guideline.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-2">{guideline.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-muted-foreground">
                No guidelines found.
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
