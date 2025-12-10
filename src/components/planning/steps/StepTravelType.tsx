import { User, Heart, Users, Baby } from "lucide-react";

interface StepTravelTypeProps {
  value: string;
  onChange: (value: string) => void;
}

const travelTypes = [
  {
    id: "solo",
    label: "Solo",
    description: "Exploring on my own terms",
    icon: User,
  },
  {
    id: "couple",
    label: "Couple",
    description: "Romantic getaway for two",
    icon: Heart,
  },
  {
    id: "friends",
    label: "Friends",
    description: "Adventure with my crew",
    icon: Users,
  },
  {
    id: "family",
    label: "Family",
    description: "Fun for all ages",
    icon: Baby,
  },
];

const StepTravelType = ({ value, onChange }: StepTravelTypeProps) => {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
        Who's traveling?
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        We'll tailor recommendations to your travel group
      </p>

      <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
        {travelTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`group flex items-center gap-4 rounded-2xl border-2 p-6 text-left transition-all ${
                value === type.id
                  ? "border-teal bg-teal/5 shadow-md"
                  : "border-border bg-card hover:border-teal/50"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                  value === type.id ? "bg-teal text-secondary-foreground" : "bg-muted text-muted-foreground group-hover:bg-teal/20 group-hover:text-teal"
                }`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepTravelType;
