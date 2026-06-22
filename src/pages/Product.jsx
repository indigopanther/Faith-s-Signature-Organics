import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useCatalog } from '../context/CatalogContext.jsx';
import { formatMoney } from '../lib/format.js';
import Reveal from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductMedia from '../components/ProductMedia.jsx';
import Loading from '../components/Loading.jsx';

export default function Product() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { products, loading, byHandle } = useCatalog();
  const { addItem } = useCart();

  const product = byHandle(handle);

  // This component is remounted per-handle (keyed in App), so these initialize
  // fresh for every product — no reset effect needed.
  const [optionIndex, setOptionIndex] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3);
  }, [product, products]);

  if (loading && !product) return <Loading />;

  if (!product) {
    return (
      <div className="route-fade container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h1 className="h-section">We couldn't find that one.</h1>
        <p className="lead" style={{ margin: '14px auto 26px' }}>
          It may have sold out or moved. Let's get you back to the shop.
        </p>
        <button className="btn btn-primary btn-md" onClick={() => navigate('/shop')}>
          Back to shop
        </button>
      </div>
    );
  }

  const options = product.options || [];
  const selected = options[optionIndex] || options[0] || null;
  const unitPrice = selected?.price ?? product.price;
  const showOptions = options.length > 1 && product.optionLabel;
  const soldOut = product.soldOut || selected?.available === false;

  const add = () => {
    if (!soldOut) addItem(product, qty, selected);
  };

  return (
    <div className="route-fade">
      <div className="container" style={{ padding: '24px 24px 0' }}>
        <button className="link-back" onClick={() => navigate('/shop')}>
          ← Back to shop
        </button>
      </div>

      <section className="pdp">
        <div className="pdp-media" style={{ background: product.image ? '#f4eef9' : product.block }}>
          <ProductMedia product={product} size="pdp" showLabel />
        </div>

        <div>
          <span className="card-cat">{product.cat}</span>
          <h1>{product.name}</h1>
          <div className="pdp-price">{formatMoney(unitPrice, product.currency)}</div>
          <p className="pdp-desc">{product.blurb}</p>

          {showOptions && (
            <div style={{ margin: '28px 0 0' }}>
              <span className="option-label">{product.optionLabel}</span>
              <div className="option-chips">
                {options.map((o, i) => (
                  <button
                    key={o.label + i}
                    className={`option-chip${i === optionIndex ? ' active' : ''}`}
                    onClick={() => setOptionIndex(i)}
                    disabled={o.available === false}
                    style={o.available === false ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp-buy">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button className="btn-buy" onClick={add} disabled={soldOut}>
              {soldOut ? 'Sold out' : `Add to cart · ${formatMoney(unitPrice * qty, product.currency)}`}
            </button>
          </div>

          {product.benefits?.length > 0 && (
            <div className="inside-card">
              <span className="ic-title">What's inside</span>
              <div className="inside-list">
                {product.benefits.map((b) => (
                  <div className="inside-row" key={b}>
                    <span className="dot" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pdp-assure">
            <span>✓ Organic &amp; wildcrafted</span>
            <span>✓ Small batch</span>
            <span>✓ Ships in 2–3 days</span>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="band-lavender">
          <div className="container section">
            <Reveal>
              <h2 className="h-section" style={{ fontSize: 'clamp(24px,3vw,34px)', margin: '0 0 28px' }}>
                You may also like
              </h2>
            </Reveal>
            <div className="product-grid cols-related">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 90}>
                  <ProductCard product={p} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
