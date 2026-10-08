import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { gram, brand } from '../data/content';

// Two infinite photo ribbons drifting in opposite directions; scrolling speeds them up.
export default function Gram() {
  const root = useRef(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray('.gram__row');
      const loops = rows.map((row, i) =>
        gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 60, ease: 'none', repeat: -1 })
      );
      let settle;
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          loops.forEach((l) => gsap.to(l, { timeScale: boost, duration: 0.2, overwrite: true }));
          settle?.kill();
          settle = gsap.delayedCall(0.25, () => loops.forEach((l) => gsap.to(l, { timeScale: 1, duration: 1.2, overwrite: true })));
        },
      });
    },
    { scope: root }
  );

  const half = Math.ceil(gram.length / 2);
  const rowA = gram.slice(0, half);
  const rowB = gram.slice(half);

  return (
    <section className="gram section" ref={root}>
      <div className="wrap gram__head">
        <p className="eyebrow">Follow the stories</p>
        <a href={brand.instagram} target="_blank" rel="noreferrer" className="display gram__handle link-line">
          @storiesbymelodrama
        </a>
      </div>
      {[rowA, rowB].map((row, r) => (
        <div className="gram__viewport" key={r}>
          <div className="gram__row">
            {[...row, ...row].map((src, i) => (
              <a href={brand.instagram} target="_blank" rel="noreferrer" className="gram__tile" key={i} data-cursor="Open" tabIndex={i >= row.length ? -1 : 0}>
                <img src={src} alt="" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
