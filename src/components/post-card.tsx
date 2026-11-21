import Link from "next/link";
import { cn } from "@/lib/utils";

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  tags?: string[];
  featured?: boolean;
}

export function PostCard({
  title,
  excerpt,
  date,
  readingTime,
  slug,
  tags,
  featured = false,
}: PostCardProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border bg-card transition-colors hover:border-foreground/30",
        featured ? "p-6 md:p-9" : "p-6 md:p-7"
      )}
    >
      <p className="text-sm text-muted-foreground">
        <time>{date}</time>
        <span aria-hidden="true"> · </span>
        {readingTime}
      </p>
      <h3
        className={cn(
          "font-bold text-foreground text-balance group-hover:underline group-hover:underline-offset-4",
          featured
            ? "text-2xl leading-tight tracking-tight md:text-[2rem]"
            : "text-xl leading-snug tracking-tight"
        )}
      >
        {title}
      </h3>
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
    </Link>
  );
}
