"use client";

import { useState } from "react";
import {
  Calendar,
  ShoppingCart,
  Star,
  Check,
} from "lucide-react";
import Image from "next/image";

const rentProducts = [
  { name: "Oxygen Concentrator", price: "₹1,499", unit: "/month", rating: 4.8, image: "/images/service-oxygen.png" },
  { name: "BiPAP Machine", price: "₹1,999", unit: "/month", rating: 4.7, image: "/images/service-medical.png" },
  { name: "Hospital Bed", price: "₹1,799", unit: "/month", rating: 4.7, image: "/images/service-icu.png" },
  { name: "Wheelchair", price: "₹499", unit: "/month", rating: 4.0, image: "/images/service-wheelchair.png" },
];

const buyProducts = [
  { name: "Oxygen Concentrator", price: "₹45,000", unit: "", rating: 4.8, image: "/images/service-oxygen.png" },
  { name: "BiPAP Machine", price: "₹75,000", unit: "", rating: 4.7, image: "/images/service-medical.png" },
  { name: "Hospital Bed", price: "₹28,000", unit: "", rating: 4.7, image: "/images/service-icu.png" },
  { name: "Wheelchair", price: "₹6,500", unit: "", rating: 4.0, image: "/images/service-wheelchair.png" },
];

const rentBenefits = [
  "Low upfront cost",
  "No maintenance worries",
  "Hassle-free replacement",
  "Flexible — rent for as long as you need",
];

const buyBenefits = [
  "One-time investment",
  "Long-term cost savings",
  "Own the product",
  "Best for long-term use",
];

export function RentOrBuySection() {
  const [mode, setMode] = useState<"rent" | "buy">("rent");

  const products = mode === "rent" ? rentProducts : buyProducts;
  const benefits = mode === "rent" ? rentBenefits : buyBenefits;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            Rent or Buy — Your Choice
          </h2>
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
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 group"
            >
              <div className="aspect-[4/3] bg-section-alt-bg relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 space-y-2">
                <h3 className="text-sm font-semibold text-text-dark line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3 w-3 ${
                        s <= Math.floor(product.rating)
                          ? "text-gold fill-gold"
                          : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-teal">
                    {product.price}
                  </span>
                  {product.unit && (
                    <span className="text-xs text-text-muted">
                      {product.unit}
                    </span>
                  )}
                </div>
                <button className="w-full py-2 text-xs font-semibold rounded-lg bg-teal text-white hover:bg-teal-dark transition-colors cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits banner */}
        <div
          className={`rounded-2xl p-6 sm:p-8 ${
            mode === "rent" ? "bg-green-light-bg" : "bg-orange-light-bg"
          } transition-colors`}
        >
          <h3
            className={`font-heading text-lg font-bold mb-4 ${
              mode === "rent" ? "text-teal" : "text-orange"
            }`}
          >
            Benefits of {mode === "rent" ? "Renting" : "Buying"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    mode === "rent"
                      ? "bg-teal/15 text-teal"
                      : "bg-orange/15 text-orange"
                  }`}
                >
                  <Check className="h-3 w-3" />
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
