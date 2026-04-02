"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Parallax layers: elements with data-speed scroll at different rates
    const parallaxElements: { el: HTMLElement; speed: number; initialY: number }[] = [];

    function collectParallaxElements() {
      parallaxElements.length = 0;
      document.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "1");
        const rect = el.getBoundingClientRect();
        const initialY = rect.top + window.scrollY;
        parallaxElements.push({ el, speed, initialY });
      });
    }

    // Collect after a short delay to ensure DOM is ready
    setTimeout(collectParallaxElements, 100);
    window.addEventListener("resize", collectParallaxElements);

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      parallaxElements.forEach(({ el, speed, initialY }) => {
        const offset = (scroll - initialY) * (1 - speed);
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", collectParallaxElements);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
