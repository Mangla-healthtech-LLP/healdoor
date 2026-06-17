import Link from 'next/link'
import type { CTABlockData } from '@healdoor/types'
import { ArrowRight } from 'lucide-react'

export function CTABlock({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundColor = 'teal',
}: CTABlockData) {
  let sectionClasses = ''
  let textClasses = ''
  let descClasses = ''
  let btnClasses = ''

  if (backgroundColor === 'teal') {
    sectionClasses = 'bg-[var(--cta-gradient)]'
    textClasses = 'text-white'
    descClasses = 'text-white/90'
    btnClasses = 'bg-orange text-white hover:bg-orange-hover shadow-lg shadow-orange/20'
  } else if (backgroundColor === 'dark') {
    sectionClasses = 'bg-[hsl(210,30%,12%)]'
    textClasses = 'text-white'
    descClasses = 'text-slate-300'
    btnClasses = 'bg-teal text-white hover:bg-teal-dark shadow-lg shadow-teal/20'
  } else {
    // white
    sectionClasses = 'bg-white border-y border-border/50'
    textClasses = 'text-text-dark'
    descClasses = 'text-text-body'
    btnClasses = 'bg-teal text-white hover:bg-teal-dark shadow-lg shadow-teal/20'
  }

  return (
    <section className={`section-padding ${sectionClasses}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${textClasses}`}>
            {title}
          </h2>
          
          {description && (
            <p className={`text-lg max-w-2xl mx-auto ${descClasses}`}>
              {description}
            </p>
          )}

          {buttonText && buttonLink && (
            <div className="pt-4">
              <Link
                href={buttonLink}
                className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-all hover:-translate-y-0.5 ${btnClasses}`}
              >
                {buttonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
