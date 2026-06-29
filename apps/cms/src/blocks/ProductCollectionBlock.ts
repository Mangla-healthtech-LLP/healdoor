import type { Block } from 'payload'

export const ProductCollectionBlock: Block = {
  slug: 'productCollection',
  labels: {
    singular: 'Product Collection Grid',
    plural: 'Product Collection Grids',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
    },
    {
      name: 'categoriesToDisplay',
      type: 'relationship',
      relationTo: 'product-categories',
      hasMany: true,
      admin: {
        description: 'Select the categories to display as tabs above the product grid.',
      },
    },
  ],
}
