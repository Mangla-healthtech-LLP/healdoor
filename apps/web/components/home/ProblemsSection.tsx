import { Wind, Building2, HeartPulse, Activity } from "lucide-react";
import type { ProblemItem } from "@healdoor/types";
import Link from "next/link";

const IconMap: Record<string, React.ElementType> = {
  Wind,
  Building2,
  HeartPulse,
  Activity,
};

const defaultProblems: ProblemItem[] = [
  { icon: "Wind", title: "Breathing difficulty at Home" },
  { icon: "Building2", title: "Frequent Hospital visits" },
  { icon: "HeartPulse", title: "Post surgery recovery pain" },
  { icon: "Activity", title: "Low oxygen levels" },
];

interface ProblemsSectionProps {
  heading?: string | null;
  description?: string | null;
  problems?: ProblemItem[];
}

export function ProblemsSection({
  heading = "Are you facing these Problems ?",
  description = "We are here to help you with the best care and support at your doorstep.",
  problems,
}: ProblemsSectionProps) {
  const data = problems && problems.length > 0 ? problems : defaultProblems;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            {heading}
          </h2>
          <p className="text-base text-text-body max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {data.map((problem) => {
            const iconName = problem.icon || "HeartPulse";
            const Icon = IconMap[iconName] || HeartPulse;

            return (
              <div
                key={problem.id || problem.title}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-section-alt-bg hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
                  <Icon className="h-7 w-7 text-teal" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-text-dark leading-tight">
                  {problem.title}
                </h3>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-orange text-white font-semibold rounded-full shadow-lg hover:bg-teal-dark hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
