# Faith's Signature Organics

A production-ready storefront for **Faith's Signature Organics** — handcrafted elderberry
syrup, sea moss gels, herbal teas and tinctures, made in small batches in Atlanta.

Built with **React 19 + Vite** and a **Shopify Storefront API** integration. The site is
designed to go live the moment Shopify credentials are added — no code changes required.

---

## Two modes

The app detects whether Shopify credentials are present and behaves accordingly:

| Mode | When | Products | Checkout |
|------|------|----------|----------|
| **Demo** (default) | No Shopify env vars | Built-in placeholder catalog (11 products) | Disabled (shows a notice) |
| **Live** | `VITE_SHOPIFY_*` set | Pulled live from your Shopify store | Real Shopify hosted checkout |

You can build, run, and review the whole site in demo mode today. Add credentials → it's live.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
npm run lint       # eslint
```

---

## Going live with Shopify

### 1. Create a Storefront API token

In your Shopify admin:

1. **Settings → Apps and sales channels → Develop apps** → *Create an app*.
2. Open the app → **Configuration → Storefront API** → enable the scopes you need
   (`unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`,
   `unauthenticated_write_checkouts` / cart access).
3. **Install** the app, then copy the **Storefront API access token**.
   (This token is public by design — it's safe to ship in the browser.)

### 2. Add environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

```dotenv
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
VITE_SHOPIFY_API_VERSION=2024-10        # optional
```

Restart `npm run dev`. The storefront now pulls live products and "Check out" hands off to
Shopify's hosted checkout. On **Vercel**, add the same variables under
**Project → Settings → Environment Variables** and redeploy.

### 3. How your Shopify data maps to the site

| Site element | Comes from |
|---|---|
| Product name / description / price | Product title, description, variant price |
| **Category** (shop filters & tiles) | Product **Type** (falls back to first tag) |
| Product options (Size / Flavor chips) | Product **variants** & their option values |
| Sold-out badge | All variants `availableForSale = false` |
| Product image | Featured image (gradient placeholder if none) |
| "What's inside" list | Optional metafield `custom.benefits` (JSON list or newline text) — hidden if absent |

> Tip: set each product's **Type** to `Elderberry`, `Sea Moss`, `Tea`, `Tinctures`, or
> `Bundles` to mirror the demo categories — but any category names will work; the shop
> filters build themselves from your live data.

If a Shopify request fails or returns nothing, the site automatically falls back to the
demo catalog so it's never empty.

---

## Deploy to Vercel

This repo includes `vercel.json` (Vite preset + SPA rewrite), so deployment is zero-config:

**Option A — Git (recommended):** push to GitHub/GitLab, then *Import Project* in Vercel.
Framework auto-detects as **Vite**; build `npm run build`, output `dist`.

**Option B — CLI:**

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Then add the `VITE_SHOPIFY_*` environment variables in the Vercel dashboard and redeploy.

---

## Project structure

```
src/
├── assets/            faiths-logo.png
├── components/        Nav, Footer, CartDrawer, ProductCard, ProductMedia, Reveal, Loading
├── context/           CatalogContext, CartContext, ToastContext
├── data/              products.js (demo catalog), content.js (site copy)
├── lib/               shopify.js (Storefront API), format.js
├── pages/             Home, Shop, Product, About, Contact
├── styles/            tokens.css (design tokens)
├── index.css          global styles
├── App.jsx            providers + routing
└── main.jsx           entry
```

### Where to edit things

- **Copy / marketing text** → `src/data/content.js`
- **Demo products** (until Shopify is connected) → `src/data/products.js`
- **Colors, fonts, spacing** → `src/styles/tokens.css`
- **Shopify queries / checkout** → `src/lib/shopify.js`

---

## Notes

- Cart state persists in `localStorage` across reloads.
- Newsletter and contact forms are front-end stubs (they validate and confirm). Wire them
  to Shopify customer/marketing or a form service when ready.
- Product imagery uses branded gradient placeholders until real photos are added to Shopify
  (or to the demo catalog).

Design implemented from the Claude Design handoff. Tech: React 19, Vite, React Router.
# Faith-s-Signature-Organics
