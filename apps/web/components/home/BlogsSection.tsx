import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    title: "How to Choose the Right Oxygen Concentrator for Home Use",
    date: "May 20, 2024",
    image: "/images/service-oxygen.png",
    slug: "/blog/choose-oxygen-concentrator",
  },
  {
    title: "Home Recovery After Surgery: Essential Tips for Faster Healing",
    date: "May 15, 2024",
    image: "/images/service-physio.png",
    slug: "/blog/home-recovery-surgery",
  },
  {
    title: "Benefits of Using a Hospital Bed at Home for Patient Comfort",
    date: "May 10, 2024",
    image: "/images/service-icu.png",
    slug: "/blog/hospital-bed-at-home",
  },
  {
    title: "Nebulizer Therapy: Uses, Benefits & How It Works",
    date: "May 05, 2024",
    image: "/images/service-medical.png",
    slug: "/blog/nebulizer-therapy",
  },
];

export function BlogsSection() {
  return (
    <section className="section-padding bg-section-alt-bg">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            Health &amp; Wellness Blogs
          </h2>
          <p className="text-base text-text-body max-w-xl mx-auto">
            Tips, guides and insights to help you live a healthier life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blogs.map((blog) => (
            <Link
              key={blog.title}
              href={blog.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-border/30 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Calendar className="h-3 w-3" />
                  {blog.date}
                </div>
                <h3 className="text-sm font-semibold text-text-dark leading-snug line-clamp-2 group-hover:text-teal transition-colors">
                  {blog.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors shadow-md"
          >
            Explore More Blogs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
