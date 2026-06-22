import { useNavigate } from 'react-router-dom';
import { values } from '../data/content.js';
import { DECOR } from '../data/images.js';
import Reveal from '../components/Reveal.jsx';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="route-fade">
      <section
        className="about-hero"
        style={{
          backgroundImage: `linear-gradient(150deg, rgba(74,37,69,0.88), rgba(44,122,57,0.86)), url(${DECOR.aboutHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hatch" />
        <div className="about-hero-inner">
          <span className="eyebrow on-dark">Our story</span>
          <h1>
            Made by hand,
            <br />
            made with faith.
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px,1.5vw,19px)',
              lineHeight: 1.65,
              color: 'rgba(245,238,251,0.82)',
              maxWidth: 600,
              margin: '24px auto 0',
            }}
          >
            It started on a stovetop in Atlanta. We're a little bigger now, but every jar is still
            made by the same hands, with the same care.
          </p>
        </div>
      </section>

      <section className="split">
        <Reveal className="feature-visual tall">
          <img
            className="feature-img"
            src={DECOR.portrait}
            alt="Faith, founder of Faith's Signature Organics"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="h-section" style={{ fontSize: 'clamp(26px,3.4vw,40px)', lineHeight: 1.08 }}>
            I started this because I couldn't find the real thing.
          </h2>
          <p className="lead" style={{ margin: '20px 0 0', lineHeight: 1.7 }}>
            I went looking for immune support I could actually trust, and all I found were shelves of
            fillers, sugar, and words I couldn't pronounce. So I started making my own — elderberries
            on the stove, sea moss blended by hand, one batch at a time.
          </p>
          <p className="lead" style={{ margin: '16px 0 0', lineHeight: 1.7 }}>
            Years later, I'm still doing it the same way — by hand, in small batches, right here in
            Atlanta. No shortcuts, no factory. Just good herbs and a lot of care.
          </p>
        </Reveal>
      </section>

      <section className="band-green">
        <div className="container section">
          <Reveal>
            <h2 className="h-section on-dark" style={{ textAlign: 'center', margin: '0 0 44px' }}>
              What we stand for
            </h2>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} className="value" delay={i * 90}>
                <div className="value-icon" aria-hidden="true">
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-center">
        <Reveal>
          <h2 className="h-section" style={{ margin: '0 0 8px' }}>
            Come find your new favorite.
          </h2>
          <p className="lead" style={{ margin: '0 0 28px' }}>
            The same jars our Atlanta neighbors keep coming back for.
          </p>
          <button className="btn btn-purple btn-lg" onClick={() => navigate('/shop')}>
            Shop all products
          </button>
        </Reveal>
      </section>
    </div>
  );
}
