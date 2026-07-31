export const PALETTE_STORAGE_KEY = "palette";

export const PALETTES = [
  {
    id: "brand-echo",
    label: "Brand Echo",
    swatches: ["#2967d5", "#f26d8e", "#fc8d16"],
  },
  {
    id: "electric-signal",
    label: "Electric Signal",
    swatches: ["#0b5fff", "#ff2d6a", "#00e0c6"],
  },
  {
    id: "mediterranean-heat",
    label: "Mediterranean Heat",
    swatches: ["#ff5a1f", "#0077b6", "#ffb703"],
  },
  {
    id: "lime-punch",
    label: "Lime Punch",
    swatches: ["#c8f542", "#6c2bff", "#ff3d8a"],
  },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

export function isPaletteId(value: string | null | undefined): value is PaletteId {
  return PALETTES.some((p) => p.id === value);
}

export function applyPalette(id: PaletteId) {
  document.documentElement.dataset.palette = id;
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
}

export function getStoredPalette(): PaletteId {
  try {
    const stored = localStorage.getItem(PALETTE_STORAGE_KEY);
    if (isPaletteId(stored)) return stored;
  } catch {
    /* ignore */
  }
  return "brand-echo";
}
