import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOrderClick?: (product: Product) => void;
  onBespokeClick?: (product: Product) => void;
  onSizeGuideClick?: () => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onOrderClick, onBespokeClick, onSizeGuideClick, onQuickView }: ProductCardProps) {
  
  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOrderClick) {
      onOrderClick(product);
    }
  };

  // Generate stable pseudo-random social proof data based on product id
  const { rating, reviews, isLowStock, lowStockCount } = useMemo(() => {
    const hash = product.id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      rating: (4.6 + (hash % 4) * 0.1).toFixed(1),
      reviews: 12 + (hash % 150),
      isLowStock: hash % 3 === 0,
      lowStockCount: 2 + (hash % 4)
    };
  }, [product.id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      className="group cursor-pointer flex flex-col relative w-full"
    >
      {/* Product Image with Interactive Glassmorphic Overlay */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${product.hoverImageUrl ? 'group-hover:opacity-0' : 'group-hover:scale-125'}`}
        />
        {product.hoverImageUrl && (
          <img 
            src={product.hoverImageUrl} 
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out scale-100"
          />
        )}

        {/* Badge Overlay */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm z-10 ${
            product.badgeColor || 'bg-white text-gray-900 border border-gray-100'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Urgency Badge */}
        {isLowStock && !product.badge && (
          <span className="absolute top-3 left-3 bg-red-50 text-red-700 border border-red-100 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm animate-pulse z-10">
            Only {lowStockCount} Left
          </span>
        )}

        {/* Quick Sizing overlay */}
        {product.fabric && (
          <span className="absolute top-3 right-3 text-[9px] bg-black/60 text-white font-medium px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
            {product.fabric}
          </span>
        )}

        {/* --- GLASSMORPHIC HOVER REVEAL PANEL --- */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/70 backdrop-blur-md border-t border-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col gap-2 z-20">
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); if(onQuickView) onQuickView(product); }}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold uppercase tracking-widest text-[10px] py-3 rounded shadow-sm border border-gray-200 transition-colors"
            >
              Quick View
            </button>
            <button 
              onClick={handleOrderClick}
              className="flex-1 bg-black hover:bg-amber-950 text-white font-semibold uppercase tracking-widest text-[10px] py-3 rounded transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              Add to Cart
            </button>
          </div>

          <div className="flex gap-2">
            {onSizeGuideClick && (
              <button 
                onClick={(e) => { e.stopPropagation(); onSizeGuideClick(); }}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-medium uppercase tracking-wider text-[9px] py-2.5 rounded shadow-sm transition-colors"
              >
                Size Guide
              </button>
            )}
            {product.isBespoke && onBespokeClick && (
              <button 
                onClick={(e) => { e.stopPropagation(); onBespokeClick(product); }}
                className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-950 font-semibold uppercase tracking-wider text-[9px] py-2.5 rounded shadow-sm transition-colors"
              >
                Bespoke Fit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Details (Clean, Minimalist approach outside the image) */}
      <div className="flex flex-col items-center justify-center text-center w-full px-2">
        <span className="text-[10px] text-amber-800 uppercase tracking-widest font-semibold mb-1">
          {product.occasion || 'Ready-to-Wear'}
        </span>
        <h3 className="text-[15px] font-serif font-bold tracking-wide uppercase mb-1.5 text-gray-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
          {product.name}
        </h3>

        {/* Social Proof Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i === 4 && rating < '5.0' ? 'opacity-50' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">({reviews})</span>
        </div>

        <span className="text-[15px] font-semibold text-gray-900">₦{product.price.toLocaleString()}</span>
      </div>
    </motion.div>
  );
}
