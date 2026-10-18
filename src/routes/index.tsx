import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/oasislogo.png";
import hero from "@/assets/hero.mp4";
import grandLawn from "@/assets/grand-lawn.jpg";
import haldi from "@/assets/haldi.jpg";
import intimate from "@/assets/intimate.jpg";
import stay from "@/assets/stay.jpg";
import pool from "@/assets/pool.jpg";
import sangeet from "@/assets/sangeet.jpg";
import catering from "@/assets/catering.jpg";

// Keep the WhatsApp number in ONE place (country code, digits only, e.g. 919876543210)
const whatsappNumber = +917888011970;
const whatsappLink = `https://wa.me/${whatsappNumber}`;

const address = "Kanhal Village, Kiranapur Road, Hudkeshwar Khurd, Nagpur – 440034";
const mapQuery = encodeURIComponent("Oasis Celebrations, " + address);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oasis Celebrations — Premium Wedding Lawn & Resort in Nagpur" },
      { name: "description", content: "Celebrate Beautifully. Celebrate at Oasis. A premium wedding lawn & resort in Nagpur with grand lawns, stay and in-house catering." },
      { property: "og:title", content: "Oasis Celebrations — Wedding Lawn & Resort, Nagpur" },
      { property: "og:description", content: "Celebrate Beautifully. Celebrate at Oasis. A premium wedding lawn & resort in Nagpur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Spaces", "#spaces"],
  ["Celebrations", "#celebrations"],
  ["Stay", "#stay"],
  ["Gallery", "#gallery"],
  ["Visit Us", "#visit"],
];

const spaces = [
  { name: "Grand Wedding Lawn", size: "44,000 sq. ft.", img: grandLawn, text: "An expansive open lawn for grand weddings and receptions, with room for a majestic stage and a long entry pathway." },
  { name: "Dedicated Haldi Lawn", size: "33,000 sq. ft.", img: haldi, text: "A separate lawn devoted to Haldi and daytime ceremonies, so every ritual has its own space." },
  { name: "Intimate Celebration Lawn", size: "12,000 sq. ft.", img: intimate, text: "A softer, smaller setting for engagements, family functions and close-knit gatherings." },
];

const celebrations = [
  { name: "Weddings", img: grandLawn },
  // { name: "Receptions", img: hero },
  { name: "Engagements", img: intimate },
  { name: "Haldi Ceremonies", img: haldi },
  { name: "Sangeet", img: sangeet },
  { name: "Family Functions", img: catering },
  { name: "Special Celebrations", img: pool },
];

const features = [
  "Grand Stage", "150-ft Entry Pathway", "Elegant Seating", "Round Tables", "Sofas",
  "Welcome Board Stands", "Dedicated Photo Spaces", "Haldi Setup", "Sangeet Setup",
  "Spacious Lawns", "Parking", "Power Backup", "Security", "Professional Event Support",
];

