import { Sidebar } from "@/components/sidebar";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/mdx";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0 lg:gap-16">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-0 lg:h-screen">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="py-12 lg:py-20">
            <div className="max-w-xl">
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Writing
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Thoughts on engineering, leadership, and building things that
                  last.
                </p>
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
