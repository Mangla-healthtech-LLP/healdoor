import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--hero-gradient)] py-20 lg:py-32 text-white">
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Professional Home Healthcare &amp; Medical Equipment
        </h1>
        <p className="text-lg sm:text-xl mb-10 max-w-2xl text-white/90">
          Certified physiotherapists, nursing support, and premium medical equipment at your doorstep in Delhi NCR. Same day service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto" asChild>
            <Link href="#services">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2 border-0 w-full sm:w-auto" asChild>
            <a href="https://wa.me/919871281574" target="_blank" rel="noreferrer">
              <MessageSquare className="h-4 w-4" /> WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
      
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
    </section>
  );
}
