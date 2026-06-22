import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getServiceBySlug, getServices, getMediaUrl } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { ServiceNavTabs } from '@/components/ServiceNavTabs';
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LexicalSerializer } from '@/components/renderer/LexicalSerializer'
import { PageRenderer } from '@/components/renderer/PageRenderer'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { FAQBlock } from '@/components/blocks/FAQBlock'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const services = await getServices()
    return services.map((service) => ({ slug: service.slug }))
  } catch (error) {
    console.warn('Failed to generate service static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug)
  if (!service) return {}

  return {
    title: service.seo?.title || `${service.name} | HealDoor`,
    description: service.seo?.description || `Professional ${service.name} services by HealDoor.`,
    alternates: {
      canonical: service.seo?.canonical,
    }
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug)
  if (!service) notFound()

  const heroImageUrl = getMediaUrl(service.hero_image) || '/images/hero-bg.jpg'

  // Format FAQs for the block component if they exist
  const formattedFaqs = service.faqs?.map(faq => {
    if (typeof faq === 'number') return null

    // Extract simple text from Lexical format for the answer
    let answerText = ''
    if (faq.answer?.root?.children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      faq.answer.root.children.forEach((node: any) => {
        if (node.children) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          node.children.forEach((child: any) => {
            if (child.text) answerText += child.text + ' '
          })
        }
      })
    }

    return {
      question: faq.question,
      answer: answerText || 'Please contact us for more information.',
      id: faq.id.toString()
    }
  }).filter(Boolean) as { question: string; answer: string; id: string }[]

  return (
    <>
      <Navbar />
      <ServiceNavTabs />
      <main className="flex-1">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name, href: `/services/${service.slug}` }
        ]}
        
      />
      {/* Hero Section */}
        <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImageUrl}
              alt={service.name}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {service.name}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding-sm bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              {/* Main Content (Left) */}
              <div className="lg:col-span-8 space-y-12 order-2 lg:order-1">
                {service.description && (
                  <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-text-dark prose-a:text-teal hover:prose-a:text-teal-dark">
                    <LexicalSerializer content={service.description} />
                  </div>
                )}

                {service.features && service.features.length > 0 && (
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">What We Offer</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 p-6 bg-section-alt-bg rounded-2xl border border-border/50">
                          <CheckCircle2 className="w-6 h-6 text-teal shrink-0" />
                          <span className="text-text-dark font-medium leading-relaxed">
                            {feature.feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar (Right) */}
              <div className="lg:col-span-4 space-y-8 order-1 lg:order-2">
                <div className="bg-white rounded-2xl p-8 border border-border/50 shadow-lg sticky top-32">
                  <h3 className="font-heading text-2xl font-bold text-text-dark mb-4">
                    Book this Service
                  </h3>
                  <p className="text-text-body mb-8">
                    Get professional {service.name.toLowerCase()} delivered to your home by our experts.
                  </p>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="flex w-full justify-center items-center gap-2 px-8 py-4 bg-teal hover:bg-teal-dark text-white rounded-xl font-semibold transition-colors shadow-md shadow-teal/20"
                  >
                    Contact Us Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="text-sm text-text-muted text-center">
                      Or call us directly at <br />
                      <a href="tel:+919876543210" className="font-bold text-teal text-lg mt-1 block">
                        +91 98765 43210
                      </a>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Page Builder Blocks */}
        {service.page_builder && service.page_builder.length > 0 && (
          <PageRenderer blocks={service.page_builder} />
        )}

        {/* FAQs Section */}
        {formattedFaqs && formattedFaqs.length > 0 && (
          <FAQBlock
            blockType="faq"
            sectionTitle={`Frequently Asked Questions about ${service.name}`}
            faqItems={formattedFaqs}
          />
        )}

      </main>
      <Footer />
    </>
  )
}
