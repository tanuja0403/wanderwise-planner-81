import { motion } from "framer-motion";
import { User, Heart, Users, Baby } from "lucide-react";

const styles = [
  {
    icon: User,
    title: "Solo Explorer",
    description: "Freedom to discover at your own pace with safety-first recommendations.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&h=300&fit=crop",
  },
  {
    icon: Heart,
    title: "Romantic Getaway",
    description: "Curated experiences for couples seeking memorable moments together.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
  {
    icon: Users,
    title: "Friends Adventure",
    description: "Group-friendly activities and accommodations for unforgettable trips.",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=300&fit=crop",
  },
  {
    icon: Baby,
    title: "Family Fun",
    description: "Kid-friendly venues and activities the whole family will love.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
  },
];

const TravelStyles = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-coral/10 px-4 py-1.5 text-sm font-medium text-coral">
            Travel Your Way
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Tailored for{" "}
            <span className="text-gradient-sunset">Every Traveler</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Whether you're a solo wanderer or traveling with the whole crew, we adapt
            to your unique style.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {styles.map((style, index) => (
            <motion.div
              key={style.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={style.image}
                    alt={style.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/90">
                    <style.icon className="h-5 w-5 text-coral" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {style.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{style.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelStyles;
