'use client'

import { useState, useRef, useEffect } from 'react'
import {
  PhoneCall,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@healdoor/ui'

const servicesDropdown = [
  { label: 'Physiotherapy', href: '/physiotherapy' },
  { label: 'Doctor Consultation', href: '/doctor-consultation' },
  { label: 'Disease Prevention/ Diet Plan', href: '/disease-prevention' },
  { label: 'ICU setup at Home', href: '/services/icu-at-home' },
  { label: 'Blood tests at Home', href: '/services/investigations-at-home' },
]

const equipmentsDropdown = [
  { label: 'Physiotherapy Equipments', href: '/physiotherapy/equipments' },
  { label: 'Oxygen Equipments', href: '/oxygen-equipment' },
  {
    label: 'Wheelchairs and Walking Aids',
    href: '/wheelchairs-walkers-crutches',
  },
]

function DropdownMenu({
  label,
  items,
  isOpen,
  onToggle,
}: {
  label: string
  items: { label: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isOpen) onToggle()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onToggle])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-teal cursor-pointer"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-border/50 py-2 z-50 animate-fade-in">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-text-body hover:bg-teal-light hover:text-teal transition-colors"
              onClick={onToggle}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur supports-[backdrop-filter]:bg-whitebg-gradient-to-br border-b border-border/50 shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Logo width={160} height={60} className="w-auto h-12" priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <DropdownMenu
            label="Services"
            items={servicesDropdown}
            isOpen={openDropdown === 'services'}
            onToggle={() =>
              setOpenDropdown(openDropdown === 'services' ? null : 'services')
            }
          />
          <DropdownMenu
            label="Equipments"
            items={equipmentsDropdown}
            isOpen={openDropdown === 'equipments'}
            onToggle={() =>
              setOpenDropdown(
                openDropdown === 'equipments' ? null : 'equipments',
              )
            }
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <form action="/search" method="GET" className="relative w-full">
            <input
              name="q"
              type="text"
              placeholder="Search for products or services..."
              className="w-full h-10 pl-4 pr-12 text-sm border border-border rounded-full bg-section-alt-bg focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal placeholder:text-text-muted transition-all"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 h-8 w-8 rounded-full bg-teal text-white flex items-center justify-center hover:bg-teal-dark transition-colors cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            className="relative p-2 text-text-body hover:text-teal transition-colors cursor-pointer hidden sm:flex"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>

          <button
            className="relative p-2 text-text-body hover:text-teal transition-colors cursor-pointer hidden sm:flex"
            aria-label="User profile"
          >
            <User className="h-5 w-5" />
          </button>

          <a
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || '+919871281574'}`}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-orange px-4 text-sm font-semibold text-white shadow-md hover:bg-orange-hover transition-colors"
          >
            <PhoneCall className="h-4 w-4" />
            <span className="hidden sm:inline">Call Us</span>
          </a>

          <Link
            href="/contact"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-teal px-4 text-sm font-semibold text-white shadow-md hover:bg-teal-dark transition-colors"
          >
            Contact Us
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-text-body hover:text-teal cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white animate-slide-in-right">
          <div className="container py-4 space-y-4">
            {/* Mobile search */}
            <form action="/search" method="GET" className="md:hidden relative">
              <input
                name="q"
                type="text"
                placeholder="Search for products or services..."
                className="w-full h-10 pl-4 pr-12 text-sm border border-border rounded-full bg-section-alt-bg focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-teal text-white flex items-center justify-center cursor-pointer"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2">
                Services
              </p>
              {servicesDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-sm text-text-body hover:bg-teal-light hover:text-teal rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-2">
                Equipments
              </p>
              {equipmentsDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-sm text-text-body hover:bg-teal-light hover:text-teal rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-border/50">
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-semibold text-teal hover:bg-teal-light rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
