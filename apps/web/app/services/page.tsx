import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { ServiceNavTabs } from '@/components/ServiceNavTabs';
import { Footer } from '@/components/Footer'
import { PageHeader } from '@/components/PageHeader'
import { getServices, getMediaUrl } from '@healdoor/utils'

export const metadata: Metadata = {
  title: 'Our Services | HealDoor',
  description: 'Comprehensive healthcare services provided by HealDoor including physiotherapy, nursing, and elderly care at home.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <Navbar />
      <ServiceNavTabs />
      <main className="flex-1">
        <PageHeader 
          title="Our Services" 
          description="Professional healthcare services delivered to your doorstep"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' }
          ]}
        />
        
        <section className="section-padding-sm bg-section-alt-bg">
          <div className="container">
            {/* Search/Filter Bar */}
            <div className="max-w-2xl mx-auto mb-12 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search for a service..." 
                  className="w-full pl-8 pr-4 py-4 rounded-full border border-border/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all text-text-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const imageUrl = getMediaUrl(service.hero_image) || '/images/service-placeholder.jpg'
                
                return (
                  <Link 
                    key={service.id} 
                    href={`/services/${service.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/30 flex flex-col h-full hover:-translate-y-1"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image 
                        src={imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-heading text-xl font-bold text-text-dark mb-3 group-hover:text-teal transition-colors">
                        {service.name}
                      </h3>
                      
                      {/* Simple description excerpt */}
                      <p className="text-text-body text-sm line-clamp-3 mb-6 flex-1">
                        Professional {service.name.toLowerCase()} services provided by our expert healthcare professionals.
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between text-teal font-semibold text-sm">
                        <span>Learn more</span>
                        <div className="w-8 h-8 rounded-full bg-teal-light flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            
            {services.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-border/30">
                <p className="text-text-muted text-lg">No services found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
