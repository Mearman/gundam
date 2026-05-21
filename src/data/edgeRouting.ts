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

/** Gap sizes for each inter-row boundary. gap[i] = gap between row i and row i+1. */
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

function pts(segs: string[]): string {
  return segs.join(" ");
}

// ── Dynamic gap computation ────────────────────────────

function computeGapMap(
  edges: readonly EntryRelation[],
  bboxes: Map<string, EntryBBox>,
  maxStacks: Map<string, number>,
): GapMap {
  const counts = new Map<string, number>();

  for (const edge of edges) {
    const source = bboxes.get(edge.from);
    const target = bboxes.get(edge.to);
    if (source === undefined || target === undefined) continue;
    if (source.laneId !== target.laneId) continue;
    if (source.stack === target.stack) continue;

    const lowerStack = Math.max(source.stack, target.stack);
    const gapIdx = lowerStack - 1;
    const key = `${source.laneId}:${String(gapIdx)}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const gapMap: GapMap = new Map();
  for (const [laneId, maxStack] of maxStacks) {
    const gaps: number[] = [];
    for (let i = 0; i < maxStack; i++) {
      const key = `${laneId}:${String(i)}`;
      const count = counts.get(key) ?? 0;
      gaps.push(ROW_GAP + count * ROW_GAP_PER_EDGE);
    }
    gapMap.set(laneId, gaps);
  }

  return gapMap;
}

// ── Stack position helpers ─────────────────────────────

export function stackRowTop(
  stack: number,
  laneTop: number,
  gaps: number[],
): number {
  let y = laneTop + stack * ROW_H;
  for (let i = 0; i < stack; i++) {
    y += gaps[i];
  }
  return y;
}

function gapCentreAboveStack(
  stack: number,
  laneTop: number,
  gaps: number[],
): number {
  const gapIdx = stack - 1;
  if (gapIdx < 0) return laneTop - CLEARANCE;
  const prevRowBottom = stackRowTop(stack - 1, laneTop, gaps) + ROW_H;
  const curRowTop = stackRowTop(stack, laneTop, gaps);
  return (prevRowBottom + curRowTop) / 2;
}

// ── Path builders ──────────────────────────────────────

/**
 * Simple octilinear V→diag→H→diag→V path.
 * Used when the vertical segments don't cross any entries.
 */
function simpleOctiPath(
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
    return pts([
      `M ${String(sx)} ${String(sy)}`,
      `L ${String(sx)} ${String(channelY)}`,
      `L ${String(tx)} ${String(channelY)}`,
      `L ${String(tx)} ${String(ty)}`,
    ]);
  }

  const sb = channelY + (sy > channelY ? r : -r);
  const tb = channelY + (ty > channelY ? r : -r);

  return pts([
    `M ${String(sx)} ${String(sy)}`,
    `L ${String(sx)} ${String(sb)}`,
    `L ${String(sx + dir * r)} ${String(channelY)}`,
    `L ${String(tx - dir * r)} ${String(channelY)}`,
    `L ${String(tx)} ${String(tb)}`,
    `L ${String(tx)} ${String(ty)}`,
  ]);
}

/**
 * Clearance-aware escape path using a single globally clear column.
 *
 * Routes both endpoints to a clear vertical channel at x=0 (guaranteed
 * to be left of all entry rectangles), runs vertically to the channel,
 * then connects back to the other port.
 */
function escapePath(
  srcPortX: number,
  srcPortY: number,
  tgtPortX: number,
  tgtPortY: number,
  channelY: number,
): string {
  // Use a globally clear column: just left of the leftmost entry.
  // Since all entries start at TRACK_PAD_LEFT or later, x=0 is guaranteed clear.
  const clearX = 0;

  const segs: string[] = [`M ${String(srcPortX)} ${String(srcPortY)}`];

  // ── Source side: port → clear column → vertical toward channel ──
  appendEscapeHalf(segs, srcPortX, srcPortY, clearX, channelY);

  // ── Target side: channel → vertical to clear column → port ──
  // (no horizontal bus needed — both share the same clear column)
  appendEscapeHalfReverse(segs, tgtPortX, tgtPortY, clearX, channelY);

  return pts(segs);
}

/**
 * Append path segments from (portX, portY) to (clearX, channelY).
 *
 * Escape-first: goes H from portX to clearX at portY, THEN V from portY to channelY.
 * With octilinear bends where the H meets the V.
 */
/**
 * Append path segments from (portX, portY) to (clearX, channelY).
 * Shape: H to near clearX → 45° corner → V down clear column.
 * The 45° corner always has dx=dy=r.
 */
function appendEscapeHalf(
  segs: string[],
  portX: number,
  portYi: number,
  clearX: number,
  channelY: number,
): void {
  const adx = Math.abs(clearX - portX);
  const ady = Math.abs(channelY - portYi);

  if (adx < 1) {
    // No horizontal escape needed — pure vertical
    segs.push(`L ${String(portX)} ${String(channelY)}`);
    return;
  }

  const r = Math.min(BEND_R, adx, ady);

  if (r < 1) {
    // Too tight — H then V (still octilinear)
    segs.push(`L ${String(clearX)} ${String(portYi)}`);
    segs.push(`L ${String(clearX)} ${String(channelY)}`);
    return;
  }

  const dir = Math.sign(clearX - portX);
  const dySign = Math.sign(channelY - portYi);

  // H to (clearX - dir*r, portY), then 45° to (clearX, portY + dySign*r), then V
  segs.push(`L ${String(clearX - dir * r)} ${String(portYi)}`);
  segs.push(`L ${String(clearX)} ${String(portYi + dySign * r)}`);
  segs.push(`L ${String(clearX)} ${String(channelY)}`);
}

/**
 * Append reverse escape half: from (clearX, channelY) to (portX, portY).
 * Mirror of appendEscapeHalf: V from channelY to portY at clearX, then H to portX.
 * With octilinear bends.
 */
/**
 * Append reverse escape half: from (clearX, channelY) to (portX, portY).
 * Shape: V up clear column → 45° corner → H to port.
 */
function appendEscapeHalfReverse(
  segs: string[],
  portX: number,
  portYi: number,
  clearX: number,
  channelY: number,
): void {
  const adx = Math.abs(portX - clearX);
  const ady = Math.abs(portYi - channelY);

  if (adx < 1) {
    segs.push(`L ${String(portX)} ${String(portYi)}`);
    return;
  }

  const r = Math.min(BEND_R, adx, ady);

  if (r < 1) {
    segs.push(`L ${String(clearX)} ${String(portYi)}`);
    segs.push(`L ${String(portX)} ${String(portYi)}`);
    return;
  }

  const dir = Math.sign(portX - clearX);
  const dySign = Math.sign(portYi - channelY);

  // V to (clearX, portY - dySign*r), then 45° to (clearX + dir*r, portY), then H
  segs.push(`L ${String(clearX)} ${String(portYi - dySign * r)}`);
  segs.push(`L ${String(clearX + dir * r)} ${String(portYi)}`);
  segs.push(`L ${String(portX)} ${String(portYi)}`);
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
  needsEscape: boolean;
}

// ── Public API ─────────────────────────────────────────

export function computeDynamicGaps(
  edges: readonly EntryRelation[],
  bboxes: Map<string, EntryBBox>,
  maxStacks: Map<string, number>,
): GapMap {
  return computeGapMap(edges, bboxes, maxStacks);
}

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

  // ── Phase 1: Assign port sides, channels, escape needs ──
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

    // Escape routing needed when vertical segments would cross entries:
    // Escape routing needed when vertical segments would cross entries.
    // Only same-stack-row edges (gap routing) are safe without escape.
    const needsEscape =
      source.laneId !== target.laneId || source.stack !== target.stack;

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
      needsEscape,
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
  const resultPaths: RoutedPath[] = [];

  for (const group of channelGroups.values()) {
    const mid = (group.length - 1) / 2;
    const first = group[0];
    const gaps = gapMap.get(first.source.laneId) ?? [];
    const gapIdxMatch = /:(\d+)$/.exec(first.channelKey);
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

      const d = a.needsEscape
        ? escapePath(a.sourcePortX, sy, a.targetPortX, ty, adjustedY)
        : simpleOctiPath(a.sourcePortX, sy, a.targetPortX, ty, adjustedY);

      resultPaths.push({
        d,
        stroke: style.stroke,
        strokeWidth: 1,
        opacity: 0.5,
        dashed: style.dashed,
      });
    }
  }

  return resultPaths;
}
