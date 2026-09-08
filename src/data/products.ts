import { Product } from '../types';

export const essentialsEdit: Product[] = [
  {
    id: 'ess-01',
    name: 'THE EVERYDAY LINEN TROUSER',
    price: 32000,
    imageUrl: '/src/assets/essentials_1.jpg',
    category: 'essentials',
    badge: 'Best Seller',
    badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
    fabric: 'Premium Linen',
    occasion: 'Everyday Essentials'
  },
  {
    id: 'ess-02',
    name: 'NEUTRAL SILK SLIP DRESS',
    price: 45000,
    imageUrl: '/src/assets/essentials_2.jpg',
    category: 'essentials',
    badge: 'New Arrival',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    fabric: '100% Mulberry Silk',
    occasion: 'Everyday Essentials'
  },
  {
    id: 'ess-03',
    name: 'OVERSIZED CRISP SHIRT',
    price: 28000,
    imageUrl: '/src/assets/essentials_3.jpg',
    category: 'essentials',
    fabric: 'Egyptian Cotton',
    occasion: 'Everyday Essentials'
  }
];

export const modernDenim: Product[] = [
  {
    id: 'denim-01',
    name: 'TAILORED DENIM JACKET',
    price: 55000,
    imageUrl: '/src/assets/hero_carousel_4.jpg',
    category: 'denim',
    badge: 'Limited Edition',
    badgeColor: 'bg-black text-white border-black',
    fabric: 'Heavyweight Denim',
    occasion: 'Streetwear'
  },
  {
    id: 'denim-02',
    name: 'CHIC CARGO DENIM',
    price: 42000,
    imageUrl: '/src/assets/hero_carousel_5.jpg',
    category: 'denim',
    fabric: 'Stretch Denim',
    occasion: 'Streetwear'
  }
];

export const eveningGlamour: Product[] = [
  {
    id: 'eve-01',
    name: 'NOIR VELVET COCKTAIL',
    price: 85000,
    imageUrl: '/src/assets/hero_carousel_6.jpg',
    category: 'evening',
    badge: 'Bespoke Custom Fit',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    fabric: 'Luxury Velvet',
    occasion: 'Evening Wear',
    isBespoke: true
  },
  {
    id: 'eve-02',
    name: 'ARCHITECTURAL EVENING GOWN',
    price: 120000,
    imageUrl: '/src/assets/hero_carousel_7.jpg',
    category: 'evening',
    fabric: 'Structured Mikado Silk',
    occasion: 'Red Carpet',
    isBespoke: true
  },
  {
    id: 'eve-03',
    name: 'EMBELLISHED GALA DRESS',
    price: 150000,
    imageUrl: '/src/assets/hero_carousel_8.jpg',
    category: 'evening',
    badge: 'Pre-Order',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    fabric: 'Hand-Beaded Tulle',
    occasion: 'Evening Wear',
    isPreOrder: true
  }
];

export const bespokeTailoring: Product[] = [
  {
    id: 'tailor-01',
    name: 'OVERSIZED POWER SUIT',
    price: 95000,
    imageUrl: '/src/assets/hero_carousel_1.jpg',
    category: 'tailoring',
    badge: 'Bespoke Only',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    fabric: 'Italian Wool Blend',
    occasion: 'Corporate / Evening',
    isBespoke: true
  },
  {
    id: 'tailor-02',
    name: 'STRUCTURED TRENCH COAT',
    price: 110000,
    imageUrl: '/src/assets/hero_carousel_2.jpg',
    category: 'tailoring',
    fabric: 'Water-Resistant Gabardine',
    occasion: 'Outerwear',
    isBespoke: true
  }
];

// For backward compatibility or easy mapping
export const featuredProducts: Product[] = [...essentialsEdit, ...modernDenim];
export const dresses: Product[] = [...eveningGlamour, ...bespokeTailoring];
