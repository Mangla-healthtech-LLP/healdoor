"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Wind,
  Award,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { HeroSlide } from "@healdoor/types";
import { getMediaUrl, getMediaAlt } from "@healdoor/utils";

/* ──────────────────────── Default slides ──────────────────────── */

const defaultSlides: HeroSlide[] = [
  {
    badge: "Breathe Easy. We're Here For You.",
    heading: "Oxygen Equipment\nDelivered to Your Doorstep",
    bullets: [
      { text: "5L & 10L Concentrators" },
      { text: "Rental Available" },
      { text: "Same Day Delivery" },
      { text: "Installation Included" },
    ],
    ctaText: "Rent Equipment",
    ctaHref: "/rent",
    secondaryCtaText: "View Products",
    secondaryCtaHref: "/products",
    qualityBadgeLine1: "500+",
    qualityBadgeLine2: "Happy Families Served",
  },
  {
    badge: "EXPERT CARE",
    heading: "Professional Physiotherapy\nAt Your Doorstep",
    bullets: [
      { text: "Certified Therapists" },
      { text: "Personalized Care" },
      { text: "Flexible Scheduling" },
      { text: "Faster Recovery" },
    ],
    ctaText: "Book Now",
    ctaHref: "/physiotherapy",
    secondaryCtaText: "Learn More",
    secondaryCtaHref: "/services",
    qualityBadgeLine1: "4.9★",
    qualityBadgeLine2: "Patient Rating",
  },
];

/* ──────────────────────── Decorative SVGs ──────────────────────── */

