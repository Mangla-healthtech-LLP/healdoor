import type { Metadata } from 'next'
import { getPageBySlug } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageRenderer } from '@/components/renderer/PageRenderer'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Terms and Conditions | HealDoor',
}

export default async function TermsPage() {
  const page = await getPageBySlug('terms-and-conditions')

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {page ? (
          <PageRenderer blocks={page.page_builder ?? []} />
        ) : (
          <>
            <PageHeader 
              title="Terms and Conditions" 
              breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Terms', href: '/terms-and-conditions' }
              ]}
            />
            <section className="section-padding bg-white min-h-[50vh] flex flex-col items-center justify-center text-center">
              <div className="container max-w-2xl">
                <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">Coming Soon</h2>
                <p className="text-text-body text-lg">This page is currently being updated.</p>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
