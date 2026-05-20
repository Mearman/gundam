import type {
  AxisMode,
  StackedEntry,
  StoryStackedEntry,
  Universe,
} from "../data/types";
import {
  LANE_PAD,
  ROW_GAP,
  ROW_H,
  START_YEAR,
  TRACK_PAD_LEFT,
} from "./timelineGeometry";
import {
  getStoryRange,
  getStorySegmentBounds,
  STORY_SEGMENTS,
} from "../data/story";
import { ENTRY_RELATIONS, type RelationType } from "../data/relations";
// Entry details used for tooltip title lookup — overlay only uses positions
// import { getEntryDetail } from "../data/details";

export interface LaneLayout {
  top: number;
  height: number;
  trackHS: number;
  storyTopOffset: number;
}

export interface LaneEntries {
  stackedRelease: StackedEntry[];
  storyItems: StoryStackedEntry[];
}

interface RelationshipOverlayProps {
  universes: Universe[];
  trackContentWidth: number;
  yearWidth: number;
  offset: number;
  globalMode: AxisMode;
  laneLayouts: Map<string, LaneLayout>;
  laneEntries: Map<string, LaneEntries>;
}

interface RelLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  dashed: boolean;
}

interface RelLabel {
  x: number;
  y: number;
  fill: string;
  text: string;
  anchor: "start" | "end" | "middle" | "inherit";
  weight: "normal" | "700";
}

const RELATION_STYLES: Record<
  RelationType,
  { stroke: string; dashed: boolean }
> = {
  sequel_to: { stroke: "#4A9EFF", dashed: false },
  prequel_to: { stroke: "#4A9EFF", dashed: false },
  side_story_of: { stroke: "#FFB84A", dashed: false },
  adapted_from: { stroke: "#B84AFF", dashed: false },
  compilation_of: { stroke: "#7DBE3F", dashed: true },
  spinoff_from: { stroke: "#FF6B8A", dashed: false },
  alternate_version: { stroke: "#A78BFA", dashed: true },
  reedit_of: { stroke: "#5FD3B5", dashed: true },
  reboot_of: { stroke: "#FF4A4A", dashed: false },
};

/**
 * Compute the centre position of an entry on the release axis.
 * Returns coordinates in content space (relative to the scroll container).
 */
function releaseEntryPos(
  entry: StackedEntry,
  yearWidth: number,
  laneTop: number,
): { x: number; y: number } {
  const left = TRACK_PAD_LEFT + (entry.y1 - START_YEAR) * yearWidth;
  const width = Math.max((entry.y2 - entry.y1 + 1) * yearWidth, yearWidth);
  return {
    x: left + width / 2,
    y: laneTop + LANE_PAD + entry.stack * (ROW_H + ROW_GAP) + ROW_H / 2,
  };
}

/**
 * Compute the centre position of an entry on the story axis.
 */
function storyEntryPos(
  entry: StoryStackedEntry,
  universeId: string,
  trackContentWidth: number,
  offset: number,
  yearWidth: number,
  laneTop: number,
  storyTopOffset: number,
): { x: number; y: number } | null {
  const range = getStoryRange(universeId);
  const bounds = getStorySegmentBounds(universeId, trackContentWidth, offset);
  if (!range || !bounds) return null;

  const span = range.max - range.min || 1;
  const segWidth = bounds.xEnd - bounds.xStart;
  let xStart =
    bounds.xStart + ((entry.storyStart - range.min) / span) * segWidth;
  const xEndNat =
    bounds.xStart + ((entry.storyEnd - range.min) / span) * segWidth;
  let width = Math.max(xEndNat - xStart, yearWidth);
  if (xStart + width > bounds.xEnd) {
    xStart = bounds.xEnd - width;
    if (xStart < bounds.xStart) {
      xStart = bounds.xStart;
      width = Math.min(width, segWidth);
    }
  }
  const top = laneTop + storyTopOffset + entry.storyStack * (ROW_H + ROW_GAP);
  return { x: xStart + width / 2, y: top + ROW_H / 2 };
}

/**
 * Build a map from detailId to content-space position for all visible entries.
 */
