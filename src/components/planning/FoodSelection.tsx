import { Star, MapPin, Clock, Check, Flame, Leaf } from "lucide-react";

interface FoodSelectionProps {
  destination: string;
  selectedRestaurants: any[];
  onSelect: (restaurants: any[]) => void;
}

const mockRestaurants = [
  {
    id: 1,
    name: "La Petite Maison",
    cuisine: "French Fine Dining",
    rating: 4.9,
    priceLevel: "$$$",
    walkTime: "5 min walk",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    isIconic: true,
    mustTry: "Duck Confit with truffle sauce",
    dietary: [],
  },
  {
    id: 2,
    name: "Street Bites Corner",
    cuisine: "Local Street Food",
    rating: 4.7,
    priceLevel: "$",
    walkTime: "8 min walk",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    isIconic: false,
    mustTry: "Traditional meat skewers",
    dietary: [],
  },
  {
    id: 3,
    name: "The Green Table",
    cuisine: "Vegetarian Cafe",
    rating: 4.6,
    priceLevel: "$$",
    walkTime: "12 min walk",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    isIconic: false,
    mustTry: "Buddha bowl with tahini",
    dietary: ["vegetarian", "vegan-options"],
  },
  {
    id: 4,
    name: "Ocean Pearl",
    cuisine: "Seafood",
    rating: 4.8,
    priceLevel: "$$$",
    walkTime: "15 min walk",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&h=300&fit=crop",
    isIconic: true,
    mustTry: "Fresh catch of the day",
    dietary: [],
  },
  {
    id: 5,
    name: "Nonna's Kitchen",
    cuisine: "Italian Trattoria",
    rating: 4.7,
    priceLevel: "$$",
    walkTime: "10 min walk",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
    isIconic: false,
    mustTry: "Handmade pasta carbonara",
    dietary: [],
  },
  {
    id: 6,
    name: "Sunrise Bakery",
    cuisine: "Cafe & Pastries",
    rating: 4.5,
    priceLevel: "$",
    walkTime: "3 min walk",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    isIconic: false,
    mustTry: "Almond croissant",
    dietary: ["vegetarian"],
  },
  {
    id: 7,
    name: "Spice Route",
    cuisine: "Asian Fusion",
    rating: 4.8,
    priceLevel: "$$",
    walkTime: "18 min walk",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop",
    isIconic: false,
    mustTry: "Crispy duck bao buns",
    dietary: [],
  },
  {
    id: 8,
    name: "The Rooftop Bar",
    cuisine: "Cocktails & Tapas",
    rating: 4.6,
    priceLevel: "$$",
    walkTime: "7 min walk",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop",
    isIconic: true,
    mustTry: "Sunset sangria",
    dietary: ["vegetarian"],
  },
];

const FoodSelection = ({ destination, selectedRestaurants, onSelect }: FoodSelectionProps) => {
  const toggleRestaurant = (restaurant: any) => {
    const isSelected = selectedRestaurants.some((r) => r.id === restaurant.id);
    if (isSelected) {
      onSelect(selectedRestaurants.filter((r) => r.id !== restaurant.id));
    } else {
      onSelect([...selectedRestaurants, restaurant]);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
          Taste {destination}
        </h1>
        <p className="text-lg text-muted-foreground">
          Select restaurants and eateries for your trip ({selectedRestaurants.length} selected)
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {mockRestaurants.map((restaurant) => {
          const isSelected = selectedRestaurants.some((r) => r.id === restaurant.id);
          return (
            <button
              key={restaurant.id}
              onClick={() => toggleRestaurant(restaurant)}
              className={`group relative overflow-hidden rounded-2xl border-2 bg-card text-left transition-all ${
                isSelected
                  ? "border-gold shadow-lg shadow-gold/20"
                  : "border-transparent shadow-md hover:shadow-lg"
              }`}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-accent-foreground">
                  <Check className="h-5 w-5" />
                </div>
              )}

              <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                {restaurant.isIconic && (
                  <span className="flex items-center gap-1 rounded-full bg-coral px-2 py-1 text-xs font-medium text-primary-foreground">
                    <Flame className="h-3 w-3" />
                    Iconic
                  </span>
                )}
                {restaurant.dietary.includes("vegetarian") && (
                  <span className="flex items-center gap-1 rounded-full bg-teal px-2 py-1 text-xs font-medium text-secondary-foreground">
                    <Leaf className="h-3 w-3" />
                  </span>
                )}
              </div>

              <div className="relative h-36 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-3 right-3 rounded-full bg-card/90 px-2 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
                  {restaurant.priceLevel}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-gold">
                    {restaurant.cuisine}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    <span className="text-foreground">{restaurant.rating}</span>
                  </div>
                </div>

                <h3 className="mb-2 font-display text-base font-semibold text-foreground line-clamp-1">
                  {restaurant.name}
                </h3>

                <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {restaurant.walkTime}
                </div>

                <p className="text-xs text-coral">
                  <span className="font-medium">Try:</span> {restaurant.mustTry}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FoodSelection;
