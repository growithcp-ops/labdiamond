import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Gem, Sparkles } from "lucide-react";

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

const FALLBACK_IMAGES = [diamondVisual1, diamondVisual2];

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

async function mockGenerateDiamondImage(_prompt: string): Promise<{ url: string }> {
  await new Promise((r) => setTimeout(r, 650));
  const url = FALLBACK_IMAGES[Math.random() > 0.5 ? 0 : 1];
  return { url };
}

function SectionShell({
  id,
  testId,
  className,
  children,
}: {
  id?: string;
  testId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        "relative min-h-[100svh] bg-background text-foreground" +
        (className ? ` ${className}` : "")
      }
      data-testid={testId}
    >
      <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 md:px-10">
        {children}
      </div>
    </section>
  );
}

function SplineIframe({
  title,
  splineSrc,
  fallbackSrc,
}: {
  title: string;
  splineSrc: string;
  fallbackSrc: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-black/10 bg-white"
      data-testid="spline-embed-wrap"
    >
      {!hasError ? (
        <iframe
          title={title}
          src={splineSrc}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          allow="fullscreen"
          onError={() => setHasError(true)}
          data-testid="iframe-spline"
        />
      ) : (
        <img
          src={fallbackSrc}
          alt="Diamond fallback"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          data-testid="img-spline-fallback"
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.06),transparent_55%)]"
        data-testid="spline-overlay"
      />
    </div>
  );
}

