import { Sidebar } from "@/components/sidebar";
import { PostCard } from "@/components/post-card";

const allPosts = [
  {
    title: "On Building High-Performing Engineering Teams",
    excerpt:
      "Reflections on what makes teams truly effective, and the subtle art of creating environments where engineers thrive.",
    date: "May 2026",
    slug: "building-high-performing-teams",
  },
  {
    title: "The Manager&apos;s Pendulum",
    excerpt:
      "Navigating the constant tension between individual contribution and leadership responsibilities.",
    date: "April 2026",
    slug: "managers-pendulum",
  },
  {
    title: "Simplicity as a Feature",
    excerpt:
      "Why the best technical decisions often involve removing complexity rather than adding it.",
    date: "March 2026",
    slug: "simplicity-as-feature",
  },
  {
    title: "Code Review as Mentorship",
    excerpt:
      "Transforming code reviews from gatekeeping exercises into opportunities for growth and knowledge sharing.",
    date: "February 2026",
    slug: "code-review-mentorship",
  },
  {
    title: "The Architecture of Trust",
    excerpt:
      "How technical architecture decisions reflect and reinforce organizational trust patterns.",
    date: "January 2026",
    slug: "architecture-of-trust",
  },
  {
    title: "Debugging Organizational Bottlenecks",
    excerpt:
      "Applying engineering problem-solving frameworks to leadership challenges.",
    date: "December 2025",
    slug: "debugging-org-bottlenecks",
  },
];

export default function PostsPage() {
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
              <section>
                <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Writing
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  Thoughts on engineering, leadership, and building things that
                  last.
                </p>
                <div className="flex flex-col gap-8">
                  {allPosts.map((post) => (
                    <PostCard key={post.slug} {...post} />
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
