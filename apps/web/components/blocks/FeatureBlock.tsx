import type { FeatureBlockData } from '@healdoor/types'
import { CheckCircle2, Shield, HeartPulse, Clock, Stethoscope, Activity, Truck, Award } from 'lucide-react'

// Map of allowed lucide icons
const IconMap: Record<string, React.ElementType> = {
  CheckCircle2,
  Shield,
  HeartPulse,
  Clock,
  Stethoscope,
  Activity,
  Truck,
  Award,
}

export function FeatureBlock({
  sectionTitle,
  sectionDescription,
  features,
}: FeatureBlockData) {
  if (!features || features.length === 0) return null

  return (
    <section className="section-padding bg-section-alt-bg">
      <div className="container">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {sectionTitle && (
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-4">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-lg text-text-body">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon && IconMap[feature.icon] ? IconMap[feature.icon] : CheckCircle2

            return (
              <div 
                key={feature.id || i}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-border/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-full bg-teal-light flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white text-teal transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-text-body leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
