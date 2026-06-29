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
  page_builder?: LayoutBlock[] | null
  seo?: SEOMeta
  updatedAt: string
  createdAt: string
}

// Product
export interface Product {
  id: number
  name: string
  slug: string
  image?: MediaItem | number | null
  rentPrice?: number | null
  buyPrice?: number | null
  rating?: number | null
  ratingCount?: number | null
  rating5Star?: number | null
  rating4Star?: number | null
  rating3Star?: number | null
  rating2Star?: number | null
  rating1Star?: number | null
  category?: 'oxygen' | 'respiratory' | 'icu' | 'mobility' | 'monitoring' | 'other' | null
  isFeatured?: boolean
  isAvailableForRent?: boolean
  isAvailableForPurchase?: boolean
  sortOrder?: number | null
  description?: LexicalContent | null
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
  type: 'written' | 'video'
  name: string
  handle?: string | null
  designation?: string | null
  organization?: string | null
  image?: MediaItem | number | null
  videoFile?: MediaItem | number | null
  rating?: number | null
  testimonial: string
  timeAgo?: string | null
  social_media_link?: string | null
  instagramLink?: string | null
  isVerified?: boolean
}

// ── Homepage Settings Global ──

export interface HeroSlide {
  badge?: string | null
  heading: string
  bullets?: { text: string; id?: string | null }[]
  ctaText?: string | null
  ctaHref?: string | null
  image?: MediaItem | number | null
  qualityBadgeLine1?: string | null
  qualityBadgeLine2?: string | null
  id?: string | null
}

export interface TrustBadgeItem {
  icon?: string | null
  title: string
  description?: string | null
  id?: string | null
}

export interface ProblemItem {
  icon?: string | null
  title: string
  id?: string | null
}

export interface DoctorProfile {
  name: string
  qualification?: string | null
  experience?: string | null
  badge?: string | null
  image?: MediaItem | number | null
  linkedin?: string | null
  twitter?: string | null
  instagram?: string | null
  id?: string | null
}

export interface BeforeAfterStory {
  patientName: string
  age?: number | null
  condition?: string | null
  quote?: string | null
  beforeImage?: MediaItem | number | null
  afterImage?: MediaItem | number | null
  patientImage?: MediaItem | number | null
  fullStoryLink?: string | null
  id?: string | null
}

export interface TeamMember {
  name: string
  role?: string | null
  image?: MediaItem | number | null
  badges?: { label: string; id?: string | null }[]
  education?: { text: string; id?: string | null }[]
  experience?: { text: string; id?: string | null }[]
  id?: string | null
}

export interface HowItWorksStep {
  number: string
  icon?: string | null
  title: string
  description?: string | null
  id?: string | null
}

export interface ServiceCategoryItem {
  title: string
  subtitle?: string | null
  image?: MediaItem | number | null
  href: string
  id?: string | null
}

export interface HomepageSettings {
  heroSlides?: HeroSlide[]
  healthcareIntro?: {
    heading?: string | null
    description?: string | null
  }
  serviceCategories?: ServiceCategoryItem[]
  trustBadges?: TrustBadgeItem[]
  problemsSection?: {
    heading?: string | null
    description?: string | null
    problems?: ProblemItem[]
  }
  highestSellingSection?: {
    heading?: string | null
    description?: string | null
  }
  rentOrBuySection?: {
    heading?: string | null
    description?: string | null
    rentBenefits?: { text: string; id?: string | null }[]
    buyBenefits?: { text: string; id?: string | null }[]
  }
  expertDoctorsSection?: {
    heading?: string | null
    description?: string | null
    doctors?: DoctorProfile[]
  }
  testimonialsSection?: {
    heading?: string | null
    description?: string | null
  }
  beforeAfterSection?: {
    heading?: string | null
    description?: string | null
    stories?: BeforeAfterStory[]
  }
  ourStorySection?: {
    heading?: string | null
    narrative?: LexicalContent | null
    team?: TeamMember[]
  }
  blogsSection?: {
    heading?: string | null
    description?: string | null
  }
  howItWorksSection?: {
    heading?: string | null
    description?: string | null
    steps?: HowItWorksStep[]
  }
  locationSection?: {
    heading?: string | null
    companyName?: string | null
    address?: string | null
    mapEmbedUrl?: string | null
    getDirectionsLink?: string | null
  }
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
