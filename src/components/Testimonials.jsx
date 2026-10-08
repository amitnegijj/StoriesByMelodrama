import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { testimonials } from '../data/content';

export default function Testimonials() {
  const root = useRef(null);
  const quote = useRef(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (dir) => setI((n) => (n + dir + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [i, paused]);

  useGSAP(
    () => {
      gsap.fromTo(quote.current, { opacity: 0, y: 30, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' });
    },
    { scope: root, dependencies: [i] }
  );

  const t = testimonials[i];

  return (
    <section
      className="testimonials section"
      ref={root}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Kind words from our couples"
    >
      <div className="wrap testimonials__inner">
        <p className="eyebrow">Kind words</p>
        <span className="testimonials__mark" aria-hidden="true">“</span>
        <figure ref={quote} aria-live="polite">
          <blockquote>{t.quote}</blockquote>
          <figcaption>
            <b>{t.name}</b> <span>{t.place}</span>
          </figcaption>
        </figure>
        <div className="testimonials__nav">
          <button onClick={() => go(-1)} aria-label="Previous review">←</button>
          <div className="testimonials__dots">
            {testimonials.map((x, n) => (
              <button key={x.name} className={n === i ? 'is-on' : ''} onClick={() => setI(n)} aria-label={`Review ${n + 1}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review">→</button>
        </div>
      </div>
    </section>
  );
}
