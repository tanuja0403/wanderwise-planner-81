import { Check } from "lucide-react";

interface StepConstraintsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const constraintOptions = [
  { id: "vegetarian", label: "Vegetarian", category: "diet" },
  { id: "vegan", label: "Vegan", category: "diet" },
  { id: "halal", label: "Halal", category: "diet" },
  { id: "kosher", label: "Kosher", category: "diet" },
  { id: "gluten-free", label: "Gluten Free", category: "diet" },
  { id: "limited-walking", label: "Limited Walking", category: "mobility" },
  { id: "wheelchair", label: "Wheelchair Access", category: "mobility" },
  { id: "stroller", label: "Stroller Friendly", category: "mobility" },
  { id: "avoid-crowds", label: "Avoid Crowds", category: "preference" },
  { id: "outdoor-focus", label: "Outdoor Focus", category: "preference" },
  { id: "indoor-focus", label: "Indoor/AC Focus", category: "preference" },
  { id: "pet-friendly", label: "Pet Friendly", category: "preference" },
];

const StepConstraints = ({ value, onChange }: StepConstraintsProps) => {
  const toggleConstraint = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const categories = {
    diet: constraintOptions.filter((c) => c.category === "diet"),
    mobility: constraintOptions.filter((c) => c.category === "mobility"),
    preference: constraintOptions.filter((c) => c.category === "preference"),
  };

  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
        Any special preferences?
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        Select all that apply to customize your experience (optional)
      </p>

      <div className="mx-auto max-w-2xl space-y-8 text-left">
        {/* Dietary */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Dietary Requirements
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.diet.map((constraint) => (
              <button
                key={constraint.id}
                onClick={() => toggleConstraint(constraint.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                  value.includes(constraint.id)
                    ? "border-coral bg-coral/10 text-coral"
                    : "border-border bg-card text-foreground hover:border-coral/50"
                }`}
              >
                {value.includes(constraint.id) && <Check className="h-4 w-4" />}
                {constraint.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobility */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Accessibility Needs
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.mobility.map((constraint) => (
              <button
                key={constraint.id}
                onClick={() => toggleConstraint(constraint.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                  value.includes(constraint.id)
                    ? "border-teal bg-teal/10 text-teal"
                    : "border-border bg-card text-foreground hover:border-teal/50"
                }`}
              >
                {value.includes(constraint.id) && <Check className="h-4 w-4" />}
                {constraint.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Other Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.preference.map((constraint) => (
              <button
                key={constraint.id}
                onClick={() => toggleConstraint(constraint.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                  value.includes(constraint.id)
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border bg-card text-foreground hover:border-gold/50"
                }`}
              >
                {value.includes(constraint.id) && <Check className="h-4 w-4" />}
                {constraint.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepConstraints;
