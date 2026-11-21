interface ProjectCardProps {
  title: string;
  description?: string | null;
  href: string;
  /** "project" for MDX projects, "repo" for the compact GitHub repository list. */
  variant?: "project" | "repo";
  /** Repo variant only: the repository's primary language. */
  language?: string | null;
}

function initials(title: string): string {
  const words = title.match(/[A-Z][a-z]*|\d+/g) ?? [title];
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function domainOf(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function ProjectCard({
  title,
  description,
  href,
  variant = "project",
  language,
}: ProjectCardProps) {
  if (variant === "repo") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
      >
        <span className="font-semibold text-foreground group-hover:underline group-hover:underline-offset-4">
          {title}
        </span>
        {description && (
          <span className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </span>
        )}
        <span className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-sm">
          {language && (
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
              {language}
            </span>
          )}
          <span className="font-medium text-foreground">View on GitHub ↗</span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30 md:p-7"
    >
      <span className="flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground md:h-12 md:w-12"
        >
          {initials(title)}
        </span>
        <span className="text-xl font-bold text-foreground md:text-[22px]">
          {title}
        </span>
      </span>
      {description && (
        <span className="text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </span>
      )}
      <span className="mt-auto text-sm font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
        Visit {domainOf(href)} ↗
      </span>
    </a>
  );
}
