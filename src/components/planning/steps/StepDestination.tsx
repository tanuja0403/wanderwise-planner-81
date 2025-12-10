import { MapPin, TrendingUp } from "lucide-react";

interface StepDestinationProps {
  value: string;
  onChange: (value: string) => void;
}

const trendingDestinations = [
  { name: "Paris", country: "France", emoji: "🇫🇷" },
  { name: "Tokyo", country: "Japan", emoji: "🇯🇵" },
  { name: "Bali", country: "Indonesia", emoji: "🇮🇩" },
  { name: "Barcelona", country: "Spain", emoji: "🇪🇸" },
  { name: "New York", country: "USA", emoji: "🇺🇸" },
  { name: "Santorini", country: "Greece", emoji: "🇬🇷" },
];

const StepDestination = ({ value, onChange }: StepDestinationProps) => {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
        Where would you like to go?
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Enter a city, country, or region you'd like to explore
      </p>

      <div className="mx-auto max-w-xl">
        <div className="relative">
          <MapPin className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-coral" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type a destination..."
            className="h-16 w-full rounded-2xl border-2 border-border bg-card pl-14 pr-6 text-lg text-foreground placeholder:text-muted-foreground focus:border-coral focus:outline-none"
            autoFocus
          />
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-coral" />
            Trending Destinations
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {trendingDestinations.map((dest) => (
              <button
                key={dest.name}
                onClick={() => onChange(dest.name)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all ${
                  value === dest.name
                    ? "border-coral bg-coral/10 text-coral"
                    : "border-border bg-card text-foreground hover:border-coral/50 hover:bg-coral/5"
                }`}
              >
                <span>{dest.emoji}</span>
                <span className="font-medium">{dest.name}</span>
                <span className="text-muted-foreground">{dest.country}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepDestination;
