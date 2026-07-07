import type { GlobalConfig } from 'payload'

export const HomepageSettings: GlobalConfig = {
  slug: 'homepage-settings',
  label: 'Homepage Settings',
  access: {
    read: () => true,
  },
  fields: [
    // ── Hero Carousel Slides ──
    {
      name: 'heroSlides',
      label: 'Hero Carousel Slides',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'badge',
          type: 'text',
          admin: { description: 'e.g. "LIMITED PERIOD OFFER"' },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'bullets',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
        },
        {
          name: 'ctaHref',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'qualityBadgeLine1',
          type: 'text',
          admin: { description: 'Top line of quality badge (e.g. "BEST QUALITY")' },
        },
        {
          name: 'qualityBadgeLine2',
          type: 'text',
          admin: { description: 'Bottom line of quality badge (e.g. "BEST PRICE")' },
        },
      ],
    },

    // ── Healthcare Intro ──
    {
      name: 'healthcareIntro',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Healthcare at your doorstep',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Professional care and medical services delivered safely at your home.',
        },
      ],
    },

    // ── Service Categories ──
    {
      name: 'serviceCategories',
      label: 'Service Categories Grid',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: { description: 'e.g. "X-ray, ECG, Blood Investigations"' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },

    // ── Trust Badges ──
    {
      name: 'trustBadges',
      label: 'Trust Badges',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Lucide icon name (e.g. UserCheck, Users, Headphones, ShieldCheck)' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },

    // ── Problems Section ──
    {
      name: 'problemsSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Are you facing these Problems ?',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'We are here to help you with the best care and support at your doorstep.',
        },
        {
          name: 'problems',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: { description: 'Lucide icon name (e.g. Wind, Building2, HeartPulse, Activity)' },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Highest Selling Products ──
    {
      name: 'highestSellingSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Highest Selling Products',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Trusted by thousands of customers across India.',
        },
      ],
    },

    // ── Rent or Buy Section ──
    {
      name: 'rentOrBuySection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Rent or Buy — Your Choice',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Flexible options to suit your healthcare needs and budget.',
        },
        {
          name: 'rentBenefits',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'buyBenefits',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Expert Doctors ──
    {
      name: 'expertDoctorsSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Our Expert Doctors',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Experienced professionals dedicated to your health and well-being.',
        },
        {
          name: 'doctors',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'qualification',
              type: 'text',
            },
            {
              name: 'experience',
              type: 'text',
            },
            {
              name: 'badge',
              type: 'text',
              admin: { description: 'e.g. "FOUNDER" — leave empty for no badge' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'linkedin',
              type: 'text',
              admin: { description: 'LinkedIn Profile URL' },
            },
            {
              name: 'twitter',
              type: 'text',
              admin: { description: 'Twitter/X Profile URL' },
            },
            {
              name: 'instagram',
              type: 'text',
              admin: { description: 'Instagram Profile URL' },
            },
          ],
        },
      ],
    },

      // ── Doctor Reels Section ──
    {
      name: 'doctorReelsSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Doctor Reels',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Reels of doctors we have currently with us.',
        },
      ],
    },

    // ── Testimonials Section ──
    {
      name: 'testimonialsSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Testimonials',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Real stories from real people who chose HealDoor.',
        },
      ],
    },

    // ── Before vs After Section ──
    {
      name: 'beforeAfterSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Before vs After — Real Results',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'See the difference HealDoor care can make.',
        },
        {
          name: 'stories',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'patientName',
              type: 'text',
              required: true,
            },
            {
              name: 'age',
              type: 'number',
            },
            {
              name: 'condition',
              type: 'text',
            },
            {
              name: 'quote',
              type: 'textarea',
            },
            {
              name: 'beforeImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'afterImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'patientImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Patient portrait photo' },
            },
            {
              name: 'fullStoryLink',
              type: 'text',
            },
          ],
        },
      ],
    },

    // ── Our Story ──
    {
      name: 'ourStorySection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Our Story',
        },
        {
          name: 'narrative',
          type: 'richText',
          admin: { description: 'The story paragraphs on the left side' },
        },
        {
          name: 'team',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'badges',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'education',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'experience',
              type: 'array',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Blogs Section ──
    {
      name: 'blogsSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Health & Wellness Blogs',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Tips, guides and insights to help you live a healthier life.',
        },
      ],
    },

    // ── How It Works ──
    {
      name: 'howItWorksSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'How It Works',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Simple 4-step process to get care at home',
        },
        {
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "01"' },
            },
            {
              name: 'icon',
              type: 'text',
              admin: { description: 'Lucide icon name (e.g. Phone, MessageSquare, Truck, HeartHandshake)' },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
            },
          ],
        },
      ],
    },

    // ── Location Section ──
    {
      name: 'locationSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Our Location',
        },
        {
          name: 'companyName',
          type: 'text',
          defaultValue: 'HealDoor Healthcare',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: '264, Pocket H-17, Sector-7, Rohini, Delhi-110085',
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          admin: { description: 'Google Maps embed URL' },
        },
        {
          name: 'getDirectionsLink',
          type: 'text',
          defaultValue: 'https://maps.google.com/?q=264+pocket+H-17+sector-7+Rohini+Delhi+110085',
        },
      ],
    },
  ],
}
