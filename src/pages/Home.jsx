import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext.jsx';
import { blockForCategory, FEATURED_IDS } from '../data/products.js';
import { heroChips, trustItems } from '../data/content.js';
import { pluralize } from '../lib/format.js';
import Reveal from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';

export default function Home() {
  const navigate = useNavigate();
  const { products, loading, byHandle } = useCatalog();

  if (loading) return <Loading />;

  const featured = FEATURED_IDS.map(byHandle).filter(Boolean);
  const featuredList = featured.length >= 3 ? featured.slice(0, 3) : products.slice(0, 3);

  const categories = Array.from(new Set(products.map((p) => p.cat)));
  const goShop = (cat) =>
    navigate(`/shop${cat ? `?category=${encodeURIComponent(cat)}` : ''}`);

  return (
    <div className="route-fade">
      {/* Hero */}
      <section className="hero">
        <Reveal>
          <span className="hero-pill">Immune support you can trust</span>
          <h1>
            Immune support
            <br />
            in every <span className="accent-italic">drop.</span>
          </h1>
          <p>
            Real elderberries, real herbs, simmered by hand in small Atlanta batches. No fillers,
            no shortcuts — the same immune support we keep in our own fridge.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => goShop()}>
              Shop all products
            </button>
            <button className="btn btn-outline btn-md" onClick={() => navigate('/about')}>
              Our story
            </button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero-visual">
            <div className="hatch" />
            <div className="hero-orb floaty" style={{ animation: 'floaty 6s ease-in-out infinite' }}>
              <div className="hero-orb-inner" />
            </div>
            {heroChips.map((c) => (
              <span key={c.label} className={`hero-chip ${c.cls}`}>
                <span className="dot" />
                {c.label}
              </span>
            ))}
            <span className="visual-caption">[ hero · elderberry pour ]</span>
          </div>
        </Reveal>
      </section>

      {/* Featured */}
      <section className="container section">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Most loved</span>
            <h2>A few favorites</h2>
          </div>
          <button className="link-underline" onClick={() => goShop()}>
            View all →
          </button>
        </Reveal>
        <div className="product-grid">
          {featuredList.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust band */}
      <section className="band-green">
        <div className="container section">
          <Reveal>
            <span className="eyebrow on-dark">Why Faith's</span>
            <h2 className="h-section on-dark" style={{ margin: '10px 0 38px', maxWidth: 640 }}>
              We keep it small so we can keep it good.
            </h2>
          </Reveal>
          <div className="trust-grid">
            {trustItems.map((t, i) => (
              <Reveal key={t.title} className="trust-item" delay={i * 80}>
                <span className="t-title">{t.title}</span>
                <span className="t-sub">{t.sub}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Split feature */}
      <section className="band-lavender">
        <div className="split">
          <Reveal className="feature-visual">
            <div className="hatch" />
            <span className="visual-caption">[ founder · in the kitchen ]</span>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Our promise</span>
            <h2 className="h-section" style={{ margin: '10px 0 0' }}>
              Searching for immune support you can trust?
            </h2>
            <p className="lead" style={{ margin: '18px 0 0' }}>
              We pick every ingredient ourselves — organic, wildcrafted, from growers we actually
              know. Then we make it by hand, in small batches, the same way we'd make it for our own
              kitchen.
            </p>
            <button
              className="btn btn-primary btn-md"
              style={{ marginTop: 26 }}
              onClick={() => navigate('/about')}
            >
              Read our story
            </button>
          </Reveal>
        </div>
      </section>

      {/* Browse by category */}
      <section className="container section">
        <Reveal>
          <h2 className="h-section" style={{ textAlign: 'center', margin: '0 0 32px' }}>
            Browse by category
          </h2>
        </Reveal>
        <Reveal className="cat-grid">
          {categories.map((cat) => (
            <button
              key={cat}
              className="cat-tile"
              style={{ background: blockForCategory(cat) }}
              onClick={() => goShop(cat)}
            >
              <div className="hatch" />
              <span className="c-label">{cat}</span>
              <span className="c-count">
                {pluralize(products.filter((p) => p.cat === cat).length, 'product')} →
              </span>
            </button>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
