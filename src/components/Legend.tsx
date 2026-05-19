import * as s from "../styles/timeline.css";

const MEDIA_LEGEND = [
  { icon: "▢", label: "TV" },
  { icon: "◉", label: "OVA / ONA" },
  { icon: "▶", label: "Film" },
  { icon: "▤", label: "Manga" },
  { icon: "▥", label: "Novel" },
  { icon: "◆", label: "Game" },
  { icon: "◐", label: "Live action" },
];

const LANG_MARKS = [
  { className: s.markEn, label: "EN", desc: "available" },
  { className: s.markJa, label: "JP", desc: "Japanese only" },
  { className: s.markNa, label: "—", desc: "n/a (print)" },
  { className: s.markTba, label: "?", desc: "TBA" },
];

export function Legend() {
  return (
    <section className={s.legend}>
      <div className={s.legendGroup}>
        <span className={s.legendTitle}>Media</span>
        {MEDIA_LEGEND.map((item) => (
          <span key={item.label} className={s.legendItem}>
            <span className={s.legendIcon}>{item.icon}</span> {item.label}
          </span>
        ))}
      </div>
      <div className={s.legendGroup}>
        <span className={s.legendTitle}>Lang</span>
        {LANG_MARKS.map((item) => (
          <span key={item.label} className={s.legendItem}>
            <span className={`${s.entryMark} ${item.className}`}>
              {item.label}
            </span>{" "}
            {item.desc}
          </span>
        ))}
      </div>
      <div className={s.legendGroup}>
        <span className={s.legendTitle}>Marks</span>
        <span className={s.legendItem}>audio left, text right</span>
      </div>
    </section>
  );
}
