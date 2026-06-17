import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  dark?: boolean;
}

export function Breadcrumbs({ items, dark = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`${dark ? '' : 'bg-white border-b border-border/30'}`}>
      <div className={`container py-3 ${dark ? 'px-0' : ''}`}>
        <ol
          className={`flex items-center gap-1.5 text-sm flex-wrap ${dark ? 'text-white/70' : 'text-text-muted'}`}
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && <ChevronRight className={`h-3.5 w-3.5 ${dark ? 'text-white/40' : 'text-border'}`} />}
              {index === 0 ? (
                <Link
                  href={item.href || '/'}
                  className={`flex items-center gap-1 transition-colors ${dark ? 'hover:text-white' : 'hover:text-teal'}`}
                  itemProp="item"
                >
                  <Home className="h-3.5 w-3.5" />
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${dark ? 'hover:text-white' : 'hover:text-teal'}`}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className={`font-medium ${dark ? 'text-white' : 'text-text-dark'}`} itemProp="name">
                  {item.label}
                </span>
              )}
              <meta
                itemProp="position"
                content={String(index + 2)}
              />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
