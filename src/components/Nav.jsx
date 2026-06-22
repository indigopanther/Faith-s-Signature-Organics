import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { business } from '../data/content.js';
import logo from '../assets/faiths-logo.png';

const LINKS = [
  { label: 'Home', to: '/', match: (p) => p === '/' },
  { label: 'Shop', to: '/shop', match: (p) => p.startsWith('/shop') || p.startsWith('/products') },
  { label: 'Our Story', to: '/about', match: (p) => p.startsWith('/about') },
  { label: 'Contact', to: '/contact', match: (p) => p.startsWith('/contact') },
];

export default function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <header className="header">
      <div className="announcement">{business.announcement}</div>
      <nav className="nav" aria-label="Primary">
        <button className="nav-logo" onClick={() => go('/')} aria-label={`${business.name} — home`}>
          <img src={logo} alt={business.name} />
        </button>

        <div className="nav-links">
          {LINKS.map((l) => (
            <button
              key={l.to}
              className={`nav-link${l.match(pathname) ? ' active' : ''}`}
              onClick={() => go(l.to)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={openCart} aria-label="Open cart">
            <span aria-hidden="true" style={{ fontSize: 15 }}>
              ⊛
            </span>
            Cart
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <button
            key={l.to}
            className={`nav-link${l.match(pathname) ? ' active' : ''}`}
            onClick={() => go(l.to)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </header>
  );
}
