"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type DeferredMountProps = {
  children: ReactNode;
  /** Reserved height while idle (anti-CLS). */
  className?: string;
  /** IO rootMargin — start loading before the block enters the viewport. */
  rootMargin?: string;
  /** Also kick off on idle if already near (first paint below fold). */
  idle?: boolean;
};

/**
 * Defers mounting heavy below-fold trees until near viewport (or idle).
 * Keeps a sized placeholder to avoid CLS.
 */
export function DeferredMount({
  children,
  className,
  rootMargin = "220px 0px",
  idle = true,
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const activate = () => {
      if (cancelled) return;
      setReady(true);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          activate();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(node);

    if (idle) {
      const ric = window.requestIdleCallback;
      if (typeof ric === "function") {
        idleId = ric(() => activate(), { timeout: 2500 });
      } else {
        timeoutId = setTimeout(activate, 2000);
      }
    }

    return () => {
      cancelled = true;
      io.disconnect();
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [ready, rootMargin, idle]);

  return (
    <div ref={ref} className={className}>
      {ready ? children : null}
    </div>
  );
}
