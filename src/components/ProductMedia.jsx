// Renders a product's visual: a real Shopify image when present, otherwise a
// branded gradient placeholder (orb + caption) that matches the design system.
// `size` controls the orb scale: 'card' | 'pdp'.
export default function ProductMedia({ product, size = 'card', showLabel = true }) {
  const isPdp = size === 'pdp';

  if (product.image) {
    return (
      <>
        <img src={product.image} alt={product.imageAlt || product.name} loading="lazy" />
        {product.soldOut && <span className="badge-soldout">Sold out</span>}
      </>
    );
  }

  return (
    <div className="media-fill" style={{ position: 'absolute', inset: 0, background: product.block }}>
      <div className="hatch" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isPdp ? (
          <div className="pdp-orb">
            <div className="pdp-orb-inner" />
          </div>
        ) : (
          <div className="media-orb" />
        )}
      </div>
      {showLabel && <span className="media-label">{product.placeholder}</span>}
      {product.soldOut && <span className="badge-soldout">Sold out</span>}
    </div>
  );
}
