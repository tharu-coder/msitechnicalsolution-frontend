import "../css/contact.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================
   SHARED SVG ILLUSTRATION
   Large animated city / elevator scene.
   Used twice:
     1. Hero background (full width, very faint)
     2. Left panel background (partial, moderate opacity)
   ========================================================== */
function ElevatorCitySVG({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 620 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* ── Grid dots ── */}
      {[...Array(7)].map((_, r) =>
        [...Array(14)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={18 + c * 44} cy={16 + r * 54}
            r="1.5" fill="rgba(245,245,240,0.08)" />
        ))
      )}

      {/* ── Ground ── */}
      <line x1="0" y1="370" x2="620" y2="370"
        stroke="rgba(245,245,240,0.1)" strokeWidth="1" />

      {/* ==== BUILDING A — tall centre with working lift ==== */}
      <g className="cnt-svg-building">
        {/* body */}
        <rect x="220" y="70" width="120" height="300" fill="#0a1730"
          stroke="rgba(245,245,240,0.09)" strokeWidth="1" />
        {/* floor lines */}
        {[120,160,200,240,280,320].map((y,i) => (
          <line key={i} x1="220" y1={y} x2="340" y2={y}
            stroke="rgba(245,245,240,0.05)" strokeWidth="1" />
        ))}
        {/* windows left column */}
        {[80,122,162,202,242,282,322].map((y,i) => (
          <rect key={`wla${i}`} x="232" y={y} width="18" height="24" rx="1"
            fill={i%3===0 ? "rgba(232,21,27,0.35)" : "rgba(245,245,240,0.05)"}
            stroke="rgba(245,245,240,0.07)" strokeWidth="0.5" />
        ))}
        {/* windows right column */}
        {[80,122,162,202,242,282,322].map((y,i) => (
          <rect key={`wra${i}`} x="310" y={y} width="18" height="24" rx="1"
            fill={i%4===2 ? "rgba(232,21,27,0.25)" : "rgba(245,245,240,0.04)"}
            stroke="rgba(245,245,240,0.07)" strokeWidth="0.5" />
        ))}
        {/* roof accent */}
        <rect x="220" y="62" width="120" height="8" fill="#E8151B" opacity="0.8" />
        <rect x="268" y="48" width="24" height="14" fill="#E8151B" opacity="0.55" />

        {/* Lift shaft */}
        <rect x="264" y="72" width="32" height="298" fill="rgba(5,13,26,0.75)"
          stroke="rgba(245,245,240,0.1)" strokeWidth="1" />
        {/* Rail lines */}
        <line x1="266" y1="72" x2="266" y2="368"
          stroke="rgba(245,245,240,0.07)" strokeWidth="0.6" strokeDasharray="5 5" />
        <line x1="294" y1="72" x2="294" y2="368"
          stroke="rgba(245,245,240,0.07)" strokeWidth="0.6" strokeDasharray="5 5" />

        {/* ── Lift cabin ── */}
        <g className="cnt-svg-lift">
          <rect x="267" y="295" width="26" height="38" rx="1"
            fill="#122040" stroke="#E8151B" strokeWidth="1.5" />
          <line x1="280" y1="297" x2="280" y2="331"
            stroke="rgba(245,245,240,0.18)" strokeWidth="0.8" />
          <rect x="270" y="299" width="7" height="7" rx="0.5"
            fill="#E8151B" opacity="0.9" />
          {/* cabin shadow */}
          <rect x="267" y="332" width="26" height="3"
            fill="rgba(0,0,0,0.35)" />
        </g>
      </g>

      {/* ==== BUILDING B — right tall ==== */}
      <g className="cnt-svg-building" style={{animationDelay:"0.18s"}}>
        <rect x="380" y="120" width="90" height="250" fill="#0a1730"
          stroke="rgba(245,245,240,0.07)" strokeWidth="1" />
        {[140,170,200,230,260,290,320].map((y,i) => (
          <rect key={i} x="392" y={y} width="14" height="18" rx="1"
            fill={i%3===1 ? "rgba(232,21,27,0.2)" : "rgba(245,245,240,0.04)"}
            stroke="rgba(245,245,240,0.06)" strokeWidth="0.5" />
        ))}
        {[140,170,200,230,260,290,320].map((y,i) => (
          <rect key={i} x="456" y={y} width="14" height="18" rx="1"
            fill="rgba(245,245,240,0.03)"
            stroke="rgba(245,245,240,0.05)" strokeWidth="0.5" />
        ))}
        <rect x="380" y="112" width="90" height="8" fill="#E8151B" opacity="0.45" />
      </g>

      {/* ==== BUILDING C — left mid ==== */}
      <g className="cnt-svg-building" style={{animationDelay:"0.32s"}}>
        <rect x="110" y="150" width="80" height="220" fill="#0a1730"
          stroke="rgba(245,245,240,0.07)" strokeWidth="1" />
        {[160,190,220,250,280,310,340].map((y,i) => (
          <rect key={i} x="122" y={y} width="14" height="18" rx="1"
            fill={i%4===0 ? "rgba(232,21,27,0.18)" : "rgba(245,245,240,0.04)"}
            stroke="rgba(245,245,240,0.06)" strokeWidth="0.5" />
        ))}
        {[160,190,220,250,280,310,340].map((y,i) => (
          <rect key={i} x="162" y={y} width="14" height="18" rx="1"
            fill="rgba(245,245,240,0.03)"
            stroke="rgba(245,245,240,0.05)" strokeWidth="0.5" />
        ))}
        <rect x="110" y="142" width="80" height="8" fill="#E8151B" opacity="0.35" />
      </g>

      {/* ==== BUILDING D — far left short ==== */}
      <g className="cnt-svg-building" style={{animationDelay:"0.45s"}}>
        <rect x="30" y="220" width="60" height="150" fill="#0a1730"
          stroke="rgba(245,245,240,0.06)" strokeWidth="1" />
        {[230,258,286,316,344].map((y,i) => (
          <rect key={i} x="40" y={y} width="12" height="16" rx="1"
            fill="rgba(245,245,240,0.03)"
            stroke="rgba(245,245,240,0.05)" strokeWidth="0.5" />
        ))}
        <rect x="30" y="212" width="60" height="8" fill="#E8151B" opacity="0.25" />
      </g>

      {/* ==== BUILDING E — far right short ==== */}
      <g className="cnt-svg-building" style={{animationDelay:"0.5s"}}>
        <rect x="500" y="200" width="75" height="170" fill="#0a1730"
          stroke="rgba(245,245,240,0.06)" strokeWidth="1" />
        {[210,238,266,294,324,352].map((y,i) => (
          <rect key={i} x="512" y={y} width="12" height="16" rx="1"
            fill="rgba(245,245,240,0.03)"
            stroke="rgba(245,245,240,0.05)" strokeWidth="0.5" />
        ))}
        <rect x="500" y="192" width="75" height="8" fill="#E8151B" opacity="0.28" />
      </g>

      {/* ==== Signal rings from antenna ==== */}
      <circle cx="280" cy="44" r="10" className="cnt-svg-signal-1"
        fill="none" stroke="#E8151B" strokeWidth="1.5" />
      <circle cx="280" cy="44" r="20" className="cnt-svg-signal-2"
        fill="none" stroke="#E8151B" strokeWidth="1" opacity="0.5" />
      <circle cx="280" cy="44" r="32" className="cnt-svg-signal-3"
        fill="none" stroke="#E8151B" strokeWidth="0.8" opacity="0.22" />

      {/* Pulse ring */}
      <circle cx="280" cy="44" r="6" fill="#E8151B" className="cnt-svg-pulse" opacity="0" />

      {/* ==== Floating tech dots ==== */}
      <circle cx="70"  cy="120" r="6" fill="#E8151B" opacity="0.6" className="cnt-svg-dot-1" />
      <circle cx="480" cy="100" r="5" fill="#E8151B" opacity="0.5" className="cnt-svg-dot-2" />
      <circle cx="560" cy="170" r="4" fill="rgba(245,245,240,0.4)" className="cnt-svg-dot-3" />

      {/* Connecting dashed paths */}
      <path d="M75 120 Q160 90 200 80" className="cnt-svg-line"
        stroke="rgba(232,21,27,0.35)" strokeWidth="1" strokeDasharray="5 4" fill="none" />
      <path d="M476 100 Q440 85 370 82" className="cnt-svg-line"
        stroke="rgba(232,21,27,0.25)" strokeWidth="1" strokeDasharray="5 4" fill="none"
        style={{animationDelay:"1.4s"}} />

      {/* ==== Gear 1 — bottom left ==== */}
      <g className="cnt-svg-gear" style={{transformOrigin:"74px 342px"}}>
        <circle cx="74" cy="342" r="18" fill="none"
          stroke="rgba(245,245,240,0.1)" strokeWidth="2" />
        <circle cx="74" cy="342" r="7" fill="rgba(232,21,27,0.45)" />
        {[0,45,90,135,180,225,270,315].map((deg,i) => {
          const r = (deg * Math.PI) / 180;
          return <line key={i}
            x1={74+Math.cos(r)*13} y1={342+Math.sin(r)*13}
            x2={74+Math.cos(r)*19} y2={342+Math.sin(r)*19}
            stroke="rgba(245,245,240,0.18)" strokeWidth="3" />;
        })}
      </g>

      {/* ==== Gear 2 — bottom right ==== */}
      <g className="cnt-svg-gear2" style={{transformOrigin:"546px 356px"}}>
        <circle cx="546" cy="356" r="13" fill="none"
          stroke="rgba(245,245,240,0.08)" strokeWidth="1.5" />
        <circle cx="546" cy="356" r="5" fill="rgba(232,21,27,0.35)" />
        {[0,60,120,180,240,300].map((deg,i) => {
          const r = (deg * Math.PI) / 180;
          return <line key={i}
            x1={546+Math.cos(r)*9}  y1={356+Math.sin(r)*9}
            x2={546+Math.cos(r)*14} y2={356+Math.sin(r)*14}
            stroke="rgba(245,245,240,0.15)" strokeWidth="2.2" />;
        })}
      </g>

      {/* Badge label */}
      <rect x="380" y="76" width="110" height="28" fill="#E8151B" />
      <text x="388" y="95" fontFamily="'Bebas Neue',sans-serif" fontSize="16"
        fill="white" letterSpacing="2">SMART LIFTS</text>

      {/* Floor markers next to shaft */}
      {["6F","5F","4F","3F","2F","1F","GF"].map((f,i) => (
        <text key={f} x="302" y={96 + i*40}
          fontFamily="'DM Sans',sans-serif" fontSize="9"
          fill="rgba(245,245,240,0.28)">{f}</text>
      ))}
    </svg>
  );
}

