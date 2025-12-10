import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Plus, ArrowLeft, Trash2, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/landing/Navbar";
import ChatbaseWidget from "@/components/integrations/ChatbaseWidget";
import SmartItineraryChatbot from "@/components/planning/SmartItineraryChatbot";

interface ItineraryDay {
  id: string;
  day: number;
  date: string;
  activities: Activity[];
}

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  notes?: string;
}

const SmartItinerary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    {
      id: "1",
      day: 1,
      date: "Day 1",
      activities: [
        { id: "a1", time: "09:00", title: "Arrival & Check-in", location: "Hotel", notes: "Early check-in requested" },
        { id: "a2", time: "12:00", title: "Lunch at Local Restaurant", location: "City Center", notes: "" },
        { id: "a3", time: "15:00", title: "Walking Tour", location: "Historic District", notes: "" },
        { id: "a4", time: "19:00", title: "Dinner", location: "Waterfront", notes: "" },
      ],
    },
    {
      id: "2",
      day: 2,
      date: "Day 2",
      activities: [
        { id: "b1", time: "08:00", title: "Breakfast", location: "Hotel", notes: "" },
        { id: "b2", time: "10:00", title: "Museum Visit", location: "National Museum", notes: "Book tickets in advance" },
        { id: "b3", time: "14:00", title: "Lunch Break", location: "Museum Café", notes: "" },
        { id: "b4", time: "16:00", title: "Shopping", location: "Main Street", notes: "" },
      ],
    },
    {
      id: "3",
      day: 3,
      date: "Day 3",
      activities: [
        { id: "c1", time: "07:00", title: "Early Morning Hike", location: "Mountain Trail", notes: "" },
        { id: "c2", time: "13:00", title: "Lunch with View", location: "Mountain Restaurant", notes: "" },
        { id: "c3", time: "16:00", title: "Return to City", location: "City Center", notes: "" },
        { id: "c4", time: "20:00", title: "Farewell Dinner", location: "Fine Dining", notes: "" },
      ],
    },
  ]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleStartPlanning = () => {
    navigate("/");
  };

  const addDay = () => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      day: itinerary.length + 1,
      date: `Day ${itinerary.length + 1}`,
      activities: [],
    };
    setItinerary([...itinerary, newDay]);
  };

  const addActivity = (dayId: string) => {
    setItinerary(
      itinerary.map((day) =>
        day.id === dayId
          ? {
              ...day,
              activities: [
                ...day.activities,
                { id: Date.now().toString(), time: "12:00", title: "New Activity", location: "Location", notes: "" },
              ],
            }
          : day
      )
    );
  };

  const removeActivity = (dayId: string, activityId: string) => {
    setItinerary(
      itinerary.map((day) =>
        day.id === dayId
          ? { ...day, activities: day.activities.filter((a) => a.id !== activityId) }
          : day
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onStartPlanning={handleStartPlanning} />
      
      <div className="pt-20 md:pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-coral-dark">
                  <Compass className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-foreground">Smart Itinerary</h1>
                  <p className="text-muted-foreground text-sm">Plan your perfect trip day by day</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination..."
                  className="w-48"
                />
                <Button onClick={addDay} variant="teal">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Day
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itinerary.map((day) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
              >
                <div className="bg-gradient-to-r from-teal to-teal-dark p-4">
                  <div className="flex items-center gap-2 text-primary-foreground">
                    <Calendar className="h-5 w-5" />
                    <span className="font-display font-bold text-lg">{day.date}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {day.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group relative bg-muted rounded-xl p-3 transition-all hover:shadow-md"
                    >
                      <button
                        onClick={() => removeActivity(day.id, activity.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      <div className="flex items-center gap-2 text-coral font-medium text-sm mb-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                      <h4 className="font-medium text-foreground mb-1">{activity.title}</h4>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <MapPin className="h-3 w-3" />
                        {activity.location}
                      </div>
                      {activity.notes && (
                        <p className="text-xs text-muted-foreground mt-2 italic">{activity.notes}</p>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() => addActivity(day.id)}
                    className="w-full py-2 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-teal hover:text-teal transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Add Activity
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {itinerary.length === 0 && (
            <div className="text-center py-16">
              <Compass className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">No itinerary yet</h3>
              <p className="text-muted-foreground mb-4">Start planning your trip by adding your first day</p>
              <Button onClick={addDay} variant="teal">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Day
              </Button>
            </div>
          )}

          <div className="mt-12 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-display font-semibold text-foreground">Need quick tweaks with AI?</h2>
              <p className="text-muted-foreground">
                Ask the smart assistant to add or remove activities, then use the Chatbase widget for deeper help.
              </p>
              <SmartItineraryChatbot itinerary={itinerary} onUpdate={setItinerary} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-display font-semibold text-foreground">Chatbase Assistant</h3>
              <p className="text-muted-foreground">
                Use the floating Chatbase widget to request itinerary changes, ask questions, or continue the conversation.
              </p>
              <ChatbaseWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartItinerary;
