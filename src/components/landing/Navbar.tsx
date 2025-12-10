import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Compass, Plane, Hotel, User, LogOut, ChevronDown } from "lucide-react";
import LogoLight from "@/assets/LogoLight";
import LogoDark from "@/assets/LogoDark";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onStartPlanning: () => void;
}

const Navbar = ({ onStartPlanning }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Smart Itinerary", icon: Compass, href: "/smart-itinerary" },
    { label: "Flights", icon: Plane, href: "#flights" },
    { label: "Hotels", icon: Hotel, href: "#hotels" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
          <div className={`h-9 w-9 flex items-center justify-center rounded-lg`}>
            <LogoLight className="block h-9 w-9 dark:hidden" />
            <LogoDark className="hidden h-9 w-9 dark:block" />
          </div>
          <span className={`font-display text-xl font-bold ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
            ZipTrip
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${
                isScrolled ? "text-foreground hover:text-coral" : "text-primary-foreground/90"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          
          {isLoading ? (
            <div className="h-9 w-24 animate-pulse bg-muted rounded-lg" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`gap-2 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-primary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="max-w-[120px] truncate">{user.email?.split("@")[0]}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="text-muted-foreground text-xs">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/smart-itinerary")}>
                  <Compass className="mr-2 h-4 w-4" />
                  Smart Itinerary
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                className={`${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button variant="teal" onClick={onStartPlanning}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border/20 bg-card/95 px-4 py-6 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-foreground hover:bg-muted hover:text-coral text-left"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-primary-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    {user.email}
                  </div>
                  <Button variant="ghost" onClick={handleSignOut} className="justify-start text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" onClick={() => { navigate("/auth"); setIsMobileMenuOpen(false); }}>
                    Sign In
                  </Button>
                  <Button variant="teal" onClick={onStartPlanning}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
