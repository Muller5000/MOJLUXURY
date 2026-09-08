import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string) => void;
  onBespokeClick?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export function QuickViewModal({ product, isOpen, onClose, onAddToCart, onBespokeClick, isWishlisted = false, onToggleWishlist }: QuickViewModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-sm backdrop-blur transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-gray-100">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${product.badgeColor || 'bg-white text-gray-900 border border-gray-100'}`}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
              <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-2">{product.category}</p>
                <h2 className="text-3xl font-serif text-gray-900 leading-tight mb-3">{product.name}</h2>
                <p className="text-2xl text-amber-900 font-medium">₦{product.price.toLocaleString()}</p>
              </div>

              <div className="space-y-4 mb-8">
                {product.fabric && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Fabric</span>
                    <p className="text-gray-800">{product.fabric}</p>
                  </div>
                )}
                {product.occasion && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Perfect For</span>
                    <p className="text-gray-800">{product.occasion}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Description</span>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Exquisitely crafted to elevate your wardrobe. This piece embodies the modern luxury aesthetic, merging timeless elegance with contemporary design.
                  </p>
                </div>
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => { onAddToCart(product); onClose(); }}
                    className="flex-1 bg-black hover:bg-amber-950 text-white font-semibold uppercase tracking-widest text-sm py-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </button>
                  {onToggleWishlist && (
                    <button 
                      onClick={() => onToggleWishlist(product)}
                      className={`px-5 rounded-lg border flex items-center justify-center transition-colors ${
                        isWishlisted 
                          ? 'border-red-200 bg-red-50 text-red-500' 
                          : 'border-gray-200 bg-white text-gray-400 hover:text-gray-900 hover:border-gray-300'
                      }`}
                      aria-label="Toggle Wishlist"
                    >
                      <Heart className={isWishlisted ? 'fill-red-500' : ''} size={24} />
                    </button>
                  )}
                </div>
                
                {product.isBespoke && onBespokeClick && (
                  <button 
                    onClick={() => { onBespokeClick(product); onClose(); }}
                    className="w-full bg-amber-50 hover:bg-amber-100 text-amber-950 font-semibold uppercase tracking-widest text-sm py-4 rounded-lg border border-amber-200 transition-colors shadow-sm"
                  >
                    Request Bespoke Fit
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
