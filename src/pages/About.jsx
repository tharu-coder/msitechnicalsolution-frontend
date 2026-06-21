import "../css/about.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── DATA ───────────────────────────────────────── */
const stats = [
  { value: "10+",  label: "Years of Excellence" },
  { value: "600+", label: "Installations Completed" },
  { value: "24/7", label: "Technical Support" },
  { value: "99%",  label: "Client Satisfaction" },
];

const services = [
  { icon: "⬆", title: "Installation",       desc: "Precision-engineered elevator & escalator installations across Nepal — residential, commercial, and industrial." },
  { icon: "⚙", title: "Modernization",      desc: "Upgrading legacy systems with smart technology for enhanced safety, energy efficiency, and performance." },
  { icon: "🛡", title: "Maintenance",        desc: "Scheduled preventive care and rapid-response servicing ensuring zero downtime for your business." },
  { icon: "📡", title: "Remote Monitoring",  desc: "Real-time diagnostics and IoT-enabled monitoring to detect issues before they become problems." },
  { icon: "🔧", title: "Emergency Repairs",  desc: "Round-the-clock emergency response teams ready to restore operations within hours." },
  { icon: "📋", title: "Consultation",       desc: "Expert guidance from site survey to project completion — we architect the right solution for you." },
];

const values = [
  { icon: "🛡", label: "Safety First",     detail: "Every installation meets international ISO and EN81 safety standards — no compromises, ever." },
  { icon: "💡", label: "Innovation",        detail: "We deploy the latest vertical transport technology from global leaders, keeping Nepal ahead of the curve." },
  { icon: "🤝", label: "Integrity",         detail: "Transparent pricing, honest timelines, and zero hidden costs — our word is our contract." },
  { icon: "🌏", label: "Nationwide Reach",  detail: "Service teams deployed across all major cities and all seven provinces of Nepal." },
  { icon: "⚡", label: "Rapid Response",    detail: "Our 24/7 emergency teams are on-site within hours, because downtime is never an option for our clients." },
  { icon: "🏆", label: "Proven Excellence", detail: "Over 600 successful projects — from boutique hotels to hospital towers — stand as our portfolio." },
];

