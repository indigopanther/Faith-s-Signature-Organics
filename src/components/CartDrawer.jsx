import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatMoney } from '../lib/format.js';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    count,
    subtotal,
    currency,
    drawerOpen,
    checkingOut,
    closeCart,
    changeQty,
    removeItem,
    checkout,
  } = useCart();

  // Close on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeCart]);

  const continueShopping = () => {
    closeCart();
    navigate('/shop');
  };

  return (
    <>
      <div className={`overlay${drawerOpen ? ' open' : ''}`} onClick={closeCart} aria-hidden="true" />
      <aside
        className={`drawer${drawerOpen ? ' open' : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-head">
          <span className="title">Your cart</span>
          <button className="drawer-close" onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {count > 0 ? (
            items.map((item) => (
              <div className="cart-line" key={item.key}>
                <div className="thumb" style={{ background: item.block }}>
                  {item.image && <img src={item.image} alt={item.name} />}
                </div>
                <div className="info">
                  <div className="row">
                    <span className="nm">{item.name}</span>
                    <button className="remove" onClick={() => removeItem(item.key)}>
                      Remove
                    </button>
                  </div>
                  {item.option && <span className="opt">{item.option}</span>}
                  <div className="controls">
                    <div className="qty-sm">
                      <button onClick={() => changeQty(item.key, -1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.key, 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                    <span className="price" style={{ fontSize: 15 }}>
                      {formatMoney(item.price * item.qty, item.currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty">
              <div className="ce-orb" aria-hidden="true">
                ⊛
              </div>
              <p style={{ fontSize: 15, margin: '0 0 18px' }}>Your cart is empty.</p>
              <button className="btn btn-primary btn-md" onClick={continueShopping}>
                Continue shopping
              </button>
            </div>
          )}
        </div>

        {count > 0 && (
          <div className="drawer-foot">
            <div className="sub-row">
              <span>Subtotal</span>
              <span className="amt">{formatMoney(subtotal, currency)}</span>
            </div>
            <p className="note">Taxes and shipping calculated at checkout.</p>
            <button
              className="btn btn-purple btn-block"
              style={{ padding: 16 }}
              onClick={checkout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Starting checkout…' : 'Check out'}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
