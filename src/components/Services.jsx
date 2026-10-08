import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { services } from '../data/content';

// Numbered service list beside a sticky frame. The active service changes
// on hover (desktop) or as each row crosses the middle of the screen.
export default function Services() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray('.service').forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      gsap.fromTo('.service', { opacity: 0, x: 40 }, {
        opacity: 1,
        x: 0,
        clearProps: 'opacity',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.services__list', start: 'top 80%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="services section" id="services" ref={root}>
      <div className="wrap">
        <div className="services__head">
          <p className="eyebrow">What we do</p>
          <h2 className="display">
            From the first idea <br />
            <em>to the final farewell.</em>
          </h2>
        </div>

        <div className="services__grid">
          <div className="services__frame" aria-hidden="true">
            {services.map((s, i) => (
              <img key={s.title} src={s.img} alt="" className={active === i ? 'is-on' : ''} loading="lazy" />
            ))}
            <span className="services__count">
              <b>0{active + 1}</b> / 0{services.length}
            </span>
          </div>

          <ol className="services__list">
            {services.map((s, i) => (
              <li
                key={s.title}
                className={`service ${active === i ? 'is-active' : ''}`}
                onPointerEnter={() => setActive(i)}
              >
                <span className="service__num">0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <img className="service__thumb" src={s.img} alt="" loading="lazy" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
