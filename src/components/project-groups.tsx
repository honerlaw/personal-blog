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

interface ProjectGroupsProps {
  groups: ProjectGroup[];
  /** Heading level for each group name, so each page keeps a gap-free outline. */
  headingLevel?: "h2" | "h3";
}

export function ProjectGroups({ groups, headingLevel: Heading = "h3" }: ProjectGroupsProps) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => {
        // A project needs somewhere to link to; an empty `url` falls back to `github`.
        const linked = group.projects.flatMap((project) => {
          const href = project.frontmatter.url || project.frontmatter.github;
          return href ? [{ project, href }] : [];
        });
        if (linked.length === 0) return null;

        return (
          <div key={group.company ?? "direct"} className="flex flex-col gap-4">
            <Heading className="text-lg font-bold text-foreground md:text-xl">
              {group.company ?? "Run by me directly"}
            </Heading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {linked.map(({ project, href }) => (
                <ProjectCard
                  key={project.slug}
                  title={project.frontmatter.title}
                  description={project.frontmatter.description}
                  href={href}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
