import { useState, useCallback } from "react";
import type { CSSProperties } from "react";
import type {
  Entry,
  Universe,
  StackedEntry,
  StoryStackedEntry,
  Filters,
  AxisMode,
} from "../data/types";
import {
  matchesMediaFilter,
  MEDIA_ICONS,
  MARK_LABELS,
  tintColor,
} from "../data/helpers";
import { assignStacks } from "../data/stacking";
import {
  getStoryRange,
  getStorySegmentBounds,
  assignStacksByStory,
  formatStoryYear,
} from "../data/story";
import { YearAxis } from "./YearAxis";
import { RelationshipOverlay } from "./RelationshipOverlay";
import type { LaneLayout } from "./RelationshipOverlay";
import * as s from "../styles/timeline.css";
import {
  BOTH_CONNECTOR_H,
  END_YEAR,
  LABEL_MIN_HEIGHT,
  LANE_PAD,
  RELEASE_TRACK_WIDTH,
  ROW_GAP,
  ROW_H,
  START_YEAR,
  STORY_AXIS_H,
  STORY_AXIS_LABEL_GAP,
  STORY_TOP_GUTTER,
  TRACK_CONTENT_WIDTH,
  TRACK_PAD_LEFT,
  YEAR_WIDTH,
} from "./timelineGeometry";

type CustomStyle = CSSProperties & Record<`--${string}`, string>;

function customStyle(style: CustomStyle): CustomStyle {
  return style;
}

// ── Effective mode per lane ─────────────────────────────

function getEffectiveMode(
  globalMode: AxisMode,
  universeId: string,
): "release" | "story" | "both" {
  if (globalMode === "release") return "release";
  const range = getStoryRange(universeId);
  if (range === null) return "release";
  return globalMode;
}

// ── Entry rendering ─────────────────────────────────────

function markClass(lang: string): string {
  if (lang === "en") return s.markEn;
  if (lang === "ja") return s.markJa;
  if (lang === "na") return s.markNa;
  return s.markTba;
}

interface TimelineEntryProps {
  entry: StackedEntry | StoryStackedEntry;
  universe: Universe;
  filters: Filters;
  left: number;
  width: number;
  top: number;
  isStackedEntry?: boolean;
}

