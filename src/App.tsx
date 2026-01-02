import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/components/pages/Index";
import NotFound from "@/components/pages/NotFound";
import Trainers from "@/components/pages/Trainers";
import Guidelines from "@/components/pages/Guidelines";
import Contact from "@/components/pages/Contact";
import Login from "@/components/pages/Login";
import Signup from "@/components/pages/Signup";
import Dashboard from "@/components/pages/Dashboard";
import Workout from "@/components/pages/Workout";
import Nutrition from "@/components/pages/Nutrition";
import Profile from "@/components/pages/Profile";
import AdminLogin from "@/components/pages/admin/AdminLogin";
import AdminDashboard from "@/components/pages/admin/AdminDashboard";
import AdminMembers from "@/components/pages/admin/AdminMembers";
import AdminTrainers from "@/components/pages/admin/AdminTrainers";
import AdminPlans from "@/components/pages/admin/AdminPlans";
import AdminGuidelines from "@/components/pages/admin/AdminGuidelines";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/workout" element={<Workout />} />
          <Route path="/dashboard/nutrition" element={<Nutrition />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/trainers" element={<AdminTrainers />} />
          <Route path="/admin/plans" element={<AdminPlans />} />
          <Route path="/admin/guidelines" element={<AdminGuidelines />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
