// =============================================================================
// Fallback catalog (demo mode)
// -----------------------------------------------------------------------------
// Used whenever Shopify credentials are NOT configured. The shape here matches
// exactly what the Shopify adapter produces (see src/lib/shopify.js), so every
// component is source-agnostic. When Shopify is connected, these are replaced by
// live products and these become irrelevant.
// =============================================================================

import { imageForCategory } from './images.js';

// Category order + display + the gradient used for category tiles / placeholders.
export const CATEGORIES = ['Elderberry', 'Sea Moss', 'Tea', 'Tinctures', 'Bundles'];

export const CATEGORY_BLOCKS = {
  Elderberry: 'linear-gradient(155deg,#4a2545,#2a1526)',
  'Sea Moss': 'linear-gradient(155deg,#46a149,#236b2c)',
  Tea: 'linear-gradient(155deg,#6ba83f,#3a7a26)',
  Tinctures: 'linear-gradient(155deg,#2f8a52,#1c4a2c)',
  Bundles: 'linear-gradient(155deg,#4a2545,#2c7a39)',
};

// Map a category to a gradient (used when a product has no real photo).
export function blockForCategory(cat) {
  return CATEGORY_BLOCKS[cat] || 'linear-gradient(155deg,#4a2545,#2c7a39)';
}

// Build the unified option object shape used app-wide.
function opts(labels, price, available = true) {
  return labels.map((label) => ({
    label,
    price,
    available,
    variantId: null, // no real Shopify variant in demo mode
  }));
}

