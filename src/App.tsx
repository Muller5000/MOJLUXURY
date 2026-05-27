/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { featuredProducts, dresses } from './data/products';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-red-100 selection:text-red-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />

        {/* Featured Products */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif tracking-widest uppercase mb-4"
            >
              Featured Products
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="italic text-gray-600 max-w-2xl mx-auto font-serif"
            >
              Elevate your professional presence with the selection of outfits from this category that will portray you to be the most confident version of yourself!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#" className="inline-block bg-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
              View More
            </a>
          </div>
        </section>

        {/* Category Highlights */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/5] md:aspect-[3/4]"
            >
              <img 
                src="https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?auto=format&fit=crop&q=80" 
                alt="Tops and Bottoms"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif tracking-widest mb-2">TOPS/BOTTOMS</h3>
                  <span className="text-sm tracking-widest uppercase border-b border-white pb-1 inline-block">Shop Now</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/5] md:aspect-[3/4]"
            >
              <img 
                src="https://images.unsplash.com/photo-1604514339893-6ac46dbee0eb?auto=format&fit=crop&q=80" 
                alt="Sets"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif tracking-widest mb-2">SETS</h3>
                  <span className="text-sm tracking-widest uppercase border-b border-white pb-1 inline-block">Shop Now</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dresses Section */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-100">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif tracking-widest text-[#e32828] uppercase mb-4"
            >
              Dresses
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {dresses.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#" className="inline-block bg-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors">
              View More
            </a>
          </div>
        </section>

        {/* Newsletter Hero */}
        <section className="relative w-full h-[50vh] bg-gray-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#242424]"></div>
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-2xl md:text-3xl font-serif tracking-widest uppercase mb-6"
            >
              Join Our Tribe
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
               className="text-gray-300 text-sm tracking-wider mb-8"
            >
              Subscribe to get updates on new products, sales and promotions directly to your inbox
            </motion.p>
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent border border-white px-4 py-3 text-white text-sm focus:outline-none mb-4 sm:mb-0"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-black px-6 py-3 text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors sm:-ml-[1px]"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
