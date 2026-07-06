import "../css/product.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import passengerLift from "../assets/passenger.png";
import hospitalLift  from "../assets/hospital.png";
import homeLift      from "../assets/home.png";
import cargoLift     from "../assets/cargo.jpg";
import capsule       from "../assets/capsule.png";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "Passenger Lift",
    category: "Commercial",
    desc: "High-performance vertical transport engineered for commercial buildings, hotels, and modern complexes. Smooth, near-silent operation with advanced multi-door safety interlocking.",
    specs: ["Load: 630–2000 kg", "Speed: up to 2.5 m/s", "MRL Available"],
    img: passengerLift,
  },
  {
    title: "Hospital Lift",
    category: "Healthcare",
    desc: "Precision-engineered for medical environments — ultra-smooth ride control, stretcher-compatible dimensions, floor-leveling accuracy ±2 mm, and emergency power backup.",
    specs: ["Load: up to 2500 kg", "Floor Accuracy ±2mm", "Emergency Power"],
    img: hospitalLift,
  },
  {
    title: "Home Lift",
    category: "Residential",
    desc: "Compact luxury elevator crafted for villas and private residences. Space-saving shaft design, whisper-quiet motor, and a fully bespoke interior — your home, elevated.",
    specs: ["2–4 Stops", "300–400 kg", "Bespoke Cabins"],
    img: homeLift,
  },
  {
    title: "Cargo Lift",
    category: "Industrial",
    desc: "Heavy-duty industrial lifting system built for warehouses, factories, and logistics hubs. Maximum load capacity with continuous-duty motors and reinforced cab construction.",
    specs: ["Load: up to 5000 kg", "Industrial Grade", "24/7 Duty Cycle"],
    img: cargoLift,
  },
  {
    title: "Capsule Lift",
    category: "Panoramic",
    desc: "Architectural statement piece — glass-enclosed panoramic cabin that transforms vertical transit into a visual experience. The centrepiece of malls, hotels, and landmark buildings.",
    specs: ["360° Glass Cabin", "LED Ambient Lighting", "Custom Frame Finish"],
    img: capsule,
  },
];

