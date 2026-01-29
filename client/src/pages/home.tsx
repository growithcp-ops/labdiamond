import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gem, Sparkles, ArrowUpRight } from "lucide-react";

import Hero from "../components/Hero";
import Transformation from "../components/Transformation";
import Collection from "../components/Collection";

function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.0,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [enabled]);
}

export default function Home() {
  useLenis(true);

  return (
    <main className="bg-[#050505] min-h-screen selection:bg-white selection:text-black">
      <Hero />
      <Transformation />
      <Collection />
      
      {/* Footer */}
      <footer className="py-20 border-t border-white/5 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8 opacity-40">
          <Gem className="w-5 h-5 text-white" />
          <span className="font-serif tracking-[0.3em] text-white text-sm">AURUM</span>
        </div>
        <p className="text-white/20 text-[10px] tracking-[0.5em] uppercase">
          © 2026 Ethical Luxury Lab-Grown Diamonds
        </p>
      </footer>
    </main>
  );
}
