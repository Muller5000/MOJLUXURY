import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShieldCheck } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size?: string, isBespoke?: boolean, delta?: number) => void;
  onRemoveItem: (productId: string, size?: string, isBespoke?: boolean) => void;
  onCheckoutSuccess: (reference: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess
}: CartDrawerProps) {
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Load Paystack script dynamically
  useEffect(() => {
    if ((window as any).PaystackPop) {
      setPaystackLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      setPaystackLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || isProcessing) return;

    if (!email || !name || !phone || !address) {
      alert('Please fill out all checkout details.');
      return;
    }

    if (!paystackLoaded || !(window as any).PaystackPop) {
      alert('Paystack SDK is still loading. Please try again in a moment.');
      return;
    }

    setIsProcessing(true);

    const handler = (window as any).PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_d3c1db17fcf79f323c9a6237072551a37c9a625a',
      email: email,
      amount: subtotal * 100, // in kobo
      currency: 'NGN',
      ref: 'MOJ-' + Math.floor(Math.random() * 1000000000 + 1), // unique ref
      callback: (response: any) => {
        setIsProcessing(false);
        onCheckoutSuccess(response.reference);
      },
      onClose: () => {
        setIsProcessing(false);
      }
    });

    handler.openIframe();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white z-[70] shadow-2xl flex flex-col overflow-hidden border-l border-amber-100/50"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-amber-50/50 to-orange-50/20">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl tracking-wider text-gray-900 uppercase font-bold">Shopping Bag</span>
                <span className="bg-amber-950 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-950"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content (Cart list & Form) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-4xl text-amber-900/40">🛍️</span>
                  <p className="font-serif text-gray-500 italic text-sm">Your shopping bag is empty.</p>
                  <button
                    onClick={onClose}
                    className="bg-amber-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-1">Garments Selected</span>
                    {cartItems.map((item, index) => {
                      const isB = !!item.bespokeMeasurements;
                      return (
                        <div
                          key={`${item.product.id}-${item.selectedSize || 'bespoke'}-${index}`}
                          className="flex gap-4 p-3 border border-gray-50 rounded-xl hover:border-amber-100/50 transition-colors"
                        >
                          {/* Image */}
                          <div className="w-20 aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-serif text-xs font-bold text-gray-900 uppercase tracking-wide line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.product.id, item.selectedSize, isB)}
                                  className="text-gray-400 hover:text-red-700 transition-colors p-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <span className="text-[9px] uppercase tracking-wider text-amber-800 font-semibold block mt-0.5">
                                {item.product.occasion || 'Ready-to-Wear'}
                              </span>

                              {/* Size Badge / Bespoke Specs */}
                              {isB && item.bespokeMeasurements ? (
                                <div className="mt-2 space-y-1">
                                  <span className="inline-block bg-amber-50 text-amber-900 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-200/40">
                                    🌟 Bespoke Custom Fit
                                  </span>
                                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-gray-500 bg-amber-50/20 p-1.5 rounded-md border border-amber-100/20 max-w-[200px]">
                                    <span>H: {item.bespokeMeasurements.height}</span>
                                    <span>B: {item.bespokeMeasurements.bust}</span>
                                    <span>W: {item.bespokeMeasurements.waist}</span>
                                    <span>H: {item.bespokeMeasurements.hips}</span>
                                  </div>
                                </div>
                              ) : (
                                <span className="inline-block bg-gray-50 text-gray-600 text-[9px] font-semibold uppercase px-2 py-0.5 rounded border border-gray-100 mt-1.5">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                            </div>

                            {/* Price and Quantity */}
                            <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50">
                              <span className="text-xs font-bold text-gray-900">
                                ₦{(item.product.price * item.quantity).toLocaleString()}
                              </span>
                              <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-gray-50">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, isB, -1)}
                                  className="p-1.5 hover:bg-amber-50 hover:text-amber-950 transition-colors text-gray-400"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="text-[10px] font-bold px-2.5 text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, isB, 1)}
                                  className="p-1.5 hover:bg-amber-50 hover:text-amber-950 transition-colors text-gray-400"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handlePaystackPayment} className="space-y-4 pt-4 border-t border-gray-100">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery & Checkout Details</span>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Funmi Adesua"
                          className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. funmi@example.com"
                          className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +234 803 123 4567"
                          className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-1">DHL Delivery Address</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Street Address, City, State, Country"
                          className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Submit Paystack button is at the bottom, so let form submit trigger payment */}
                    <button type="submit" className="hidden" id="hidden-checkout-submit" />
                  </form>
                </>
              )}
            </div>

            {/* Footer Summary & Main Action */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
                {/* Free custom fitting & shipping guarantees */}
                <div className="bg-amber-50/30 border border-amber-100/30 p-3 rounded-xl flex items-center gap-2.5 text-[10px] text-amber-950 font-medium">
                  <ShieldCheck size={16} className="text-amber-800 shrink-0" />
                  <span>Free Bespoke Custom Fitting & Secure Worldwide DHL Delivery Included</span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
                  <span className="uppercase tracking-wider">Subtotal</span>
                  <span className="text-base text-amber-950">₦{subtotal.toLocaleString()}</span>
                </div>

                {/* Secure Payment Buttons */}
                <button
                  type="button"
                  onClick={() => {
                    const btn = document.getElementById('hidden-checkout-submit');
                    if (btn) btn.click();
                  }}
                  disabled={isProcessing}
                  className={`w-full text-white font-semibold uppercase tracking-widest text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-amber-950 hover:bg-black cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.007 19h-3.033l.455-2h3.033l-.455 2zm-4.55 0H10.42l.455-2H13.91l-.453 2zm-4.55 0H5.875l.455-2H9.362l-.455 2zM12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm6-9v-1c0-.55-.45-1-1-1h-6.22l.22-.97L11.5 5h1.5v-1h-1.5c0-.55-.45-1-1-1H7.83l-.22.97-.22.97.22-.97v1h-1.5v1h1.5l-.22.97H5c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h1.56l-.68 3H5c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h1.56l-.45 2H4.22c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1H7.4l.45-2h.83l-.45 2h3.18l.45-2h.83l-.45 2h3.18l.45-2h.83l-.45 2h3.01c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-3.01l.45-2h.83l-.45 2h3.18c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-3.18l.68-3H19c.55 0 1-.45 1-1zm-4 0h-.83l-.68 3h-.83l.68-3H8.39l.68-3h.83l-.68 3h1.83l.68-3h.83l-.68 3H14z" />
                  </svg>
                  {isProcessing ? 'Processing Securely...' : `Pay Securely ₦${subtotal.toLocaleString()}`}
                </button>

                {/* Trust Badges */}
                <div className="flex justify-center gap-6 pt-3 pb-1 items-center opacity-60 text-gray-700">
                  <div className="flex flex-col items-center">
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <span className="text-[8px] uppercase tracking-widest font-bold">SSL Secure</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                    <span className="text-[8px] uppercase tracking-widest font-bold">Paystack</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-[8px] uppercase tracking-widest font-bold">Guaranteed</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
