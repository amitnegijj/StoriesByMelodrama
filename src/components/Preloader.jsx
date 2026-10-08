import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { hero } from '../data/content';

// Warm the browser cache with the first hero frame while the counter runs.
function preload(src) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = img.onerror = res;
    img.src = src;
  });
}

export default function Preloader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(root.current, { display: 'none' });
        onDone();
        return;
      }
      const counter = { v: 0 };
      const imgReady = Promise.race([preload(hero.slides[0]), new Promise((r) => setTimeout(r, 4000))]);

      const tl = gsap.timeline();
      tl.from('.pre__word', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.12 })
        .to(counter, {
          v: 100,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
          },
        }, 0.2)
        .to('.pre__bar i', { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0.2);

      tl.eventCallback('onComplete', () => {
        imgReady.then(() => {
          gsap.timeline({ onComplete: () => gsap.set(root.current, { display: 'none' }) })
            .to('.pre__inner', { yPercent: -30, opacity: 0, duration: 0.8, ease: 'power3.in' })
            .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.inOut' }, '-=0.3')
            .add(onDone, '-=0.7');
        });
      });
    },
    { scope: root }
  );

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__inner">
        <p className="pre__title">
          <span className="mask"><span className="pre__word">Stories</span></span>{' '}
          <span className="mask"><span className="pre__word italic">by</span></span>{' '}
          <span className="mask"><span className="pre__word">Melodrama</span></span>
        </p>
        <div className="pre__bar"><i /></div>
        <p className="pre__count" ref={count}>000</p>
      </div>
    </div>
  );
}
