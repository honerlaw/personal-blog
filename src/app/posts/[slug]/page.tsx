import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXContent } from "@/components/mdx-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.frontmatter.title} — Derek Honerlaw`,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-16">
      <Link
        href="/posts"
        className="-ml-1 inline-flex min-h-11 items-center gap-1.5 px-1 text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to posts
      </Link>

      <article className="mt-6">
        <header className="mb-10 flex flex-col gap-4 border-b border-border pb-8">
          <p className="text-sm text-muted-foreground">
            <time dateTime={post.frontmatter.date}>
              {formatPostDate(post.frontmatter.date)}
            </time>
            <span aria-hidden="true"> · </span>
            {post.readingTime}
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-[2.75rem]">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {post.frontmatter.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <MDXContent content={post.content} />
      </article>
    </main>
  );
}
