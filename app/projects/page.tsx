import { Sidebar } from "@/components/sidebar";
import { ProjectCard } from "@/components/project-card";

const allProjects = [
  {
    title: "wave",
    description:
      "A minimal CLI tool for managing development environments across machines. Syncs dotfiles, installs dependencies, and sets up new machines in minutes.",
    href: "https://github.com",
    tags: ["Go", "CLI"],
  },
  {
    title: "drift",
    description:
      "Open-source library for building resilient distributed systems with graceful degradation. Implements circuit breakers, bulkheads, and retry patterns.",
    href: "https://github.com",
    tags: ["Rust", "Distributed Systems"],
  },
  {
    title: "shore",
    description:
      "Personal knowledge management system built for engineers who think in graphs. Local-first with optional sync.",
    href: "https://github.com",
    tags: ["TypeScript", "React", "IndexedDB"],
  },
  {
    title: "current",
    description:
      "Real-time collaborative markdown editor with conflict-free replicated data types (CRDTs).",
    href: "https://github.com",
    tags: ["TypeScript", "WebRTC", "CRDT"],
  },
  {
    title: "tide",
    description:
      "Lightweight job queue for Node.js with Redis backend. Designed for reliability and observability.",
    href: "https://github.com",
    tags: ["TypeScript", "Redis", "Node.js"],
  },
];

export default function ProjectsPage() {
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
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Projects
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Open source work and side projects. Mostly tools I built
                  because I needed them.
                </p>
                <div className="flex flex-col gap-8">
                  {allProjects.map((project) => (
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
