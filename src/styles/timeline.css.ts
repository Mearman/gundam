import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "./global.css";

/* ─── Header ──────────────────────────────────────────── */
export const header = style({
  borderBottom: `1px solid ${vars.border}`,
  padding: "28px 28px 22px",
  background: "linear-gradient(180deg, #101216 0%, #0a0b0d 100%)",
  position: "relative",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background:
        "linear-gradient(90deg, #ff3b30 0%, #ff9500 30%, #ffcc00 50%, #34c759 70%, #007aff 100%)",
    },
  },
});

export const headerGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "end",
  gap: 24,
});

export const title = style({
  fontFamily: "'Big Shoulders Display', sans-serif",
  fontWeight: 900,
  fontSize: "clamp(48px, 7vw, 84px)",
  lineHeight: 0.85,
  letterSpacing: "-0.02em",
  color: "#e8e9ec",
});

export const titleAccent = style({
  color: "#ff3b30",
});

export const subtitle = style({
  color: "#9aa0a8",
  fontSize: 11,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  marginTop: 10,
});

export const headerMeta = style({
  textAlign: "right",
  color: "#5a6068",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  lineHeight: 1.8,
});

export const metaNum = style({
  color: "#e8e9ec",
  fontSize: 28,
  fontFamily: "'Big Shoulders Display', sans-serif",
  fontWeight: 700,
  letterSpacing: 0,
});

/* ─── Filters ─────────────────────────────────────────── */
export const filters = style({
  position: "sticky",
  top: 0,
  zIndex: 30,
  background: "rgba(10,11,13,0.92)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderBottom: "1px solid #2a2e34",
  padding: `14px ${vars.pageGutter}`,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "16px 28px",
});

export const filterGroup = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
});

export const filterLabel = style({
  color: "#5a6068",
  fontSize: 10,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  paddingRight: 2,
});

export const chips = style({
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
});

const chipBase = style({
  background: "transparent",
  color: "#9aa0a8",
  border: "1px solid #2a2e34",
  padding: "5px 10px",
  fontFamily: "inherit",
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: "0.04em",
  cursor: "pointer",
  transition: "all 0.12s ease",
  borderRadius: 0,
  textTransform: "uppercase" as const,
});

export const chip = styleVariants({
  default: [
    chipBase,
    {
      selectors: {
        "&:hover": {
          color: "#e8e9ec",
          borderColor: "#3a3f47",
        },
      },
    },
  ],
  active: [
    chipBase,
    {
      background: "#e8e9ec",
      color: "#0a0b0d",
      borderColor: "#e8e9ec",
      fontWeight: 500,
    },
  ],
});

/* ─── Legend ──────────────────────────────────────────── */
export const legend = style({
  padding: `14px ${vars.pageGutter}`,
  borderBottom: "1px solid #2a2e34",
  display: "flex",
  flexWrap: "wrap",
  gap: "12px 28px",
  alignItems: "center",
  background: "#131518",
  fontSize: 11,
  color: "#9aa0a8",
});

export const legendGroup = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const legendTitle = style({
  color: "#5a6068",
  fontSize: 10,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  marginRight: 4,
});

export const legendItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
});

export const legendIcon = style({
  fontSize: 14,
  lineHeight: 1,
});

/* ─── Timeline grid ──────────────────────────────────── */
export const timelineWrap = style({
  borderBottom: "1px solid #2a2e34",
  background: "#0a0b0d",
  padding: `0 ${vars.pageGutter}`,
});

export const timelineGrid = style({
  display: "flex",
  alignItems: "stretch",
  borderLeft: "1px solid #2a2e34",
  borderRight: "1px solid #2a2e34",
});

export const labelsCol = style({
  width: vars.labelW,
  flexShrink: 0,
  borderRight: "1px solid #3a3f47",
  background: "#0a0b0d",
  position: "relative",
  zIndex: 5,
});

