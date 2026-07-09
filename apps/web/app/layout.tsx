import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SchemaMarkup } from "../components/SchemaMarkup";
import { MetaPixel } from "../components/MetaPixel";
import { FloatingCTAs } from "../components/FloatingCTAs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default:
      'Heal Door \u2013 Home Physiotherapy & Oxygen Equipment Rental in Delhi',
    template: '%s | Heal Door',
  },
  description:
    'Best home physiotherapy in Delhi NCR. Certified BPT/MPT physiotherapists at your doorstep. Oxygen concentrator, BiPAP & CPAP machine rental and purchase in Delhi. Same day service.',
  keywords: [
    'Home Physiotherapy in Delhi',
    'Best Physiotherapist at Home in Delhi',
    'Physiotherapy Services Delhi NCR',
    'Home Healthcare Services in Delhi',
    'Oxygen Concentrator Rental in Delhi',
    'BiPAP Machine Rental Delhi',
    'CPAP Machine Rental Delhi',
    'Medical Equipment Rental Delhi',
    'Post Surgery Physiotherapy Delhi',
    'Stroke Rehabilitation Delhi',
    'Elderly Care Physiotherapy Delhi',
    'Respiratory Support Equipment Delhi',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: appUrl,
    siteName: 'Heal Door',
    title:
      'Heal Door \u2013 Home Physiotherapy & Oxygen Equipment Rental in Delhi',
    description:
      'Best home physiotherapy in Delhi NCR. Certified BPT/MPT physiotherapists at your doorstep. Oxygen concentrator, BiPAP & CPAP machine rental and purchase in Delhi. Same day service.',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Heal Door \u2013 Home Physiotherapy & Oxygen Equipment Rental in Delhi',
    description:
      'Best home physiotherapy in Delhi NCR. Certified BPT/MPT physiotherapists at your doorstep.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Heal Door",
    url: appUrl,
    logo: `${appUrl}/icon.svg`,
    description: "Best home physiotherapy in Delhi NCR. Certified BPT/MPT physiotherapists at your doorstep. Oxygen concentrator, BiPAP & CPAP machine rental and purchase in Delhi. Same day service.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressRegion: "Delhi NCR",
      addressCountry: "IN"
    },
    sameAs: [
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN
    ].filter(Boolean)
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingCTAs />
        <SchemaMarkup schema={organizationSchema} />
        <MetaPixel />
        <SpeedInsights />
      </body>
      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}
