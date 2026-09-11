import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SizingModal } from './SizingModal';
import { TailoringModal } from './TailoringModal';
import { SizeSelectModal } from './SizeSelectModal';
import { CartDrawer } from './CartDrawer';
import { OrderSuccessModal } from './OrderSuccessModal';
import { OrderTracker } from './OrderTracker';
import { Product, CartItem, CustomMeasurements } from '../types';

interface AppModalsProps {
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  selectedBespokeProduct: Product | null;
  setSelectedBespokeProduct: (p: Product | null) => void;
  selectedSizeProduct: Product | null;
  setSelectedSizeProduct: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cart: CartItem[];
  successOrder: { reference: string; amount: number } | null;
  setSuccessOrder: (order: { reference: string; amount: number } | null) => void;
  isTrackerOpen: boolean;
  setIsTrackerOpen: (open: boolean) => void;
  prefilledTrackerRef: string;
  setPrefilledTrackerRef: (ref: string) => void;
  handleAddToCart: (product: Product, size?: string, bespokeMeasurements?: CustomMeasurements) => void;
  handleUpdateQuantity: (productId: string, size?: string, isBespoke?: boolean, delta?: number) => void;
  handleRemoveItem: (productId: string, size?: string, isBespoke?: boolean) => void;
  handleCheckoutSuccess: (reference: string) => void;
  triggerBespokeModal: (p: Product) => void;
}

export function AppModals({
  isSizeGuideOpen, setIsSizeGuideOpen,
  selectedBespokeProduct, setSelectedBespokeProduct,
  selectedSizeProduct, setSelectedSizeProduct,
  isCartOpen, setIsCartOpen,
  cart,
  successOrder, setSuccessOrder,
  isTrackerOpen, setIsTrackerOpen,
  prefilledTrackerRef, setPrefilledTrackerRef,
  handleAddToCart, handleUpdateQuantity, handleRemoveItem, handleCheckoutSuccess,
  triggerBespokeModal
}: AppModalsProps) {
  return (
    <>
      <AnimatePresence>
        {isSizeGuideOpen && (
          <SizingModal
            isOpen={isSizeGuideOpen}
            onClose={() => setIsSizeGuideOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBespokeProduct && (
          <TailoringModal
            isOpen={!!selectedBespokeProduct}
            onClose={() => setSelectedBespokeProduct(null)}
            product={selectedBespokeProduct}
            onAddBespokeToCart={(product, measurements) => handleAddToCart(product, undefined, measurements)}
          />
        )}
      </AnimatePresence>

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

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

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
    </>
  );
}