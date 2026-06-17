"use client";

import { Phone, MessageSquare, ClipboardPlus, Activity, Wind, BedDouble, Stethoscope, Accessibility } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const services = [
  {
    title: "Physiotherapy",
    description: "Expert physio at home & clinic. Includes physiotherapy equipments.",
    url: "/physiotherapy",
    icon: <Activity className="h-8 w-8 text-primary" />,
  },
  {
    title: "Oxygen Equipments",
    description: "Oxygen Concentrators, CPAP, BiPAP, Masks & Tubes rental and purchase.",
    url: "/oxygen-equipment",
    icon: <Wind className="h-8 w-8 text-primary" />,
  },
  {
    title: "ICU at Home",
    description: "Ventilator, DVT Pump, Electric Recliner Bed, Syringe Pump, Suction Machine.",
    url: "/icu-at-home",
    icon: <BedDouble className="h-8 w-8 text-primary" />,
  },
  {
    title: "Wheelchairs & Walkers",
    description: "Premium Wheelchairs, Walkers, and Crutches for mobility support.",
    url: "/wheelchairs-walkers-crutches",
    icon: <Accessibility className="h-8 w-8 text-primary" />,
  },
  {
    title: "Investigations at Home",
    description: "X-Ray, ECG, and Blood Investigations in the comfort of your home.",
    url: "/investigations-at-home",
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
  },
  {
    title: "Nursing & Elderly Care",
    description: "Professional nursing support, elderly care, and GDA services.",
    url: "/nursing-elderly-care-gda",
    icon: <ClipboardPlus className="h-8 w-8 text-primary" />,
  },
  {
    title: "Other Medical Equipments",
    description: "A wide range of additional medical equipments for home care.",
    url: "/other-medical-equipments",
    icon: <Activity className="h-8 w-8 text-primary" />,
  },
];

export function ServiceCards() {
  return (
    <section id="services" className="py-20 bg-[var(--section-gradient)]">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight mb-4 text-foreground">Our Core Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of home healthcare services and premium medical products tailored for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-primary/10">
              <CardHeader className="bg-muted/30">
                <div className="mb-4 bg-background w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                  {service.icon}
                </div>
                <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                <CardDescription className="text-sm mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter className="flex flex-col gap-3 pt-0 pb-6 px-6">
                <Button className="w-full bg-[var(--cta-gradient)] hover:opacity-90 transition-opacity" asChild>
                  <Link href="#contact" onClick={() => {
                    const select = document.getElementById("service-select") as HTMLSelectElement;
                    if (select) {
                      select.value = service.title;
                      // trigger change event for react-hook-form
                      select.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                  }}>
                    Enquire Now
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button variant="outline" className="w-full text-xs" asChild>
                    <a href="tel:+919871281574">
                      <Phone className="mr-2 h-3 w-3" /> Call
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full text-xs text-green-600 border-green-200 hover:bg-green-50" asChild>
                    <a href={`https://wa.me/919871281574?text=Hi, I want to enquire about ${service.title}`} target="_blank" rel="noreferrer">
                      <MessageSquare className="mr-2 h-3 w-3" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
