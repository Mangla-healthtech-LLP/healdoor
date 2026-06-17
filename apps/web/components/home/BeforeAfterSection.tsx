import { User, Calendar, HeartPulse, ArrowRight } from "lucide-react";
import Image from "next/image";

export function BeforeAfterSection() {
  return (
    <section className="section-padding bg-section-alt-bg">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            Before vs After — Real Results
          </h2>
          <p className="text-base text-text-body max-w-xl mx-auto">
            See the difference HealDoor care can make.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
          {/* Before */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
            <Image
              src="/images/service-icu.png"
              alt="Before — patient in need of care"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-red-500/80 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                Before
              </span>
            </div>
          </div>

          {/* After */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
            <Image
              src="/images/service-physio.png"
              alt="After — patient recovered with HealDoor care"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-teal/80 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                After
              </span>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-border/30">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-light flex items-center justify-center">
                  <User className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Name</p>
                  <p className="text-sm font-bold text-text-dark">
                    Mr. Suresh Kumar
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-light flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Age</p>
                  <p className="text-sm font-bold text-text-dark">62</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-light flex items-center justify-center">
                  <HeartPulse className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Condition</p>
                  <p className="text-sm font-bold text-text-dark">COPD</p>
                </div>
              </div>

              <hr className="border-border/50" />

              <p className="text-sm text-text-body leading-relaxed">
                &ldquo;After consistent oxygen therapy and regular support from
                HealDoor, my breathing improved dramatically. I can now spend
                quality time with my family and live independently.&rdquo;
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
              >
                Read Full Story
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
