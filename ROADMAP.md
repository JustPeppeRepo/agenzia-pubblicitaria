# ROADMAP — Portfolio Agenzia Pubblicitaria

> Documento operativo per AI e sviluppatori. Aggiornare a ogni milestone.

---

## Regola permanente: ZERO flags sperimentali

**Non usare mai** flags / opt-in sperimentali di framework o librerie.

Vietato in particolare:
- Blocco `experimental` in `next.config.ts` / `next.config.js` (es. `optimizePackageImports`, `turbopack*`, `ppr`, ecc.)
- API `experimental_*` / `unstable_*` di Next.js, React o altre dipendenze
- Feature flag alpha/beta non LTS in produzione

**Alternative obbligatorie (stabili):**
| Esigenza | Approccio approvato |
|----------|---------------------|
| Bundle icone / barrel import pesanti | Registry locale + `getBrandIcon()` in `src/lib/brand-icons.ts` |
| Tree-shaking pacchetti | Named import ESM + `sideEffects: false` del vendor; niente rewrite experimental |
| Feature progressive | API stabili documentate, dynamic import `next/dynamic`, CSS nativo |

Se una ottimizzazione richiede una flag experimental → **non implementarla**. Scegliere un percorso stabile o rimandare.

---

## Stato attuale

- [x] Rimosso `experimental.optimizePackageImports` da `next.config.ts`
- [x] Icone brand via `getBrandIcon()` (niente `simple-icons` barrel / flags)
- [x] Linee guida in `PROJECT_GUIDELINES.md` + questa roadmap
- [x] Performance home (`/`): Hero LCP SSR-visibile (niente `opacity: 0` su H1/CTA); mockup desktop via load md-only; `ValueProposition` deferred (IO + `ssr: false`) con placeholder anti-CLS; PlainTalkVisual split per id; FadeIn `nearFold` su AboutBrief; Header Framer solo menu mobile; bloom hero senza `filter:blur` live
- [x] Build verificata (`next build` — `/` Static)

## Prossimi passi

- [ ] Verificare Lighthouse / Speed Insights post-deploy (target FCP/LCP Good su `/`, RES vicino a 100)
- [ ] Contenuti / case study
- [ ] Deploy produzione con sole API stabili
