import {
  GraduationCap,
  Briefcase,
  BadgeCheck,
} from "lucide-react";

const team = [
  {
    name: "Dr. Shubham Mangla",
    role: "Founder",
    initials: "SM",
    badges: ["Certified Doctor", "Healthcare Professional"],
    education: [
      "MBBS — MAMC",
      "PLAB Cleared",
      "GMC Registered (UK)",
      "RCUK ALS Certified",
      "MRCP (Written) Cleared",
    ],
    experience: [
      "LNJP Hospital",
      "Babaji Hospital",
      "Maharaja Agrasen Hospital (ICU)",
      "RBTB Hospital",
      "Lynwood GP Centre (UK)",
    ],
  },
  {
    name: "Lavanya Mangla",
    role: "Co-Founder & Manager",
    initials: "LM",
    badges: [],
    education: [
      "BBA — Vivekananda Institute of Professional Studies",
    ],
    experience: [
      "Sales, Marketing & BD at Mangla Plast House",
      "Founder Member — Film-Making Society VIPS",
      "Robin Hood Army",
      "Narayan Seva Sansthan",
    ],
  },
];

export function OurStorySection() {
  return (
    <section id="our-story" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-dark mb-3">
            Our Story
          </h2>
        </div>

        {/* Narrative */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4 text-base text-text-body leading-relaxed">
          <p>
            It began with a simple observation — when patients are discharged
            from the hospital, they often struggle to find reliable post-discharge
            care. The gap between hospital care and home recovery can be
            overwhelming for families.
          </p>
          <p>
            There was no single, trusted online platform where families could
            find quality medical equipment and professional healthcare services
            for home use. This is where <strong className="text-teal">HealDoor</strong> was born.
          </p>
          <p>
            Our vision is to make quality healthcare accessible, affordable, and
            available right at your doorstep — bridging the gap between the
            hospital and home.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-section-alt-bg rounded-2xl p-6 border border-border/30 hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center shadow-md shrink-0">
                  <span className="text-lg font-bold text-white">
                    {member.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-dark">
                    {member.name}
                  </h3>
                  <p className="text-sm text-teal font-medium">{member.role}</p>
                </div>
              </div>

              {/* Badges */}
              {member.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal/10 text-teal text-xs font-medium rounded-full"
                    >
                      <BadgeCheck className="h-3 w-3" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Education */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-4 w-4 text-teal" />
                  <span className="text-xs font-bold text-text-dark uppercase tracking-wider">
                    Education
                  </span>
                </div>
                <ul className="space-y-1 pl-6">
                  {member.education.map((edu) => (
                    <li
                      key={edu}
                      className="text-xs text-text-body list-disc"
                    >
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-teal" />
                  <span className="text-xs font-bold text-text-dark uppercase tracking-wider">
                    Experience
                  </span>
                </div>
                <ul className="space-y-1 pl-6">
                  {member.experience.map((exp) => (
                    <li
                      key={exp}
                      className="text-xs text-text-body list-disc"
                    >
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
