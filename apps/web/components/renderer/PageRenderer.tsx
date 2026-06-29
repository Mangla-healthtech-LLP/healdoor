import React from 'react'
import type { LayoutBlock } from '@healdoor/types'
import {
  HeroBlock,
  CTABlock,
  FeatureBlock,
  FAQBlock,
  TestimonialBlock,
  RichTextBlock,
  ProductGridBlock,
  StepsBlock,
  DoctorGridBlock,
  ProductCollectionBlock,
  PricingGridBlock,
  ItemGridBlock,
} from '@/components/blocks'

// Map block types to their React components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  cta: CTABlock,
  feature: FeatureBlock,
  faq: FAQBlock,
  testimonial: TestimonialBlock,
  richText: RichTextBlock,
  productGrid: ProductGridBlock,
  steps: StepsBlock,
  doctorGrid: DoctorGridBlock,
  productCollection: ProductCollectionBlock,
  pricingGrid: PricingGridBlock,
  itemGrid: ItemGridBlock,
}

interface PageRendererProps {
  blocks: LayoutBlock[]
}

export function PageRenderer({ blocks }: PageRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        
        if (!Component) {
          console.warn(`No component found for block type: ${block.blockType}`)
          return null
        }

        return <Component key={block.id || `${block.blockType}-${index}`} {...block} />
      })}
    </>
  )
}
