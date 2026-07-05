import "../css/project.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import client1 from "../assets/client1.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";
import client5 from "../assets/client5.png";
import client6 from "../assets/client6.png";
import client7 from "../assets/client7.png";
import client8 from "../assets/client8.png";
import client9 from "../assets/client9.png";
import client10 from "../assets/client10.png";
import client11 from "../assets/client11.png";
import client12 from "../assets/client12.png";
import client13 from "../assets/client13.png";
import client14 from "../assets/client14.png";
import client15 from "../assets/client15.png";
import client16 from "../assets/client16.png";

import proj1 from "../assets/proj1.jpg";
import proj2 from "../assets/proj2.jpg";
import proj3 from "../assets/proj3.jpg";
import proj4 from "../assets/proj4.jpg";
import proj5 from "../assets/proj5.jpg";
import proj6 from "../assets/proj6.jpg";
import proj7 from "../assets/proj7.png";
import proj8 from "../assets/proj8.jpg";
gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────── */
const projects = [
  { title: "Oyo Hotel",  desc: "Complete elevator installation and modernization for OYO Hotel branches across Nepal, delivering smooth, safe, and energy-efficient vertical transportation systems tailored for hospitality environments.", img: proj1 },
  { title: "Bhatbhateni Super Market",     desc: "Comprehensive passenger lift and escalator installation across Bhatbhateni Supermarket branches in Nepal, including Tokha, Satdobato, Birgunj, and other major locations, ensuring safe, efficient, and high-capacity customer movement systems.",img: proj2 },
  { title: "Kathmandu Institute of Child Health(KIOCH)",desc: "Installation of advanced hospital-grade passenger and stretcher lift systems at Kathmandu Institute of Child Health (KIOCH), ensuring smooth, safe, and precise vertical transportation for patients, medical staff, and emergency operations.",img: proj3 },
  { title: "Salesberry Supermarket",    desc: "Nationwide lift and escalator deployment for Salesberry Supermarket chain across Nepal, covering Kathmandu Valley, Pokhara, Butwal, Itahari, Biratnagar, and other rapidly expanding retail locations—engineered for high-traffic efficiency and continuous operation.",    img: proj4 },
  { title: "City Square Mall ",    desc:"Design, supply, and installation of advanced passenger lift and escalator systems at City Square Mall, Samakhushi, Kathmandu, ensuring seamless vertical transportation for high-footfall retail and entertainment environments. The system was engineered for continuous operation, safety compliance, and smooth crowd management across multiple floors of the commercial complex.", img:proj5},
  {title: "ASG Eye Hospital", desc:"Design, supply, and installation of advanced hospital-grade passenger lift systems at ASG Eye Hospital, New Baneshwor, Kathmandu, ensuring smooth, vibration-free, and precise vertical transportation for patients, doctors, and medical staff. The system was engineered to support critical healthcare operations with high safety standards, silent performance, and accurate floor leveling for emergency and routine medical movement.", img: proj6},
  {title: "The Kathmandu Mall", desc:"The Kathmandu Mall is a prominent commercial and retail destination in Kathmandu. Our team contributed to the project's vertical transportation systems, delivering reliable elevator and escalator solutions that enhance accessibility, safety, and the overall visitor experience.", img: proj7},
  {title: "Hotel Badrinath", desc:"Hotel Badrinath Pashupati is a distinguished hospitality destination near the sacred Pashupatinath area. Our team provided reliable elevator solutions to enhance guest comfort, accessibility, and operational efficiency throughout the property.", img: proj8},
];

const stats = [
  { number: "600+", label: "Projects Completed"   },
  { number: "15+",  label: "Years Experience"      },
  { number: "24/7", label: "Maintenance Support"   },
];

const services = [
  { icon: "🏗️", title: "Installation",   desc: "End-to-end lift & escalator installation for all building types."     },
  { icon: "🔧", title: "Maintenance",    desc: "Preventive maintenance contracts with rapid response SLA."             },
  { icon: "⚡", title: "Modernisation",  desc: "Upgrade legacy systems with energy-efficient smart drives."            },
  { icon: "🛡️", title: "Safety Audit",   desc: "Full compliance inspection & load-test certification."                 },
  { icon: "📡", title: "Remote Monitor", desc: "IoT-based real-time diagnostics and alert management."                 },
  { icon: "🏆", title: "Consultation",   desc: "Expert consulting from concept to commissioning."                      },
  { icon: "⚡", title: "Fast Serice", desc: "Rapid response and efficent solutions to minimize downtime."},
];

const timeline = [
  { year: "2015", width: "15%",  text: "Company Established"  },
  { year: "2018", width: "40%",  text: "100+ Installations"   },
  { year: "2021", width: "70%",  text: "Nationwide Expansion" },
  { year: "2026", width: "100%", text: "600+ Projects"        },
];

/* Doubled for seamless marquee loop */
const clientLogos = [client1, client2, client3, client4, client1, client2, client3, client4, client5, client6, client7, client8, client9, client10, client11, client12, client13, client14, client15, client16];

