import * as s from "../styles/timeline.css";
import {
  END_YEAR,
  START_YEAR,
  TRACK_PAD_LEFT,
  YEAR_WIDTH,
} from "./timelineGeometry";

function getTickClass(year: number): string {
  if (year % 10 === 0 || year === START_YEAR || year === END_YEAR)
    return s.axisTickMajor;
  if (year % 5 === 0) return s.axisTick5;
  return s.axisTick1;
}

function getYearClass(year: number): string {
  if (year % 10 === 0 || year === START_YEAR || year === END_YEAR)
    return s.axisYearMajor;
  if (year % 5 === 0) return s.axisYear5;
  return s.axisYearDefault;
}

function shouldShowLabel(year: number): boolean {
  return year % 5 === 0 || year === START_YEAR || year === END_YEAR;
}

export function YearAxis() {
  const years = Array.from(
    { length: END_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i,
  );

  return (
    <div className={`${s.axisRow} ${s.tracksAxis}`}>
      <div className={s.axisTrack}>
        {years.map((year) => {
          const xCenter =
            TRACK_PAD_LEFT + (year - START_YEAR) * YEAR_WIDTH + YEAR_WIDTH / 2;
          return (
            <div key={year}>
              <div
                className={`${s.axisTick} ${getTickClass(year)}`}
                style={{ left: xCenter - 0.5 }}
              />
              {shouldShowLabel(year) && (
                <div
                  className={`${s.axisYear} ${getYearClass(year)}`}
                  style={{
                    left: TRACK_PAD_LEFT + (year - START_YEAR) * YEAR_WIDTH,
                  }}
                >
                  {year}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
