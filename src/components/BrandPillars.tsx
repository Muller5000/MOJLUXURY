import React from 'react';
import { motion } from 'motion/react';
import academyImg from '../assets/academy_masterclass.jpg';
import materialImg from '../assets/material_adire.jpg';
import rtwImg from '../assets/rtw_two_piece.jpg';

export function BrandPillars() {
  const pillars = [
    {
      id: 'rtw',
      title: 'Everyday Ready-To-Wear',
      description: 'Chic, flawlessly tailored pieces designed for your daily life. Experience premium comfort without compromising on style.',
      image: rtwImg,
      badge: 'Shop Collections'
    },
    {
      id: 'material',
      title: 'Authentic Sourcing',
      description: 'We source the finest indigenous fabrics, from premium hand-dyed Adire to rich Ankara, ensuring exceptional quality for every garment.',
      image: materialImg,
      badge: 'Explore Materials'
    },
    {
      id: 'academy',
      title: 'Fashion Academy',
      description: 'Empowering the next generation. Join our masterclasses in pattern drafting, garment construction, and business management.',
      image: academyImg,
      badge: 'Join Academy'
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-16">
        <span className="text-xs text-amber-800 uppercase tracking-widest font-semibold block mb-2">Our Core Pillars</span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight uppercase mb-4">Beyond The Runway</h2>
        <p className="italic text-gray-600 max-w-2xl mx-auto font-serif text-base leading-relaxed">
          At MOJLUXURY, we do more than create clothes. We cultivate a holistic fashion ecosystem that celebrates our heritage and educates the future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {pillars.map((pillar, index) => (
          <motion.div 
            key={pillar.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="group cursor-pointer flex flex-col"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6 shadow-md">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={pillar.image} 
                alt={pillar.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-white/90 backdrop-blur-sm text-amber-950 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {pillar.badge}
                </span>
              </div>
            </div>
            
            <div className="text-center px-2 flex-1 flex flex-col">
              <h3 className="text-lg font-serif font-semibold tracking-wide uppercase mb-3 text-gray-900 group-hover:text-amber-700 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
