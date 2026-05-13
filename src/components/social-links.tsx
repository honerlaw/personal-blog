import { Github, Linkedin } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/honerlaw",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/derek-j-honerlaw/",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
