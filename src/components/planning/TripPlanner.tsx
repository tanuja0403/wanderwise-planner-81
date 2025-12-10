import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepDestination from "./steps/StepDestination";
import StepDates from "./steps/StepDates";
import StepBudget from "./steps/StepBudget";
import StepTravelType from "./steps/StepTravelType";
import StepStyle from "./steps/StepStyle";
import StepConstraints from "./steps/StepConstraints";
import HotelSelection from "./HotelSelection";
import PlacesSelection from "./PlacesSelection";
import FoodSelection from "./FoodSelection";
import ItineraryView from "./ItineraryView";

export interface TripData {
  destination: string;
  dates: { start: Date | null; end: Date | null };
  budget: string;
  travelType: string;
  style: string;
  constraints: string[];
  selectedHotel: any | null;
  selectedPlaces: any[];
  selectedRestaurants: any[];
}

interface TripPlannerProps {
  onBack: () => void;
}

const steps = [
  { id: "destination", label: "Destination" },
  { id: "dates", label: "Dates" },
  { id: "budget", label: "Budget" },
  { id: "travel-type", label: "Travel Type" },
  { id: "style", label: "Style" },
  { id: "constraints", label: "Preferences" },
  { id: "hotels", label: "Hotels" },
  { id: "places", label: "Places" },
  { id: "food", label: "Food" },
  { id: "itinerary", label: "Itinerary" },
];

const TripPlanner = ({ onBack }: TripPlannerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tripData, setTripData] = useState<TripData>({
    destination: "",
    dates: { start: null, end: null },
    budget: "",
    travelType: "",
    style: "",
    constraints: [],
    selectedHotel: null,
    selectedPlaces: [],
    selectedRestaurants: [],
  });

  const updateTripData = (data: Partial<TripData>) => {
    setTripData((prev) => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return tripData.destination.length >= 2;
      case 1:
        return true; // dates optional
      case 2:
        return true; // budget optional
      case 3:
        return tripData.travelType !== "";
      case 4:
        return true; // style optional
      case 5:
        return true; // constraints optional
      case 6:
        return tripData.selectedHotel !== null;
      case 7:
        return tripData.selectedPlaces.length > 0;
      case 8:
        return tripData.selectedRestaurants.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepDestination value={tripData.destination} onChange={(v) => updateTripData({ destination: v })} />;
      case 1:
        return <StepDates value={tripData.dates} onChange={(v) => updateTripData({ dates: v })} />;
      case 2:
        return <StepBudget value={tripData.budget} onChange={(v) => updateTripData({ budget: v })} />;
      case 3:
        return <StepTravelType value={tripData.travelType} onChange={(v) => updateTripData({ travelType: v })} />;
      case 4:
        return <StepStyle value={tripData.style} onChange={(v) => updateTripData({ style: v })} />;
      case 5:
        return <StepConstraints value={tripData.constraints} onChange={(v) => updateTripData({ constraints: v })} />;
      case 6:
        return (
          <HotelSelection
            destination={tripData.destination}
            selectedHotel={tripData.selectedHotel}
            onSelect={(hotel) => updateTripData({ selectedHotel: hotel })}
          />
        );
      case 7:
        return (
          <PlacesSelection
            destination={tripData.destination}
            selectedPlaces={tripData.selectedPlaces}
            onSelect={(places) => updateTripData({ selectedPlaces: places })}
          />
        );
      case 8:
        return (
          <FoodSelection
            destination={tripData.destination}
            selectedRestaurants={tripData.selectedRestaurants}
            onSelect={(restaurants) => updateTripData({ selectedRestaurants: restaurants })}
          />
        );
      case 9:
        return <ItineraryView tripData={tripData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed left-0 right-0 top-0 z-50 bg-card/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="mb-2 flex items-center justify-between">
            <button onClick={prevStep} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {currentStep === 0 ? "Back to Home" : "Back"}
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-gradient-sunset"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-2 flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`text-xs transition-colors ${
                  index <= currentStep ? "text-coral" : "text-muted-foreground/50"
                } ${index === currentStep ? "font-semibold" : ""}`}
              >
                <span className="hidden md:inline">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 pb-32 pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {currentStep < steps.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <div className="text-sm text-muted-foreground">
              {currentStep <= 5 && "Skip optional fields by clicking Continue"}
            </div>
            <Button variant="hero" size="lg" onClick={nextStep} disabled={!canProceed()}>
              {currentStep === 5 ? "Find Hotels" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
