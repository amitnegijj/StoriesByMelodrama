import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { manifesto } from '../data/content';

// Words light up one by one as the reader scrolls through the paragraph.
export default function Manifesto() {
  const root = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create('.manifesto__text', { type: 'words', wordsClass: 'mw' });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.manifesto__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      );
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section className="manifesto section" ref={root}>
      <div className="wrap">
        <p className="eyebrow">Our belief</p>
        <p className="manifesto__text">{manifesto}</p>
      </div>
    </section>
  );
}
