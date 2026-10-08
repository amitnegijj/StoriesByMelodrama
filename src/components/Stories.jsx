import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { stories } from '../data/content';

// Editorial list of real weddings; on desktop a preview image follows the cursor.
export default function Stories() {
  const root = useRef(null);
  const preview = useRef(null);
  const moveTo = useRef({});
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      moveTo.current.x = gsap.quickTo(preview.current, 'x', { duration: 0.6, ease: 'power3' });
      moveTo.current.y = gsap.quickTo(preview.current, 'y', { duration: 0.6, ease: 'power3' });

      gsap.fromTo('.story', { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        clearProps: 'opacity',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.stories__list', start: 'top 80%' },
      });
      gsap.from('.stories__head .mask > span', {
        yPercent: 110,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.stories__head', start: 'top 80%' },
      });
    },
    { scope: root }
  );

  const onMove = (e) => {
    const r = root.current.getBoundingClientRect();
    moveTo.current.x?.(e.clientX - r.left);
    moveTo.current.y?.(e.clientY - r.top);
  };

  return (
    <section className="stories section" id="stories" ref={root} onPointerMove={onMove}>
      <div className="wrap">
        <div className="stories__head">
          <p className="eyebrow">Real weddings</p>
          <h2 className="display">
            <span className="mask"><span>Stories we've</span></span>
            <span className="mask"><span className="italic accent">had the honour</span></span>
            <span className="mask"><span>to tell.</span></span>
          </h2>
        </div>

        <ul className="stories__list" onPointerLeave={() => setActive(-1)}>
          {stories.map((s, i) => (
            <li className={`story ${active === i ? 'is-active' : ''} ${active > -1 && active !== i ? 'is-dim' : ''}`} key={s.couple} onPointerEnter={() => setActive(i)}>
              <a href="#contact" data-cursor="View" onClick={(e) => e.preventDefault()}>
                <span className="story__num">0{i + 1}</span>
                <img className="story__thumb" src={s.img} alt="" loading="lazy" />
                <span className="story__couple">{s.couple}</span>
                <span className="story__meta">{s.place} <em>·</em> {s.year}</span>
                <span className="story__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`stories__preview ${active > -1 ? 'is-on' : ''}`} ref={preview} aria-hidden="true">
        {stories.map((s, i) => (
          <img key={s.img} src={s.img} alt="" className={active === i ? 'is-on' : ''} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
