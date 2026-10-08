import { useEffect, useState } from 'react';
import { initSmoothScroll, lockScroll, ScrollTrigger } from './lib/gsap';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Moments from './components/Moments';
import Stories from './components/Stories';
import About from './components/About';
import Services from './components/Services';
import Films from './components/Films';
import OurPromise from './components/OurPromise';
import Testimonials from './components/Testimonials';
import Letter from './components/Letter';
import Faq from './components/Faq';
import Gram from './components/Gram';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    initSmoothScroll();
    lockScroll(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    lockScroll(false);
    // images above the fold may shift layout once loaded
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    window.addEventListener('load', () => ScrollTrigger.refresh());
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <Moments />
        <Stories />
        <About />
        <Services />
        <Films />
        <OurPromise />
        <Testimonials />
        <Letter />
        <Faq />
        <Gram />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
