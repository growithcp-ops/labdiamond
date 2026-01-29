import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";
import heroBg from "../assets/images/hero_bg_purity.png";

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
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
      {/* Background Image with Dark Wash */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxury Background" 
          className="w-full h-full object-cover opacity-80 scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[150px] pointer-events-none" />
      
      <div className="z-10 space-y-12">
        <div className="flex items-center justify-center gap-3 opacity-60 mb-6">
          <div className="w-8 h-[1px] bg-white/40" />
          <span className="text-[10px] tracking-[0.6em] uppercase text-white font-light">The Future of Ethical Luxury</span>
          <div className="w-8 h-[1px] bg-white/40" />
        </div>
        
        <h1 ref={titleRef} className="text-7xl md:text-9xl font-serif text-white leading-[1.1] tracking-tight max-w-5xl mx-auto">
          Purity<br />Redefined<br />By Science
        </h1>
        
        <p ref={subtitleRef} className="max-w-2xl mx-auto text-white/70 text-base md:text-lg leading-relaxed font-light tracking-wide">
          Lab-grown diamonds that mirror nature's perfection, crafted with zero environmental impact.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 z-10">
        <div className="w-[1px] h-16 bg-white" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-white">Scroll</span>
      </div>
    </section>
  );
}
