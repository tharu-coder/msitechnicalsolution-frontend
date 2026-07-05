import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../css/Newsarticle.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURED = {
  id: "feat-01",
  badge: "Featured",
  tag: "Company News",
  date: "June 2025",
  read: "6 min read",
  title: "M.S. International Expands Canny Elevator Distribution Across Nepal's High-Rise Corridor",
  excerpt:
    "As Nepal's urban skyline transforms with landmark towers rising in Kathmandu, Pokhara, and Butwal, M.S. International Technical Solution Pvt. Ltd. strengthens its commitment to delivering world-class vertical transportation through its exclusive Canny Elevator partnership.",
  author: { initials: "MS", name: "M.S. International", role: "Editorial Team" },
  img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  alt: "Modern high-rise tower with elevator shafts visible in Kathmandu skyline",
};
const GRID_ARTICLES = [
  {
    id: 'art-01',
    cat: 'Industry',
    date: 'May 2025',
    read: '4 min',
    title: 'Canny Elevator Ranked Top 10 Global Manufacturer for 8th Consecutive Year',
    excerpt: 'Canny Elevator secured the 9th position globally in 2024, reinforcing its position as one of the world\'s most trusted vertical transportation manufacturers.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    alt: 'Canny elevator interior showing premium cabin design',
  },
  {
    id: 'art-02',
    cat: 'Innovation',
    date: 'April 2025',
    read: '5 min',
    title: 'IoT-Enabled Smart Elevators: The Future is Already Here',
    excerpt: 'AI-powered predictive maintenance and IoT integration are revolutionizing how buildings manage vertical transport — and Canny leads this technological shift.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    alt: 'Smart building technology control panel with digital display',
  },
  {
    id: 'art-03',
    cat: 'Projects',
    date: 'March 2025',
    read: '3 min',
    title: 'World\'s First Mountain Tunnel Escalator at Zhangjiajie Tianmen',
    excerpt: 'Canny completed the world\'s first mountain tunnel escalator project at 1,300m altitude — a landmark achievement showcasing its unmatched engineering capability.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    alt: 'Mountain escalator winding through a scenic tunnel landscape',
  },
  {
    id: 'art-04',
    cat: 'Market',
    date: 'February 2025',
    read: '7 min',
    title: 'Nepal\'s Construction Boom Creates Unprecedented Demand for Elevators',
    excerpt: 'With the Kathmandu Valley witnessing a surge in commercial and residential high-rise projects, demand for certified elevator solutions has reached an all-time high.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    alt: 'Construction cranes against Kathmandu urban skyline at sunset',
  },
];

const TRENDING = [
  { id: 't1', cat: 'Safety', title: 'Nepal Elevator Safety Standards Updated — What Building Owners Must Know', date: 'May 2025' },
  { id: 't2', cat: 'Technology', title: 'Energy-Efficient Traction Elevators Cut Building Power Usage by 35%', date: 'April 2025' },
  { id: 't3', cat: 'Company', title: 'Canny Wins 305-Unit Beijing Rail Transit Contract for Metro Stations', date: 'March 2025' },
  { id: 't4', cat: 'Market', title: 'Asia-Pacific Elevator Market to Reach USD 52.15 Billion by 2030', date: 'Feb 2025' },
  { id: 't5', cat: 'Events', title: 'Canny Recognized at 22nd World Brand Summit — Brand Value Tops ¥17.5B', date: 'June 2025' },
];

