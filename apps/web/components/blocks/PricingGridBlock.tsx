'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CheckCircle2, Phone, CalendarPlus } from 'lucide-react'
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
        <div className={`grid grid-cols-1 gap-8 mx-auto w-full ${
          plans.length === 1 ? 'max-w-md' :
          plans.length === 2 ? 'md:grid-cols-2 max-w-4xl' :
          'md:grid-cols-2 lg:grid-cols-3 max-w-7xl'
        }`}>
          {plans.map((plan, index) => {
            const isPopular = plan.isPopular
            const planSlug = slugify(plan.title || 'plan')
            const cleanPathname = pathname ? pathname.replace(/^\/+/, '') : ''
            const fullServiceSlug = cleanPathname ? `${cleanPathname}/${planSlug}` : planSlug

            return (
              <div
                key={plan.id || index}
                className={`relative flex flex-col bg-white rounded-2xl border transition-all duration-300 ${
                  isPopular ? 'border-orange-500 shadow-[0_0_15px_rgba(0,0,0,0.1)]' : 'border-border/50 shadow-md'
                }`}
              >
                {/* Header Section */}
                <div className="pt-8 pb-6 px-8 relative bg-orange rounded-t-2xl h-48 flex flex-col justify-center items-start">
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 z-10">
                      <span className="bg-white text-teal-700 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap border border-gray-100">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <h3 className="font-heading text-lg font-semibold text-white/90 mb-2">
                    {plan.title}
                  </h3>
                  
                  {plan.subtitle && (
                    <div className="text-white text-lg font-normal mb-1">
                      {plan.subtitle}
                    </div>
                  )}

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white tracking-tight">
                      {plan.price}
                    </span>
                    {plan.billingPeriod && (
                      <span className="text-white/80 font-medium ml-1">
                        {plan.billingPeriod}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features Section */}
                <div className="p-8 flex-1 flex flex-col bg-white rounded-b-2xl">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features?.map((feature, fIdx) => (
                      <li key={feature.id || fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-transparent flex items-center justify-center shrink-0 mt-0.5">
                           <CheckCircle2 className="w-4 h-4 text-teal" />
                        </div>
                        <span className="text-text-dark text-sm font-medium leading-relaxed">
                          {feature.feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex flex-row gap-2 sm:gap-3 w-full mt-auto">
                    <Link
                      href={`/contact?service=${fullServiceSlug}`}
                      className="flex-1 flex justify-center items-center gap-2 h-11 rounded-lg border border-text-dark bg-transparent text-text-dark font-semibold text-sm px-4 transition-colors hover:bg-gray-50"
                    >
                      <CalendarPlus className="w-4 h-4 shrink-0" />
                      <span className="truncate">{plan.buttonText || 'Contact Us Now'}</span>
                    </Link>
                    <a
                      href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || "+919871281574"}`}
                      className="flex-1 flex justify-center items-center gap-2 h-11 rounded-lg border border-transparent bg-teal text-white font-semibold text-sm px-4 transition-colors hover:bg-teal-dark"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Call Us</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
