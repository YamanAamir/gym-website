import { PublicLayout } from "@/components/PublicLayout";
import { fitnessGuidelines } from "@/components/lib/data";
import { Shield, Apple, Moon, Droplets, Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-8 h-8" />,
  Apple: <Apple className="w-8 h-8" />,
  Moon: <Moon className="w-8 h-8" />,
  Droplets: <Droplets className="w-8 h-8" />,
  Target: <Target className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
};

const safetyTips = [
  "Always warm up before starting any exercise routine",
  "Stay hydrated throughout your workout",
  "Use proper form to prevent injuries",
  "Listen to your body and rest when needed",
  "Ask a trainer if you're unsure about any exercise",
  "Wipe down equipment after use",
  "Don't skip your cool-down stretches",
  "Report any equipment issues to staff immediately",
];

export default function Guidelines() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="section-padding bg-hero-gradient">
        <div className="container-custom px-4 md:px-8 text-center">
          <h1 className="font-display text-5xl md:text-7xl mb-4 animate-fade-in">
            FITNESS <span className="text-gradient">GUIDELINES</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Expert advice and best practices to maximize your results while staying safe and healthy.
          </p>
        </div>
      </section>

      {/* Guidelines Grid */}
      <section className="section-padding">
        <div className="container-custom px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">
            ESSENTIAL <span className="text-gradient">TIPS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fitnessGuidelines.map((guideline, index) => (
              <div
                key={guideline.id}
                className="stat-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-primary shrink-0">
                    {iconMap[guideline.icon]}
                  </div>
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {guideline.category}
                    </span>
                    <h3 className="font-display text-xl mt-1 mb-2">{guideline.title}</h3>
                    <p className="text-muted-foreground text-sm">{guideline.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-primary" />
                <h2 className="font-display text-3xl md:text-4xl">
                  SAFETY <span className="text-gradient">FIRST</span>
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Your safety is our top priority. Follow these guidelines to ensure a safe and effective workout experience.
              </p>
            </div>
            <div className="glass-card p-8">
              <ul className="space-y-4">
                {safetyTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Section */}
      <section className="section-padding">
        <div className="container-custom px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">
            NUTRITION <span className="text-gradient">BASICS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Pre-Workout",
                content: "Eat a balanced meal 2-3 hours before training. Focus on complex carbs and lean protein for sustained energy.",
                timing: "2-3 hours before",
              },
              {
                title: "During Workout",
                content: "Stay hydrated with water. For sessions over 60 minutes, consider electrolyte drinks.",
                timing: "Every 15-20 min",
              },
              {
                title: "Post-Workout",
                content: "Consume protein within 30 minutes after training to support muscle recovery and growth.",
                timing: "Within 30 min",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="glass-card p-6 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  {item.timing}
                </div>
                <h3 className="font-display text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
