import React from 'react';
import { motion } from 'motion/react';
import { Check, Calendar, Truck, Landmark } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  reference: string;
  amount: number;
  onTrackClick: (ref: string) => void;
}

export function OrderSuccessModal({ isOpen, onClose, reference, amount, onTrackClick }: OrderSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-amber-100/50 flex flex-col z-10 p-6 sm:p-8 text-center"
      >
        
        {/* Animated Check Bubble */}
        <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.15 }}
          >
            <Check size={32} className="text-emerald-600" />
          </motion.div>
        </div>

        {/* Title */}
        <span className="text-[10px] text-amber-800 uppercase tracking-widest font-semibold block mb-1">Payment Successful</span>
        <h3 className="font-serif text-2xl md:text-3xl text-gray-900 tracking-wide mb-2 uppercase font-bold">Thank You For Your Order</h3>
        <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto mb-6">
          Your payment has been secure-processed by Paystack. Our premium design atelier has been notified to begin prepping your garment fits.
        </p>

        {/* Recap Box */}
        <div className="bg-amber-50/30 border border-amber-100/30 rounded-2xl p-4 text-xs space-y-2 mb-8 text-left">
          <div className="flex justify-between">
            <span className="text-gray-400">Transaction Reference:</span>
            <span className="font-mono font-bold text-gray-800 uppercase tracking-wider">{reference}</span>
          </div>
          <div className="flex justify-between border-t border-amber-200/20 pt-2">
            <span className="text-gray-400">Total Paid:</span>
            <span className="font-bold text-amber-950">₦{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t border-amber-200/20 pt-2">
            <span className="text-gray-400">Shipping Partner:</span>
            <span className="font-bold text-gray-800 uppercase">DHL Express (Worldwide)</span>
          </div>
        </div>

        {/* Garment Journey Timeline */}
        <div className="space-y-4 mb-8 text-left">
          <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-1">Garment Journey Tracker</span>
          <div className="relative pl-6 space-y-6">
            
            {/* Thread Bar */}
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

            {/* Step 1: Confirmed */}
            <div className="relative flex gap-3">
              <span className="absolute -left-[23px] w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-white shadow-sm"></span>
              <div>
                <span className="block text-xs font-bold text-gray-900">Payment Confirmed & Verified</span>
                <span className="block text-[10px] text-gray-500">Order successfully queued for atelier custom creation</span>
              </div>
            </div>

            {/* Step 2: Custom Draping */}
            <div className="relative flex gap-3">
              <span className="absolute -left-[23px] w-4 h-4 rounded-full bg-amber-500 animate-pulse flex items-center justify-center border-4 border-white shadow-sm"></span>
              <div>
                <span className="block text-xs font-bold text-amber-900 flex items-center gap-1">
                  Atelier Custom Sizing & Hand-Tailoring <span className="text-[9px] px-1.5 py-0.2 bg-amber-100 rounded text-amber-800 font-normal uppercase tracking-wider scale-90">Active</span>
                </span>
                <span className="block text-[10px] text-gray-500">Draping fabrics and custom adjusting proportions (3 - 5 days)</span>
              </div>
            </div>

            {/* Step 3: Logistics */}
            <div className="relative flex gap-3">
              <span className="absolute -left-[23px] w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-sm"></span>
              <div>
                <span className="block text-xs font-bold text-gray-500">DHL Express Dispatch</span>
                <span className="block text-[10px] text-gray-400">Shipped with live end-to-end tracking to your doorstep (5 - 7 days)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Primary CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onTrackClick(reference)}
            className="flex-1 bg-amber-950 hover:bg-black text-white font-semibold uppercase tracking-widest text-xs py-4 rounded-2xl shadow-lg transition-colors cursor-pointer"
          >
            Track Order in Real-Time
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold uppercase tracking-widest text-xs py-4 rounded-2xl transition-colors cursor-pointer"
          >
            Close Summary
          </button>
        </div>

      </motion.div>
    </div>
  );
}
