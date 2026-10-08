import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { brand, services, contactImg } from '../data/content';

// Static-site friendly enquiry form: composes the enquiry and hands it to
// WhatsApp or the visitor's email app — no backend needed.
export default function Contact() {
  const root = useRef(null);
  const [picked, setPicked] = useState([]);

  useGSAP(
    () => {
      gsap.from('.contact__title .mask > span', {
        yPercent: 110,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.contact__title', start: 'top 85%' },
      });
      gsap.from('.contact__form > *', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.contact__form', start: 'top 85%' },
      });
    },
    { scope: root }
  );

  const toggle = (t) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const compose = (form) => {
    const d = Object.fromEntries(new FormData(form));
    return [
      `Hello ${brand.name}!`,
      `Names: ${d.name}${d.partner ? ' & ' + d.partner : ''}`,
      d.date && `Wedding date: ${d.date}`,
      d.venue && `Venue / city: ${d.venue}`,
      picked.length && `Interested in: ${picked.join(', ')}`,
      d.phone && `Phone: ${d.phone}`,
      d.message && `\n${d.message}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const text = compose(e.currentTarget);
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const onEmail = (e) => {
    const form = e.currentTarget.form;
    if (!form.reportValidity()) return;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Wedding enquiry')}&body=${encodeURIComponent(compose(form))}`;
  };

  return (
    <section className="contact section" id="contact" ref={root}>
      <div className="contact__bg" aria-hidden="true" style={{ backgroundImage: `url(${contactImg})` }} />
      <div className="wrap contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">Begin your story</p>
          <h2 className="display contact__title">
            <span className="mask"><span>Let us tell</span></span>
            <span className="mask"><span className="italic accent">your story.</span></span>
          </h2>
          <p className="contact__lede">
            Tell us a little about your celebration. We read every message personally and will get back to you within a day.
          </p>
          <ul className="contact__details">
            <li><span>Email</span><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
            <li><span>Call</span><a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a></li>
            <li><span>Studio</span>{brand.city}</li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={onSubmit}>
          <div className="field-row">
            <label className="field">
              <input name="name" required placeholder=" " autoComplete="name" />
              <span>Your name *</span>
            </label>
            <label className="field">
              <input name="partner" placeholder=" " />
              <span>Partner's name</span>
            </label>
          </div>
          <div className="field-row">
            <label className="field">
              <input name="date" type="date" placeholder=" " className="has-value" />
              <span>Wedding date</span>
            </label>
            <label className="field">
              <input name="venue" placeholder=" " />
              <span>Venue / city</span>
            </label>
          </div>
          <label className="field">
            <input name="phone" type="tel" required placeholder=" " autoComplete="tel" />
            <span>Phone *</span>
          </label>

          <fieldset className="chips">
            <legend>I'm interested in</legend>
            {services.map((s) => (
              <button type="button" key={s.title} className={picked.includes(s.title) ? 'is-on' : ''} onClick={() => toggle(s.title)} aria-pressed={picked.includes(s.title)}>
                {s.title}
              </button>
            ))}
          </fieldset>

          <label className="field">
            <textarea name="message" rows="3" placeholder=" " />
            <span>Tell us your story</span>
          </label>

          <div className="contact__actions">
            <button type="submit" className="btn btn--gold">Send on WhatsApp</button>
            <button type="button" className="btn btn--ghost" onClick={onEmail}>Send by email</button>
          </div>
        </form>
      </div>
    </section>
  );
}
