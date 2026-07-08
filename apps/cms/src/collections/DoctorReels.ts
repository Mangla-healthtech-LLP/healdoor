import type { CollectionConfig } from 'payload'

export const DoctorReels: CollectionConfig = {
  slug: 'doctor-reels',
  admin: {
    useAsTitle: 'doctorName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'doctorName',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile photo or video thumbnail (used as fallback)',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'MP4 video file for the reel',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description text displayed over the video',
      },
    },
    {
      name: 'instagramLink',
      type: 'text',
      admin: {
        description: 'Instagram post/reel URL',
      },
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show verified badge next to name/handle',
      },
    },
  ],
}
