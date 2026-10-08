import { useRef } from 'react';
import { gsap, useGSAP, scrollToTarget } from '../lib/gsap';
import { hero } from '../data/content';

export default function Hero({ ready }) {
  const root = useRef(null);

  // Slow cross-fading slideshow, each frame drifting in scale (Ken Burns).
  useGSAP(
    () => {
      const slides = gsap.utils.toArray('.hero__slide');
      let current = 0;
      const show = (idx, fade) => {
        slides.forEach((s, j) => gsap.set(s, { zIndex: j === idx ? 2 : 1 }));
        gsap.fromTo(slides[idx], { opacity: fade ? 0 : 1 }, { opacity: 1, duration: 1.6, ease: 'power2.inOut' });
        gsap.fromTo(slides[idx].firstChild, { scale: 1.12 }, { scale: 1, duration: 8, ease: 'none' });
      };
      const advance = () => {
        current = (current + 1) % slides.length;
        show(current, true);
        gsap.delayedCall(6, advance);
      };
      gsap.set(slides, { opacity: 0 });
      show(0, false);
      if (slides.length > 1) gsap.delayedCall(6, advance);

      // Scroll-out parallax.
      gsap.to('.hero__media', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__content', {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!ready) return;
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__media', { scale: 1.25, duration: 2.4 }, 0)
        .from('.hero__line > span', { yPercent: 115, rotate: 3, duration: 1.6, stagger: 0.12 }, 0.2)
        .from('.hero__eyebrow, .hero__sub, .hero__actions, .hero__scroll', { opacity: 0, y: 30, duration: 1.2, stagger: 0.1 }, 0.8);
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media">
        {hero.slides.map((src, i) => (
          <div className="hero__slide" key={src}>
            <img src={src} alt="" fetchPriority={i === 0 ? 'high' : 'low'} />
          </div>
        ))}
        <div className="hero__shade" />
      </div>

      <div className="hero__content wrap">
        <p className="eyebrow hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__title">
          {hero.lines.map((l, i) => (
            <span className={`hero__line mask ${i === 1 ? 'italic' : ''}`} key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h1>
        <p className="hero__sub">{hero.sub}</p>
        <div className="hero__actions">
          <a href="#stories" className="btn btn--light" onClick={(e) => { e.preventDefault(); scrollToTarget('#stories'); }}>
            Explore our stories
          </a>
          <a href="#films" className="btn btn--ghost" onClick={(e) => { e.preventDefault(); scrollToTarget('#films'); }}>
            <span className="play-dot" /> Watch the film
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
