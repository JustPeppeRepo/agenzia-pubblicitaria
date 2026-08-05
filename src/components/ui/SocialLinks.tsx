import { siteConfig } from "@/data/site";
import { getBrandIcon } from "@/lib/brand-icons";
import { cn, formatEmailLink } from "@/lib/utils";

const EMAIL_ICON = {
  title: "Email",
  path: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z",
};

const PLATFORM_ICONS: Record<
  string,
  { title: string; path: string } | undefined
> = {
  github: getBrandIcon("github"),
};

function SocialIcon({ path }: { path: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="currentColor"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

type SocialLinksProps = {
  className?: string;
  includeEmail?: boolean;
};

export function SocialLinks({ className, includeEmail = true }: SocialLinksProps) {
  const linkClass = cn(
    "flex size-11 items-center justify-center rounded-xl",
    "border border-foreground/10 bg-foreground/[0.02]",
    "text-foreground/70 transition-colors",
    "hover:border-foreground/20 hover:bg-foreground/[0.05] hover:text-foreground",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40",
  );

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {includeEmail ? (
        <a
          href={formatEmailLink(siteConfig.email)}
          aria-label={`Invia email a ${siteConfig.email}`}
          className={linkClass}
        >
          <SocialIcon path={EMAIL_ICON.path} />
        </a>
      ) : null}
      {siteConfig.social.map((link) => {
        const icon = PLATFORM_ICONS[link.platform];
        if (!icon) return null;

        return (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={linkClass}
          >
            <SocialIcon path={icon.path} />
          </a>
        );
      })}
    </div>
  );
}
