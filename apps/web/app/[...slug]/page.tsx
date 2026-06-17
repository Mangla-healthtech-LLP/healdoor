import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageBySlug, getAllPageSlugs } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageRenderer } from '@/components/renderer/PageRenderer'

interface Props {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map((slug) => ({ slug: slug.split('/') }))
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
      <main className="flex-1">
        <PageRenderer blocks={page.page_builder ?? []} />
      </main>
      <Footer />
    </>
  )
}
