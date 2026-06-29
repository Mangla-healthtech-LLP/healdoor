import Image from 'next/image'
import Link from 'next/link'
import type { HeroBlockData } from '@healdoor/types'
import { getMediaUrl, getMediaAlt } from '@healdoor/utils'

export function HeroBlock({
  heading,
  subHeading,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage,
  alignment = 'left',
  showStats = false,
}: HeroBlockData) {
  const bgUrl = getMediaUrl(backgroundImage) || '/images/hero-banner.png'

  let alignClasses = 'items-start text-left'
  if (alignment === 'center') alignClasses = 'items-center text-center'
  if (alignment === 'right') alignClasses = 'items-end text-right ml-auto'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(170,65%,30%)] via-[hsl(180,55%,35%)] to-[hsl(200,70%,35%)] min-h-[250px] lg:min-h-[350px]">
      <div className="absolute inset-0">
        <Image
          src={bgUrl}
          alt={getMediaAlt(backgroundImage)}
          fill
          className="object-cover opacity-30 transition-all duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(170,65%,22%)]/90 via-[hsl(170,65%,28%)]/70 to-transparent" />
      </div>

      <div className="container relative z-10 flex items-center min-h-[320px] lg:min-h-[400px]">
        <div className={`flex flex-col w-full py-12 max-w-2xl ${alignClasses}`}>
          <div className="space-y-6 text-white">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] animate-fade-in-up">
              {heading}
            </h1>

            {subHeading && (
              <p className="text-lg sm:text-xl text-white/90 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                {subHeading}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {primaryButtonText && primaryButtonLink && (
                <Link
                  href={primaryButtonLink}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-orange text-white font-semibold rounded-full shadow-lg hover:bg-orange-hover hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  {primaryButtonText}
                </Link>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <Link
                  href={secondaryButtonLink}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>

            {showStats && (
              <div className="flex items-center gap-8 pt-8 mt-8 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">10k+</div>
                  <div className="text-sm text-white/70">Patients Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">4.9/5</div>
                  <div className="text-sm text-white/70">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">24/7</div>
                  <div className="text-sm text-white/70">Support</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
