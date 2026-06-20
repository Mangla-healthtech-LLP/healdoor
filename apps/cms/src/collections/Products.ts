import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: '/:id/rate',
      method: 'post',
      handler: async (req) => {
        try {
          const id = req.routeParams?.id as string;
          if (!id) return Response.json({ error: 'Missing ID' }, { status: 400 });

          const body = await req.json();
          const vote = Number(body.vote);
          if (!vote || vote < 1 || vote > 5) {
            return Response.json({ error: 'Invalid vote' }, { status: 400 });
          }

          const product = await req.payload.findByID({ collection: 'products', id });
          if (!product) return Response.json({ error: 'Not found' }, { status: 404 });

          const starKey = `rating${vote}Star`;
          // @ts-expect-error dynamic access
          const currentStarCount = (product[starKey] as number) || 0;
          const newStarCount = currentStarCount + 1;
          const newTotalCount = (product.ratingCount as number || 0) + 1;

          // @ts-expect-error dynamic access
          const r5 = vote === 5 ? newStarCount : (product.rating5Star as number || 0);
          // @ts-expect-error dynamic access
          const r4 = vote === 4 ? newStarCount : (product.rating4Star as number || 0);
          // @ts-expect-error dynamic access
          const r3 = vote === 3 ? newStarCount : (product.rating3Star as number || 0);
          // @ts-expect-error dynamic access
          const r2 = vote === 2 ? newStarCount : (product.rating2Star as number || 0);
          // @ts-expect-error dynamic access
          const r1 = vote === 1 ? newStarCount : (product.rating1Star as number || 0);

          const totalSum = (r5 * 5) + (r4 * 4) + (r3 * 3) + (r2 * 2) + (r1 * 1);
          const newMean = Number((totalSum / newTotalCount).toFixed(1));

          await req.payload.update({
            collection: 'products',
            id,
            data: {
              [starKey]: newStarCount,
              ratingCount: newTotalCount,
              rating: newMean,
            }
          });

          return Response.json({ success: true, newRating: newMean, newCount: newTotalCount });
        } catch (error) {
          console.error('Rating endpoint error:', error);
          return Response.json({ error: 'Internal error' }, { status: 500 });
        }
      }
    }
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rentPrice',
      type: 'number',
      admin: { description: 'Monthly rent price in ₹ (e.g. 1499)' },
    },
    {
      name: 'buyPrice',
      type: 'number',
      admin: { description: 'Purchase price in ₹ (e.g. 45000)' },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 0,
      admin: { step: 0.1, readOnly: true },
    },
    {
      name: 'ratingCount',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'rating5Star',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'rating4Star',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'rating3Star',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'rating2Star',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'rating1Star',
      type: 'number',
      defaultValue: 0,
      admin: { readOnly: true },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Oxygen Equipment', value: 'oxygen' },
        { label: 'Respiratory', value: 'respiratory' },
        { label: 'ICU Equipment', value: 'icu' },
        { label: 'Mobility Aids', value: 'mobility' },
        { label: 'Monitoring', value: 'monitoring' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show in "Highest Selling Products" section' },
    },
    {
      name: 'isAvailableForRent',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isAvailableForPurchase',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first' },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'canonical',
          type: 'text',
        },
      ],
    },
  ],
}
