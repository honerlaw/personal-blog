import { SocialLinks } from "./social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-6 text-sm text-muted-foreground md:px-8">
        <span>© Derek Honerlaw</span>
        <SocialLinks />
      </div>
    </footer>
  );
}