export const tracksCol = style({
  flex: 1,
  minWidth: 0,
  overflowX: "auto",
  overflowY: "hidden",
});

export const tracksInner = style({
  minWidth: `calc(${vars.trackPadLeft} + ${vars.years} * ${vars.yearWidth} + ${vars.trackPadRight})`,
  position: "relative",
});

/* ─── Axis ──────────────────────────────────────────── */
export const axisRow = style({
  height: 56,
  boxSizing: "border-box",
});

export const labelsAxis = style({
  padding: "0 18px",
  display: "flex",
  alignItems: "center",
  color: "#5a6068",
  fontSize: 10,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  borderBottom: "1px solid #3a3f47",
  background: "#0a0b0d",
});

export const tracksAxis = style({
  background: "#0a0b0d",
  borderBottom: "1px solid #3a3f47",
});

export const axisTrack = style({
  position: "relative",
  height: "100%",
});

export const axisYear = style({
  position: "absolute",
  top: 8,
  width: vars.yearWidth,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 10,
  lineHeight: 1,
});

export const axisYearMajor = style({
  color: "#e8e9ec",
  fontWeight: 500,
});

export const axisYear5 = style({
  color: "#9aa0a8",
});

export const axisYearDefault = style({
  color: "#5a6068",
});

export const axisTick = style({
  position: "absolute",
  bottom: 0,
  width: 1,
});

export const axisTickMajor = style({
  height: 14,
  background: "#5a6068",
});

export const axisTick5 = style({
  height: 10,
  background: "#3a3f47",
});

export const axisTick1 = style({
  height: 5,
  background: "#2a2e34",
});

/* ─── Lane rows ─────────────────────────────────────── */
export const laneLabelRow = style({
  position: "relative",
  padding: `${vars.lanePad} 18px ${vars.lanePad} 20px`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 4,
  overflow: "hidden",
  borderBottom: "1px solid #2a2e34",
  background: "#131518",
});

export const laneLabelRowAlt = style({
  background: "#111317",
});

export const laneLabelRowHidden = style({
  display: "none",
});

export const laneBar = style({
  position: "absolute",
  left: 0,
  top: 0,
  width: 4,
  height: "100%",
});

export const laneAbbr = style({
  fontSize: 10,
  letterSpacing: "0.15em",
  fontWeight: 700,
  textTransform: "uppercase" as const,
});

