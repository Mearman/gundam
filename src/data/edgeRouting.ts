import type { EntryRelation, RelationType } from "./relations";
import {
  ROW_GAP,
  ROW_GAP_PER_EDGE,
  ROW_H,
} from "../components/timelineGeometry";

// ── Types ──────────────────────────────────────────────

export interface EntryBBox {
  cx: number;
  cy: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  laneId: string;
  stack: number;
}

export interface RoutedPath {
  d: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  dashed: boolean;
}

export interface RelationStyle {
  stroke: string;
  dashed: boolean;
}

export interface LaneGeometry {
  top: number;
  height: number;
}

/** Gap sizes for each row boundary within a lane. Indexed by gap index (0 = above row 0). */
export type GapMap = Map<string, number[]>;

// ── Constants ──────────────────────────────────────────

const BEND_R = 8;
const BUNDLE_SPACING = 3;
const CLEARANCE = 2;
const MIN_PORT_SPACING = 8;

// ── Helpers ────────────────────────────────────────────

type Side = "top" | "bottom";

function portY(entry: EntryBBox, side: Side): number {
  return side === "top" ? entry.top : entry.bottom;
}

function spreadPortXs(count: number, entryCx: number): number[] {
  if (count === 0) return [];
  if (count === 1) return [entryCx];
  const span = MIN_PORT_SPACING * (count - 1);
  const startX = entryCx - span / 2;
  return Array.from({ length: count }, (_, i) => startX + i * MIN_PORT_SPACING);
}

// ── Dynamic gap computation ────────────────────────────

/**
 * Compute per-boundary gap sizes for each lane.
 *
 * Counts how many same-lane edges route through each row boundary,
 * then computes gap = ROW_GAP + count * ROW_GAP_PER_EDGE.
 * Gaps with zero edges get the minimum ROW_GAP.
 */