function TimelineEntry({
  entry: e,
  universe: u,
  filters,
  left,
  width,
  top,
}: TimelineEntryProps) {
  const okMedia = matchesMediaFilter(filters.media, e.m);
  const okAudio = filters.audio === "all" || filters.audio === e.a;
  const okText = filters.text === "all" || filters.text === e.s;
  const visible = okMedia && okAudio && okText;
  const isCompact = filters.density === "compact";
  const isTba = e.a === "tba";

  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback((evt: React.MouseEvent) => {
    setHovered(true);
    setPos({ x: evt.clientX, y: evt.clientY });
  }, []);

  const handleMouseMove = useCallback((evt: React.MouseEvent) => {
    setPos({ x: evt.clientX, y: evt.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const handleFocus = useCallback((evt: React.FocusEvent<HTMLElement>) => {
    setHovered(true);
    const rect = evt.currentTarget.getBoundingClientRect();
    setPos({ x: rect.right, y: rect.top });
  }, []);

  const handleBlur = useCallback(() => {
    setHovered(false);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className={[
          s.entry,
          isTba ? s.entryTba : "",
          isCompact ? s.entryCompact : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={customStyle({
          left,
          width,
          top,
          border: `1px solid ${u.color}`,
          background: "rgba(0,0,0,0.4)",
          "--entry-tint": tintColor(u.color, 0.16),
        })}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="button"
        onKeyDown={(evt) => {
          if (evt.key === "Enter" || evt.key === " ") {
            const rect = evt.currentTarget.getBoundingClientRect();
            setHovered(true);
            setPos({ x: rect.right, y: rect.top });
          }
        }}
      >
        <span className={s.entryIcon} style={{ color: u.color }}>
          {MEDIA_ICONS[e.m]}
        </span>
        <span className={isCompact ? s.entryTitleHidden : s.entryTitle}>
          {e.t}
        </span>
        <span className={isCompact ? s.entryMarksHidden : s.entryMarks}>
          <span className={`${s.entryMark} ${markClass(e.a)}`}>
            {MARK_LABELS[e.a]}
          </span>
          <span className={`${s.entryMark} ${markClass(e.s)}`}>
            {MARK_LABELS[e.s]}
          </span>
        </span>
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: u.color,
          }}
        />
      </div>
      {hovered && <Tooltip entry={e} universe={u} x={pos.x} y={pos.y} />}
    </>
  );
}

// ── Tooltip ─────────────────────────────────────────────

interface TooltipProps {
  entry: StackedEntry | StoryStackedEntry;
  universe: Universe;
  x: number;
  y: number;
}

function Tooltip({ entry: e, universe: u, x, y }: TooltipProps) {
  const ttW = 360;
  const ttH = 220;
  let left = x + 16;
  let top = y + 12;
  if (left + ttW > (typeof window !== "undefined" ? window.innerWidth : 1200))
    left = x - ttW - 16;
  if (top + ttH > (typeof window !== "undefined" ? window.innerHeight : 800))
    top = y - ttH - 12;
  left = Math.max(8, left);
  top = Math.max(8, top);

  const yearText =
    e.y1 === e.y2 ? String(e.y1) : `${String(e.y1)} – ${String(e.y2)}`;
  const audioLabel: Record<string, string> = {
    en: "English dub officially exists",
    ja: "Japanese audio only",
    na: "No audio (print)",
    tba: "Format & language TBA",
  };
  const textLabel: Record<string, string> = {
    en: "English subtitles or translation officially exist",
    ja: "Japanese text only, untranslated",
    tba: "Format & language TBA",
  };
  const mediaNames: Record<string, string> = {
    tv: "TV series",
    ova: "OVA",
    ona: "ONA",
    film: "Film",
    manga: "Manga",
    novel: "Novel",
    game: "Game",
    live: "Live action",
    tba: "Format TBA",
  };

  return (
    <div
      className={`${s.tooltip} ${s.tooltipVisible}`}
      style={customStyle({ left, top, "--tooltip-accent": u.color })}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 4,
          height: "100%",
          background: u.color,
        }}
      />
      <div className={s.ttTitle}>{e.t}</div>
      <div className={s.ttNote}>{e.n}</div>
      <div className={s.ttGrid}>
        <span className={s.ttKey}>Universe</span>
        <span className={s.ttVal}>
          {u.name} · {u.abbr}
        </span>
        <span className={s.ttKey}>In-univ.</span>
        <span className={s.ttVal}>{e.d}</span>
        <span className={s.ttKey}>Released</span>
        <span className={s.ttVal}>{yearText}</span>
        <span className={s.ttKey}>Media</span>
        <span className={s.ttVal}>{mediaNames[e.m]}</span>
        <span className={s.ttKey}>Audio</span>
        <span className={s.ttVal}>{audioLabel[e.a]}</span>
        <span className={s.ttKey}>Text</span>
        <span className={s.ttVal}>{textLabel[e.s]}</span>
      </div>
    </div>
  );
}

// ── Story axis (per-lane) ───────────────────────────────

interface StoryAxisProps {
  range: { min: number; max: number };
  bounds: { xStart: number; xEnd: number };
  universe: Universe;
  topOffset: number;
}

function StoryAxis({ range, bounds, universe, topOffset }: StoryAxisProps) {
  const span = range.max - range.min || 1;
  const segWidth = bounds.xEnd - bounds.xStart;
  const majorEvery = span <= 5 ? 1 : span <= 15 ? 5 : 10;

  const ticks: { key: string; x: number; cls: string }[] = [];
  const labelCandidates: {
    key: string;
    xCenter: number;
    text: string;
    cls: string;
    isRangeEnd: boolean;
  }[] = [];

  for (let y = range.min; y <= range.max; y++) {
    const isRangeEnd = y === range.min || y === range.max;
    const isMajor = y % majorEvery === 0 || isRangeEnd;
    const is5 = !isMajor && y % 5 === 0;
    const xCenter = bounds.xStart + ((y - range.min) / span) * segWidth;

    ticks.push({
      key: `tick-${universe.id}-${String(y)}`,
      x: xCenter - 0.5,
      cls: isMajor ? s.tickMajor : is5 ? s.tick5 : s.tick1,
    });

    if (isMajor || is5 || span <= 5) {
      labelCandidates.push({
        key: `label-${universe.id}-${String(y)}`,
        xCenter,
        text: formatStoryYear(y, universe),
        cls: isMajor ? s.tickMajor : s.tick5,
        isRangeEnd,
      });
    }
  }

  const labels: { key: string; x: number; text: string; cls: string }[] = [];
  let lastLabelCenter: number | undefined;
  for (const label of labelCandidates) {
    const labelX = label.xCenter - STORY_AXIS_LABEL_GAP / 2;
    if (lastLabelCenter === undefined) {
      labels.push({ ...label, x: labelX });
      lastLabelCenter = label.xCenter;
      continue;
    }
    if (label.xCenter - lastLabelCenter >= STORY_AXIS_LABEL_GAP) {
      labels.push({ ...label, x: labelX });
      lastLabelCenter = label.xCenter;
      continue;
    }
    if (label.isRangeEnd) {
      labels.pop();
      labels.push({ ...label, x: labelX });
      lastLabelCenter = label.xCenter;
    }
  }

  return (
    <div
      className={s.laneStoryAxis}
      style={{ top: topOffset, height: STORY_AXIS_H }}
    >
      {ticks.map((t) => (
        <div
          key={t.key}
          className={`${s.laneStoryAxisTick} ${t.cls}`}
          style={{ left: t.x }}
        />
      ))}
      {labels.map((l) => (
        <div
          key={l.key}
          className={`${s.laneStoryAxisYear} ${l.cls}`}
          style={{ left: l.x }}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
}

// ── Both-mode connectors (SVG) ──────────────────────────

interface BothConnectorsProps {
  stackedRelease: StackedEntry[];
  storyItems: StoryStackedEntry[];
  universe: Universe;
  trackH_R: number;
  trackContentWidth: number;
}

function BothConnectors({
  stackedRelease,
  storyItems,
  universe,
  trackH_R,
  trackContentWidth,
}: BothConnectorsProps) {
  const range = getStoryRange(universe.id);
  const bounds = getStorySegmentBounds(
    universe.id,
    trackContentWidth,
    TRACK_PAD_LEFT,
  );
  if (!range || !bounds) return null;

  const releasePos = new Map<Entry, { xMid: number; yBottom: number }>();
  for (const e of stackedRelease) {
    const left = TRACK_PAD_LEFT + (e.y1 - START_YEAR) * YEAR_WIDTH;
    const width = Math.max((e.y2 - e.y1 + 1) * YEAR_WIDTH, YEAR_WIDTH);
    const top = LANE_PAD + e.stack * (ROW_H + ROW_GAP);
    releasePos.set(e, { xMid: left + width / 2, yBottom: top + ROW_H });
  }

  const span = range.max - range.min || 1;
  const segWidth = bounds.xEnd - bounds.xStart;
  const storyTopOffset = LANE_PAD + trackH_R + BOTH_CONNECTOR_H;

  const storyPos = new Map<Entry, { xMid: number; yTop: number }>();
  for (const item of storyItems) {
    let xStart =
      bounds.xStart + ((item.storyStart - range.min) / span) * segWidth;
    const xEndNat =
      bounds.xStart + ((item.storyEnd - range.min) / span) * segWidth;
    let width = Math.max(xEndNat - xStart, YEAR_WIDTH);
    if (xStart + width > bounds.xEnd) {
      xStart = bounds.xEnd - width;
      if (xStart < bounds.xStart) {
        xStart = bounds.xStart;
        width = Math.min(width, segWidth);
      }
    }
    const top = storyTopOffset + item.storyStack * (ROW_H + ROW_GAP);
    storyPos.set(item, { xMid: xStart + width / 2, yTop: top });
  }

  const connectors: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (const item of storyItems) {
    const rp = releasePos.get(item);
    const sp = storyPos.get(item);
    if (rp && sp) {
      connectors.push({
        x1: rp.xMid,
        y1: rp.yBottom,
        x2: sp.xMid,
        y2: sp.yTop,
      });
    }
  }

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {connectors.map((c) => (
        <line
          key={`${String(c.x1)}-${String(c.y1)}-${String(c.x2)}-${String(c.y2)}`}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke={universe.color}
          strokeWidth={0.6}
          opacity={0.45}
        />
      ))}
    </svg>
  );
}

// ── Story entries (per-lane) ───────────────────────────

interface StoryEntriesProps {
  storyItems: StoryStackedEntry[];
  universe: Universe;
  filters: Filters;
  trackContentWidth: number;
  mode: AxisMode;
  trackH_R: number;
}

function StoryEntries({
  storyItems,
  universe,
  filters,
  trackContentWidth,
  mode,
  trackH_R,
}: StoryEntriesProps) {
  const range = getStoryRange(universe.id);
  const bounds = getStorySegmentBounds(
    universe.id,
    trackContentWidth,
    TRACK_PAD_LEFT,
  );
  if (!range || !bounds) return null;
  const span = range.max - range.min || 1;
  const segWidth = bounds.xEnd - bounds.xStart;
  const topOffset =
    mode === "both"
      ? LANE_PAD + trackH_R + BOTH_CONNECTOR_H
      : LANE_PAD + STORY_TOP_GUTTER;

  return (
    <>
      {storyItems.map((item) => {
        let xStart =
          bounds.xStart + ((item.storyStart - range.min) / span) * segWidth;
        const xEndNat =
          bounds.xStart + ((item.storyEnd - range.min) / span) * segWidth;
        let width = Math.max(xEndNat - xStart, YEAR_WIDTH);
        if (xStart + width > bounds.xEnd) {
          xStart = bounds.xEnd - width;
          if (xStart < bounds.xStart) {
            xStart = bounds.xStart;
            width = Math.min(width, segWidth);
          }
        }
        const top = topOffset + item.storyStack * (ROW_H + ROW_GAP);
        return (
          <TimelineEntry
            key={`s-${universe.id}-${String(item.storyStart)}-${item.t}`}
            entry={item}
            universe={universe}
            filters={filters}
            left={xStart}
            width={width}
            top={top}
          />
        );
      })}
      <StoryAxis
        range={range}
        bounds={bounds}
        universe={universe}
        topOffset={
          topOffset +
          (Math.max(...storyItems.map((i) => i.storyStack)) + 1) *
            (ROW_H + ROW_GAP) -
          ROW_GAP +
          2
        }
      />
    </>
  );
}

// ── Main component ──────────────────────────────────────

interface TimelineLanesProps {
  universes: Universe[];
  entries: Entry[];
  filters: Filters;
}

export function TimelineLanes({
  universes,
  entries,
  filters,
}: TimelineLanesProps) {
  const globalMode = filters.axis;
  const showReleaseAxis = globalMode !== "story";
  const trackContentWidth = TRACK_CONTENT_WIDTH;

  let laneIdx = 0;

  const lanes = universes
    .map((u) => {
      const uniEntries = entries.filter((e) => e.u === u.id);
      if (uniEntries.length === 0) return null;

      const mode = getEffectiveMode(globalMode, u.id);
      const stackedRelease = assignStacks(uniEntries);
      const maxStackR = Math.max(...stackedRelease.map((e) => e.stack));
      const trackH_R = (maxStackR + 1) * (ROW_H + ROW_GAP) - ROW_GAP;

      let storyItems: StoryStackedEntry[] = [];
      let trackH_S = 0;
      if (mode === "story" || mode === "both") {
        storyItems = assignStacksByStory(uniEntries);
        if (storyItems.length > 0) {
          const maxStackS = Math.max(...storyItems.map((i) => i.storyStack));
          trackH_S = (maxStackS + 1) * (ROW_H + ROW_GAP) - ROW_GAP;
        }
      }

      const isFallback = mode === "release" && globalMode !== "release";
      let laneHeight: number;
      if (mode === "both") {
        laneHeight = Math.max(
          LABEL_MIN_HEIGHT,
          trackH_R + trackH_S + BOTH_CONNECTOR_H + STORY_AXIS_H + 2 * LANE_PAD,
        );
      } else if (mode === "story") {
        laneHeight = Math.max(
          LABEL_MIN_HEIGHT,
          trackH_S + STORY_AXIS_H + STORY_TOP_GUTTER + 2 * LANE_PAD,
        );
      } else if (isFallback) {
        laneHeight = Math.max(
          LABEL_MIN_HEIGHT,
          trackH_R + STORY_AXIS_H + 2 * LANE_PAD,
        );
      } else {
        laneHeight = Math.max(LABEL_MIN_HEIGHT, trackH_R + 2 * LANE_PAD);
      }

      // Check visibility under current filters
      const hasVisible = stackedRelease.some((e) => {
        const okMedia = matchesMediaFilter(filters.media, e.m);
        const okAudio = filters.audio === "all" || filters.audio === e.a;
        const okText = filters.text === "all" || filters.text === e.s;
        return okMedia && okAudio && okText;
      });

      const isAlt = laneIdx % 2 === 1;
      laneIdx++;

      const storyTopOffset =
        mode === "both"
          ? LANE_PAD + trackH_R + BOTH_CONNECTOR_H
          : LANE_PAD + STORY_TOP_GUTTER;

      return {
        universe: u,
        stackedRelease,
        storyItems,
        trackH_R,
        trackH_S,
        storyTopOffset,
        laneHeight,
        isAlt,
        hasVisible,
        mode,
        isFallback,
      };
    })
    .filter((lane): lane is NonNullable<typeof lane> => lane !== null);

  const laneLayouts = new Map<string, LaneLayout>();
  let nextLaneTop = 0;
  for (const lane of lanes) {
    if (!lane.hasVisible) continue;
    laneLayouts.set(lane.universe.id, {
      top: nextLaneTop,
      height: lane.laneHeight,
      trackHS: lane.trackH_S,
      storyTopOffset: lane.storyTopOffset,
    });
    nextLaneTop += lane.laneHeight;
  }

  return (
    <>
      <div className={s.labelsCol}>
        <div
          className={`${s.axisRow} ${s.labelsAxis}`}
          style={{ display: showReleaseAxis ? undefined : "none" }}
        >
          Release year
        </div>
        {lanes.map(({ universe: u, laneHeight, isAlt, hasVisible }) => (
          <div
            key={u.id}
            className={[
              s.laneLabelRow,
              isAlt ? s.laneLabelRowAlt : "",
              !hasVisible ? s.laneLabelRowHidden : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ height: laneHeight }}
            title={`${u.name} — ${u.desc}`}
          >
            <span className={s.laneBar} style={{ background: u.color }} />
            <span className={s.laneAbbr} style={{ color: u.color }}>
              {u.abbr}
            </span>
            <span className={s.laneName}>{u.name}</span>
            <span className={s.laneCount}>
              {entries.filter((e) => e.u === u.id).length} entries · {u.desc}
            </span>
          </div>
        ))}
      </div>
      <div className={s.tracksCol}>
        <div className={s.tracksInner}>
          <div style={{ display: showReleaseAxis ? undefined : "none" }}>
            <YearAxis />
          </div>
          <div style={{ position: "relative" }}>
            {lanes.map(
              ({
                universe: u,
                stackedRelease,
                storyItems,
                trackH_R,
                laneHeight,
                isAlt,
                hasVisible,
                mode,
                isFallback,
              }) => (
                <div
                  key={u.id}
                  className={[
                    s.laneTrackRow,
                    isAlt ? s.laneTrackRowAlt : "",
                    !hasVisible ? s.laneTrackRowHidden : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={customStyle({
                    height: laneHeight,
                    "--lane-color": u.color,
                  })}
                >
                  {/* Release entries */}
                  {(mode === "release" || mode === "both") &&
                    stackedRelease.map((e) => {
                      const left =
                        TRACK_PAD_LEFT + (e.y1 - START_YEAR) * YEAR_WIDTH;
                      const width = Math.max(
                        (e.y2 - e.y1 + 1) * YEAR_WIDTH,
                        YEAR_WIDTH,
                      );
                      const top = LANE_PAD + e.stack * (ROW_H + ROW_GAP);
                      return (
                        <TimelineEntry
                          key={`r-${u.id}-${String(e.y1)}-${e.t}`}
                          entry={e}
                          universe={u}
                          filters={filters}
                          left={left}
                          width={width}
                          top={top}
                        />
                      );
                    })}

                  {/* Story entries */}
                  {(mode === "story" || mode === "both") &&
                    storyItems.length > 0 && (
                      <StoryEntries
                        storyItems={storyItems}
                        universe={u}
                        filters={filters}
                        trackContentWidth={trackContentWidth}
                        mode={mode}
                        trackH_R={trackH_R}
                      />
                    )}

                  {/* Release-mode fallback axis */}
                  {isFallback && (
                    <StoryAxis
                      range={{ min: START_YEAR, max: END_YEAR }}
                      bounds={{
                        xStart: TRACK_PAD_LEFT,
                        xEnd: TRACK_PAD_LEFT + RELEASE_TRACK_WIDTH,
                      }}
                      universe={u}
                      topOffset={LANE_PAD + trackH_R + 2}
                    />
                  )}

                  {/* Both-mode connectors */}
                  {mode === "both" && storyItems.length > 0 && (
                    <BothConnectors
                      stackedRelease={stackedRelease}
                      storyItems={storyItems}
                      universe={u}
                      trackH_R={trackH_R}
                      trackContentWidth={trackContentWidth}
                    />
                  )}
                </div>
              ),
            )}

            {/* Relationship overlay (story-only mode) */}
            {globalMode === "story" && (
              <RelationshipOverlay
                universes={universes}
                trackContentWidth={trackContentWidth}
                offset={TRACK_PAD_LEFT}
                globalMode={globalMode}
                laneLayouts={laneLayouts}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
