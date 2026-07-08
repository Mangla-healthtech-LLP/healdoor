'use client'

import { Play, BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import type { DoctorReel } from '@healdoor/types'
import { getMediaUrl } from '@healdoor/utils'

const defaultDoctorReels: Partial<DoctorReel>[] = [
  {
    doctorName: 'Dr. Rahul Verma',
    description: 'Learn about the importance of regular health checkups.',
    instagramLink: '#',
    isVerified: true,
  },
  {
    doctorName: 'Dr. Priya Sharma',
    description: '5 tips for maintaining a healthy lifestyle.',
    instagramLink: '#',
    isVerified: true,
  },
  {
    doctorName: 'Dr. Shubham Mangla',
    description: 'Understanding common respiratory issues.',
    instagramLink: '#',
    isVerified: true,
  },
]

const videoFallbackImages = [
  '/images/service-oxygen.png',
  '/images/service-oxygen.png',
  '/images/service-oxygen.png',
]

interface DoctorReelsSectionProps {
  heading?: string | null
  description?: string | null
  reels?: DoctorReel[]
}

export function DoctorReelsSection({
  heading = 'Doctor Reels',
  description = 'Reels of doctors we have currently with us.',
  reels,
}: DoctorReelsSectionProps) {
  const [videoEmblaRef] = useEmblaCarousel({ loop: false, align: 'center' })

  const doctorReels = reels && reels.length > 0 ? reels : defaultDoctorReels

  return (
    <section id="doctor-reels" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            {heading}
          </h2>
          <p className="text-base text-text-body max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Video Reels */}
        {doctorReels.length > 0 && (
          <div className="overflow-hidden -mx-4 px-4 mb-8" ref={videoEmblaRef}>
            <div className="flex -ml-4 justify-center">
              {doctorReels.map((t, index) => {
                const thumbUrl =
                  getMediaUrl(
                    t.thumbnail as Parameters<typeof getMediaUrl>[0],
                  ) ||
                  videoFallbackImages[index] ||
                  '/images/service-oxygen.png'

                const videoUrl = getMediaUrl(
                  t.videoFile as Parameters<typeof getMediaUrl>[0],
                )
                const cardLink = t.instagramLink
                const CardWrapper = cardLink ? 'a' : 'div'
                const cardProps = cardLink
                  ? {
                      href: cardLink,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {}

                return (
                  <div
                    key={(t as DoctorReel).id || t.doctorName || index}
                    className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 pl-4"
                  >
                    <CardWrapper
                      {...cardProps}
                      className="block relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer h-full"
                    >
                      {videoUrl ? (
                        <video
                          src={videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Image
                          src={thumbUrl}
                          alt={`Reel from ${t.doctorName}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Play button */}
                      {!videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Share/reel icon */}
                      <div className="absolute top-3 right-3 pointer-events-none">
                        <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg
                            className="h-3.5 w-3.5 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                        <p className="text-xs text-white/90 leading-relaxed line-clamp-3 mb-2">
                          {t.description}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-white/70 font-medium">
                            {t.doctorName}
                          </span>
                          {t.isVerified && (
                            <BadgeCheck className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
                          )}
                        </div>
                      </div>
                    </CardWrapper>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
