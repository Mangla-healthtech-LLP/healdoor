'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { TestimonialBlockData } from '@healdoor/types'
import { getMediaUrl } from '@healdoor/utils'

export function TestimonialBlock({
  sectionTitle,
  testimonialItems,
}: TestimonialBlockData) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 2 }
    }
  })
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  if (!testimonialItems || testimonialItems.length === 0) return null

  return (
    <section className="section-padding bg-section-alt-bg overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-dark">
              {sectionTitle || "What Our Patients Say"}
            </h2>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-dark hover:bg-teal hover:text-white hover:border-teal transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-text-dark disabled:hover:border-border"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-dark hover:bg-teal hover:text-white hover:border-teal transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-text-dark disabled:hover:border-border"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-6 -ml-6">
              {testimonialItems.map((item, index) => {
                const photoUrl = getMediaUrl(item.photo)
                
                return (
                  <div 
                    key={item.id || index} 
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-1.5rem)] lg:flex-[0_0_calc(33.333%-1.5rem)] pl-6"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/30 h-full flex flex-col relative group hover:shadow-md transition-shadow">
                      <Quote className="absolute top-6 right-6 w-10 h-10 text-teal-light opacity-50 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < (item.rating || 5) ? 'text-gold fill-gold' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-text-body text-lg italic leading-relaxed mb-8 flex-grow">
                        &quot;{item.review}&quot;
                      </p>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        {photoUrl ? (
                          <div className="w-14 h-14 rounded-full overflow-hidden relative bg-slate-100 shrink-0">
                            <Image 
                              src={photoUrl} 
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-light to-teal flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-lg font-heading">
                              {item.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-heading font-bold text-text-dark text-lg">
                            {item.name}
                          </h4>
                          {item.designation && (
                            <p className="text-text-muted text-sm">
                              {item.designation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === selectedIndex ? 'bg-teal w-8' : 'bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
