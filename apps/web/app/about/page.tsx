import type { Metadata } from 'next'
import { getPageBySlug } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageRenderer } from '@/components/renderer/PageRenderer'
import { PageHeader } from '@/components/PageHeader'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | HealDoor',
  description: 'Learn more about HealDoor and our mission to provide quality healthcare at home.',
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {page ? (
          <PageRenderer blocks={page.page_builder ?? []} />
        ) : (
          <>
            <PageHeader 
              title="About Us" 
              description="Learn more about our mission and values"
              breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' }
              ]}
            />
            <section className="section-padding bg-white min-h-[50vh] flex flex-col items-center justify-center text-center">
              <div className="container max-w-2xl">
                <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">Coming Soon</h2>
                <p className="text-text-body text-lg mb-8">We are currently updating our about page. Please check back later or contact us if you have any questions.</p>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-teal text-white font-semibold rounded-full shadow-lg hover:bg-teal-dark hover:shadow-xl transition-all">
                  Contact Us
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
