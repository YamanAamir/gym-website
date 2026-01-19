import { DashboardLayout } from "@/components/DashboardLayout";
import { userAPI } from "@/lib/api/api";
import { Dumbbell, Calendar, Target, Flame, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Workout() {
  const [workoutData, setWorkoutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getCurrentWorkoutPlan();
        setWorkoutData(response.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutPlan();
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

  const days = workoutData?.days || [];
  const title = workoutData?.title || "Your Workout Plan";
  const notes = workoutData?.notes;

  // Static details for display variety if not in backend
  const getStaticDetails = (day: string) => {
    const dayLower = day.toLowerCase();
    if (dayLower.includes("mon")) return { duration: "60 min", intensity: "High" };
    if (dayLower.includes("tue")) return { duration: "65 min", intensity: "High" };
    if (dayLower.includes("wed")) return { duration: "55 min", intensity: "High" };
    if (dayLower.includes("thu")) return { duration: "50 min", intensity: "Medium" };
    if (dayLower.includes("fri")) return { duration: "45 min", intensity: "Very High" };
    if (dayLower.includes("sat")) return { duration: "70 min", intensity: "Low" };
    return { duration: "Rest", intensity: "Rest" };
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">
              <span className="text-gradient uppercase">{title}</span>
            </h1>
            <p className="text-muted-foreground">Follow your personalized routine to achieve your goals.</p>
          </div>
          {notes && (
            <div className="bg-secondary/50 p-4 rounded-xl border border-border max-w-md">
              <p className="text-xs font-bold text-primary uppercase mb-1">Trainer's Notes</p>
              <p className="text-sm text-muted-foreground italic">"{notes}"</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {days.length > 0 ? (
            days.map((item: any) => {
              const staticInfo = getStaticDetails(item.day);
              const today = new Date().getDay();
              const daysMap: Record<string, number> = {
                "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6, "Sunday": 0
              };
              const isToday = daysMap[item.day] === today;

              return (
                <div
                  key={item.id}
                  className={`glass-card p-6 ${isToday ? "border-primary shadow-glow ring-1 ring-primary/20" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isToday ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg capitalize">{item.day}</h3>
                        {isToday && <span className="text-xs text-primary font-bold">TODAY'S WORKOUT</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="bg-primary/10 p-4 rounded-xl mb-4 border border-primary/20">
                      <h4 className="font-display text-xl text-primary flex items-center gap-2">
                        <Dumbbell className="w-5 h-5" />
                        {item.focus}
                      </h4>
                    </div>

                    <div className="flex gap-4 text-xs font-medium">
                      <span className="flex items-center gap-1 text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        <Target className="w-3 h-3 text-primary" />
                        {staticInfo.duration}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        <Flame className="w-3 h-3 text-primary" />
                        {staticInfo.intensity}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 opacity-80">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Target Area</p>
                    <div className="flex items-center gap-2 text-sm text-foreground bg-secondary/30 p-2 rounded-lg">
                      <Dumbbell className="w-4 h-4 text-primary shrink-0" />
                      Focus on {item.focus} stability & strength
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl mb-2">No Workout Plan Found</h3>
              <p className="text-muted-foreground">Your trainer hasn't assigned a workout plan to you yet.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
