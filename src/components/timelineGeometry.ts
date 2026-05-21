export const START_YEAR = 1979;
export const END_YEAR = 2026;
export const YEAR_WIDTH = 28;
export const RELEASE_YEAR_COUNT = END_YEAR - START_YEAR + 1;
export const RELEASE_TRACK_WIDTH = RELEASE_YEAR_COUNT * YEAR_WIDTH;

export const TRACK_PAD_LEFT = 16;
export const TRACK_PAD_RIGHT = 48;
export const TRACK_CONTENT_WIDTH =
  TRACK_PAD_LEFT + RELEASE_TRACK_WIDTH + TRACK_PAD_RIGHT;

export const ROW_H = 30;
export const ROW_GAP = 14;
export const LANE_PAD = 10;
export const LABEL_MIN_HEIGHT = 84;
export const STORY_AXIS_H = 30;
export const STORY_TOP_GUTTER = 24;
export const BOTH_CONNECTOR_H = 48;
export const STORY_AXIS_LABEL_GAP = 44;

export interface ZoomGeometry {
  readonly yearWidth: number;
  readonly releaseTrackWidth: number;
  readonly trackContentWidth: number;
}

export function computeZoomGeometry(zoom: number): ZoomGeometry {
  const yearWidth = YEAR_WIDTH * zoom;
  const releaseTrackWidth = RELEASE_YEAR_COUNT * yearWidth;
  const trackContentWidth =
    TRACK_PAD_LEFT + releaseTrackWidth + TRACK_PAD_RIGHT;
  return { yearWidth, releaseTrackWidth, trackContentWidth };
}
