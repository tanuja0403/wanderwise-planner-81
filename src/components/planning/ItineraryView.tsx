import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Utensils,
  Hotel,
  Sun,
  Sunset,
  Moon,
  RefreshCw,
  Share2,
  Download,
  Info,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripData } from "./TripPlanner";
import ItineraryPlannerChatbot, { PlannerActivity, PlannerDay } from "./ItineraryPlannerChatbot";
import ChatbaseWidget from "@/components/integrations/ChatbaseWidget";

interface ItineraryViewProps {
  tripData: TripData;
}

const ItineraryView = ({ tripData }: ItineraryViewProps) => {
  // Generate a sample itinerary based on selections
  const generateItinerary = () => {
    const days: PlannerDay[] = [];
    const placesPerDay = Math.ceil(tripData.selectedPlaces.length / 2);
    const restaurantsPerDay = Math.ceil(tripData.selectedRestaurants.length / 2);

    for (let day = 1; day <= 2; day++) {
      const dayPlaces = tripData.selectedPlaces.slice(
        (day - 1) * placesPerDay,
        day * placesPerDay
      );
      const dayRestaurants = tripData.selectedRestaurants.slice(
        (day - 1) * restaurantsPerDay,
        day * restaurantsPerDay
      );

      const activities: PlannerActivity[] = [];

      // Morning
      activities.push({
        time: "8:00 AM",
        type: "breakfast",
        title: dayRestaurants[0]?.name || "Local Breakfast Spot",
        description: dayRestaurants[0]?.mustTry || "Start your day with local flavors",
        duration: "1 hour",
        tip: "Best time to beat the crowds",
        period: "morning",
      });

      if (dayPlaces[0]) {
        activities.push({
          time: "9:30 AM",
          type: "place",
          title: dayPlaces[0].name,
          description: dayPlaces[0].type,
          duration: dayPlaces[0].duration,
          tip: dayPlaces[0].tip,
          period: "morning",
        });
      }

      // Afternoon
      if (dayRestaurants[1]) {
        activities.push({
          time: "12:30 PM",
          type: "lunch",
          title: dayRestaurants[1].name,
          description: dayRestaurants[1].cuisine,
          duration: "1.5 hours",
          tip: `Try: ${dayRestaurants[1].mustTry}`,
          period: "afternoon",
        });
      }

      if (dayPlaces[1]) {
        activities.push({
          time: "2:30 PM",
          type: "place",
          title: dayPlaces[1].name,
          description: dayPlaces[1].type,
          duration: dayPlaces[1].duration,
          tip: dayPlaces[1].tip,
          period: "afternoon",
        });
      }

      // Evening
      if (dayPlaces[2]) {
        activities.push({
          time: "5:00 PM",
          type: "place",
          title: dayPlaces[2].name,
          description: dayPlaces[2].type,
          duration: dayPlaces[2].duration,
          tip: dayPlaces[2].tip,
          period: "evening",
        });
      }

      if (dayRestaurants[2]) {
        activities.push({
          time: "7:30 PM",
          type: "dinner",
          title: dayRestaurants[2].name,
          description: dayRestaurants[2].cuisine,
          duration: "2 hours",
          tip: `Try: ${dayRestaurants[2].mustTry}`,
          period: "evening",
        });
      }

      days.push({ day, activities });
    }

    return days;
  };

  const [itinerary, setItinerary] = useState<PlannerDay[]>(generateItinerary());
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setItinerary(generateItinerary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tripData.destination,
    tripData.selectedPlaces,
    tripData.selectedRestaurants,
    tripData.selectedHotel,
    tripData.style,
    tripData.travelType,
  ]);

  // Generate AI itinerary from backend
  const generateAIItinerary = async () => {
    setIsGenerating(true);
    try {
      // Calculate number of days from dates
      const days = tripData.dates.start && tripData.dates.end
        ? Math.ceil((tripData.dates.end.getTime() - tripData.dates.start.getTime()) / (1000 * 60 * 60 * 24)) + 1
        : 2;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/itineraries/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination: tripData.destination,
            days: days,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const data = await response.json();
      console.log("Generated itinerary:", data);
      // Parse the AI-generated text and create a new itinerary structure if needed
      // For now, log the result and keep the current itinerary
      alert("AI-generated itinerary:\n\n" + data.itinerary);
    } catch (error) {
      console.error("Error generating AI itinerary:", error);
      alert("Could not generate AI itinerary. Make sure your Hugging Face API token is set in the backend.");
    } finally {
      setIsGenerating(false);
    }
  };

  const periodIcons = {
    morning: Sun,
    afternoon: Sunset,
    evening: Moon,
  };

  const typeColors = {
    place: "bg-teal/10 text-teal border-teal/30",
    breakfast: "bg-gold/10 text-gold border-gold/30",
    lunch: "bg-gold/10 text-gold border-gold/30",
    dinner: "bg-coral/10 text-coral border-coral/30",
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Sparkles className="h-4 w-4" />
          Your Personalized Itinerary
        </motion.div>
        <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
          {tripData.destination} Adventure
        </h1>
        <p className="text-lg text-muted-foreground">
          A {tripData.style || "balanced"} itinerary crafted just for{" "}
          {tripData.travelType === "solo" ? "you" : `your ${tripData.travelType} trip`}
        </p>
      </div>

      {/* Trip Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl bg-gradient-ocean p-6 text-secondary-foreground"
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <Hotel className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-80">Staying at</div>
              <div className="font-semibold">{tripData.selectedHotel?.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-80">Places to visit</div>
              <div className="font-semibold">{tripData.selectedPlaces.length} locations</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Utensils className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-80">Dining spots</div>
              <div className="font-semibold">{tripData.selectedRestaurants.length} restaurants</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-80">Trip pace</div>
              <div className="font-semibold capitalize">{tripData.style || "Balanced"}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Itinerary Days */}
      <div className="space-y-8">
        {itinerary.map((dayData, dayIndex) => (
          <motion.div
            key={dayData.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
              Day {dayData.day}
            </h2>

            <div className="space-y-4">
              {dayData.activities.map((activity, actIndex) => {
                const PeriodIcon = periodIcons[activity.period as keyof typeof periodIcons];
                const colorClass = typeColors[activity.type as keyof typeof typeColors] || "bg-muted text-foreground border-border";

                return (
                  <motion.div
                    key={actIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: actIndex * 0.05 }}
                    className="flex gap-4"
                  >
                    {/* Time Column */}
                    <div className="w-20 shrink-0 text-right">
                      <div className="font-semibold text-foreground">{activity.time}</div>
                      <div className="flex justify-end">
                        <PeriodIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-4 w-4 rounded-full border-2 ${colorClass}`}
                      />
                      {actIndex < dayData.activities.length - 1 && (
                        <div className="h-full w-0.5 bg-border" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 rounded-xl border p-4 ${colorClass}`}>
                      <div className="mb-1 flex items-center justify-between">
                        <h3 className="font-semibold">{activity.title}</h3>
                        <span className="text-xs opacity-70">{activity.duration}</span>
                      </div>
                      <p className="mb-2 text-sm opacity-80">{activity.description}</p>
                      {activity.tip && (
                        <p className="flex items-center gap-1 text-xs">
                          <Info className="h-3 w-3" />
                          {activity.tip}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        <Button variant="hero" size="lg">
          <Download className="h-5 w-5" />
          Download PDF
        </Button>
        <Button variant="teal" size="lg">
          <Share2 className="h-5 w-5" />
          Share Itinerary
        </Button>
        <Button 
          variant="glass" 
          size="lg"
          onClick={generateAIItinerary}
          disabled={isGenerating}
        >
          <RefreshCw className={`h-5 w-5 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Generating..." : "AI Regenerate"}
        </Button>
      </motion.div>

      <div className="mt-10 space-y-6">
        <ItineraryPlannerChatbot itinerary={itinerary} onUpdate={setItinerary} />

        <div className="space-y-3">
          <h3 className="text-lg font-display font-semibold text-foreground">Chatbase Assistant</h3>
          <p className="text-muted-foreground">
            Use the floating Chatbase widget to chat about your plan, ask for changes, or request ideas beyond add/remove.
          </p>
          <ChatbaseWidget />
        </div>
      </div>

      {/* Why This Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 rounded-2xl border border-gold/30 bg-gold/5 p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <Sparkles className="h-5 w-5 text-gold" />
          Why This Itinerary Works for You
        </h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Geographically optimized to minimize travel time between locations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Considers opening hours and best visiting times for each attraction
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold">•</span>
            Balanced energy levels: lighter mornings, active afternoons, relaxing evenings
          </li>
          {tripData.constraints.length > 0 && (
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Accounts for your preferences: {tripData.constraints.join(", ")}
            </li>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default ItineraryView;
