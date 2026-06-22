// =============================================================================
// Stock imagery (demo mode placeholders)
// -----------------------------------------------------------------------------
// Curated, free-license photos from Unsplash (Unsplash License — free for
// commercial use, no attribution required). Hotlinked via the Unsplash image
// CDN with on-the-fly resizing. When real Shopify product photos are connected,
// product cards/PDP use those automatically; these remain only for the demo
// catalog and the decorative marketing sections below.
// =============================================================================

// Base Unsplash photo IDs (verified free-license).
export const PHOTO = {
  elderberry: 'photo-1772900764482-ea6c74fb3bfa', // jars of dark syrup + honey
  tincture: 'photo-1602928261664-bfcf023fbc23', // amber glass bottle, golden liquid
  tea: 'photo-1757802412806-433e4e60eec7', // glass jars of dried herbs / loose tea
  seamoss: 'photo-1586558284531-7c43b7da946d', // pale gel in a glass jar with spoon
  bundle: 'photo-1630382716699-a1bcd2d3b143', // assorted bottles on a wooden shelf
  portrait: 'photo-1573496527892-904f897eb744', // warm smiling founder portrait
  shop: 'photo-1765809330985-a59b80931d12', // herbal shop shelves (green + purple)
};

// Build a sized Unsplash CDN URL.
export function unsplash(id, w = 900) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

// Category -> representative photo ID (used for product cards + category tiles).
export const CATEGORY_PHOTO = {
  Elderberry: PHOTO.elderberry,
  'Sea Moss': PHOTO.seamoss,
  Tea: PHOTO.tea,
  Tinctures: PHOTO.tincture,
  Bundles: PHOTO.bundle,
};

export function imageForCategory(cat, w = 800) {
  const id = CATEGORY_PHOTO[cat] || PHOTO.bundle;
  return unsplash(id, w);
}

// Decorative imagery for marketing sections.
export const DECOR = {
  hero: unsplash(PHOTO.elderberry, 1300),
  promise: unsplash(PHOTO.bundle, 1100), // Home "Our promise" split
  portrait: unsplash(PHOTO.portrait, 1000), // About founder split
  aboutHero: unsplash(PHOTO.shop, 1600), // About hero band background
};
