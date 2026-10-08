import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { moments } from '../data/content';

// Pinned horizontal film-strip of the emotional moments (desktop),
// falling back to a vertical stack on small screens.
export default function Moments() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        const scroll = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.moments__pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray('.moment img').forEach((img) => {
          gsap.fromTo(img, { xPercent: -12 }, {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true },
          });
        });
        gsap.to('.moments__progress i', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.moments__pin', start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });
      });
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.moment').forEach((m) => {
          gsap.from(m, { opacity: 0, y: 60, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: m, start: 'top 85%' } });
        });
      });

      gsap.from('.moments__outro .mask > span', {
        yPercent: 110,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.moments__outro', start: 'top 80%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="moments" ref={root}>
      <div className="moments__pin">
        <div className="moments__track" ref={track}>
          <div className="moments__intro">
            <p className="eyebrow">The little things</p>
            <h2 className="display">
              {moments.title[0]}
              <br />
              <em>{moments.title[1]}</em>
            </h2>
            <p className="moments__hint" aria-hidden="true">Keep scrolling <span>→</span></p>
          </div>
          {moments.items.map((m, i) => (
            <figure className={`moment moment--${i % 2 ? 'low' : 'high'}`} key={m.img}>
              <div className="moment__img" data-cursor="Feel">
                <img src={m.img} alt={m.caption} loading="lazy" />
              </div>
              <figcaption>
                <span className="moment__num">0{i + 1}</span>
                {m.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="moments__progress" aria-hidden="true"><i /></div>
      </div>
      <div className="moments__outro wrap">
        {moments.outro.map((l, i) => (
          <p className="mask" key={l}>
            <span className={i === 1 ? 'italic accent' : ''}>{l}</span>
          </p>
        ))}
        <p className="moments__that">That is where we come in.</p>
      </div>
    </section>
  );
}
