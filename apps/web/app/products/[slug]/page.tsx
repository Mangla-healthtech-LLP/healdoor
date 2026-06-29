import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, getProducts, getMediaUrl } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { ServiceNavTabs } from '@/components/ServiceNavTabs';
import { Footer } from '@/components/Footer'
import { LexicalSerializer } from '@/components/renderer/LexicalSerializer'
import { CheckCircle2, ArrowRight, IndianRupee } from 'lucide-react'
import { FAQBlock } from '@/components/blocks/FAQBlock'
import { ProductRating } from '@/components/products/ProductRating'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const productsResponse = await getProducts()
    return productsResponse.docs.map((product) => ({ slug: product.slug }))
  } catch (error) {
    console.warn('Failed to generate product static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  if (!product) return {}

  return {
    title: product.seo?.title || `${product.name} | HealDoor`,
    description: product.seo?.description || `Rent or Buy ${product.name} from HealDoor.`,
    alternates: {
      canonical: product.seo?.canonical,
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params
  const product = await getProductBySlug(resolvedParams.slug)
  if (!product) notFound()

  // product.image could be string or Media object
  const heroImageUrl = getMediaUrl(product.image) || '/images/hero-bg.jpg'

  // Format FAQs for the block component if they exist
  const formattedFaqs = product.faqs?.map(faq => {
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
        {/* Breadcrumb section */}
        {/* <div className="bg-section-alt-bg border-b border-border/50">
          <div className="container">
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: product.name, href: `/products/${product.slug}` }
              ]} 
            />
          </div>
        </div> */}

        {/* Product Top Section */}
        <section className="py-6 lg:py-10 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

              {/* Product Image Gallery */}
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-section-alt-bg border border-border/50">
                <Image
                  src={heroImageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-4 md:p-8 transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-text-dark mb-3 leading-tight">
                  {product.name}
                </h1>

                <div className="mb-6">
                  <ProductRating
                    productId={String(product.id)}
                    initialRating={product.rating || 0}
                    initialCount={product.ratingCount || 0}
                  />
                </div>

                {product.category && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(product.category) ? product.category.map((cat: { name?: string; slug?: string } | string, idx: number) => {
                      const text = typeof cat === 'string' ? cat : (cat.name || cat.slug || '');
                      if (!text) return null;
                      return (
                        <span key={idx} className="inline-block px-4 py-1.5 bg-teal-light text-teal text-sm font-bold rounded-full w-fit uppercase tracking-wider">
                          {text.replace('-', ' ')}
                        </span>
                      )
                    }) : (
                      <span className="inline-block px-4 py-1.5 bg-teal-light text-teal text-sm font-bold rounded-full w-fit uppercase tracking-wider">
                        {String(product.category).replace('-', ' ')}
                      </span>
                    )}
                  </div>
                )}

                {/* Pricing Options */}
                {(product.rentPrice || product.buyPrice) && (
                  <div className="mb-4 flex flex-wrap gap-6 sm:gap-10 items-center p-3 bg-section-alt-bg rounded-xl border border-border/50 shadow-sm">
                    {product.rentPrice && product.isAvailableForRent && (
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Monthly Rent</span>
                        <span className="text-2xl font-bold text-teal flex items-center">
                          <IndianRupee className="w-5 h-5 mr-0.5" />
                          {product.rentPrice.toLocaleString('en-IN')}<span className="text-sm font-normal text-text-muted ml-1">/mo</span>
                        </span>
                      </div>
                    )}

                    {(product.rentPrice && product.buyPrice && product.isAvailableForRent && product.isAvailableForPurchase) && (
                      <div className="w-px h-12 bg-border/80 hidden sm:block"></div>
                    )}

                    {product.buyPrice && product.isAvailableForPurchase && (
                      <div className="flex flex-col">
                        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Purchase Price</span>
                        <span className="text-xl font-bold text-text-dark flex items-center mt-1">
                          <IndianRupee className="w-4 h-4 mr-0.5" />
                          {product.buyPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Call to action */}
                <div className="mb-4 space-y-3">
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="flex justify-center items-center gap-2 px-6 py-3.5 bg-teal hover:bg-teal-dark text-white rounded-xl font-bold text-base transition-colors shadow-md shadow-teal/20"
                  >
                    Inquire to Rent or Buy
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <div className="mt-4 pt-6 border-t border-border/50">
                    <p className="text-sm text-text-muted text-center">
                      Or call us directly at <br />
                      <a href="tel:+919876543210" className="font-bold text-teal text-lg mt-1 block">
                        +91 98765 43210
                      </a>
                    </p>
                  </div>
                  <p className="text-sm text-text-muted text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal" />
                    Delivery & setup available at your home
                  </p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4">
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-text-dark mb-2">Key Features</h3>
                      <ul className="space-y-3">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                            <span className="text-text-body">
                              {feature.feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      {product.features.length > 3 && (
                        <a href="#details" className="text-teal hover:text-teal-dark font-medium mt-2 inline-block text-sm">
                          View all technical specifications &rarr;
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section id="details" className="py-6 lg:py-10 bg-section-alt-bg border-t border-border/50">
          <div className="container max-w-5xl">
            {product.description && (
              <div className="mb-4 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-border/50">
                <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">Description</h2>
                <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-text-dark prose-a:text-teal hover:prose-a:text-teal-dark">
                  <LexicalSerializer content={product.description} />
                </div>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-border/50">
                <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">Technical Specifications</h2>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3 py-2 border-b border-border/50 last:border-0 sm:last:border-b sm:[&:nth-last-child(2)]:border-0">
                      <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                      <span className="text-text-dark font-medium leading-relaxed">
                        {feature.feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQs Section */}
        {formattedFaqs && formattedFaqs.length > 0 && (
          <div className="bg-white">
            <FAQBlock
              blockType="faq"
              sectionTitle="Frequently Asked Questions"
              sectionDescription={product.name}
              faqItems={formattedFaqs}
            />
          </div>
        )}

      </main>
      <Footer />
    </>
  )
}
