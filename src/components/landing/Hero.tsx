import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-travel.jpg";

interface HeroProps {
  onStartPlanning: () => void;
}

const Hero = ({ onStartPlanning }: HeroProps) => {
  const [destination, setDestination] = useState("");

  const popularDestinations = ["Paris", "Tokyo", "Bali", "New York", "Santorini"];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful travel destination"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-[10%] h-20 w-20 rounded-full bg-gold/30 blur-2xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-[15%] h-32 w-32 rounded-full bg-coral/20 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-gold" />
            AI-Powered Travel Planning
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 font-display text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl"
        >
          Your Journey,{" "}
          <span className="relative">
            <span className="text-gradient-sunset bg-clip-text">Perfectly Crafted</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 max-w-2xl text-lg text-primary-foreground/80 md:text-xl"
        >
          Let our AI companion build your dream itinerary. From hidden gems to local favorites,
          we create personalized travel experiences just for you.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-2xl bg-card/95 p-2 shadow-lg backdrop-blur-md">
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-14 w-full rounded-xl bg-muted/50 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button
                variant="hero"
                size="xl"
                onClick={onStartPlanning}
                className="shrink-0"
              >
                <Search className="h-5 w-5" />
                Start Planning
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Popular Destinations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-sm text-primary-foreground/60">Popular:</span>
          {popularDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setDestination(dest)}
              className="rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
            >
              {dest}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
        >
          {[
            { value: "50K+", label: "Happy Travelers" },
            { value: "200+", label: "Destinations" },
            { value: "4.9", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary-foreground/30 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
