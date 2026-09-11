import React from 'react';
import { motion } from 'motion/react';
import atelierVideo from '../assets/atelier_video.mp4';

export function BespokeAtelierSection() {
  return (
    <motion.section
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-[#1f1a17] text-white rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">MOJLUXURY Bespoke Atelier</span>
            <h3 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1]">Made Just for You, Free of Charge</h3>
            <p className="text-base text-gray-300 leading-loose">
              Traditional mass production doesn't account for individual beauty. That is why we offer custom tailoring on all of our premium pieces. Give us your bust, waist, hip, and length measurements and we will drape the piece to perfectly complement your shape.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Zero custom fitting fees</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Custom sleeve & dress length adjustment</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto min-h-[300px]">
            <video
              src={atelierVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}