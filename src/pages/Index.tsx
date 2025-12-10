import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import TravelStyles from "@/components/landing/TravelStyles";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import TripPlanner from "@/components/planning/TripPlanner";

const Index = () => {
  const [isPlanning, setIsPlanning] = useState(false);

  if (isPlanning) {
    return <TripPlanner onBack={() => setIsPlanning(false)} />;
  }

  return (
    <main className="min-h-screen">
      <Navbar onStartPlanning={() => setIsPlanning(true)} />
      <Hero onStartPlanning={() => setIsPlanning(true)} />
      <Features />
      <TravelStyles />
      <CTA onStartPlanning={() => setIsPlanning(true)} />
      <Footer />
    </main>
  );
};

export default Index;
