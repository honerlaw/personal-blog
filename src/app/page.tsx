import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { ProjectGroups, ProjectsIntro } from "@/components/project-groups";
import {
  formatPostDate,
  getAllPosts,
  getAllProjects,
  groupProjects,
} from "@/lib/mdx";

export default function HomePage() {
  const allPosts = getAllPosts();
  const [featuredPost, ...otherPosts] = allPosts;
  const recentPosts = otherPosts.slice(0, 2);
  const projectGroups = groupProjects(
    getAllProjects().filter((p) => p.frontmatter.featured)
  );

  return (
    <main>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto flex max-w-5xl flex-col gap-8 px-5 pb-12 pt-8 md:flex-row-reverse md:items-center md:gap-14 md:px-8 md:pb-20 md:pt-20"
      >
        <Image
          src="/headshot.jpg"
          alt="Derek Honerlaw"
          width={601}
          height={900}
          priority
          className="h-72 w-full rounded-3xl object-cover object-top md:h-auto md:w-72 md:shrink-0 lg:w-80"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <h1
            id="hero-heading"
            className="text-[2.75rem] font-bold leading-none tracking-tighter text-foreground md:text-6xl"
          >
            Derek Honerlaw
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Engineering Leader | AI, Platform &amp; Infrastructure | Building
            High-Performing Teams That Ship
          </p>
          <div className="mt-1 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              See my projects
            </a>
            <a
              href="#writing"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-border px-6 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              Read the writing
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="scroll-mt-4 border-y border-border bg-secondary"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8 md:py-18">
          <div className="flex flex-col gap-3">
            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Projects
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              <ProjectsIntro groups={projectGroups} />
            </p>
          </div>
          <ProjectGroups groups={projectGroups} />
        </div>
      </section>

      {/* Writing */}
      <section
        id="writing"
        aria-labelledby="writing-heading"
        className="mx-auto flex max-w-5xl scroll-mt-4 flex-col gap-7 px-5 py-12 md:px-8 md:py-20"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <h2
              id="writing-heading"
              className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              Writing
            </h2>
            <p className="text-base text-muted-foreground">
              Writing about code, AI, leadership, and the things that keep life
              interesting.
            </p>
          </div>
          <Link
            href="/posts"
            className="text-[15px] font-medium text-foreground hover:underline hover:underline-offset-4"
          >
            All {allPosts.length} posts →
          </Link>
        </div>

        {featuredPost && (
          <PostCard
            featured
            slug={featuredPost.slug}
            title={featuredPost.frontmatter.title}
            excerpt={featuredPost.frontmatter.excerpt}
            date={formatPostDate(featuredPost.frontmatter.date)}
            readingTime={featuredPost.readingTime}
            tags={featuredPost.frontmatter.tags}
          />
        )}

        {recentPosts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.frontmatter.title}
                excerpt={post.frontmatter.excerpt}
                date={formatPostDate(post.frontmatter.date)}
                readingTime={post.readingTime}
                tags={post.frontmatter.tags}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
