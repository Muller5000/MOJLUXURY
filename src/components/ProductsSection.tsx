import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductsSectionProps {
  categories: { value: string; label: string }[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  filteredProducts: Product[];
  triggerSizeGuide: () => void;
  setSelectedSizeProduct: (product: Product | null) => void;
  triggerBespokeModal: (product: Product) => void;
}

export function ProductsSection({
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredProducts,
  triggerSizeGuide,
  setSelectedSizeProduct,
  triggerBespokeModal
}: ProductsSectionProps) {
  return (
    <motion.section
      id="products-section"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center mb-12">
        <span className="text-xs text-amber-800 uppercase tracking-widest font-semibold block mb-1">Curated Collections</span>
        <h2 className="text-4xl md:text-5xl font-serif tracking-tight uppercase mb-4">Shop By Occasion</h2>
        <p className="italic text-gray-600 max-w-2xl mx-auto font-serif text-base leading-loose">
          Discover beautiful, size-inclusive ready-to-wear and bespoke garments crafted to fit your shape flawlessly for Nigeria's most vibrant events.
        </p>
      </div>

      <div className="mb-12 bg-gradient-to-r from-amber-50/70 via-orange-50/30 to-amber-50/70 border border-amber-100/50 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">📏 Fits Like A Dream</span>
          <span className="text-xs text-amber-900/80">Every piece is hand-tailored. Toggle the sizing chart or request bespoke custom sizing on any item!</span>
        </div>
        <button
          onClick={triggerSizeGuide}
          className="bg-amber-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          Open Size Guide
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
              selectedCategory === cat.value
                ? 'bg-amber-950 text-white shadow-md'
                : 'bg-white border border-gray-100 text-gray-600 hover:bg-amber-50/40 hover:text-amber-950'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrderClick={(p) => setSelectedSizeProduct(p)}
              onBespokeClick={triggerBespokeModal}
              onSizeGuideClick={triggerSizeGuide}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500 font-serif italic">
          No garments are currently categorized under this collection. Check back soon!
        </div>
      )}
    </motion.section>
  );
}