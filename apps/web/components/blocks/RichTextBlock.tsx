import React from 'react'
import type { RichTextBlockData } from '@healdoor/types'
import { LexicalSerializer } from '../renderer/LexicalSerializer'

export function RichTextBlock({ content }: RichTextBlockData) {
  if (!content) return null

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-teal hover:prose-a:text-teal-dark prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl">
          <LexicalSerializer content={content} />
        </div>
      </div>
    </section>
  )
}
