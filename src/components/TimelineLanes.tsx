import { useState, useCallback } from "react";
import type { CSSProperties } from "react";
import type { Entry, Universe, StackedEntry, Filters } from "../data/types";
import { matchesMediaFilter, MEDIA_ICONS, MARK_LABELS } from "../data/helpers";
import { assignStacks } from "../data/stacking";
import { YearAxis } from "./YearAxis";
import * as s from "../styles/timeline.css";

type CustomStyle = CSSProperties & Record<`--${string}`, string>;

function customStyle(style: CustomStyle): CustomStyle {
  return style;
}

const START_YEAR = 1979;
const YEAR_WIDTH = 28;
const ROW_H = 30;
const ROW_GAP = 4;
const LANE_PAD = 10;
const LABEL_MIN_HEIGHT = 72;

interface TimelineEntryProps {
  entry: StackedEntry;
  universe: Universe;
  filters: Filters;
}

function TimelineEntry({ entry: e, universe: u, filters }: TimelineEntryProps) {
  const okMedia = matchesMediaFilter(filters.media, e.m);
  const okAudio = filters.audio === "all" || filters.audio === e.a;
  const okText = filters.text === "all" || filters.text === e.s;
  const visible = okMedia && okAudio && okText;
  const isCompact = filters.density === "compact";
  const isTba = e.a === "tba";

  const left = (e.y1 - START_YEAR) * YEAR_WIDTH;
  const widthYears = e.y2 - e.y1 + 1;
  const width = Math.max(widthYears * YEAR_WIDTH, YEAR_WIDTH);
  const top = LANE_PAD + e.stack * (ROW_H + ROW_GAP);

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
    setPos({
      x: evt.target.getBoundingClientRect().right,
      y: evt.target.getBoundingClientRect().top,
    });
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
          "--entry-tint": `rgba(${String(parseInt(u.color.slice(1, 3), 16))},${String(parseInt(u.color.slice(3, 5), 16))},${String(parseInt(u.color.slice(5, 7), 16))},0.16)`,
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

function markClass(lang: string): string {
  if (lang === "en") return s.markEn;
  if (lang === "ja") return s.markJa;
  if (lang === "na") return s.markNa;
  return s.markTba;
}

interface TooltipProps {
  entry: StackedEntry;
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
  let laneIdx = 0;

  const lanes = universes
    .map((u) => {
      const uniEntries = entries.filter((e) => e.u === u.id);
      if (uniEntries.length === 0) return null;

      const stacked = assignStacks(uniEntries);
      const maxStack = Math.max(...stacked.map((e) => e.stack));
      const trackHeight = (maxStack + 1) * (ROW_H + ROW_GAP) - ROW_GAP;
      const laneHeight = Math.max(LABEL_MIN_HEIGHT, trackHeight + 2 * LANE_PAD);
      const isAlt = laneIdx % 2 === 1;
      laneIdx++;

      // Check if any entries are visible under current filters
      const hasVisible = stacked.some((e) => {
        const okMedia = matchesMediaFilter(filters.media, e.m);
        const okAudio = filters.audio === "all" || filters.audio === e.a;
        const okText = filters.text === "all" || filters.text === e.s;
        return okMedia && okAudio && okText;
      });

      return { universe: u, stacked, laneHeight, isAlt, hasVisible };
    })
    .filter((lane): lane is NonNullable<typeof lane> => lane !== null);

  return (
    <>
      <div className={s.labelsCol}>
        <div className={`${s.axisRow} ${s.labelsAxis}`}>Release year</div>
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
          <YearAxis />
          <div>
            {lanes.map(
              ({ universe: u, stacked, laneHeight, isAlt, hasVisible }) => (
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
                  {stacked.map((e) => (
                    <TimelineEntry
                      key={`${u.id}-${String(e.y1)}-${e.t}`}
                      entry={e}
                      universe={u}
                      filters={filters}
                    />
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
