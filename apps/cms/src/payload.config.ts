import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
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
  collections: [Users, Media, Services, Leads, Pages, Blogs, Testimonials, FAQs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [
    'http://localhost:3000',
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sharp: sharp as any,
  plugins: [
    ...(process.env.AWS_S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.AWS_S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
              },
              region: process.env.AWS_REGION,
            },
          }),
        ]
      : []),
  ],
})