export default function Products() {
  const panelsRef = useRef([]);
  const heroRef   = useRef(null);

  const goContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "#contact";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO ENTRANCE ─────────────────────────── */
      const heroTl = gsap.timeline({ delay: 0.15 });

      heroTl
        .fromTo(".prd-hero-eyebrow",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        )
        .fromTo(".prd-hero-h1",
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "power4.out" },
          "-=0.3"
        )
        .fromTo(".prd-hero-sub",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(".prd-hero-divider",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.4"
        )
        .fromTo(".prd-hero-meta-left",
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(".prd-hero-meta-right",
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
          "<"
        )
        .fromTo(".prd-hero-scroll",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );

      /* ── PRODUCT PANELS ────────────────────────── */
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const isEven = i % 2 === 0;

        // All elements start hidden; reset any inline styles first
        const els = {
          num:    panel.querySelector(".prd-panel-num"),
          tag:    panel.querySelector(".prd-cat-tag"),
          line:   panel.querySelector(".prd-deco-line"),
          title:  panel.querySelector(".prd-product-title"),
          desc:   panel.querySelector(".prd-product-desc"),
          chips:  panel.querySelectorAll(".prd-spec-chip"),
          btn:    panel.querySelector(".prd-enquire-btn"),
          imgWrap:panel.querySelector(".prd-img-wrap"),
          glassTop: panel.querySelector(".prd-glass-top"),
          glassBtm: panel.querySelector(".prd-glass-bottom"),
        };

        // Set initial hidden state immediately (no flash)
        gsap.set([els.num, els.tag, els.title, els.desc, els.chips, els.btn], { opacity: 0, y: 20 });
        gsap.set(els.imgWrap, { opacity: 0 });
        gsap.set(els.line, { scaleX: 0 });
        if (els.glassTop)  gsap.set(els.glassTop,  { opacity: 0, y: -16 });
        if (els.glassBtm)  gsap.set(els.glassBtm,  { opacity: 0, y:  16 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            // ─── KEY FIX: end at +=35% so the whole animation
            //     completes within ONE normal scroll gesture ───
            end: "+=35%",
            scrub: 0.15,
            pin: true,
            pinSpacing: true,
          },
        });

        // 0.0 – red line sweeps
        tl.to(els.line,  { scaleX: 1, duration: 0.25, ease: "power2.inOut" }, 0);

        // 0.05 – num + tag
        tl.to(els.num,   { opacity: 1, y: 0, duration: 0.2 }, 0.05);
        tl.to(els.tag,   { opacity: 1, x: 0, duration: 0.2 }, 0.08);

        // 0.12 – big title
        tl.fromTo(els.title,
          { opacity: 0, y: 40, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.35, ease: "power3.out" },
          0.12
        );

        // 0.25 – description
        tl.to(els.desc,  { opacity: 1, y: 0, duration: 0.28 }, 0.25);

        // 0.35 – chips stagger
        tl.to(els.chips, { opacity: 1, y: 0, stagger: 0.04, duration: 0.2 }, 0.35);

        // 0.44 – button
        tl.to(els.btn,   { opacity: 1, y: 0, duration: 0.2 }, 0.44);

        // 0.10 – image slides in from opposite side
        tl.fromTo(els.imgWrap,
          { opacity: 0, x: isEven ? 70 : -70, scale: 0.92 },
          { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "power3.out" },
          0.10
        );

        // glass accents
        if (els.glassTop)  tl.to(els.glassTop,  { opacity: 1, y: 0, duration: 0.3 }, 0.22);
        if (els.glassBtm)  tl.to(els.glassBtm,  { opacity: 1, y: 0, duration: 0.3 }, 0.28);
      });

      /* ── OUTRO ENTRANCE ────────────────────────── */
      gsap.from(".prd-outro-heading", {
        opacity: 0, y: 50, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".prd-outro", start: "top 75%" },
      });
      gsap.from(".prd-outro-sub", {
        opacity: 0, y: 30, duration: 0.7, delay: 0.15,
        scrollTrigger: { trigger: ".prd-outro", start: "top 70%" },
      });
      gsap.from(".prd-outro-btn", {
        opacity: 0, y: 24, duration: 0.6, delay: 0.3,
        scrollTrigger: { trigger: ".prd-outro", start: "top 68%" },
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="product" className="prd-page" ref={heroRef}>

      {/* ══════════════════ HERO ══════════════════ */}
      <div className="prd-hero">
        <div className="prd-hero-noise" />
        <div className="prd-hero-grid" />

        <div className="prd-hero-inner">
          <span className="prd-hero-eyebrow">Canny Certified · Nepal</span>

          <h1 className="prd-hero-h1">
            Our <em>Products</em>
          </h1>

          <p className="prd-hero-sub">
            Engineering excellence in vertical transportation —<br />
            five product lines built for safety, longevity, and refinement.
          </p>

          <div className="prd-hero-divider" />

          <div className="prd-hero-meta">
            <div className="prd-hero-meta-left">
              <span className="prd-meta-num">05</span>
              <span className="prd-meta-label">Product Lines</span>
            </div>
            <div className="prd-hero-meta-sep" />
            <div className="prd-hero-meta-right">
              <span className="prd-meta-num">10+</span>
              <span className="prd-meta-label">Years Engineering</span>
            </div>
          </div>

          <div className="prd-hero-scroll" onClick={() => {
            const first = document.querySelector(".prd-panel");
            if (first) first.scrollIntoView({ behavior: "smooth" });
          }}>
            <span className="prd-scroll-label">Scroll to explore</span>
            <div className="prd-scroll-track">
              <div className="prd-scroll-thumb" />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════ PANELS ══════════════════ */}
      {products.map((item, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            className={`prd-panel ${isEven ? "prd-panel--even" : "prd-panel--dark"}`}
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
          >
            {/* large watermark number */}
            <div className="prd-wm-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className={`prd-panel-inner ${isEven ? "prd-panel-inner--ltr" : "prd-panel-inner--rtl"}`}>

              {/* ── TEXT SIDE ── */}
              <div className="prd-text-side">
                <div className="prd-panel-meta">
                  <span className="prd-panel-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="prd-cat-tag">{item.category}</span>
                </div>

                <div className="prd-deco-line" />

                <h2 className="prd-product-title">{item.title}</h2>
                <p className="prd-product-desc">{item.desc}</p>

                <div className="prd-specs-row">
                  {item.specs.map((s, j) => (
                    <span className="prd-spec-chip" key={j}>{s}</span>
                  ))}
                </div>

                <button className="prd-enquire-btn" onClick={goContact}>
                  Enquire Now <span className="prd-btn-arrow">→</span>
                </button>
              </div>

              {/* ── IMAGE SIDE ── */}
              <div className="prd-img-side">
                {/* Glass accents — positioned around the card */}
                <div className="prd-glass-top" />
                <div className="prd-glass-bottom" />

                <div className="prd-img-wrap">
                  {/* outer glass border ring */}
                  <div className="prd-glass-ring" />
                  {/* inner shimmer line */}
                  <div className="prd-glass-shimmer" />

                  <img src={item.img} alt={item.title} className="prd-img" />

                  {/* corner tag */}
                  <div className="prd-img-corner-tag">
                    <span>{item.category}</span>
                  </div>

                  {/* bottom info strip */}
                  <div className="prd-img-strip">
                    <span className="prd-img-strip-title">{item.title}</span>
                    <span className="prd-img-strip-num">{String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* progress footer */}
            <div className="prd-panel-footer">
              <div className="prd-progress-track">
                {products.map((_, j) => (
                  <span
                    key={j}
                    className={`prd-prog-seg ${j === i ? "prd-prog-seg--active" : j < i ? "prd-prog-seg--done" : ""}`}
                  />
                ))}
              </div>
              <span className="prd-panel-footer-label">{i + 1} / {products.length}</span>
            </div>
          </section>
        );
      })}

      {/* ══════════════════ OUTRO ══════════════════ */}
      <div className="prd-outro">
        <div className="prd-outro-grid" />
        <div className="prd-outro-inner">
          <span className="prd-outro-eyebrow">Custom Solutions</span>
          <h2 className="prd-outro-heading">
            Need something <em>bespoke?</em>
          </h2>
          <p className="prd-outro-sub">
            We engineer custom lift solutions for unique architectural and
            industrial requirements. Talk to our team — free site assessment
            within 48 hours.
          </p>
          <button className="prd-outro-btn" onClick={goContact}>
            Request a Custom Solution <span>→</span>
          </button>
        </div>
      </div>

    </div>
  );
}