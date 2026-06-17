import type { MediaItem } from '@healdoor/types'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

export function getMediaUrl(media: MediaItem | number | null | undefined): string | null {
  if (!media || typeof media === 'number') return null
  if (media.url?.startsWith('http')) return media.url
  return media.url ? `${CMS_URL}${media.url}` : null
}

export function getMediaAlt(media: MediaItem | number | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return media.alt || ''
}
