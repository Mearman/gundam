import { useState, useCallback } from "react";
import { UNIVERSES, ENTRIES } from "./data/timeline";
import { matchesMediaFilter } from "./data/helpers";
import { FilterBar } from "./components/FilterBar";
import { Legend } from "./components/Legend";
import { TimelineLanes } from "./components/TimelineLanes";
import * as s from "./styles/timeline.css";
import type { Filters } from "./data/types";

const DEFAULT_FILTERS: Filters = {
  media: "all",
  audio: "all",
  text: "all",
  density: "comfort",
};

function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const visibleCount = ENTRIES.filter((e) => {
    const okMedia = matchesMediaFilter(filters.media, e.m);
    const okAudio = filters.audio === "all" || filters.audio === e.a;
    const okText = filters.text === "all" || filters.text === e.s;
    return okMedia && okAudio && okText;
  }).length;

  return (
    <>
      <header className={s.header}>
        <div className={s.headerGrid}>
          <div>
            <h1 className={s.title}>
              GUNDAM
              <br />
              TIMELINE
              <span className={s.titleAccent}>.</span>
            </h1>
            <div className={s.subtitle}>
              Release dates · 1979 – 2026 · all media · audio + text language
            </div>
          </div>
          <div className={s.headerMeta}>
            <div>
              <span className={s.metaNum}>{visibleCount}</span>
              <br />
              entries plotted
            </div>
            <div>
              <span className={s.metaNum}>14</span>
              <br />
              universes
            </div>
            <div>
              <span className={s.metaNum}>48</span>
              <br />
              years tracked
            </div>
          </div>
        </div>
      </header>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <Legend />

      <div className={s.timelineWrap}>
        <div className={s.timelineGrid}>
          <TimelineLanes
            universes={UNIVERSES}
            entries={ENTRIES}
            filters={filters}
          />
        </div>
      </div>

      <footer className={s.footer}>
        <div className={s.footerTitle}>Notes</div>
        Multi-year entries (OVAs, compilation series) span the full release
        window of their original run; recuts, remasters, and 4K re-releases are
        listed in the tooltip note rather than plotted separately. Audio mark =
        officially produced English dub. Text mark = officially produced English
        subs or translation. <em>Memory of Eden</em>, the Turn A compilation
        films, <em>Twilight AXIS</em>, <em>Build Real</em>, and a few SD shorts
        have subs but no dub. Two notable UC novels (
        <em>Beltorchika&apos;s Children</em>, <em>Frozen Teardrop</em>) and G
        Gundam&apos;s <em>7th &amp; 8th MS Stage</em> OVA have no official
        English release at all.
      </footer>
    </>
  );
}

export default App;
