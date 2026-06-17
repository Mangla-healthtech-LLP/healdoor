interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

import { Breadcrumbs } from "./Breadcrumbs";

export function PageHeader({ title, subtitle, description, breadcrumbs }: PageHeaderProps) {
  const displaySubtitle = description || subtitle;
  return (
    <>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="bg-white py-10 lg:py-14 border-b border-border/30">
        <div className="container text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-dark mb-3">
            {title}
          </h1>
          {displaySubtitle && (
            <p className="text-base sm:text-lg text-text-body max-w-2xl mx-auto">
              {displaySubtitle}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
