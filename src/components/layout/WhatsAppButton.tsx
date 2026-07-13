"use client";

import { motion } from "framer-motion";
import { siWhatsapp } from "simple-icons";
import { siteConfig } from "@/data/site";
import { cn, formatWhatsAppLink } from "@/lib/utils";

const WHATSAPP_MESSAGE = `Ciao! Vorrei maggiori informazioni su ${siteConfig.name}.`;

export function WhatsAppButton() {
  const href = formatWhatsAppLink(siteConfig.phone, WHATSAPP_MESSAGE);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "fixed z-50 flex size-14 items-center justify-center rounded-full",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]",
        "bg-[#25D366] text-white shadow-lg shadow-black/25",
        "transition-shadow duration-200 hover:shadow-xl",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
      )}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={28}
        height={28}
        fill="currentColor"
        aria-hidden
      >
        <path d={siWhatsapp.path} />
      </svg>
    </motion.a>
  );
}
