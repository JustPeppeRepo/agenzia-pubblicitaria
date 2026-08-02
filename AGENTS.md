<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## ZERO experimental flags (obbligatorio)

- **Mai** aggiungere `experimental` / `unstable_*` in `next.config` o nel codice.
- Per icone brand usare `getBrandIcon()` (`src/lib/brand-icons.ts`), non barrel `simple-icons` né `optimizePackageImports`.
- Dettaglio e checklist: `ROADMAP.md` + `PROJECT_GUIDELINES.md`.

## Hydration mismatch — regole obbligatorie

React segnala un hydration mismatch quando l'HTML del server non coincide con il primo render client. **Non "fixare" a caso**: prima capire la causa.

### 1. Falsi positivi da Cursor Browser / MCP (molto frequente)

Se l'errore elenca solo attributi `data-cursor-ref` o `data-cursor-element-id` su link, heading, paragrafi, ecc., **non è un bug dell'app**.

- Gli strumenti browser MCP di Cursor (`browser_navigate`, `browser_snapshot`, `browser_click`, Simple Browser integrato) **iniettano** questi attributi nel DOM prima che React idrati.
- Il diff tipico: `- data-cursor-ref="e0"` lato server vs `+ Testo del link` lato client.
- **Non modificare** Header, Link, FadeIn o altri componenti per questo motivo.

**Workflow agente:**
- Evitare di aprire/navigare con MCP browser la stessa tab del dev server mentre si sviluppa o si fa hot reload.
- Per verifiche visive preferire screenshot MCP **sapendo** che possono comparire warning in dev overlay, oppure verificare in un browser esterno (Chrome/Firefox normale).
- Se l'utente segnala hydration mismatch, controllare **prima** se nei diff compaiono `data-cursor-ref` / `data-cursor-element-id`.

### 2. Cause reali nel codice — da evitare

| Pattern | Perché rompe l'hydration | Soluzione |
|--------|---------------------------|-----------|
| `if (typeof window !== 'undefined')` nel render | Server e client producono markup diverso | Spostare in `useEffect`, o default SSR coerente |
| `Date.now()`, `Math.random()`, `new Date().toLocaleString()` nel render | Valore diverso ogni render | Calcolare solo client-side dopo mount |
| `window.matchMedia`, `localStorage`, dimensioni viewport nel render | Non disponibili / diversi al SSR | `useState` + `useEffect`, oppure hook come `useMotionSafe` |
| Framer Motion `initial` diverso server/client | Attributi `style` / wrapper diversi | `initial={false}` finché `mounted === false`; usare `useMotionSafe` |
| Nesting HTML invalido (`<p>` dentro `<p>`, `<div>` dentro `<p>`) | Browser corregge il DOM in modo diverso | Correggere la struttura semantica |
| Estensioni browser che alterano il DOM | Attributi extra prima di React | Testare in incognito / disabilitare estensioni |

### 3. Pattern approvati in questo progetto

- **`useMotionSafe`** (`src/hooks/use-motion-safe.ts`): durante SSR e primo render client restituisce `prefersReducedMotion: true` così server e client coincidono; dopo mount riflette la preferenza OS reale.
- **Animazioni Framer Motion**: usare `initial={false}` o `shouldAnimate = mounted && !prefersReducedMotion` — mai `initial` basato direttamente su `window` nel render.
- **Componenti puramente client-only** (es. chart interattivi): `dynamic(..., { ssr: false })` se il markup SSR non può essere identico.

### 4. Checklist prima di ogni modifica UI con animazioni o client components

1. Il render SSR e il primo render client producono lo **stesso** HTML (stessi tag, attributi, testo)?
2. Nessun valore non deterministico nel JSX?
3. Motion: `initial` è `false` o identico su server e client?
4. L'errore menziona `data-cursor-ref`? → ignorare come bug app, rivedere uso browser MCP.
