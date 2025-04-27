
export interface Product {
  id: number;
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
}
