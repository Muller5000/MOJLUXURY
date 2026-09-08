import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface SizeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onBespokeClick: (product: Product) => void;
}

export function SizeSelectModal({ isOpen, onClose, product, onAddToCart, onBespokeClick }: SizeSelectModalProps) {
  if (!isOpen) return null;

  const [selectedSize, setSelectedSize] = useState<string>('');

  const sizingData = [
    { uk: 'UK 6', us: 'US 2', bust: '31.5" / 80cm', waist: '24" / 61cm', hips: '34" / 86cm' },
    { uk: 'UK 8', us: 'US 4', bust: '32.5" / 83cm', waist: '25" / 63cm', hips: '35" / 89cm' },
    { uk: 'UK 10', us: 'US 6', bust: '34" / 86cm', waist: '27" / 68cm', hips: '37" / 94cm' },
    { uk: 'UK 12', us: 'US 8', bust: '36" / 91cm', waist: '29" / 74cm', hips: '39" / 99cm' },
    { uk: 'UK 14', us: 'US 10', bust: '38" / 96cm', waist: '31" / 79cm', hips: '41" / 104cm' },
    { uk: 'UK 16', us: 'US 12', bust: '40" / 101cm', waist: '33" / 84cm', hips: '43" / 109cm' },
    { uk: 'UK 18', us: 'US 14', bust: '42" / 106cm', waist: '35" / 89cm', hips: '45" / 114cm' },
    { uk: 'UK 20', us: 'US 16', bust: '44" / 112cm', waist: '37" / 94cm', hips: '47" / 119cm' },
    { uk: 'UK 22', us: 'US 18', bust: '46" / 117cm', waist: '39" / 99cm', hips: '49" / 124cm' },
    { uk: 'UK 24', us: 'US 20', bust: '48" / 122cm', waist: '41" / 104cm', hips: '51" / 129cm' },
  ];

  const activeSizeData = sizingData.find((d) => d.uk === selectedSize);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-amber-100 max-h-[90vh] flex flex-col md:flex-row z-10"
      >
        {/* Left: Product Image */}
        <div className="hidden md:block w-1/2 bg-gray-50 relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-amber-900 border border-amber-100">
            {product.occasion || 'Ready to Wear'}
          </div>
        </div>

        {/* Right: Content & Form */}
        <div className="flex flex-col w-full md:w-1/2 max-h-[90vh]">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gradient-to-r from-amber-50/50 to-orange-50/20">
            <div>
              <h3 className="font-serif text-2xl text-gray-900 tracking-tight leading-tight">{product.name}</h3>
              <p className="text-sm font-semibold text-gray-900 mt-2">₦{product.price.toLocaleString()}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900 -mt-1 -mr-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Sizes Grid */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest">Available Sizes (UK)</span>
            <div className="grid grid-cols-5 gap-2">
              {sizingData.map((size) => (
                <button
                  type="button"
                  key={size.uk}
                  onClick={() => setSelectedSize(size.uk)}
                  className={`py-3 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                    selectedSize === size.uk
                      ? 'bg-amber-950 border-amber-950 text-white shadow-md'
                      : 'bg-gray-50 border-gray-100 text-gray-800 hover:bg-amber-50/30 hover:border-amber-200'
                  }`}
                >
                  {size.uk.replace('UK ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Size Details Table */}
          {activeSizeData ? (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50/40 border border-amber-100/50 rounded-xl p-4 space-y-2 text-xs"
            >
              <div className="flex justify-between font-semibold text-amber-950 uppercase border-b border-amber-200/30 pb-1.5">
                <span>Selected: {activeSizeData.uk} ({activeSizeData.us})</span>
                <span className="text-[10px] text-amber-700 tracking-wider">Fits Dimensions</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-gray-700">
                <div>
                  <span className="block text-[9px] text-gray-400 uppercase tracking-wider">Bust</span>
                  <span className="font-semibold">{activeSizeData.bust}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-gray-400 uppercase tracking-wider">Waist</span>
                  <span className="font-semibold">{activeSizeData.waist}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-gray-400 uppercase tracking-wider">Hips</span>
                  <span className="font-semibold">{activeSizeData.hips}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 border border-gray-100 text-gray-500 rounded-xl p-4 text-center text-xs italic">
              Please choose a standard UK size to view item dimensions
            </div>
          )}

          {/* Custom Fitting Callout */}
          <div className="bg-orange-50/40 border border-amber-100/30 rounded-xl p-4 text-xs text-amber-900 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-950">🌟 Free Bespoke Custom Fitting</span>
            </div>
            <p className="leading-relaxed">
              If your measurements do not fit standard sizes or you want custom lengths, our in-house atelier will hand-tailor this garment to your exact height and curves for zero additional fees.
            </p>
            <button
              type="button"
              onClick={() => {
                onBespokeClick(product);
                onClose();
              }}
              className="text-left font-bold text-amber-950 hover:underline uppercase tracking-wider text-[10px] w-fit mt-1"
            >
              Request Custom Fit Instead →
            </button>
          </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-50">
              <button 
                type="submit"
                disabled={!selectedSize}
                className={`flex-1 font-semibold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all ${
                  selectedSize
                    ? 'bg-amber-950 hover:bg-black text-white cursor-pointer shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                {selectedSize ? 'Add To Bag' : 'Select a Size'}
              </button>
            </div>

            {/* Product Details Accordion Simulation */}
            <div className="space-y-3 pt-2">
              <div className="border border-gray-100 rounded-xl p-4 text-xs text-gray-600">
                <span className="font-bold text-gray-900 uppercase tracking-widest block mb-2">Description & Styling</span>
                <p className="leading-loose">Hand-draped from premium fabrics, this piece is designed for the modern woman who commands attention. Best styled with bold accessories and confidence.</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4 text-xs text-gray-600">
                <span className="font-bold text-gray-900 uppercase tracking-widest block mb-2">Fabric & Care</span>
                <p className="leading-loose">{product.fabric || 'Luxury blend. Dry clean only to preserve texture.'}</p>
              </div>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