const gallery = [grandLawn, haldi, sangeet, intimate, catering, stay, pool];

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.45A11.3 11.3 0 0 0 12.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.65L.62 23.25l5.66-1.48a11.3 11.3 0 0 0 5.76 1.47h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.31-8.01z" />
    </svg>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="oasis">
      {/* NAVBAR */}
      <header className={`nav ${scrolled || menuOpen ? "nav--solid" : ""}`}>
        <a href="#home" className="nav__brand">
          <img src={logo} alt="Oasis logo" />
          <span>OASIS CELEBRATIONS</span>
        </a>
        <nav className={`nav__links ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="nav__wa">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        </nav>
        <button className={`nav__burger ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span />
        </button>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <video src={hero}  className="hero__img" autoPlay muted loop />
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow">A Premium Wedding Lawn &amp; Resort in Nagpur</p>
          <h1>OASIS CELEBRATIONS</h1>
          <p className="hero__tagline">Celebrate Beautifully.<br /><em>Celebrate at Oasis.</em></p>
          <div className="hero__actions">
            <a href="#about" className="btn btn--light">Explore Oasis</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn--ghost">WhatsApp Us</a>
          </div>
        </div>
        <a href="#about" className="hero__scroll" aria-label="Scroll down"><span /></a>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about">
        <div className="about__img">
          <img src={grandLawn} alt="Grand wedding lawn with floral pathway" loading="lazy" width={1280} height={1600} />
        </div>
        <div className="about__text">
          <p className="eyebrow eyebrow--gold">About Oasis</p>
          <h2>A Place Made for Beautiful Celebrations</h2>
          <p>Oasis Celebrations is a premium wedding lawn and resort in Nagpur, created for weddings, receptions, engagements, Haldi, Sangeet, family functions and special celebrations.</p>
          <ul className="stats">
            <li><strong>44,000</strong><span>sq. ft. Grand Wedding Lawn</span></li>
            <li><strong>33,000</strong><span>sq. ft. Dedicated Haldi Lawn</span></li>
            <li><strong>12,000</strong><span>sq. ft. Intimate Celebration Lawn</span></li>
          </ul>
        </div>
      </section>

      {/* SPACES */}
      <section id="spaces" className="section spaces">
        <div className="section__head">
          <p className="eyebrow eyebrow--gold">The Spaces</p>
          <h2>Three Lawns, Each With Its Own Character</h2>
        </div>
        <div className="spaces__grid">
          {spaces.map((s, i) => (
            <article key={s.name} className="space">
              <div className="space__img"><img src={s.img} alt={s.name} loading="lazy" width={1280} height={1600} /></div>
              <span className="space__num">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p className="space__size">{s.size}</p>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CELEBRATIONS */}
      <section id="celebrations" className="section celebrations">
        <div className="section__head">
          <p className="eyebrow eyebrow--gold">Celebrations</p>
          <h2>Every Celebration Deserves Its Own Moment</h2>
        </div>
        <div className="celeb__grid">
          {celebrations.map((c) => (
            <div key={c.name} className="celeb">
              <img src={c.img} alt={c.name} loading="lazy" />
              <div className="celeb__label">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features">
        <div className="features__intro">
          <p className="eyebrow eyebrow--gold">Wedding Features</p>
          <h2>Everything in Place for Your Day</h2>
          <p>Thoughtfully prepared spaces and support, so your family can focus on the celebration.</p>
        </div>
        <ul className="features__list">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      {/* STAY */}
      <section id="stay" className="stay">
        <img src={stay} alt="Guest room at Oasis" loading="lazy" width={1920} height={1088} />
        <div className="stay__shade" />
        <div className="stay__content">
          <p className="eyebrow">Stay at Oasis</p>
          <h2>Stay. Celebrate. Relax.</h2>
          <ul className="stay__list">
            <li><strong>20</strong><span>Well-appointed rooms</span></li>
            <li><strong>2</strong><span>Spacious dormitories</span></li>
            <li><strong>2</strong><span>Bride &amp; Groom suites</span></li>
            <li><strong>80–100</strong><span>Guests accommodated (approx.)</span></li>
          </ul>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section experience">
        <div className="section__head">
          <p className="eyebrow eyebrow--gold">Experience Oasis</p>
          <h2>More Than a Venue</h2>
        </div>
        <div className="exp__grid">
          {[
            { t: "Swimming Pool", d: "An on-site swimming pool with scheduled pool access during your stay.", img: pool },
            { t: "In-House Catering", d: "In-house catering with menus planned for weddings and special occasions.", img: catering },
            { t: "Celebration Spaces", d: "Beautiful spaces designed for weddings, Haldi, Sangeet, receptions and family celebrations.", img: sangeet },
          ].map((e) => (
            <article key={e.t} className="exp">
              <img src={e.img} alt={e.t} loading="lazy" width={1280} height={1600} />
              <h3>{e.t}</h3>
              <p>{e.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section gallery">
        <div className="section__head">
          <p className="eyebrow eyebrow--gold">Gallery</p>
          <h2>Moments at Oasis</h2>
        </div>
        <div className="gallery__grid">
          {gallery.map((g, i) => (
            <button key={i} className={`gallery__item g${i}`} onClick={() => setLightbox(i)} aria-label="Open image">
              <img src={g} alt="Oasis venue" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" aria-label="Close">×</button>
          <button className="lightbox__nav lightbox__prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }}>‹</button>
          <img src={gallery[lightbox]} alt="Oasis venue" onClick={(e) => e.stopPropagation()} />
          <button className="lightbox__nav lightbox__next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }}>›</button>
        </div>
      )}

      {/* STORY */}
      <section className="story">
        <div className="story__img"><img src={intimate} alt="Candlelit celebration table" loading="lazy" /></div>
        <div className="story__text">
          <p className="script">our story</p>
          <h2>Where Celebrations Become Memories</h2>
          <p>Some evenings stay with a family forever — the first look, the laughter at the Haldi, the music of the Sangeet, the quiet moment before the vows. Oasis was created to hold these moments gently, in open lawns under a wide Nagpur sky.</p>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="section visit">
        <div className="visit__text">
          <p className="eyebrow eyebrow--gold">Visit Us</p>
          <h2>Find Your Way to Oasis</h2>
          <p className="visit__addr">{address}</p>
          <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="btn btn--dark">Get Directions</a>
        </div>
        <div className="visit__map">
          <iframe title="Oasis Celebrations map" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta">
        <img src={sangeet} alt="Evening celebration at Oasis" loading="lazy" />
        <div className="cta__shade" />
        <div className="cta__content">
          <h2>Your Celebration Starts Here.</h2>
          <p>Celebrate Beautifully. Celebrate at Oasis.</p>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn--light">Connect With Us</a>
        </div>
      </section>

      
{/* FOOTER */}
<footer className="footer">
  <img
    src={logo}
    alt="Oasis logo"
    className="footer__logo"
  />

  <h3>OASIS CELEBRATIONS</h3>

  <p className="footer__tag">
    Celebrate Beautifully. Celebrate at Oasis.
  </p>

  <p className="footer__addr">{address}</p>

  <nav className="footer__links">
    {navLinks.map(([label, href]) => (
      <a key={href} href={href}>
        {label}
      </a>
    ))}
  </nav>

  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="footer__wa"
    aria-label="WhatsApp"
  >
    <WhatsAppIcon />
  </a>

  <p className="footer__copy">
    © {new Date().getFullYear()} Oasis Celebrations
  </p>

  {/* DESIGNED & DEVELOPED BY GRAPION DIGITAL */}
  <p className="footer__credit">
    Designed &amp; Developed by{" "}
    <a
      href="https://www.grapiondigital.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Grapion Digital website"
    >
      <span className="footer__credit-grapion">
        Grapion
      </span>{" "}
      <span className="footer__credit-digital">
        Digital
      </span>
    </a>
  </p>
</footer>

{/* FLOATING WHATSAPP BUTTON */}
<a
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
  className="wa-float"
  aria-label="Chat on WhatsApp"
>
  <WhatsAppIcon size={28} />
</a>
</div>
);
}