/* ── ELEVATOR SHAFT SVG ─────────────────────────── */
function ElevatorShaftSVG() {
  return (
    <svg
      className="ch-shaft-svg"
      viewBox="0 0 320 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shaftFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0b2561" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#04060e" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="cabinFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1a2e5c" />
          <stop offset="100%" stopColor="#0f1d3d" />
        </linearGradient>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#d91f26" stopOpacity="0" />
          <stop offset="50%"  stopColor="#d91f26" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d91f26" stopOpacity="0" />
        </linearGradient>
        <clipPath id="shaftClip">
          <rect x="110" y="40" width="100" height="450" />
        </clipPath>
      </defs>

      {/* Outer building silhouette */}
      <rect x="60" y="20" width="200" height="520" rx="2"
            fill="url(#shaftFill)"
            stroke="rgba(45,107,228,0.18)" strokeWidth="1" />

      {/* Floor separators */}
      {[98,168,238,308,378,448].map((y, i) => (
        <line key={i} x1="60" y1={y} x2="260" y2={y}
              stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
      ))}

      {/* Floor labels */}
      {[{label:"B1",y:83},{label:"G",y:153},{label:"01",y:223},{label:"02",y:293},{label:"03",y:363},{label:"04",y:433}].map(({label,y}) => (
        <g key={label}>
          <text x="85" y={y} textAnchor="middle"
                fontFamily="'Cinzel', serif"
                fontSize="10" fontWeight="600" letterSpacing="1"
                fill="rgba(200,212,238,0.35)">{label}</text>
          <line x1="94" y1={y-3} x2="108" y2={y-3}
                stroke="rgba(200,212,238,0.12)" strokeWidth="0.7" />
        </g>
      ))}

      {/* Inner shaft track */}
      <rect x="110" y="40" width="100" height="450" rx="1"
            fill="rgba(4,6,14,0.6)"
            stroke="rgba(45,107,228,0.35)" strokeWidth="1.2" />

      {/* Rail lines */}
      <line x1="121" y1="40" x2="121" y2="490" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      <line x1="199" y1="40" x2="199" y2="490" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />

      {/* Scan beam */}
      <rect x="110" y="0" width="100" height="10"
            fill="url(#beamGrad)"
            className="scan-beam"
            clipPath="url(#shaftClip)" />

      {/* Cables */}
      <line x1="150" y1="40" x2="150" y2="310" stroke="rgba(200,212,238,0.25)" strokeWidth="1.2" className="cable-line" />
      <line x1="160" y1="40" x2="160" y2="310" stroke="rgba(200,212,238,0.15)" strokeWidth="0.7"  className="cable-line" />
      <line x1="170" y1="40" x2="170" y2="310" stroke="rgba(200,212,238,0.25)" strokeWidth="1.2" className="cable-line" />

      {/* Elevator Cabin */}
      <g className="cabin-group">
        <rect x="113" y="308" width="94" height="74" rx="1"
              fill="url(#cabinFill)"
              stroke="rgba(45,107,228,0.6)" strokeWidth="1.5" />
        <rect x="115" y="311" width="44" height="69" rx="0"
              fill="rgba(22,37,80,0.92)"
              stroke="rgba(45,107,228,0.3)" strokeWidth="0.7"
              className="door-left" />
        <rect x="161" y="311" width="44" height="69" rx="0"
              fill="rgba(22,37,80,0.92)"
              stroke="rgba(45,107,228,0.3)" strokeWidth="0.7"
              className="door-right" />
        <line x1="113" y1="316" x2="207" y2="316"
              stroke="rgba(45,107,228,0.7)" strokeWidth="1.2" />
        <rect x="143" y="311" width="34" height="14" rx="1" fill="rgba(0,0,0,0.7)" />
        <text x="160" y="321" textAnchor="middle"
              fontFamily="'Cinzel', serif"
              fontSize="9" fontWeight="700" letterSpacing="1"
              fill="#00e676">04</text>
        <rect x="191" y="334" width="14" height="34" rx="1" fill="rgba(10,18,40,0.9)" />
        <circle cx="198" cy="341" r="2.8" fill="rgba(217,31,38,0.8)" />
        <circle cx="198" cy="350" r="2.5" fill="rgba(45,107,228,0.7)" />
        <circle cx="198" cy="359" r="2.5" fill="rgba(255,255,255,0.2)" />
        <rect x="111" y="380" width="98" height="5" rx="1" fill="rgba(45,107,228,0.2)" />
        <rect x="120" y="320" width="70" height="2" rx="1" fill="rgba(240,248,255,0.07)" />
      </g>

      {/* Shaft bottom sill */}
      <rect x="110" y="487" width="100" height="6" rx="1" fill="rgba(217,31,38,0.2)" />

      {/* Floor call buttons */}
      <g className="floor-dots">
        {[98,168,238,308,378].map((y,i) => (
          <circle key={i} cx="248" cy={y-10} r="4" className="floor-dot"
                  fill="rgba(217,31,38,0.2)" />
        ))}
      </g>

      {/* Escalator sketch */}
      <g transform="translate(272, 120)" opacity="0.22">
        <rect x="0" y="0" width="42" height="340" rx="2"
              fill="none" stroke="rgba(200,212,238,0.4)" strokeWidth="0.7" />
        <line x1="0" y1="0" x2="42" y2="340" stroke="rgba(45,107,228,0.5)" strokeWidth="0.8" />
        <g className="step-group">
          {[0,40,80,120,160,200,240,280,320].map((offset,i) => (
            <g key={i} transform={`translate(${offset*0.124},${offset})`}>
              <line x1="0" y1="0"  x2="14" y2="0"  stroke="rgba(45,107,228,0.8)" strokeWidth="1" />
              <line x1="14" y1="0" x2="14" y2="-9" stroke="rgba(45,107,228,0.8)" strokeWidth="1" />
            </g>
          ))}
        </g>
        <line x1="2"  y1="-10" x2="40" y2="326" stroke="rgba(217,31,38,0.5)" strokeWidth="1.5" />
        <line x1="2"  y1="14"  x2="40" y2="350" stroke="rgba(217,31,38,0.3)" strokeWidth="1" />
      </g>

      {/* Tech line accents */}
      <line x1="60" y1="540" x2="260" y2="540" stroke="rgba(217,31,38,0.4)"  strokeWidth="1.5" />
      <line x1="60" y1="541" x2="160" y2="541" stroke="rgba(45,107,228,0.4)" strokeWidth="1" />

      {/* Floating data points */}
      <circle cx="40"  cy="150" r="2"   fill="rgba(217,31,38,0.5)" />
      <circle cx="280" cy="260" r="1.5" fill="rgba(45,107,228,0.6)" />
      <circle cx="30"  cy="350" r="1.5" fill="rgba(217,31,38,0.3)" />
    </svg>
  );
}

