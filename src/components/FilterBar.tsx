import type { Filters } from "../data/types";
import * as s from "../styles/timeline.css";

interface FilterConfig {
  key: keyof Filters;
  label: string;
  options: { value: string; label: string }[];
}

const FILTER_CONFIGS: FilterConfig[] = [
  {
    key: "media",
    label: "Media",
    options: [
      { value: "all", label: "all" },
      { value: "tv", label: "tv" },
      { value: "ova", label: "ova/ona" },
      { value: "film", label: "film" },
      { value: "manga", label: "manga/novel" },
      { value: "game", label: "game" },
      { value: "live", label: "live action" },
    ],
  },
  {
    key: "audio",
    label: "Audio",
    options: [
      { value: "all", label: "all" },
      { value: "en", label: "en dub" },
      { value: "ja", label: "jp only" },
      { value: "na", label: "n/a" },
    ],
  },
  {
    key: "text",
    label: "Text",
    options: [
      { value: "all", label: "all" },
      { value: "en", label: "en subs" },
      { value: "ja", label: "jp only" },
    ],
  },
  {
    key: "density",
    label: "Density",
    options: [
      { value: "comfort", label: "labels" },
      { value: "compact", label: "icons only" },
    ],
  },
];

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onAxisToggle: (axis: "release" | "story") => void;
}

export function FilterBar({
  filters,
  onFilterChange,
  onAxisToggle,
}: FilterBarProps) {
  const axisActive = (axis: "release" | "story"): boolean =>
    axis === "release"
      ? filters.axis === "release" || filters.axis === "both"
      : filters.axis === "story" || filters.axis === "both";

  return (
    <nav className={s.filters}>
      {FILTER_CONFIGS.map((cfg) => (
        <div key={cfg.key} className={s.filterGroup}>
          <span className={s.filterLabel}>{cfg.label}</span>
          <div className={s.chips}>
            {cfg.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={
                  s.chip[
                    filters[cfg.key] === opt.value ||
                    (cfg.key === "density" && filters.density === opt.value)
                      ? "active"
                      : "default"
                  ]
                }
                onClick={() => {
                  onFilterChange(cfg.key, opt.value);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className={s.filterGroup}>
        <span className={s.filterLabel}>Axis</span>
        <div className={s.chips}>
          <button
            type="button"
            className={s.chip[axisActive("release") ? "active" : "default"]}
            onClick={() => {
              onAxisToggle("release");
            }}
          >
            release year
          </button>
          <button
            type="button"
            className={s.chip[axisActive("story") ? "active" : "default"]}
            onClick={() => {
              onAxisToggle("story");
            }}
          >
            in-universe
          </button>
        </div>
      </div>
    </nav>
  );
}
