export interface Universe {
  id: string;
  name: string;
  abbr: string;
  color: string;
  desc: string;
}

export type MediaKind =
  | "tv"
  | "ova"
  | "ona"
  | "film"
  | "manga"
  | "novel"
  | "game"
  | "live"
  | "tba";
export type AudioLang = "en" | "ja" | "na" | "tba";
export type TextLang = "en" | "ja" | "tba";

export interface Entry {
  detailId?: string;
  u: string | string[];
  d: string;
  t: string;
  n?: string;
  y1: number;
  y2: number;
  m: MediaKind;
  a: AudioLang;
  s: TextLang;
}

/** Check whether an entry belongs to a given universe. */
export function entryInUniverse(entry: Entry, universeId: string): boolean {
  if (Array.isArray(entry.u)) {
    return entry.u.includes(universeId);
  }
  return entry.u === universeId;
}

export interface StackedEntry extends Entry {
  stack: number;
}

export interface StoryStackedEntry extends Entry {
  storyStack: number;
  storyStart: number;
  storyEnd: number;
}

export type AxisMode = "release" | "story" | "both";

export type Density = "comfort" | "compact";

export interface Filters {
  media: string;
  audio: string;
  text: string;
  density: Density;
  axis: AxisMode;
}

export type DetailMediaType =
  | "film"
  | "live-action"
  | "manga"
  | "novel"
  | "ona"
  | "ova"
  | "tv";

export type ReleaseSchedule =
  | "box-set"
  | "serial"
  | "simulcast"
  | "theatrical"
  | "weekly";

export interface DetailEpisode {
  n?: number | string;
  title?: { ja: string | null; en: string | null };
  ja: string;
  en?: string | null;
  note?: string;
  season?: number;
  cours?: number;
  u?: string | string[];
}

export interface DetailRelease {
  region: string;
  channel: string;
  label: string;
  start: string;
  end?: string;
  schedule: ReleaseSchedule;
  note?: string;
  u?: string | string[];
}

export interface EntryDetail {
  title: { ja: string; en: string };
  u: string | string[];
  type: DetailMediaType;
  source: string;
  author?: string;
  publisher?: string;
  magazine?: string;
  note?: string;
  episodes: DetailEpisode[];
  releases: DetailRelease[];
}
