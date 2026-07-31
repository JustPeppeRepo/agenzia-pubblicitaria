import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PaletteSwitcher } from "@/components/layout/PaletteSwitcher";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/data/site";
import "./globals.css";

/** Runs before paint: theme + palette (survives hydration). */
const themeInitScript = `(function(){try{var r=document.documentElement;var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var v=d?"dark":"light";r.dataset.theme=v;r.classList.toggle("dark",d);var p=localStorage.getItem("palette");if(p==="brand-echo"||p==="electric-signal"||p==="mediterranean-heat"||p==="lime-punch"){r.dataset.palette=p;}}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <PaletteSwitcher />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
