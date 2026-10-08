import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { letter, brand } from '../data/content';

export default function Letter() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from('.letter__paper', {
        y: 120,
        rotate: -2.5,
        opacity: 0,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.letter__paper', start: 'top 85%' },
      });
      gsap.utils.toArray('.letter__paper p, .letter__sign').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 24, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
      // Signature "writes" itself.
      gsap.fromTo('.letter__sig', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 2.2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.letter__sign', start: 'top 85%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="letter section" ref={root}>
      <div className="wrap">
        <article className="letter__paper">
          <p className="eyebrow">From our hearts to yours</p>
          <h2 className="display letter__title">{letter.title}</h2>
          {letter.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'letter__salute' : ''}>{p}</p>
          ))}
          <div className="letter__sign">
            <span>{letter.signoff}</span>
            <span className="letter__sig">{brand.name}</span>
          </div>
        </article>
      </div>
    </section>
  );
}
