import { PublicLayout } from "@/components/PublicLayout";
import { Award, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { publicAPI } from "@/lib/api/api";

export default function Trainers() {
    const [trainers, setTrainers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                setLoading(true);
                const response = await publicAPI.getTrainers();
                setTrainers(response.data.data);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    const displayTrainers = Array.isArray(trainers) ? trainers : [];
    const trainerFallback = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop";

    if (loading) {
        return (
            <PublicLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            {/* Hero */}
            <section className="section-padding bg-hero-gradient">
                <div className="container-custom px-4 md:px-8 text-center">
                    <h1 className="font-display text-5xl md:text-7xl mb-4 animate-fade-in">
                        MEET OUR <span className="text-gradient">TRAINERS</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        Our world-class trainers are dedicated to helping you achieve your fitness goals. Each brings unique expertise and a passion for transforming lives.
                    </p>
                </div>
            </section>

            {/* Trainers Grid */}
            <section className="section-padding">
                <div className="container-custom px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {displayTrainers.map((trainer: any, index: number) => (
                            <div
                                key={trainer.id}
                                className="glass-card overflow-hidden flex flex-col md:flex-row animate-fade-in"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="md:w-2/5">
                                    <img
                                        src={trainer.image || trainerFallback}
                                        alt={trainer.name}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star className="w-4 h-4 text-primary fill-primary" />
                                            <span className="text-sm text-primary font-medium">{trainer.trainer_profile?.specialty || "Fitness Coach"}</span>
                                        </div>
                                        <h3 className="font-display text-2xl mb-3">{trainer.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">{trainer.trainer_profile?.bio || "Expert fitness trainer dedicated to your success."}</p>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="w-4 h-4 text-primary" />
                                                {trainer.trainer_profile?.experience_years ? `${trainer.trainer_profile.experience_years} years experience` : "Certified Trainer"}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">Certifications</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {trainer.trainer_profile?.certifications ? (
                                                (typeof trainer.trainer_profile.certifications === 'string'
                                                    ? trainer.trainer_profile.certifications.split(',')
                                                    : trainer.trainer_profile.certifications
                                                ).map((cert: string) => (
                                                    <span
                                                        key={cert}
                                                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
                                                    >
                                                        {cert.trim()}
                                                    </span>
                                                ))) : (
                                                <span className="text-xs text-muted-foreground">Professional Certifications</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
