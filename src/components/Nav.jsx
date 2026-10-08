import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, scrollToTarget, lockScroll } from '../lib/gsap';
import { brand, nav, hero } from '../data/content';

export default function Nav({ ready }) {
  const root = useRef(null);
  const menu = useRef(null);
  const tl = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > last && y > 400);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(
    () => {
      gsap.set('.nav__bar > *', { yPercent: -120, opacity: 0 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(menu.current, { clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)', duration: 1, ease: 'expo.inOut' })
        .from('.menu__link span', { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, '-=0.45')
        .from('.menu__foot > *', { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 }, '-=0.6');
    },
    { scope: root }
  );

  useGSAP(() => {
    if (ready) gsap.to('.nav__bar > *', { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.6 });
  }, { scope: root, dependencies: [ready] });

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      lockScroll(true);
      tl.current.timeScale(1).play();
    } else {
      tl.current.timeScale(1.6).reverse();
      if (ready) lockScroll(false);
    }
  }, [open, ready]);

  const go = (e, href) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    setTimeout(() => scrollToTarget(href), wasOpen ? 650 : 0);
  };

  return (
    <header ref={root} className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar">
        <a href="#top" className="nav__logo" onClick={(e) => go(e, '#top')} aria-label={brand.name}>
          <span className="italic">Stories by</span> Melodrama
        </a>
        <nav className="nav__links" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} className="link-line">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav__right">
          <a href="#contact" className="btn btn--small nav__cta" onClick={(e) => go(e, '#contact')}>
            Enquire
          </a>
          <button
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <i /><i />
          </button>
        </div>
      </div>

      <div className="menu" ref={menu} aria-hidden={!open}>
        <div className="menu__img" style={{ backgroundImage: `url(${hero.slides[1]})` }} />
        <div className="menu__body">
          <ul>
            {nav.map((n, i) => (
              <li key={n.href}>
                <a href={n.href} className="menu__link mask" onClick={(e) => go(e, n.href)} tabIndex={open ? 0 : -1}>
                  <span><sup>0{i + 1}</sup>{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <a href={`mailto:${brand.email}`} tabIndex={open ? 0 : -1}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} tabIndex={open ? 0 : -1}>{brand.phone}</a>
            <a href={brand.instagram} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Instagram ↗</a>
          </div>
        </div>
      </div>
    </header>
  );
}
