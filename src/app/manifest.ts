import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Aiello Studio",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f5",
    theme_color: "#2967d5",
    lang: "it",
    icons: [
      {
        src: "/logo.png",
        sizes: "158x160",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
