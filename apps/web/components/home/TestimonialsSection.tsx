import { Star, Play, Quote } from "lucide-react";
import Image from "next/image";

const videoTestimonials = [
  {
    handle: "@neha.pandey",
    quote:
      "The oxygen concentrator from HealDoor has been a life saver for my father.",
    thumbnail: "/images/service-oxygen.png",
  },
  {
    handle: "@rohit.sharma",
    quote:
      "Very reliable service and genuine support. Highly recommended!",
    thumbnail: "/images/service-physio.png",
  },
  {
    handle: "@kavya_03",
    quote:
      "Post surgery recovery was so much easier with their equipment at home.",
    thumbnail: "/images/service-icu.png",
  },
  {
    handle: "@ankitverma",
    quote:
      "Great experience! On-time delivery and excellent customer care.",
    thumbnail: "/images/service-medical.png",
  },
];

const writtenTestimonials = [
  {
    name: "Anjali Mehta",
    time: "2 weeks ago",
    rating: 5,
    text: "Excellent service and very professional team. They delivered the equipment the same day and guided us very well. Truly reliable!",
    initials: "AM",
  },
  {
    name: "Vikram Singh",
    time: "1 month ago",
    rating: 5,
    text: "HealDoor made my recovery journey so much easier. The equipment quality is top-notch and the support team is always available.",
    initials: "VS",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            Testimonials
          </h2>
          <p className="text-base text-text-body max-w-xl mx-auto">
            Real stories from real people who chose HealDoor.
          </p>
        </div>

        {/* Video testimonials */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {videoTestimonials.map((t) => (
            <div
              key={t.handle}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
            >
              <Image
                src={t.thumbnail}
                alt={`Video testimonial from ${t.handle}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-white/70 font-medium mb-1">
                  {t.handle}
                </p>
                <p className="text-xs text-white leading-relaxed line-clamp-2">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Written testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {writtenTestimonials.map((t) => (
            <div
              key={t.name}
              className="bg-section-alt-bg rounded-2xl p-6 border border-border/30 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-teal/10" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-white">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-dark">
                    {t.name}
                  </h4>
                  <p className="text-xs text-text-muted">{t.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s <= t.rating
                        ? "text-gold fill-gold"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-text-body leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
