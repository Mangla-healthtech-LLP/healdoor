"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Wind,
  BedDouble,
  Microscope,
  Accessibility,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const serviceTabs = [
  {
    title: "Physiotherapy",
    href: "/physiotherapy",
    icon: Activity,
  },

  {
    title: "Oxygen Equipment",
    href: "/oxygen-equipment",
    icon: Wind,
  },
  {
    title: "Investigation at Home",
    href: "/services/investigations-at-home",
    icon: Microscope,
  },
  {
    title: "Wheelchair, Walkers & Crutches",
    href: "/wheelchairs-walkers-crutches",
    icon: Accessibility,
  },
  {
    title: "ICU at Home",
    href: "/services/icu-at-home",
    icon: BedDouble,
  },
  {
    title: "Other Medical Equipments",
    href: "/products",
    icon: Stethoscope,
  },
];

export function ServiceNavTabs() {
  const pathname = usePathname();

  return (
    <div className="bg-section-alt-bg border-b border-border/50">
      <div className="container py-2">
        <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-1 px-1 -mx-1">
          {serviceTabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`group flex flex-col md:flex-row items-center text-center md:text-left gap-1.5 md:gap-2 p-2 md:px-3 md:py-2 rounded-xl border transition-all flex-1 min-w-[90px] md:min-w-[150px] max-w-[110px] md:max-w-[240px] ${isActive
                  ? "bg-white border-teal/30 shadow-md"
                  : "bg-white border-transparent hover:bg-white hover:shadow-sm"
                  }`}
              >
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive
                    ? "bg-teal text-white"
                    : "bg-teal-light text-teal group-hover:bg-teal group-hover:text-white"
                    } transition-colors`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`flex-1 text-[11px] md:text-[13px] font-semibold leading-tight md:leading-snug line-clamp-2 md:line-clamp-2 ${isActive ? "text-text-dark" : "text-text-body group-hover:text-text-dark"
                    }`}
                  title={tab.title}
                >
                  {tab.title}
                </span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 hidden md:flex ${isActive
                    ? "bg-teal text-white"
                    : "bg-teal-light text-teal group-hover:bg-teal group-hover:text-white"
                    } transition-colors`}
                >
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
