import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ProjectGroups, ProjectsIntro } from "@/components/project-groups";
import { getAllProjects, groupProjects } from "@/lib/mdx";
import { getPublicRepos } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects — Derek Honerlaw",
};

function repoNameFromGithubUrl(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/[^/]+\/([^/?#]+)/);
  return match ? match[1].replace(/\.git$/, "") : null;
}

export default async function ProjectsPage() {
  const projects = getAllProjects();
  const projectGroups = groupProjects(projects);
  const repos = await getPublicRepos();

  const projectRepoNames = new Set(
    projects
      .map((p) => p.frontmatter.repo ?? repoNameFromGithubUrl(p.frontmatter.github))
      .filter((name): name is string => Boolean(name))
      .map((name) => name.toLowerCase()),
  );

  const otherRepos = repos.filter((r) => !projectRepoNames.has(r.name.toLowerCase()));

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-14 px-5 py-12 md:px-8 md:py-20">
      <section aria-labelledby="projects-heading" className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1
            id="projects-heading"
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Projects
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            <ProjectsIntro groups={projectGroups} />
          </p>
        </div>
        <ProjectGroups groups={projectGroups} />
      </section>

      {otherRepos.length > 0 && (
        <section aria-labelledby="repos-heading" className="flex flex-col gap-6 border-t border-border pt-12">
          <div className="flex flex-col gap-2.5">
            <h2
              id="repos-heading"
              className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              More on GitHub
            </h2>
            <p className="text-base text-muted-foreground">
              Public repositories, most recently updated first.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {otherRepos.map((repo) => (
              <ProjectCard
                key={repo.name}
                variant="repo"
                title={repo.name}
                description={repo.description}
                href={repo.html_url}
                language={repo.language}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
