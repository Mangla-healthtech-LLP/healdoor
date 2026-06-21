import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/physiotherapy',
    '/products',
    '/contact',
  ].map((route) => ({
    url: `${appUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: Fetch dynamic routes from CMS (e.g., individual products or blog posts)
  // and append them to the sitemap array for dynamic generation.

  return [...staticRoutes];
}
