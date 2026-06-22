import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatMoney } from '../lib/format.js';
import ProductMedia from './ProductMedia.jsx';

export default function ProductCard({ product, compact = false }) {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const view = () => navigate(`/products/${product.handle}`);
  const add = (e) => {
    e.stopPropagation();
    addItem(product, 1, product.options?.[0]);
  };

  return (
    <div
      className={`card${compact ? ' compact' : ''}`}
      onClick={view}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          view();
        }
      }}
    >
      <div className="card-media">
        <ProductMedia product={product} size="card" showLabel={!compact} />
      </div>
      <div className="card-body">
        {!compact && <span className="card-cat">{product.cat}</span>}
        <h3 className="card-name">{product.name}</h3>
        {!compact && <span className="card-blurb">{product.blurb}</span>}
        <div className="card-foot">
          <span className="price">{formatMoney(product.price, product.currency)}</span>
          <button className="btn-add" onClick={add} aria-label={`Add ${product.name} to cart`}>
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}
