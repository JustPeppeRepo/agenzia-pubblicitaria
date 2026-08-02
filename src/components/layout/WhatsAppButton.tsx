import { siteConfig } from "@/data/site";
import { getBrandIcon } from "@/lib/brand-icons";
import { cn, formatWhatsAppLink } from "@/lib/utils";

const WHATSAPP_MESSAGE = `Ciao! Vorrei maggiori informazioni su ${siteConfig.name}.`;
const whatsappIcon = getBrandIcon("whatsapp");

/** CSS float instead of Framer Motion — keeps the widget off the JS animation budget. */
export function WhatsAppButton() {
  const href = formatWhatsAppLink(siteConfig.phone, WHATSAPP_MESSAGE);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className={cn(
        "whatsapp-float fixed z-50 flex size-14 items-center justify-center rounded-full",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]",
        "bg-[#25D366] text-white shadow-lg shadow-black/25",
        "transition-[transform,shadow] duration-200 hover:scale-105 hover:shadow-xl",
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
        <path d={whatsappIcon?.path ?? ""} />
      </svg>
    </a>
  );
}
