import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onStartPlanning: () => void;
}

const Navbar = ({ onStartPlanning }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isScrolled ? "bg-coral" : "bg-primary-foreground/20 backdrop-blur-sm"}`}>
            <Compass className={`h-6 w-6 ${isScrolled ? "text-primary-foreground" : "text-primary-foreground"}`} />
          </div>
          <span className={`font-display text-xl font-bold ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
            Wanderlust
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {["Destinations", "How It Works", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={`text-sm font-medium transition-colors hover:text-coral ${
                isScrolled ? "text-foreground" : "text-primary-foreground/90"
              }`}
            >
              {item}
            </a>
          ))}
          <Button
            variant={isScrolled ? "hero" : "heroOutline"}
            onClick={onStartPlanning}
          >
            Start Planning
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border/20 bg-card/95 px-4 py-6 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-4">
            {["Destinations", "How It Works", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-foreground hover:text-coral"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button variant="hero" onClick={onStartPlanning} className="mt-2">
              Start Planning
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
