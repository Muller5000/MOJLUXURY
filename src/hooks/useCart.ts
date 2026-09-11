import { useState, useEffect } from 'react';
import { Product, CartItem, CustomMeasurements } from '../types';
import { getSupabase } from '../supabaseClient';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState<{ reference: string; amount: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mojluxury_cart');
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch (e) { console.error('Cart parse err:', e); }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('mojluxury_cart', JSON.stringify(newCart));
  };

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
    setIsCartOpen(true);
  };

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

  const handleCheckoutSuccess = async (reference: string) => {
    const paidAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setSuccessOrder({ reference, amount: paidAmount });

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: orderData, error: orderError } = await (supabase.from('orders') as any)
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
              await (supabase.from('bespoke_measurements') as any)
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

          await (supabase.from('atelier_logs') as any)
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

    saveCart([]);
    setIsCartOpen(false);
  };

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    successOrder,
    setSuccessOrder,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckoutSuccess
  };
}