function MedicalCross({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 0h4v18h18v4H22v18h-4V22H0v-4h18V0z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ──────────────────────── Floating Quality Badge ──────────────────────── */

function QualityBadge({
  line1,
  line2,
}: {
  line1?: string | null;
  line2?: string | null;
}) {
  if (!line1 && !line2) return null;
  return (
    <div className="absolute bottom-8 right-24 z-20 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/50 hero-stagger-4 hero-badge-pulse max-w-[200px]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
          <Award className="h-5 w-5 text-teal" />
        </div>
        <div>
          {line1 && (
            <p className="text-xl font-bold text-[#112a46] leading-tight">
              {line1}
            </p>
          )}
          {line2 && (
            <p className="text-xs text-text-muted leading-tight">{line2}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────── Progress Dots ──────────────────────── */

function ProgressDots({
  count,
  current,
  onSelect,
  className = "",
  variant = "light",
}: {
  count: number;
  current: number;
  onSelect: (i: number) => void;
  className?: string;
  variant?: "light" | "dark";
}) {
  const bgInactive =
    variant === "light" ? "bg-teal/25" : "bg-white/30";
  const bgActive = variant === "light" ? "bg-teal/20" : "bg-white/30";
  const fillClass = variant === "light" ? "" : ""; // progress-fill handles color via CSS var

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`h-2 rounded-full transition-all cursor-pointer ${
            i === current
              ? `w-8 ${bgActive} hero-progress-dot active`
              : `w-2 ${bgInactive} hover:bg-teal/40`
          } ${fillClass}`}
          style={
            variant === "dark" && i === current
              ? ({ "--teal": "#fff" } as React.CSSProperties)
              : undefined
          }
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ──────────────────────── Main Component ──────────────────────── */

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const data = slides && slides.length > 0 ? slides : defaultSlides;

  /* ── Embla – Desktop ── */
  const [desktopRef, desktopApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  /* ── Embla – Mobile ── */
  const [mobileRef, mobileApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnFocusIn: true }),
  ]);

  const [desktopIndex, setDesktopIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [arrowsVisible, setArrowsVisible] = useState(false);

  /* sync index with embla */
  useEffect(() => {
    if (!desktopApi) return;
    const onSelect = () => setDesktopIndex(desktopApi.selectedScrollSnap());
    desktopApi.on("select", onSelect);
    onSelect();
    return () => { desktopApi.off("select", onSelect); };
  }, [desktopApi]);

  useEffect(() => {
    if (!mobileApi) return;
    const onSelect = () => setMobileIndex(mobileApi.selectedScrollSnap());
    mobileApi.on("select", onSelect);
    onSelect();
    return () => { mobileApi.off("select", onSelect); };
  }, [mobileApi]);

  const desktopPrev = useCallback(() => desktopApi?.scrollPrev(), [desktopApi]);
  const desktopNext = useCallback(() => desktopApi?.scrollNext(), [desktopApi]);

  /* We derive the animation reset keys directly from the index variables below */

  return (
    <section aria-label="Hero carousel" className="relative">
      {/* ===================== DESKTOP VIEW ===================== */}
      <div
        className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-[#e8f3f8] via-[#eef7fa] to-[#dff0f5] min-h-[600px]"
        onMouseEnter={() => setArrowsVisible(true)}
        onMouseLeave={() => setArrowsVisible(false)}
      >
        {/* Decorative elements */}
        <MedicalCross className="absolute top-[20%] left-[5%] opacity-[0.08] text-teal hero-float w-10 h-10" />
        <MedicalCross className="absolute top-[55%] left-[42%] opacity-[0.06] text-teal hero-float-delayed w-7 h-7" />
        <div className="absolute bottom-[18%] left-[28%] opacity-[0.06] hero-float-delayed">
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            className="text-teal fill-current"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>
        {/* Soft radial glow */}
        <div
          className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(35,158,163,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Embla carousel */}
        <div ref={desktopRef} className="hero-embla hero-desktop-embla">
          <div className="hero-embla__container">
            {data.map((slide, idx) => {
              const bgUrl =
                getMediaUrl(
                  slide.image as Parameters<typeof getMediaUrl>[0]
                ) || "/images/hero-banner.png";

              return (
                <div
                  key={slide.id || idx}
                  className="hero-embla__slide relative min-h-[600px] flex items-center"
                >
                  {/* Right image (Full bleed on the right) */}
                  <div className="w-[50vw] h-full absolute right-0 top-0 z-0">
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#e8f3f8] to-transparent z-10" />
                    <Image
                      src={bgUrl}
                      alt={
                        getMediaAlt(
                          slide.image as Parameters<typeof getMediaAlt>[0]
                        ) || slide.heading
                      }
                      fill
                      className="object-cover object-left-top"
                      priority={idx === 0}
                      sizes="50vw"
                    />
                    {/* Floating quality badge */}
                    <QualityBadge
                      line1={slide.qualityBadgeLine1}
                      line2={slide.qualityBadgeLine2}
                    />
                  </div>

                  {/* Split layout */}
                  <div className="container relative z-10 flex flex-row items-center justify-between w-full h-full py-20">
                    {/* Left content */}
                    <div
                      key={`desk-anim-${desktopIndex}`}
                      className="w-[55%] space-y-6 px-10 z-20"
                    >
                      {slide.badge && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal/10 text-teal rounded-full text-xs font-semibold hero-stagger-1">
                          <Wind className="w-4 h-4" />
                          <span>{slide.badge}</span>
                        </div>
                      )}

                      <h1 className="font-heading text-[3.5rem] font-bold text-[#112a46] leading-[1.1] hero-stagger-2 whitespace-pre-line">
                        {slide.heading}
                      </h1>

                      {slide.bullets && slide.bullets.length > 0 && (
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-4 hero-stagger-3">
                          {slide.bullets.map((bullet, i) => (
                            <div
                              key={bullet.id || i}
                              className="flex items-center gap-3 text-[15px] font-medium text-gray-700"
                            >
                              <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center shrink-0 text-white shadow-sm">
                                <ShieldCheck className="h-4 w-4" />
                              </div>
                              {bullet.text}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 pt-6 hero-stagger-4">
                        {slide.ctaText && slide.ctaHref && (
                          <a
                            href={slide.ctaHref}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base bg-orange text-white font-semibold rounded-full shadow-lg hover:bg-orange-hover hover:shadow-xl transition-all hover:-translate-y-0.5 min-w-[200px]"
                          >
                            <ShieldCheck className="h-5 w-5 shrink-0" />
                            <span className="whitespace-nowrap">
                              {slide.ctaText}
                            </span>
                            <ArrowRight className="h-5 w-5 shrink-0" />
                          </a>
                        )}

                        {slide.secondaryCtaText && slide.secondaryCtaHref && (
                          <a
                            href={slide.secondaryCtaHref}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base border-2 border-teal text-teal font-semibold rounded-full hover:bg-teal/5 transition-all hover:-translate-y-0.5 min-w-[200px]"
                          >
                            <ShieldCheck className="h-5 w-5 shrink-0" />
                            <span className="whitespace-nowrap">
                              {slide.secondaryCtaText}
                            </span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation arrows (appear on hover) */}
        <button
          onClick={desktopPrev}
          className={`absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-30 cursor-pointer text-gray-500 hover:text-teal ${
            arrowsVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4"
          } transition-all duration-300`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={desktopNext}
          className={`absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all z-30 cursor-pointer text-gray-500 hover:text-teal ${
            arrowsVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-4"
          } transition-all duration-300`}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Desktop progress dots */}
        <ProgressDots
          count={data.length}
          current={desktopIndex}
          onSelect={(i) => desktopApi?.scrollTo(i)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
          variant="light"
        />
      </div>

      {/* ===================== MOBILE VIEW ===================== */}
      <div className="lg:hidden">
        <div ref={mobileRef} className="hero-embla">
          <div className="hero-embla__container">
            {data.map((slide, idx) => {
              const bgUrl =
                getMediaUrl(
                  slide.image as Parameters<typeof getMediaUrl>[0]
                ) || "/images/hero-banner.png";

              return (
                <div
                  key={slide.id || idx}
                  className="hero-embla__slide relative"
                  style={{ height: "calc(100svh - 64px)" }}
                >
                  {/* Full-bleed background image */}
                  <Image
                    src={bgUrl}
                    alt={
                      getMediaAlt(
                        slide.image as Parameters<typeof getMediaAlt>[0]
                      ) || slide.heading
                    }
                    fill
                    className="object-cover"
                    priority={idx === 0}
                    sizes="100vw"
                  />

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 hero-gradient-overlay z-10" />

                  {/* Text content overlay at bottom */}
                  <div
                    key={`mob-anim-${mobileIndex}`}
                    className="absolute inset-x-0 bottom-0 z-20 px-5 pb-32 pt-24 flex flex-col gap-3"
                  >
                    {slide.badge && (
                      <div className="inline-flex items-center self-start gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm text-white rounded-full text-[11px] font-semibold hero-stagger-1">
                        <Wind className="w-3.5 h-3.5" />
                        <span>{slide.badge}</span>
                      </div>
                    )}

                    <h1 className="font-heading text-[26px] sm:text-[30px] font-bold text-white leading-[1.15] whitespace-pre-line hero-stagger-2 drop-shadow-lg">
                      {slide.heading}
                    </h1>

                    {slide.bullets && slide.bullets.length > 0 && (
                      <div className="grid grid-cols-2 gap-y-2 gap-x-3 pt-1 hero-stagger-3">
                        {slide.bullets.map((bullet, i) => (
                          <div
                            key={bullet.id || i}
                            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-white/90 leading-tight"
                          >
                            <div className="w-4 h-4 rounded-full bg-teal flex items-center justify-center shrink-0 text-white shadow-sm">
                              <ShieldCheck className="h-2.5 w-2.5" />
                            </div>
                            <span>{bullet.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2.5 pt-3 hero-stagger-4">
                      {slide.ctaText && slide.ctaHref && (
                        <a
                          href={slide.ctaHref}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm bg-orange text-white font-semibold rounded-full shadow-lg hover:bg-orange-hover transition-all"
                        >
                          <ShieldCheck className="h-4 w-4 shrink-0" />
                          <span className="whitespace-nowrap">
                            {slide.ctaText}
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </a>
                      )}
                      {slide.secondaryCtaText && slide.secondaryCtaHref && (
                        <a
                          href={slide.secondaryCtaHref}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all"
                        >
                          <span className="whitespace-nowrap">
                            {slide.secondaryCtaText}
                          </span>
                        </a>
                      )}
                    </div>

                    {/* Mobile dots */}
                    <ProgressDots
                      count={data.length}
                      current={mobileIndex}
                      onSelect={(i) => mobileApi?.scrollTo(i)}
                      className="justify-center pt-3"
                      variant="dark"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
