import { motion } from "framer-motion";
import { Hotel, MapPin, Utensils, Calendar, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: Hotel,
    title: "Smart Hotel Selection",
    description: "AI-curated hotels matching your style, budget, and location preferences.",
    color: "coral",
  },
  {
    icon: MapPin,
    title: "Hidden Gems & Hotspots",
    description: "Discover both iconic attractions and local secrets off the beaten path.",
    color: "teal",
  },
  {
    icon: Utensils,
    title: "Culinary Guide",
    description: "From street food to fine dining, find eateries that match your taste.",
    color: "gold",
  },
  {
    icon: Calendar,
    title: "Intelligent Itinerary",
    description: "Hour-by-hour schedules optimized for distance, timing, and your energy.",
    color: "coral",
  },
  {
    icon: Sparkles,
    title: "Personalized Experience",
    description: "Every recommendation tailored to your travel style and preferences.",
    color: "teal",
  },
  {
    icon: Shield,
    title: "Safety & Accessibility",
    description: "Considerations for dietary needs, mobility, and safety concerns.",
    color: "gold",
  },
];

const colorClasses = {
  coral: {
    bg: "bg-coral/10",
    text: "text-coral",
    border: "group-hover:border-coral/30",
  },
  teal: {
    bg: "bg-teal/10",
    text: "text-teal",
    border: "group-hover:border-teal/30",
  },
  gold: {
    bg: "bg-gold/10",
    text: "text-gold",
    border: "group-hover:border-gold/30",
  },
};

const Features = () => {
  return (
    <section className="bg-gradient-warm py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-teal/10 px-4 py-1.5 text-sm font-medium text-teal">
            How It Works
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Your Perfect Trip in{" "}
            <span className="text-gradient-ocean">4 Simple Steps</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our AI analyzes thousands of data points to create a travel experience
            that's uniquely yours.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`h-full rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg ${colors.border}`}
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
                  >
                    <feature.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
