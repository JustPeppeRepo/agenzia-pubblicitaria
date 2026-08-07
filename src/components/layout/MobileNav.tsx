"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks } from "@/data/site";
import { useMotionSafe } from "@/hooks/use-motion-safe";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  menuId: string;
};

/**
 * Framer-only island for the mobile drawer.
 */
export function MobileNav({ open, onClose, menuId }: MobileNavProps) {
  const { mounted, prefersReducedMotion } = useMotionSafe();
  const shouldAnimate = mounted && !prefersReducedMotion;

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={menuId}
          key="mobile-nav"
          initial={shouldAnimate ? { height: 0, opacity: 0 } : false}
          animate={
            shouldAnimate
              ? { height: "auto", opacity: 1 }
              : { height: "auto", opacity: 1 }
          }
          exit={
            shouldAnimate
              ? { height: 0, opacity: 0 }
              : { height: 0, opacity: 0 }
          }
          transition={{
            duration: shouldAnimate ? 0.22 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
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
                onClick={onClose}
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
  );
}
