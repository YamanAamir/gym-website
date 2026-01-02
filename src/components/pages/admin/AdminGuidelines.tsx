import { AdminLayout } from "@/components/AdminLayout";
import { fitnessGuidelines } from "@/components/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, Shield, Apple, Moon, Droplets, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const [guidelines, setGuidelines] = useState(fitnessGuidelines);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", category: "" });

  const handleEdit = (guideline: typeof fitnessGuidelines[0]) => {
    setEditingId(guideline.id);
    setEditForm({
      title: guideline.title,
      content: guideline.content,
      category: guideline.category,
    });
  };

  const handleSave = () => {
    setGuidelines(guidelines.map(g =>
      g.id === editingId ? { ...g, ...editForm } : g
    ));
    setEditingId(null);
    toast({
      title: "Guideline Updated",
      description: "The fitness guideline has been updated successfully.",
    });
  };

  const handleDelete = (id: number) => {
    setGuidelines(guidelines.filter(g => g.id !== id));
    toast({
      title: "Guideline Deleted",
      description: "The fitness guideline has been removed.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              MANAGE <span className="text-gradient">GUIDELINES</span>
            </h1>
            <p className="text-muted-foreground">Edit fitness and safety guidelines content</p>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            Add Guideline
          </Button>
        </div>

        {/* Guidelines List */}
        <div className="space-y-4">
          {guidelines.map((guideline) => (
            <div key={guideline.id} className="glass-card p-6">
              {editingId === guideline.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Input
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                    {iconMap[guideline.icon]}
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
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
