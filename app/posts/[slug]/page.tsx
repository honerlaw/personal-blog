import { Sidebar } from "@/components/sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Sample post content - in production, this would come from a CMS or MDX files
const posts: Record<
  string,
  { title: string; date: string; content: string[] }
> = {
  "building-high-performing-teams": {
    title: "On Building High-Performing Engineering Teams",
    date: "May 2026",
    content: [
      "The best engineering teams I&apos;ve been part of share a common trait: psychological safety isn&apos;t a buzzword there—it&apos;s the foundation everything else is built upon.",
      "When engineers feel safe to ask questions, admit mistakes, and challenge assumptions, something interesting happens. The code gets better. The architecture becomes more resilient. Problems surface earlier, when they&apos;re still cheap to fix.",
      "But psychological safety alone isn&apos;t enough. You also need clarity of purpose. Teams drift when they don&apos;t understand why their work matters, when the connection between their daily commits and the larger mission feels abstract.",
      "The manager&apos;s job isn&apos;t to have all the answers. It&apos;s to create the conditions where the team can find them together. That means being comfortable with ambiguity, with not knowing, with letting the team struggle productively.",
      "I&apos;ve learned that the best interventions are often the smallest ones: a well-timed question, a moment of recognition, a brief conversation that unblocks something that&apos;s been stuck for days.",
      "High-performing teams aren&apos;t built in offsites or through elaborate processes. They&apos;re built in the daily moments of trust, the small acts of generosity, the willingness to give someone the benefit of the doubt.",
    ],
  },
  "managers-pendulum": {
    title: "The Manager&apos;s Pendulum",
    date: "April 2026",
    content: [
      "There&apos;s a tension at the heart of engineering management that nobody warns you about: the pull between staying technical and embracing the leadership role fully.",
      "Some days I miss the flow state of debugging a tricky issue, the satisfaction of a clean refactor, the simple pleasure of making something work. Other days I&apos;m energized by helping someone navigate their career, by removing an obstacle that&apos;s been slowing the team down.",
      "The pendulum swings. Some weeks I&apos;m deep in code reviews, pairing with engineers, getting my hands dirty. Other weeks I&apos;m in back-to-back meetings, thinking about team structure, hiring, and organizational dynamics.",
      "I&apos;ve stopped fighting the pendulum. Instead, I&apos;ve learned to notice which way it&apos;s swinging and adjust accordingly. When I&apos;m feeling disconnected from the technical work, I carve out time to contribute. When I&apos;m neglecting the people side, I step back from the code.",
      "The key insight: both modes are valuable. The technical credibility I maintain by staying close to the code helps me make better decisions and earn trust. The leadership skills I develop by stepping back help me scale my impact beyond what I could accomplish alone.",
    ],
  },
  "simplicity-as-feature": {
    title: "Simplicity as a Feature",
    date: "March 2026",
    content: [
      "We have a bias toward addition in software engineering. When something doesn&apos;t work, our instinct is to add more: more code, more configuration, more abstraction layers.",
      "But the best engineers I know have developed a different instinct. They ask: what can we remove? What complexity is incidental rather than essential? What would this look like if it were simple?",
      "Simplicity isn&apos;t about doing less. It&apos;s about doing the right things with clarity. A simple system is one where the essential complexity is visible and the incidental complexity has been stripped away.",
      "I&apos;ve learned to be suspicious of cleverness. Clever code is code that makes the author feel smart but makes the next engineer feel confused. Simple code is humble. It says what it does and does what it says.",
      "The hardest part of simplicity is that it requires you to truly understand the problem. You can&apos;t simplify what you don&apos;t understand. Complexity often masks confusion.",
      "When I find myself reaching for a complex solution, I pause. Usually it means I haven&apos;t thought hard enough about the problem. The complex solution is the lazy one.",
    ],
  },
  "code-review-mentorship": {
    title: "Code Review as Mentorship",
    date: "February 2026",
    content: [
      "Code review gets a bad reputation. It&apos;s often seen as a bottleneck, a gatekeeping exercise, a place where egos clash and progress stalls.",
      "But I&apos;ve come to see code review differently: as one of the most powerful mentorship tools we have. Done well, it&apos;s a conversation between engineers, a transfer of knowledge, a chance to raise the bar together.",
      "The key is intention. A code review focused on finding flaws feels different than one focused on learning together. The comments you leave, the questions you ask, the tone you set—all of it shapes whether the experience is constructive or demoralizing.",
      "I try to ask more questions than I make statements. &apos;What would happen if...&apos; opens a conversation. &apos;You should...&apos; closes one.",
      "The best code reviews I&apos;ve received taught me something. Not just about the code, but about how to think about problems, how to consider edge cases, how to balance tradeoffs.",
    ],
  },
  "architecture-of-trust": {
    title: "The Architecture of Trust",
    date: "January 2026",
    content: [
      "I&apos;ve noticed something interesting: the way organizations design their technical systems often mirrors the way they think about trust.",
      "Highly centralized architectures tend to emerge in organizations where trust is concentrated at the top. Distributed architectures often reflect organizations that trust their teams to make good decisions locally.",
      "This isn&apos;t deterministic—you can have a microservices architecture in a command-and-control organization. But the friction will be constant. The architecture will fight the culture.",
      "When I&apos;m evaluating technical decisions, I&apos;ve learned to ask: what does this say about how we trust each other? A system that requires multiple approvals for every change is making a statement about trust. So is a system that lets teams deploy independently.",
      "Neither is inherently better. But alignment matters. The architecture should reflect the organization you want to be, not just the one you are.",
    ],
  },
  "debugging-org-bottlenecks": {
    title: "Debugging Organizational Bottlenecks",
    date: "December 2025",
    content: [
      "Engineers are natural systems thinkers. We spend our days understanding complex systems, tracing cause and effect, identifying bottlenecks and single points of failure.",
      "These same skills apply to organizations. Teams are systems too, with their own failure modes, feedback loops, and emergent behaviors.",
      "When a team is struggling, I approach it like debugging a system. I look for the bottleneck. Is it a person? A process? A missing capability? Often it&apos;s not where you&apos;d expect.",
      "The classic mistake is optimizing the wrong part of the system. Making one team faster doesn&apos;t help if they&apos;re waiting on another team. Hiring more engineers doesn&apos;t help if the bottleneck is decision-making.",
      "I&apos;ve learned to trace dependencies, just like I would in code. Who&apos;s waiting on whom? Where does work pile up? Where do decisions get stuck?",
      "The solutions are often surprisingly simple once you find the actual bottleneck. But finding it requires patience and curiosity—the same skills that make great debuggers.",
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-0 lg:h-screen">
              <Sidebar />
            </div>
            <main className="py-12 lg:py-20">
              <p className="text-muted-foreground">Post not found.</p>
            </main>
          </div>
        </div>
      </div>
    );
  }

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
                    {post.date}
                  </time>
                  <h1 className="text-xl font-medium text-foreground mt-2 text-balance">
                    {post.title}
                  </h1>
                </header>

                <div className="prose prose-invert prose-sm max-w-none">
                  {post.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
