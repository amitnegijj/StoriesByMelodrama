import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { films } from '../data/content';

export default function Films() {
  const root = useRef(null);
  const btn = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 10%', scrub: true },
      });
      tl.fromTo('.films__frame', { clipPath: 'inset(12% 18% 12% 18% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' })
        .fromTo('.films__frame img', { scale: 1.35 }, { scale: 1, ease: 'none' }, 0);
      gsap.from('.films__title .mask > span', {
        yPercent: 110,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.films__title', start: 'top 85%' },
      });
    },
    { scope: root }
  );

  // Magnetic play button.
  const onMove = (e) => {
    const r = btn.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(btn.current, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3' });
  };
  const onLeave = () => gsap.to(btn.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });

  return (
    <section className="films" id="films" ref={root}>
      <a
        href={films.link}
        target="_blank"
        rel="noreferrer"
        className="films__frame"
        data-cursor="Play"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        aria-label="Watch our wedding films"
      >
        <img src={films.poster} alt="A couple walking together across a hilltop at dusk" loading="lazy" />
        <div className="films__shade" />
        <div className="films__content wrap">
          <p className="eyebrow">Cinematic wedding films</p>
          <h2 className="display films__title">
            <span className="mask"><span>Your love story,</span></span>
            <span className="mask"><span className="italic">told like a film.</span></span>
          </h2>
        </div>
        <span className="films__play" ref={btn}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          <span>Play reel</span>
        </span>
      </a>
    </section>
  );
}
