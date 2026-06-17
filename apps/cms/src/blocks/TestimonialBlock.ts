import type { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonial Sections',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
    },
    {
      name: 'testimonialItems',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'designation',
          type: 'text',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'review',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
