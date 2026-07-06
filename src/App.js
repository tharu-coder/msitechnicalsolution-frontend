import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Home from "../src/pages/Home"
import Navbar from "../src/components/Navbar"
import About from "./pages/About";
import Products from "./pages/Product";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import NewsArticles from "./pages/Newsarticle";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      smooth: true,
      smoothTouch: false,
    });

    // Optimized RAF loop - only update ScrollTrigger when scrolling
    let isScrolling = false;
    function raf(time) {
      lenis.raf(time);
      if (isScrolling) {
        ScrollTrigger.update();
        isScrolling = false;
      }
      requestAnimationFrame(raf);
    }

    // Track scroll events
    const onScroll = () => { isScrolling = true; };
    window.addEventListener('scroll', onScroll, { passive: true });

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Home />
       <About />
       <Products />
       <Project/>  
       <NewsArticles/>
       <Contact/>

    </>
  );
}

export default App;