/* ============================================================ */
export default function Project() {
  const counterRef = useRef(null);
  const counterObj = useRef({ val: 0 });
  const pageRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── HERO ── */
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".elv-hero-badge",  { opacity: 0, y: 20, duration: 0.8 })
        .from(".elv-hero h1",     { opacity: 0, y: 90, duration: 1.1 }, "-=0.4")
        .from(".elv-hero p",      { opacity: 0, y: 30, duration: 0.8 }, "-=0.6")
        .from(".elv-scroll-hint", { opacity: 0, duration: 0.8        }, "-=0.3");

      /* ── COUNTER ── */
      gsap.to(counterObj.current, {
        val: 600, duration: 2.4, ease: "power3.out",
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.innerText = Math.floor(counterObj.current.val);
        },
        scrollTrigger: { trigger: ".elv-counter", start: "top 80%" },
      });

      /* ── STATS ── */
      gsap.from(".elv-stat-item", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".elv-stats-row", start: "top 85%" },
      });

      /* ── SECTION HEADERS ── */
      gsap.utils.toArray(".elv-section-header").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      /* ── PROJECT CARDS ── */
      gsap.utils.toArray(".elv-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 80, duration: 0.9, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      /* ── TIMELINE BARS ── */
      gsap.utils.toArray(".elv-line-bar").forEach((bar) => {
        const tw = bar.dataset.width;
        gsap.fromTo(bar,
          { width: "0%" },
          { width: tw, duration: 1.4, ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 88%", once: true } }
        );
      });

      gsap.utils.toArray(".elv-line-item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0, x: -40, duration: 0.7, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".elv-graph", start: "top 85%" },
        });
      });

      /* ── SERVICES ── */
      gsap.from(".elv-service-tile", {
        opacity: 0, y: 50, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".elv-services", start: "top 85%" },
      });

      /* ── CTA BAND ── */
      gsap.from(".elv-cta h2, .elv-cta-link", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ".elv-cta", start: "top 85%" },
      });

      /* ── CLIENTS HEADER ── */
      gsap.from(".elv-clients-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".elv-clients", start: "top 85%" },
      });

    }, pageRef);

    setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => ctx.revert();
  }, []);

  return (
    <div id="projects" className="elv-page" ref={pageRef}>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="elv-hero">
        <div className="elv-hero-badge">Nepal's Trusted Lift Partner</div>
        <h1>
          Our Landmark<br />
          <span className="elv-accent">Projects</span>
        </h1>
        <p>Engineering Excellence Across Nepal</p>
        <div className="elv-scroll-hint">
          <span>Scroll</span>
          <span className="elv-scroll-line" />
        </div>
      </section>

      {/* ── COUNTER ────────────────────────────────────── */}
      <section className="elv-counter">
        <h2><span ref={counterRef}>0</span>+</h2>
        <p>Projects Completed</p>
      </section>

      {/* ── STATS ──────────────────────────────────────── */}
      <div className="elv-stats-row">
        {stats.map((s, i) => (
          <div className="elv-stat-item" key={i}>
            <span className="elv-stat-number">{s.number}</span>
            <span className="elv-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── PROJECTS ───────────────────────────────────── */}
      <div className="elv-section-header">
        <div>
          <div className="elv-section-label">Featured Work</div>
          <h2 className="elv-section-title">Selected <em>Projects</em></h2>
        </div>
       <button className="elv-view-all">
  View All →
</button>
      </div>

      <section className="elv-projects">
        {projects.map((p, i) => (
          <div className="elv-card" key={i}>
            <div className="elv-card-img">
              <img src={p.img} alt={p.title} />
            </div>
            <div className="elv-card-body">
              <div className="elv-card-num">0{i + 1}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <button className="elv-card-btn">View Project</button>
            </div>
          </div>
        ))}
      </section>

      {/* ── SERVICES ───────────────────────────────────── */}
      <div className="elv-section-header">
        <div>
          <div className="elv-section-label">What We Offer</div>
          <h2 className="elv-section-title">Our <em>Services</em></h2>
        </div>
      </div>
      <div className="elv-services">
        {services.map((s, i) => (
          <div className="elv-service-tile" key={i}>
            <span className="elv-service-icon">{s.icon}</span>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ── TIMELINE ───────────────────────────────────── */}
      <section className="elv-timeline">
        <div className="elv-section-label">Our Story</div>
        <h2 className="elv-section-title">Company <em>Journey</em></h2>
        <div className="elv-graph">
          {timeline.map((t, i) => (
            <div className="elv-line-item" key={i}>
              <div className="elv-line-year">{t.year}</div>
              <div className="elv-line-bar-wrap">
                <div className="elv-line-bar" data-width={t.width} />
              </div>
              <div className="elv-line-text">{t.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────── */}
      <section className="elv-cta">
        <h2>Ready to Elevate<br />Your Building?</h2>
        <a href="#contact" className="elv-cta-link">Get a Free Quote →</a>
      </section>

      {/* ── CLIENTS MARQUEE ────────────────────────────── */}
      <section className="elv-clients">
        <div className="elv-clients-header">
          <div>
            <div className="elv-section-label">Partnerships</div>
            <h2 className="elv-section-title">Trusted <em>By</em></h2>
          </div>
        </div>
        <div className="elv-marquee-wrapper">
          <div className="elv-marquee-track">
            {clientLogos.map((c, i) => (
              <img key={i} className="elv-client-logo" src={c} alt={`client ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="elv-footer">
        <p>© 2026 Elevator Co. Nepal — All Rights Reserved</p>
        <div className="elv-footer-dot" />
        <p>Crafted With Precision</p>
      </footer>

    </div>
  );
}