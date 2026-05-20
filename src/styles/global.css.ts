import {
  globalStyle,
  globalFontFace,
  createGlobalTheme,
} from "@vanilla-extract/css";

globalFontFace("Big Shoulders Display", {
  src: 'url(https://fonts.gstatic.com/s/bigshouldersdisplay/v24/fC1_PZJEZG-e9gHhdI4-NBbfd2ys3SjJCx1czNDuDJAM2w.woff2) format("woff2")',
  fontWeight: "400 900",
  fontDisplay: "swap",
});

globalFontFace("JetBrains Mono", {
  src: 'url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD7OwGtT0rU.woff2) format("woff2")',
  fontWeight: "300 700",
  fontDisplay: "swap",
});

export const vars = createGlobalTheme(":root", {
  bg: "#0a0b0d",
  surface: "#131518",
  surface2: "#1a1d21",
  surface3: "#22262b",
  border: "#2a2e34",
  borderStrong: "#3a3f47",
  text: "#e8e9ec",
  text2: "#9aa0a8",
  text3: "#5a6068",
  accent: "#ff3b30",
  success: "#34c759",
  warn: "#ff9500",

  yearWidth: "28px",
  startYear: "1979",
  endYear: "2026",
  years: "48",
  pageGutter: "28px",
  labelW: "216px",
  rowH: "30px",
  rowGap: "4px",
  lanePad: "10px",
  trackPadLeft: "16px",
  trackPadRight: "48px",
});

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body", {
  background: "#0a0b0d",
  color: "#e8e9ec",
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: "13px",
  lineHeight: "1.5",
  WebkitFontSmoothing: "antialiased",
});

globalStyle("body", {
  minHeight: "100vh",
  paddingBottom: "60px",
});
