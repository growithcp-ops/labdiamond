import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Transformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carbonRef = useRef<HTMLDivElement>(null);
  const crystalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        }
      });

      tl.to(carbonRef.current, { opacity: 0, scale: 1.1 })
        .to(crystalRef.current, { opacity: 1, scale: 1 }, "<")
        .fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
        {/* Carbon Image (Dark/Textured) */}
        <div 
          ref={carbonRef}
          className="absolute inset-0 bg-neutral-900 rounded-lg shadow-2xl overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        </div>

        {/* Crystal Image (Diamond) */}
        <div 
          ref={crystalRef}
          className="absolute inset-0 opacity-0"
        >
          <img 
            src="/src/assets/images/diamond1.png" 
            alt="Lab grown diamond"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div ref={textRef} className="absolute bottom-24 text-center space-y-4">
        <h3 className="text-white text-2xl md:text-3xl font-serif tracking-widest opacity-80 uppercase">
          Carbon to Crystal
        </h3>
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase">
          The alchemy of modern science
        </p>
      </div>
    </section>
  );
}
