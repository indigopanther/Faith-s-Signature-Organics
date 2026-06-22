import { useState } from 'react';
import { useToast } from '../context/ToastContext.jsx';
import { contactInfo } from '../data/content.js';
import Reveal from '../components/Reveal.jsx';

const EMPTY = { name: '', email: '', message: '' };

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState(EMPTY);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const send = () => {
    const validEmail = form.email.includes('@') && form.email.includes('.');
    if (form.name.trim() && validEmail && form.message.trim()) {
      toast(`Thanks ${form.name.trim().split(' ')[0]} — we'll be in touch soon!`);
      setForm(EMPTY);
    } else {
      toast("Looks like something's missing — check the fields and your email.");
    }
  };

  return (
    <div className="route-fade">
      <section className="contact-grid">
        <Reveal>
          <span className="eyebrow">Get in touch</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(36px,5vw,58px)', margin: '12px 0 0' }}>
            We'd love to
            <br />
            hear from you.
          </h1>
          <p className="lead" style={{ margin: '20px 0 0', maxWidth: 420 }}>
            Got a question about a product, a wholesale order, or local pickup? Drop us a line — we
            usually write back within a day or two.
          </p>
          <div className="contact-info">
            {contactInfo.map((c) => (
              <div className="contact-row" key={c.label}>
                <span className="ci-icon" aria-hidden="true">
                  {c.icon}
                </span>
                <div>
                  <span className="ci-label">{c.label}</span>
                  <span className="ci-value">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="contact-card" delay={120}>
          <form
            className="form-stack"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <label className="field">
              <span className="field-label">Name</span>
              <input value={form.name} onChange={update('name')} placeholder="Your name" />
            </label>
            <label className="field">
              <span className="field-label">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="you@email.com"
              />
            </label>
            <label className="field">
              <span className="field-label">Message</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="How can we help?"
              />
            </label>
            <button type="submit" className="btn btn-primary" style={{ padding: 16 }}>
              Send message
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
