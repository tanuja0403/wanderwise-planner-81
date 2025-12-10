import { Star, MapPin, Clock, Check, Sparkles } from "lucide-react";

interface PlacesSelectionProps {
  destination: string;
  selectedPlaces: any[];
  onSelect: (places: any[]) => void;
}

const mockPlaces = [
  {
    id: 1,
    name: "Historic Old Town Square",
    type: "Landmark",
    rating: 4.8,
    duration: "2-3 hours",
    distance: "0.5 km from hotel",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=300&fit=crop",
    isHiddenGem: false,
    tip: "Best visited early morning before crowds",
  },
  {
    id: 2,
    name: "Secret Garden Courtyard",
    type: "Hidden Gem",
    rating: 4.9,
    duration: "1 hour",
    distance: "1.2 km from hotel",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    isHiddenGem: true,
    tip: "Local favorite, rarely in guidebooks",
  },
  {
    id: 3,
    name: "National Art Museum",
    type: "Museum",
    rating: 4.7,
    duration: "3-4 hours",
    distance: "2.1 km from hotel",
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&h=300&fit=crop",
    isHiddenGem: false,
    tip: "Free entry on first Sunday of month",
  },
  {
    id: 4,
    name: "Sunset Viewpoint Trail",
    type: "Nature",
    rating: 4.9,
    duration: "2 hours",
    distance: "5 km from hotel",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    isHiddenGem: true,
    tip: "Perfect for sunset photos",
  },
  {
    id: 5,
    name: "Central Market Hall",
    type: "Market",
    rating: 4.6,
    duration: "1-2 hours",
    distance: "0.8 km from hotel",
    image: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=400&h=300&fit=crop",
    isHiddenGem: false,
    tip: "Best for local snacks and souvenirs",
  },
  {
    id: 6,
    name: "Artisan Workshop Quarter",
    type: "Cultural",
    rating: 4.5,
    duration: "2 hours",
    distance: "1.5 km from hotel",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    isHiddenGem: true,
    tip: "Watch local craftsmen at work",
  },
  {
    id: 7,
    name: "Royal Palace Gardens",
    type: "Garden",
    rating: 4.8,
    duration: "2-3 hours",
    distance: "1.8 km from hotel",
    image: "https://images.unsplash.com/photo-1558618047-f4b511e9b3ab?w=400&h=300&fit=crop",
    isHiddenGem: false,
    tip: "Stunning in spring with blooming flowers",
  },
  {
    id: 8,
    name: "Underground History Tour",
    type: "Activity",
    rating: 4.7,
    duration: "1.5 hours",
    distance: "0.3 km from hotel",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop",
    isHiddenGem: false,
    tip: "Book in advance, tours fill up fast",
  },
];

const PlacesSelection = ({ destination, selectedPlaces, onSelect }: PlacesSelectionProps) => {
  const togglePlace = (place: any) => {
    const isSelected = selectedPlaces.some((p) => p.id === place.id);
    if (isSelected) {
      onSelect(selectedPlaces.filter((p) => p.id !== place.id));
    } else {
      onSelect([...selectedPlaces, place]);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
          Discover {destination}
        </h1>
        <p className="text-lg text-muted-foreground">
          Select the places and activities you'd like to visit ({selectedPlaces.length} selected)
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {mockPlaces.map((place) => {
          const isSelected = selectedPlaces.some((p) => p.id === place.id);
          return (
            <button
              key={place.id}
              onClick={() => togglePlace(place)}
              className={`group relative overflow-hidden rounded-2xl border-2 bg-card text-left transition-all ${
                isSelected
                  ? "border-teal shadow-lg shadow-teal/20"
                  : "border-transparent shadow-md hover:shadow-lg"
              }`}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-teal text-secondary-foreground">
                  <Check className="h-5 w-5" />
                </div>
              )}

              {place.isHiddenGem && (
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gold px-2 py-1 text-xs font-medium text-accent-foreground">
                  <Sparkles className="h-3 w-3" />
                  Hidden Gem
                </div>
              )}

              <div className="relative h-36 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-teal">
                    {place.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    <span className="text-foreground">{place.rating}</span>
                  </div>
                </div>

                <h3 className="mb-2 font-display text-base font-semibold text-foreground line-clamp-1">
                  {place.name}
                </h3>

                <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {place.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {place.distance}
                  </span>
                </div>

                <p className="text-xs text-coral line-clamp-2">{place.tip}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesSelection;
