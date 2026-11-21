import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { formatPostDate, getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Writing — Derek Honerlaw",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Writing
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Thoughts on engineering, leadership, and building things that last.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {posts.map((post) => (
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
    </main>
  );
}
