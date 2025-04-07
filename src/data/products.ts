
import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Midnight Elixir",
    tagline: "A captivating blend of mystery and allure",
    description: "Midnight Elixir is a mesmerizing fragrance that opens with a burst of bergamot and black pepper, gradually unveiling a heart of rich jasmine and smoky incense. The base notes of amber, patchouli, and vanilla create a lingering warmth that captivates the senses and leaves an unforgettable impression.",
    price: 280,
    imageSrc: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1974&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      middle: ["Jasmine", "Orris", "Incense"],
      base: ["Amber", "Patchouli", "Vanilla", "Tonka Bean"]
    },
    categories: ["Oriental", "Woody"],
    longevity: "8-10 hours",
    sillage: "Moderate to heavy",
    occasions: ["Evening", "Formal", "Winter"]
  },
  {
    id: 2,
    name: "Golden Opulence",
    tagline: "An exquisite expression of luxury",
    description: "Golden Opulence is an exquisite composition that embodies true luxury. Beginning with sparkling citruses and aromatic saffron, it evolves into a heart of precious rose and creamy tuberose. The magnificent dry down features sandalwood, vetiver, and rich oud, creating an aura of opulence that lasts throughout the day.",
    price: 320,
    imageSrc: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2070&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Mandarin", "Bergamot", "Saffron"],
      middle: ["Rose", "Tuberose", "Orange Blossom"],
      base: ["Sandalwood", "Vetiver", "Oud", "Musk"]
    },
    categories: ["Oriental", "Floral"],
    longevity: "10-12 hours",
    sillage: "Strong",
    occasions: ["Special Occasion", "Evening", "Winter"]
  },
  {
    id: 3,
    name: "Velvet Noir",
    tagline: "Embrace the depth of darkness",
    description: "Velvet Noir is an intoxicating journey into darkness. The fragrance opens with spicy pink pepper and rich plum, leading to a heart of black violet and dark rose. The base of smoky vetiver, leather, and black amber creates a mysterious trail that lingers like a secret whispered in the night.",
    price: 240,
    imageSrc: "https://images.unsplash.com/photo-1619994403073-2256c0835ba1?q=80&w=2070&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Pink Pepper", "Plum", "Blackcurrant"],
      middle: ["Dark Rose", "Black Violet", "Leather"],
      base: ["Vetiver", "Black Amber", "Patchouli", "Vanilla"]
    },
    categories: ["Woody", "Spicy"],
    longevity: "6-8 hours",
    sillage: "Moderate",
    occasions: ["Evening", "Fall", "Winter"]
  },
  {
    id: 4,
    name: "Celestial Oud",
    tagline: "Where earth meets the heavens",
    description: "Celestial Oud is a divine composition that bridges earthly richness with heavenly sophistication. Opening with bright bergamot and spicy saffron, it reveals a heart of precious oud and smoky incense. The base of aged sandalwood, amber, and deep musk creates an otherworldly experience that transcends time and place.",
    price: 390,
    imageSrc: "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=1974&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Bergamot", "Saffron", "Cinnamon"],
      middle: ["Oud", "Incense", "Rose"],
      base: ["Sandalwood", "Amber", "Musk", "Patchouli"]
    },
    categories: ["Woody", "Oriental"],
    longevity: "12+ hours",
    sillage: "Heavy",
    occasions: ["Formal", "Special Occasion", "Winter"]
  },
  {
    id: 5,
    name: "Éclat de Soleil",
    tagline: "Captured sunshine in a bottle",
    description: "Éclat de Soleil is pure radiance captured in a fragrance. Bursting with vibrant citruses and juicy fruits, it evolves into a heart of sun-drenched florals. The base of creamy woods, amber, and musk creates a warm glow that embodies the perfect summer day, bringing light and joy to any occasion.",
    price: 210,
    imageSrc: "https://images.unsplash.com/photo-1617184003107-0df15fea4903?q=80&w=2070&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Bergamot", "Mandarin", "Neroli"],
      middle: ["Orange Blossom", "Jasmine", "Ylang-Ylang"],
      base: ["White Amber", "Sandalwood", "Vanilla", "Musk"]
    },
    categories: ["Citrus", "Floral"],
    longevity: "5-7 hours",
    sillage: "Moderate",
    occasions: ["Daytime", "Spring", "Summer"]
  },
  {
    id: 6,
    name: "Satin Rose",
    tagline: "The epitome of timeless elegance",
    description: "Satin Rose is a modern interpretation of the queen of flowers. Opening with a sparkle of pink pepper and lychee, it unveils a heart of damask rose, peony, and silky violet. The base of patchouli, creamy sandalwood, and soft musk creates a sophisticated sillage that epitomizes contemporary elegance.",
    price: 250,
    imageSrc: "https://images.unsplash.com/photo-1557170334-a9086d21c4a1?q=80&w=2036&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Pink Pepper", "Lychee", "Bergamot"],
      middle: ["Damask Rose", "Peony", "Violet"],
      base: ["Sandalwood", "Patchouli", "Musk", "Ambrette"]
    },
    categories: ["Floral", "Fresh"],
    longevity: "7-9 hours",
    sillage: "Moderate",
    occasions: ["Daytime", "Spring", "Summer"]
  },
];

export const getUniqueCategories = () => {
  const allCategories: string[] = [];
  
  products.forEach(product => {
    product.categories.forEach(category => {
      if (!allCategories.includes(category)) {
        allCategories.push(category);
      }
    });
  });
  
  return allCategories;
};
