import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding Product Categories...')
  const wheelchairs = await payload.create({
    collection: 'product-categories',
    data: { name: 'Wheelchairs', slug: 'wheelchairs' }
  })
  const walkers = await payload.create({
    collection: 'product-categories',
    data: { name: 'Walkers', slug: 'walkers' }
  })
  const crutches = await payload.create({
    collection: 'product-categories',
    data: { name: 'Crutches', slug: 'crutches' }
  })

  console.log('Seeding Service Page...')
  await payload.create({
    collection: 'services',
    data: {
      name: 'Wheelchairs, Walkers & Crutches',
      slug: 'wheelchairs-walkers-crutches',
      page_builder: [
        {
          blockType: 'productCollection',
          sectionTitle: 'Wheelchairs, Walkers & Crutches',
          sectionDescription: 'Mobility aids for comfortable and independent living at home.',
          categoriesToDisplay: [wheelchairs.id, walkers.id, crutches.id]
        }
      ]
    }
  })

  console.log('Seeding complete! You can now view the page at /services/wheelchairs-walkers-crutches')
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
