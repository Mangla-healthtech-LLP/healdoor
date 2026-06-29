import { MapPin, Navigation, ExternalLink } from "lucide-react";

interface LocationSectionProps {
  heading?: string | null;
  companyName?: string | null;
  address?: string | null;
  mapEmbedUrl?: string | null;
  getDirectionsLink?: string | null;
}

export function LocationSection({
  heading = "Our Location",
  companyName = "HealDoor Healthcare",
  address = "264, Pocket H-17,\nSector-7, Rohini,\nDelhi-110085",
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28003.543453880493!2d77.11651591834246!3d28.69804868284705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03d4fb0e1dc9%3A0x633513a968600dcb!2sPitampura%2C%20Delhi!5e0!3m2!1sen!2sin!4v1705600000000!5m2!1sen!2sin",
  getDirectionsLink = "https://maps.google.com/?q=264+pocket+H-17+sector-7+Rohini+Delhi+110085",
}: LocationSectionProps) {
  const validMapUrl = mapEmbedUrl?.includes('/maps/embed') 
    ? mapEmbedUrl 
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28003.543453880493!2d77.11651591834246!3d28.69804868284705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03d4fb0e1dc9%3A0x633513a968600dcb!2sPitampura%2C%20Delhi!5e0!3m2!1sen!2sin!4v1705600000000!5m2!1sen!2sin";

  return (
    <section className="section-padding bg-section-alt-bg">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            {heading}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-border/30 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Address */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-1">
                    {companyName}
                  </h3>
                  <p className="text-base text-text-body leading-relaxed whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </div>

              <a
                href={getDirectionsLink || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal text-teal font-semibold rounded-full hover:bg-teal hover:text-white transition-all w-fit"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>

            {/* Map */}
            <div className="relative min-h-[280px] lg:min-h-0">
              {validMapUrl ? (
                <>
                  <iframe
                    src={validMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 280 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HealDoor Office Location"
                    className="absolute inset-0 w-full h-full"
                  />
                  <a
                    href={getDirectionsLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-md text-xs font-semibold text-teal hover:text-teal-dark transition-colors z-10"
                  >
                    Open in Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              ) : (
                <div className="w-full h-full min-h-[280px] bg-section-alt-bg flex items-center justify-center">
                  <p className="text-text-muted text-sm">Map loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
