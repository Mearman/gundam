import type { Entry } from "./types";
import { UNIVERSES } from "./universes";
import { ucEntries } from "./universes/uc";
import { ceEntries } from "./universes/ce";
import { buildEntries } from "./universes/build";
import { sdEntries } from "./universes/sd";
import { acEntries } from "./universes/ac";
import { adEntries } from "./universes/ad";
import { otherEntries } from "./universes/other";

export { UNIVERSES };

export const ENTRIES: Entry[] = [
  ...ucEntries,
  ...ceEntries,
  ...buildEntries,
  ...sdEntries,
  ...acEntries,
  ...adEntries,
  ...otherEntries,
];