export const laneName = style({
  color: "#e8e9ec",
  fontSize: 12,
  letterSpacing: "-0.01em",
  lineHeight: 1.2,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const laneCount = style({
  color: "#5a6068",
  fontSize: 10,
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const laneTrackRow = style({
  position: "relative",
  padding: `${vars.lanePad} 0`,
  borderBottom: "1px solid #2a2e34",
  background: "#131518",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "100%",
      backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent calc(${vars.yearWidth} - 1px), rgba(255,255,255,0.025) calc(${vars.yearWidth} - 1px), rgba(255,255,255,0.025) ${vars.yearWidth})`,
      backgroundPositionX: vars.trackPadLeft,
      pointerEvents: "none",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      height: 1,
      opacity: 0.18,
      pointerEvents: "none",
    },
  },
});

export const laneTrackRowAlt = style({
  background: "#111317",
});

export const laneTrackRowHidden = style({
  display: "none",
});

/* ─── Entries ────────────────────────────────────────── */
export const entry = style({
  position: "absolute",
  height: vars.rowH,
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "0 6px",
  cursor: "pointer",
  transition:
    "transform 0.12s ease, background 0.12s ease, box-shadow 0.12s ease",
  zIndex: 2,
  minWidth: vars.yearWidth,
  overflow: "hidden",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
    },
    "&:hover": {
      background: "var(--entry-tint)",
      transform: "translateY(-1px)",
      zIndex: 5,
      boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
    },
  },
});

export const entryTba = style({
  borderStyle: "dashed",
});

export const entryFilteredOut = style({
  display: "none",
});

export const entryCompact = style({
  padding: 0,
  justifyContent: "center",
});

export const entryIcon = style({
  fontSize: 13,
  marginLeft: 4,
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  lineHeight: 1,
});

export const entryTitle = style({
  color: "#e8e9ec",
  fontSize: 11,
  fontWeight: 400,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  letterSpacing: "-0.01em",
  flex: 1,
  minWidth: 0,
});

export const entryTitleHidden = style({
  display: "none",
});

export const entryMarks = style({
  display: "flex",
  gap: 2,
  flexShrink: 0,
});

export const entryMarksHidden = style({
  display: "none",
});

export const entryMark = style({
  fontSize: 8,
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 500,
  padding: "1px 3px",
  lineHeight: 1,
  letterSpacing: "0.03em",
});

export const markEn = style({
  background: "rgba(52,199,89,0.18)",
  color: "#5fd97f",
  border: "1px solid rgba(52,199,89,0.35)",
});

export const markJa = style({
  background: "#22262b",
  color: "#9aa0a8",
  border: "1px solid #3a3f47",
});

export const markNa = style({
  background: "transparent",
  color: "#5a6068",
  border: "1px dashed #3a3f47",
});

export const markTba = style({
  background: "rgba(0,122,255,0.15)",
  color: "#4a9eff",
  border: "1px solid rgba(0,122,255,0.35)",
});

/* ─── Tooltip ────────────────────────────────────────── */
export const tooltip = style({
  position: "fixed",
  background: "#1a1d21",
  border: "1px solid #3a3f47",
  padding: "14px 16px",
  maxWidth: 460,
  zIndex: 100,
  pointerEvents: "none",
  opacity: 0,
  transition: "opacity 0.15s ease",
  boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      width: 4,
      height: "100%",
    },
  },
});

export const tooltipVisible = style({
  opacity: 1,
});

export const ttTitle = style({
  fontSize: 14,
  fontWeight: 500,
  color: "#e8e9ec",
  marginBottom: 4,
  lineHeight: 1.3,
  paddingLeft: 8,
});

export const ttNote = style({
  fontSize: 11,
  color: "#9aa0a8",
  marginBottom: 10,
  lineHeight: 1.4,
  paddingLeft: 8,
});

export const ttGrid = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "6px 14px",
  fontSize: 11,
  paddingLeft: 8,
});

export const ttKey = style({
  color: "#5a6068",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontSize: 9,
  paddingTop: 1,
});

export const ttVal = style({
  color: "#e8e9ec",
});

export const ttReleaseList = style({
  display: "flex",
  flexDirection: "column",
  gap: 3,
});

export const ttReleaseItem = style({
  lineHeight: 1.35,
});

export const ttSource = style({
  overflowWrap: "anywhere",
});

/* ─── Footer ──────────────────────────────────────────── */
export const footer = style({
  padding: `32px ${vars.pageGutter} 0`,
  color: "#5a6068",
  fontSize: 11,
  lineHeight: 1.7,
  maxWidth: 880,
});

export const footerLink = style({
  color: "#9aa0a8",
});

export const footerTitle = style({
  color: "#9aa0a8",
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
  fontSize: 10,
  marginBottom: 8,
});

/* ─── Story axis (per-lane) ─────────────────────────── */
export const laneStoryAxis = style({
  position: "absolute",
  left: 0,
  right: 0,
  pointerEvents: "none",
});

export const laneStoryAxisTick = style({
  position: "absolute",
  bottom: 0,
  width: 1,
});

export const tickMajor = style({
  height: 12,
  background: "#5a6068",
});

export const tick5 = style({
  height: 8,
  background: "#3a3f47",
});

export const tick1 = style({
  height: 4,
  background: "#2a2e34",
});

export const laneStoryAxisYear = style({
  position: "absolute",
  top: 2,
  width: 44,
  height: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 9,
  lineHeight: 1,
  letterSpacing: 0,
});
