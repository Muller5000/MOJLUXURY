export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  hoverImageUrl?: string;
  hoverVideoUrl?: string;
  category: string; // E.g., 'featured', 'dresses', 'tops-bottoms', 'sets'
  badge?: string;    // E.g., 'Ready to Wear', 'Pre-Order', 'Bespoke Only'
  badgeColor?: string; // Tailwind class like 'bg-emerald-50 text-emerald-700'
  fabric?: string;   // E.g., 'Ankara Print', 'Luxury Crepe', 'Adire Silk'
  occasion?: string; // E.g., 'Owambe Party', 'Corporate Slay', 'Ready-to-Wear Casual', 'Sunday Best'
  isPreOrder?: boolean;
  isBespoke?: boolean;
}

export interface CustomMeasurements {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  sleeveLength?: string;
  hemLength?: string;
  notes?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string; // Standard sizing (e.g. "UK 10")
  bespokeMeasurements?: CustomMeasurements; // Custom fit sizing
}
