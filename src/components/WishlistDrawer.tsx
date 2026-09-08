import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveItem: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export function WishlistDrawer({ isOpen, onClose, wishlistItems, onRemoveItem, onMoveToCart }: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between bg-amber-50/30">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-amber-900 fill-amber-900" />
                <h2 className="text-xl font-serif text-gray-900">Your Wishlist</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-900 p-2 hover:bg-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                  <Heart className="w-16 h-16 text-gray-300" strokeWidth={1} />
                  <div>
                    <p className="text-gray-900 font-serif text-xl mb-1">Your wishlist is empty</p>
                    <p className="text-sm text-gray-500 max-w-[250px]">Curate your dream wardrobe by saving your favorite pieces.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-8 py-3 bg-gray-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-amber-900 transition-colors"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow group bg-white">
                      <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1">{item.category}</p>
                          <h3 className="font-serif text-lg text-gray-900 leading-tight mb-1">{item.name}</h3>
                          <p className="text-amber-900 font-medium text-sm">₦{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            onClick={() => onMoveToCart(item)}
                            className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-amber-950 text-white text-[10px] uppercase tracking-widest font-semibold py-2.5 rounded transition-colors"
                          >
                            <ShoppingBag size={14} />
                            Add to Cart
                          </button>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors border border-gray-100"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-center text-gray-500 tracking-wider">
                  Items in your wishlist are not reserved. 
                  <br />Add them to your cart to secure your size!
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
