import Link from "next/link";
import { cn } from "@/lib/utils";

interface PostCardProps {
  title: string;
  excerpt: string;
  /** Display date, e.g. "Nov 20, 2026". */
  date: string;
  /** Machine-readable date for the <time> element, e.g. "2026-11-20". */
  dateTime: string;
  readingTime: string;
  slug: string;
  tags?: string[];
  featured?: boolean;
  /** Heading level for the title, so each page keeps a gap-free outline. */
  headingLevel?: "h2" | "h3";
}

export function PostCard({
  title,
  excerpt,
  date,
  dateTime,
  readingTime,
  slug,
  tags,
  featured = false,
  headingLevel: Heading = "h3",
}: PostCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border border-border bg-card transition-colors hover:border-foreground/30",
        featured ? "p-6 md:p-9" : "p-6 md:p-7"
      )}
    >
      <p className="text-sm text-muted-foreground">
        <time dateTime={dateTime}>{date}</time>
        <span aria-hidden="true"> · </span>
        {readingTime}
      </p>
      <Heading
        className={cn(
          "font-bold text-foreground text-balance",
          featured
            ? "text-2xl leading-tight tracking-tight md:text-[2rem]"
            : "text-xl leading-snug tracking-tight"
        )}
      >
        {/* The title is the link; its overlay makes the whole card clickable. */}
        <Link
          href={`/posts/${slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl group-hover:underline group-hover:underline-offset-4"
        >
          {title}
        </Link>
      </Heading>
      <p
        className={cn(
          "leading-relaxed text-muted-foreground",
          featured ? "text-base md:text-[17px] max-w-3xl" : "text-[15px]"
        )}
      >
        {excerpt}
      </p>
      {tags && tags.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1" aria-label="Tags">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