function buildPositionMap(
  laneLayouts: Map<string, LaneLayout>,
  laneEntries: Map<string, LaneEntries>,
  trackContentWidth: number,
  yearWidth: number,
  offset: number,
  globalMode: AxisMode,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();

  for (const [uid, layout] of laneLayouts) {
    const entries = laneEntries.get(uid);
    if (!entries) continue;

    if (globalMode !== "story") {
      for (const e of entries.stackedRelease) {
        if (e.detailId === undefined) continue;
        positions.set(e.detailId, releaseEntryPos(e, yearWidth, layout.top));
      }
    }

    if (globalMode !== "release") {
      for (const e of entries.storyItems) {
        if (e.detailId === undefined) continue;
        const pos = storyEntryPos(
          e,
          uid,
          trackContentWidth,
          offset,
          yearWidth,
          layout.top,
          layout.storyTopOffset,
        );
        if (pos) positions.set(e.detailId, pos);
      }
    }
  }

  return positions;
}

export function RelationshipOverlay({
  universes,
  trackContentWidth,
  yearWidth,
  offset,
  globalMode,
  laneLayouts,
  laneEntries,
}: RelationshipOverlayProps) {
  let overlayHeight = 0;
  for (const [, layout] of laneLayouts) {
    const bottom = layout.top + layout.height;
    if (bottom > overlayHeight) overlayHeight = bottom;
  }

  const lines: RelLine[] = [];
  const labels: RelLabel[] = [];

  // ── Data-driven relation lines ──────────────────────────
  const positions = buildPositionMap(
    laneLayouts,
    laneEntries,
    trackContentWidth,
    yearWidth,
    offset,
    globalMode,
  );

  for (const rel of ENTRY_RELATIONS) {
    const fromPos = positions.get(rel.from);
    const toPos = positions.get(rel.to);
    if (!fromPos || !toPos) continue;

    const style = RELATION_STYLES[rel.type];
    lines.push({
      x1: fromPos.x,
      y1: fromPos.y,
      x2: toPos.x,
      y2: toPos.y,
      stroke: style.stroke,
      strokeWidth: 1,
      opacity: 0.5,
      dashed: style.dashed,
    });
  }

  // ── Static story-mode overlays ──────────────────────────
  const showStoryOverlays = globalMode === "story";
  const usableWidth = trackContentWidth - offset;

  function storyBand(uid: string): { top: number; bottom: number } | null {
    const layout = laneLayouts.get(uid);
    if (!layout) return null;
    return {
      top: layout.top + layout.storyTopOffset,
      bottom: layout.top + layout.storyTopOffset + layout.trackHS,
    };
  }

  function xForInUniverse(uid: string, year: number): number | null {
    const range = getStoryRange(uid);
    const bounds = getStorySegmentBounds(uid, trackContentWidth, offset);
    if (!range || !bounds) return null;
    const span = range.max - range.min || 1;
    const segWidth = bounds.xEnd - bounds.xStart;
    return bounds.xStart + ((year - range.min) / span) * segWidth;
  }

  if (showStoryOverlays) {
    const ucBand = storyBand("uc");
    const altBand = storyBand("uc-alt");
    const ccBand = storyBand("cc");
    const rcBand = storyBand("rc");

    // UC ↔ alt-UC fork at U.C. 0079
    if (ucBand && altBand) {
      const xUC = xForInUniverse("uc", 79);
      const xAlt = xForInUniverse("uc-alt", 79);
      if (xUC !== null && xAlt !== null) {
        lines.push({
          x1: xUC,
          y1: ucBand.bottom,
          x2: xAlt,
          y2: altBand.top,
          stroke: "#A78BFA",
          strokeWidth: 1.5,
          opacity: 0.9,
          dashed: false,
        });
        labels.push({
          x: (xUC + xAlt) / 2 + 6,
          y: (ucBand.bottom + altBand.top) / 2 + 3,
          fill: "#A78BFA",
          text: "fork · U.C. 0079",
          anchor: "start",
          weight: "normal",
        });
      }
    }

    // Black History boundary
    const xBH = offset + STORY_SEGMENTS.cc.startFrac * usableWidth;
    let yTop = Infinity;
    let yBot = -Infinity;
    for (const u of universes) {
      const band = storyBand(u.id);
      if (!band) continue;
      yTop = Math.min(yTop, band.top);
      yBot = Math.max(yBot, band.bottom);
    }
    if (yTop !== Infinity && ccBand) {
      lines.push({
        x1: xBH,
        y1: yTop,
        x2: xBH,
        y2: yBot,
        stroke: "#5FD3B5",
        strokeWidth: 2,
        opacity: 0.85,
        dashed: true,
      });
      labels.push({
        x: xBH - 4,
        y: yTop - 4,
        fill: "#5FD3B5",
        text: "↓ Black History",
        anchor: "end",
        weight: "700",
      });
    }

    // CC → RC continuation
    const xCCend = offset + STORY_SEGMENTS.cc.endFrac * usableWidth;
    if (ccBand && rcBand) {
      lines.push({
        x1: xCCend,
        y1: ccBand.bottom,
        x2: xCCend,
        y2: rcBand.top,
        stroke: "#7DBE3F",
        strokeWidth: 1.5,
        opacity: 1,
        dashed: false,
      });
      labels.push({
        x: xCCend + 6,
        y: (ccBand.bottom + rcBand.top) / 2,
        fill: "#7DBE3F",
        text: "continues as RC",
        anchor: "start",
        weight: "700",
      });
    }
  }

  // ── Segment dividers and headers (story mode only) ──────
  const dividers = showStoryOverlays
    ? [STORY_SEGMENTS.cc.startFrac, STORY_SEGMENTS.rc.startFrac]
    : [];

  const segmentHeaders = showStoryOverlays
    ? [
        { ...STORY_SEGMENTS.preBH, color: "#8B8B8B" },
        { ...STORY_SEGMENTS.cc, color: "#5FD3B5" },
        { ...STORY_SEGMENTS.rc, color: "#7DBE3F" },
      ]
    : [];

  // ── CC→RC arrowhead (story mode) ──────────────────────
  const ccArrow = showStoryOverlays
    ? (() => {
        const ccB = storyBand("cc");
        const rcB = storyBand("rc");
        if (!ccB || !rcB) return null;
        const xCCend = offset + STORY_SEGMENTS.cc.endFrac * usableWidth;
        return { x: xCCend, y: rcB.top };
      })()
    : null;

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: overlayHeight,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* Segment dividers */}
      {dividers.map((frac) => {
        const x = offset + frac * usableWidth;
        return (
          <line
            key={String(frac)}
            x1={x}
            y1={0}
            x2={x}
            y2={overlayHeight}
            stroke="#444"
            strokeWidth={1}
            strokeDasharray="2 4"
            opacity={0.5}
          />
        );
      })}

      {/* Segment headers */}
      {segmentHeaders.map((seg) => {
        const xMid = offset + ((seg.startFrac + seg.endFrac) / 2) * usableWidth;
        return (
          <text
            key={seg.label}
            x={xMid}
            y={10}
            fill={seg.color}
            fontSize={9}
            fontFamily="JetBrains Mono, monospace"
            textAnchor="middle"
            fontWeight={700}
            opacity={0.85}
          >
            {seg.label.toUpperCase()}
          </text>
        );
      })}

      {/* Relation lines */}
      {lines.map((l, i) => (
        <line
          key={`l-${String(i)}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke={l.stroke}
          strokeWidth={l.strokeWidth}
          opacity={l.opacity}
          strokeDasharray={l.dashed ? "4 3" : undefined}
        />
      ))}

      {/* Relation labels */}
      {labels.map((l, i) => (
        <text
          key={`t-${String(i)}`}
          x={l.x}
          y={l.y}
          fill={l.fill}
          fontSize={9}
          fontFamily="JetBrains Mono, monospace"
          textAnchor={l.anchor}
          fontWeight={l.weight}
        >
          {l.text}
        </text>
      ))}

      {/* CC→RC arrowhead (story mode) */}
      {ccArrow !== null && (
        <polygon
          points={`${String(ccArrow.x - 4)},${String(ccArrow.y - 6)} ${String(ccArrow.x + 4)},${String(ccArrow.y - 6)} ${String(ccArrow.x)},${String(ccArrow.y)}`}
          fill="#7DBE3F"
        />
      )}
    </svg>
  );
}
