import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Import destination images
import indiaImg from "@/assets/destinations/india.webp";
import wallImg from "@/assets/destinations/wall.webp";
import towerImg from "@/assets/destinations/tower.webp";
import libertyImg from "@/assets/destinations/liberty.webp";
import sydneyImg from "@/assets/destinations/sydney.webp";
import everestImg from "@/assets/destinations/everest.webp";
import stonehengeImg from "@/assets/destinations/stonehenge.webp";
import colosseumImg from "@/assets/destinations/colosseum.webp";
import pyramidImg from "@/assets/destinations/pyramid.webp";
import machuImg from "@/assets/destinations/machu.webp";
import tajImg from "@/assets/destinations/taj.webp";

interface HeroProps {
  onStartPlanning: () => void;
}

const topRowImages = [
  { src: indiaImg, alt: "India Gate" },
  { src: wallImg, alt: "Great Wall of China" },
  { src: towerImg, alt: "Eiffel Tower" },
  { src: libertyImg, alt: "Statue of Liberty" },
  { src: sydneyImg, alt: "Sydney Opera House" },
  { src: everestImg, alt: "Mount Everest" },
  { src: stonehengeImg, alt: "Stonehenge" },
];

const bottomRowImages = [
  { src: colosseumImg, alt: "Colosseum" },
  { src: pyramidImg, alt: "Egyptian Pyramids" },
  { src: machuImg, alt: "Machu Picchu" },
  { src: tajImg, alt: "Taj Mahal" },
  { src: indiaImg, alt: "India Gate" },
  { src: wallImg, alt: "Great Wall of China" },
  { src: towerImg, alt: "Eiffel Tower" },
];

const Hero = ({ onStartPlanning }: HeroProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Dark overlay background */}
      <div className="absolute inset-0 bg-foreground" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-8">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-center"
        >
          <h1 className="font-display text-4xl font-bold leading-tight text-muted-foreground/70 md:text-5xl lg:text-6xl">
            Discover Your Next Horizon
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 font-display text-6xl font-bold text-primary md:text-7xl lg:text-8xl"
        >
          ZipTrip
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 text-lg text-muted-foreground/60"
        >
          Your trusted trip planner and adventure guide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onStartPlanning}
            className="border-border/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            Plan a Trip, It's Free
          </Button>
        </motion.div>

        {/* Image Carousels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 w-full overflow-hidden"
        >
          {/* Top Row - scrolls left */}
          <div className="mb-4 overflow-hidden">
            <div className="carousel-track-left flex gap-4">
              {[...topRowImages, ...topRowImages].map((img, index) => (
                <div
                  key={`top-${index}`}
                  className="h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl md:h-40 md:w-60"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - scrolls right */}
          <div className="overflow-hidden">
            <div className="carousel-track-right flex gap-4">
              {[...bottomRowImages, ...bottomRowImages].map((img, index) => (
                <div
                  key={`bottom-${index}`}
                  className="h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl md:h-40 md:w-60"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
