'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import type { PricingGridBlockData } from '@healdoor/types'
import { slugify } from '@healdoor/utils'

export function PricingGridBlock({
  sectionTitle,
  sectionDescription,
  plans,
}: PricingGridBlockData) {
  const pathname = usePathname()

  if (!plans || plans.length === 0) return null

  return (
    <section className="section-padding bg-section-bg">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          {sectionTitle && (
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark mb-4">
              {sectionTitle}
            </h2>
          )}
          {sectionDescription && (
            <p className="text-lg text-text-body">
              {sectionDescription}
            </p>
          )}
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const isPopular = plan.isPopular
            const planSlug = slugify(plan.title || 'plan')
            const cleanPathname = pathname ? pathname.replace(/^\/+/, '') : ''
            const fullServiceSlug = cleanPathname ? `${cleanPathname}/${planSlug}` : planSlug

            return (
              <div
                key={plan.id || index}
                className={`relative flex flex-col bg-white rounded-3xl p-8 border ${
                  isPopular
                    ? 'border-teal shadow-xl md:-translate-y-4 shadow-teal/10'
                    : 'border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1'
                } transition-all duration-300`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-teal text-white text-sm font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-heading text-2xl font-bold text-text-dark mb-2">
                    {plan.title}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text-dark">
                      {plan.price}
                    </span>
                    {plan.billingPeriod && (
                      <span className="text-text-muted font-medium">
                        {plan.billingPeriod}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-4 mb-8">
                    {plan.features?.map((feature, fIdx) => (
                      <li key={feature.id || fIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                        <span className="text-text-body leading-relaxed">
                          {feature.feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=${fullServiceSlug}`}
                  className={`w-full flex justify-center items-center h-12 rounded-xl font-semibold transition-colors ${
                    isPopular
                      ? 'bg-teal hover:bg-teal-dark text-white shadow-md shadow-teal/20'
                      : 'bg-teal/10 hover:bg-teal hover:text-white text-teal'
                  }`}
                >
                  {plan.buttonText || 'Get Started'}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
