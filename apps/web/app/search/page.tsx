import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Search } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHeader } from '@/components/PageHeader'
import {
  getProducts,
  getServices,
  getMediaUrl,
  getMediaAlt,
} from '@healdoor/utils'

export const metadata: Metadata = {
  title: 'Search Results | HealDoor',
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q.toLowerCase() : ''

  const [productsResponse, services] = await Promise.all([
    getProducts({ limit: 100 }),
    getServices(),
  ])

  const products = productsResponse.docs || []

  const filteredProducts = q
    ? products.filter((p) => p.name.toLowerCase().includes(q))
    : []
  const filteredServices = q
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (typeof s.description === 'string' &&
            s.description.toLowerCase().includes(q)),
      )
    : []

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-section-alt-bg">
        <PageHeader
          title="Search Results"
          description={
            q
              ? `Showing results for "${q}"`
              : 'Enter a search query to find products and services'
          }
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Search', href: '/search' },
          ]}
        />

        <section className="section-padding-sm container py-12">
          {/* Mobile Search Bar */}
          <div className="mb-8 md:hidden">
            <form action="/search" method="GET" className="relative w-full">
              <input
                name="q"
                type="text"
                defaultValue={q}
                placeholder="Search for products or services..."
                className="w-full h-12 pl-5 pr-12 text-sm border border-border/50 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all text-text-dark"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-teal text-white flex items-center justify-center cursor-pointer hover:bg-teal-dark transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
          {!q ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border/30">
              <Search className="w-12 h-12 text-teal mx-auto mb-4" />
              <p className="text-text-muted text-lg">
                Please enter a search term above to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Services Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-dark">
                    Services ({filteredServices.length})
                  </h2>
                  {filteredServices.length > 0 && (
                    <Link
                      href="/services"
                      className="text-sm font-semibold text-teal hover:underline"
                    >
                      View all services
                    </Link>
                  )}
                </div>

                {filteredServices.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-border/50 text-center">
                    <p className="text-text-muted">
                      No services found for "{q}"
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => {
                      const imageUrl =
                        getMediaUrl(service.hero_image) ||
                        '/images/service-placeholder.jpg'
                      return (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col h-full hover:-translate-y-1"
                        >
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={service.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-heading text-lg font-bold text-text-dark mb-2 group-hover:text-teal transition-colors">
                              {service.name}
                            </h3>
                            <p className="text-text-body text-sm line-clamp-2 mb-4 flex-1">
                              Professional {service.name.toLowerCase()} services
                              provided by our expert healthcare professionals.
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
                )}
              </div>

              {/* Products Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-dark">
                    Products ({filteredProducts.length})
                  </h2>
                  {filteredProducts.length > 0 && (
                    <Link
                      href="/products"
                      className="text-sm font-semibold text-teal hover:underline"
                    >
                      View all products
                    </Link>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-border/50 text-center">
                    <p className="text-text-muted">
                      No products found for "{q}"
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product, i) => {
                      const imageUrl =
                        getMediaUrl(
                          product.image as Parameters<typeof getMediaUrl>[0],
                        ) || '/images/service-medical.png'
                      return (
                        <Link
                          key={product.id || i}
                          href={`/products/${product.slug}`}
                          className="flex flex-col bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full"
                        >
                          <div className="aspect-square bg-section-alt-bg relative overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={
                                getMediaAlt(
                                  product.image as Parameters<
                                    typeof getMediaAlt
                                  >[0],
                                ) || product.name
                              }
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {product.isFeatured && (
                              <div className="absolute top-2 left-2 bg-gold/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                Bestseller
                              </div>
                            )}
                          </div>
                          <div className="p-3 flex flex-col flex-grow space-y-1.5">
                            <h3 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-teal transition-colors">
                              {product.name}
                            </h3>

                            <div className="flex items-center gap-1 mt-auto">
                              {product.rating && product.rating > 0 ? (
                                <>
                                  <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                                  <span className="text-xs font-bold text-text-dark">
                                    {product.rating}
                                  </span>
                                  <span className="text-[10px] text-text-muted">
                                    ({product.ratingCount || 0})
                                  </span>
                                </>
                              ) : (
                                <span className="text-xs text-text-muted">
                                  No ratings yet
                                </span>
                              )}
                            </div>

                            <div className="flex items-baseline gap-1 pt-2 border-t border-border/30">
                              {product.isAvailableForPurchase ? (
                                <span className="text-lg font-bold text-teal">
                                  ₹
                                  {(product.buyPrice || 0).toLocaleString(
                                    'en-IN',
                                  )}
                                </span>
                              ) : product.isAvailableForRent ? (
                                <span className="text-lg font-bold text-teal">
                                  ₹
                                  {(product.rentPrice || 0).toLocaleString(
                                    'en-IN',
                                  )}
                                  <span className="text-[10px] font-medium text-text-muted">
                                    /month
                                  </span>
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
