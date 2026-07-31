"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks, siteConfig } from "@/data/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="bg-nav sticky top-0 z-50 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="relative z-10 flex min-w-0 items-center gap-1 text-lg font-semibold tracking-tight md:-translate-x-1"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt=""
            width={52}
            height={52}
            className="h-[52px] w-[52px] shrink-0 object-contain"
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
            onClick={() => setOpen(false)}
          >
            Contattami
          </Link>
          <button
            type="button"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-accent md:hidden"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
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

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={menuId}
            key="mobile-nav"
            initial={shouldAnimate ? { height: 0, opacity: 0 } : false}
            animate={
              shouldAnimate ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={shouldAnimate ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: shouldAnimate ? 0.22 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-foreground/10 md:hidden"
          >
            <nav
              aria-label="Menu mobile"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-foreground/80 transition-colors hover:bg-accent/5 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-foreground/10 px-3 pt-3">
                <span className="text-sm text-foreground/60">Tema</span>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
