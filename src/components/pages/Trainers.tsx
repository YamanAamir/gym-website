import { PublicLayout } from "@/components/PublicLayout";
import { trainers } from "@/components/lib/data";
import { Award, Clock, Star } from "lucide-react";
// Placeholder images - replace with actual images when available
// const trainerImages = [
//   "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
//   "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=400&fit=crop",
//   "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
//   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
// ];

export default function Trainers() {
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
            {trainers.map((trainer, index) => (
              <div
                key={trainer.id}
                className="glass-card overflow-hidden flex flex-col md:flex-row animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="md:w-2/5">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-sm text-primary font-medium">{trainer.specialty}</span>
                    </div>
                    <h3 className="font-display text-2xl mb-3">{trainer.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{trainer.bio}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {trainer.experience}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
                        >
                          {cert}
                        </span>
                      ))}
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
