import * as s from "../styles/timeline.css";

const START_YEAR = 1979;
const END_YEAR = 2026;

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
          const xCenter = (year - START_YEAR) * 28 + 14;
          return (
            <div key={year}>
              <div
                className={`${s.axisTick} ${getTickClass(year)}`}
                style={{ left: xCenter - 0.5 }}
              />
              {shouldShowLabel(year) && (
                <div
                  className={`${s.axisYear} ${getYearClass(year)}`}
                  style={{ left: (year - START_YEAR) * 28 }}
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
