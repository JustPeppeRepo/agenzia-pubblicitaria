import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import {
  absoluteUrl,
  defaultOgImagePath,
  getSiteUrl,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

/** Runs before paint: theme + palette (survives hydration). */
const themeInitScript = `(function(){try{var r=document.documentElement;var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var v=d?"dark":"light";r.dataset.theme=v;r.classList.toggle("dark",d);var p=localStorage.getItem("palette");if(p==="brand-echo"||p==="electric-signal"||p==="mediterranean-heat"||p==="lime-punch"){r.dataset.palette=p;}}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = getSiteUrl();
const ogImage = absoluteUrl(defaultOgImagePath);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Siti web e pubblicità a Palermo`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  keywords: [
    "agenzia web Palermo",
    "sviluppo siti web",
    "Next.js",
    "SEO",
    "pubblicità online",
    "web design Palermo",
    siteConfig.name,
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Siti web e pubblicità a Palermo`,
    description: siteConfig.description,
    images: [
      {
        url: ogImage,
        width: 1920,
        height: 1080,
        alt: `${siteConfig.name} — portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Siti web e pubblicità a Palermo`,
    description: siteConfig.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
