import { DashboardLayout } from "@/components/DashboardLayout";
import { currentUser } from "@/components/lib/data";
import { Apple, Clock, Flame, Droplets, Beef } from "lucide-react";

export default function Nutrition() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl mb-2">
            YOUR <span className="text-gradient">NUTRITION PLAN</span>
          </h1>
          <p className="text-muted-foreground">Optimized for your fitness goals</p>
        </div>

        {/* Macros Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Daily Calories", value: currentUser.nutritionPlan.calories, icon: Flame, color: "text-orange-500" },
            { label: "Protein", value: currentUser.nutritionPlan.protein, icon: Beef, color: "text-red-500" },
            { label: "Carbs", value: currentUser.nutritionPlan.carbs, icon: Apple, color: "text-green-500" },
            { label: "Fats", value: currentUser.nutritionPlan.fats, icon: Droplets, color: "text-yellow-500" },
          ].map((macro) => (
            <div key={macro.label} className="stat-card">
              <div className="flex items-center gap-3 mb-2">
                <macro.icon className={`w-6 h-6 ${macro.color}`} />
                <span className="text-muted-foreground text-sm">{macro.label}</span>
              </div>
              <p className="font-display text-3xl">{macro.value}</p>
            </div>
          ))}
        </div>

        {/* Daily Meal Plan */}
        <div className="glass-card p-6">
          <h2 className="font-display text-xl mb-6 flex items-center gap-2">
            <Apple className="w-5 h-5 text-primary" />
            DAILY MEAL SCHEDULE
          </h2>
          <div className="space-y-4">
            {currentUser.nutritionPlan.meals.map((meal, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-secondary rounded-xl"
              >
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-lg">Meal {index + 1}</span>
                    <span className="text-primary font-medium">{meal.time}</span>
                  </div>
                  <p className="text-muted-foreground">{meal.meal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-display text-lg mb-4">HYDRATION GOALS</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Droplets className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="font-display text-3xl">3.5L</p>
                <p className="text-muted-foreground text-sm">Daily water intake target</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display text-lg mb-4">PRO TIP</h3>
            <p className="text-muted-foreground">
              Spread your protein intake evenly across all meals for optimal muscle protein synthesis. 
              Aim for 30-40g of protein per meal.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
