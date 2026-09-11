import React from 'react';
import { motion } from 'motion/react';

export function NewsletterSection() {
  return (
    <section className="relative w-full h-[50vh] bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#171413]"></div>
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          className="text-white text-3xl md:text-4xl font-serif tracking-tight uppercase mb-6"
        >
          Join Our Tribe
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
           className="text-amber-200/70 text-base leading-loose mb-8"
        >
          Subscribe to get updates on new drops, sizing webinars, and bespoke workshops.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent border border-amber-800/40 px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 mb-4 sm:mb-0 transition-colors"
            required
          />
          <button
            type="submit"
            className="bg-amber-900 text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-amber-800 transition-colors sm:-ml-[1px]"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
}