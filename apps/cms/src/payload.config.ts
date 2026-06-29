import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Leads } from './collections/Leads'
import { Pages } from './collections/Pages'
import { Blogs } from './collections/Blogs'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { Products } from './collections/Products'
import { ProductCategories } from './collections/ProductCategories'
import { HomepageSettings } from './globals'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const productionOrigins = [
  process.env.WEB_ORIGIN,
  ...(process.env.WEB_ORIGINS?.split(',') ?? []),
]
  .map((origin) => origin?.trim())
  .filter((origin): origin is string => Boolean(origin))

const corsOrigins = Array.from(new Set(['http://localhost:3000', ...productionOrigins]))

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Healdoor CMS',
      icons: [{ url: '/favicon.ico' }],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ['./components/LogoutButton'],
      logout: {
        Button: './components/NullComponent',
      },
      graphics: {
        Logo: './components/Logo',
        Icon: './components/Icon',
      },
    },
  },
  collections: [Users, Media, Services, Leads, Pages, Blogs, Testimonials, FAQs, Products, ProductCategories],
  globals: [HomepageSettings],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter((f) => f.key !== 'upload'),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'customWidth',
                type: 'number',
                label: 'Custom Width (px)',
                admin: {
                  description: 'Leave empty for natural image width.',
                },
              },
              {
                name: 'customHeight',
                type: 'number',
                label: 'Custom Height (px)',
                admin: {
                  description: 'Leave empty for auto height.',
                },
              },
            ],
          },
        },
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: corsOrigins,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true' ? true : undefined,
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sharp: sharp as any,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.AWS_S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        },
        region: process.env.AWS_REGION || 'us-east-1',
      },
      enabled: !!process.env.AWS_S3_BUCKET,
    }),
  ],
})
