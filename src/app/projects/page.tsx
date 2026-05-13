import { Sidebar } from "@/components/sidebar";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/mdx";
import { getPublicRepos } from "@/lib/github";

function repoNameFromGithubUrl(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/[^/]+\/([^/?#]+)/);
  return match ? match[1].replace(/\.git$/, "") : null;
}

export default async function ProjectsPage() {
  const featured = getAllProjects();
  const repos = await getPublicRepos();

  const featuredRepoNames = new Set(
    featured
      .map((p) => p.frontmatter.repo ?? repoNameFromGithubUrl(p.frontmatter.github))
      .filter((name): name is string => Boolean(name))
      .map((name) => name.toLowerCase()),
  );

  const otherRepos = repos.filter((r) => !featuredRepoNames.has(r.name.toLowerCase()));

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-16">
          <div className="lg:sticky lg:top-0 lg:h-screen">
            <Sidebar />
          </div>

          <main className="py-12 lg:py-20">
            <div className="max-w-xl">
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Featured
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Highlighted work I want to call out.
                </p>
                <div className="flex flex-col gap-8">
                  {featured.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      title={project.frontmatter.title}
                      description={project.frontmatter.description}
                      href={project.frontmatter.url || project.frontmatter.github}
                      tags={project.frontmatter.tags}
                    />
                  ))}
                </div>
              </section>

              {otherRepos.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    More on GitHub
                  </h2>
                  <p className="text-muted-foreground text-sm mb-8">
                    Public repositories, most recently updated first.
                  </p>
                  <div className="flex flex-col gap-8">
                    {otherRepos.map((repo) => (
                      <ProjectCard
                        key={repo.name}
                        title={repo.name}
                        description={repo.description ?? ""}
                        href={repo.html_url}
                        tags={repo.language ? [repo.language] : undefined}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
