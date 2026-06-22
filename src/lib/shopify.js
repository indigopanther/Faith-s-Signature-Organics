// =============================================================================
// Shopify Storefront API client
// -----------------------------------------------------------------------------
// This is the production data layer. When VITE_SHOPIFY_STORE_DOMAIN and
// VITE_SHOPIFY_STOREFRONT_TOKEN are present, the storefront pulls live products
// and routes checkout through the real Shopify Cart API. When they are absent,
// `isShopifyConfigured` is false and the app uses the bundled demo catalog.
//
// Every function here returns data in the SAME unified shape as
// src/data/products.js, so UI components never need to know the source.
// =============================================================================

import { blockForCategory } from '../data/products.js';

const DOMAIN = (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '').trim();
const TOKEN = (import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '').trim();
const API_VERSION = (import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10').trim();

export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

function endpoint() {
  // Accept domains with or without protocol.
  const host = DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return `https://${host}/api/${API_VERSION}/graphql.json`;
}

async function storefront(query, variables = {}) {
  if (!isShopifyConfigured) {
    throw new Error('Shopify is not configured.');
  }
  const res = await fetch(endpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data;
}

// --- GraphQL fragments -------------------------------------------------------
const PRODUCT_FIELDS = `
  id
  handle
  title
  description(truncateAt: 220)
  productType
  tags
  featuredImage { url altText }
  options { name values }
  variants(first: 50) {
    nodes {
      id
      title
      availableForSale
      selectedOptions { name value }
      price { amount currencyCode }
    }
  }
  benefits: metafield(namespace: "custom", key: "benefits") { value type }
`;

// --- Adapter: Shopify product node -> unified product shape ------------------
function adaptProduct(node) {
  const variants = node.variants?.nodes || [];
  const firstVariant = variants[0] || null;
  const currency = firstVariant?.price?.currencyCode || 'USD';

  const prices = variants
    .map((v) => Number(v.price?.amount))
    .filter((n) => Number.isFinite(n));
  const minPrice = prices.length ? Math.min(...prices) : 0;

  // Determine the primary option dimension (skip Shopify's default "Title").
  const primaryOption = (node.options || []).find(
    (o) => o.name && o.name.toLowerCase() !== 'title'
  );
  const isDefaultOnly =
    variants.length <= 1 &&
    (!firstVariant || firstVariant.title === 'Default Title' || !primaryOption);

  const options = variants.map((v) => {
    const sel = (v.selectedOptions || []).find(
      (o) => primaryOption && o.name === primaryOption.name
    );
    return {
      label: isDefaultOnly ? '' : sel?.value || v.title,
      price: Number(v.price?.amount) || minPrice,
      available: v.availableForSale,
      variantId: v.id,
    };
  });

  // Benefits: optional `custom.benefits` metafield (JSON list or newline text).
  let benefits = [];
  if (node.benefits?.value) {
    try {
      const parsed = JSON.parse(node.benefits.value);
      if (Array.isArray(parsed)) benefits = parsed.map(String);
    } catch {
      benefits = node.benefits.value
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  const cat = node.productType || (node.tags && node.tags[0]) || 'Shop';
  const soldOut = variants.length > 0 && variants.every((v) => !v.availableForSale);

  return {
    id: node.id,
    handle: node.handle,
    cat,
    name: node.title,
    price: minPrice,
    currency,
    block: blockForCategory(cat),
    image: node.featuredImage?.url || null,
    imageAlt: node.featuredImage?.altText || node.title,
    placeholder: `[ ${cat.toLowerCase()} ]`,
    blurb: node.description || '',
    optionLabel: isDefaultOnly ? '' : primaryOption?.name || 'Option',
    options: options.length
      ? options
      : [{ label: '', price: minPrice, available: !soldOut, variantId: firstVariant?.id || null }],
    benefits,
    soldOut,
  };
}

// --- Public API --------------------------------------------------------------

export async function fetchProducts() {
  const data = await storefront(
    `query Products {
      products(first: 100, sortKey: BEST_SELLING) {
        nodes { ${PRODUCT_FIELDS} }
      }
    }`
  );
  return (data.products?.nodes || []).map(adaptProduct);
}

export async function fetchProductByHandle(handle) {
  const data = await storefront(
    `query Product($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }`,
    { handle }
  );
  return data.product ? adaptProduct(data.product) : null;
}

// Create a Shopify cart from local line items and return the hosted checkout URL.
// `lines` = [{ variantId, quantity }]. Returns { checkoutUrl } or throws.
export async function createCheckout(lines) {
  const cleanLines = lines
    .filter((l) => l.variantId)
    .map((l) => ({ merchandiseId: l.variantId, quantity: Math.max(1, l.quantity) }));

  if (!cleanLines.length) {
    throw new Error('No purchasable items with Shopify variant IDs.');
  }

  const data = await storefront(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }`,
    { lines: cleanLines }
  );

  const errors = data.cartCreate?.userErrors || [];
  if (errors.length) {
    throw new Error(errors.map((e) => e.message).join('; '));
  }
  const url = data.cartCreate?.cart?.checkoutUrl;
  if (!url) throw new Error('Shopify did not return a checkout URL.');
  return { checkoutUrl: url };
}
