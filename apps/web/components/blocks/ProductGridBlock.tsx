"use client";

import { useState } from "react";
import { Star, ShoppingCart, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductGridBlockData } from "@healdoor/types";
import { getMediaUrl, getMediaAlt } from "@healdoor/utils";

export function ProductGridBlock({
  sectionTitle,
  sectionDescription,
  displayMode = "both",
  products,
}: ProductGridBlockData) {
  const [mode, setMode] = useState<'rent' | 'buy'>(
    displayMode === 'rent' ? 'rent' : 'buy',
  )

  if (!products || products.length === 0) return null;

  return (
    <section className="section-padding bg-section-alt-bg">
      <div className="container">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-8">
            {sectionTitle && (
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-base text-text-body max-w-xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {displayMode === "both" && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setMode("rent")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                mode === "rent"
                  ? "bg-teal text-white shadow-md"
                  : "bg-white border border-border text-text-body"
              }`}
            >
              <Calendar className="h-4 w-4" />
              Rent
            </button>
            <button
              onClick={() => setMode("buy")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                mode === "buy"
                  ? "bg-teal text-white shadow-md"
                  : "bg-white border border-border text-text-body"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Purchase
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => {
            if (typeof product === "number") return null;
            const imageUrl =
              getMediaUrl(product.image as Parameters<typeof getMediaUrl>[0]) || "/images/service-medical.png";
            const price =
              mode === "rent" ? product.rentPrice : product.buyPrice;

            return (
              <Link
                key={product.id || i}
                href={`/products/${product.slug}`}
                className="block bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 group"
              >
                <div className="aspect-square bg-section-alt-bg relative overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={getMediaAlt(product.image as Parameters<typeof getMediaAlt>[0]) || product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 space-y-1.5">
                  <h3 className="text-sm font-semibold text-text-dark line-clamp-1">
                    {product.name}
                  </h3>
                  {product.rating && (
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
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-teal">
                      ₹{(price || 0).toLocaleString("en-IN")}
                    </span>
                    {mode === "rent" && (
                      <span className="text-xs text-text-muted">/month</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
