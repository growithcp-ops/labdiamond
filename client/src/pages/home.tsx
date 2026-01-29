import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ChevronDown,
  FlaskConical,
  Gem,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import heroTexture from "@/assets/images/hero-texture.png";
import causticsTexture from "@/assets/images/caustics-texture.png";
import diamondVisual1 from "@/assets/images/diamond-visual-1.png";
import diamondVisual2 from "@/assets/images/diamond-visual-2.png";

const COLLECTION = [
  {
    id: "aur-01",
    name: "Prism Cut",
    note: "Crisp geometry, museum-grade sparkle.",
    price: "From $2,900",
  },
  {
    id: "aur-02",
    name: "Halo Study",
    note: "A soft orbit of light around precision facets.",
    price: "From $3,750",
  },
  {
    id: "aur-03",
    name: "Solstice",
    note: "Warm-white brilliance with a colder core.",
    price: "From $4,100",
  },
];

function useGsapScrollStory(enabled: boolean) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!wrapRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-testid='section-story']",
          start: "top top",
          end: "+=2400",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        "[data-testid='story-panel-0']",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
      )
        .to("[data-testid='story-panel-0']", {
          opacity: 0,
          y: -24,
          filter: "blur(12px)",
          duration: 0.8,
          ease: "power2.inOut",
        })
        .fromTo(
          "[data-testid='story-panel-1']",
          { opacity: 0, y: 44, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
        )
        .to("[data-testid='story-panel-1']", {
          opacity: 0,
          y: -24,
          filter: "blur(12px)",
          duration: 0.8,
          ease: "power2.inOut",
        })
        .fromTo(
          "[data-testid='story-panel-2']",
          { opacity: 0, y: 44, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
        );

      gsap.to("[data-testid='story-track']", {
        xPercent: -34,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-testid='section-story']",
          start: "top top",
          end: "+=2400",
          scrub: 1,
        },
      });

      gsap.to("[data-testid='hero-diamond']", {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-testid='section-hero']",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-testid='hero-texture']", {
        y: 90,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-testid='section-hero']",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [enabled]);

  return wrapRef;
}

function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
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

