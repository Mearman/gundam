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
  universe: string | string[];
  era: string;
  title: string;
  note?: string;
  y1: number;
  y2: number;
  media: MediaKind;
  audio: AudioLang;
  subs: TextLang;
}

/** Check whether an entry belongs to a given universe. */
export function entryInUniverse(entry: Entry, universeId: string): boolean {
  if (Array.isArray(entry.universe)) {
    return entry.universe.includes(universeId);
  }
  return entry.universe === universeId;
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

// DetailMediaType removed — media type is on Entry.media

export type ReleaseSchedule =
  | "box-set"
  | "serial"
  | "simulcast"
  | "theatrical"
  | "weekly";

export interface DetailEpisode {
  num?: number | string;
  title?: { ja: string | null; en: string | null };
  dateJa: string;
  dateEn?: string | null;
  note?: string;
  season?: number;
  course?: number;
  universe?: string | string[];
}

export interface DetailRelease {
  region: string;
  channel: string;
  label: string;
  start: string;
  end?: string;
  schedule: ReleaseSchedule;
  note?: string;
  universe?: string | string[];
}

export interface EntryDetail {
  title: { ja: string; en: string };
  source: string;
  author?: string;
  publisher?: string;
  magazine?: string;
  note?: string;
  episodes: DetailEpisode[];
  releases: DetailRelease[];
}

// ── Compact data factories ──────────────────────────────────
// Used in universe module files to keep data on as few lines
// as possible. Each factory produces the same runtime objects
// as the old verbose object literals.

/** Compact timeline entry constructor. */
export function entry(
  detailId: string,
  universe: string | string[],
  era: string,
  title: string,
  y1: number,
  y2: number,
  media: MediaKind,
  audio: AudioLang,
  subs: TextLang,
  note?: string,
): Entry {
  const out: Entry = {
    detailId,
    universe,
    era,
    title,
    y1,
    y2,
    media,
    audio,
    subs,
  };
  if (note !== undefined) out.note = note;
  return out;
}

/** Compact detail record constructor. Title and source are always required. */
export function det(
  jaTitle: string,
  enTitle: string,
  source: string,
  episodes: DetailEpisode[],
  releases: DetailRelease[],
  extra?: {
    author?: string;
    publisher?: string;
    magazine?: string;
    note?: string;
  },
): EntryDetail {
  const out: EntryDetail = {
    title: { ja: jaTitle, en: enTitle },
    source,
    episodes,
    releases,
  };
  if (extra !== undefined) {
    if (extra.author !== undefined) out.author = extra.author;
    if (extra.publisher !== undefined) out.publisher = extra.publisher;
    if (extra.magazine !== undefined) out.magazine = extra.magazine;
    if (extra.note !== undefined) out.note = extra.note;
  }
  return out;
}

/** Compact episode constructor. */
export function ep(
  num: number | string,
  jaTitle: string | null,
  enTitle: string | null,
  dateJa: string,
  extra?: {
    dateEn?: string;
    season?: number;
    course?: number;
    universe?: string | string[];
    note?: string;
  },
): DetailEpisode {
  const out: DetailEpisode = {
    num,
    title: { ja: jaTitle, en: enTitle },
    dateJa,
  };
  if (extra !== undefined) {
    if (extra.dateEn !== undefined) out.dateEn = extra.dateEn;
    if (extra.season !== undefined) out.season = extra.season;
    if (extra.course !== undefined) out.course = extra.course;
    if (extra.universe !== undefined) out.universe = extra.universe;
    if (extra.note !== undefined) out.note = extra.note;
  }
  return out;
}

/** Compact release constructor. `end` is optional trailing arg. */
export function rel(
  region: string,
  channel: string,
  label: string,
  start: string,
  schedule: ReleaseSchedule,
  end?: string,
): DetailRelease {
  const out: DetailRelease = { region, channel, label, start, schedule };
  if (end !== undefined) out.end = end;
  return out;
}

/** Alias for ep() with only episode number and dates (no titles). */
export function epPlain(
  num: number | string,
  dateJa: string,
  extra?: {
    dateEn?: string;
    season?: number;
    course?: number;
    universe?: string | string[];
    note?: string;
  },
): DetailEpisode {
  return ep(num, null, null, dateJa, extra);
}
