import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DeliveryWidget } from './components/DeliveryWidget';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Lookbook } from './components/Lookbook';
import { InfoHub } from './components/InfoHub';
import { AdminDashboard } from './components/AdminDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

import { BespokeAtelierSection } from './components/BespokeAtelierSection';
import { CommunitySection } from './components/CommunitySection';
import { NewsletterSection } from './components/NewsletterSection';
import { ProductsSection } from './components/ProductsSection';
import { AppModals } from './components/AppModals';

import { allCatalogProducts } from './data/products';
import { Product } from './types';
import { useCart } from './hooks/useCart';
import { getSupabase } from './supabaseClient';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#');
  const [liveFeatured, setLiveFeatured] = useState<Product[]>([]);
  const [liveDresses, setLiveDresses] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedBespokeProduct, setSelectedBespokeProduct] = useState<Product | null>(null);
  const [selectedSizeProduct, setSelectedSizeProduct] = useState<Product | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [prefilledTrackerRef, setPrefilledTrackerRef] = useState('');

  const {
    cart, isCartOpen, setIsCartOpen, successOrder, setSuccessOrder,
    handleAddToCart, handleUpdateQuantity, handleRemoveItem, handleCheckoutSuccess
  } = useCart();

  useEffect(() => {
    const onHashChange = () => setCurrentRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = getSupabase();
      if (!supabase) return;
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        const mapped = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          imageUrl: p.image_url,
          hoverImageUrl: p.hover_image_url || undefined,
          category: p.category,
          badge: p.badge,
          badgeColor: p.badge_color,
          isPreOrder: p.is_pre_order
        })) as Product[];
        setLiveFeatured(mapped.filter(p => p.category === 'featured'));
        setLiveDresses(mapped.filter(p => p.category === 'dresses'));
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const seedDemoRecords = async () => {
      const supabase = getSupabase();
      if (supabase && window.location.hostname === 'localhost') {
        const { count } = await (supabase.from('orders') as any).select('*', { count: 'exact', head: true });
        if (count === 0) {
          await (supabase.from('orders') as any).insert({ reference: 'MOJ-DEMO-999', amount: 450000, status: 'verified' });
        }
      }
    };
    seedDemoRecords();
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { value: 'all', label: 'All Collections' },
    { value: 'Essentials', label: 'The Essentials Edit' },
    { value: 'Denim', label: 'Modern Denim' },
    { value: 'Evening', label: 'Evening Glamour' },
    { value: 'Tailoring', label: 'Bespoke Tailoring' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? allCatalogProducts
    : allCatalogProducts.filter(p => p.category === selectedCategory);

  const triggerBespokeModal = (product: Product) => setSelectedBespokeProduct(product);
  const triggerSizeGuide = () => setIsSizeGuideOpen(true);

  if (currentRoute === '#admin') { return <ErrorBoundary><AdminDashboard /></ErrorBoundary>; }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-amber-100 selection:text-amber-900 flex flex-col scroll-smooth">
      <Navbar 
        onScrollToSection={handleScrollToSection} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onTrackOrderClick={() => setIsTrackerOpen(true)}
      />
      
      <main className="flex-1">
        <Hero />

        <ProductsSection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredProducts={filteredProducts}
          triggerSizeGuide={triggerSizeGuide}
          setSelectedSizeProduct={setSelectedSizeProduct}
          triggerBespokeModal={triggerBespokeModal}
        />

        <motion.div 
          id="lookbook-section"
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Lookbook />
        </motion.div>

        <BespokeAtelierSection />

        <motion.section 
          id="delivery-section" 
          className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 md:mb-28"
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <DeliveryWidget />
        </motion.section>

        <CommunitySection />
        <NewsletterSection />
      </main>
      
      <InfoHub />
      <Footer onScrollToSection={handleScrollToSection} onSizeGuideClick={triggerSizeGuide} />
      <Chatbot />

      <AppModals
        isSizeGuideOpen={isSizeGuideOpen} setIsSizeGuideOpen={setIsSizeGuideOpen}
        selectedBespokeProduct={selectedBespokeProduct} setSelectedBespokeProduct={setSelectedBespokeProduct}
        selectedSizeProduct={selectedSizeProduct} setSelectedSizeProduct={setSelectedSizeProduct}
        isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}
        cart={cart}
        successOrder={successOrder} setSuccessOrder={setSuccessOrder}
        isTrackerOpen={isTrackerOpen} setIsTrackerOpen={setIsTrackerOpen}
        prefilledTrackerRef={prefilledTrackerRef} setPrefilledTrackerRef={setPrefilledTrackerRef}
        handleAddToCart={handleAddToCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
        handleCheckoutSuccess={handleCheckoutSuccess}
        triggerBespokeModal={triggerBespokeModal}
      />
    </div>
  );
}
