import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group cursor-pointer flex flex-col items-centertext-center"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-2 text-center w-full">
        <h3 className="text-sm font-medium tracking-widest uppercase mb-1 text-gray-900 group-hover:text-red-500 transition-colors">
          {product.name}
        </h3>
        {product.badge && (
          <span className="text-xs text-red-500 mb-1">{product.badge}</span>
        )}
        <span className="text-sm text-gray-600">₦{product.price.toLocaleString()}</span>
      </div>
    </motion.div>
  );
}
