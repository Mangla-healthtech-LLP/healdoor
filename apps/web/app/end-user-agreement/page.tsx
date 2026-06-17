import type { Metadata } from 'next'
import { getPageBySlug } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageRenderer } from '@/components/renderer/PageRenderer'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'End User Agreement | HealDoor',
}

export default async function EULAPage() {
  const page = await getPageBySlug('end-user-agreement')

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {page ? (
          <PageRenderer blocks={page.page_builder ?? []} />
        ) : (
          <>
            <PageHeader 
              title="End User Agreement" 
              breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Agreement', href: '/end-user-agreement' }
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
