import Image from "next/image";
import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain"
            priority
            unoptimized
          />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Contattami
        </Link>
      </div>
    </header>
  );
}
