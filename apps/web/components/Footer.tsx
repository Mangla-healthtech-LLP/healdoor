import Link from "next/link";
import { Logo } from "@healdoor/ui";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

/* Inline social SVG icons (not available in lucide-react) */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
    </svg>
  );
}

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Equipments", href: "/other-medical-equipments" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#our-story" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-and-conditions" },
];

const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com/healdoor", label: "Facebook" },
  {
    icon: InstagramIcon,
    href: "https://instagram.com/healdoor",
    label: "Instagram",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/919871281574",
    label: "WhatsApp",
  },
  { icon: YoutubeIcon, href: "https://youtube.com/@healdoor", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[hsl(200,30%,96%)] to-[hsl(200,40%,92%)] text-slate-800">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block overflow-hidden rounded-lg">
              <Logo
                width={160}
                height={60}
                className="w-auto h-12"
              />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Professional home healthcare services and medical equipment
              rental/purchase in Delhi NCR. Same day delivery. Trusted by
              thousands.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white text-slate-600 shadow-sm border border-slate-200 flex items-center justify-center hover:bg-teal hover:text-white hover:border-teal transition-all hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-slate-900 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-slate-900 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-slate-900 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-teal shrink-0" />
                <span className="text-sm text-slate-600">
                  160, Rajdhani Enclave, Parking Pitampura, Delhi - 110034
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-teal shrink-0" />
                <div className="flex flex-col text-sm text-slate-600 font-medium">
                  <a
                    href="tel:+919871281574"
                    className="hover:text-teal transition-colors"
                  >
                    +91-9871281574
                  </a>
                  <a
                    href="tel:+918506977729"
                    className="hover:text-teal transition-colors"
                  >
                    +91-8506977729
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-teal shrink-0" />
                <a
                  href="mailto:ukmlamrcp@gmail.com"
                  className="text-sm text-slate-600 font-medium hover:text-teal transition-colors"
                >
                  ukmlamrcp@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200/60 bg-white/30 backdrop-blur-sm">
        <div className="container py-6 text-center">
          <p className="text-sm text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} Heal Door. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
