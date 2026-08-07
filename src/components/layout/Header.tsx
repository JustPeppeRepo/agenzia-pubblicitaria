"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks, siteConfig } from "@/data/site";

const MobileNav = dynamic(
  () =>
    import("@/components/layout/MobileNav").then((m) => m.MobileNav),
  { ssr: false },
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="bg-nav sticky top-0 z-50 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="relative z-10 flex min-w-0 items-center gap-1 text-lg font-semibold tracking-tight md:-translate-x-1"
          onClick={onClose}
        >
          <Image
            src="/logo.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 object-contain dark:brightness-0 dark:invert"
            priority
            unoptimized
          />
          <span className="hidden truncate sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
          aria-label="Principale"
        >
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

        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-3 py-2 text-sm font-medium text-accent-foreground shadow-sm shadow-accent/25 transition-colors hover:bg-accent/90 sm:px-4"
            onClick={onClose}
          >
            Contattami
          </Link>
          <button
            type="button"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-accent md:hidden"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => {
              setMenuLoaded(true);
              setOpen((value) => !value);
            }}
          >
            <span className="relative block size-5" aria-hidden>
              <span
                className={`absolute left-0.5 right-0.5 top-[5px] h-0.5 origin-center rounded-full bg-current transition-transform duration-200 ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0.5 right-0.5 top-[9.5px] h-0.5 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0.5 right-0.5 top-[14px] h-0.5 origin-center rounded-full bg-current transition-transform duration-200 ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuLoaded ? (
        <MobileNav open={open} onClose={onClose} menuId={menuId} />
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-10 bg-gradient-to-b from-background/25 to-transparent"
      />
    </header>
  );
}
