import { Sidebar } from "@/components/sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
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
    title: `${post.frontmatter.title} — Your Name`,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

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
              <Link
                href="/posts"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to posts
              </Link>

              <article>
                <header className="mb-8">
                  <time className="text-xs text-muted-foreground/70">
                    {formattedDate} · {post.readingTime}
                  </time>
                  <h1 className="text-xl font-medium text-foreground mt-2 text-balance">
                    {post.frontmatter.title}
                  </h1>
                  {post.frontmatter.tags && (
                    <div className="flex gap-2 mt-3">
                      {post.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                <MDXContent content={post.content} />
              </article>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
