import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageBySlug, getAllPageSlugs } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { ServiceNavTabs } from '@/components/ServiceNavTabs';
import { Footer } from '@/components/Footer'
import { PageRenderer } from '@/components/renderer/PageRenderer'

interface Props {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs()
    return slugs.map((slug) => ({ slug: slug.split('/') }))
  } catch (error) {
    console.warn('Failed to generate page static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const page = await getPageBySlug(slug)
  
  if (!page) return {}
  
  return {
    title: page.seo?.meta_title || page.title,
    description: page.seo?.meta_description,
  }
}

export default async function DynamicPage({ params }: Props) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  const page = await getPageBySlug(slug)
  
  if (!page) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <ServiceNavTabs />
      <main className="flex-1">
        <PageRenderer blocks={page.page_builder ?? []} />
      </main>
      <Footer />
    </>
  )
}
