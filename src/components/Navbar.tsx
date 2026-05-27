import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
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
      <div className="bg-white border-b border-gray-100 py-2 text-center text-xs tracking-widest uppercase">
        We Deliver Worldwide
      </div>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-900"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto absolute left-0 md:relative z-[-1] md:z-auto">
              <a href="#" className="font-serif text-2xl tracking-wider font-bold">
                MOJLUXURY
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center justify-center flex-1">
              <a href="#" className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-red-500 transition-colors">Home</a>
              <div className="relative group">
                <a href="#" className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-red-500 transition-colors inline-block py-2">
                  Categories
                </a>
                <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-xs tracking-widest uppercase hover:bg-gray-50">Shop All</a>
                    <a href="#" className="block px-4 py-2 text-xs tracking-widest uppercase hover:bg-gray-50">Dresses</a>
                    <a href="#" className="block px-4 py-2 text-xs tracking-widest uppercase hover:bg-gray-50">Tops</a>
                    <a href="#" className="block px-4 py-2 text-xs tracking-widest uppercase hover:bg-gray-50">Bottoms</a>
                    <a href="#" className="block px-4 py-2 text-xs tracking-widest uppercase hover:bg-gray-50">Sets</a>
                  </div>
                </div>
              </div>
              <a href="#" className="text-sm font-semibold tracking-widest uppercase text-red-500 hover:text-gray-900 transition-colors">Under ₦25,000 Shop</a>
              <a href="#" className="text-sm font-semibold tracking-widest uppercase text-gray-900 hover:text-red-500 transition-colors">Contact Us</a>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="hidden sm:block">
                <select defaultValue="NGN" className="bg-transparent text-sm font-semibold uppercase tracking-widest border-none focus:ring-0 cursor-pointer">
                  <option value="NGN">NGN ₦</option>
                  <option value="USD">USD $</option>
                  <option value="GBP">GBP £</option>
                </select>
              </div>
              <button className="text-gray-900 hover:text-red-500 transition-colors">
                <Search size={20} />
              </button>
              <button className="text-gray-900 hover:text-red-500 transition-colors relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-2 bg-gray-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  0
                </span>
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
              <span className="font-serif text-xl font-bold">MOJLUXURY</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-900">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 flex flex-col space-y-6">
              <a href="#" className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2">Home</a>
              <a href="#" className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2">Categories</a>
              <div className="pl-4 flex flex-col space-y-4">
                <a href="#" className="text-xs tracking-widest uppercase text-gray-600">Dresses</a>
                <a href="#" className="text-xs tracking-widest uppercase text-gray-600">Tops</a>
                <a href="#" className="text-xs tracking-widest uppercase text-gray-600">Bottoms</a>
                <a href="#" className="text-xs tracking-widest uppercase text-gray-600">Sets</a>
              </div>
              <a href="#" className="text-sm font-semibold tracking-widest uppercase text-red-500 border-b border-gray-100 pb-2">Under ₦25,000 Shop</a>
              <a href="#" className="text-sm font-semibold tracking-widest uppercase border-b border-gray-100 pb-2">Contact Us</a>
              <div className="pt-4 flex flex-col space-y-4">
                <a href="#" className="text-sm font-semibold tracking-widest uppercase">My Account</a>
                <a href="#" className="text-sm font-semibold tracking-widest uppercase">Login | Register</a>
              </div>
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
