import { useSearchParams } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext.jsx';
import { pluralize } from '../lib/format.js';
import Reveal from '../components/Reveal.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const { products, loading } = useCatalog();

  const active = params.get('category') || 'All';
  const categories = Array.from(new Set(products.map((p) => p.cat)));
  const chips = ['All', ...categories];

  const setCategory = (cat) => {
    if (cat === 'All') setParams({}, { replace: false });
    else setParams({ category: cat }, { replace: false });
  };

  const filtered = active === 'All' ? products : products.filter((p) => p.cat === active);

  return (
    <div className="route-fade">
      <section className="shop-hero">
        <div className="container section-tight" style={{ paddingTop: 'clamp(40px,5vw,68px)' }}>
          <span className="eyebrow on-dark">The shop</span>
          <h1>{active === 'All' ? 'All products' : active}</h1>
          <p style={{ color: 'var(--on-dark-soft)', margin: '14px 0 0', maxWidth: 520 }}>
            All handmade, all organic, all in small batches. Take your pick.
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '28px 24px clamp(56px,7vw,96px)' }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="shop-toolbar">
              <div className="chips">
                {chips.map((c) => (
                  <button
                    key={c}
                    className={`chip${active === c ? ' active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <span className="shop-count">{pluralize(filtered.length, 'product')}</span>
            </div>

            {filtered.length > 0 ? (
              <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 80}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="loading-wrap">
                <p>Nothing here yet — check back soon for a fresh batch.</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
