import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { about } from '../data/content';

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from('.about__title .mask > span', {
        yPercent: 110,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.about__title', start: 'top 80%' },
      });
      gsap.fromTo('.about__main', { clipPath: 'inset(18% 12% 18% 12%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: '.about__main', start: 'top 90%', end: 'center 55%', scrub: true },
      });
      gsap.fromTo('.about__main img', { scale: 1.3 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.about__main', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.fromTo('.about__float', { yPercent: 30 }, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.from('.about__copy > *', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.about__copy', start: 'top 80%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="about section" id="about" ref={root}>
      <div className="wrap">
        <p className="eyebrow">Who we are</p>
        <h2 className="display about__title">
          {about.title.map((t, i) => (
            <span className="mask" key={t}>
              <span className={i === 2 ? 'italic accent' : ''}>{t}</span>
            </span>
          ))}
        </h2>

        <div className="about__grid">
          <div className="about__visual">
            <div className="about__main">
              <img src={about.img} alt="Guests celebrating the couple with confetti" loading="lazy" />
            </div>
            <div className="about__float">
              <img src={about.img2} alt="Wedding rings resting on a bouquet" loading="lazy" />
            </div>
          </div>
          <div className="about__copy">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <blockquote>“{about.quote}”</blockquote>
            <ul className="about__lines">
              <li>Every smile has a story.</li>
              <li>Every tear has a reason.</li>
              <li>Every photograph holds a piece of someone's heart.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
