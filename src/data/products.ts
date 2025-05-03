
import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Mukhallat Inspired Perfume",
    tagline: "A Journey Into Opulence and Tradition",
    description: "Step into a world of luxury, culture, and sensuality with our nano-encapsulated Mukhallat Inspired Perfume. A fragrance that takes you on an aromatic journey, blending the richness of traditional Arabic notes with modern elegance. This Oriental masterpiece is a symphony of oud, florals, spices, and sweet notes, creating a luxurious, deep, and balanced scent that connects you to an ancient heritage while offering an experience of pure indulgence.",
    price: 280,
    imageSrc: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1974&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Oud (Agarwood)", "Rose", "Saffron", "Amber"],
      middle: ["Musk", "Sandalwood", "Patchouli"],
      base: ["Vanilla", "Jasmine", "Cedarwood"]
    },
    categories: ["Oriental", "Woody"],
    longevity: "12+ hours",
    sillage: "Heavy",
    occasions: ["Evening", "Special Occasion", "Winter"],
    experience: [
      "Cultural Richness",
      "Opulent Luxury",
      "Sensual Depth",
      "Exotic Mystery",
      "Personal Distinction",
      "Spiritual Connection",
      "Nostalgic Comfort",
      "Enduring Presence",
      "Ceremonial Significance",
      "Intimate Warmth"
    ],
    whyChoose: ["Mukhallat is more than a fragrance; it's an emotional experience. As it evolves on your skin, it creates an aromatic journey that unfolds slowly, offering a meditative, luxurious sensation."],
    isArabicBestSelling: true
  },
  {
    id: 2,
    name: "APOM (A Part of Me) Inspired Perfume",
    tagline: "A Fragrance That Evokes Elegance and Intimacy",
    description: "Step into a world of timeless beauty and personal connection with APOM (A Part of Me), a nano-encapsulated fragrance that embodies warmth, sensuality, and sophisticated grace. A perfect balance of bright florals and deep, grounding woods, this scent envelops you in a comforting embrace while offering a luminous, radiant presence.",
    price: 250,
    imageSrc: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=2070&auto=format&fit=crop",
    fragranceNotes: {
      top: ["Orange Blossom", "Bergamot", "Neroli"],
      middle: ["Ylang-Ylang", "Jasmine", "Lavender"],
      base: ["Cedarwood", "Patchouli", "Sandalwood"]
    },
    categories: ["Floral", "Woody"],
    longevity: "8-10 hours",
    sillage: "Moderate",
    occasions: ["Daytime", "Spring", "Summer"],
    experience: [
      "Mediterranean Serenity",
      "Sophisticated Elegance",
      "Intimate Warmth",
      "Luminous Optimism",
      "Natural Authenticity",
      "Quiet Confidence",
      "Cultural Appreciation",
      "Refreshing Clarity",
      "Romantic Nostalgia",
      "Timeless Beauty"
    ],
    emotionalJourney: "A blend of lightness, depth, freshness, and warmth that becomes a part of you."
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
    occasions: ["Formal", "Special Occasion", "Winter"],
    variants: [
      {
        id: "intense",
        name: "Celestial Oud Intense",
        price: 430,
        description: "A more concentrated version with enhanced oud and incense notes for a deeper, more mysterious experience."
      },
      {
        id: "limited",
        name: "Celestial Oud Limited Edition",
        price: 490,
        description: "Enriched with rare agarwood and saffron from Kashmir, packaged in a hand-crafted crystal bottle.",
        imageSrc: "https://images.unsplash.com/photo-1557170334-a9086d21c4a1?q=80&w=2036&auto=format&fit=crop"
      },
      {
        id: "travel",
        name: "Celestial Oud Travel Size",
        price: 190,
        description: "The same divine fragrance in a compact, travel-friendly size perfect for your journeys."
      }
    ],
    isMensBestSelling: true
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
    occasions: ["Daytime", "Spring", "Summer"],
    isWomensBestSelling: true
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
