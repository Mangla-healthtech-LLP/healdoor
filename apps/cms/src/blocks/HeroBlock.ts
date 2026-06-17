import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'textarea',
    },
    {
      name: 'primaryButtonText',
      type: 'text',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'alignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'showStats',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
