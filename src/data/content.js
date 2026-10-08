// ─────────────────────────────────────────────────────────────
//  All site content lives here. Swap placeholder photos for your
//  own work: drop files in /public/photos and use '/photos/x.jpg'
//  instead of the u('…') Unsplash helper.
// ─────────────────────────────────────────────────────────────

const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const brand = {
  name: 'Stories by Melodrama',
  short: 'Melodrama',
  tagline: 'We capture the moments. You keep the memories. Together, we tell your story.',
  // TODO: replace with real contact details
  email: 'hello@storiesbymelodrama.com',
  phone: '+91 00000 00000',
  whatsapp: '910000000000',
  city: 'Dehradun, Uttarakhand, India',
  instagram: 'https://instagram.com/',
  youtube: 'https://youtube.com/',
};

export const nav = [
  { label: 'Stories', href: '#stories' },
  { label: 'Services', href: '#services' },
  { label: 'Films', href: '#films' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'Wedding Photography · Films · Events',
  lines: ['Every Love Story', 'Deserves to Be', 'Remembered.'],
  sub: "We don't just capture weddings. We preserve the feelings that make them unforgettable.",
  slides: [
    u('1544078751-58fee2d8a03b', 2400),
    u('1604017011826-d3b4c23f8914', 2400),
    u('1610173827002-62c0f1f05d04', 2400),
    u('1460978812857-470ed1c77af0', 2400),
  ],
};

export const manifesto =
  'At Stories by Melodrama, we believe a wedding is much more than a celebration. It is the beginning of a new journey, the meeting of two families, the blessing of parents, the laughter of friends — and a thousand little moments that become the most beautiful memories of a lifetime.';

export const moments = {
  title: ['Behind every wedding,', 'there is a story waiting to be told.'],
  items: [
    { img: u('1610173827002-62c0f1f05d04', 1200), caption: "A father's silent tears as he watches his daughter become a bride." },
    { img: u('1617627143750-d86bc21e42bb', 1200), caption: "A mother's trembling hands as she helps her son get ready." },
    { img: u('1546032996-6dfacbacbf3f', 1200), caption: 'Two people promising forever without saying a word.' },
    { img: u('1595407753234-0882f1e77954', 1200), caption: 'The warm hugs, the uncontrollable laughter, the happy tears.' },
    { img: u('1583939003579-730e3918a45a', 1200), caption: 'And the goodbyes that no one is ever truly ready for.' },
  ],
  outro: ['These moments may last only a few seconds,', 'but their memories deserve to last forever.'],
};

// TODO: replace with your real featured weddings
export const stories = [
  { couple: 'Ananya & Vikram', place: 'Udaipur', year: '2025', img: u('1591604466107-ec97de577aff', 1000) },
  { couple: 'Meera & Arjun', place: 'Goa', year: '2025', img: u('1606216794074-735e91aa2c92', 1000) },
  { couple: 'Sana & Kabir', place: 'Jaipur', year: '2024', img: u('1537633552985-df8429e8048b', 1000) },
  { couple: 'Riya & Aditya', place: 'Mussoorie', year: '2024', img: u('1604017011826-d3b4c23f8914', 1000) },
  { couple: 'Ishita & Rohan', place: 'New Delhi', year: '2024', img: u('1621621667797-e06afc217fb0', 1000) },
];

export const services = [
  { title: 'Wedding Photography', desc: 'Honest, emotional, and timeless photographs.', img: u('1519741497674-611481863552', 1200) },
  { title: 'Cinematic Wedding Films', desc: 'Your love story, told like a film.', img: u('1460978812857-470ed1c77af0', 1200) },
  { title: 'Pre-Wedding Shoots', desc: 'Celebrating your journey before the beginning of forever.', img: u('1621621667797-e06afc217fb0', 1200) },
  { title: 'Candid Photography', desc: 'Unscripted moments and genuine emotions.', img: u('1583939003579-730e3918a45a', 1200) },
  { title: 'Destination Weddings', desc: 'Beautiful celebrations in unforgettable places.', img: u('1544078751-58fee2d8a03b', 1200) },
  { title: 'Event Management', desc: 'Thoughtfully planned celebrations, from the first idea to the final farewell.', img: u('1587271407850-8d438ca9fdf2', 1200) },
  { title: 'Wedding Planning & Décor', desc: 'Personalised concepts that bring your dreams to life.', img: u('1523438885200-e635ba2c371e', 1200) },
];

export const about = {
  title: ['More Than Photography.', 'More Than Events.', 'A Lifetime of Memories.'],
  body: [
    'We are a team of passionate storytellers, wedding photographers, filmmakers, and event planners dedicated to turning your most meaningful moments into timeless memories.',
    'From intimate ceremonies and grand destination weddings to pre-wedding films, candid photography, cinematic wedding films, and complete event management, we bring your vision to life with creativity, care, and attention to every little detail.',
  ],
  quote: "We don't believe in simply documenting what a wedding looks like. We believe in capturing what it feels like.",
  img: u('1595407753234-0882f1e77954', 1400),
  img2: u('1515934751635-c81c6bc9a2d8', 900),
};

export const films = {
  title: 'Your love story, told like a film.',
  // TODO: replace with your showreel link
  link: 'https://youtube.com/',
  poster: u('1532712938310-34cb3982ef74', 2400),
};

export const promise = {
  img: u('1465495976277-4387d4b0b4c6', 2400),
  paragraphs: [
    'Years from now, when the music has faded, the decorations have been taken down, and life has moved forward, you will open your wedding album.',
    'You will see your younger selves, your parents standing beside you, your friends laughing without a care, and the people who made your day special.',
    'You will hear the laughter in your mind, feel the warmth of those embraces, and remember exactly how your heart felt that day.',
  ],
  closing: 'That is the magic we want to leave behind.',
};

// TODO: replace with genuine client reviews before going live
export const testimonials = [
  { quote: 'They didn’t just photograph our wedding — they gave us back the way it felt. Every time we open the album, we cry all over again.', name: 'Ananya & Vikram', place: 'Udaipur' },
  { quote: 'From décor to the last farewell, everything was taken care of with so much love. Our families still talk about it.', name: 'Meera & Arjun', place: 'Goa' },
  { quote: 'The film is our most treasured possession. My father’s face during the pheras — we would never have seen it otherwise.', name: 'Sana & Kabir', place: 'Jaipur' },
];

export const letter = {
  title: 'A Message From Our Hearts to Yours',
  paragraphs: [
    'Dear couples and families,',
    'Life moves faster than we realise. Children grow up, parents grow older, families change, and beautiful days slowly become memories.',
    "We cannot stop time. We cannot ask a moment to stay a little longer. We cannot bring back the sound of a loved one's laughter exactly as it was. But we can preserve the moments that matter.",
    'When you choose Stories by Melodrama, you are not simply booking a photography team or an event management company. You are trusting us with the memories of one of the most meaningful chapters of your life.',
    "We understand that these are not just photographs for you. They are your parents' blessings, your family's emotions, your promises of forever, and the beginning of a new home and a new life. We promise to treat your story with the respect, sensitivity, and love it deserves.",
    'Because long after the wedding is over, long after the flowers have faded, and long after the celebrations have ended, your memories will still be yours. And it would be our greatest honour to help you keep them alive.',
  ],
  signoff: 'With love,',
};

// TODO: confirm these answers match your actual policies
export const faqs = [
  { q: 'How far in advance should we book?', a: 'Wedding seasons fill up quickly. We recommend reaching out 6–9 months ahead, especially for destination weddings and peak-season dates.' },
  { q: 'Do you travel for destination weddings?', a: 'Yes — we love travelling with your story. We cover weddings across India and abroad, and can plan the entire celebration end-to-end.' },
  { q: 'Can we book only photography, or only event management?', a: 'Absolutely. Choose any single service or combine photography, films, planning and décor into one seamless experience.' },
  { q: 'When will we receive our photographs and film?', a: 'You receive a curated preview within days of the wedding. The complete edited gallery, album and cinematic film follow, with timelines shared at booking.' },
  { q: 'How do we begin?', a: 'Send us an enquiry with your date and venue. We will set up a call to get to know you, your families and the story you want to tell.' },
];

export const gram = [
  u('1511285560929-80b456fea0bc', 700),
  u('1617627143750-d86bc21e42bb', 700),
  u('1529636798458-92182e662485', 700),
  u('1525258946800-98cfd641d0de', 700),
  u('1546032996-6dfacbacbf3f', 700),
  u('1469371670807-013ccf25f16a', 700),
  u('1550005809-91ad75fb315f', 700),
  u('1513278974582-3e1b4a4fa21e', 700),
  u('1595407753234-0882f1e77954', 700),
  u('1519225421980-715cb0215aed', 700),
];

export const contactImg = u('1546032996-6dfacbacbf3f', 1600);
