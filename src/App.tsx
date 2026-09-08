import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import atelierVideo from './assets/atelier_video.mp4';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { SizingModal } from './components/SizingModal';
import { TailoringModal } from './components/TailoringModal';
import { SizeSelectModal } from './components/SizeSelectModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTracker } from './components/OrderTracker';
import { getSupabase } from './supabaseClient';
import { Chatbot } from './components/Chatbot';
import { DeliveryWidget } from './components/DeliveryWidget';
import { Lookbook } from './components/Lookbook';
import { InfoHub } from './components/InfoHub';
import { AdminDashboard } from './components/AdminDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { featuredProducts as staticFeatured, dresses as staticDresses } from './data/products';
import { Product, CartItem, CustomMeasurements } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);
  const [liveFeatured, setLiveFeatured] = useState<Product[]>(staticFeatured);
  const [liveDresses, setLiveDresses] = useState<Product[]>(staticDresses);

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedBespokeProduct, setSelectedBespokeProduct] = useState<Product | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');

  // Community Slider Ref & Data
  const communitySliderRef = useRef<HTMLDivElement>(null);

  const communityPosts = [
    { id: 1, handle: '@adesua_t', imageUrl: '/images/Beautiful_Nigerian_woman_wearing_a_202605290957.jpeg', occasion: 'Owambe Party' },
    { id: 2, handle: '@chioma_x', imageUrl: '/images/Stylish_Nigerian_businesswoman_wearing_a_202605291126.jpeg', occasion: 'Corporate Slay' },
    { id: 3, handle: '@funmi_glam', imageUrl: '/images/Beautiful_Nigerian_woman_in_a_202605291051.jpeg', occasion: 'Sunday Best' },
    { id: 4, handle: '@toketequila', imageUrl: '/images/Luxury_African_female_model_wearing_202605291046.jpeg', occasion: 'Atelier Velvet' },
    { id: 5, handle: '@yemi_royal', imageUrl: '/images/Modern_Nigerian_female_model_wearing_202605291152.jpeg', occasion: 'Lace Boubou' },
    { id: 6, handle: '@kemi_luxury', imageUrl: '/images/Ultra-detailed_Nigerian_female_model_wearing_202605291021.jpeg', occasion: 'Atelier Midi' },
  ];

  // Auto-scrolling infinite slider logic
  useEffect(() => {
    const slider = communitySliderRef.current;
    if (!slider) return;

    let scrollDirection = 1;
    const interval = setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScroll - 5) {
        scrollDirection = -1; // reverse
      } else if (slider.scrollLeft <= 5) {
        scrollDirection = 1;
      }
      const cardWidth = slider.clientWidth / (window.innerWidth >= 768 ? 4 : window.innerWidth >= 640 ? 2 : 1);
      slider.scrollBy({ left: scrollDirection * cardWidth, behavior: 'smooth' });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleCommunityScroll = (direction: 'left' | 'right') => {
    const slider = communitySliderRef.current;
    if (!slider) return;
    const cardWidth = slider.clientWidth / (window.innerWidth >= 768 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    slider.scrollBy({ left: (direction === 'left' ? -1 : 1) * cardWidth, behavior: 'smooth' });
  };

  // E-commerce Shopping Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizeProduct, setSelectedSizeProduct] = useState<Product | null>(null);
  const [successOrder, setSuccessOrder] = useState<{ reference: string; amount: number } | null>(null);

  // Real-Time Order Tracking Portal States
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [prefilledTrackerRef, setPrefilledTrackerRef] = useState('');

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('mojluxury_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load shopping cart:', e);
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('mojluxury_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Failed to save shopping cart:', e);
    }
  };

  // Seed demo tracking records in Supabase on startup
  useEffect(() => {
    const seedDemoRecords = async () => {
      const supabase = getSupabase();
      if (!supabase) return;

      try {
        const { data: existing } = await supabase
          .from('orders')
          .select('id')
          .eq('reference', 'MOJ-TEST-99')
          .maybeSingle();

        if (!existing) {
          const { data: seeded, error: seedError } = await supabase
            .from('orders')
            .insert({
              reference: 'MOJ-TEST-99',
              amount: 145000,
              status: 'tailoring'
            })
            .select()
            .single();

          if (seedError) throw seedError;

          if (seeded) {
            await supabase
              .from('bespoke_measurements')
              .insert({
                order_id: seeded.id,
                product_id: '1',
                bust: 36,
                waist: 28,
                hips: 40,
                length: 58,
                notes: 'Tailor fit with extra sleeve seam allowance.'
              });

            await supabase
              .from('atelier_logs')
              .insert([
                { order_reference: 'MOJ-TEST-99', log_text: 'Secure transaction authenticated via Paystack Sandbox.', category: 'system', log_time: '09:00' },
                { order_reference: 'MOJ-TEST-99', log_text: 'Order queued in Victoria Island digital atelier pipeline.', category: 'system', log_time: '09:05' },
                { order_reference: 'MOJ-TEST-99', log_text: 'Premium fabric selection and allocation finalized (Heavy Mikado Silk / Handcrafted Lace).', category: 'atelier', log_time: '09:40' },
                { order_reference: 'MOJ-TEST-99', log_text: 'Bespoke drafting active: pattern drapes configured to custom measurements.', category: 'atelier', log_time: '10:15' }
              ]);
          }
        }
      } catch (err) {
        console.warn('Seeding check skipped:', err);
      }
    };

    seedDemoRecords();
  }, []);

  // Sync Hash Routing for Admin Dashboard
  useEffect(() => {
    const onHashChange = () => setCurrentRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Fetch Live Products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = getSupabase();
      if (!supabase) return;
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        const mapped = data.map(p => ({
          ...p,
          imageUrl: p.image_url,
          badgeColor: p.badge_color,
          isPreOrder: p.is_pre_order
        })) as Product[];
        const dbFeatured = mapped.filter(p => p.category === 'featured');
        const dbDresses = mapped.filter(p => p.category === 'dresses');
        if (dbFeatured.length > 0) setLiveFeatured(dbFeatured);
        if (dbDresses.length > 0) setLiveDresses(dbDresses);
      }
    };
    fetchProducts();
  }, []);

  // Add Item to Cart
  const handleAddToCart = (product: Product, size?: string, bespokeMeasurements?: CustomMeasurements) => {
    const isBespoke = !!bespokeMeasurements;
    const existingIndex = cart.findIndex((item) => {
      if (item.product.id !== product.id) return false;
      if (isBespoke) {
        return !!item.bespokeMeasurements && JSON.stringify(item.bespokeMeasurements) === JSON.stringify(bespokeMeasurements);
      } else {
        return item.selectedSize === size;
      }
    });

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += 1;
    } else {
      newCart.push({
        product,
        quantity: 1,
        selectedSize: isBespoke ? undefined : size,
        bespokeMeasurements: isBespoke ? bespokeMeasurements : undefined
      });
    }

    saveCart(newCart);
    
    // Automatically trigger cart drawer opening
    setIsCartOpen(true);
  };

  // Update Cart Item Quantity
  const handleUpdateQuantity = (productId: string, size?: string, isBespoke?: boolean, delta?: number) => {
    if (!delta) return;
    const existingIndex = cart.findIndex((item) => {
      if (item.product.id !== productId) return false;
      if (isBespoke) {
        return !!item.bespokeMeasurements;
      } else {
        return item.selectedSize === size;
      }
    });

    if (existingIndex === -1) return;

    let newCart = [...cart];
    const newQty = newCart[existingIndex].quantity + delta;

    if (newQty <= 0) {
      newCart.splice(existingIndex, 1);
    } else {
      newCart[existingIndex].quantity = newQty;
    }

    saveCart(newCart);
  };

  // Remove Cart Item
  const handleRemoveItem = (productId: string, size?: string, isBespoke?: boolean) => {
    const newCart = cart.filter((item) => {
      if (item.product.id !== productId) return true;
      if (isBespoke) {
        return !item.bespokeMeasurements;
      } else {
        return item.selectedSize !== size;
      }
    });
    saveCart(newCart);
  };

  // On Checkout Success
  const handleCheckoutSuccess = async (reference: string) => {
    const paidAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setSuccessOrder({ reference, amount: paidAmount });
    
    // Save transaction and tracking details asynchronously to Supabase
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            reference,
            amount: paidAmount,
            status: 'verified'
          })
          .select()
          .single();

        if (orderError) throw orderError;

        if (orderData) {
          const bespokeItems = cart.filter(item => !!item.bespokeMeasurements);
          for (const item of bespokeItems) {
            if (item.bespokeMeasurements) {
              await supabase
                .from('bespoke_measurements')
                .insert({
                  order_id: orderData.id,
                  product_id: item.product.id.toString(),
                  bust: item.bespokeMeasurements.bust || null,
                  waist: item.bespokeMeasurements.waist || null,
                  hips: item.bespokeMeasurements.hips || null,
                  length: item.bespokeMeasurements.length || null,
                  notes: item.bespokeMeasurements.notes || ''
                });
            }
          }

          // Insert tracking baseline system logs
          await supabase
            .from('atelier_logs')
            .insert([
              { order_reference: reference, log_text: 'Secure transaction authenticated via Paystack Sandbox.', category: 'system', log_time: '09:00' },
              { order_reference: reference, log_text: 'Order queued in Victoria Island digital atelier pipeline.', category: 'system', log_time: '09:05' },
              { order_reference: reference, log_text: 'Premium fabric selection and allocation finalized (Heavy Mikado Silk / Handcrafted Lace).', category: 'atelier', log_time: '09:40' },
              { order_reference: reference, log_text: 'Bespoke drafting active: pattern drapes configured to custom measurements.', category: 'atelier', log_time: '10:15' }
            ]);
        }
      } catch (err) {
        console.error('Supabase save error:', err);
      }
    }

    saveCart([]); // Clear Cart
    setIsCartOpen(false); // Close Cart Drawer
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allOccasions = [
    { value: 'all', label: 'All Collections' },
    { value: 'Owambe Party', label: 'Owambe Party' },
    { value: 'Corporate Slay', label: 'Corporate Slay' },
    { value: 'Sunday Best', label: 'Sunday Best' },
    { value: 'Ready-to-Wear Casual', label: 'Ready-to-Wear Casual' },
  ];

  const allProducts = [...liveFeatured, ...liveDresses];
  
  const filteredProducts = selectedOccasion === 'all' 
    ? allProducts
    : allProducts.filter(p => p.occasion === selectedOccasion);

  const triggerBespokeModal = (product: Product) => {
    setSelectedBespokeProduct(product);
  };

  const triggerSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };

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

        {/* Occasion Smart Filters & Products Section */}
        <motion.section 
          id="products-section" 
          className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center mb-12">
            <span className="text-xs text-amber-800 uppercase tracking-widest font-semibold block mb-1">Curated Collections</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight uppercase mb-4">Shop By Occasion</h2>
            <p className="italic text-gray-600 max-w-2xl mx-auto font-serif text-base leading-loose">
              Discover beautiful, size-inclusive ready-to-wear and bespoke garments crafted to fit your shape flawlessly for Nigeria's most vibrant events.
            </p>
          </div>

          {/* Sizing & Custom Tailoring Promo Bar */}
          <div className="mb-12 bg-gradient-to-r from-amber-50/70 via-orange-50/30 to-amber-50/70 border border-amber-100/50 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">📏 Fits Like A Dream</span>
              <span className="text-xs text-amber-900/80">Every piece is hand-tailored. Toggle the sizing chart or request bespoke custom sizing on any item!</span>
            </div>
            <button 
              onClick={triggerSizeGuide}
              className="bg-amber-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              Open Size Guide
            </button>
          </div>

          {/* Occasion Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {allOccasions.map((occ) => (
              <button
                key={occ.value}
                onClick={() => setSelectedOccasion(occ.value)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  selectedOccasion === occ.value
                    ? 'bg-amber-950 text-white shadow-md'
                    : 'bg-white border border-gray-100 text-gray-600 hover:bg-amber-50/40 hover:text-amber-950'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedOccasion}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
            >
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOrderClick={(p) => setSelectedSizeProduct(p)}
                  onBespokeClick={triggerBespokeModal}
                  onSizeGuideClick={triggerSizeGuide}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-serif italic">
              No garments are currently categorized under this collection. Check back soon!
            </div>
          )}
        </motion.section>

        {/* LOOKBOOK SECTION */}
        <motion.div 
          id="lookbook-section"
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Lookbook />
        </motion.div>

        {/* CUSTOM TAILORING / BESPOKE INTRO BANNER */}
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

        {/* LOGISTICS & SHIPPINGS DETAILS SECTION */}
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

        {/* SOCIAL PROOF #MOJLUXURYSociete GALLERY */}
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

        {/* Newsletter */}
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

      </main>
      
      {/* INTERACTIVE INFO HUB */}
      <InfoHub />

      <Footer onScrollToSection={handleScrollToSection} onSizeGuideClick={triggerSizeGuide} />

      {/* Dynamic Styling Concierge Chatbot */}
      <Chatbot />

      {/* Sizing guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <SizingModal 
            isOpen={isSizeGuideOpen} 
            onClose={() => setIsSizeGuideOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Custom Tailoring modal */}
      <AnimatePresence>
        {selectedBespokeProduct && (
          <TailoringModal 
            isOpen={!!selectedBespokeProduct} 
            onClose={() => setSelectedBespokeProduct(null)} 
            product={selectedBespokeProduct}
            onAddBespokeToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Standard Size Selector Modal */}
      <AnimatePresence>
        {selectedSizeProduct && (
          <SizeSelectModal
            isOpen={!!selectedSizeProduct}
            onClose={() => setSelectedSizeProduct(null)}
            product={selectedSizeProduct}
            onAddToCart={handleAddToCart}
            onBespokeClick={triggerBespokeModal}
          />
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Order Success Screen Modal */}
      <AnimatePresence>
        {successOrder && (
          <OrderSuccessModal
            isOpen={!!successOrder}
            onClose={() => setSuccessOrder(null)}
            reference={successOrder.reference}
            amount={successOrder.amount}
            onTrackClick={(ref) => {
              setPrefilledTrackerRef(ref);
              setIsTrackerOpen(true);
              setSuccessOrder(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Real-Time Order Tracker Portal Overlay */}
      <AnimatePresence>
        {isTrackerOpen && (
          <OrderTracker
            isOpen={isTrackerOpen}
            onClose={() => {
              setIsTrackerOpen(false);
              setPrefilledTrackerRef('');
            }}
            prefilledRef={prefilledTrackerRef}
          />
        )}
      </AnimatePresence>

      {/* Mobile Floating Cart Button (only visible on small screens when cart has items) */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[45] md:hidden"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-amber-950 text-white shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-full px-6 py-3.5 flex items-center gap-2 font-semibold tracking-widest text-[11px] uppercase border border-amber-900/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Bag ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
