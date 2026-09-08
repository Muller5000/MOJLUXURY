import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { allCatalogProducts } from '../data/products';
import { Product } from '../types';

interface LookbookItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  accentColor: string;
  hotspots?: { x: number; y: number; productId: string }[];
}

export function Lookbook({ onQuickView }: { onQuickView?: (product: Product) => void }) {
  const lookbookItems: LookbookItem[] = [
    {
      id: 'owambe',
      title: 'Owambe Glamour',
      tagline: 'Make a Statement at Every Wedding',
      description: 'Handcrafted premium velvet, mikado silk, and traditional silhouettes that command attention. Live your magic and own the room.',
      imageUrl: '/images/Beautiful_Nigerian_woman_wearing_a_202605290957.jpeg',
      accentColor: 'from-purple-900 to-indigo-900',
      hotspots: [{ x: 50, y: 70, productId: 'eve-01' }], // Maps to velvet cocktail for demo
    },
    {
      id: 'corporate',
      title: 'Corporate Slay',
      tagline: 'Professional Precision for Boss Women',
      description: 'Clean-cut, powerful coords and structured stretch-crepe midi dresses tailored to display absolute authority, grace, and confidence.',
      imageUrl: '/images/Stylish_Nigerian_businesswoman_wearing_a_202605291126.jpeg',
      accentColor: 'from-amber-950 to-amber-900',
      hotspots: [{ x: 45, y: 60, productId: 'tailor-01' }], // Maps to power suit
    },
    {
      id: 'sunday',
      title: 'Sunday Best',
      tagline: 'Classy Grace for Sacred Occasions',
      description: 'Sophisticated amethyst purple dresses and flowy cuts suitable for services, family gatherings, and upscale Sunday brunches.',
      imageUrl: '/images/Beautiful_Nigerian_woman_in_a_202605291051.jpeg',
      accentColor: 'from-violet-950 to-purple-950',
      hotspots: [{ x: 55, y: 50, productId: 'eve-02' }], // Maps to evening gown
    },
    {
      id: 'casual',
      title: 'Ready-to-Wear Casual',
      tagline: 'Everyday Comfort, Elevated Slay',
      description: 'Effortless linen shift dresses, airy coordinates, and breathable fabrics perfect for the tropical climate and weekend strolls.',
      imageUrl: '/images/Ultra-realistic_Nigerian_female_fashion_model_202605290956.jpeg',
      accentColor: 'from-emerald-950 to-teal-950',
      hotspots: [{ x: 48, y: 65, productId: 'ess-02' }], // Maps to slip dress
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === lookbookItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? lookbookItems.length - 1 : prev - 1));
  };

  const activeSlide = lookbookItems[currentIndex];

  return (
    <section className="py-20 bg-amber-950 text-white overflow-hidden relative">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-1">Our Lookbook</span>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide">Bespoke Occasion Styling</h2>
          <p className="text-sm text-amber-200/60 max-w-xl mx-auto mt-2 font-serif italic">Find your signature silhouette for any landmark event.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Panel */}
          <div className="lg:col-span-7 relative group aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-amber-900/50">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide.id}
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            
            {/* Interactive Hotspots */}
            <AnimatePresence>
              {activeSlide.hotspots?.map((spot, i) => (
                <motion.button
                  key={`${activeSlide.id}-spot-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => {
                    if (onQuickView) {
                      const product = allCatalogProducts.find(p => p.id === spot.productId);
                      if (product) onQuickView(product);
                    }
                  }}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className="absolute z-30 w-8 h-8 -ml-4 -mt-4 bg-white/30 rounded-full flex items-center justify-center group/hotspot"
                >
                  <div className="w-3 h-3 bg-white rounded-full shadow-lg shadow-black group-hover/hotspot:scale-150 transition-transform duration-300" />
                  <div className="absolute inset-0 border border-white rounded-full animate-ping opacity-75" />
                  
                  {/* Tooltip */}
                  <div className="absolute top-10 whitespace-nowrap bg-white text-gray-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded shadow-xl opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Shop The Look
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Visual Title Overlays */}
            <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
              <span className="text-xs text-amber-400 font-semibold tracking-widest uppercase block mb-1">{activeSlide.tagline}</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white">{activeSlide.title}</h3>
            </div>

            {/* Slider Controls inside Image */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <button 
                onClick={prevSlide}
                className="pointer-events-auto bg-black/40 hover:bg-amber-900/80 hover:text-white text-amber-100 p-3 rounded-full backdrop-blur-sm transition-all border border-amber-900/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="pointer-events-auto bg-black/40 hover:bg-amber-900/80 hover:text-white text-amber-100 p-3 rounded-full backdrop-blur-sm transition-all border border-amber-900/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Description Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-6">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-widest border-b border-amber-900 pb-2 self-start">
              Occasion Highlight
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wide">{activeSlide.title}</h3>
                <p className="text-amber-300 text-sm font-semibold tracking-wider italic uppercase">{activeSlide.tagline}</p>
                <p className="text-amber-100/70 text-sm leading-relaxed">{activeSlide.description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Quick Indicators */}
            <div className="flex gap-2 pt-4">
              {lookbookItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-amber-900/80'
                  }`}
                />
              ))}
            </div>

            <div className="pt-6">
              <a 
                href="#products-section" 
                className="inline-block bg-white text-amber-950 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-amber-100 transition-colors shadow-lg"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
