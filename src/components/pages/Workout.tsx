import { DashboardLayout } from "@/components/DashboardLayout";
import { currentUser } from "@/components/lib/data";
import { Dumbbell, Calendar, Target, Flame } from "lucide-react";

const workoutDetails: Record<string, { exercises: string[]; duration: string; intensity: string }> = {
  monday: {
    exercises: ["Bench Press 4x8", "Incline Dumbbell Press 3x10", "Cable Flyes 3x12", "Tricep Pushdowns 4x10", "Skull Crushers 3x12"],
    duration: "60 min",
    intensity: "High",
  },
  tuesday: {
    exercises: ["Deadlifts 4x6", "Pull-ups 4x8", "Barbell Rows 4x8", "Lat Pulldowns 3x12", "Bicep Curls 4x10"],
    duration: "65 min",
    intensity: "High",
  },
  wednesday: {
    exercises: ["Squats 4x8", "Leg Press 4x10", "Romanian Deadlifts 3x10", "Leg Curls 3x12", "Planks 3x60s"],
    duration: "55 min",
    intensity: "High",
  },
  thursday: {
    exercises: ["Overhead Press 4x8", "Lateral Raises 4x12", "Face Pulls 3x15", "Hammer Curls 3x10", "Tricep Dips 4x10"],
    duration: "50 min",
    intensity: "Medium",
  },
  friday: {
    exercises: ["Burpees 4x15", "Box Jumps 4x10", "Kettlebell Swings 4x15", "Mountain Climbers 3x30s", "Battle Ropes 3x30s"],
    duration: "45 min",
    intensity: "Very High",
  },
  saturday: {
    exercises: ["Light Cardio 20min", "Foam Rolling 15min", "Dynamic Stretching 15min", "Yoga Flow 20min"],
    duration: "70 min",
    intensity: "Low",
  },
  sunday: {
    exercises: ["Rest - focus on sleep and nutrition"],
    duration: "N/A",
    intensity: "Rest",
  },
};

export default function Workout() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            YOUR <span className="text-gradient">WORKOUT PLAN</span>
          </h1>
          <p className="text-muted-foreground">Customized by {currentUser.trainer.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(currentUser.workoutPlan).map(([day, workout]) => {
            const details = workoutDetails[day];
            const isToday = new Date().getDay() === (day === "sunday" ? 0 : ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].indexOf(day) + 1);
            
            return (
              <div
                key={day}
                className={`glass-card p-6 ${isToday ? "border-primary shadow-glow" : ""}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isToday ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg capitalize">{day}</h3>
                      {isToday && <span className="text-xs text-primary">Today</span>}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-display text-primary mb-2">{workout}</h4>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Target className="w-4 h-4" />
                      {details.duration}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Flame className="w-4 h-4" />
                      {details.intensity}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {details.exercises.map((exercise, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Dumbbell className="w-4 h-4 text-primary shrink-0" />
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
