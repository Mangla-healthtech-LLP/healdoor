import Link from "next/link";
import { Logo } from "@healdoor/ui";
import {
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
// function YoutubeIcon({ className }: { className?: string }) {
//   return (
//     <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//       <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
//       <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
//     </svg>
//   );
// }
function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Equipments", href: "/products" },
  // { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  // { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "/contact" },
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
    icon: WhatsappIcon,
    href: `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "919871281574"}`,
    label: "WhatsApp",
  },
  // { icon: YoutubeIcon, href: "https://youtube.com/@healdoor", label: "YouTube" },
  { icon: LinkedinIcon, href: "https://linkedin.com/company/healdoor", label: "LinkedIn" },
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
                  264, Pocket H-17, Sector-7, Rohini, Delhi-110085
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-teal shrink-0" />
                <div className="flex flex-col text-sm text-slate-600 font-medium">
                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91-9871281574"}`}
                    className="hover:text-teal transition-colors"
                  >
                    {process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91-9871281574"}
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
