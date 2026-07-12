# Video Preview Placeholder

Aggiungi qui i file MP4 per l'hover preview delle card progetti.

Naming convention (come definito in `src/data/projects.ts`):

- `aurora-preview.mp4`
- `nova-preview.mp4`
- `verde-preview.mp4`
- `linea-preview.mp4`

Requisiti:
- Durata: 3–8 secondi, loop seamless
- Risoluzione: max 1280×720
- Codec: H.264, muted
- Peso target: < 2 MB per file

I video vengono caricati solo on-hover (`preload="none"`) per non impattare LCP.
