"use client";

import { useState } from "react";
import {
  Calendar,
  ShoppingCart,
  Star,
  Check,
} from "lucide-react";
import Image from "next/image";
import type { Product } from "@healdoor/types";
import { getMediaUrl, getMediaAlt } from "@healdoor/utils";

const defaultRentProducts: Partial<Product>[] = [
  { name: "Oxygen Concentrator", rentPrice: 1499, rating: 4.8, slug: "oxygen-concentrator" },
  { name: "BiPAP Machine", rentPrice: 1999, rating: 4.7, slug: "bipap" },
  { name: "Hospital Bed (Manual)", rentPrice: 1799, rating: 4.7, slug: "hospital-bed" },
  { name: "Wheelchair", rentPrice: 499, rating: 4.0, slug: "wheelchair" },
];

const fallbackImages = [
  "/images/service-oxygen.png",
  "/images/service-medical.png",
  "/images/service-icu.png",
  "/images/service-wheelchair.png",
];

const defaultRentBenefits = [
  "Low upfront cost",
  "No maintenance worries",
  "Hassle-free replacement",
  "Flexible — rent for as long as you need",
];

const defaultBuyBenefits = [
  "One-time investment",
  "Long-term cost savings",
  "Own the product",
  "Best for long-term use",
];

interface RentOrBuySectionProps {
  heading?: string | null;
  description?: string | null;
  products?: Product[];
  rentBenefits?: { text: string; id?: string | null }[];
  buyBenefits?: { text: string; id?: string | null }[];
}

export function RentOrBuySection({
  heading = "Rent or Buy – Your Choice",
  description = "Flexible options to suit your healthcare needs and budget.",
  products,
  rentBenefits,
  buyBenefits,
}: RentOrBuySectionProps) {
  const [mode, setMode] = useState<'rent' | 'buy'>('buy')
  const data = products && products.length > 0 ? products : defaultRentProducts;
  const rBenefits = rentBenefits && rentBenefits.length > 0
    ? rentBenefits.map((b) => b.text)
    : defaultRentBenefits;
  const bBenefits = buyBenefits && buyBenefits.length > 0
    ? buyBenefits.map((b) => b.text)
    : defaultBuyBenefits;
  const benefits = mode === "rent" ? rBenefits : bBenefits;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            {heading}
          </h2>
          {description && (
            <p className="text-base text-text-body max-w-xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setMode("rent")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer ${
              mode === "rent"
                ? "bg-teal text-white shadow-md"
                : "bg-white border border-border text-text-body hover:border-teal/30"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Rent (Monthly)
          </button>
          <button
            onClick={() => setMode("buy")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer ${
              mode === "buy"
                ? "bg-teal text-white shadow-md"
                : "bg-white border border-border text-text-body hover:border-teal/30"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Purchase
          </button>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {data.map((product, index) => {
            const imageUrl =
              getMediaUrl((product as Product).image as Parameters<typeof getMediaUrl>[0]) ||
              fallbackImages[index] ||
              "/images/service-medical.png";
            const price =
              mode === "rent"
                ? product.rentPrice
                : (product as Product).buyPrice;

            return (
              <div
                key={(product as Product).id || product.slug || index}
                className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 group"
              >
                <div className="aspect-[4/3] bg-section-alt-bg relative overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={
                      getMediaAlt((product as Product).image as Parameters<typeof getMediaAlt>[0]) ||
                      product.name || ""
                    }
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 space-y-1.5">
                  <h3 className="text-sm font-semibold text-text-dark line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-3 w-3 ${
                          s <= Math.floor(product.rating || 0)
                            ? "text-gold fill-gold"
                            : "text-gray-200 fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-teal">
                      ₹{(price || 0).toLocaleString("en-IN")}
                    </span>
                    {mode === "rent" && (
                      <span className="text-xs text-text-muted">/month</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits banner */}
        <div
          className={`rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
            mode === "rent" ? "bg-green-light-bg" : "bg-orange-light-bg"
          } transition-colors`}
        >
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                mode === "rent" ? "bg-teal text-white" : "bg-orange text-white"
              }`}
            >
              <Check className="h-4 w-4" />
            </div>
            <h3
              className={`font-heading text-base font-bold ${
                mode === "rent" ? "text-teal" : "text-orange"
              }`}
            >
              Benefits of {mode === "rent" ? "Renting" : "Buying"}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    mode === "rent"
                      ? "bg-teal/15 text-teal"
                      : "bg-orange/15 text-orange"
                  }`}
                >
                  <Check className="h-2.5 w-2.5" />
                </div>
                <span className="text-sm text-text-body">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
