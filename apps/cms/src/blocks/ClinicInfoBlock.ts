import type { Block } from 'payload'

export const ClinicInfoBlock: Block = {
  slug: 'clinicInfo',
  labels: {
    singular: 'Clinic Info',
    plural: 'Clinic Info Blocks',
  },
  fields: [
    {
      name: 'clinicName',
      type: 'text',
      defaultValue: 'Heal Door Clinic',
      admin: {
        description: 'Name of the clinic',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: '264, Pocket H-17, Sector 7, Rohini, Delhi-110085',
    },
    {
      name: 'timings',
      type: 'text',
      defaultValue: 'Mon-Sun: 9:00 AM – 9:00 PM | Wednesday Off',
      admin: {
        description: 'Clinic operating hours',
      },
    },
    {
      name: 'receptionPhone',
      type: 'text',
      defaultValue: '+91 9311941203',
      admin: {
        description: 'Reception phone number',
      },
    },
    {
      name: 'enquiryPhone',
      type: 'text',
      defaultValue: '+91 9871281574',
      admin: {
        description: 'Enquiry phone number',
      },
    },
    {
      name: 'facilities',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'List of facilities/services available at the clinic',
      },
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      admin: {
        description: 'Google Maps embed URL (iframe src)',
      },
    },
  ],
}
