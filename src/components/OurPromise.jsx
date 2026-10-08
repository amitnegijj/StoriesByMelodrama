import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { promise } from '../data/content';

// Sticky full-bleed photograph; the promise unfolds paragraph by paragraph over it.
export default function OurPromise() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo('.promise__bg img', { scale: 1.2 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      });
      gsap.utils.toArray('.promise__p').forEach((p) => {
        gsap.fromTo(p, { opacity: 0, y: 60, filter: 'blur(8px)' }, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 85%', end: 'top 45%', scrub: true },
        });
      });
      gsap.to('.promise__bg .shade', {
        opacity: 0.82,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '30% top', scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section className="promise" ref={root}>
      <div className="promise__bg" aria-hidden="true">
        <img src={promise.img} alt="" loading="lazy" />
        <div className="shade" />
      </div>
      <div className="promise__body wrap">
        <p className="eyebrow promise__p">Our promise to you</p>
        {promise.paragraphs.map((p) => (
          <p className="promise__p promise__text" key={p}>{p}</p>
        ))}
        <p className="promise__p promise__closing display">
          <em>{promise.closing}</em>
        </p>
        <p className="promise__p promise__small">
          Not just beautiful photographs or cinematic films — but the ability to return to the moments you never want to lose.
        </p>
      </div>
    </section>
  );
}
