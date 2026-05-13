import { Sidebar } from "@/components/sidebar";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";

// Sample data - replace with your actual content
const recentPosts = [
  {
    title: "On Building High-Performing Engineering Teams",
    excerpt:
      "Reflections on what makes teams truly effective, and the subtle art of creating environments where engineers thrive.",
    date: "May 2026",
    slug: "building-high-performing-teams",
  },
  {
    title: "The Manager&apos;s Pendulum",
    excerpt:
      "Navigating the constant tension between individual contribution and leadership responsibilities.",
    date: "April 2026",
    slug: "managers-pendulum",
  },
  {
    title: "Simplicity as a Feature",
    excerpt:
      "Why the best technical decisions often involve removing complexity rather than adding it.",
    date: "March 2026",
    slug: "simplicity-as-feature",
  },
];

const featuredProjects = [
  {
    title: "wave",
    description:
      "A minimal CLI tool for managing development environments across machines.",
    href: "https://github.com",
    tags: ["Go", "CLI"],
  },
  {
    title: "drift",
    description:
      "Open-source library for building resilient distributed systems with graceful degradation.",
    href: "https://github.com",
    tags: ["Rust", "Distributed Systems"],
  },
  {
    title: "shore",
    description:
      "Personal knowledge management system built for engineers who think in graphs.",
    href: "https://github.com",
    tags: ["TypeScript", "React"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-16">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-0 lg:h-screen">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="py-12 lg:py-20">
            <div className="max-w-xl">
              {/* About Section */}
              <section className="mb-16">
                <p className="text-foreground leading-relaxed">
                  {"I'm"} a software engineer and engineering leader passionate about
                  building products that matter and teams that thrive. Currently
                  focused on scaling engineering organizations while staying
                  close to the craft.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  I grew up near the water—beaches and rivers shaped how I
                  think. There&apos;s something about the rhythm of tides and the
                  patience of currents that influences how I approach problems:
                  with calm persistence and respect for natural systems.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Previously built systems at companies you might recognize.
                  These days I write about leadership, technical decisions, and
                  the intersection of both.
                </p>
              </section>

              {/* Writing Section */}
              <section className="mb-16">
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                  Recent Writing
                </h2>
                <div className="flex flex-col gap-8">
                  {recentPosts.map((post) => (
                    <PostCard key={post.slug} {...post} />
                  ))}
                </div>
              </section>

              {/* Projects Section */}
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                  Projects
                </h2>
                <div className="flex flex-col gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
