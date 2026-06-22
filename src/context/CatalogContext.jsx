/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FALLBACK_PRODUCTS } from '../data/products.js';
import { fetchProducts, isShopifyConfigured } from '../lib/shopify.js';

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  // In demo mode we have data immediately; in Shopify mode we fetch.
  const [products, setProducts] = useState(isShopifyConfigured ? [] : FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(isShopifyConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isShopifyConfigured) return;
    let alive = true;
    // `loading` already starts true when Shopify is configured (see useState above).
    fetchProducts()
      .then((items) => {
        if (!alive) return;
        // Defensive: if the store returns nothing, fall back so the site is never empty.
        setProducts(items.length ? items : FALLBACK_PRODUCTS);
        setError(items.length ? null : 'No products returned from Shopify.');
      })
      .catch((err) => {
        if (!alive) return;
        console.error('[catalog] Shopify fetch failed, using demo catalog:', err);
        setProducts(FALLBACK_PRODUCTS);
        setError(err.message || 'Failed to load products.');
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo(() => {
    const byHandle = (handle) => products.find((p) => p.handle === handle) || null;
    const byCategory = (cat) =>
      !cat || cat === 'All' ? products : products.filter((p) => p.cat === cat);
    const categories = Array.from(new Set(products.map((p) => p.cat)));
    return {
      products,
      loading,
      error,
      source: isShopifyConfigured ? 'shopify' : 'demo',
      byHandle,
      byCategory,
      categories,
    };
  }, [products, loading, error]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