function SplineEmbed({ title }: { title: string }) {
  // Note: Replace the src with your real Spline publish URL.
  // We keep this as a lightweight embed so it never blocks scroll.
  const src = "https://my.spline.design/placeholder";

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-black/10 bg-white/60 shadow-[0_30px_120px_rgba(0,0,0,0.10)]"
      data-testid="spline-wrap"
    >
      <div
        className="pointer-events-none absolute inset-0 aurum-noise"
        data-testid="overlay-noise"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.05),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.06),transparent_60%)]"
        data-testid="overlay-vignette"
      />

      <iframe
        title={title}
        src={src}
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen"
        data-testid="iframe-spline"
      />

      <div
        className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center justify-between rounded-2xl border border-black/10 bg-white/70 px-4 py-3 backdrop-blur"
        data-testid="spline-caption"
      >
        <div className="text-xs text-black/60" data-testid="text-spline-note">
          Interactive 3D preview (placeholder)
        </div>
        <div className="flex items-center gap-2 text-xs text-black/70" data-testid="text-spline-hint">
          Move cursor · Drag
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function MockAIGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<{ id: string; src: string; alt: string }[]>(
    () => [
      { id: "img-1", src: diamondVisual1, alt: "Studio diamond visual" },
      { id: "img-2", src: diamondVisual2, alt: "Studio diamond close-up" },
    ],
  );

  const prompts = useMemo(
    () => [
      "Hyper-real studio diamond, white seamless",
      "Macro facets, subtle iridescence",
      "Science-meets-art lighting",
    ],
    [],
  );

  async function onGenerate() {
    setIsGenerating(true);

    await new Promise((r) => setTimeout(r, 900));

    const nextId = `img-${Date.now()}`;
    const candidate = Math.random() > 0.5 ? diamondVisual1 : diamondVisual2;

    setImages((prev) => [
      { id: nextId, src: candidate, alt: "Generated diamond visual" },
      ...prev,
    ]);

    setIsGenerating(false);
  }

  return (
    <div className="grid gap-10" data-testid="ai-wrap">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70 backdrop-blur"
            data-testid="badge-ai"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI studio workflow (mock)
          </div>
          <h2
            className="mt-4 font-serif text-3xl tracking-[-0.02em] md:text-4xl"
            data-testid="text-ai-title"
          >
            Generate diamond visuals—clean, clinical, cinematic.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-black/65" data-testid="text-ai-subtitle">
            This prototype simulates an image generation pipeline without any API keys.
            Swap in a real provider later.
          </p>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="aurum-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:shadow-[0_22px_70px_rgba(0,0,0,0.26)] disabled:opacity-60"
          data-testid="button-generate"
        >
          {isGenerating ? "Generating…" : "Generate"}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2" data-testid="ai-prompts">
        {prompts.map((p) => (
          <div
            key={p}
            className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/60"
            data-testid={`tag-prompt-${p.replaceAll(" ", "-")}`}
          >
            {p}
          </div>
        ))}
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-testid="grid-ai-images"
      >
        {images.map((img) => (
          <motion.figure
            key={img.id}
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group overflow-hidden rounded-[22px] border border-black/10 bg-white/70 shadow-[0_30px_90px_rgba(0,0,0,0.08)]"
            data-testid={`card-ai-${img.id}`}
          >
            <div className="relative aspect-[4/3]" data-testid={`wrap-ai-img-${img.id}`}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                data-testid={`img-ai-${img.id}`}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(0,0,0,0.10),transparent_65%)] opacity-70"
                data-testid={`overlay-ai-${img.id}`}
              />
            </div>
            <figcaption
              className="flex items-center justify-between px-4 py-4"
              data-testid={`caption-ai-${img.id}`}
            >
              <div className="text-sm font-medium" data-testid={`text-ai-name-${img.id}`}>
                Studio render
              </div>
              <div className="text-xs text-black/55" data-testid={`text-ai-meta-${img.id}`}>
                4K · clean background
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  useLenis(!reduceMotion);
  const wrapRef = useGsapScrollStory(!reduceMotion);

  return (
    <div ref={wrapRef} className="min-h-screen" data-testid="page-home">
      {/* HERO */}
      <section
        className="relative min-h-[100svh] overflow-hidden"
        data-testid="section-hero"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-testid="hero-texture"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(0,0,0,0.08),transparent_60%)]"
          data-testid="hero-vignette"
        />
        <div
          className="pointer-events-none absolute inset-0 aurum-noise"
          data-testid="hero-noise"
        />

        <header
          className="absolute left-0 right-0 top-0 z-20 px-5 pt-5 md:px-10 md:pt-8"
          data-testid="header-nav"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div
              className="flex items-center gap-3"
              data-testid="brand-wrap"
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 backdrop-blur"
                data-testid="brand-mark"
              >
                <Gem className="h-5 w-5 text-black/80" aria-hidden="true" />
              </div>
              <div className="leading-tight">
                <div
                  className="font-serif text-sm tracking-[0.18em]"
                  data-testid="text-brand"
                >
                  AURUM
                </div>
                <div
                  className="text-xs text-black/55"
                  data-testid="text-brand-sub"
                >
                  lab-grown diamonds
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-7 text-xs text-black/65 md:flex">
              <a
                href="#story"
                className="transition hover:text-black"
                data-testid="link-story"
              >
                Story
              </a>
              <a
                href="#scene"
                className="transition hover:text-black"
                data-testid="link-scene"
              >
                Scene
              </a>
              <a
                href="#collection"
                className="transition hover:text-black"
                data-testid="link-collection"
              >
                Collection
              </a>
              <button
                type="button"
                className="aurum-shimmer rounded-full bg-black px-4 py-2 text-xs font-medium text-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition hover:shadow-[0_16px_55px_rgba(0,0,0,0.22)]"
                data-testid="button-consult"
              >
                Book a consult
              </button>
            </nav>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 pb-24 pt-32 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:px-10 md:pb-28 md:pt-36">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70 backdrop-blur"
              data-testid="badge-hero"
            >
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              Ethical luxury, engineered.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl"
              data-testid="text-hero-title"
            >
              Pure Brilliance.
              <span className="block text-black/75">Engineered by Science.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-sm leading-relaxed text-black/65"
              data-testid="text-hero-subtitle"
            >
              A new kind of diamond: identical brilliance, measured provenance, and a
              lighter footprint—crafted for a future that values both beauty and
              integrity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                className="aurum-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:shadow-[0_22px_70px_rgba(0,0,0,0.26)]"
                data-testid="button-explore"
              >
                Explore the collection
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="rounded-full border border-black/15 bg-white/70 px-5 py-3 text-sm font-medium text-black/80 backdrop-blur transition hover:bg-white"
                data-testid="button-method"
              >
                See the method
              </button>
            </motion.div>

            <div className="mt-10 flex items-center gap-6 text-xs text-black/55">
              <div className="flex items-center gap-2" data-testid="stat-clarity">
                <div className="h-2 w-2 rounded-full bg-black/70" />
                IGI-grade options
              </div>
              <div className="flex items-center gap-2" data-testid="stat-carbon">
                <div className="h-2 w-2 rounded-full bg-black/70" />
                Traceable footprint
              </div>
              <div className="flex items-center gap-2" data-testid="stat-light">
                <div className="h-2 w-2 rounded-full bg-black/70" />
                Precision cut
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-[0_40px_120px_rgba(0,0,0,0.12)]"
              data-testid="hero-diamond"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${causticsTexture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                data-testid="hero-caustics"
              />
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.10),transparent_65%)]"
                data-testid="hero-caustics-overlay"
              />
              <div className="relative aspect-[4/5]">
                <div
                  className="absolute inset-0 grid place-items-center"
                  data-testid="hero-spline-placeholder"
                >
                  <div className="max-w-[18rem] text-center">
                    <div
                      className="mx-auto mb-3 h-10 w-10 rounded-full border border-black/10 bg-white/70 backdrop-blur"
                      data-testid="hero-spline-icon"
                    />
                    <div
                      className="font-serif text-xl tracking-[-0.02em]"
                      data-testid="text-hero-3d"
                    >
                      3D diamond scene
                    </div>
                    <div
                      className="mt-2 text-xs leading-relaxed text-black/60"
                      data-testid="text-hero-3d-sub"
                    >
                      Drop in your Spline publish URL to replace this cinematic placeholder.
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-0 aurum-noise"
                data-testid="hero-diamond-noise"
              />
            </motion.div>

            <div
              className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.10),transparent_60%)] blur-2xl"
              data-testid="hero-bloom-1"
            />
            <div
              className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.10),transparent_65%)] blur-2xl"
              data-testid="hero-bloom-2"
            />
          </div>
        </div>

        <motion.a
          href="#story"
          className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-black/65 backdrop-blur transition hover:bg-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          data-testid="link-scroll"
        >
          <span className="mr-2">Scroll</span>
          <motion.span
            className="inline-flex"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
            data-testid="icon-scroll"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="relative"
        data-testid="section-story"
      >
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70 backdrop-blur"
                data-testid="badge-story"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Traceable by design
              </div>
              <h2
                className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
                data-testid="text-story-title"
              >
                A diamond story you can scroll through.
              </h2>
              <p
                className="mt-4 max-w-md text-sm leading-relaxed text-black/65"
                data-testid="text-story-subtitle"
              >
                We treat provenance like craft: visible, measurable, and quietly
                beautiful.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/60 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.10)]">
              <div className="aurum-noise absolute inset-0" aria-hidden="true" />
              <div className="relative grid gap-3" data-testid="story-track">
                <div
                  className="h-1 w-24 rounded-full bg-black/80"
                  data-testid="story-progress"
                />
                <div className="text-xs text-black/60" data-testid="text-story-track">
                  Scroll drives a pinned sequence · Slow, intentional transitions
                </div>
                <div className="aurum-hairline" data-testid="line-story" />
                <div className="grid gap-2 text-xs text-black/55">
                  <div data-testid="text-story-step-1">01 · Origin</div>
                  <div data-testid="text-story-step-2">02 · Ethics</div>
                  <div data-testid="text-story-step-3">03 · Brilliance</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-16 min-h-[420px]">
            <div
              className="absolute inset-0 grid place-items-center"
              data-testid="story-panels"
            >
              <div
                className="mx-auto grid max-w-2xl gap-10"
                data-testid="story-panels-inner"
              >
                <div
                  className="rounded-[28px] border border-black/10 bg-white/70 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)]"
                  data-testid="story-panel-0"
                >
                  <div className="text-xs text-black/55" data-testid="text-panel-0-kicker">
                    What it is
                  </div>
                  <div
                    className="mt-3 font-serif text-2xl tracking-[-0.02em] md:text-3xl"
                    data-testid="text-panel-0-title"
                  >
                    Lab-grown diamonds are real diamonds.
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed text-black/65"
                    data-testid="text-panel-0-body"
                  >
                    Atom-for-atom identical—grown in a controlled environment where
                    temperature, pressure, and time shape crystal into light.
                  </p>
                </div>

                <div
                  className="rounded-[28px] border border-black/10 bg-white/70 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)]"
                  data-testid="story-panel-1"
                >
                  <div className="text-xs text-black/55" data-testid="text-panel-1-kicker">
                    Ethics
                  </div>
                  <div
                    className="mt-3 font-serif text-2xl tracking-[-0.02em] md:text-3xl"
                    data-testid="text-panel-1-title"
                  >
                    Sourced without compromise.
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed text-black/65"
                    data-testid="text-panel-1-body"
                  >
                    Measured provenance, modern energy choices, and transparency that
                    reads like a spec sheet—because luxury should be accountable.
                  </p>
                </div>

                <div
                  className="rounded-[28px] border border-black/10 bg-white/70 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.08)]"
                  data-testid="story-panel-2"
                >
                  <div className="text-xs text-black/55" data-testid="text-panel-2-kicker">
                    Brilliance
                  </div>
                  <div
                    className="mt-3 font-serif text-2xl tracking-[-0.02em] md:text-3xl"
                    data-testid="text-panel-2-title"
                  >
                    Same light. Zero shortcuts.
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed text-black/65"
                    data-testid="text-panel-2-body"
                  >
                    Cut and graded to the same standards—engineered for fire, scintillation,
                    and quiet inevitability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE */}
      <section id="scene" className="relative" data-testid="section-scene">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70 backdrop-blur"
                data-testid="badge-scene"
              >
                <Gem className="h-3.5 w-3.5" aria-hidden="true" />
                Interactive 3D
              </div>
              <h2
                className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
                data-testid="text-scene-title"
              >
                A diamond you can feel.
              </h2>
              <p
                className="mt-4 max-w-md text-sm leading-relaxed text-black/65"
                data-testid="text-scene-subtitle"
              >
                Use Spline to stage a floating diamond—subtle rotation, responsive light,
                and a calm background. This section is built to lazy-load.
              </p>
            </div>

            <div className="md:pl-6">
              <SplineEmbed title="Aurum diamond scene" />
            </div>
          </div>
        </div>
      </section>

      {/* AI VISUALS */}
      <section className="relative" data-testid="section-ai">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-28">
          <MockAIGenerator />
        </div>
      </section>

      {/* SCIENCE */}
      <section className="relative" data-testid="section-science">
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70 backdrop-blur"
                data-testid="badge-science"
              >
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                Craftsmanship · Science
              </div>
              <h2
                className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
                data-testid="text-science-title"
              >
                Precision is the new romance.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-black/65" data-testid="text-science-subtitle">
                Slow reveals, clean diagrams, and an editorial grid. Everything is built to
                feel calm—but engineered.
              </p>
            </div>

            <div className="grid gap-4">
              {[{
                id: "step-1",
                title: "Seed",
                body: "A diamond seed anchors the lattice—structure begins microscopic.",
              }, {
                id: "step-2",
                title: "Growth",
                body: "Carbon bonds accumulate under controlled conditions, layer by layer.",
              }, {
                id: "step-3",
                title: "Cut",
                body: "Optical symmetry is sculpted for fire, scintillation, and clarity.",
              }, {
                id: "step-4",
                title: "Grade",
                body: "Third-party grading verifies the stone like a technical artifact.",
              }].map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.9, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-[22px] border border-black/10 bg-white/70 p-6 shadow-[0_26px_80px_rgba(0,0,0,0.08)]"
                  data-testid={`card-science-${item.id}`}
                >
                  <div className="pointer-events-none absolute inset-0 aurum-noise" aria-hidden="true" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="font-serif text-xl" data-testid={`text-science-step-${item.id}`}>
                        {item.title}
                      </div>
                      <div className="text-xs text-black/55" data-testid={`text-science-index-${item.id}`}>
                        0{idx + 1}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-black/65" data-testid={`text-science-body-${item.id}`}>
                      {item.body}
                    </p>
                    <div className="mt-4 aurum-hairline" data-testid={`line-science-${item.id}`} />
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-black/55">
                      <div className="rounded-full border border-black/10 bg-white/60 px-3 py-1" data-testid={`pill-science-${item.id}-a`}>
                        Optical
                      </div>
                      <div className="rounded-full border border-black/10 bg-white/60 px-3 py-1" data-testid={`pill-science-${item.id}-b`}>
                        Thermal
                      </div>
                      <div className="rounded-full border border-black/10 bg-white/60 px-3 py-1" data-testid={`pill-science-${item.id}-c`}>
                        Provenance
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section
        id="collection"
        className="relative"
        data-testid="section-collection"
      >
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/70 backdrop-blur"
                data-testid="badge-collection"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Collection preview
              </div>
              <h2
                className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
                data-testid="text-collection-title"
              >
                Pieces designed like light.
              </h2>
              <p
                className="mt-4 text-sm leading-relaxed text-black/65"
                data-testid="text-collection-subtitle"
              >
                Minimal cards, soft glow, and careful hover depth. No checkout—just the
                vibe.
              </p>
            </div>
            <button
              type="button"
              className="rounded-full border border-black/15 bg-white/70 px-5 py-3 text-sm font-medium text-black/80 backdrop-blur transition hover:bg-white"
              data-testid="button-view-all"
            >
              View all
            </button>
          </div>

          <div
            className="mt-10 grid gap-4 md:grid-cols-3"
            data-testid="grid-collection"
          >
            {COLLECTION.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="group aurum-shimmer relative overflow-hidden rounded-[26px] border border-black/10 bg-white/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.08)]"
                data-testid={`card-collection-${item.id}`}
              >
                <div className="pointer-events-none absolute inset-0 aurum-noise" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <div
                        className="font-serif text-2xl tracking-[-0.02em]"
                        data-testid={`text-collection-name-${item.id}`}
                      >
                        {item.name}
                      </div>
                      <div
                        className="mt-2 text-sm text-black/60"
                        data-testid={`text-collection-note-${item.id}`}
                      >
                        {item.note}
                      </div>
                    </div>
                    <div
                      className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 backdrop-blur transition group-hover:scale-105"
                      data-testid={`icon-collection-${item.id}`}
                    >
                      <ArrowUpRight className="h-4 w-4 text-black/70" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-10 aurum-hairline" data-testid={`line-collection-${item.id}`} />

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-black/55" data-testid={`text-collection-meta-${item.id}`}>
                      Lab-grown · IGI options
                    </div>
                    <div className="text-sm font-medium" data-testid={`text-collection-price-${item.id}`}>
                      {item.price}
                    </div>
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(0,0,0,0.10), transparent 55%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.10), transparent 60%)",
                  }}
                  data-testid={`overlay-collection-${item.id}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative" data-testid="footer">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:px-10">
          <div className="aurum-hairline" data-testid="line-footer" />
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]"
            data-testid="footer-inner"
          >
            <div>
              <div
                className="font-serif text-2xl tracking-[-0.02em]"
                data-testid="text-footer-title"
              >
                Ethical luxury, built like a lab instrument.
              </div>
              <p
                className="mt-3 max-w-xl text-sm leading-relaxed text-black/65"
                data-testid="text-footer-body"
              >
                AURUM is a concept brand for premium lab-grown diamonds—designed to feel
                future-forward, minimal, and quietly cinematic.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-black/70">
              <a href="#" className="transition hover:text-black" data-testid="link-footer-privacy">
                Privacy
              </a>
              <a href="#" className="transition hover:text-black" data-testid="link-footer-sourcing">
                Sourcing
              </a>
              <a href="#" className="transition hover:text-black" data-testid="link-footer-contact">
                Contact
              </a>
            </div>
          </motion.div>

          <div
            className="mt-12 text-xs text-black/45"
            data-testid="text-footer-copy"
          >
            © {new Date().getFullYear()} AURUM. Prototype build.
          </div>
        </div>
      </footer>
    </div>
  );
}