/* ── COMPONENT ──────────────────────────────────── */
export default function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO ─────────────────────────────────── */
      const tl = gsap.timeline({ delay: 0.15 });
      tl
        .from(".hero-brackets",  { opacity:0, scale:1.06, duration:1.2, ease:"power2.out" }, 0)
        .to(".hero-eyebrow",     { opacity:1, y:0, duration:0.8, ease:"power3.out" }, 0.2)
        .from(".hero-eyebrow",   { y:24 }, 0.2)
        .to(".hero-title .word", {
            opacity:1, y:0, stagger:0.07, duration:1,
            ease:"power4.out",
          }, "-=0.4")
        .from(".hero-title .word", { y:70, stagger:0.07 }, "<")
        .to(".hero-sub",         { opacity:1, y:0, duration:0.85, ease:"power2.out" }, "-=0.5")
        .from(".hero-sub",       { y:22 }, "<")
        .to(".hero-cta-group",   { opacity:1, y:0, duration:0.7, ease:"power2.out" }, "-=0.4")
        .from(".hero-cta-group", { y:20 }, "<")
        .to(".hero-right",       { opacity:1, x:0, duration:1.1, ease:"power3.out" }, "-=0.7")
        .from(".hero-right",     { x:50 }, "<")
        .to(".hero-badge-float", { opacity:1, duration:0.6 }, "-=0.4")
        .to(".hero-scroll-hint", { opacity:1, duration:0.6 }, "-=0.3");

      /* Scroll line shrinks as user scrolls */
      gsap.to(".scroll-line", {
        scaleY: 0,
        transformOrigin: "top center",
        scrollTrigger: { trigger: heroRef.current, start:"top top", end:"bottom top", scrub:true },
      });

      /* ── MARQUEE ──────────────────────────────── */
      gsap.to(".marquee-inner", {
        x: "-50%",
        duration: 22,
        ease: "none",
        repeat: -1,
      });

      /* ── SECTION LINES ──────────────────────────── */
      document.querySelectorAll(".section-line").forEach(el => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      /* ── STORY ────────────────────────────────── */
      gsap.to(".story-badge", {
        opacity:1, x:0,
        duration:0.7, ease:"power2.out",
        scrollTrigger: { trigger:".story-section", start:"top 75%" },
      });
      gsap.from(".story-badge", { x:-30 });

      gsap.to(".story-heading", {
        opacity:1, y:0,
        duration:1, ease:"power3.out",
        scrollTrigger: { trigger:".story-section", start:"top 72%" },
      });
      gsap.from(".story-heading", { y:50 });

      gsap.to(".story-body", {
        opacity:1, y:0,
        stagger:0.15, duration:0.9, ease:"power2.out",
        scrollTrigger: { trigger:".story-section", start:"top 68%" },
      });
      gsap.from(".story-body", { y:28 });

      gsap.to(".story-image-wrap", {
        opacity:1, x:0,
        duration:1.1, ease:"power3.out",
        scrollTrigger: { trigger:".story-section", start:"top 65%" },
      });
      gsap.from(".story-image-wrap", { x:55 });

      /* ── STATS ────────────────────────────────── */
      gsap.to(".stat-item", {
        opacity:1, y:0,
        stagger:0.14, duration:0.85, ease:"power3.out",
        scrollTrigger: { trigger:".stats-section", start:"top 78%" },
      });
      gsap.from(".stat-item", { y:45 });

      /* ── SERVICES ─────────────────────────────── */
      gsap.from(".section-header", {
        opacity:0, y:35, duration:0.9, ease:"power2.out",
        scrollTrigger: { trigger:".services-section", start:"top 78%" },
      });

      gsap.to(".service-card", {
        opacity:1, y:0,
        stagger:0.09, duration:0.8, ease:"power3.out",
        scrollTrigger: { trigger:".services-section", start:"top 72%" },
      });
      gsap.from(".service-card", { y:55 });

      /* ── VALUES ───────────────────────────────── */
      gsap.to(".values-left", {
        opacity:1, x:0,
        duration:1, ease:"power3.out",
        scrollTrigger: { trigger:".values-section", start:"top 72%" },
      });
      gsap.from(".values-left", { x:-45 });

      gsap.to(".value-row", {
        opacity:1, x:0,
        stagger:0.1, duration:0.75, ease:"power2.out",
        scrollTrigger: { trigger:".values-section", start:"top 70%" },
      });
      gsap.from(".value-row", { x:-35 });

      /* ── BRAND ────────────────────────────────── */
      gsap.to(".brand-inner", {
        opacity:1, scale:1,
        duration:1.1, ease:"power3.out",
        scrollTrigger: { trigger:".brand-section", start:"top 72%" },
      });
      gsap.from(".brand-inner", { scale:0.93 });

      /* ── CTA ──────────────────────────────────── */
      gsap.to(".cta-content", {
        opacity:1, y:0,
        duration:1.1, ease:"power3.out",
        scrollTrigger: { trigger:".cta-section", start:"top 72%" },
      });
      gsap.from(".cta-content", { y:55 });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page">

      {/* ══ HERO ══════════════════════════════════ */}
      <section className="about-hero" ref={heroRef}>
        <div className="hero-noise" />
        <div className="hero-grid-overlay" />
        <div className="hero-brackets" />

        {/* Left: text */}
        <div className="hero-left">
          <span className="hero-eyebrow">Est. 2014 · Kathmandu, Nepal</span>

          <h1 className="hero-title">
            {["Elevating", "Nepal's", "Future,", "Floor", "by", "Floor."].map((w, i) => (
              <span className="word" key={i}>{w}&nbsp;</span>
            ))}
          </h1>

          <p className="hero-sub">
            Nepal's most trusted elevator &amp; escalator solutions provider —
            blending precision engineering with unmatched nationwide service.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary">Explore Services</button>
            <button className="btn-ghost">Our Projects →</button>
          </div>
        </div>

        {/* Right: animated SVG */}
        <div className="hero-right">
          <ElevatorShaftSVG />
        </div>

        {/* Floating badge */}
        <div className="hero-badge-float">
          <span className="badge-num">600+</span>
          <span className="badge-label">Installs</span>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════ */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {[...Array(2)].map((_, i) =>
            ["Installation","Modernization","Maintenance","24/7 Support","Canny Elevators","ISO Certified","Nationwide"].map(
              (t, j) => (
                <span key={`${i}-${j}`} className="marquee-item">
                  {t} <span className="marquee-dot">◆</span>
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ══ STORY ═════════════════════════════════ */}
      <section className="story-section">
        <div className="story-left">
          <span className="story-badge">WHO WE ARE</span>
          <h2 className="story-heading">
            A Decade of<br />
            <em>Vertical Excellence</em>
          </h2>
          <p className="story-body">
            We are Nepal's leading vertical transportation company, specialising in the
            installation, modernization, maintenance, and emergency servicing of elevators
            and escalators. With over ten years of engineering expertise and a nationwide
            footprint, we deliver safety, reliability, and cutting-edge innovation on
            every project — from high-rise towers to heritage buildings.
          </p>
          <p className="story-body">
            As the exclusive Nepal representative of <strong>Canny Elevator &amp; Escalator</strong>,
            we bring world-class manufacturing backed by local knowledge and round-the-clock
            technical support.
          </p>
        </div>

        <div className="story-image-wrap">
          <div className="story-image-card">
            <div className="story-img-placeholder">
              <span className="img-icon">🏢</span>
              <p>Headquarters · Kathmandu</p>
            </div>
          </div>
          <div className="story-accent-box">
            <span>Trusted across</span>
            <strong>all 7 provinces</strong>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ══ STATS ════════════════════════════════ */}
      <section className="stats-section">
        <div className="stats-label">By the Numbers</div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="section-line" />

      {/* ══ SERVICES ══════════════════════════════ */}
      <section className="services-section">
        <div className="section-header">
          <span className="section-eyebrow">WHAT WE DO</span>
          <h2 className="section-title">Our <em>Services</em></h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-name">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <span className="card-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      <div className="section-line" />

      {/* ══ VALUES ════════════════════════════════ */}
      <section className="values-section">
        <div className="values-left">
          <span className="section-eyebrow">OUR PRINCIPLES</span>
          <h2 className="section-title">What Drives <em>Us</em></h2>
          <div className="values-left-num">06</div>
        </div>
        <div className="values-right">
          {values.map((v, i) => (
            <div className="value-row" key={i}>
              <span className="value-num">0{i + 1}</span>
              <span className="value-icon">{v.icon}</span>
              <div className="value-content">
                <h3 className="value-label">{v.label}</h3>
                <p className="value-detail">{v.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-line" />

      {/* ══ BRAND ═════════════════════════════════ */}
      <section className="brand-section">
        <div className="brand-inner">
          <span className="brand-eyebrow">OUR BRAND PARTNER</span>
          <h2 className="brand-title">Canny <em>Elevator</em> &amp; Escalator</h2>

          <div className="brand-rule">
            <span></span><i></i><span></span>
          </div>

          <p className="brand-body">
            As the sole authorised distributor of <strong>Canny</strong> products in Nepal,
            we offer world-class vertical transportation systems engineered in China and certified
            to European safety standards. From machine-room-less (MRL) traction elevators to
            high-capacity escalators, every unit is backed by a full warranty and
            genuine spare parts inventory.
          </p>

          <div className="brand-chips">
            {["MRL Elevators","Passenger Lifts","Cargo Elevators","Escalators","Moving Walks"].map((c,i) => (
              <span className="chip" key={i}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-bg-text" aria-hidden="true">ELEVATE</div>
        <div className="cta-content">
          <h2 className="cta-heading">
            Ready to <em>elevate</em><br />your project?
          </h2>
          <p className="cta-sub">
            Talk to our engineering team and get a free site assessment within 48 hours.
          </p>
          <button className="btn-primary btn-large">Get a Free Consultation</button>
        </div>
      </section>

    </div>
  );
}