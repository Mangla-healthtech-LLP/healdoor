import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHeader } from '@/components/PageHeader'
import { getBlogs, getMediaUrl } from '@healdoor/utils'

export const metadata: Metadata = {
  title: 'Blog | HealDoor Healthcare Insights',
  description: 'Read the latest healthcare articles, tips, and insights from HealDoor medical professionals.',
}

export default async function BlogsPage() {
  const { docs: blogs } = await getBlogs()

  // Extract unique categories
  const categories = Array.from(new Set(blogs.map(b => b.category).filter(Boolean))) as string[]

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader 
          title="Healthcare Insights" 
          description="Expert articles, health tips, and medical news from our professionals"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blogs' }
          ]}
        />
        
        <section className="section-padding bg-section-alt-bg min-h-screen">
          <div className="container">
            {/* Simple Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-12 justify-center">
                <Link 
                  href="/blogs"
                  className="px-6 py-2 rounded-full bg-teal text-white font-medium shadow-sm transition-all"
                >
                  All Articles
                </Link>
                {categories.map((category) => (
                  <Link 
                    key={category}
                    href={`/blogs?category=${category}`}
                    className="px-6 py-2 rounded-full bg-white text-text-dark border border-border/50 hover:border-teal hover:text-teal font-medium shadow-sm transition-all"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => {
                const imageUrl = getMediaUrl(blog.featured_image) || '/images/blog-placeholder.jpg'
                const date = blog.publish_date ? new Date(blog.publish_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                }) : 'Recent'
                
                return (
                  <Link 
                    key={blog.id} 
                    href={`/blogs/${blog.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/30 flex flex-col h-full hover:-translate-y-1"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image 
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {blog.category && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal shadow-sm">
                          {blog.category.toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs font-medium text-text-muted mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>5 min read</span>
                        </div>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-text-dark mb-4 group-hover:text-teal transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <div className="mt-auto flex items-center text-teal font-semibold text-sm group-hover:gap-2 transition-all">
                        <span>Read article</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            
            {blogs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-border/30">
                <p className="text-text-muted text-lg">No articles found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
