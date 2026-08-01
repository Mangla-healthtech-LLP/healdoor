import type { Block } from 'payload'

export const ServiceItemGridBlock: Block = {
  slug: 'serviceItemGrid',
  labels: {
    singular: 'Service Item Grid',
    plural: 'Service Item Grids',
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
      name: 'columns',
      type: 'select',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      defaultValue: '2',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
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
          name: 'link',
          type: 'text',
          admin: {
            description: 'Link URL (e.g., /physiotherapy/at-home)',
          },
        },
        {
          name: 'upcoming',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check to show "Coming Soon" badge and styling',
          },
        },
      ],
    },
  ],
}
