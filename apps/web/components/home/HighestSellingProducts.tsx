"use client";

import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

const products = [
  {
    name: "Oxygen Concentrator",
    rentPrice: "₹1,499",
    rentUnit: "/month",
    buyPrice: "₹45,000",
    rating: 4.8,
    image: "/images/service-oxygen.png",
  },
  {
    name: "BiPAP Machine",
    rentPrice: "₹1,999",
    rentUnit: "/month",
    buyPrice: "₹75,000",
    rating: 4.7,
    image: "/images/service-medical.png",
  },
  {
    name: "Suction Machine",
    rentPrice: "₹999",
    rentUnit: "/month",
    buyPrice: "₹18,500",
    rating: 4.6,
    image: "/images/service-icu.png",
  },
  {
    name: "Hospital Bed (Manual)",
    rentPrice: "₹1,799",
    rentUnit: "/month",
    buyPrice: "₹28,000",
    rating: 4.7,
    image: "/images/service-icu.png",
  },
  {
    name: "Wheelchair",
    rentPrice: "₹499",
    rentUnit: "/month",
    buyPrice: "₹6,500",
    rating: 4.0,
    image: "/images/service-wheelchair.png",
  },
  {
    name: "Walker (Folding)",
    rentPrice: "₹299",
    rentUnit: "/month",
    buyPrice: "₹1,899",
    rating: 4.5,
    image: "/images/service-wheelchair.png",
  },
  {
    name: "Patient Monitor",
    rentPrice: "₹1,299",
    rentUnit: "/month",
    buyPrice: "₹22,000",
    rating: 4.5,
    image: "/images/service-medical.png",
  },
  {
    name: "Nebulizer Machine",
    rentPrice: "₹499",
    rentUnit: "/month",
    buyPrice: "₹2,200",
    rating: 4.6,
    image: "/images/service-medical.png",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.floor(rating)
              ? "text-gold fill-gold"
              : star <= rating
                ? "text-gold fill-gold/50"
                : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
      <span className="text-xs text-text-muted ml-1">{rating}</span>
    </div>
  );
}

export function HighestSellingProducts() {
  const [mode, setMode] = useState<"rent" | "buy">("rent");

  return (
    <section className="section-padding bg-section-alt-bg">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-dark">
              Highest Selling Products
            </h2>
          </div>
          {/* Mini toggle */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-border shadow-sm">
            <button
              onClick={() => setMode("rent")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                mode === "rent"
                  ? "bg-teal text-white shadow-sm"
                  : "text-text-muted hover:text-text-body"
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => setMode("buy")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                mode === "buy"
                  ? "bg-teal text-white shadow-sm"
                  : "text-text-muted hover:text-text-body"
              }`}
            >
              Buy
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 group"
            >
              {/* Image */}
              <div className="aspect-square bg-section-alt-bg relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-3 space-y-2">
                <h3 className="text-sm font-semibold text-text-dark line-clamp-1">
                  {product.name}
                </h3>
                <StarRating rating={product.rating} />
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-teal">
                    {mode === "rent" ? product.rentPrice : product.buyPrice}
                  </span>
                  {mode === "rent" && (
                    <span className="text-xs text-text-muted">
                      {product.rentUnit}
                    </span>
                  )}
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg bg-teal text-white hover:bg-teal-dark transition-colors cursor-pointer">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
