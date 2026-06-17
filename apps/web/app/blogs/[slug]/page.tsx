import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogBySlug, getBlogs, getMediaUrl } from '@healdoor/utils'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LexicalSerializer } from '@/components/renderer/LexicalSerializer'
import { User2, ArrowLeft, Share2 } from 'lucide-react'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const { docs: blogs } = await getBlogs({ limit: 100 })
  return blogs.map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const blog = await getBlogBySlug(resolvedParams.slug)
  if (!blog) return {}
  
  const imageUrl = getMediaUrl(blog.featured_image) || ''
  
  return {
    title: blog.seo?.meta_title || `${blog.title} | HealDoor Blog`,
    description: blog.seo?.meta_description || blog.title,
    openGraph: {
      title: blog.title,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'article',
      publishedTime: blog.publish_date || undefined,
    }
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params
  const blog = await getBlogBySlug(resolvedParams.slug)
  if (!blog) notFound()

  const imageUrl = getMediaUrl(blog.featured_image)
  const date = blog.publish_date ? new Date(blog.publish_date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : ''
  
  let authorName = 'HealDoor Editorial Team'
  if (blog.author && typeof blog.author !== 'number') {
    authorName = `${blog.author.firstName} ${blog.author.lastName || ''}`.trim()
  }

  // Fetch related blogs
  const { docs: allBlogs } = await getBlogs({ limit: 4 })
  const relatedBlogs = allBlogs.filter(b => b.id !== blog.id).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Article Header */}
        <div className="container max-w-4xl pt-32 pb-10">
          <Link href="/blogs" className="inline-flex items-center text-teal hover:text-teal-dark font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="mb-6">
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blogs' },
                { label: blog.title, href: `/blogs/${blog.slug}` }
              ]} 
            />
          </div>

          {blog.category && (
            <div className="mb-6">
              <span className="px-3 py-1 rounded-full bg-teal-light text-teal text-xs font-bold uppercase tracking-wider">
                {blog.category}
              </span>
            </div>
          )}

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark mb-8 leading-[1.2]">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border/50 mb-8">
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-text-muted">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <User2 className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-text-dark">{authorName}</span>
                  {date && <span className="font-normal text-xs">{date}</span>}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-text-muted hidden sm:inline-block">Share:</span>
              <button className="w-10 h-10 rounded-full bg-slate-50 border border-border/50 flex items-center justify-center text-text-muted hover:text-teal hover:border-teal transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <div className="container max-w-5xl mb-16">
            <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden bg-slate-100 border border-border/30">
              <Image 
                src={imageUrl} 
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <article className="container max-w-3xl pb-20">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-text-dark prose-a:text-teal hover:prose-a:text-teal-dark prose-img:rounded-2xl prose-img:border prose-img:border-border/50 prose-hr:border-border/50">
            {blog.content ? (
              <LexicalSerializer content={blog.content} />
            ) : (
              <p>Content is currently being updated.</p>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/50 flex flex-wrap gap-2">
              {blog.tags.map(tag => tag.tag && (
                <span key={tag.id} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                  #{tag.tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="section-padding bg-section-alt-bg border-t border-border/30">
            <div className="container">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-heading text-3xl font-bold text-text-dark">Read Next</h2>
                <Link href="/blogs" className="text-teal font-semibold hover:text-teal-dark hidden sm:block">
                  View all articles
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map(related => {
                  const relImageUrl = getMediaUrl(related.featured_image) || '/images/blog-placeholder.jpg'
                  return (
                    <Link 
                      key={related.id} 
                      href={`/blogs/${related.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/30 flex flex-col h-full hover:-translate-y-1"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                          src={relImageUrl}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        {related.category && (
                          <div className="text-teal font-bold text-xs uppercase tracking-wider mb-2">
                            {related.category}
                          </div>
                        )}
                        <h3 className="font-heading text-lg font-bold text-text-dark mb-4 group-hover:text-teal transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
