"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import type { AboutMember } from "@/types";
import { cn } from "@/lib/utils";

type AboutMemberSectionProps = {
  member: AboutMember;
  children: ReactNode;
  className?: string;
};

export function AboutMemberSection({
  member,
  children,
  className,
}: AboutMemberSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();

  return (
    <section
      id={member.anchorId}
      className={cn(
        "scroll-mt-24 border-t border-foreground/10 pt-16 first:border-t-0 first:pt-0",
        className,
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="mx-auto w-full max-w-[200px] shrink-0 sm:mx-0">
          <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] shadow-sm">
            <Image
              src={member.image}
              alt={member.imageAlt}
              width={320}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/50">
            {member.role}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {member.name}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/65 sm:text-base">
            {member.bio}
          </p>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-expanded={isOpen}
            aria-controls={detailsId}
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg
              viewBox="0 0 16 16"
              className={cn("size-3.5 transition-transform", isOpen && "rotate-180")}
              aria-hidden
            >
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isOpen ? member.collapseLabel : member.expandLabel}
          </button>
        </div>
      </div>

      <div id={detailsId} hidden={!isOpen} className="mt-12">
        {children}
      </div>
    </section>
  );
}
