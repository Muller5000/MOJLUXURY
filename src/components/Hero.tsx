import React from 'react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] bg-gray-900 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1584288079854-521b369cc20c?auto=format&fit=crop&q=80" 
        alt="African Heritage Collection"
        className="w-full h-full object-cover opacity-90 object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-24 md:pb-32">
        <div className="text-center px-4 w-full max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white text-4xl md:text-6xl lg:text-7xl font-serif tracking-wider mb-8 drop-shadow-2xl flex flex-col gap-2"
          >
            <span className="font-bold">MOJLUXURY</span>
            <span className="text-xl md:text-3xl tracking-[0.2em] font-light mt-2">TRADITIONAL ELEGANCE</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a 
              href="#" 
              className="inline-block bg-white text-black font-bold px-10 py-4 text-sm tracking-widest uppercase hover:bg-[#e32828] hover:text-white hover:border-[#e32828] transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-transparent"
            >
              Shop The Collection
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
