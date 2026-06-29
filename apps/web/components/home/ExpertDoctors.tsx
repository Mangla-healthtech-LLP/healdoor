import { Award, Stethoscope } from "lucide-react";
import Image from "next/image";
import type { DoctorProfile } from "@healdoor/types";
import { getMediaUrl, getMediaAlt } from "@healdoor/utils";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const defaultDoctors: DoctorProfile[] = [
  {
    name: "Dr. Rahul Verma",
    qualification: "MBBS, MD (Pulmonology)",
    experience: "4+ Years Experience",
    badge: undefined,
  },
  {
    name: "Dr. Shubham Mangla",
    qualification: "MBBS (MAMC)",
    experience: "5+ Years Experience",
    badge: "FOUNDER",
  },
  {
    name: "Dr. Priya Sharma",
    qualification: "MBBS, MD (General Medicine)",
    experience: "4+ Years Experience",
    badge: undefined,
  },
];

const fallbackImages = [
  "/images/doctor-rahul.png",
  "/images/doctor-shubham.png",
  "/images/doctor-priya.png",
];

interface ExpertDoctorsProps {
  heading?: string | null;
  description?: string | null;
  doctors?: DoctorProfile[];
}

export function ExpertDoctors({
  heading = "Our Expert Doctors",
  description = "Experienced professionals dedicated to your health and well-being.",
  doctors,
}: ExpertDoctorsProps) {
  const data = doctors && doctors.length > 0 ? doctors : defaultDoctors;

  return (
    <section className="section-padding bg-section-alt-bg">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            {heading}
          </h2>
          <p className="text-base text-text-body max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
          {data.map((doctor, index) => {
            const isHighlighted = !!doctor.badge;
            const imageUrl =
              getMediaUrl(doctor.image as Parameters<typeof getMediaUrl>[0]) ||
              fallbackImages[index] ||
              "/images/service-physio.png";
            const initials = doctor.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2);

            return (
              <div
                key={doctor.id || doctor.name}
                className={`bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative ${
                  isHighlighted
                    ? "border-2 border-teal ring-4 ring-teal/10 scale-105 z-10"
                    : "border border-border/30"
                }`}
              >
                {doctor.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-orange text-white text-[10px] font-bold rounded-full shadow-sm uppercase tracking-widest">
                    <Award className="h-3 w-3" />
                    {doctor.badge}
                  </div>
                )}

                {/* Photo */}
                <div className="w-24 h-24 rounded-full mx-auto mb-4 relative overflow-hidden bg-gradient-to-br from-teal to-teal-dark shadow-md">
                  {doctor.image ? (
                    <Image
                      src={imageUrl}
                      alt={getMediaAlt(doctor.image as Parameters<typeof getMediaAlt>[0]) || doctor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-heading text-lg font-bold text-text-dark mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-teal font-medium mb-2">
                  {doctor.qualification}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted mb-3">
                  <Stethoscope className="h-3.5 w-3.5 text-teal" />
                  {doctor.experience}
                </div>
                
                {(doctor.linkedin || doctor.twitter || doctor.instagram) && (
                  <div className="flex items-center justify-center gap-3 mt-2 border-t border-border/30 pt-3">
                    {doctor.linkedin && (
                      <a href={doctor.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-teal transition-colors">
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {doctor.twitter && (
                      <a href={doctor.twitter} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-teal transition-colors">
                        <TwitterIcon className="w-4 h-4" />
                      </a>
                    )}
                    {doctor.instagram && (
                      <a href={doctor.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-teal transition-colors">
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