const WIDE_ARTICLES = [
  {
    col: 'Latest Dispatches',
    items: [
      { cat: 'Maintenance', title: 'Predictive AI: Catching Elevator Faults Before They Happen', date: 'June 2025', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80', alt: 'AI maintenance dashboard' },
      { cat: 'Safety', title: 'Annual Inspection Protocols Every Building Manager Should Follow', date: 'May 2025', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80', alt: 'Safety inspection checklist' },
      { cat: 'Products', title: 'Canny KLK1 Gold Swallow — Luxury Cabin for Premium Hotels', date: 'April 2025', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80', alt: 'Luxury hotel elevator interior' },
    ],
  },
  {
    col: 'Technical Insights',
    items: [
      { cat: 'Engineering', title: 'Traction vs Hydraulic: Choosing the Right Drive System for Your Building', date: 'May 2025', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&q=80', alt: 'Elevator machinery room' },
      { cat: 'Design', title: 'Cabin Aesthetics That Complement Contemporary Nepali Architecture', date: 'April 2025', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&q=80', alt: 'Modern building interior lobby' },
      { cat: 'Standards', title: 'EN 81-20 Compliance: What International Safety Standards Mean for Nepal', date: 'March 2025', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&q=80', alt: 'International standards documentation' },
    ],
  },
  {
    col: 'Nepal Market',
    items: [
      { cat: 'Infrastructure', title: 'Kathmandu Metro Rail Project and the Vertical Transport Opportunity', date: 'June 2025', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&q=80', alt: 'City metro infrastructure' },
      { cat: 'Business', title: 'How M.S. International Provides After-Sales Service Across Nepal', date: 'May 2025', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80', alt: 'Professional service team' },
      { cat: 'Development', title: 'High-Rise Housing Complexes Fuel Elevator Sales in Butwal and Pokhara', date: 'March 2025', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80', alt: 'High-rise apartments building' },
    ],
  },
];

const TIMELINE_EVENTS = [
  { type: 'red', date: 'March 2010', title: 'Canny Listed on Shenzhen Stock Exchange', body: 'Canny became China\'s first listed elevator enterprise (Stock Code: 002367), marking a milestone in the industry.', },
  { type: 'blue', date: '1997', title: 'Canny Elevator Founded in Suzhou', body: 'Established in Fenhu High-Tech Development Park, Suzhou, Canny began its journey to become a vertically integrated global elevator powerhouse.', },
  { type: 'red', date: '2017–2024', title: 'Top 10 Global Manufacturer — 8 Consecutive Years', body: 'Canny ranked among the Top 10 Global Elevator Manufacturers for 8 unbroken years, securing 9th globally in 2024.', },
  { type: 'blue', date: 'June 2025', title: 'World Brand Summit — ¥17.565B Brand Value', body: 'Recognized at the 22nd World Brand Summit as the most valuable brand in China\'s elevator industry.', },
  { type: 'red', date: 'Present', title: 'M.S. International Brings Canny to Nepal', body: 'As exclusive distributor, M.S. International Technical Solution Pvt. Ltd. connects Nepal\'s growing construction sector with Canny\'s world-class vertical transport solutions.', },
];

const MARKET_DATA = [
  { label: 'Global Elevator Market 2024', value: '$79.06B', change: '+6.7% CAGR', period: 'to 2030' },
  { label: 'China Market Valuation 2024', value: '$34.87B', change: '+6.78% CAGR', period: 'forecast to 2030' },
  { label: "Canny Brand Value", value: '¥17.57B', change: 'Most Valuable', period: 'Chinese elevator brand' },
  { label: 'Market Size by 2030', value: '$116B+', change: '+USD 37B Growth', period: 'global projection', neg: false },
];

const TICKER_ITEMS = [
  'M.S. International — Exclusive Canny Elevator Distributor in Nepal',
  'Canny Ranked Top 10 Global Elevator Manufacturer 2024',
  'Elevator & Escalator Market Growing at 6.7% CAGR to 2030',
  'Smart IoT Elevators Now Available in Nepal',
  'Professional Installation & After-Sales Service Nationwide',
  'Global Market Value Projected to Exceed USD 116 Billion by 2030',
];

const PRODUCTS = [
  { icon: '🔝', name: 'High-Speed Elevators', desc: 'Up to 10 m/s — Ideal for towers' },
  { icon: '🏠', name: 'Residential Lifts', desc: 'Compact & silent home solutions' },
  { icon: '🏢', name: 'Commercial Escalators', desc: 'EN 81 certified, high-traffic' },
  { icon: '🚶', name: 'Moving Walkways', desc: 'Airports & transit hubs' },
];

const FILTERS = ['All', 'Company News', 'Industry', 'Innovation', 'Projects', 'Market', 'Technical'];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function NewsArticles() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const filterBarRef = useRef(null);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);
  const insightRef = useRef(null);
  const sidebarRef = useRef(null);
  const wideSectionRef = useRef(null);
  const tlRef = useRef(null);
  const marketRef = useRef(null);
  const ctaRef = useRef(null);


  const [activeFilter, setActiveFilter] = useState('All');
  const [articleCount] = useState(GRID_ARTICLES.length + 3);

  /* GSAP ENTRANCE ANIMATIONS */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero cinematic entrance */
      const heroTl = gsap.timeline({ delay: 0.1 });

      heroTl
        .from(heroContentRef.current.querySelector('.msnews__hero-eyebrow'), {
          opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
        })
        .from(heroContentRef.current.querySelector('.msnews__hero-title'), {
          opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        }, '-=0.3')
        .from(heroContentRef.current.querySelector('.msnews__hero-subtitle'), {
          opacity: 0, y: 24, duration: 0.6, ease: 'power2.out',
        }, '-=0.4')
        .from(heroContentRef.current.querySelector('.msnews__hero-divider'), {
          opacity: 0, scaleX: 0, duration: 0.5, ease: 'power2.out',
        }, '-=0.3')
        .from('.msnews__hero-watermark', {
          opacity: 0, scale: 1.1, duration: 1.2, ease: 'power2.out',
        }, '-=0.8');

      /* Filter bar */
      gsap.from(filterBarRef.current, {
        scrollTrigger: { trigger: filterBarRef.current, start: 'top 90%' },
        opacity: 0, y: 20, duration: 0.6,
      });

      /* Featured article */
      gsap.from(featuredRef.current, {
        scrollTrigger: { trigger: featuredRef.current, start: 'top 82%' },
        opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
      });

      /* Article grid cards stagger */
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.msnews__article-card');
        gsap.from(cards, {
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        });
      }

      /* Insight strip */
      gsap.from(insightRef.current, {
        scrollTrigger: { trigger: insightRef.current, start: 'top 85%' },
        opacity: 0, x: -30, duration: 0.7, ease: 'power2.out',
      });

      /* Sidebar widgets stagger */
      if (sidebarRef.current) {
        const widgets = sidebarRef.current.children;
        gsap.from(widgets, {
          scrollTrigger: { trigger: sidebarRef.current, start: 'top 75%' },
          opacity: 0, x: 30, stagger: 0.15, duration: 0.6, ease: 'power2.out',
        });
      }

      /* Wide section cards */
      if (wideSectionRef.current) {
        const listCards = wideSectionRef.current.querySelectorAll('.msnews__list-card');
        gsap.from(listCards, {
          scrollTrigger: { trigger: wideSectionRef.current, start: 'top 80%' },
          opacity: 0, y: 20, stagger: 0.08, duration: 0.55, ease: 'power2.out',
        });
      }

      /* Timeline items scroll reveal */
      if (tlRef.current) {
        const items = tlRef.current.querySelectorAll('.msnews__tl-item');
        items.forEach((item, i) => {
          gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
            opacity: 0, x: -30, duration: 0.6, delay: i * 0.05, ease: 'power2.out',
            onComplete: () => item.classList.add('revealed'),
          });
        });
      }

      /* Market strip cells */
      if (marketRef.current) {
        const cells = marketRef.current.querySelectorAll('.msnews__market-cell');
        gsap.from(cells, {
          scrollTrigger: { trigger: marketRef.current, start: 'top 82%' },
          opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        });
      }

      /* CTA section */
      if (ctaRef.current) {
        gsap.from(ctaRef.current.querySelector('.msnews__cta-inner'), {
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
          opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        });
      }

      /* Stat counter animation */
      const statCells = document.querySelectorAll('.msnews__stat-value');
      statCells.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.4)',
        });
      });

      /* Market values counter */
      const marketValues = document.querySelectorAll('.msnews__market-value');
      marketValues.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, y: 15, duration: 0.5, ease: 'power2.out',
        });
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="msnews__root" ref={rootRef} id="news-articles">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="msnews__hero" ref={heroRef} aria-label="News and Articles Hero">
        <div className="msnews__hero-bg-grid" aria-hidden="true" />
        <div className="msnews__hero-radial" aria-hidden="true" />
        <div className="msnews__hero-radial-red" aria-hidden="true" />
        <div className="msnews__hero-watermark" aria-hidden="true">NEWS</div>

        <div className="msnews__hero-content" ref={heroContentRef}>
          <div className="msnews__hero-eyebrow">
            <span className="msnews__hero-eyebrow-dot" />
            M.S. International Technical Solution Pvt. Ltd.
          </div>

          <h1 className="msnews__hero-title">
            News &amp; Industry
            <span className="msnews__hero-title-accent">Insights</span>
          </h1>

          <p className="msnews__hero-subtitle">
            Stay informed on the latest advancements in vertical transportation, company milestones, and Nepal's elevator industry landscape — powered by Canny's global expertise.
          </p>

          <div className="msnews__hero-divider" aria-hidden="true">
            <div className="msnews__hero-divider-line" />
            <div className="msnews__hero-divider-diamond" />
            <div className="msnews__hero-divider-line rev" />
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────── */}
      <div className="msnews__ticker" aria-label="News ticker">
        <div className="msnews__ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span className="msnews__ticker-item" key={i}>
              <span className="msnews__ticker-sep" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────── */}
      <div className="msnews__filter-bar" ref={filterBarRef} role="navigation" aria-label="Article categories">
        <div className="msnews__filter-tabs" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`msnews__filter-tab${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
              role="tab"
              aria-selected={activeFilter === f}
            >
              <span>{f}</span>
            </button>
          ))}
        </div>
        <div className="msnews__filter-count">
          Showing <strong>{articleCount}</strong> articles
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────── */}
      <div className="msnews__layout">

        {/* ── LEFT: CONTENT ──────────────────────────────────── */}
        <main className="msnews__featured-wrap">

          {/* Featured Article */}
          <div className="msnews__section-label" aria-label="Featured story">Featured Story</div>

          <article
            className="msnews__featured-card"
            ref={featuredRef}
            aria-labelledby="featured-title"
            tabIndex={0}
          >
            {/* Brackets */}
            <div className="msnews__bracket msnews__bracket--tl" aria-hidden="true" />
            <div className="msnews__bracket msnews__bracket--tr" aria-hidden="true" />
            <div className="msnews__bracket msnews__bracket--bl" aria-hidden="true" />
            <div className="msnews__bracket msnews__bracket--br" aria-hidden="true" />

            <div className="msnews__featured-img-wrap">
              <img
                className="msnews__featured-img"
                src={FEATURED.img}
                alt={FEATURED.alt}
                loading="eager"
              />
              <div className="msnews__featured-img-overlay" aria-hidden="true" />
              <span className="msnews__featured-badge">{FEATURED.badge}</span>
              <span className="msnews__featured-tag">{FEATURED.tag}</span>
            </div>

            <div className="msnews__featured-body">
              <div className="msnews__featured-meta">
                <span className="msnews__meta-date">{FEATURED.date}</span>
                <span className="msnews__meta-dot" aria-hidden="true">·</span>
                <span className="msnews__meta-read">{FEATURED.read}</span>
              </div>

              <h2 className="msnews__featured-title" id="featured-title">
                {FEATURED.title}
              </h2>

              <p className="msnews__featured-excerpt">{FEATURED.excerpt}</p>

              <div className="msnews__featured-footer">
                <div className="msnews__author-chip">
                  <div className="msnews__author-avatar" aria-hidden="true">
                    {FEATURED.author.initials}
                  </div>
                  <div className="msnews__author-info">
                    <span className="msnews__author-name">{FEATURED.author.name}</span>
                    <span className="msnews__author-title">{FEATURED.author.role}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="msnews__read-link"
                  aria-label={`Read full article: ${FEATURED.title}`}
                >
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </article>

          {/* Article Grid */}
          <div className="msnews__grid-section">
            <div className="msnews__section-label">Latest Articles</div>
            <div className="msnews__grid" ref={gridRef} role="list">
              {GRID_ARTICLES.map((art) => (
                <article
                  key={art.id}
                  className="msnews__article-card"
                  role="listitem"
                  tabIndex={0}
                  aria-labelledby={`title-${art.id}`}
                >
                  <div className="msnews__card-img-wrap">
                    <img
                      className="msnews__card-img"
                      src={art.img}
                      alt={art.alt}
                      loading="lazy"
                    />
                    <div className="msnews__card-img-overlay" aria-hidden="true" />
                    <span className="msnews__card-cat" aria-label={`Category: ${art.cat}`}>
                      {art.cat}
                    </span>
                  </div>
                  <div className="msnews__card-body">
                    <div className="msnews__card-meta">
                      <span className="msnews__card-date">{art.date}</span>
                      <span className="msnews__card-dot" aria-hidden="true" />
                      <span className="msnews__card-read">{art.read}</span>
                    </div>
                    <h3 className="msnews__card-title" id={`title-${art.id}`}>{art.title}</h3>
                    <p className="msnews__card-excerpt">{art.excerpt}</p>
                    <button
                      type="button"
                      className="msnews__card-link"
                    >
                      Read More
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Insight Strip */}
          <div className="msnews__insight-strip" ref={insightRef} aria-label="Industry insight quote">
            <div className="msnews__insight-inner">
              <div className="msnews__insight-label">Industry Insight</div>
              <blockquote className="msnews__insight-quote">
                "The Asia-Pacific region stands out as both the largest and fastest-growing market for elevators and escalators — Canny remains at the forefront of this unprecedented expansion."
              </blockquote>
              <div className="msnews__insight-source">
                — Global Elevator &amp; Escalator Industry Report 2026–2035
              </div>
            </div>
          </div>
        </main>

        {/* ── RIGHT: SIDEBAR ──────────────────────────────────── */}
        <aside className="msnews__sidebar" ref={sidebarRef} aria-label="Sidebar: stats, trending, newsletter, products">

          {/* Stats Widget */}
          <div className="msnews__stats-widget" role="region" aria-label="Industry statistics">
            <div className="msnews__widget-header">
              <div className="msnews__widget-header-icon" aria-hidden="true" />
              <span className="msnews__widget-title">Market at a Glance</span>
            </div>
            <div className="msnews__stats-grid">
              <div className="msnews__stat-cell">
                <div className="msnews__stat-value">$79<span className="msnews__stat-unit">B</span></div>
                <div className="msnews__stat-label">Global Market 2024</div>
              </div>
              <div className="msnews__stat-cell">
                <div className="msnews__stat-value">6.7<span className="msnews__stat-unit">%</span></div>
                <div className="msnews__stat-label">CAGR to 2030</div>
              </div>
              <div className="msnews__stat-cell">
                <div className="msnews__stat-value">#9</div>
                <div className="msnews__stat-label">Canny Global Rank</div>
              </div>
              <div className="msnews__stat-cell">
                <div className="msnews__stat-value">27<span className="msnews__stat-unit">yr</span></div>
                <div className="msnews__stat-label">Canny Founded</div>
              </div>
            </div>
          </div>

          {/* Trending Widget */}
          <div className="msnews__trending-widget" role="region" aria-label="Trending articles">
            <div className="msnews__widget-header">
              <div className="msnews__widget-header-icon" aria-hidden="true" />
              <span className="msnews__widget-title">Trending Now</span>
            </div>
            <ol className="msnews__trending-list">
              {TRENDING.map((t, i) => (
                <li key={t.id} className="msnews__trending-item" tabIndex={0}>
                  <span className="msnews__trending-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="msnews__trending-info">
                    <div className="msnews__trending-cat">{t.cat}</div>
                    <div className="msnews__trending-title">{t.title}</div>
                    <div className="msnews__trending-date">{t.date}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Newsletter Widget */}
          <div className="msnews__newsletter-widget" role="complementary" aria-label="Newsletter signup">
            <div className="msnews__nl-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="5" width="18" height="13" rx="1" stroke="#e31c23" strokeWidth="1.5" />
                <path d="M2 8l9 6 9-6" stroke="#e31c23" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="msnews__nl-heading">Stay in the Loop</h3>
            <p className="msnews__nl-sub">
              Receive the latest Canny product launches, Nepal elevator industry updates, and M.S. International news directly in your inbox.
            </p>
            <div className="msnews__nl-input-row">
              <input
                type="email"
                className="msnews__nl-input"
                placeholder="Your email address"
                aria-label="Email address for newsletter"
              />
              <button className="msnews__nl-btn" type="button">
                Subscribe
              </button>
            </div>
          </div>

          {/* Products Widget */}
          <div className="msnews__promo-widget" role="complementary" aria-label="Canny product categories">
            <div className="msnews__widget-header">
              <div className="msnews__widget-header-icon" aria-hidden="true" />
              <span className="msnews__widget-title">Canny Products</span>
            </div>
            <ul className="msnews__promo-list">
              {PRODUCTS.map((p, i) => (
                <li key={i} className="msnews__promo-item" tabIndex={0} aria-label={p.name}>
                  <div className="msnews__promo-icon" aria-hidden="true">{p.icon}</div>
                  <div className="msnews__promo-text">
                    <div className="msnews__promo-name">{p.name}</div>
                    <div className="msnews__promo-desc">{p.desc}</div>
                  </div>
                  <span className="msnews__promo-arrow" aria-hidden="true">›</span>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </div>

      {/* ── WIDE ARTICLES SECTION ────────────────────────────── */}
      <section
        className="msnews__wide-section"
        ref={wideSectionRef}
        aria-label="More articles by category"
      >
        <div className="msnews__wide-section-inner">
          <div className="msnews__wide-header">
            <h2 className="msnews__wide-title">
              More <span>Insights</span>
            </h2>
          <button
  type="button"
  className="msnews__view-all"
>
              View All Articles
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="msnews__wide-row">
            {WIDE_ARTICLES.map((col, ci) => (
              <div key={ci} role="region" aria-label={col.col}>
                <div className="msnews__section-label">{col.col}</div>
                {col.items.map((item, ii) => (
                  <article
                    key={ii}
                    className="msnews__list-card"
                    tabIndex={0}
                    aria-label={item.title}
                  >
                    <div className="msnews__list-card-img">
                      <img src={item.img} alt={item.alt} loading="lazy" />
                    </div>
                    <div className="msnews__list-card-info">
                      <div className="msnews__list-card-cat">{item.cat}</div>
                      <div className="msnews__list-card-title">{item.title}</div>
                      <div className="msnews__list-card-date">{item.date}</div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET DATA STRIP ────────────────────────────────── */}
      <section
        className="msnews__market-strip"
        ref={marketRef}
        aria-label="Elevator market data"
      >
        <div className="msnews__market-inner">
          {MARKET_DATA.map((d, i) => (
            <div key={i} className="msnews__market-cell">
              <div className="msnews__market-label">{d.label}</div>
              <div className="msnews__market-value">{d.value}</div>
              <div className={`msnews__market-change${d.neg ? ' neg' : ''}`}>{d.change}</div>
              <div className="msnews__market-period">{d.period}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section
        className="msnews__timeline-section"
        ref={tlRef}
        aria-label="Canny Elevator company milestones"
      >
        <div className="msnews__timeline-section-inner">
          <div className="msnews__timeline-heading">
            <div className="msnews__section-label" style={{ justifyContent: 'center', display: 'flex' }}>
              Our Story
            </div>
            <h2>Milestones That Define Excellence</h2>
          </div>

          <ol className="msnews__timeline">
            {TIMELINE_EVENTS.map((ev, i) => (
              <li key={i} className="msnews__tl-item" aria-label={`${ev.date}: ${ev.title}`}>
                <div className={`msnews__tl-dot${ev.type === 'blue' ? ' blue' : ''}`} aria-hidden="true" />
                <div className={`msnews__tl-date${ev.type === 'blue' ? ' blue-date' : ''}`}
                  style={{ color: ev.type === 'blue' ? 'var(--msnews-blue-glow)' : 'var(--msnews-red)' }}>
                  {ev.date}
                </div>
                <h3 className="msnews__tl-title">{ev.title}</h3>
                <p className="msnews__tl-body">{ev.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        className="msnews__cta-section"
        ref={ctaRef}
        aria-label="Contact and project consultation"
      >
        <div className="msnews__cta-bg-text" aria-hidden="true">ELEVATE</div>
        <div className="msnews__cta-inner">
          <div className="msnews__hero-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            <span className="msnews__hero-eyebrow-dot" />
            Get in Touch
          </div>
          <h2 className="msnews__cta-title">Ready to Elevate Your Project?</h2>
          <p className="msnews__cta-sub">
            From consultation to installation and lifetime maintenance — M.S. International delivers Canny's world-class vertical transport solutions to every corner of Nepal.
          </p>
          <div className="msnews__cta-btns">
            <button className="msnews__cta-btn-primary" type="button">
              Request a Quote
            </button>
            <button className="msnews__cta-btn-secondary" type="button">
              View Products
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}