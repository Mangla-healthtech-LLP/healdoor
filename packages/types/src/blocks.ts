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

export type LayoutBlock =
  | HeroBlockData
  | CTABlockData
  | FeatureBlockData
  | FAQBlockData
  | TestimonialBlockData
  | RichTextBlockData
