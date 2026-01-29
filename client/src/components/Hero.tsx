import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";
import heroBg from "../assets/images/hero_bg_standing_diamond.png";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.5 } });
      
      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, delay: 0.5 }
      )
      .fromTo(subtitleRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        "-=1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Image with Dark Wash */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxury Background" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 space-y-8">
        <div className="flex items-center justify-center gap-3 opacity-40 mb-4">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-[10px] tracking-[0.6em] uppercase text-white font-light">The Future of Brilliance</span>
        </div>
        
        <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-none tracking-tighter">
          PURE<br />PRECISION
        </h1>
        
        <p ref={subtitleRef} className="max-w-xl mx-auto text-white/60 text-sm md:text-base leading-relaxed font-light tracking-wide">
          Engineered for eternity. Our lab-grown diamonds represent the pinnacle of ethical luxury and scientific perfection.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 z-10">
        <div className="w-[1px] h-12 bg-white" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-white">Scroll</span>
      </div>
    </section>
  );
}
