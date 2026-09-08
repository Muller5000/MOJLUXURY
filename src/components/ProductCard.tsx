import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOrderClick?: (product: Product) => void;
  onBespokeClick?: (product: Product) => void;
  onSizeGuideClick?: () => void;
}

export function ProductCard({ product, onOrderClick, onBespokeClick, onSizeGuideClick }: ProductCardProps) {
  
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
      className="group cursor-pointer flex flex-col items-center text-center bg-white border border-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-xl">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge Overlay */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${
            product.badgeColor || 'bg-white text-gray-800 border-gray-200'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Urgency Badge */}
        {isLowStock && !product.badge && (
          <span className="absolute top-3 left-3 bg-red-50 text-red-700 border border-red-100 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm animate-pulse">
            Only {lowStockCount} Left
          </span>
        )}

        {/* Quick Sizing overlay */}
        {product.fabric && (
          <span className="absolute bottom-3 left-3 text-[9px] bg-black/60 text-white font-medium px-2 py-0.5 rounded backdrop-blur-sm">
            {product.fabric}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col items-center justify-center text-center w-full px-1">
        <span className="text-[10px] text-amber-800 uppercase tracking-widest font-semibold mb-1">
          {product.occasion || 'Ready-to-Wear'}
        </span>
        <h3 className="text-sm font-serif font-bold tracking-wide uppercase mb-1 text-gray-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
          {product.name}
        </h3>

        {/* Social Proof Star Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i === 4 && rating < '5.0' ? 'opacity-50' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-gray-500">({reviews})</span>
        </div>

        <span className="text-sm font-semibold text-gray-900 mb-3">₦{product.price.toLocaleString()}</span>

        {/* Interaction Actions */}
        <div className="w-full grid grid-cols-1 gap-2 pt-2 border-t border-gray-50">
          <button 
            onClick={handleOrderClick}
            className="w-full bg-black hover:bg-amber-950 text-white font-semibold uppercase tracking-widest text-[10px] py-2.5 rounded transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </button>

          <div className="flex gap-2">
            {onSizeGuideClick && (
              <button 
                onClick={(e) => { e.stopPropagation(); onSizeGuideClick(); }}
                className="flex-1 bg-gray-50 hover:bg-amber-50 hover:text-amber-950 text-gray-500 font-medium uppercase tracking-wider text-[9px] py-2 rounded transition-colors"
              >
                Size Guide
              </button>
            )}
            {product.isBespoke && onBespokeClick && (
              <button 
                onClick={(e) => { e.stopPropagation(); onBespokeClick(product); }}
                className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/50 font-semibold uppercase tracking-wider text-[9px] py-2 rounded transition-colors"
              >
                Bespoke Fit
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
