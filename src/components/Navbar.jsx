import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // hide/show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 20);

      // AUTO ACTIVE SECTION (simple version)
      const sections = ["home", "about", "product", "projects", "contact"];

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveLink(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} ${visible ? "show" : "hide"}`}>
      
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="logo" />
          <div className="logo-text">
            <span>CANNY ELEVATOR</span>
            <small>& ESCALATOR, NEPAL</small>
          </div>
        </div>

        {/* MENU */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {["home","about","product","projects","contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={activeLink === item ? "active" : ""}
              onClick={() => {
                setActiveLink(item);
                setMenuOpen(false);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="nav-right">
          <button className="quote-btn">Contact Us</button>

          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;