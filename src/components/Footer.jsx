import { useRef } from 'react';
import { gsap, SplitText, useGSAP, scrollToTarget } from '../lib/gsap';
import { brand, nav } from '../data/content';

export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create('.footer__word', { type: 'chars' });
      gsap.from(split.chars, {
        yPercent: 100,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: '.footer__word', start: 'top 95%' },
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <footer className="footer" ref={root}>
      <div className="wrap">
        <p className="footer__tagline display">
          We capture the moments. <em>You keep the memories.</em> Together, we tell your story.
        </p>
        <div className="footer__cols">
          <div>
            <h4>Explore</h4>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-line" onClick={(e) => { e.preventDefault(); scrollToTarget(n.href); }}>{n.label}</a>
            ))}
          </div>
          <div>
            <h4>Say hello</h4>
            <a href={`mailto:${brand.email}`} className="link-line">{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="link-line">{brand.phone}</a>
            <span>{brand.city}</span>
          </div>
          <div>
            <h4>Follow</h4>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="link-line">Instagram ↗</a>
            <a href={brand.youtube} target="_blank" rel="noreferrer" className="link-line">YouTube ↗</a>
          </div>
          <div className="footer__top">
            <button onClick={() => scrollToTarget('#top')} className="btn btn--ghost">Back to top ↑</button>
          </div>
        </div>
      </div>
      <p className="footer__word" aria-hidden="true">Melodrama</p>
      <div className="wrap footer__legal">
        <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
        <span>Every love story deserves to be remembered.</span>
      </div>
    </footer>
  );
}
