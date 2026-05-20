// Re-export detail types from types.ts
export type {
  DetailMediaType,
  ReleaseSchedule,
  DetailEpisode,
  DetailRelease,
  EntryDetail,
} from "./types";

import type { EntryDetail } from "./types";
import { ucDetails } from "./universes/uc";
import { ceDetails } from "./universes/ce";
import { buildDetails } from "./universes/build";
import { sdDetails } from "./universes/sd";
import { acDetails } from "./universes/ac";
import { adDetails } from "./universes/ad";
import { otherDetails } from "./universes/other";

export const ENTRY_DETAILS_COMMENT = `Gundam timeline per-episode/per-volume release data. Keys map to detailId in timeline.ts ENTRIES table. $rels: flat edge list of {from, type, to} relationship triples. Types: adapted_from, compilation_of, reedit_of, alternate_version, sequel_to, prequel_to, side_story_of, spinoff_from, reboot_of. Direction reads as 'from {type} to'. Dates are ISO 8601: ja = Japanese release, en = English/international. Full ISO (YYYY-MM-DD) = verified. Month-only (YYYY-MM) = partial. Year-only (YYYY) = serialization year only. Last reviewed: 2026-05-20. Stats: 186 entries, 1695 episodes, 174 relationships.`;

export const ENTRY_DETAILS: Record<string, EntryDetail | undefined> = {
  ...ucDetails,
  ...ceDetails,
  ...buildDetails,
  ...sdDetails,
  ...acDetails,
  ...adDetails,
  ...otherDetails,
} satisfies Record<string, EntryDetail | undefined>;

/** Look up detail data for a given entry by its detailId. */
export function getEntryDetail(detailId: string): EntryDetail | undefined {
  return ENTRY_DETAILS[detailId];
}
