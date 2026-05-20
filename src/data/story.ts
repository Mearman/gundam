import type { Entry, StoryStackedEntry, Universe } from "./types";
import { ENTRIES, UNIVERSES } from "./timeline";

// ── In-universe date parsing ────────────────────────────

interface ParsedDate {
  start: number;
  end: number;
}

export function parseInUniverseDate(d: string): ParsedDate | null {
  if (!d) return null;
  // Strip leading approximation markers (≈, ~, c./ca.)
  const s = d.trim().replace(/^(?:[≈~]|c\.?|ca\.?)\s*/i, "");
  // Strip universe prefix (e.g. "UC ", "AC ", "AG ")
  const match = /^[A-Z]+\s+(.+)$/.exec(s);
  if (!match) return null;
  const rest = match[1].trim();
  if (rest.includes("???")) return null;
  if (rest.includes("–")) {
    const parts = rest
      .split("–")
      .map((p) => parseInt(p.trim().replace("+", ""), 10));
    if (parts.some(isNaN)) return null;
    return { start: parts[0], end: parts[1] };
  }
  const v = parseInt(rest.replace("+", ""), 10);
  if (isNaN(v)) return null;
  return { start: v, end: v };
}

// ── Story segments ──────────────────────────────────────
// Horizontal position in story mode encodes franchise relationships.

export interface StorySegment {
  startFrac: number;
  endFrac: number;
  label: string;
}

export const STORY_SEGMENTS: Record<string, StorySegment> = {
  preBH: { startFrac: 0.0, endFrac: 0.6, label: "Pre-Black-History" },
  cc: { startFrac: 0.6, endFrac: 0.8, label: "Correct Century" },
  rc: { startFrac: 0.8, endFrac: 1.0, label: "Regild Century" },
};

export const UNIVERSE_STORY_SEGMENT: Record<string, string> = {
  uc: "preBH",
  "uc-alt": "preBH",
  fc: "preBH",
  ac: "preBH",
  aw: "preBH",
  ce: "preBH",
  ad: "preBH",
  ag: "preBH",
  pd: "preBH",
  as: "preBH",
  cc: "cc",
  rc: "rc",
  // build, sd: no segment (meta-fiction; fall back to release rendering)
};

// ── Shared calendars ────────────────────────────────────
// Lanes whose entries map to the same in-universe calendar share a date range.

const SHARED_STORY_CALENDARS: Record<string, string[]> = {
  uc: ["uc", "uc-alt"],
};

// ── Per-universe story range cache ──────────────────────

export interface StoryRange {
  min: number;
  max: number;
}

const UNIVERSE_IN_RANGE = new Map<string, StoryRange | null>();

function computeUniverseInRange(universeId: string): void {
  const entries = ENTRIES.filter((e) => e.u === universeId);
  let min = Infinity;
  let max = -Infinity;
  for (const e of entries) {
    const p = parseInUniverseDate(e.d);
    if (p === null) continue;
    if (p.start < min) min = p.start;
    if (p.end > max) max = p.end;
  }
  if (min === Infinity) {
    UNIVERSE_IN_RANGE.set(universeId, null);
  } else {
    if (min === max) {
      min -= 1;
      max += 1;
    }
    UNIVERSE_IN_RANGE.set(universeId, { min, max });
  }
}

function initRangeCache(): void {
  if (UNIVERSE_IN_RANGE.size > 0) return;
  for (const u of UNIVERSES) {
    computeUniverseInRange(u.id);
  }
}

export function getStoryRange(universeId: string): StoryRange | null {
  initRangeCache();
  // Check if this universe shares a calendar with others
  for (const members of Object.values(SHARED_STORY_CALENDARS)) {
    if (members.includes(universeId)) {
      let min = Infinity;
      let max = -Infinity;
      for (const m of members) {
        const r = UNIVERSE_IN_RANGE.get(m);
        if (r !== undefined && r !== null) {
          if (r.min < min) min = r.min;
          if (r.max > max) max = r.max;
        }
      }
      if (min !== Infinity) return { min, max };
    }
  }
  return UNIVERSE_IN_RANGE.get(universeId) ?? null;
}

// ── Story segment pixel bounds ──────────────────────────

export interface SegmentBounds {
  xStart: number;
  xEnd: number;
  seg: StorySegment;
}

export function getStorySegmentBounds(
  universeId: string,
  trackContentWidth: number,
  offset: number,
): SegmentBounds | null {
  if (!(universeId in UNIVERSE_STORY_SEGMENT)) return null;
  const segName = UNIVERSE_STORY_SEGMENT[universeId];
  if (!(segName in STORY_SEGMENTS)) return null;
  const seg = STORY_SEGMENTS[segName];
  const usableWidth = trackContentWidth - offset;
  return {
    xStart: offset + seg.startFrac * usableWidth,
    xEnd: offset + seg.endFrac * usableWidth,
    seg,
  };
}

// ── Story stacking algorithm ────────────────────────────

export function assignStacksByStory(entries: Entry[]): StoryStackedEntry[] {
  const items: {
    entry: Entry;
    start: number;
    end: number;
  }[] = [];

  for (const e of entries) {
    const p = parseInUniverseDate(e.d);
    if (p !== null) {
      items.push({ entry: e, start: p.start, end: p.end });
    }
  }

  // Sort by start, then by duration (longer first for stable packing)
  items.sort(
    (a, b) => a.start - b.start || b.end - b.start - (a.end - a.start),
  );

  const stacks: number[] = [];

  return items.map(({ entry: e, start, end }) => {
    let assigned = -1;
    for (let i = 0; i < stacks.length; i++) {
      if (stacks[i] < start) {
        stacks[i] = end;
        assigned = i;
        break;
      }
    }
    if (assigned === -1) {
      stacks.push(end);
      assigned = stacks.length - 1;
    }
    return { ...e, storyStack: assigned, storyStart: start, storyEnd: end };
  });
}

// ── Helpers ─────────────────────────────────────────────

export function formatStoryYear(year: number, universe: Universe): string {
  if (
    universe.id === "uc" ||
    universe.id === "uc-alt" ||
    universe.id === "aw"
  ) {
    return String(year).padStart(4, "0");
  }
  return String(year);
}
