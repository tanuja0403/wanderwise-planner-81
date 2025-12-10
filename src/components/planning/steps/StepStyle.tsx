import { Coffee, Zap, Rocket } from "lucide-react";

interface StepStyleProps {
  value: string;
  onChange: (value: string) => void;
}

const styles = [
  {
    id: "relaxed",
    label: "Relaxed",
    description: "2-3 activities per day, plenty of downtime",
    icon: Coffee,
    color: "teal",
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "4-5 activities, mix of sights and rest",
    icon: Zap,
    color: "gold",
  },
  {
    id: "packed",
    label: "Packed",
    description: "6+ activities, see everything possible",
    icon: Rocket,
    color: "coral",
  },
];

const colorClasses = {
  teal: {
    selected: "border-teal bg-teal/5",
    icon: "bg-teal text-secondary-foreground",
    iconHover: "group-hover:bg-teal/20 group-hover:text-teal",
    hover: "hover:border-teal/50",
  },
  gold: {
    selected: "border-gold bg-gold/5",
    icon: "bg-gold text-accent-foreground",
    iconHover: "group-hover:bg-gold/20 group-hover:text-gold",
    hover: "hover:border-gold/50",
  },
  coral: {
    selected: "border-coral bg-coral/5",
    icon: "bg-coral text-primary-foreground",
    iconHover: "group-hover:bg-coral/20 group-hover:text-coral",
    hover: "hover:border-coral/50",
  },
};

const StepStyle = ({ value, onChange }: StepStyleProps) => {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
        What's your travel pace?
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Choose how packed you want your days to be (optional)
      </p>

      <div className="mx-auto flex max-w-3xl flex-col gap-4 md:flex-row">
        {styles.map((style) => {
          const Icon = style.icon;
          const colors = colorClasses[style.color as keyof typeof colorClasses];
          const isSelected = value === style.id;

          return (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={`group flex-1 rounded-2xl border-2 p-6 text-center transition-all ${
                isSelected ? `${colors.selected} shadow-md` : `border-border bg-card ${colors.hover}`
              }`}
            >
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl transition-colors ${
                  isSelected ? colors.icon : `bg-muted text-muted-foreground ${colors.iconHover}`
                }`}
              >
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{style.label}</h3>
              <p className="text-sm text-muted-foreground">{style.description}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onChange("")}
        className="mt-6 text-sm text-muted-foreground hover:text-coral"
      >
        Skip - Surprise me!
      </button>
    </div>
  );
};

export default StepStyle;
