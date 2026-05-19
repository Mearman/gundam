import type { MediaKind, AudioLang, TextLang } from "../data/types";

export const MEDIA_ICONS: Record<MediaKind, string> = {
  tv: "▢",
  ova: "◉",
  ona: "◉",
  film: "▶",
  manga: "▤",
  novel: "▥",
  game: "◆",
  live: "◐",
  tba: "?",
};

export const MEDIA_NAMES: Record<MediaKind, string> = {
  tv: "TV series",
  ova: "OVA",
  ona: "ONA",
  film: "Film",
  manga: "Manga",
  novel: "Novel",
  game: "Game",
  live: "Live action",
  tba: "Format TBA",
};

export const AUDIO_LABELS: Record<AudioLang, string> = {
  en: "English dub officially exists",
  ja: "Japanese audio only",
  na: "No audio (print)",
  tba: "Format & language TBA",
};

export const TEXT_LABELS: Record<TextLang, string> = {
  en: "English subtitles or translation officially exist",
  ja: "Japanese text only, untranslated",
  tba: "Format & language TBA",
};

export const MARK_LABELS: Record<AudioLang | TextLang, string> = {
  en: "EN",
  ja: "JP",
  na: "—",
  tba: "?",
};

export function matchesMediaFilter(filter: string, m: string): boolean {
  if (filter === "all") return true;
  if (filter === "ova") return m === "ova" || m === "ona";
  if (filter === "manga") return m === "manga" || m === "novel";
  return filter === m;
}

export function tintColor(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${String(r)},${String(g)},${String(b)},${String(alpha)})`;
}
