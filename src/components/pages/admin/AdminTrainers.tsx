import { AdminLayout } from "@/components/AdminLayout";
import { adminAPI } from "@/lib/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Award, Clock, Loader2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

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
import { useToast } from "@/hooks/use-toast";

// Placeholder images - for trainers without an image
const trainerFallback = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop";

export default function AdminTrainers() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [trainersList, setTrainersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTrainerId, setEditingTrainerId] = useState<string | number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    bio: "",
    experience_years: "",
    certifications: ""
  });

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.listTrainers();
      setTrainersList(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      specialty: "",
      bio: "",
      experience_years: "",
      certifications: ""
    });
    setEditingTrainerId(null);
  };

  const handleEditClick = (trainer: any) => {
    setEditingTrainerId(trainer.id);
    setFormData({
      name: trainer.name || "",
      email: trainer.email || "",
      password: "",
      specialty: trainer.trainer_profile?.specialty || "",
      bio: trainer.trainer_profile?.bio || "",
      experience_years: trainer.trainer_profile?.experience_years?.toString() || "",
      certifications: trainer.trainer_profile?.certifications || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleAddTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (isEditDialogOpen && editingTrainerId) {
        // Update logic
        const updateData = { ...formData };
        if (!updateData.password) delete (updateData as any).password;
        await adminAPI.updateTrainer(editingTrainerId, updateData);
        toast({ title: "Success", description: "Trainer updated successfully" });
      } else {
        // Create logic
        await adminAPI.createTrainer(formData);
        toast({ title: "Success", description: "Trainer added successfully" });
      }

      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      resetForm();
      fetchTrainers();
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

  const handleDeleteTrainer = async (id: number | string) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await adminAPI.deleteTrainer(id);
        toast({ title: "Deleted", description: "Trainer has been removed" });
        fetchTrainers();
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete trainer", variant: "destructive" });
      }
    }
  };

  const filteredTrainers = trainersList.filter(
    trainer =>
      trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.trainer_profile?.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              MANAGE <span className="text-gradient">TRAINERS</span>
            </h1>
            <p className="text-muted-foreground">Add, edit, and manage trainer profiles</p>
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
                Add Trainer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isEditDialogOpen ? "Edit Trainer Profile" : "Add New Trainer"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTrainer} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tName">Name</Label>
                    <Input
                      id="tName"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tEmail">Email</Label>
                    <Input
                      id="tEmail"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tPassword">Password {isEditDialogOpen && "(Leave blank to keep current)"}</Label>
                  <div className="relative">
                    <Input
                      id="tPassword"
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      placeholder="e.g. Bodybuilding"
                      required
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      required
                      value={formData.experience_years}
                      onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tBio">Biography</Label>
                  <Textarea
                    id="tBio"
                    placeholder="Short bio about the trainer..."
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certs">Certifications (Comma separated)</Label>
                  <Input
                    id="certs"
                    placeholder="e.g. NASM, CrossFit L2"
                    value={formData.certifications}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : (isEditDialogOpen ? "Update Trainer" : "Add Trainer")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search trainers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Trainers Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer) => (
                <div key={trainer.id} className="glass-card overflow-hidden flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img
                      src={trainer.image || trainerFallback}
                      alt={trainer.name}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 sm:w-2/3 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-xl">{trainer.name}</h3>
                          <p className="text-primary text-sm">{trainer.trainer_profile?.specialty || "Fitness Coach"}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditClick(trainer)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteTrainer(trainer.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {trainer.trainer_profile?.bio || "No biography provided."}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          {trainer.trainer_profile?.experience_years ? `${trainer.trainer_profile.experience_years} years exp.` : "New Trainer"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Certifications</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {trainer.trainer_profile?.certifications ? (
                          (typeof trainer.trainer_profile.certifications === 'string'
                            ? trainer.trainer_profile.certifications.split(',')
                            : trainer.trainer_profile.certifications
                          ).map((cert: string) => (
                            <span
                              key={cert}
                              className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs"
                            >
                              {cert.trim()}
                            </span>
                          ))) : (
                          <span className="text-xs text-muted-foreground">No certifications listed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-10 text-center text-muted-foreground">
                No trainers found.
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
