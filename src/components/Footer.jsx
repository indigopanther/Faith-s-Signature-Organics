import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext.jsx';
import { business, footerShop, socials } from '../data/content.js';
import SocialIcon from './SocialIcon.jsx';
import logo from '../assets/faiths-logo.png';

export default function Footer() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');

  const goShop = (cat) =>
    navigate(`/shop${cat ? `?category=${encodeURIComponent(cat)}` : ''}`);

  const subscribe = () => {
    if (email.includes('@') && email.includes('.')) {
      toast("You're on the list — talk soon!");
      setEmail('');
    } else {
      toast("Hmm, that email doesn't look right.");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <span className="footer-logo">
            <img src={logo} alt={business.name} />
          </span>
          <p>{business.description}</p>
          <div className="socials">
            {socials.map((s) => (
              <a
                key={s.label}
                className="social"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <SocialIcon name={s.id} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <span className="footer-col-title">Shop</span>
          <div className="footer-links">
            {footerShop.map((f) => (
              <button key={f.label} className="footer-link" onClick={() => goShop(f.cat)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="footer-col-title">Newsletter</span>
          <p style={{ margin: '16px 0 14px' }}>
            We'll email when a fresh batch drops. No spam, promise.
          </p>
          <div className="newsletter">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && subscribe()}
              placeholder="Email address"
              aria-label="Email address"
              type="email"
            />
            <button className="btn btn-purple btn-md" onClick={subscribe}>
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} {business.name} · Handcrafted in {business.city}
      </div>
    </footer>
  );
}
