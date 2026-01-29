import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";

const diamonds = [
  {
    id: 1,
    name: "Brilliant Solitaire",
    image: "/src/assets/images/diamond1.png",
    details: "1.5 Carat, VVS1 Clarity, Excellent Cut. Lab-grown perfection with zero carbon footprint.",
    specs: "Carat: 1.5 | Color: D | Clarity: VVS1 | Cut: Ideal"
  },
  {
    id: 2,
    name: "Classic Oval",
    image: "/src/assets/images/diamond2.png",
    details: "2.0 Carat Oval, E Color, VS1 Clarity. Elegant elongated shape for maximum brilliance.",
    specs: "Carat: 2.0 | Color: E | Clarity: VS1 | Cut: Excellent"
  },
  {
    id: 3,
    name: "Radiant Emerald",
    image: "/src/assets/images/diamond3.png",
    details: "1.8 Carat Emerald Cut, F Color, VVS2 Clarity. Sophisticated linear facets and crystal clarity.",
    specs: "Carat: 1.8 | Color: F | Clarity: VVS2 | Cut: Excellent"
  },
  {
    id: 4,
    name: "Modern Pear",
    image: "/src/assets/images/diamond4.png",
    details: "1.2 Carat Pear Shape, D Color, IF Clarity. A unique teardrop silhouette for modern luxury.",
    specs: "Carat: 1.2 | Color: D | Clarity: IF | Cut: Ideal"
  },
  {
    id: 5,
    name: "Sparkling Cushion",
    image: "/src/assets/images/diamond5.png",
    details: "2.5 Carat Cushion Cut, G Color, VS2 Clarity. Vintage-inspired soft corners with modern sparkle.",
    specs: "Carat: 2.5 | Color: G | Clarity: VS2 | Cut: Very Good"
  }
];

export default function Collection() {
  const [selectedDiamond, setSelectedDiamond] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!selectedDiamond && containerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
      
      // V-shape layout logic: calculate y offsets for V form
      const getYOffset = (index: number) => {
        const centerIndex = 2;
        const diff = Math.abs(index - centerIndex);
        return diff * 60; // Increase Y offset as we move away from center
      };

      // Middle image first
      tl.fromTo(cardsRef.current[2], 
        { opacity: 0, scale: 0.8, y: 150 }, 
        { opacity: 1, scale: 1, y: 0 }
      );

      // Right two images fade in with V-shape offset
      tl.fromTo([cardsRef.current[3], cardsRef.current[4]], 
        { opacity: 0, scale: 0.8, y: 200 }, 
        { 
          opacity: 1, 
          scale: 0.9, 
          y: (i) => getYOffset(i + 3),
          stagger: 0.2 
        },
        "-=0.5"
      );

      // Left two images fade in with V-shape offset
      tl.fromTo([cardsRef.current[1], cardsRef.current[0]], 
        { opacity: 0, scale: 0.8, y: 200 }, 
        { 
          opacity: 1, 
          scale: 0.9, 
          y: (i) => getYOffset(1 - i),
          stagger: 0.2 
        },
        "-=0.5"
      );

      // Add hover-to-scroll functionality
      const container = containerRef.current;
      let scrollInterval: NodeJS.Timeout;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const edgeSize = 150; // pixels from edge to trigger scroll

        if (x < edgeSize) {
          clearInterval(scrollInterval);
          scrollInterval = setInterval(() => {
            container.scrollLeft -= 5;
          }, 10);
        } else if (x > width - edgeSize) {
          clearInterval(scrollInterval);
          scrollInterval = setInterval(() => {
            container.scrollLeft += 5;
          }, 10);
        } else {
          clearInterval(scrollInterval);
        }
      };

      const handleMouseLeave = () => {
        clearInterval(scrollInterval);
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        clearInterval(scrollInterval);
      };
    }
  }, [selectedDiamond]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDiamond !== null) {
      const nextId = selectedDiamond === diamonds.length ? 1 : selectedDiamond + 1;
      setSelectedDiamond(nextId);
      setShowDetails(false);
    }
  };

  const handleBack = () => {
    setSelectedDiamond(null);
    setShowDetails(false);
  };

  const currentDiamond = diamonds.find(d => d.id === selectedDiamond);

  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden py-24 flex flex-col items-center">
      <h2 className="text-4xl md:text-6xl font-serif text-white mb-20 opacity-80 tracking-widest text-center">
        THE COLLECTION
      </h2>

      {!selectedDiamond ? (
        <div 
          ref={containerRef}
          className="flex items-center justify-center gap-4 md:gap-8 px-8 overflow-x-auto no-scrollbar w-full max-w-7xl py-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {diamonds.map((diamond, index) => (
            <div
              key={diamond.id}
              ref={el => { cardsRef.current[index] = el; }}
              onClick={() => setSelectedDiamond(diamond.id)}
              className="relative flex-shrink-0 w-64 h-80 md:w-80 md:h-[450px] cursor-pointer group rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-white/5"
            >
              <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors duration-500 rounded-2xl z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-1" />
              <img 
                src={diamond.image} 
                alt={diamond.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm tracking-[0.2em] font-light uppercase">{diamond.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-8 cursor-pointer"
            onClick={() => !showDetails ? setShowDetails(true) : handleBack()}
          >
            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center gap-12">
              <motion.div 
                layoutId={`diamond-${selectedDiamond}`}
                className="w-full max-w-2xl aspect-square relative"
              >
                <img 
                  src={currentDiamond?.image} 
                  alt={currentDiamond?.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {showDetails && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-md text-white space-y-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-5xl font-serif tracking-tighter">{currentDiamond?.name}</h3>
                  <div className="w-12 h-[1px] bg-white/30" />
                  <p className="text-lg text-white/60 leading-relaxed font-light">
                    {currentDiamond?.details}
                  </p>
                  <div className="text-sm tracking-[0.3em] text-white/40 uppercase font-light">
                    {currentDiamond?.specs}
                  </div>
                  
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-4 group mt-12 text-white/80 hover:text-white transition-colors"
                  >
                    <span className="text-xs tracking-[0.4em] uppercase font-light">Next Masterpiece</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              <button 
                onClick={handleBack}
                className="absolute top-8 right-8 text-white/40 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="mt-20 flex gap-2">
        {diamonds.map((_, i) => (
          <div key={i} className={`h-[1px] w-8 ${selectedDiamond === i + 1 ? 'bg-white' : 'bg-white/10'} transition-colors duration-500`} />
        ))}
      </div>
    </section>
  );
}
