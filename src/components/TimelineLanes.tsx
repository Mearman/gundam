import { useState, useCallback, useRef, useEffect } from "react";
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
import * as s from "../styles/timeline.css";

const START_YEAR = 1979;
const YEAR_WIDTH = 28;
const ROW_H = 30;
const ROW_GAP = 4;
const LANE_PAD = 10;
const LABEL_MIN_HEIGHT = 84;
const STORY_AXIS_H = 28;
const BOTH_CONNECTOR_H = 36;

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

  const ticks: { x: number; height: number; cls: string }[] = [];
  const labels: { x: number; text: string; cls: string }[] = [];

  for (let y = range.min; y <= range.max; y++) {
    const isEnd = y === range.min || y === range.max;
    const isMajor = y % majorEvery === 0 || isEnd;
    const is5 = !isMajor && y % 5 === 0;
    const xCenter = bounds.xStart + ((y - range.min) / span) * segWidth;

    ticks.push({
      x: xCenter - 0.5,
      height: isMajor ? 12 : is5 ? 8 : 4,
      cls: isMajor ? s.tickMajor : is5 ? s.tick5 : s.tick1,
    });

    if (isMajor || is5 || span <= 5) {
      labels.push({
        x: xCenter - 20,
        text: formatStoryYear(y, universe),
        cls: isMajor ? s.tickMajor : s.tick5,
      });
    }
  }

  return (
    <div
      className={s.laneStoryAxis}
      style={{ top: topOffset, height: STORY_AXIS_H }}
    >
      {ticks.map((t, i) => (
        <div
          key={`t-${String(i)}`}
          className={`${s.laneStoryAxisTick} ${t.cls}`}
          style={{ left: t.x }}
        />
      ))}
      {labels.map((l, i) => (
        <div
          key={`l-${String(i)}`}
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
  const bounds = getStorySegmentBounds(universe.id, trackContentWidth, 0);
  if (!range || !bounds) return null;

  const releasePos = new Map<Entry, { xMid: number; yBottom: number }>();
  for (const e of stackedRelease) {
    const left = (e.y1 - START_YEAR) * YEAR_WIDTH;
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
      {connectors.map((c, i) => (
        <line
          key={String(i)}
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
  mode: "release" | "story" | "both";
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
  const bounds = getStorySegmentBounds(universe.id, trackContentWidth, 0);
  if (!range || !bounds) return null;
  const span = range.max - range.min || 1;
  const segWidth = bounds.xEnd - bounds.xStart;
  const topOffset =
    mode === "both" ? LANE_PAD + trackH_R + BOTH_CONNECTOR_H : LANE_PAD;

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
  const trackContentWidth = (2026 - START_YEAR + 1) * YEAR_WIDTH;
  const laneRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [overlayReady, setOverlayReady] = useState(false);

  useEffect(() => {
    setOverlayReady(true);
  }, [globalMode, filters]);

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
          trackH_S + STORY_AXIS_H + 2 * LANE_PAD,
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

      return {
        universe: u,
        stackedRelease,
        storyItems,
        trackH_R,
        trackH_S,
        laneHeight,
        isAlt,
        hasVisible,
        mode,
        isFallback,
      };
    })
    .filter((lane): lane is NonNullable<typeof lane> => lane !== null);

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
                trackH_S,
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
                  ref={(el) => {
                    if (el) {
                      el.dataset.trackHr = String(trackH_R);
                      el.dataset.trackHs = String(trackH_S);
                      el.dataset.mode = mode;
                      laneRefs.current.set(u.id, el);
                    }
                  }}
                >
                  {/* Release entries */}
                  {(mode === "release" || mode === "both") &&
                    stackedRelease.map((e) => {
                      const left = (e.y1 - START_YEAR) * YEAR_WIDTH;
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
                      range={{ min: START_YEAR, max: 2026 }}
                      bounds={{
                        xStart: 0,
                        xEnd: trackContentWidth,
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
            {overlayReady && globalMode === "story" && (
              <RelationshipOverlay
                universes={universes}
                trackContentWidth={trackContentWidth}
                offset={0}
                globalMode={globalMode}
                laneRefs={laneRefs.current}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
