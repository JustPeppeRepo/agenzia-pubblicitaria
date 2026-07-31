import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks, siteConfig } from "@/data/site";

export function Header() {
  return (
    <header className="bg-nav sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={52}
            height={52}
            className="h-[52px] w-[52px] shrink-0 object-contain"
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
              className="text-sm text-foreground/70 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm shadow-accent/25 transition-colors hover:bg-accent/90"
          >
            Contattami
          </Link>
        </div>
      </div>
    </header>
  );
}
