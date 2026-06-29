import React from 'react'
import { getProducts } from '@healdoor/utils'
import { ProductCatalog } from '@/components/ProductCatalog'

interface ProductCategory {
  id: string
  name: string
  slug: string
}

interface ProductCollectionBlockProps {
  sectionTitle?: string
  sectionDescription?: string
  categoriesToDisplay?: (string | ProductCategory)[]
}

export async function ProductCollectionBlock({
  sectionTitle,
  sectionDescription,
  categoriesToDisplay,
}: ProductCollectionBlockProps) {
  // Fetch all products (or we could optimize by fetching only products in these categories)
  const productsResponse = await getProducts({ limit: 200 })
  const products = productsResponse.docs || []

  const mappedCategories = [
    { label: 'All', value: 'all' }
  ]
  const selectedCategoryValues: string[] = []

  if (categoriesToDisplay && categoriesToDisplay.length > 0) {
    categoriesToDisplay.forEach((cat) => {
      if (typeof cat === 'object' && cat !== null) {
        const catValue = cat.slug || cat.id
        mappedCategories.push({
          label: cat.name,
          value: catValue
        })
        selectedCategoryValues.push(catValue)
      } else if (typeof cat === 'string') {
        selectedCategoryValues.push(cat)
      }
    })
  }

  // Filter products so the "All" tab only shows products from the selected categories
  const filteredProducts = products.filter(product => {
    if (!categoriesToDisplay || categoriesToDisplay.length === 0) return true; // fallback if no categories selected
    
    if (Array.isArray(product.category)) {
      return product.category.some((c: { slug?: string; id?: string } | string) => {
        if (typeof c === 'string') return selectedCategoryValues.includes(c)
        return c && typeof c === 'object' && selectedCategoryValues.includes(c.slug || c.id)
      })
    }
    // Backward compatibility for old string category
    return selectedCategoryValues.includes(product.category as unknown as string)
  })

  return (
    <div className="w-full">
      {(sectionTitle || sectionDescription) && (
        <div className="container mx-auto px-4 py-8 lg:py-12 text-center">
          {sectionTitle && (
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-dark mb-4">
              {sectionTitle}
            </h2>
          )}
          {sectionDescription && (
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              {sectionDescription}
            </p>
          )}
        </div>
      )}
      <ProductCatalog 
        initialProducts={filteredProducts} 
        categories={categoriesToDisplay && categoriesToDisplay.length > 0 ? mappedCategories : undefined} 
      />
    </div>
  )
}
