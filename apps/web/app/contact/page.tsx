import { Metadata } from 'next'
import { getPageBySlug } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { ServiceNavTabs } from '@/components/ServiceNavTabs';
import { Footer } from '@/components/Footer'
import { PageRenderer } from '@/components/renderer/PageRenderer'
import { PageHeader } from '@/components/PageHeader'
import { EnquiryForm } from '@/components/EnquiryForm'
import { MapPin, Phone, Mail } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('contact')
  return {
    title: page?.seo?.meta_title || page?.title || 'Contact Us | HealDoor',
    description: page?.seo?.meta_description || 'Get in touch with HealDoor for healthcare services, inquiries, or support.',
  }
}

export default async function ContactPage() {
  const page = await getPageBySlug('contact')

  return (
    <>
      <Navbar />
      <ServiceNavTabs />
      <main className="flex-1">
        {page ? (
          <PageRenderer blocks={page.page_builder ?? []} />
        ) : (
          <>
            <PageHeader 
              title="Contact Us" 
              description="We're here to help with all your healthcare needs"
              breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Contact', href: '/contact' }
              ]}
            />
        
        <section className="section-padding-sm bg-section-alt-bg">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Contact Information */}
              <div className="space-y-10 order-2 lg:order-1">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-text-body text-lg leading-relaxed">
                    Whether you need to book a service, have a question about our offerings, or need support, our team is ready to assist you.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text-dark mb-1">Phone</h3>
                      <p className="text-text-body">
                        <a href="tel:+919876543210" className="hover:text-teal transition-colors">+91 98765 43210</a>
                      </p>
                      <p className="text-text-muted text-sm mt-1">Mon-Sat, 9am to 8pm</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text-dark mb-1">Email</h3>
                      <p className="text-text-body">
                        <a href="mailto:ukmlamrcp@gmail.com" className="hover:text-teal transition-colors">ukmlamrcp@gmail.com</a>
                      </p>
                      <p className="text-text-muted text-sm mt-1">We&apos;ll reply within 24 hrs</p>
                    </div>
                  </div>

                  <div className="flex gap-4 sm:col-span-2">
                    <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text-dark mb-1">Office Location</h3>
                      <p className="text-text-body leading-relaxed">
                        264, Pocket H-17, Sector-7 <br />
                        Rohini, Delhi-110085<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Map */}
                <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm h-64 relative bg-slate-100">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28003.543453880493!2d77.11651591834246!3d28.69804868284705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03d4fb0e1dc9%3A0x633513a968600dcb!2sPitampura%2C%20Delhi!5e0!3m2!1sen!2sin!4v1705600000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HealDoor Office Location"
                  ></iframe>
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-border/30 shadow-sm order-1 lg:order-2">
                <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
                  Send us a Message
                </h2>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
