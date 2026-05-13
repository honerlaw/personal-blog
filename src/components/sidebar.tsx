import Image from "next/image";
import { Navigation } from "./navigation";
import { SocialLinks } from "./social-links";

export function Sidebar() {
  return (
    <aside className="flex flex-col h-full pt-12 lg:py-20">
      <div className="flex flex-col gap-8">
        <div>
          <div className="w-full max-w-xs mb-5 overflow-hidden rounded-md">
            <Image
              src="/pillars.jpg"
              alt="Pillars of Creation captured by the James Webb Space Telescope (NASA, ESA, CSA, STScI)"
              width={450}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
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
    </aside>
  );
}
