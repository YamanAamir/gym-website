// Dummy data for the fitness website

export const membershipPlans = [
  {
    id: 1,
    name: "Basic",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Access to gym equipment",
      "Locker room access",
      "Free WiFi",
      "2 guest passes/month",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    monthlyPrice: 59,
    yearlyPrice: 590,
    features: [
      "Everything in Basic",
      "Group fitness classes",
      "Personal training session (1/month)",
      "Nutrition consultation",
      "Sauna & steam room",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Elite",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Pro",
      "Unlimited personal training",
      "Priority class booking",
      "Premium locker",
      "Exclusive member events",
      "Massage therapy (2/month)",
    ],
    popular: false,
  },
];

export const trainers = [
  {
    id: 1,
    name: "Marcus Johnson",
    specialty: "Strength & Conditioning",
    experience: "8 years",
    bio: "Former professional athlete specializing in functional strength and power training.",
    certifications: ["CSCS", "NASM-CPT", "USA Weightlifting"],
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Chen",
    specialty: "HIIT & Cardio",
    experience: "6 years",
    bio: "High-energy trainer focused on metabolic conditioning and fat loss.",
    certifications: ["ACE-CPT", "CrossFit L2", "Precision Nutrition"],
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "David Miller",
    specialty: "Bodybuilding",
    experience: "10 years",
    bio: "Competition-level bodybuilder helping clients achieve their aesthetic goals.",
    certifications: ["IFBB Pro", "NASM-CPT", "Sports Nutrition"],
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    specialty: "Yoga & Mobility",
    experience: "7 years",
    bio: "Holistic approach to fitness combining yoga, mobility, and mindfulness.",
    certifications: ["RYT-500", "FRC", "Mobility WOD"],
    image: "/placeholder.svg",
  },
];

export const fitnessGuidelines = [
  {
    id: 1,
    category: "Workout Safety",
    title: "Proper Warm-Up Protocol",
    content: "Always begin with 5-10 minutes of light cardio followed by dynamic stretching. This increases blood flow and prepares your muscles for intense activity.",
    icon: "Shield",
  },
  {
    id: 2,
    category: "Nutrition",
    title: "Pre-Workout Nutrition",
    content: "Consume a balanced meal 2-3 hours before training. Include complex carbs for energy and protein for muscle support.",
    icon: "Apple",
  },
  {
    id: 3,
    category: "Recovery",
    title: "Rest & Recovery",
    content: "Aim for 7-9 hours of quality sleep. Include rest days in your routine to allow muscle repair and prevent overtraining.",
    icon: "Moon",
  },
  {
    id: 4,
    category: "Hydration",
    title: "Stay Hydrated",
    content: "Drink water before, during, and after workouts. Aim for at least 8 glasses daily, more if you're actively training.",
    icon: "Droplets",
  },
  {
    id: 5,
    category: "Form",
    title: "Perfect Your Form",
    content: "Quality over quantity. Focus on proper technique to maximize results and prevent injuries. Ask trainers for form checks.",
    icon: "Target",
  },
  {
    id: 6,
    category: "Progress",
    title: "Progressive Overload",
    content: "Gradually increase weight, reps, or intensity over time. This challenges your muscles and promotes continuous growth.",
    icon: "TrendingUp",
  },
];

export const services = [
  {
    id: 1,
    name: "Personal Training",
    description: "One-on-one sessions tailored to your goals with expert trainers.",
    icon: "User",
  },
  {
    id: 2,
    name: "Group Classes",
    description: "High-energy group sessions including HIIT, yoga, spin, and more.",
    icon: "Users",
  },
  {
    id: 3,
    name: "Nutrition Coaching",
    description: "Personalized meal plans and nutritional guidance for optimal results.",
    icon: "Apple",
  },
  {
    id: 4,
    name: "Recovery Zone",
    description: "Sauna, steam room, and massage therapy for muscle recovery.",
    icon: "Heart",
  },
];

export const stats = [
  { label: "Active Members", value: "2,500+" },
  { label: "Expert Trainers", value: "25" },
  { label: "Classes Weekly", value: "100+" },
  { label: "Years Experience", value: "15" },
];

// User portal data
export const currentUser = {
  id: 1,
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  memberSince: "2024-01-15",
  plan: {
    name: "Pro",
    type: "yearly",
    price: 590,
    startDate: "2024-01-15",
    expiryDate: "2025-01-15",
  },
  trainer: trainers[0],
  workoutPlan: {
    monday: "Chest & Triceps",
    tuesday: "Back & Biceps",
    wednesday: "Legs & Core",
    thursday: "Shoulders & Arms",
    friday: "Full Body HIIT",
    saturday: "Active Recovery",
    sunday: "Rest",
  },
  nutritionPlan: {
    calories: 2400,
    protein: "180g",
    carbs: "250g",
    fats: "80g",
    meals: [
      { time: "7:00 AM", meal: "Oatmeal with protein, berries, and nuts" },
      { time: "10:00 AM", meal: "Greek yogurt with granola" },
      { time: "1:00 PM", meal: "Grilled chicken, brown rice, vegetables" },
      { time: "4:00 PM", meal: "Protein shake with banana" },
      { time: "7:00 PM", meal: "Salmon, sweet potato, mixed greens" },
    ],
  },
};

// Admin data
export const adminStats = {
  totalMembers: 2547,
  activeMembers: 2312,
  monthlyRevenue: 127850,
  newMembersThisMonth: 89,
  trainersCount: 25,
  classesThisWeek: 112,
};

export const allMembers = [
  { id: 1, name: "John Smith", email: "john@email.com", plan: "Pro", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "Emma Wilson", email: "emma@email.com", plan: "Elite", status: "Active", joinDate: "2024-02-20" },
  { id: 3, name: "Michael Brown", email: "michael@email.com", plan: "Basic", status: "Active", joinDate: "2024-03-10" },
  { id: 4, name: "Sarah Davis", email: "sarah@email.com", plan: "Pro", status: "Expired", joinDate: "2023-12-01" },
  { id: 5, name: "James Taylor", email: "james@email.com", plan: "Elite", status: "Active", joinDate: "2024-04-05" },
  { id: 6, name: "Lisa Anderson", email: "lisa@email.com", plan: "Basic", status: "Active", joinDate: "2024-03-25" },
  { id: 7, name: "Robert Martinez", email: "robert@email.com", plan: "Pro", status: "Active", joinDate: "2024-01-30" },
  { id: 8, name: "Jennifer Garcia", email: "jennifer@email.com", plan: "Elite", status: "Pending", joinDate: "2024-05-01" },
];
