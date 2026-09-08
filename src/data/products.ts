import { Product } from '../types';

import ess1 from '../assets/essentials_1.jpg';
import ess2 from '../assets/essentials_2.jpg';
import ess3 from '../assets/essentials_3.jpg';
import denim1 from '../assets/hero_carousel_4.jpg';
import denim2 from '../assets/hero_carousel_5.jpg';
import eve1 from '../assets/hero_carousel_6.jpg';
import eve2 from '../assets/hero_carousel_7.jpg';
import eve3 from '../assets/hero_carousel_8.jpg';
import tailor1 from '../assets/hero_carousel_1.jpg';
import tailor2 from '../assets/hero_carousel_2.jpg';
import demoVideo from '../assets/atelier_video.mp4';

export const essentialsEdit: Product[] = [
  {
    id: 'ess-01',
    name: 'THE EVERYDAY LINEN TROUSER',
    price: 32000,
    imageUrl: ess1,
    hoverVideoUrl: demoVideo,
    category: 'Essentials',
    badge: 'Best Seller',
    badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
    fabric: 'Premium Linen',
    occasion: 'Everyday Essentials'
  },
  {
    id: 'ess-02',
    name: 'NEUTRAL SILK SLIP DRESS',
    price: 45000,
    imageUrl: ess2,
    category: 'Essentials',
    badge: 'New Arrival',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    fabric: '100% Mulberry Silk',
    occasion: 'Everyday Essentials'
  },
  {
    id: 'ess-03',
    name: 'OVERSIZED CRISP SHIRT',
    price: 28000,
    imageUrl: ess3,
    category: 'Essentials',
    fabric: 'Egyptian Cotton',
    occasion: 'Everyday Essentials'
  }
];

export const modernDenim: Product[] = [
  {
    id: 'denim-01',
    name: 'TAILORED DENIM JACKET',
    price: 55000,
    imageUrl: denim1,
    category: 'Denim',
    badge: 'Limited Edition',
    badgeColor: 'bg-black text-white border-black',
    fabric: 'Heavyweight Denim',
    occasion: 'Streetwear'
  },
  {
    id: 'denim-02',
    name: 'CHIC CARGO DENIM',
    price: 42000,
    imageUrl: denim2,
    category: 'Denim',
    fabric: 'Stretch Denim',
    occasion: 'Streetwear'
  }
];

export const eveningGlamour: Product[] = [
  {
    id: 'eve-01',
    name: 'NOIR VELVET COCKTAIL',
    price: 85000,
    imageUrl: eve1,
    category: 'Evening',
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
    imageUrl: eve2,
    category: 'Evening',
    fabric: 'Structured Mikado Silk',
    occasion: 'Red Carpet',
    isBespoke: true
  },
  {
    id: 'eve-03',
    name: 'EMBELLISHED GALA DRESS',
    price: 150000,
    imageUrl: eve3,
    category: 'Evening',
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
    imageUrl: tailor1,
    category: 'Tailoring',
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
    imageUrl: tailor2,
    category: 'Tailoring',
    fabric: 'Water-Resistant Gabardine',
    occasion: 'Outerwear',
    isBespoke: true
  }
];

// Combine all for easy mapping
export const allCatalogProducts: Product[] = [
  ...essentialsEdit,
  ...modernDenim,
  ...eveningGlamour,
  ...bespokeTailoring
];
