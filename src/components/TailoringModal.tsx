import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CustomMeasurements, Product } from '../types';

interface TailoringModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddBespokeToCart: (product: Product, measurements: CustomMeasurements) => void;
}

export function TailoringModal({ isOpen, onClose, product, onAddBespokeToCart }: TailoringModalProps) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    height: '',
    bust: '',
    waist: '',
    hips: '',
    sleeveLength: '',
    hemLength: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBespokeToCart(product, formData);
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
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-amber-100 max-h-[90vh] flex flex-col z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-amber-50/50 to-orange-50/20">
          <div>
            <h3 className="font-serif text-2xl text-gray-900 tracking-wide">Bespoke Custom Tailoring</h3>
            <p className="text-xs text-amber-800 mt-1 uppercase tracking-widest font-semibold">Perfect custom fit for: {product.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCartSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-amber-50/50 border border-amber-100 text-xs text-amber-900 p-4 rounded-xl space-y-1">
            <p className="font-semibold uppercase tracking-wider">🌟 Free Custom Tailoring</p>
            <p>Every woman's body is unique. Input your measurements in inches or cm below, and we will tailor this garment specifically to your shape!</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Height (e.g. 5ft 6in or 168cm)</label>
              <input 
                type="text" 
                name="height" 
                value={formData.height} 
                onChange={handleChange}
                placeholder="e.g. 5ft 6in"
                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bust (inches/cm)</label>
              <input 
                type="text" 
                name="bust" 
                value={formData.bust} 
                onChange={handleChange}
                placeholder="e.g. 36 inches"
                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Waist (inches/cm)</label>
              <input 
                type="text" 
                name="waist" 
                value={formData.waist} 
                onChange={handleChange}
                placeholder="e.g. 29 inches"
                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Hips (inches/cm)</label>
              <input 
                type="text" 
                name="hips" 
                value={formData.hips} 
                onChange={handleChange}
                placeholder="e.g. 40 inches"
                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sleeve Length (optional)</label>
              <input 
                type="text" 
                name="sleeveLength" 
                value={formData.sleeveLength} 
                onChange={handleChange}
                placeholder="e.g. 12 inches"
                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Dress Length (optional)</label>
              <input 
                type="text" 
                name="hemLength" 
                value={formData.hemLength} 
                onChange={handleChange}
                placeholder="e.g. 42 inches"
                className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Special Adjustments or Style Notes</label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange}
              placeholder="e.g., 'Make neckline slightly higher' or 'Add pocket on the right side'"
              rows={3}
              className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-gray-50 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 border border-gray-200 hover:bg-gray-50 font-medium uppercase tracking-widest text-xs py-3 rounded-lg transition-colors text-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-amber-950 hover:bg-black text-white font-medium uppercase tracking-widest text-xs py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add Custom Fit to Cart
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
