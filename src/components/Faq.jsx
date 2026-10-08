import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { faqs } from '../data/content';

function Item({ q, a, open, onToggle, id }) {
  const body = useRef(null);

  useGSAP(
    () => {
      gsap.to(body.current, {
        height: open ? 'auto' : 0,
        opacity: open ? 1 : 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { dependencies: [open] }
  );

  return (
    <li className={`faq__item ${open ? 'is-open' : ''}`}>
      <button onClick={onToggle} aria-expanded={open} aria-controls={id}>
        <span>{q}</span>
        <i aria-hidden="true" />
      </button>
      <div className="faq__a" id={id} ref={body} style={{ height: 0, opacity: 0 }}>
        <p>{a}</p>
      </div>
    </li>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section">
      <div className="wrap faq__grid">
        <div>
          <p className="eyebrow">Good to know</p>
          <h2 className="display">
            Questions, <br />
            <em>gently answered.</em>
          </h2>
        </div>
        <ul className="faq__list">
          {faqs.map((f, i) => (
            <Item key={f.q} id={`faq-${i}`} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
