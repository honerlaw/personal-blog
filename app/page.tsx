import { Sidebar } from "@/components/sidebar";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { getAllPosts, getAllProjects } from "@/lib/mdx";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const projects = getAllProjects().filter((p) => p.frontmatter.featured);

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
                  {"I'm"} a software engineer and engineering leader passionate
                  about building products that matter and teams that thrive.
                  Currently focused on scaling engineering organizations while
                  staying close to the craft.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  I grew up near the water—beaches and rivers shaped how I
                  think. There&apos;s something about the rhythm of tides and
                  the patience of currents that influences how I approach
                  problems: with calm persistence and respect for natural
                  systems.
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
                  {posts.map((post) => (
                    <PostCard
                      key={post.slug}
                      title={post.frontmatter.title}
                      excerpt={post.frontmatter.excerpt}
                      date={new Date(post.frontmatter.date).toLocaleDateString(
                        "en-US",
                        { month: "long", year: "numeric" }
                      )}
                      slug={post.slug}
                    />
                  ))}
                </div>
              </section>

              {/* Projects Section */}
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                  Projects
                </h2>
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
