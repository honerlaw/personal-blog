import { ProjectCard } from "@/components/project-card";
import type { ProjectGroup } from "@/lib/mdx";

const COMPANY_INTRO =
  "Onerlaw LLC is the blanket company that I operate my projects under.";
const DIRECT_INTRO = "Some I operate directly myself.";

/** The Projects intro sentence; mentions directly-run projects only when there are some. */
export function ProjectsIntro({ groups }: { groups: ProjectGroup[] }) {
  const hasDirect = groups.some((group) => group.company === null);
  return (
    <>
      {COMPANY_INTRO}
      {hasDirect && <> {DIRECT_INTRO}</>}
    </>
  );
}

export function ProjectGroups({ groups }: { groups: ProjectGroup[] }) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.company ?? "direct"} className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-foreground md:text-xl">
            {group.company ?? "Run by me directly"}
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {group.projects.map((project) => {
              const href = project.frontmatter.url ?? project.frontmatter.github;
              if (!href) return null;
              return (
                <ProjectCard
                  key={project.slug}
                  title={project.frontmatter.title}
                  description={project.frontmatter.description}
                  href={href}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
