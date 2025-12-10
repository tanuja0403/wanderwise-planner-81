import { DollarSign } from "lucide-react";

interface StepBudgetProps {
  value: string;
  onChange: (value: string) => void;
}

const budgetOptions = [
  {
    id: "budget",
    label: "Budget",
    description: "Hostels, street food, free activities",
    icon: "$",
    range: "Under $100/day",
  },
  {
    id: "moderate",
    label: "Moderate",
    description: "Mid-range hotels, local restaurants",
    icon: "$$",
    range: "$100-250/day",
  },
  {
    id: "comfort",
    label: "Comfort",
    description: "4-star hotels, popular restaurants",
    icon: "$$$",
    range: "$250-500/day",
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "5-star hotels, fine dining, VIP experiences",
    icon: "$$$$",
    range: "$500+/day",
  },
];

const StepBudget = ({ value, onChange }: StepBudgetProps) => {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
        What's your budget?
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Help us find options that fit your spending preferences (optional)
      </p>

      <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
        {budgetOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`group rounded-2xl border-2 p-6 text-left transition-all ${
              value === option.id
                ? "border-coral bg-coral/5 shadow-md"
                : "border-border bg-card hover:border-coral/50"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`font-display text-2xl font-bold ${
                  value === option.id ? "text-coral" : "text-gold"
                }`}
              >
                {option.icon}
              </span>
              <span className="text-xs text-muted-foreground">{option.range}</span>
            </div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">{option.label}</h3>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </button>
        ))}
      </div>

      <button
        onClick={() => onChange("")}
        className="mt-6 text-sm text-muted-foreground hover:text-coral"
      >
        Skip - I'm flexible with budget
      </button>
    </div>
  );
};

export default StepBudget;
