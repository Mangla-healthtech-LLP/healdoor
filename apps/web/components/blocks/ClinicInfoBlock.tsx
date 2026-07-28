import React from 'react'
import { MapPin, Clock, Phone, Stethoscope } from 'lucide-react'
import type { ClinicInfoBlockData } from '@healdoor/types'

export function ClinicInfoBlock({
  clinicName,
  address,
  timings,
  receptionPhone,
  enquiryPhone,
  facilities,
  mapEmbedUrl,
}: ClinicInfoBlockData) {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Clinic Details */}
          <div className="space-y-6">
            {/* Clinic Name & Address */}
            {(clinicName || address) && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  {clinicName && (
                    <h3 className="font-heading text-lg font-bold text-text-dark mb-1">
                      {clinicName}
                    </h3>
                  )}
                  {address && (
                    <p className="text-sm text-text-body leading-relaxed">
                      {address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Clinic Timings */}
            {timings && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-text-dark mb-1">
                    Clinic Timings
                  </h4>
                  <p className="text-sm text-text-body leading-relaxed">
                    {timings}
                  </p>
                </div>
              </div>
            )}

            {/* Contact Numbers */}
            {(receptionPhone || enquiryPhone) && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-text-dark mb-1">
                    Call Us
                  </h4>
                  {receptionPhone && (
                    <p className="text-sm text-text-body">
                      Reception:{' '}
                      <a
                        href={`tel:${receptionPhone.replace(/\s/g, '')}`}
                        className="text-teal font-semibold hover:underline"
                      >
                        {receptionPhone}
                      </a>
                    </p>
                  )}
                  {enquiryPhone && (
                    <p className="text-sm text-text-body">
                      For Enquiries:{' '}
                      <a
                        href={`tel:${enquiryPhone.replace(/\s/g, '')}`}
                        className="text-teal font-semibold hover:underline"
                      >
                        {enquiryPhone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Facilities */}
            {facilities && facilities.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0 mt-0.5">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-text-dark mb-2">
                    Facilities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {facilities.map((facility, idx) => (
                      <React.Fragment key={facility.id || idx}>
                        <span className="text-sm text-text-body">
                          {facility.text}
                        </span>
                        {idx < facilities.length - 1 && (
                          <span className="text-text-muted">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Google Maps Embed */}
          {mapEmbedUrl && (
            <div className="rounded-2xl overflow-hidden shadow-md border border-border/40 min-h-[300px] lg:min-h-[400px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location Map"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
