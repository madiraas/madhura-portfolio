import Link from "next/link";

const projects = [
  {
    slug: "property-onboarding-system",
    title: "Property Onboarding System",
    company: "Raahghar",
    category: "Operations",
    status: "published",
    featured: true,
  },
  {
    slug: "influencer-campaign-coordination",
    title: "Influencer Campaign Coordination",
    company: "Sugar Media",
    category: "Creator Marketing",
    status: "published",
    featured: true,
  },
  {
    slug: "event-execution-on-the-day",
    title: "Event Execution, On the Day",
    company: "Solitaire Events / Soul Jams",
    category: "Events",
    status: "published",
    featured: true,
  },
  {
    slug: "retreat-itinerary-proposal",
    title: "Retreat & Itinerary Proposal",
    company: "Raahghar",
    category: "Hospitality & Travel",
    status: "published",
    featured: true,
  },
  {
    slug: "founder-speaker-research-sprint",
    title: "Founder & Speaker Research Sprint",
    company: "Self-initiated",
    category: "Founder Support",
    status: "coming-soon",
    featured: false,
  },
  {
    slug: "booking-guest-coordination",
    title: "Booking & Guest Coordination",
    company: "Raahghar",
    category: "Hospitality & Travel",
    status: "published",
    featured: false,
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] opacity-60">
            Selected Work
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Projects
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 opacity-70">
            A selection of projects across operations, hospitality, travel,
            events, creator campaigns, and founder support.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects
            .filter((project) => project.status === "published")
            .map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider opacity-50">
                    {project.category}
                  </span>

                  {project.featured && (
                    <span className="text-xs uppercase tracking-wider opacity-50">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-medium transition group-hover:opacity-70">
                  {project.title}
                </h2>

                <p className="mt-3 text-sm opacity-60">
                  {project.company}
                </p>

                <div className="mt-8 text-sm opacity-50">
                  View project →
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
