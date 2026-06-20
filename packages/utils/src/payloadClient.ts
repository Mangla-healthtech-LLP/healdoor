import type { Page, Blog, Service, Product, Testimonial, HomepageSettings, PayloadResponse } from '@healdoor/types'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'
const API_KEY = process.env.PAYLOAD_API_KEY || ''

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  ...(API_KEY ? { Authorization: `users API-Key ${API_KEY}` } : {}),
}

async function fetchPayload<T>(endpoint: string, options?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {
  const res = await fetch(`${CMS_URL}/api${endpoint}`, {
    headers,
    next: { revalidate: 60 }, // ISR: revalidate every 60s
    ...options,
  } as any)
  if (!res.ok) throw new Error(`Payload API error: ${res.status} ${res.statusText}`)
  return res.json()
}

// Pages
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const data = await fetchPayload<PayloadResponse<Page>>(
    `/pages?where[slug][equals]=${slug}&where[status][equals]=published&depth=2&limit=1`
  )
  return data.docs[0] ?? null
}

export async function getAllPageSlugs(): Promise<string[]> {
  const data = await fetchPayload<PayloadResponse<Page>>(
    `/pages?where[status][equals]=published&limit=100&depth=0`
  )
  return data.docs.map((p) => p.slug)
}

// Services
export async function getServices(): Promise<Service[]> {
  const data = await fetchPayload<PayloadResponse<Service>>(`/services?depth=1&limit=100`)
  return data.docs
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await fetchPayload<PayloadResponse<Service>>(
    `/services?where[slug][equals]=${slug}&depth=2&limit=1`
  )
  return data.docs[0] ?? null
}

// Blogs
export async function getBlogs(params?: {
  page?: number; limit?: number; category?: string
}): Promise<PayloadResponse<Blog>> {
  const { page = 1, limit = 12, category } = params ?? {}
  let query = `/blogs?depth=1&limit=${limit}&page=${page}&sort=-publish_date`
  if (category) query += `&where[category][equals]=${category}`
  return fetchPayload<PayloadResponse<Blog>>(query)
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const data = await fetchPayload<PayloadResponse<Blog>>(
    `/blogs?where[slug][equals]=${slug}&depth=2&limit=1`
  )
  return data.docs[0] ?? null
}

// Homepage Settings (Global)
export async function getHomepageSettings(): Promise<HomepageSettings> {
  return fetchPayload<HomepageSettings>(`/globals/homepage-settings?depth=2`)
}

// Products
export async function getProducts(params?: {
  page?: number; limit?: number; category?: string
}): Promise<PayloadResponse<Product>> {
  const { page = 1, limit = 50, category } = params ?? {}
  let query = `/products?depth=1&limit=${limit}&page=${page}&sort=sortOrder`
  if (category) query += `&where[category][equals]=${category}`
  return fetchPayload<PayloadResponse<Product>>(query)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await fetchPayload<PayloadResponse<Product>>(
    `/products?where[slug][equals]=${slug}&depth=2&limit=1`
  )
  return data.docs[0] ?? null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await fetchPayload<PayloadResponse<Product>>(
    `/products?where[isFeatured][equals]=true&depth=1&limit=20&sort=sortOrder`
  )
  return data.docs
}

// Testimonials
export async function getTestimonials(params?: {
  type?: 'video' | 'written'; limit?: number
}): Promise<Testimonial[]> {
  const { type, limit = 20 } = params ?? {}
  let query = `/testimonials?depth=1&limit=${limit}`
  if (type) query += `&where[type][equals]=${type}`
  const data = await fetchPayload<PayloadResponse<Testimonial>>(query)
  return data.docs
}

