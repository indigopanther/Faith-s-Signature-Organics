// =============================================================================
// Static site copy (brand identity, marketing sections, contact details).
// Product data lives in products.js / Shopify. This is everything else.
// =============================================================================

export const business = {
  name: "Faith's Signature Organics",
  tagline: 'Immune support in every drop.',
  email: 'hello@faithsorganics.com',
  city: 'Atlanta, GA',
  announcement: 'Free local delivery in Atlanta · Handcrafted in small batches',
  description:
    'Handmade elderberry syrup, sea moss gels, herbal teas and more — from our kitchen in Atlanta.',
};

export const heroChips = [
  { label: 'Organic elderberries', cls: 'c1' },
  { label: 'Small-batch in Atlanta', cls: 'c2' },
];

export const trustItems = [
  {
    title: 'Organic & Wildcrafted',
    sub: 'We track down clean, sustainably grown herbs and skip the rest.',
  },
  {
    title: 'Handcrafted in Atlanta',
    sub: 'Every jar is made by hand, right here in Atlanta.',
  },
  {
    title: 'Small Batch',
    sub: 'We make a little at a time, so nothing sits on a shelf.',
  },
  {
    title: 'Immune Support',
    sub: 'Recipes meant to help you feel good all season.',
  },
];

export const values = [
  {
    icon: '❧',
    title: 'We source it ourselves',
    body: 'Every herb and berry is picked by hand from growers who do it right.',
  },
  {
    icon: '✶',
    title: 'Made by hand',
    body: 'No factory, no fillers. Same hands, same recipe, every single batch.',
  },
  {
    icon: '◉',
    title: 'It actually works',
    body: "Real ingredients that do something — not whatever's trending this week.",
  },
];

export const contactInfo = [
  { icon: '✉', label: 'Email us', value: 'hello@faithsorganics.com' },
  { icon: '⌂', label: 'Local pickup', value: 'Atlanta · Decatur · Tucker, GA' },
  { icon: '◷', label: 'Response time', value: 'Within 1–2 business days' },
];

// label -> category to filter the shop by (null = all)
export const footerShop = [
  { label: 'All products', cat: null },
  { label: 'Elderberry syrup', cat: 'Elderberry' },
  { label: 'Sea moss gels', cat: 'Sea Moss' },
  { label: 'Herbal teas', cat: 'Tea' },
  { label: 'Bundles', cat: 'Bundles' },
];

export const socials = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com' },
];
