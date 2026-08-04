# PROJECT_GUIDELINES.md — Fonte di Verità del Portfolio

> Documento di riferimento per AI e sviluppatori. Ogni modifica al codice **deve** rispettare queste linee guida.

## Visione del Progetto

Portfolio web moderno, data-driven e **senza database**, progettato per impressionare clienti con:
- Prestazioni Lighthouse vicine a 100 (FCP/LCP ottimizzati)
- Animazioni creative ma performanti (scroll + hover)
- Case study tecnici che dimostrano competenza ingegneristica

---

## Regole Fondamentali

### 🔴 DIVIETO ASSOLUTO DI FLAGS SPERIMENTALI
È **severamente vietato** l'utilizzo in produzione di:
- Librerie, API o configurazioni in stato alpha/beta/experimental
- Flags sperimentali di framework (es. `experimental_*`, `unstable_*`, blocco `experimental` in `next.config`)
- Pacchetti npm non LTS o non mantenuti attivamente

Tutto il codice deve essere **solido, stabile e pronto per la produzione**.

**Sostituti approvati** (vedi anche `ROADMAP.md`):
- Icone brand / barrel pesanti → `getBrandIcon()` in `src/lib/brand-icons.ts` (niente `optimizePackageImports`)
- Lazy load componenti pesanti → `next/dynamic` stabile
- Se serve una flag experimental → non implementare; scegliere un path stabile

### Nessun Database
Tutti i contenuti (progetti, tecnologie, metriche, testi) risiedono in:
- `src/data/*.ts` — array/oggetti TypeScript tipizzati
- `public/` — asset statici (immagini WebP/AVIF, video MP4)

Recupero dati tramite funzioni pure in `src/lib/content.ts` (es. `getProjectBySlug`).

---

## Stack Tecnologico (Stabile)

| Area | Scelta | Motivazione |
|------|--------|-------------|
| Framework | **Next.js 16** (App Router) | SSG/SSR, SEO, Image Optimization |
| Linguaggio | **TypeScript** | Type-safety end-to-end |
| Styling | **Tailwind CSS v4** | Utility-first, bundle minimo |
| Animazioni | **Framer Motion** | API dichiarativa, tree-shakeable |
| Tabelle | **TanStack Table v8** | Headless, performante |
| Grafici | **Recharts** | React-native, bundle controllato |

---

## Design System

### Tipografia
- Font: **Geist Sans** via `next/font/google` (self-hosted, zero layout shift)
- Gerarchia: Hero `text-5xl/6xl`, sezioni `text-3xl/4xl`, body `text-base/lg`

### Colori
- Background: `#fafafa` / dark `#0a0a0a`
- Foreground: `#111111` / dark `#f5f5f5`
- Accent: gradienti sottili su hover, mai eccessivi

### Spacing & Layout
- Container max-width: `max-w-6xl`
- Padding sezioni: `py-20` / `py-24`
- Grid responsive: mobile-first, breakpoint `md` e `lg`

### Motion
- Durata standard: `0.4s–0.6s`, easing `easeOut`
- Scroll: `whileInView` con `viewport={{ once: true, margin: "-80px" }}`
- Hover card progetti: crossfade immagine → video MP4 (lazy, preload none)
- Ridurre animazioni se `prefers-reduced-motion: reduce`

---

## Architettura Componenti

```
src/
├── app/                    # Route pages (App Router)
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── projects/[slug]/page.tsx
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, AboutBrief, ValueProp, ProjectsGrid...
│   ├── project/            # CaseStudy*, MetricsChart, MetricsTable
│   ├── ui/                 # Button, SectionHeading, AnimatedSection
│   └── motion/             # FadeIn, StaggerContainer (wrappers Framer)
├── data/                   # Sorgente dati statica
├── lib/                    # content.ts, utils.ts
└── types/                  # Interfacce condivise
```

### Convenzioni
- **Server Components** di default; `"use client"` solo dove serve interattività
- Componenti pesanti (Recharts, TanStack) importati dinamicamente con `next/dynamic`
- Immagini sempre via `next/image` con `sizes` e formati AVIF/WebP
- Video preview: caricati solo on-hover, `muted loop playsInline`

---

## Struttura Pagine

### `/` — Home
1. Hero con CTA e animazione ingresso
2. About breve + griglia tecnologie (icone)
3. "Perché scegliere me" — proposta di valore basata su fatti
4. Griglia progetti con hover video → link a `/projects/[slug]`

### `/about` — About approfondito
- Bio, percorso, filosofia
- Stack tecnologico con spiegazione del *perché* di ogni scelta
- Layout creativo (timeline / bento grid)

### `/projects/[slug]` — Case Study
Sezioni obbligatorie per ogni progetto:
1. **Il Problema** — contesto business
2. **La Soluzione** — architettura e design decisions
3. **I Dati** — tabella metriche (TanStack) + grafico (Recharts)

Generazione statica via `generateStaticParams` da `src/data/projects.ts`.

### `/contact` — Contatti
- Form con validazione client-side (Zod-like manuale o regex)
- Feedback animato post-invio
- Link diretti email / LinkedIn

---

## Performance Checklist

- [ ] `next.config.ts`: `formats: ['image/avif', 'image/webp']`
- [ ] Font con `display: 'swap'` e subset `latin`
- [ ] `loading="lazy"` su immagini below-the-fold
- [ ] Dynamic import per chart e table su pagina progetto
- [ ] Metadata SEO su ogni pagina (`generateMetadata`)
- [x] Nessun bundle JS inutile in homepage (Hero SSR + `next/dynamic` sotto-fold)

---

## Aggiungere un Nuovo Progetto

1. Aggiungere entry in `src/data/projects.ts` con slug univoco
2. Inserire asset in `public/images/projects/` e `public/videos/`
3. Definire `metrics[]` e `chartData[]` per il case study
4. Il route `/projects/[slug]` si genera automaticamente via SSG

---

## Naming & Lingua

- Route in **inglese**: `/about`, `/contact`, `/projects/[slug]`
- Contenuti UI in **italiano** (target clienti locali)
- Codice, tipi e commenti in **inglese**
