import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export function PostCard({ title, excerpt, date, slug }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${slug}`} className="block">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
              {title}
            </h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
          <time className="text-xs text-muted-foreground/70">{date}</time>
        </div>
      </Link>
    </article>
  );
}
