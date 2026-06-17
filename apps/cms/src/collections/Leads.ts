import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'mobile', 'service_slug_history', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'mobile',
      type: 'text',
      required: true,
      validate: (val: string | null | undefined) => {
        if (!val) return 'Mobile number is required'
        const regex = /^\+[1-9]\d{7,14}$/
        if (!regex.test(val)) return 'Invalid mobile number format (must be E.164)'
        return true
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Direct relation to the Service collection',
      },
    },
    {
      name: 'service_slug_history',
      type: 'text',
      required: true,
      admin: {
        description: 'Hardcoded slug to preserve history in case the service is deleted',
      },
    },
    {
      name: 'product_slug',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'source_url',
      type: 'text',
      required: true,
    },
    {
      name: 'utm_params',
      type: 'json',
    },
    {
      name: 'form_token',
      type: 'text',
      unique: true,
    },
    {
      name: 'ip_hash',
      type: 'text',
    },
  ],
}
