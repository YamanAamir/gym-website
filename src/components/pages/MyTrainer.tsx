import { DashboardLayout } from "@/components/DashboardLayout";
import { userAPI } from "@/lib/api/api";
import { User, Mail, Award, Clock, Star, Loader2, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function MyTrainer() {
    const [trainerData, setTrainerData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                setLoading(true);
                const response = await userAPI.getAssignedTrainer();
                // The mock provided has "data" or direct object. Let's check structure.
                // User provided: { "message": "...", "data": { "id": 16, "name": "...", "trainer_profile": { ... } } }
                setTrainerData(response.data.data);
            } catch (error) {
                console.error("Error fetching trainer details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainer();
    }, []);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    if (!trainerData) {
        return (
            <DashboardLayout>
                <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-xl mb-2">No Trainer Assigned</h3>
                    <p className="text-muted-foreground">Contact administration to get matched with a professional coach.</p>
                </div>
            </DashboardLayout>
        );
    }

    const profile = trainerData.trainer_profile || {};
    const certifications = profile.certifications || [];

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h1 className="font-display text-3xl md:text-4xl mb-2">
                        MY <span className="text-gradient">TRAINER</span>
                    </h1>
                    <p className="text-muted-foreground">Expert guidance on your fitness journey.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Trainer Card */}
                    <div className="lg:col-span-1">
                        <div className="glass-card overflow-hidden">
                            <div className="aspect-square relative">
                                <img
                                    src={profile.profile_image_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"}
                                    alt={trainerData.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background p-6">
                                    <h2 className="font-display text-2xl text-foreground">{trainerData.name}</h2>
                                    <p className="text-primary font-medium">{profile.specialty}</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Mail className="w-4 h-4 text-primary" />
                                    {trainerData.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 text-primary" />
                                    {profile.experience_years} Years Experience
                                </div>
                                {/* <Button className="w-full gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Send Message
                                </Button> */}
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-primary" />
                                BIOGRAPHY
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {profile.bio || "No biography provided."}
                            </p>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-primary" />
                                CERTIFICATIONS
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {certifications.length > 0 ? (
                                    certifications.map((cert: string) => (
                                        <span
                                            key={cert}
                                            className="bg-secondary text-foreground px-4 py-2 rounded-xl text-sm font-medium border border-border"
                                        >
                                            {cert}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm italic">Certified Excellence</p>
                                )}
                            </div>
                        </div>

                        {/* Success Quote */}
                        <div className="bg-accent-gradient p-8 rounded-2xl text-primary-foreground">
                            <h3 className="font-display text-2xl mb-2">"STRENGTH DOES NOT COME FROM WINNING."</h3>
                            <p className="opacity-80">— Your Coach's Philosophy</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
