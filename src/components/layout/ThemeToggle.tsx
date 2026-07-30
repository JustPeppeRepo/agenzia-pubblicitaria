"use client";

import { useEffect, useState } from "react";
import { applyTheme, getPreferredTheme, type Theme } from "@/lib/theme";

function readDomTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ||
    document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Prefer what's already on <html> (init script); otherwise resolve + apply.
    const current = document.documentElement.dataset.theme
      ? readDomTheme()
      : getPreferredTheme();
    applyTheme(current);
    setTheme(current);
  }, []);

  function toggle() {
    // Always read from DOM so the first click works even if React state lagged.
    const next: Theme = readDomTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro"
      }
      title="Cambia tema"
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-foreground/10 text-foreground/70 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
    >
      {theme === "dark" ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" />
        </svg>
      )}
    </button>
  );
}
