import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onScrollToSection?: (sectionId: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
  onTrackOrderClick?: () => void;
}

export function Navbar({ onScrollToSection, cartCount = 0, onCartClick, onTrackOrderClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Premium announcement bar with local touch */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 py-2 text-center text-xs tracking-widest uppercase text-amber-200 border-b border-amber-900/30">
        🌟 Free Custom Tailoring & Worldwide Delivery via DHL Express
      </div>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-900 focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Logo with cultural gold element */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto absolute left-0 md:relative z-[-1] md:z-auto">
              <a href="#" className="font-serif text-2xl tracking-widest font-bold text-gray-900 flex items-center gap-1 hover:text-amber-800 transition-colors">
                MOJ<span className="text-amber-600">LUXURY</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center justify-center flex-1">
              <a href="#" className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-amber-700 transition-colors">Home</a>
              <div className="relative group">
                <a href="#products-section" className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-amber-700 transition-colors inline-block py-2">
                  Occasions
                </a>
                <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-lg">
                  <div className="py-2">
                    <a href="#products-section" className="block px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:bg-amber-50/40 hover:text-amber-900">Shop All</a>
                    <a href="#products-section" className="block px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:bg-amber-50/40 hover:text-amber-900">Owambe Party</a>
                    <a href="#products-section" className="block px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:bg-amber-50/40 hover:text-amber-900">Corporate Slay</a>
                    <a href="#products-section" className="block px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:bg-amber-50/40 hover:text-amber-900">Ready-to-Wear</a>
                    <a href="#products-section" className="block px-4 py-2.5 text-xs tracking-widest uppercase text-gray-700 hover:bg-amber-50/40 hover:text-amber-900">Sunday Best</a>
                  </div>
                </div>
              </div>
              <a href="#lookbook-section" className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-amber-700 transition-colors">Lookbook</a>
              <button onClick={() => onScrollToSection?.('about-story-section')} className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-amber-700 transition-colors">About</button>
              <button onClick={() => onScrollToSection?.('faqs-section')} className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-amber-700 transition-colors">FAQs</button>
              <button onClick={() => onScrollToSection?.('products-section')} className="text-sm font-semibold tracking-widest uppercase text-amber-600 hover:text-amber-800 transition-colors font-bold">Bespoke Fit</button>
              <button onClick={onTrackOrderClick} className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-amber-700 transition-colors cursor-pointer">Track Order</button>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="hidden sm:block">
                <select defaultValue="NGN" className="bg-transparent text-xs font-bold uppercase tracking-widest border-none focus:ring-0 cursor-pointer text-gray-700 focus:outline-none">
                  <option value="NGN">NGN ₦</option>
                  <option value="USD">USD $</option>
                  <option value="GBP">GBP £</option>
                </select>
              </div>
              <button className="text-gray-900 hover:text-amber-700 transition-colors">
                <Search size={20} />
              </button>
              <button 
                onClick={onCartClick} 
                className="text-gray-900 hover:text-amber-700 transition-colors relative cursor-pointer"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-900 text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white w-4/5 max-w-sm flex flex-col shadow-2xl overflow-y-auto"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <span className="font-serif text-xl font-bold text-amber-900">MOJLUXURY</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 flex flex-col space-y-6">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2">Home</a>
              <a href="#products-section" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2">Occasions</a>
              <div className="pl-4 flex flex-col space-y-4">
                <a href="#products-section" onClick={() => setIsMobileMenuOpen(false)} className="text-xs tracking-widest uppercase text-gray-600">Owambe Party</a>
                <a href="#products-section" onClick={() => setIsMobileMenuOpen(false)} className="text-xs tracking-widest uppercase text-gray-600">Corporate Slay</a>
                <a href="#products-section" onClick={() => setIsMobileMenuOpen(false)} className="text-xs tracking-widest uppercase text-gray-600">Ready-to-Wear</a>
                <a href="#products-section" onClick={() => setIsMobileMenuOpen(false)} className="text-xs tracking-widest uppercase text-gray-600">Sunday Best</a>
              </div>
              <a href="#lookbook-section" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2">Lookbook</a>
              <button 
                onClick={() => { onScrollToSection?.('about-story-section'); setIsMobileMenuOpen(false); }} 
                className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2 text-left block w-full"
              >
                About Us
              </button>
              <button 
                onClick={() => { onScrollToSection?.('faqs-section'); setIsMobileMenuOpen(false); }} 
                className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2 text-left block w-full"
              >
                FAQs
              </button>
              <button 
                onClick={() => { onScrollToSection?.('products-section'); setIsMobileMenuOpen(false); }} 
                className="text-sm font-semibold tracking-widest uppercase text-amber-600 border-b border-gray-100 pb-2 text-left block w-full font-bold"
              >
                Bespoke Fit
              </button>
              <button 
                onClick={() => { onTrackOrderClick?.(); setIsMobileMenuOpen(false); }} 
                className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2 text-left block w-full text-amber-750 font-bold cursor-pointer"
              >
                Track My Order
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
