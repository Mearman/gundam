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
  u: string;
  d: string;
  t: string;
  n: string;
  y1: number;
  y2: number;
  m: MediaKind;
  a: AudioLang;
  s: TextLang;
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
