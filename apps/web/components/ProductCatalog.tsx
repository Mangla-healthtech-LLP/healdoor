"use client";

import { useState, useMemo } from "react";
import { Star, ShoppingCart, Calendar, Search, Filter, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@healdoor/types";
import { getMediaUrl, getMediaAlt } from "@healdoor/utils";

interface ProductCatalogProps {
  initialProducts: Product[];
}

const CATEGORIES = [
  { label: 'All Products', value: 'all' },
  { label: 'Oxygen Equipment', value: 'oxygen' },
  { label: 'Respiratory', value: 'respiratory' },
  { label: 'ICU Equipment', value: 'icu' },
  { label: 'Mobility Aids', value: 'mobility' },
  { label: 'Monitoring', value: 'monitoring' },
  { label: 'Other', value: 'other' },
];

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Highest Selling', value: 'featured' },
  { label: 'Highest Rated', value: 'highest_rated' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];

export function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    // Filter by category
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isFeatured === b.isFeatured) return 0;
        return a.isFeatured ? -1 : 1;
      }
      if (sortBy === 'highest_rated') {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingB - ratingA;
      }
      if (sortBy === 'price_asc') {
        const priceA = mode === 'rent' ? (a.rentPrice || 0) : (a.buyPrice || 0);
        const priceB = mode === 'rent' ? (b.rentPrice || 0) : (b.buyPrice || 0);
        return priceA - priceB;
      }
      if (sortBy === 'price_desc') {
        const priceA = mode === 'rent' ? (a.rentPrice || 0) : (a.buyPrice || 0);
        const priceB = mode === 'rent' ? (b.rentPrice || 0) : (b.buyPrice || 0);
        return priceB - priceA;
      }
      
      // Default (sortOrder)
      const sortA = a.sortOrder || 0;
      const sortB = b.sortOrder || 0;
      return sortA - sortB;
    });

    return result;
  }, [initialProducts, searchQuery, category, sortBy, mode]);

  const controlsContent = (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all text-text-dark text-sm bg-section-alt-bg"
          />
        </div>
      </div>

      {/* Mode Toggle */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Mode</label>
        <div className="flex bg-section-alt-bg p-1 rounded-xl">
          <button
            onClick={() => setMode("rent")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
              mode === "rent"
                ? "bg-white text-teal shadow-sm border border-border/50"
                : "text-text-muted hover:text-text-dark"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Rent
          </button>
          <button
            onClick={() => setMode("buy")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
              mode === "buy"
                ? "bg-white text-teal shadow-sm border border-border/50"
                : "text-text-muted hover:text-text-dark"
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Buy
          </button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Category</label>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat.value
                  ? 'bg-teal text-white'
                  : 'hover:bg-gray-200 text-text-body'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-section-alt-bg border border-border text-text-dark text-sm rounded-lg focus:ring-teal focus:border-teal block py-2 px-3"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <section className="section-padding-sm bg-section-alt-bg">
      <div className="container">
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Mobile Header / Drawer Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-white p-3 md:p-4 rounded-xl shadow-sm border border-border/50">
            <div className="text-sm font-bold text-text-dark">
              {filteredAndSortedProducts.length} <span className="text-text-muted font-normal">products</span>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(true)} 
              className="flex items-center gap-2 bg-section-alt-bg hover:bg-gray-200 text-teal px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
            >
              <Menu className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile Drawer Overlay */}
          {isDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsDrawerOpen(false)} 
              />
              <div className="absolute top-0 bottom-0 left-0 w-[280px] bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300">
                <div className="p-4 border-b border-border/50 flex justify-between items-center sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-teal" />
                    <h2 className="font-bold text-lg text-text-dark">Filters</h2>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)} 
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>
                <div className="p-5">
                  {controlsContent}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-border/50 p-5">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                <Filter className="w-5 h-5 text-teal" />
                <h2 className="font-bold text-lg text-text-dark">Filters & Sort</h2>
              </div>
              {controlsContent}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            
            {/* Results Info (Desktop) */}
            <div className="hidden lg:flex mb-6 justify-between items-end">
              <p className="text-text-muted text-sm font-medium">
                Showing <span className="text-text-dark font-bold">{filteredAndSortedProducts.length}</span> products
              </p>
            </div>

            {/* Product Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {filteredAndSortedProducts.map((product, i) => {
                  const imageUrl =
                    getMediaUrl(product.image as Parameters<typeof getMediaUrl>[0]) || "/images/service-medical.png";
                  const price = mode === "rent" ? product.rentPrice : product.buyPrice;

                  return (
                    <Link
                      key={product.id || i}
                      href={`/products/${product.slug}`}
                      className="flex flex-col bg-white rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full"
                    >
                      <div className="aspect-square bg-section-alt-bg relative overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={getMediaAlt(product.image as Parameters<typeof getMediaAlt>[0]) || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.isFeatured && (
                          <div className="absolute top-2 left-2 bg-gold/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Bestseller
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex flex-col flex-grow space-y-1.5">
                        <h3 className="text-sm font-semibold text-text-dark line-clamp-2 group-hover:text-teal transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-1 mt-auto">
                          {product.rating && product.rating > 0 ? (
                            <>
                              <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                              <span className="text-xs font-bold text-text-dark">{product.rating}</span>
                              <span className="text-[10px] text-text-muted">({product.ratingCount || 0})</span>
                            </>
                          ) : (
                            <span className="text-xs text-text-muted">No ratings yet</span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1 pt-2 border-t border-border/30">
                          <span className="text-lg font-bold text-teal">
                            ₹{(price || 0).toLocaleString("en-IN")}
                          </span>
                          {mode === "rent" && (
                            <span className="text-[10px] font-medium text-text-muted">/month</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-border/50 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-section-alt-bg mb-4">
                  <Search className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-2">No products found</h3>
                <p className="text-text-muted">Try adjusting your search or filters to find what you&apos;re looking for.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setCategory('all');
                    setSortBy('default');
                  }}
                  className="mt-6 px-6 py-2 bg-teal text-white rounded-full font-semibold hover:bg-teal-light hover:text-teal transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