/* ── Icon helpers ── */
const FbIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.931-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

/* ==========================================================
   COMPONENT
   ========================================================== */
export default function Contact() {
  const pageRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name:"", email:"", phone:"", service:"", message:""
  });

  const handleChange = e =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Hero */
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".cnt-hero-tag",  { opacity:0, y:24, duration:0.8 })
        .from(".cnt-hero h1",   { opacity:0, y:90, duration:1.1 }, "-=0.5")
        .from(".cnt-hero-sub",  { opacity:0, y:30, duration:0.8 }, "-=0.6")
        .from(".cnt-scroll-hint",{ opacity:0, duration:0.7 }, "-=0.3");

      /* Info cards */
      gsap.from(".cnt-info-item", {
        opacity:0, x:-50, duration:0.75, stagger:0.12, ease:"power3.out",
        scrollTrigger:{ trigger:".cnt-left", start:"top 80%" },
      });
      gsap.from(".cnt-social-row", {
        opacity:0, y:20, duration:0.65, ease:"power3.out",
        scrollTrigger:{ trigger:".cnt-social-row", start:"top 90%" },
      });

      /* Form */
      gsap.from(".cnt-form-heading", {
        opacity:0, y:50, duration:0.9, ease:"power3.out",
        scrollTrigger:{ trigger:".cnt-right", start:"top 80%" },
      });
      gsap.from(".cnt-field", {
        opacity:0, y:28, stagger:0.08, duration:0.6, ease:"power3.out",
        scrollTrigger:{ trigger:".cnt-form", start:"top 85%" },
      });
      gsap.from(".cnt-submit", {
        opacity:0, y:20, duration:0.7, ease:"back.out(1.5)",
        scrollTrigger:{ trigger:".cnt-submit", start:"top 95%" },
      });

      /* Map */
      gsap.from(".cnt-map-overlay", {
        opacity:0, x:-30, duration:0.8, ease:"power3.out",
        scrollTrigger:{ trigger:".cnt-map-strip", start:"top 85%" },
      });

      /* Footer */
      gsap.from(".cnt-footer-brand, .cnt-footer-col", {
        opacity:0, y:40, stagger:0.1, duration:0.8, ease:"power3.out",
        scrollTrigger:{ trigger:".cnt-footer-top", start:"top 85%" },
      });

    }, pageRef);

    setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => ctx.revert();
  }, []);

  return (
    <div id="contact" className="cnt-page" ref={pageRef}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="cnt-hero">
        {/* Full-width background SVG */}
        <ElevatorCitySVG className="cnt-hero-bg-svg" />

        <div className="cnt-hero-inner">
          <div className="cnt-hero-tag">Get In Touch</div>
          <h1>
            Let's Build<br />
            <em>Together</em>
          </h1>
          <p className="cnt-hero-sub">
            Whether you need a new installation, emergency maintenance,
            or expert consultation — our team is ready to elevate your project.
          </p>
          <div className="cnt-scroll-hint">
            <span>Scroll</span>
            <span className="cnt-scroll-line" />
          </div>
        </div>
      </section>

      {/* ── MAIN 2-COL ───────────────────────────────────── */}
      <div className="cnt-main">

        {/* LEFT panel */}
        <div className="cnt-left">
          {/* Background SVG illustration */}
          <ElevatorCitySVG className="cnt-left-bg-svg" />

          <div className="cnt-info-group">
            <div className="cnt-info-label">Contact Details</div>

            {/* Email */}
            <div className="cnt-info-item">
              <div className="cnt-info-icon">✉</div>
              <div className="cnt-info-content">
                <strong>Email</strong>
                <a href="mailto:msitechnicalsolution2015@gmail.com">
                  msitechnicalsolution2015@gmail.com
                </a>
              </div>
            </div>

            {/* Mobile */}
            <div className="cnt-info-item">
              <div className="cnt-info-icon">📱</div>
              <div className="cnt-info-content">
                <strong>Mobile</strong>
                <a href="tel:+9779820103620">+977 9820103620</a>
                <a href="tel:+9779820103622">+977 9820103622</a>
                <a href="tel:+9779851062192">+977 9851062192</a>
                <a href="tel:+9779851089775">+977 9851089775</a>
              </div>
            </div>

            {/* Telephone */}
            <div className="cnt-info-item">
              <div className="cnt-info-icon">☎</div>
              <div className="cnt-info-content">
                <strong>Telephone</strong>
                <a href="tel:+97714973235">+977-1-4973235</a>
              </div>
            </div>

            {/* Address */}
            <div className="cnt-info-item">
              <div className="cnt-info-icon">📍</div>
              <div className="cnt-info-content">
                <strong>Office</strong>
                <span>City Square Mall, 7th Floor</span>
                <span>Samakhushi, Kathmandu — Nepal</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="cnt-info-label" style={{ marginBottom:"14px" }}>Follow Us</div>
            <div className="cnt-social-row">
              <a
                href="https://www.facebook.com/MSInternationalTechnicalSolution"
                target="_blank"
                rel="noopener noreferrer"
                className="cnt-social-btn"
              >
                <FbIcon />
                M&amp;S International Technical Solution
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT panel — Form */}
        <div className="cnt-right">
          <div>
            <h2 className="cnt-form-heading">
              Send Us a <em>Message</em>
            </h2>
            <p className="cnt-form-sub">
              Fill in the form and our team will get back to you within 24 hours.
            </p>
          </div>

          {submitted && (
            <div className="cnt-success">
              ✓ &nbsp;Message sent! We'll be in touch shortly.
            </div>
          )}

          <form className="cnt-form" onSubmit={handleSubmit}>
            <div className="cnt-field-row">
              <div className="cnt-field">
                <label htmlFor="cnt-name">Full Name</label>
                <div className="cnt-field-wrap">
                  <input id="cnt-name" name="name" type="text"
                    placeholder="John Doe"
                    value={form.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="cnt-field">
                <label htmlFor="cnt-email">Email Address</label>
                <div className="cnt-field-wrap">
                  <input id="cnt-email" name="email" type="email"
                    placeholder="you@example.com"
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="cnt-field-row">
              <div className="cnt-field">
                <label htmlFor="cnt-phone">Phone Number</label>
                <div className="cnt-field-wrap">
                  <input id="cnt-phone" name="phone" type="tel"
                    placeholder="+977 98XXXXXXXX"
                    value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="cnt-field">
                <label htmlFor="cnt-service">Service Required</label>
                <div className="cnt-field-wrap">
                  <select id="cnt-service" name="service"
                    value={form.service} onChange={handleChange} required>
                    <option value="" disabled>Select a service…</option>
                    <option value="installation">New Installation</option>
                    <option value="maintenance">Maintenance Contract</option>
                    <option value="modernisation">Lift Modernisation</option>
                    <option value="safety">Safety Audit</option>
                    <option value="emergency">Emergency Repair</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="cnt-field">
              <label htmlFor="cnt-message">Your Message</label>
              <div className="cnt-field-wrap">
                <textarea id="cnt-message" name="message"
                  placeholder="Tell us about your project — building type, number of floors, timeline…"
                  value={form.message} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="cnt-submit">
              Send Message <SendIcon />
            </button>
          </form>
        </div>
      </div>

      {/* ── MAP ─────────────────────────────────────────── */}
      <div className="cnt-map-strip">
        <div className="cnt-map-overlay">
          <p>Our Location</p>
          <small>City Square Mall, 7th Floor — Samakhushi, Kathmandu</small>
        </div>
        {/* City Square Mall, Samakhushi, Kathmandu exact embed */}
        <iframe
          title="M&S Technical Solution — City Square Mall Samakhushi"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.609!2d85.31748!3d27.73721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19c0db36b815%3A0x27fe3b3e08cf4765!2sCity%20Square%20Mall!5e0!3m2!1sen!2snp!4v1700000000001"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="cnt-footer">
        <div className="cnt-footer-watermark">M&amp;S</div>

        <div className="cnt-footer-top">

          {/* Brand */}
          <div className="cnt-footer-brand">
            <div className="cnt-footer-logo">
              <div className="cnt-footer-logo-icon">M&amp;S</div>
              <div className="cnt-footer-logo-text">
                <strong>M&amp;S International</strong>
                <span>Technical Solution</span>
              </div>
            </div>
            <p className="cnt-footer-tagline">
              Nepal's leading elevator and escalator specialists since 2015.
              Engineering excellence on every floor, in every building.
            </p>
            <div className="cnt-footer-cert">
              <span className="cnt-cert-badge">Est. 2015</span>
              <span className="cnt-cert-badge">600+ Projects</span>
              <span className="cnt-cert-badge">Nationwide</span>
            </div>
          </div>

          {/* Services */}
          <div className="cnt-footer-col">
            <h4>Services</h4>
            <ul className="cnt-footer-links">
              {["New Installation","Maintenance","Modernisation",
                "Safety Audit","Emergency Repair","Consultation"].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="cnt-footer-col">
            <h4>Company</h4>
            <ul className="cnt-footer-links">
              {["About Us","Our Projects","Our Team",
                "Careers","News & Updates","Contact Us"].map(s => (
                <li key={s}><a href="#about">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="cnt-footer-col">
            <h4>Get In Touch</h4>
            <div className="cnt-footer-contact-list">
              <div className="cnt-footer-contact-item">
                <div className="cnt-footer-ci-icon">✉</div>
                <a href="mailto:msitechnicalsolution2015@gmail.com">
                  msitechnicalsolution2015@gmail.com
                </a>
              </div>
              <div className="cnt-footer-contact-item">
                <div className="cnt-footer-ci-icon">📱</div>
                <div>
                  <a href="tel:+9779820103620">+977 9820103620</a><br />
                  <a href="tel:+9779820103622">+977 9820103622</a><br />
                  <a href="tel:+9779851062192">+977 9851062192</a><br />
                  <a href="tel:+9779851089775">+977 9851089775</a>
                </div>
              </div>
              <div className="cnt-footer-contact-item">
                <div className="cnt-footer-ci-icon">☎</div>
                <a href="tel:+97714973235">+977-1-4973235</a>
              </div>
              <div className="cnt-footer-contact-item">
                <div className="cnt-footer-ci-icon">📍</div>
                <span>City Square Mall, 7th Floor<br />Samakhushi, Kathmandu — Nepal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="cnt-footer-bottom">
          <p className="cnt-footer-copy">
            © 2026 <span>M&amp;S International Technical Solution.</span> All Rights Reserved.
          </p>

          <div className="cnt-footer-mid">
            <div className="cnt-footer-divider" />
            <p className="cnt-footer-copy">Samakhushi, Kathmandu — Nepal</p>
          </div>

          <div className="cnt-footer-socials">
            <a href="https://www.facebook.com/MSInternationalTechnicalSolution"
              target="_blank" rel="noopener noreferrer"
              className="cnt-footer-social-icon" title="Facebook">
              <FbIcon />
            </a>
            <a href="mailto:msitechnicalsolution2015@gmail.com"
              className="cnt-footer-social-icon" title="Email">
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="tel:+9779820103620"
              className="cnt-footer-social-icon" title="Call Us">
              <svg viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}