import type { AxisMode, Universe } from "../data/types";
import { vars } from "../styles/global.css";
import {
  getStoryRange,
  getStorySegmentBounds,
  STORY_SEGMENTS,
} from "../data/story";

export interface LaneLayout {
  top: number;
  height: number;
  trackHS: number;
  storyTopOffset: number;
}

interface RelationshipOverlayProps {
  universes: Universe[];
  trackContentWidth: number;
  offset: number;
  globalMode: AxisMode;
  laneLayouts: Map<string, LaneLayout>;
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

export function RelationshipOverlay({
  universes,
  trackContentWidth,
  offset,
  globalMode,
  laneLayouts,
}: RelationshipOverlayProps) {
  if (globalMode !== "story") return null;

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

  const ucBand = storyBand("uc");
  const altBand = storyBand("uc-alt");
  const ccBand = storyBand("cc");
  const rcBand = storyBand("rc");

  let overlayHeight = 0;
  for (const [, layout] of laneLayouts) {
    const bottom = layout.top + layout.height;
    if (bottom > overlayHeight) overlayHeight = bottom;
  }

  const lines: RelLine[] = [];
  const labels: RelLabel[] = [];

  // ── UC ↔ alt-UC fork at U.C. 0079
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

  // ── Black History boundary
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

  // ── CC → RC continuation
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

  // ── Segment dividers
  const dividers = [STORY_SEGMENTS.cc.startFrac, STORY_SEGMENTS.rc.startFrac];

  // ── Segment headers
  const segmentHeaders = [
    { ...STORY_SEGMENTS.preBH, color: vars.text3 },
    { ...STORY_SEGMENTS.cc, color: "#5FD3B5" },
    { ...STORY_SEGMENTS.rc, color: "#7DBE3F" },
  ];

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
            stroke={vars.borderStrong}
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

      {/* Relationship lines */}
      {lines.map((l) => (
        <line
          key={`${String(l.x1)}-${String(l.y1)}-${String(l.x2)}-${String(l.y2)}`}
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

      {/* Relationship labels */}
      {labels.map((l) => (
        <text
          key={`${l.text}-${String(l.x)}-${String(l.y)}`}
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

      {/* CC→RC arrowhead */}
      {ccBand && rcBand && (
        <polygon
          points={`${String(xCCend - 4)},${String(rcBand.top - 6)} ${String(xCCend + 4)},${String(rcBand.top - 6)} ${String(xCCend)},${String(rcBand.top)}`}
          fill="#7DBE3F"
        />
      )}
    </svg>
  );
}
