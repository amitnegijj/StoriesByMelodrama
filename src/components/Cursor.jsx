import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

// Desktop-only custom cursor. Elements with data-cursor="label" grow it into a labelled disc.
export default function Cursor() {
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');
    const xTo = gsap.quickTo(dot.current, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(dot.current, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest('[data-cursor], a, button');
      const el = dot.current;
      if (!t) {
        el.classList.remove('is-label', 'is-link');
        return;
      }
      const text = t.getAttribute('data-cursor');
      if (text) {
        label.current.textContent = text;
        el.classList.add('is-label');
        el.classList.remove('is-link');
      } else {
        el.classList.add('is-link');
        el.classList.remove('is-label');
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div className="cursor" ref={dot} aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
