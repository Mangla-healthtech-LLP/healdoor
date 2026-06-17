// Media
export interface MediaItem {
  id: number
  alt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  width?: number | null
  height?: number | null
}

// Service (replaces the existing minimal Service interface)
export interface Service {
  id: number
  name: string
  slug: string
  description?: LexicalContent | null
  hero_image?: MediaItem | number | null
  features?: { feature?: string | null; id?: string | null }[] | null
  faqs?: (number | FAQ)[] | null
  seo?: SEOMeta
  updatedAt: string
  createdAt: string
}

// Page
export interface Page {
  id: number
  title: string
  slug: string
  status?: 'draft' | 'published'
  publishedAt?: string | null
  page_builder?: LayoutBlock[] | null
  seo?: { meta_title?: string | null; meta_description?: string | null }
  updatedAt: string
  createdAt: string
}

import type { LayoutBlock } from './blocks'

// Blog
export interface Blog {
  id: number
  title: string
  slug: string
  featured_image?: MediaItem | number | null
  content?: LexicalContent | null
  category?: string | null
  tags?: { tag?: string | null; id?: string | null }[] | null
  author?: { firstName: string; lastName?: string | null } | number | null
  publish_date?: string | null
  seo?: { meta_title?: string | null; meta_description?: string | null }
  updatedAt: string
  createdAt: string
}

// FAQ
export interface FAQ {
  id: number
  question: string
  answer: LexicalContent
  category?: string | null
}

// Testimonial
export interface Testimonial {
  id: number
  name: string
  designation?: string | null
  organization?: string | null
  image?: MediaItem | number | null
  rating?: number | null
  testimonial: string
  social_media_link?: string | null
}

// Shared
export interface SEOMeta {
  title?: string | null
  description?: string | null
  canonical?: string | null
}

export interface LexicalContent {
  root: {
    type: string
    children: { type: any; version: number; [k: string]: unknown }[]
    direction: ('ltr' | 'rtl') | null
    format: string
    indent: number
    version: number
  }
  [k: string]: unknown
}

// Payload REST API response wrapper
export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
  pagingCounter: number
}
