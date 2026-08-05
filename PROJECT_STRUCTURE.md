# Project structure — Aiello Digital Studio

Indice delle rotte pubbliche, API e file di supporto SEO/sicurezza.
Stack: **Next.js 16** (App Router) · TypeScript · Tailwind CSS · Framer Motion.

## Pagine (App Router)

| Rotta | File | Scopo |
|-------|------|--------|
| `/` | `src/app/page.tsx` | Homepage: hero, chi sono, value proposition, progetti in evidenza, CTA contatti. JSON-LD `Person`. |
| `/about` | `src/app/about/page.tsx` | Profilo sviluppatore (e team se `DOUBLE`), stack tech, diagramma architettura. JSON-LD `Person`. |
| `/contact` | `src/app/contact/page.tsx` | Form di contatto + link social/email. |
| `/privacy` | `src/app/privacy/page.tsx` | Informativa privacy GDPR (titolare da `siteConfig.privacyController`). |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Case study progetto (SSG). Slug attuali: `cage`, `scavo`. |

## Layout e shell

| File | Scopo |
|------|--------|
| `src/app/layout.tsx` | Root layout: metadata SEO globale, Header, Footer, WhatsApp, MotionProvider, Analytics, JSON-LD Organization/WebSite. |
| `src/proxy.ts` | Rate limit globale su `/api/*` (Next.js 16 proxy, ex middleware). |

## API

| Rotta | File | Scopo |
|-------|------|--------|
| `POST /api/contact` | `src/app/api/contact/route.ts` | Validazione Zod + sanitizzazione + rate limit (burst/ora) + check Origin. Delivery email lato client via FormSubmit. |

## SEO / PWA (file speciali App Router)

| Rotta generata | File | Scopo |
|----------------|------|--------|
| `/sitemap.xml` | `src/app/sitemap.ts` | Sitemap dinamica (statiche + progetti). |
| `/robots.txt` | `src/app/robots.ts` | Allow all + puntatore sitemap. |
| `/manifest.webmanifest` | `src/app/manifest.ts` | Manifest PWA base. |

## Dati e librerie chiave

| Path | Ruolo |
|------|--------|
| `src/data/site.ts` | Config sito, nav, copy home/about, stack duel, plain talk. |
| `src/data/projects.ts` | Portfolio case study. |
| `src/data/technologies.ts` | Stack tecnico e marketing. |
| `src/lib/seo.ts` | `metadataBase` helpers + JSON-LD. |
| `src/lib/contact.ts` | Validazione/sanitizzazione form. |
| `src/lib/rate-limit.ts` | Upstash Redis o fallback in-memory. |
| `src/lib/content.ts` | Accessor progetti (featured, slug, ecc.). |
| `src/types/index.ts` | Tipi condivisi. |

## Componenti (mappa sintetica)

```
src/components/
  layout/     Header, Footer, ThemeToggle, WhatsAppButton
  sections/   Hero, AboutBrief, ValueProposition, ProjectsGrid, Contact*, …
  project/    CaseStudySection, ProjectHeroVideo
  motion/     MotionProvider, FadeIn, easing
  decor/      CornerBloom, LayeredWaves, SectionWave
  seo/        JsonLd
  ui/         Button, SectionHeading, SocialLinks, TechIcon
```

## Config root

| File | Scopo |
|------|--------|
| `next.config.ts` | Security headers (CSP, HSTS, …), image optimization. |
| `.env.example` | `NEXT_PUBLIC_SITE_URL`, Upstash, Google verification. |
| `PROJECT_GUIDELINES.md` / `ROADMAP.md` / `AGENTS.md` | Linee guida di sviluppo. |

## Ancore homepage

- `#projects` — griglia progetti (`ProjectsGrid`)
