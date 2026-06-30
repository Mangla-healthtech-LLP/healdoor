import type { MediaItem, LexicalContent } from './payload'

export interface HeroBlockData {
  blockType: 'hero'
  id?: string
  heading: string
  subHeading?: string | null
  primaryButtonText?: string | null
  primaryButtonLink?: string | null
  secondaryButtonText?: string | null
  secondaryButtonLink?: string | null
  backgroundImage?: MediaItem | number | null
  alignment?: 'left' | 'center' | 'right'
  showStats?: boolean
}

export interface CTABlockData {
  blockType: 'cta'
  id?: string
  title: string
  description?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  backgroundColor?: 'teal' | 'white' | 'dark'
}

export interface FeatureBlockData {
  blockType: 'feature'
  id?: string
  sectionTitle?: string | null
  sectionDescription?: string | null
  features?: {
    icon?: string | null
    title: string
    description?: string | null
    id?: string | null
  }[]
}

export interface FAQBlockData {
  blockType: 'faq'
  id?: string
  sectionTitle?: string | null
  sectionDescription?: string | null
  faqItems?: {
    question: string
    answer: string
    id?: string | null
  }[]
}

export interface TestimonialBlockData {
  blockType: 'testimonial'
  id?: string
  sectionTitle?: string | null
  testimonialItems?: {
    name: string
    designation?: string | null
    rating?: number | null
    photo?: MediaItem | number | null
    review: string
    id?: string | null
  }[]
}

export interface RichTextBlockData {
  blockType: 'richText'
  id?: string
  content?: LexicalContent | null
}

export interface ProductGridBlockData {
  blockType: 'productGrid'
  id?: string
  sectionTitle?: string | null
  sectionDescription?: string | null
  displayMode?: 'rent' | 'buy' | 'both'
  products?: (number | { id: number; name: string; slug: string; image?: MediaItem | number | null; rentPrice?: number | null; buyPrice?: number | null; rating?: number | null; isAvailableForRent?: boolean | null; isAvailableForPurchase?: boolean | null })[]
}

export interface StepsBlockData {
  blockType: 'steps'
  id?: string
  sectionTitle?: string | null
  sectionDescription?: string | null
  steps?: {
    number: string
    icon?: string | null
    title: string
    description?: string | null
    id?: string | null
  }[]
}

export interface DoctorGridBlockData {
  blockType: 'doctorGrid'
  id?: string
  sectionTitle?: string | null
  sectionDescription?: string | null
  doctors?: {
    name: string
    qualification?: string | null
    experience?: string | null
    badge?: string | null
    image?: MediaItem | number | null
    id?: string | null
  }[]
}

export interface PricingGridBlockData {
  blockType: 'pricingGrid'
  id?: string
  sectionTitle?: string | null
  sectionDescription?: string | null
  plans: {
    title: string
    price: string
    billingPeriod?: string | null
    isPopular?: boolean | null
    features?: {
      feature: string
      id?: string | null
    }[]
    buttonText?: string | null
    id?: string | null
  }[]
}

export interface ItemGridBlockData {
  blockType: 'itemGrid'
  id?: string
  sectionTitle?: string | null
  sectionDescription?: string | null
  columns?: '2' | '3' | null
  items: {
    image: MediaItem | number
    icon?: string | null
    title: string
    description?: string | null
    link?: string | null
    id?: string | null
  }[]
}

export type LayoutBlock =
  | HeroBlockData
  | CTABlockData
  | FeatureBlockData
  | FAQBlockData
  | TestimonialBlockData
  | RichTextBlockData
  | ProductGridBlockData
  | StepsBlockData
  | DoctorGridBlockData
  | PricingGridBlockData
  | ItemGridBlockData

