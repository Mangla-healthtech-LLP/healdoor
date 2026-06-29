import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ItemGridBlockData } from '@healdoor/types'
import { getMediaUrl, getMediaAlt } from '@healdoor/utils'
import * as LucideIcons from 'lucide-react'

// Map of allowed lucide icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconMap = LucideIcons as any

export function ItemGridBlock({
  sectionTitle,
  sectionDescription,
  columns = '3',
  items,
}: ItemGridBlockData) {
  if (!items || items.length === 0) return null

  // Determine grid columns based on CMS setting
  const gridColsClass = columns === '2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'

  return (
    <section className="section-padding bg-section-alt-bg">
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
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-6 max-w-7xl mx-auto`}>
          {items.map((item, index) => {
            const Icon = item.icon && IconMap[item.icon] ? IconMap[item.icon] : null
            const imageUrl = getMediaUrl(item.image) || '/images/service-medical.png'
            const altText = getMediaAlt(item.image) || item.title

            return (
              <div
                key={item.id || index}
                className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-border/40 group"
              >
                {/* Left Side: Image */}
                <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto bg-slate-50 flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Right Side: Content */}
                <div className="p-6 flex flex-col w-full sm:w-3/5 relative">
                  {Icon && (
                    <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mb-4 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                  )}
                  
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-2 leading-snug">
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className="text-sm text-text-body leading-relaxed mb-8 flex-1">
                      {item.description}
                    </p>
                  )}

                  {/* Arrow Link Button */}
                  {item.link && (
                    <Link
                      href={item.link}
                      className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-sm shadow-orange-500/20 transition-colors"
                      aria-label={`Learn more about ${item.title}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
