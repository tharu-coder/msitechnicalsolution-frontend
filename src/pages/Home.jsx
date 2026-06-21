import { useEffect } from "react";
import "../css/Home.css";
import heroVideo from "../assets/hero-video.mp4";
import logoMS    from "../assets/logo.png";
import logoCanny from "../assets/canny.png";

export default function Home() {

  useEffect(() => {
    const loadGSAP = async () => {
      /* Load GSAP core */
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      document.head.appendChild(s1);
      await new Promise((res) => { s1.onload = res; });

      /* Load ScrollTrigger */
      const s2 = document.createElement("script");
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      document.head.appendChild(s2);
      await new Promise((res) => { s2.onload = res; });

      const { gsap } = window;
      gsap.registerPlugin(window.ScrollTrigger);

      /* ── HERO ENTRANCE TIMELINE ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        /* Brackets fade in first */
        .fromTo(".ch-brackets",
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
          0
        )
        /* MS Logo drops from above */
        .fromTo(".ch-logo-ms-wrap",
          { opacity: 0, y: -55, scale: 0.75 },
          { opacity: 1, y: 0,   scale: 1, duration: 1.1 },
          0.2
        )
        /* Company name slides up */
        .fromTo(".ch-company-name",
          { opacity: 0, y: 18, letterSpacing: "12px" },
          { opacity: 1, y: 0,  letterSpacing: "5px", duration: 0.9 },
          "-=0.35"
        )
        /* Rule scales in from center */
        .fromTo(".ch-rule",
          { opacity: 0, scaleX: 0 },
          { opacity: 1, scaleX: 1, transformOrigin: "center center", duration: 0.65 },
          "-=0.2"
        )
        /* Title slides up with slight skew */
        .fromTo(".ch-title",
          { opacity: 0, y: 38, skewX: 2 },
          { opacity: 1, y: 0,  skewX: 0, duration: 1 },
          "-=0.15"
        )
        /* Draw red underline on "Canny" after title arrives */
        .add(() => {
          document.querySelector(".ch-title .accent-red")
            ?.classList.add("line-reveal");
        }, "+=0.05")
        /* Subtitle */
        .fromTo(".ch-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        /* Buttons */
        .fromTo(".ch-btns",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.35"
        )
        /* Canny logo pops in with bounce */
        .fromTo(".ch-logo-canny-wrap",
          { opacity: 0, scale: 0.55, rotation: -10 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.8)" },
          "-=0.25"
        )
        /* Scroll line */
        .fromTo(".ch-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
          "-=0.2"
        );

      /* ── ABOUT BOX scroll-triggered ── */
      gsap.fromTo(
        ".ch-about-box",
        { opacity: 0, y: 55 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: {
            trigger: ".ch-about-box",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* ── Video parallax ── */
      gsap.to(".ch-video", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".ch-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    loadGSAP();
  }, []);

  return (
    <div className="ch-home">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section id="home" className="ch-hero">

        <video autoPlay muted loop playsInline className="ch-video">
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="ch-overlay" />
        <div className="ch-grid" />
        <div className="ch-brackets" />

        <div className="ch-content">

          {/* ── M.&S. Logo with background rings ── */}
          <div className="ch-logo-ms-wrap">
            {/* Rings render first = behind the logo image */}
            <span className="ch-ring-1" />
            <span className="ch-ring-2" />
            <span className="ch-ring-3" />

            <img
              src={logoMS}
              alt="M. & S. International Technical Solution Logo"
              className="ch-logo-ms"
            />
          </div>

          {/* Company full name */}
          <p className="ch-company-name">
            M. &amp; S. International Technical Solution Pvt. Ltd.
          </p>

          {/* Perfectly centered rule divider */}
          <div className="ch-rule">
            <span className="ch-rule-line red"  />
            <span className="ch-rule-dot  red"  />
            <span className="ch-rule-line blue" />
            <span className="ch-rule-dot  blue" />
            <span className="ch-rule-line blue2"/>
            <span className="ch-rule-dot  red"  />
            <span className="ch-rule-line red2" />
          </div>

          {/* Main brand title */}
          <h1 className="ch-title">
            <span className="accent-red">Canny</span>{" "}
            <span className="accent-blue">Elevator</span>
            <br />
            &amp;&nbsp;Escalator
          </h1>

          {/* Tagline */}
          <p className="ch-subtitle">
            Elevating Nepal with Safety, Precision &amp; Innovation
          </p>

          {/* CTA buttons */}
          <div className="ch-btns">
            <button className="ch-btn ch-btn-primary">Explore Company</button>
            <button className="ch-btn ch-btn-outline">Contact Us</button>
          </div>

          {/* Canny Elevator logo — no label */}
          <div className="ch-logo-canny-wrap">
            <img
              src={logoCanny}
              alt="Canny Elevator & Escalator"
              className="ch-logo-canny"
            />
          </div>

        </div>

        {/* Scroll indicator — line only, no text */}
        <div className="ch-scroll">
          <div className="ch-scroll-line" />
        </div>

      </section>

      {/* ══════════════════════════════
          ABOUT
      ══════════════════════════════ */}
      <section id="about" className="ch-about">
        <div className="ch-about-box">

          <div className="ch-about-badge">Est. in Nepal</div>

          <h2>About <em>Our</em> Company</h2>

          <p>
            <strong>M. &amp; S. International Technical Solution Pvt. Ltd.</strong>{" "}
            is the Sole Distributor of{" "}
            <em>Canny Elevator &amp; Escalator</em> in Nepal.
            We specialize in installation, modernization, maintenance, and complete
            elevator solutions for <strong>commercial, residential, hospital,</strong> and{" "}
            <strong>industrial</strong> sectors across Nepal — delivering precision
            engineering with unmatched safety standards.
          </p>

        </div>
      </section>

    </div>
  );
}