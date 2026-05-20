import type { Entry, StackedEntry } from "../data/types";

/**
 * Assign stack rows to entries within a single universe lane.
 * Sorts by start year, then by duration (longer first for stable packing).
 * Each stack row can only hold one entry at a time — overlapping entries
 * get assigned to separate rows.
 */
export function assignStacks(entries: Entry[]): StackedEntry[] {
  const sorted = [...entries].sort(
    (a, b) =>
      a.yearStart - b.yearStart ||
      b.yearEnd - b.yearStart - (a.yearEnd - a.yearStart),
  );
  const stacks: number[] = []; // stacks[i] = max end year used in row i

  return sorted.map((e) => {
    let assigned = -1;
    for (let i = 0; i < stacks.length; i++) {
      if (stacks[i] < e.yearStart) {
        stacks[i] = e.yearEnd;
        assigned = i;
        break;
      }
    }
    if (assigned === -1) {
      stacks.push(e.yearEnd);
      assigned = stacks.length - 1;
    }
    return { ...e, stack: assigned };
  });
}
