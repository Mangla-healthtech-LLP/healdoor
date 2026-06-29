"use client";

import { Phone } from "lucide-react";

export function FloatingCTAs() {
  const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+919871281574";
  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "919871281574";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          stroke="currentColor"
          strokeWidth="0"
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.274-.101-.473-.15-.673.15-.197.295-.771.966-.944 1.162-.175.195-.349.21-.646.06-.3-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.202.049-.375-.029-.524-.074-.15-.674-1.62-.922-2.206-.24-.579-.492-.501-.673-.51l-.573-.009c-.198 0-.52.074-.792.375s-1.04 1.02-1.04 2.49c0 1.462 1.061 2.875 1.213 3.074.149.195 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.426.248-.705.248-1.31.173-1.433-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex items-center justify-center w-14 h-14 bg-orange text-white rounded-full shadow-lg hover:bg-orange-hover hover:scale-110 transition-all duration-300"
        aria-label="Call Us"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
