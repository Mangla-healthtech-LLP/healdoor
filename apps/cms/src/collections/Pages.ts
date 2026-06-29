import type { CollectionConfig } from 'payload'
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
} from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'page_builder',
      type: 'blocks',
      blocks: [
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
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'meta_title',
          type: 'text',
        },
        {
          name: 'meta_description',
          type: 'textarea',
        },
      ],
    },
  ],
}
