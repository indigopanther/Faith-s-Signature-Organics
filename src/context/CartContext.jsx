/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createCheckout, isShopifyConfigured } from '../lib/shopify.js';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(null);
const STORAGE_KEY = 'fso-cart-v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const toast = useToast();
  const [items, setItems] = useState(loadCart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  // Persist across reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [items]);

  function addItem(product, qty = 1, option = null) {
    const opt = option || product.options?.[0] || null;
    if (product.soldOut || (opt && opt.available === false)) {
      toast(`${product.name} is sold out`);
      return;
    }
    const optLabel = opt?.label || '';
    const variantId = opt?.variantId || null;
    const price = opt?.price ?? product.price;
    const key = `${product.handle}|${optLabel}|${variantId || ''}`;

    setItems((prev) => {
      const next = prev.slice();
      const i = next.findIndex((c) => c.key === key);
      if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + qty };
      else
        next.push({
          key,
          productId: product.id,
          handle: product.handle,
          name: product.name,
          price,
          currency: product.currency || 'USD',
          image: product.image || null,
          block: product.block,
          option: optLabel,
          variantId,
          qty,
        });
      return next;
    });
    setDrawerOpen(true);
    toast(`Added ${product.name} to cart`);
  }

  function changeQty(key, delta) {
    setItems((prev) =>
      prev
        .map((c) => (c.key === key ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  function removeItem(key) {
    setItems((prev) => prev.filter((c) => c.key !== key));
  }

  function clear() {
    setItems([]);
  }

  async function checkout() {
    if (!items.length) return;
    if (!isShopifyConfigured) {
      toast('Demo mode — add Shopify credentials to enable real checkout.');
      return;
    }
    const missing = items.some((i) => !i.variantId);
    if (missing) {
      toast('Some items are missing variant info — reload and try again.');
      return;
    }
    try {
      setCheckingOut(true);
      const { checkoutUrl } = await createCheckout(items);
      window.location.href = checkoutUrl; // hand off to Shopify's hosted checkout
    } catch (err) {
      console.error('[cart] checkout failed:', err);
      toast('Sorry — checkout could not start. Please try again.');
      setCheckingOut(false);
    }
  }

  const value = useMemo(() => {
    const count = items.reduce((a, c) => a + c.qty, 0);
    const subtotal = items.reduce((a, c) => a + c.price * c.qty, 0);
    const currency = items[0]?.currency || 'USD';
    return {
      items,
      count,
      subtotal,
      currency,
      drawerOpen,
      checkingOut,
      openCart: () => setDrawerOpen(true),
      closeCart: () => setDrawerOpen(false),
      addItem,
      changeQty,
      removeItem,
      clear,
      checkout,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, drawerOpen, checkingOut]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
