
export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  description?: string;
  imageSrc?: string;
}

export interface Product {
  id: number | string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  imageSrc: string;
  fragranceNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  categories: string[];
  longevity: string;
  sillage: string;
  occasions: string[];
  experience?: string[];
  emotionalJourney?: string;
  whyChoose?: string[];
  variants?: ProductVariant[];
  // Add bestselling flags
  isMensBestSelling?: boolean;
  isWomensBestSelling?: boolean;
  isArabicBestSelling?: boolean;
}
