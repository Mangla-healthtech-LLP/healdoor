import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHeader } from '@/components/PageHeader'
import { getProducts } from '@healdoor/utils'
import { ProductCatalog } from '@/components/ProductCatalog'

export const metadata: Metadata = {
  title: 'Our Products | HealDoor',
  description: 'Browse our comprehensive catalog of medical equipment and supplies available for rent or purchase.',
}

export default async function ProductsPage() {
  const productsResponse = await getProducts({ limit: 100 })
  const products = productsResponse.docs || []

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader 
          title="Our Products" 
          description="High-quality medical equipment available for rent and purchase"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' }
          ]}
        />
        
        <ProductCatalog initialProducts={products} />
      </main>
      <Footer />
    </>
  )
}
