# Stories by Melodrama — website

Static React site (Vite) with GSAP + ScrollTrigger animations and Lenis smooth scrolling.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/
npm run preview   # serve the built site
```

`dist/` can be hosted on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3).

## Editing content

Everything — text, photos, services, weddings, reviews, FAQs, contact details — is in
[`src/data/content.js`](src/data/content.js).

**Before launch, replace:**
- All photos (currently Unsplash placeholders). Put your own in `public/photos/` and reference them as `'/photos/name.jpg'`. Export at ~2400px wide for full-screen images, ~1200px for others.
- `brand` — email, phone, WhatsApp number (digits only, with country code), city, Instagram/YouTube links.
- `stories` — your real featured weddings.
- `testimonials` — genuine client reviews (the current ones are placeholders).
- `faqs` — confirm answers match your policies.
- `films.link` — your showreel URL.

## Structure

| Section | File |
|---|---|
| Loading screen | `components/Preloader.jsx` |
| Hero slideshow | `components/Hero.jsx` |
| Scroll-lit manifesto | `components/Manifesto.jsx` |
| Horizontal "moments" gallery | `components/Moments.jsx` |
| Real weddings list (hover preview) | `components/Stories.jsx` |
| About | `components/About.jsx` |
| Services (sticky image) | `components/Services.jsx` |
| Film reel | `components/Films.jsx` |
| Our promise | `components/OurPromise.jsx` |
| Reviews | `components/Testimonials.jsx` |
| Letter from the team | `components/Letter.jsx` |
| FAQ | `components/Faq.jsx` |
| Instagram marquee | `components/Gram.jsx` |
| Enquiry form (WhatsApp / email) | `components/Contact.jsx` |

Styles: `src/styles/global.css` (colour and font tokens at the top).
Motion respects the visitor's "reduce motion" setting.
