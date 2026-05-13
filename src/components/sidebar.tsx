import { Navigation } from "./navigation";
import { SocialLinks } from "./social-links";
import { ThemeToggle } from "./theme-toggle";

export function Sidebar() {
  return (
    <aside className="flex flex-col justify-between h-full py-12 lg:py-20">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-lg font-medium text-foreground">Derek Honerlaw</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Evolving through experiences.
          </p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>
        <Navigation />
      </div>
      <div className="flex items-center justify-end">
        <ThemeToggle />
      </div>
    </aside>
  );
}
