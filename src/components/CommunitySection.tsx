import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { communityPosts } from '../data/products';

export function CommunitySection() {
  const communitySliderRef = useRef<HTMLDivElement>(null);

  const handleCommunityScroll = (direction: 'left' | 'right') => {
    const slider = communitySliderRef.current;
    if (!slider) return;
    const scrollAmount = direction === 'left' ? -slider.offsetWidth * 0.8 : slider.offsetWidth * 0.8;
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <motion.section
      className="py-20 bg-gray-50 border-y border-gray-100 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto relative group/slider">
        <div className="text-center mb-12">
          <span className="text-xs text-amber-800 uppercase tracking-widest font-semibold block mb-1">Our Community</span>
          <h3 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight">#MOJLUXURYSociete</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-3 leading-loose">Real women, real magic. See how our community styles their ready-to-wear and bespoke garments.</p>
        </div>

        {/* Interactive Slider Tray */}
        <div className="relative">
          <div
            ref={communitySliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 scroll-smooth"
          >
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)] relative group overflow-hidden rounded-xl aspect-[3/4] bg-gray-100 border border-gray-200/50 shadow-sm"
              >
                <img
                  src={post.imageUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Customer style"
                />

                {/* Glassmorphic community tag overlays */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 backdrop-blur-[1px]">
                  <div className="bg-black/70 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-white text-center">
                    <span className="block text-xs font-bold tracking-wider uppercase">{post.handle}</span>
                    <span className="block text-[9px] text-amber-300 uppercase tracking-widest font-semibold mt-0.5">{post.occasion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tactical Nav Button Overrides */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none z-10">
            <button
              onClick={() => handleCommunityScroll('left')}
              className="pointer-events-auto bg-white hover:bg-amber-950 hover:text-white text-amber-950 p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all border border-amber-100/20 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleCommunityScroll('right')}
              className="pointer-events-auto bg-white hover:bg-amber-950 hover:text-white text-amber-950 p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all border border-amber-100/20 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}