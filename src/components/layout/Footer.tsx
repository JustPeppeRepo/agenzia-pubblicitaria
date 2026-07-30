import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import { formatEmailLink } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-accent/10 bg-section">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-foreground/50">{siteConfig.role}</p>
          <p className="mt-3 text-sm leading-6 text-foreground/65">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50">
            Navigazione
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50">
            Contatti
          </p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            <li>
              <a
                href={formatEmailLink(siteConfig.email)}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.location}</li>
            {siteConfig.social.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-foreground/10 px-6 py-4 text-center text-sm text-foreground/50">
        © {year} {siteConfig.name}. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