export default function Home() {
  useLenis(true);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const [aiPrompt, setAiPrompt] = useState(
    "Hyper-realistic lab-grown diamond, clean studio lighting, white seamless background",
  );
  const [aiUrls, setAiUrls] = useState<string[]>(() => [diamondVisual1, diamondVisual2]);
  const [isGenerating, setIsGenerating] = useState(false);

  const storyParagraphs = useMemo(
    () => [
      {
        id: "p1",
        text: "Lab-grown diamonds are chemically and optically identical to mined diamonds—created under controlled conditions, then cut to precision.",
      },
      {
        id: "p2",
        text: "Ethical luxury means traceability, modern energy choices, and transparency that reads like a specification.",
      },
      {
        id: "p3",
        text: "Same brilliance. Zero compromise. A future-forward diamond that respects both beauty and impact.",
      },
    ],
    [],
  );

  useEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = [
        {
          trigger: "[data-testid='section-hero']",
          start: "top top",
          end: "+=190%",
          tl: (tl: gsap.core.Timeline) => {
            tl.fromTo(
              "[data-testid='hero-content']",
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
            )
              .to({}, { duration: 0.5 })
              .to("[data-testid='hero-content']", {
                opacity: 0,
                y: -12,
                duration: 0.2,
                ease: "power2.out",
              });
          },
        },
        {
          trigger: "[data-testid='section-diamond']",
          start: "top top",
          end: "+=200%",
          tl: (tl: gsap.core.Timeline) => {
            tl.fromTo(
              "[data-testid='diamond-embed']",
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
            )
              .to({}, { duration: 0.5 })
              .to("[data-testid='diamond-embed']", {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.out",
              });
          },
        },
        {
          trigger: "[data-testid='section-story']",
          start: "top top",
          end: "+=230%",
          tl: (tl: gsap.core.Timeline) => {
            const sel = (i: number) => `[data-testid='story-paragraph-${i}']`;

            tl.set([sel(0), sel(1), sel(2)], { opacity: 0, y: 18 });

            tl.to(sel(0), { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
              .to({}, { duration: 0.5 })
              .to(sel(0), { opacity: 0, y: -10, duration: 0.2, ease: "power2.out" })
              .to(sel(1), { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
              .to({}, { duration: 0.5 })
              .to(sel(1), { opacity: 0, y: -10, duration: 0.2, ease: "power2.out" })
              .to(sel(2), { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" })
              .to({}, { duration: 0.4 })
              .to(sel(2), { opacity: 0, y: -10, duration: 0.2, ease: "power2.out" });
          },
        },
        {
          trigger: "[data-testid='section-ai']",
          start: "top top",
          end: "+=210%",
          tl: (tl: gsap.core.Timeline) => {
            const max = 3;
            for (let i = 0; i < max; i++) {
              tl.fromTo(
                `[data-testid='ai-image-${i}']`,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
              )
                .to({}, { duration: 0.5 })
                .to(`[data-testid='ai-image-${i}']`, {
                  opacity: 0,
                  y: -8,
                  duration: 0.2,
                  ease: "power2.out",
                });
            }
          },
        },
        {
          trigger: "[data-testid='section-craft']",
          start: "top top",
          end: "+=200%",
          tl: (tl: gsap.core.Timeline) => {
            tl.fromTo(
              "[data-testid='craft-block-0']",
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
            )
              .to({}, { duration: 0.4 })
              .to("[data-testid='craft-block-0']", {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.out",
              })
              .fromTo(
                "[data-testid='craft-block-1']",
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
              )
              .to({}, { duration: 0.4 })
              .to("[data-testid='craft-block-1']", {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.out",
              })
              .fromTo(
                "[data-testid='craft-block-2']",
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
              )
              .to({}, { duration: 0.4 })
              .to("[data-testid='craft-block-2']", {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.out",
              });
          },
        },
      ];

      sections.forEach((s) => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: s.trigger,
            start: s.start,
            end: s.end,
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });
        s.tl(tl);
      });

      ScrollTrigger.create({
        trigger: "[data-testid='footer']",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            "[data-testid='footer-inner']",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          );
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  async function onGenerate() {
    if (isGenerating) return;
    setIsGenerating(true);

    const res = await mockGenerateDiamondImage(aiPrompt);
    setAiUrls((prev) => {
      const next = [res.url, ...prev].slice(0, 3);
      return next;
    });

    setIsGenerating(false);
  }

  const aiVisible = [aiUrls[0], aiUrls[1], aiUrls[2]].filter(Boolean) as string[];

  return (
    <div ref={rootRef} className="min-h-screen" data-testid="page-home">
      {/* HERO (PINNED) */}
      <SectionShell testId="section-hero">
        <div className="w-full" data-testid="hero-content">
          <header
            className="mb-14 flex items-center justify-between"
            data-testid="header-nav"
          >
            <div className="flex items-center gap-3" data-testid="brand-wrap">
              <div
                className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white"
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
                <div className="text-xs text-black/55" data-testid="text-brand-sub">
                  lab-grown diamonds
                </div>
              </div>
            </div>

            <div className="hidden items-center gap-6 text-xs text-black/60 md:flex">
              <a
                href="#collection"
                className="transition hover:text-black"
                data-testid="link-collection"
              >
                Collection
              </a>
              <button
                type="button"
                className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
                data-testid="button-consult"
              >
                Book a consult
              </button>
            </div>
          </header>

          <div className="max-w-3xl">
            <h1
              className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl"
              data-testid="text-hero-title"
            >
              Pure Brilliance.
            </h1>
            <p
              className="mt-6 max-w-xl text-sm leading-relaxed text-black/65"
              data-testid="text-hero-subtitle"
            >
              Lab-grown diamonds, engineered with calm precision—ethical, traceable,
              and identical in brilliance.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* DIAMOND REVEAL (PINNED) */}
      <SectionShell id="scene" testId="section-diamond">
        <div className="grid w-full gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>
            <div
              className="text-xs tracking-[0.18em] text-black/55"
              data-testid="text-diamond-kicker"
            >
              DIAMOND
            </div>
            <h2
              className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
              data-testid="text-diamond-title"
            >
              One scene. Fixed camera.
            </h2>
            <p
              className="mt-4 max-w-md text-sm leading-relaxed text-black/65"
              data-testid="text-diamond-subtitle"
            >
              Embedded via iframe. If the scene fails to load, we fall back to a static
              studio image.
            </p>
          </div>

          <div data-testid="diamond-embed">
            <SplineIframe
              title="Aurum diamond"
              splineSrc="https://my.spline.design/placeholder"
              fallbackSrc={diamondVisual1}
            />
          </div>
        </div>
      </SectionShell>

      {/* STORY (PINNED) */}
      <SectionShell id="story" testId="section-story">
        <div className="w-full">
          <div className="mb-12 max-w-2xl">
            <div
              className="text-xs tracking-[0.18em] text-black/55"
              data-testid="text-story-kicker"
            >
              STORY
            </div>
            <h2
              className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
              data-testid="text-story-title"
            >
              Scroll-controlled clarity.
            </h2>
          </div>

          <div className="relative min-h-[240px] max-w-3xl">
            {storyParagraphs.map((p, i) => (
              <p
                key={p.id}
                className="absolute left-0 top-0 text-sm leading-relaxed text-black/70"
                data-testid={`story-paragraph-${i}`}
              >
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* AI VISUALS (PINNED) */}
      <SectionShell testId="section-ai">
        <div className="grid w-full gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-black/55"
              data-testid="text-ai-kicker"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI VISUALS
            </div>
            <h2
              className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
              data-testid="text-ai-title"
            >
              One image at a time.
            </h2>
            <p
              className="mt-4 max-w-md text-sm leading-relaxed text-black/65"
              data-testid="text-ai-subtitle"
            >
              This prototype mocks an image API and returns placeholder URLs.
            </p>

            <label className="mt-8 block" data-testid="label-ai-prompt">
              <span className="mb-2 block text-xs text-black/55" data-testid="text-ai-prompt-label">
                Prompt
              </span>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[96px] w-full rounded-[16px] border border-black/10 bg-white px-4 py-3 text-sm text-black/80 outline-none focus:ring-2 focus:ring-black/10"
                data-testid="input-ai-prompt"
              />
            </label>

            <button
              type="button"
              onClick={onGenerate}
              disabled={isGenerating}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              data-testid="button-ai-generate"
            >
              {isGenerating ? "Generating…" : "Generate"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="relative" data-testid="ai-stage">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-black/10 bg-white"
              data-testid="ai-frame"
            >
              {aiVisible.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt="Generated diamond"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  data-testid={`ai-image-${i}`}
                />
              ))}
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.75),transparent_55%)]"
                data-testid="ai-overlay"
              />
            </div>
          </div>
        </div>
      </SectionShell>

      {/* CRAFT (PINNED) */}
      <SectionShell testId="section-craft">
        <div className="w-full">
          <div className="mb-12 max-w-2xl">
            <div
              className="text-xs tracking-[0.18em] text-black/55"
              data-testid="text-craft-kicker"
            >
              CRAFT
            </div>
            <h2
              className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
              data-testid="text-craft-title"
            >
              Science, laid out cleanly.
            </h2>
          </div>

          <div className="relative min-h-[300px]">
            <div
              className="absolute inset-0 grid gap-4 md:grid-cols-3"
              data-testid="craft-grid"
            >
              <div
                className="rounded-[22px] border border-black/10 bg-white p-6"
                data-testid="craft-block-0"
              >
                <div className="text-xs text-black/55" data-testid="text-craft-0-kicker">
                  Seed
                </div>
                <div className="mt-3 font-serif text-2xl" data-testid="text-craft-0-title">
                  Lattice begins.
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed text-black/65"
                  data-testid="text-craft-0-body"
                >
                  A seed crystal anchors structure and symmetry.
                </p>
              </div>

              <div
                className="rounded-[22px] border border-black/10 bg-white p-6"
                data-testid="craft-block-1"
              >
                <div className="text-xs text-black/55" data-testid="text-craft-1-kicker">
                  Growth
                </div>
                <div className="mt-3 font-serif text-2xl" data-testid="text-craft-1-title">
                  Controlled layers.
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed text-black/65"
                  data-testid="text-craft-1-body"
                >
                  Carbon bonds accumulate under monitored conditions.
                </p>
              </div>

              <div
                className="rounded-[22px] border border-black/10 bg-white p-6"
                data-testid="craft-block-2"
              >
                <div className="text-xs text-black/55" data-testid="text-craft-2-kicker">
                  Cut
                </div>
                <div className="mt-3 font-serif text-2xl" data-testid="text-craft-2-title">
                  Optical symmetry.
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed text-black/65"
                  data-testid="text-craft-2-body"
                >
                  Precision angles tuned for fire and clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* COLLECTION (NOT PINNED) */}
      <section
        id="collection"
        className="bg-background text-foreground"
        data-testid="section-collection"
      >
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10">
          <div className="max-w-2xl">
            <div
              className="text-xs tracking-[0.18em] text-black/55"
              data-testid="text-collection-kicker"
            >
              COLLECTION
            </div>
            <h2
              className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl"
              data-testid="text-collection-title"
            >
              Minimal preview.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3" data-testid="grid-collection">
            {COLLECTION.map((item) => (
              <div
                key={item.id}
                className="group rounded-[24px] border border-black/10 bg-white p-6 transition duration-300 hover:scale-[1.01] hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
                data-testid={`card-collection-${item.id}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className="font-serif text-2xl"
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
                    className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white transition group-hover:opacity-90"
                    data-testid={`icon-collection-${item.id}`}
                  >
                    <ArrowUpRight className="h-4 w-4 text-black/70" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-10 h-px w-full bg-black/10" data-testid={`line-collection-${item.id}`} />

                <div className="mt-4 flex items-center justify-between">
                  <div
                    className="text-xs text-black/55"
                    data-testid={`text-collection-meta-${item.id}`}
                  >
                    Lab-grown · IGI options
                  </div>
                  <div
                    className="text-sm font-medium"
                    data-testid={`text-collection-price-${item.id}`}
                  >
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER (STATIC, CALM FADE-IN ONLY) */}
      <footer className="bg-background text-foreground" data-testid="footer">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:px-10">
          <div className="h-px w-full bg-black/10" data-testid="line-footer" />
          <div
            className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]"
            data-testid="footer-inner"
          >
            <div>
              <div className="font-serif text-2xl" data-testid="text-footer-title">
                Ethical luxury, measured.
              </div>
              <p
                className="mt-3 max-w-xl text-sm leading-relaxed text-black/65"
                data-testid="text-footer-body"
              >
                AURUM is a concept brand for premium lab-grown diamonds—calm, minimal,
                and scroll-controlled.
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
          </div>

          <div className="mt-12 text-xs text-black/45" data-testid="text-footer-copy">
            © {new Date().getFullYear()} AURUM. Prototype build.
          </div>
        </div>
      </footer>
    </div>
  );
}
