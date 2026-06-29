import type { Block } from 'payload'

export const PricingGridBlock: Block = {
  slug: 'pricingGrid',
  labels: {
    singular: 'Pricing Grid',
    plural: 'Pricing Grids',
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
      name: 'plans',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'billingPeriod',
          type: 'text',
          admin: {
            description: 'E.g., /month or one-time',
          },
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Highlight this plan',
          },
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Get Started',
        },
      ],
    },
  ],
}
