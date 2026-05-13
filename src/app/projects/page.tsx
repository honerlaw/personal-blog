import { Sidebar } from "@/components/sidebar";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/mdx";

export default function ProjectsPage() {
  const projects = getAllProjects();

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
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      title={project.frontmatter.title}
                      description={project.frontmatter.description}
                      href={
                        project.frontmatter.url || project.frontmatter.github
                      }
                      tags={project.frontmatter.tags}
                    />
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