function computeGapMap(
  edges: readonly EntryRelation[],
  bboxes: Map<string, EntryBBox>,
  maxStacks: Map<string, number>,
): GapMap {
  // Count edges per (lane, lowerStack)
  const counts = new Map<string, number>();

  for (const edge of edges) {
    const source = bboxes.get(edge.from);
    const target = bboxes.get(edge.to);
    if (source === undefined || target === undefined) continue;
    if (source.laneId !== target.laneId) continue;

    const lowerStack = Math.max(source.stack, target.stack);
    const key = `${source.laneId}:${String(lowerStack)}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const gapMap: GapMap = new Map();

  for (const [laneId, maxStack] of maxStacks) {
    // We need gaps for boundaries 0..maxStack (inclusive)
    // boundary i is above row i
    const gaps: number[] = [];
    for (let i = 0; i <= maxStack; i++) {
      const key = `${laneId}:${String(i)}`;
      const count = counts.get(key) ?? 0;
      gaps.push(ROW_GAP + count * ROW_GAP_PER_EDGE);
    }
    gapMap.set(laneId, gaps);
  }

  return gapMap;
}

/**
 * Compute the Y position of a stack row using dynamic gaps.
 *
 * Row 0 top = laneTop + LANE_PAD + gap[0]
 * Row N top = row 0 top + sum(gap[0..N]) + N * ROW_H
 *
 * Actually: the gap ABOVE row i is gap[i]. So:
 *   row i top = laneTop + LANE_PAD + sum(gaps[0..i-1]) + i * ROW_H
 *   But gap[0] is above row 0 (the topmost gap).
 *
 * Convention: gap[i] sits above row i.
 *   row i top = laneTop + sum(gaps[0..i]) + i * ROW_H
 */
export function stackRowTop(
  stack: number,
  laneTop: number,
  gaps: number[],
): number {
  let y = laneTop;
  for (let i = 0; i <= stack; i++) {
    y += gaps[i];
  }
  y += stack * ROW_H;
  return y;
}

/**
 * Y-coordinate of the centre of the gap above a given stack row
 * using dynamic gaps.
 */
function gapCentreAboveStack(
  stack: number,
  laneTop: number,
  gaps: number[],
): number {
  // Top of this gap = laneTop + sum(gaps[0..stack-1]) + stack * ROW_H
  let gapTop = laneTop;
  for (let i = 0; i < stack; i++) {
    gapTop += gaps[i];
  }
  gapTop += stack * ROW_H;
  return gapTop + gaps[stack] / 2;
}

// ── Octilinear path builder ────────────────────────────

/**
 * Build an octilinear SVG path from (sx, sy) to (tx, ty) through a
 * horizontal routing channel at `channelY`.
 *
 * Shape: V → 45° → H → 45° → V.
 * When source and target are very close horizontally, degrades to
 * V → H → V (no diagonals) to avoid sub-pixel bends.
 */
function octilinearThroughChannel(
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  channelY: number,
): string {
  const dx = tx - sx;
  const adx = Math.abs(dx);
  const dir = Math.sign(dx) || 1;
  const sourceVert = Math.abs(sy - channelY);
  const targetVert = Math.abs(ty - channelY);
  const r = Math.min(BEND_R, adx / 2, sourceVert, targetVert);

  if (r < 1) {
    // Too tight for 45° bends — use pure V-H-V (still octilinear)
    return [
      `M ${String(sx)} ${String(sy)}`,
      `L ${String(sx)} ${String(channelY)}`,
      `L ${String(tx)} ${String(channelY)}`,
      `L ${String(tx)} ${String(ty)}`,
    ].join(" ");
  }

  const sb = channelY + (sy > channelY ? r : -r);
  const tb = channelY + (ty > channelY ? r : -r);

  return [
    `M ${String(sx)} ${String(sy)}`,
    `L ${String(sx)} ${String(sb)}`,
    `L ${String(sx + dir * r)} ${String(channelY)}`,
    `L ${String(tx - dir * r)} ${String(channelY)}`,
    `L ${String(tx)} ${String(tb)}`,
    `L ${String(tx)} ${String(ty)}`,
  ].join(" ");
}

// ── Port side assignment ───────────────────────────────

function assignPortSides(
  source: EntryBBox,
  target: EntryBBox,
): { sourceSide: Side; targetSide: Side } {
  if (source.laneId === target.laneId) {
    if (source.stack === target.stack) {
      return { sourceSide: "top", targetSide: "top" };
    }
    return source.stack < target.stack
      ? { sourceSide: "bottom", targetSide: "top" }
      : { sourceSide: "top", targetSide: "bottom" };
  }
  return source.cy < target.cy
    ? { sourceSide: "bottom", targetSide: "top" }
    : { sourceSide: "top", targetSide: "bottom" };
}

// ── Channel computation ────────────────────────────────

interface Channel {
  key: string;
  y: number;
}

function sameLaneChannel(
  source: EntryBBox,
  target: EntryBBox,
  laneTop: number,
  gaps: number[],
): Channel {
  const lowerStack = Math.max(source.stack, target.stack);
  const rawY = gapCentreAboveStack(lowerStack, laneTop, gaps);
  const y = Math.max(rawY, laneTop + CLEARANCE);
  return {
    key: `same:${source.laneId}:${String(lowerStack)}`,
    y,
  };
}

function crossLaneChannel(
  source: EntryBBox,
  target: EntryBBox,
  laneGeometries: Map<string, LaneGeometry>,
  laneOrder: readonly string[],
): Channel {
  const si = laneOrder.indexOf(source.laneId);
  const ti = laneOrder.indexOf(target.laneId);
  if (si === -1 || ti === -1) {
    return { key: "fallback", y: (source.cy + target.cy) / 2 };
  }

  const upperIdx = Math.min(si, ti);
  const lowerIdx = Math.max(si, ti);
  const upperLane = laneGeometries.get(laneOrder[upperIdx]);
  const lowerLane = laneGeometries.get(laneOrder[lowerIdx]);
  if (upperLane === undefined || lowerLane === undefined) {
    return { key: "fallback", y: (source.cy + target.cy) / 2 };
  }

  const upperBottom = upperLane.top + upperLane.height;
  return {
    key: `gutter:${String(upperIdx)}:${String(lowerIdx)}`,
    y: (upperBottom + lowerLane.top) / 2,
  };
}

// ── Assignment intermediate ────────────────────────────

interface Assignment {
  edge: EntryRelation;
  source: EntryBBox;
  target: EntryBBox;
  sourceId: string;
  targetId: string;
  sourceSide: Side;
  targetSide: Side;
  sourcePortX: number;
  targetPortX: number;
  channelKey: string;
  channelY: number;
}

// ── Public API ─────────────────────────────────────────

/**
 * Compute dynamic gap sizes for each lane based on edge routing needs.
 *
 * Returns a map from laneId to an array of gap sizes (one per row boundary).
 * Use `stackRowTop()` to compute entry positions with these dynamic gaps.
 *
 * @param edges All relationship edges
 * @param bboxes Bounding boxes of all visible entries
 * @param maxStacks Map of laneId to highest stack index in that lane
 */
export function computeDynamicGaps(
  edges: readonly EntryRelation[],
  bboxes: Map<string, EntryBBox>,
  maxStacks: Map<string, number>,
): GapMap {
  return computeGapMap(edges, bboxes, maxStacks);
}

/**
 * Route all relationship edges using octilinear segments with:
 *
 * - **Dynamic row gaps**: row boundaries expand based on how many edges
 *   route through them, ensuring clearance between bundled edges.
 * - **Port side selection**: edges exit from top/bottom based on
 *   relative position.
 * - **Port X spreading**: multiple connections to the same entry are
 *   spread along the entry edge.
 * - **Channel-based routing**: same-lane edges use inter-row gaps,
 *   cross-lane edges use gutters between lane boundaries.
 * - **Clearance-aware bundling**: edges in the same channel are sorted
 *   by horizontal midpoint and offset vertically.
 *
 * @param gapMap Dynamic gap sizes from `computeDynamicGaps()`
 */
export function routeEdges(
  edges: readonly EntryRelation[],
  bboxes: Map<string, EntryBBox>,
  laneGeometries: Map<string, LaneGeometry>,
  styles: Record<RelationType, RelationStyle>,
  gapMap: GapMap,
): RoutedPath[] {
  const validEdges = edges.filter(
    (e) => bboxes.has(e.from) && bboxes.has(e.to),
  );
  if (validEdges.length === 0) return [];

  const laneOrder = [...laneGeometries.keys()];

  // ── Phase 1: Assign port sides and channels ────────────
  const assignments: Assignment[] = [];

  for (const edge of validEdges) {
    const source = bboxes.get(edge.from);
    const target = bboxes.get(edge.to);
    if (source === undefined || target === undefined) continue;

    const { sourceSide, targetSide } = assignPortSides(source, target);

    let channel: Channel;
    if (source.laneId === target.laneId) {
      const laneTop = laneGeometries.get(source.laneId)?.top ?? 0;
      const gaps = gapMap.get(source.laneId) ?? [];
      channel = sameLaneChannel(source, target, laneTop, gaps);
    } else {
      channel = crossLaneChannel(source, target, laneGeometries, laneOrder);
    }

    assignments.push({
      edge,
      source,
      target,
      sourceId: edge.from,
      targetId: edge.to,
      sourceSide,
      targetSide,
      sourcePortX: source.cx,
      targetPortX: target.cx,
      channelKey: channel.key,
      channelY: channel.y,
    });
  }

  // ── Phase 2: Spread port X-positions ───────────────────
  const portGroups = new Map<
    string,
    { assignIdx: number; isSource: boolean; otherX: number }[]
  >();

  for (let i = 0; i < assignments.length; i++) {
    const a = assignments[i];

    let sg = portGroups.get(`${a.sourceId}:${a.sourceSide}`);
    if (sg === undefined) {
      sg = [];
      portGroups.set(`${a.sourceId}:${a.sourceSide}`, sg);
    }
    sg.push({ assignIdx: i, isSource: true, otherX: a.target.cx });

    let tg = portGroups.get(`${a.targetId}:${a.targetSide}`);
    if (tg === undefined) {
      tg = [];
      portGroups.set(`${a.targetId}:${a.targetSide}`, tg);
    }
    tg.push({ assignIdx: i, isSource: false, otherX: a.source.cx });
  }

  for (const group of portGroups.values()) {
    group.sort((a, b) => a.otherX - b.otherX);
    const first = assignments[group[0].assignIdx];
    const entry = group[0].isSource ? first.source : first.target;
    const xs = spreadPortXs(group.length, entry.cx);

    for (let j = 0; j < group.length; j++) {
      const g = group[j];
      if (g.isSource) {
        assignments[g.assignIdx].sourcePortX = xs[j];
      } else {
        assignments[g.assignIdx].targetPortX = xs[j];
      }
    }
  }

  // ── Phase 3: Group by channel, sort, bundle ────────────
  const channelGroups = new Map<string, Assignment[]>();
  for (const a of assignments) {
    let group = channelGroups.get(a.channelKey);
    if (group === undefined) {
      group = [];
      channelGroups.set(a.channelKey, group);
    }
    group.push(a);
  }

  for (const group of channelGroups.values()) {
    group.sort(
      (a, b) =>
        (a.sourcePortX + a.targetPortX) / 2 -
        (b.sourcePortX + b.targetPortX) / 2,
    );
  }

  // ── Phase 4: Generate paths ────────────────────────────
  const paths: RoutedPath[] = [];

  for (const group of channelGroups.values()) {
    const mid = (group.length - 1) / 2;
    // Use the dynamic gap for this channel's lane
    const first = group[0];
    const gaps = gapMap.get(first.source.laneId) ?? [];
    // Find the gap index from the channel key
    const gapIdxMatch = /:(\\d+)$/.exec(first.channelKey);
    const gapIdx = gapIdxMatch ? Number(gapIdxMatch[1]) : 0;
    const gapSize = gaps[gapIdx] ?? ROW_GAP;
    const maxOffset = gapSize / 2 - CLEARANCE;

    const neededSpan = BUNDLE_SPACING * (group.length - 1);
    const spacing =
      neededSpan > maxOffset * 2
        ? (maxOffset * 2) / Math.max(group.length - 1, 1)
        : BUNDLE_SPACING;

    for (let i = 0; i < group.length; i++) {
      const a = group[i];
      const style = styles[a.edge.type];
      const offset = (i - mid) * spacing;
      const adjustedY = a.channelY + offset;

      const sy = portY(a.source, a.sourceSide);
      const ty = portY(a.target, a.targetSide);

      paths.push({
        d: octilinearThroughChannel(
          a.sourcePortX,
          sy,
          a.targetPortX,
          ty,
          adjustedY,
        ),
        stroke: style.stroke,
        strokeWidth: 1,
        opacity: 0.5,
        dashed: style.dashed,
      });
    }
  }

  return paths;
}
