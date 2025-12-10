import { Star, MapPin, Wifi, Coffee, Car, Waves, Check } from "lucide-react";

interface HotelSelectionProps {
  destination: string;
  selectedHotel: any | null;
  onSelect: (hotel: any) => void;
}

const mockHotels = [
  {
    id: 1,
    name: "The Grand Palace Hotel",
    rating: 4.9,
    reviews: 2847,
    price: 320,
    neighborhood: "City Center",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ["wifi", "pool", "breakfast", "parking"],
    whyFits: "Perfect for couples seeking luxury in the heart of the action",
  },
  {
    id: 2,
    name: "Boutique Maison",
    rating: 4.7,
    reviews: 1523,
    price: 185,
    neighborhood: "Arts District",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    amenities: ["wifi", "breakfast"],
    whyFits: "Charming boutique hotel with local character",
  },
  {
    id: 3,
    name: "Skyline Suites",
    rating: 4.8,
    reviews: 3102,
    price: 275,
    neighborhood: "Financial District",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
    amenities: ["wifi", "pool", "parking"],
    whyFits: "Modern amenities with stunning city views",
  },
  {
    id: 4,
    name: "Harbor View Inn",
    rating: 4.5,
    reviews: 987,
    price: 145,
    neighborhood: "Waterfront",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    amenities: ["wifi", "breakfast"],
    whyFits: "Budget-friendly with beautiful harbor views",
  },
  {
    id: 5,
    name: "The Ritz Heritage",
    rating: 4.9,
    reviews: 4521,
    price: 450,
    neighborhood: "Historic Quarter",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    amenities: ["wifi", "pool", "breakfast", "parking"],
    whyFits: "5-star luxury in a historic building",
  },
  {
    id: 6,
    name: "Urban Nest Hostel",
    rating: 4.3,
    reviews: 2156,
    price: 45,
    neighborhood: "Backpacker District",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    amenities: ["wifi", "breakfast"],
    whyFits: "Social atmosphere, perfect for solo travelers",
  },
];

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  breakfast: Coffee,
  parking: Car,
  pool: Waves,
};

const HotelSelection = ({ destination, selectedHotel, onSelect }: HotelSelectionProps) => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-3 font-display text-4xl font-bold text-foreground md:text-5xl">
          Choose your hotel in {destination}
        </h1>
        <p className="text-lg text-muted-foreground">
          Select one hotel that matches your style and budget
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockHotels.map((hotel) => {
          const isSelected = selectedHotel?.id === hotel.id;
          return (
            <button
              key={hotel.id}
              onClick={() => onSelect(hotel)}
              className={`group relative overflow-hidden rounded-2xl border-2 bg-card text-left transition-all ${
                isSelected
                  ? "border-coral shadow-lg shadow-coral/20"
                  : "border-transparent shadow-md hover:shadow-lg"
              }`}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-coral text-primary-foreground">
                  <Check className="h-5 w-5" />
                </div>
              )}

              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur-sm">
                  ${hotel.price}/night
                </div>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="font-medium text-foreground">{hotel.rating}</span>
                    <span className="text-muted-foreground">({hotel.reviews})</span>
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {hotel.neighborhood}
                </div>

                <div className="mb-3 flex gap-2">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div
                        key={amenity}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted"
                        title={amenity}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-teal">{hotel.whyFits}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HotelSelection;
