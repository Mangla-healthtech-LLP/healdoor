"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  mobile: z.string().min(10, "Please enter a valid mobile number."),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service or product."),
  location: z.string().min(2, "Please enter your location."),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function EnquiryFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const defaultServiceParam = searchParams.get("service") || "";
  const defaultProductParam = searchParams.get("product") || "";
  const defaultService = defaultServiceParam || defaultProductParam;
  const isThankYou = searchParams.get("q") === "thank-you";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      service: defaultService,
      location: "",
      message: "",
    },
  });

  // Ensure defaultService is selected if it changes
  useEffect(() => {
    if (defaultService) {
      form.setValue("service", defaultService);
    }
  }, [defaultService, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Mock API call to the endpoint we will create
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          productSlug: defaultProductParam,
          sourceUrl: window.location.href,
        }),
      });

      if (response.ok) {
        form.reset();
        router.push("/contact?q=thank-you");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isThankYou) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center bg-teal/5 rounded-2xl border border-teal/10">
        <CheckCircle2 className="h-12 w-12 text-teal mb-4" />
        <h3 className="text-xl font-bold text-teal-dark mb-2">Thank You!</h3>
        <p className="text-text-body mb-6 max-w-sm mx-auto">
          Your enquiry has been received. Our team will contact you shortly.
        </p>
        <Button onClick={() => router.push("/contact")} variant="outline" className="border-teal/20 text-teal hover:bg-teal/10">
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  // Predefined services
  const predefinedServices = [
    "Physiotherapy",
    "Oxygen Equipments",
    "ICU at Home",
    "Wheelchairs & Walkers",
    "Investigations at Home",
    "Nursing & Elderly Care",
    "Other Medical Equipments",
  ];

  const hasCustomService = defaultService && !predefinedServices.includes(defaultService);

  return (
    <div className="w-full" id="contact">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-text-dark">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...form.register("name")}
            className="flex h-11 w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:border-teal focus-visible:ring-1 focus-visible:ring-teal"
            placeholder="John Doe"
          />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="mobile" className="text-sm font-semibold text-text-dark">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            id="mobile"
            type="tel"
            {...form.register("mobile")}
            className="flex h-11 w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:border-teal focus-visible:ring-1 focus-visible:ring-teal"
            placeholder="+91 XXXXX XXXXX"
          />
          {form.formState.errors.mobile && (
            <p className="text-xs text-red-500">{form.formState.errors.mobile.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-text-dark">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            className="flex h-11 w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:border-teal focus-visible:ring-1 focus-visible:ring-teal"
            placeholder="you@example.com"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="service-select" className="text-sm font-semibold text-text-dark">
            Service / Product <span className="text-red-500">*</span>
          </label>
          <select
            id="service-select"
            {...form.register("service")}
            className="flex h-11 w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:border-teal focus-visible:ring-1 focus-visible:ring-teal"
          >
            <option value="">Select a Service</option>
            {predefinedServices.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
            {hasCustomService && (
              <option value={defaultService}>{defaultService} (Selected)</option>
            )}
          </select>
          {form.formState.errors.service && (
            <p className="text-xs text-red-500">{form.formState.errors.service.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="location" className="text-sm font-semibold text-text-dark">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            {...form.register("location")}
            className="flex h-11 w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:border-teal focus-visible:ring-1 focus-visible:ring-teal"
            placeholder="E.g., Rohini, Delhi"
          />
          {form.formState.errors.location && (
            <p className="text-xs text-red-500">{form.formState.errors.location.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-text-dark">
            Message
          </label>
          <textarea
            id="message"
            {...form.register("message")}
            className="flex min-h-[100px] w-full rounded-lg border border-border/60 bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-text-muted focus-visible:outline-none focus-visible:border-teal focus-visible:ring-1 focus-visible:ring-teal resize-y"
            placeholder="How can we help you?"
          />
        </div>

        <Button type="submit" className="w-full bg-teal hover:bg-teal-dark text-white h-11 rounded-full font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </form>
    </div>
  );
}

export function EnquiryForm() {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading form...</div>}>
      <EnquiryFormContent />
    </Suspense>
  );
}
