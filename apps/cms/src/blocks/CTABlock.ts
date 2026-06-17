import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'CTAs',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        { label: 'Teal', value: 'teal' },
        { label: 'White', value: 'white' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'teal',
    },
  ],
}
