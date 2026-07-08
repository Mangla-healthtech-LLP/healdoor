"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { HeroSlide } from "@healdoor/types";
import { getMediaUrl, getMediaAlt } from "@healdoor/utils";

const defaultSlides: HeroSlide[] = [
  {
    badge: "LIMITED PERIOD OFFER",
    heading: "Flat 20% OFF\non All Oxygen\nConcentrators",
    bullets: [
      { text: "High Quality & Reliable" },
      { text: "Fast Delivery at Home" },
      { text: "Trusted by Thousands" },
    ],
    ctaText: "Shop Now",
    ctaHref: "/oxygen-equipment",
    qualityBadgeLine1: "BEST QUALITY",
    qualityBadgeLine2: "BEST CARE",
  },
  {
    badge: "NEW SERVICE",
    heading: "Expert Physiotherapy At Your Doorstep",
    bullets: [
      { text: "Certified BPT/MPT Therapists" },
      { text: "Personalized Treatment Plans" },
      { text: "Flexible Scheduling" },
    ],
    ctaText: "Book Now",
    ctaHref: "/physiotherapy",
    qualityBadgeLine1: "TRUSTED",
    qualityBadgeLine2: "EXPERTS",
  },
  {
    badge: "SAME DAY DELIVERY",
    heading: "ICU Setup At Home With Expert Support",
    bullets: [
      { text: "24/7 Medical Support" },
      { text: "Hospital-Grade Equipment" },
      { text: "Professional Nursing Staff" },
    ],
    ctaText: "Learn More",
    ctaHref: "/icu-at-home",
    qualityBadgeLine1: "24/7",
    qualityBadgeLine2: "SUPPORT",
  },
];

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const data = slides && slides.length > 0 ? slides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % data.length);
  }, [data.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
  }, [data.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const slide = data[current];
  const bgUrl = getMediaUrl(slide.image as Parameters<typeof getMediaUrl>[0]) || "/images/hero-banner.png";

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[hsl(200,30%,96%)] to-[hsl(200,40%,92%)] min-h-[300px] lg:min-h-[350px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container relative z-10 flex items-center min-h-[300px] lg:min-h-[350px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full py-6">
          {/* Left content */}
          <div className="space-y-3 sm:space-y-4 px-8 sm:px-12 lg:px-10">
            {slide.badge && (
              <span className="inline-block px-2 py-1 text-[9px] sm:px-3 sm:py-1.5 sm:text-[11px] font-bold tracking-widest uppercase bg-orange text-white rounded-sm animate-fade-in">
                {slide.badge}
              </span>
            )}

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-black sm:font-extrabold tracking-tight leading-[1.1] text-gray-900 sm:text-text-dark animate-fade-in-up whitespace-pre-line drop-shadow-sm sm:drop-shadow-none">
              {slide.heading}
            </h1>

            {slide.bullets && slide.bullets.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 pt-0.5 sm:pt-1">
                {slide.bullets.map((bullet, i) => (
                  <div
                    key={bullet.id || i}
                    className="flex items-center gap-2 text-sm text-text-body"
                  >
                    <span className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-teal" />
                    </span>
                    {bullet.text}
                  </div>
                ))}
              </div>
            )}

            {slide.ctaText && slide.ctaHref && (
              <a
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-orange text-white font-semibold rounded-full shadow-lg hover:bg-orange-hover hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                {slide.ctaText}
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Right — Product image + Quality Badge */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-[240px] h-[240px] xl:w-[280px] xl:h-[280px]">
              <Image
                src={bgUrl}
                alt={getMediaAlt(slide.image as Parameters<typeof getMediaAlt>[0]) || slide.heading}
                fill
                className="object-contain drop-shadow-xl transition-all duration-700"
                priority
              />
            </div>
            {/* Quality Badge */}
            {(slide.qualityBadgeLine1 || slide.qualityBadgeLine2) && (
              <div className="absolute bottom-4 right-4 xl:-right-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[hsl(170,65%,36%)] to-[hsl(170,70%,28%)] flex flex-col items-center justify-center shadow-xl text-white rotate-3 animate-fade-in">
                  <span className="text-[8px] font-bold tracking-widest uppercase opacity-90">
                    {slide.qualityBadgeLine1}
                  </span>
                  <span className="text-xs font-extrabold mt-0.5">
                    {slide.qualityBadgeLine2}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent sm:bg-white/40 sm:backdrop-blur-sm sm:shadow-sm flex items-center justify-center hover:bg-black/5 sm:hover:bg-white transition-all z-20 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8 sm:h-5 sm:w-5 text-text-body opacity-50 sm:opacity-100" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent sm:bg-white/40 sm:backdrop-blur-sm sm:shadow-sm flex items-center justify-center hover:bg-black/5 sm:hover:bg-white transition-all z-20 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8 sm:h-5 sm:w-5 text-text-body opacity-50 sm:opacity-100" />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {data.map((s, i) => (
          <button
            key={s.id || i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${i === current
              ? "w-8 bg-teal"
              : "w-2.5 bg-teal/30 hover:bg-teal/50"
              }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