const RAW = [
  {
    id: 'eb-daily',
    cat: 'Elderberry',
    name: 'Daily Defense Elderberry Syrup',
    price: 24,
    block: 'linear-gradient(150deg,#4a2545,#311a2e)',
    placeholder: '[ syrup bottle ]',
    blurb:
      'Our everyday elderberry — organic berries, raw honey, ginger and clove. A spoonful does it.',
    optionLabel: 'Size',
    options: ['8 oz', '16 oz'],
    benefits: ['Organic black elderberries', 'Raw local honey', 'Ginger + clove + cinnamon'],
  },
  {
    id: 'eb-reserve',
    cat: 'Elderberry',
    name: 'Elderberry + Honey Reserve',
    price: 28,
    block: 'linear-gradient(150deg,#5a2b4f,#2f1830)',
    placeholder: '[ reserve bottle ]',
    blurb:
      'Simmered a little longer, with extra honey and a touch of orange peel. Rich and warming.',
    optionLabel: 'Size',
    options: ['8 oz', '16 oz'],
    benefits: ['Extra raw honey', 'Slow-simmered', 'Orange peel + star anise'],
  },
  {
    id: 'sm-chai',
    cat: 'Sea Moss',
    name: 'Sea Moss Gel — Vanilla Chai',
    price: 36,
    block: 'linear-gradient(150deg,#46a149,#236b2c)',
    placeholder: '[ sea moss jar ]',
    blurb: 'Wildcrafted sea moss whipped smooth with vanilla and warm chai spice.',
    optionLabel: 'Flavor',
    options: ['Vanilla Chai', 'Wild Berry', 'Original Gold'],
    benefits: ['Wildcrafted sea moss', '92 trace minerals', 'Vanilla + chai spice'],
  },
  {
    id: 'sm-berry',
    cat: 'Sea Moss',
    name: 'Sea Moss Gel — Wild Berry',
    price: 34,
    block: 'linear-gradient(150deg,#8a2d7a,#4a1d44)',
    placeholder: '[ sea moss jar ]',
    blurb: 'Mineral-rich sea moss gel with a swirl of real wild berries.',
    optionLabel: 'Flavor',
    options: ['Wild Berry', 'Vanilla Chai', 'Original Gold'],
    benefits: ['Wildcrafted sea moss', 'Real wild berries', 'No added sugar'],
  },
  {
    id: 'sm-gold',
    cat: 'Sea Moss',
    name: 'Sea Moss Gel — Original Gold',
    price: 32,
    block: 'linear-gradient(150deg,#5aa84e,#2f7a37)',
    placeholder: '[ sea moss jar ]',
    blurb:
      'Just sea moss, nothing else. Stir it into smoothies, coffee, soup — whatever you like.',
    optionLabel: 'Size',
    options: ['16 oz', '32 oz'],
    benefits: ['Single ingredient', 'Mineral-rich', 'Blend into anything'],
  },
  {
    id: 'tea-tranquil',
    cat: 'Tea',
    name: 'Tranquili-Tea Elderflower Blend',
    price: 14,
    block: 'linear-gradient(150deg,#6ba83f,#3a7a26)',
    placeholder: '[ tea pouch ]',
    blurb:
      'Elderflower, chamomile and lemon balm for winding down at the end of the day.',
    optionLabel: 'Format',
    options: ['Loose leaf', 'Tea bags (15)'],
    benefits: ['Caffeine-free', 'Elderflower + chamomile', 'Hand-blended'],
    soldOut: true,
  },
  {
    id: 'tea-throat',
    cat: 'Tea',
    name: 'Throat Coat Ginger Tea',
    price: 14,
    block: 'linear-gradient(150deg,#7aa83f,#4a7a26)',
    placeholder: '[ tea pouch ]',
    blurb:
      'Ginger, licorice root and marshmallow for when your throat needs a little kindness.',
    optionLabel: 'Format',
    options: ['Loose leaf', 'Tea bags (15)'],
    benefits: ['Ginger + licorice root', 'Soothing', 'Caffeine-free'],
  },
  {
    id: 'tin-spray',
    cat: 'Tinctures',
    name: 'Soothe Throat Spray',
    price: 18,
    block: 'linear-gradient(150deg,#2f8a52,#1c4a2c)',
    placeholder: '[ spray bottle ]',
    blurb:
      'A little sage-and-honey mist that fits in your bag for whenever your throat acts up.',
    optionLabel: 'Strength',
    options: ['Original', 'Extra Strength'],
    benefits: ['Sage + propolis', 'Pocket-size', 'Fast relief'],
  },
  {
    id: 'tin-drops',
    cat: 'Tinctures',
    name: 'Immunity Tincture Drops',
    price: 26,
    block: 'linear-gradient(150deg,#2c8a3e,#16401c)',
    placeholder: '[ dropper bottle ]',
    blurb:
      'A few daily drops of echinacea, astragalus and elderberry to keep your defenses up.',
    optionLabel: 'Size',
    options: ['1 oz', '2 oz'],
    benefits: ['Echinacea + astragalus', 'Alcohol-free base', 'Daily dropper'],
  },
  {
    id: 'bun-ritual',
    cat: 'Bundles',
    name: 'The Wellness Ritual Bundle',
    price: 72,
    block: 'linear-gradient(150deg,#4a2545,#2c7a39)',
    placeholder: '[ gift set ]',
    blurb:
      'Elderberry syrup, sea moss gel and a soothing tea — everything we reach for, in one box.',
    optionLabel: 'Tea choice',
    options: ['Tranquili-Tea', 'Throat Coat'],
    benefits: ['Save 15% vs. separate', 'Gift-ready box', 'The full lineup'],
  },
  {
    id: 'bun-cold',
    cat: 'Bundles',
    name: 'Cold Season Survival Kit',
    price: 58,
    block: 'linear-gradient(150deg,#46a149,#236b2c)',
    placeholder: '[ gift set ]',
    blurb:
      'Throat spray, immunity drops and elderberry syrup for the sniffly months ahead.',
    optionLabel: 'Syrup size',
    options: ['8 oz', '16 oz'],
    benefits: ['Everything for cold season', 'Save 12%', 'Stocking-stuffer ready'],
  },
];

// Normalize into the unified product shape used across the app.
export const FALLBACK_PRODUCTS = RAW.map((p) => ({
  id: p.id,
  handle: p.id,
  cat: p.cat,
  name: p.name,
  price: p.price,
  currency: 'USD',
  block: p.block,
  image: imageForCategory(p.cat, 800),
  imageAlt: p.name,
  placeholder: p.placeholder,
  blurb: p.blurb,
  optionLabel: p.optionLabel,
  options: opts(p.options, p.price, !p.soldOut),
  benefits: p.benefits,
  soldOut: !!p.soldOut,
}));

// IDs used for the "A few favorites" row on the homepage.
export const FEATURED_IDS = ['eb-daily', 'sm-chai', 'bun-cold'];
