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
      duration: 1.1,
      smooth: true,
      smoothTouch: false,
    });

    // 🔥 SINGLE RAF LOOP (IMPORTANT FIX)
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update(); 
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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