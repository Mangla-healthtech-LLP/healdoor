import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ServiceItemGridBlockData } from '@healdoor/types'
import { getMediaUrl, getMediaAlt } from '@healdoor/utils'

export function ServiceItemGridBlock({
  sectionTitle,
  sectionDescription,
  columns = '2',
  items,
}: ServiceItemGridBlockData) {
  if (!items || items.length === 0) return null

  // Determine grid columns based on CMS setting
  let gridColsClass = 'grid-cols-1 sm:grid-cols-2 max-w-4xl'
  if (columns === '1') {
    gridColsClass = 'grid-cols-1 max-w-2xl'
  } else if (columns === '3') {
    gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl'
  } else if (columns === '4') {
    gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl'
  }

  return (
    <section className="section-padding-sm bg-white">
      <div className="container">
        {/* Header */}
        {(sectionTitle || sectionDescription) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {sectionTitle && (
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-4">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-lg text-text-body">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={`grid ${gridColsClass} gap-6 mx-auto`}>
          {items.map((item, index) => {
            const imageUrl = getMediaUrl(item.image) || '/images/physio-home.png'
            const altText = getMediaAlt(item.image) || item.title
            const href = item.link || item.href || '#'

            return (
              <Link
                key={item.id || item.title || index}
                href={href}
                className={`group relative block rounded-2xl overflow-hidden h-[280px] sm:h-[320px] shadow-md hover:shadow-xl transition-all hover:-translate-y-1 ${
                  item.upcoming ? 'pointer-events-auto' : ''
                }`}
              >
                {/* Image */}
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                {/* Upcoming badge */}
                {item.upcoming && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-orange text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">
                    Coming Soon
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-white/80 leading-relaxed mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                      item.upcoming
                        ? 'bg-white/20 text-white/50'
                        : 'bg-teal text-white group-hover:bg-orange'
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
