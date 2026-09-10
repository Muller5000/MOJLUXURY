import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import heroImage1 from '../assets/hero_carousel_1.jpg';
import heroImage4 from '../assets/hero_carousel_4.jpg';
import heroImage5 from '../assets/hero_carousel_5.jpg';
import heroImage6 from '../assets/hero_carousel_6.jpg';
import heroImage7 from '../assets/hero_carousel_7.jpg';
import heroImage8 from '../assets/hero_carousel_8.jpg';

const images = [heroImage1, heroImage4, heroImage5, heroImage6, heroImage7, heroImage8];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const bgY = useTransform(scrollY, [0, 800], [0, 300]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const textY = useTransform(scrollY, [0, 400], [0, 100]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#1b1512] text-white relative overflow-hidden h-[75vh] sm:h-[80vh] lg:h-[88vh] flex items-center justify-center">
      
      {/* 1. Moving Background Image Carousel with Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 bg-[#120e0d] h-[120%] -top-[10%]">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Hero Carousel"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>

        {/* Premium Dark Vignette Overlay for High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75 z-10"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-10"></div>
      </motion.div>

      {/* 2. Brand Text & CTA Overlay Content with Fade/Scale out on Scroll */}
      <motion.div 
        style={{ opacity: textOpacity, scale: textScale, y: textY }}
        className="relative z-20 max-w-[1440px] mx-auto h-full flex flex-col justify-center items-center text-center px-6 sm:px-12 md:px-16"
      >
        
        <div className="space-y-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-xs text-amber-400 uppercase tracking-[0.3em] font-bold block">
              Premier Fashion Design Agency
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight uppercase leading-[1.1] text-white drop-shadow-lg">
              Design & <br />
              <span className="text-amber-500 font-bold block mt-1">Academy</span>
            </h1>
            <p className="text-amber-100/90 text-base sm:text-lg font-serif italic leading-loose max-w-xl mx-auto drop-shadow-md">
              Crafting premium everyday ready-to-wear, sourcing authentic clothing materials, and tutoring the next generation of global fashion designers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#products-section" 
              className="w-full sm:w-auto inline-block bg-white text-amber-950 font-bold px-8 py-4 text-xs tracking-widest uppercase hover:bg-amber-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl rounded text-center"
            >
              Shop Collections
            </a>
            <a 
              href="#products-section" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                // We could dispatch an event or call a context to set category to 'Fashion Academy', but scrolling is enough for now
              }}
              className="w-full sm:w-auto inline-block bg-transparent border-2 border-amber-400 text-amber-400 font-bold px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-amber-400 hover:text-amber-950 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl rounded text-center"
            >
              Join Academy
            </a>
          </motion.div>
        </div>

        {/* 3. Carousel Indicators */}
        <div className="absolute bottom-8 z-20 flex space-x-3 pointer-events-auto">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
