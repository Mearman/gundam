import type { Entry, EntryDetail } from "../types";
import { ep, rel } from "../types";

// After Colony

export const acEntries: Entry[] = [
  {
    detailId: "wing_1995_tv",
    u: "ac",
    d: "AC 195",
    t: "New Mobile Report Gundam Wing",
    n: "49-ep TV",
    y1: 1995,
    y2: 1996,
    m: "tv",
    a: "en",
    s: "en",
  },
  {
    detailId: "wing_endlesswaltz_1997_ova",
    u: "ac",
    d: "AC 196",
    t: "Gundam Wing: Endless Waltz",
    n: "3-ep OVA",
    y1: 1997,
    y2: 1997,
    m: "ova",
    a: "en",
    s: "en",
  },
  {
    detailId: "wing_endlesswaltz_1998_film",
    u: "ac",
    d: "AC 196",
    t: "Endless Waltz: Special Edition",
    n: "theatrical re-edit; 4K re-release 2025",
    y1: 1998,
    y2: 1998,
    m: "film",
    a: "en",
    s: "en",
  },
  {
    detailId: "wing_frozen_teardrop_novel",
    u: "ac",
    d: "AC 196+",
    t: "Frozen Teardrop",
    n: "sequel light novel; never translated to English",
    y1: 2010,
    y2: 2015,
    m: "novel",
    a: "na",
    s: "ja",
  },
  {
    u: "ac",
    d: "AC ???",
    t: "Gundam Wing (new visual project)",
    n: "announced Gundam Conference SPRING 2026; format TBA",
    y1: 2026,
    y2: 2026,
    m: "tba",
    a: "tba",
    s: "tba",
  },
  {
    detailId: "wing_battlefield_pacifist_1998_manga",
    u: "ac",
    d: "A.C.",
    t: "Mobile Suit Gundam Wing: Battlefield of Pacifist",
    n: "1 volumes",
    y1: 1997,
    y2: 1998,
    m: "manga",
    a: "na",
    s: "ja",
  },
  {
    detailId: "wing_blind_target_1998_manga",
    u: "ac",
    d: "A.C.",
    t: "Mobile Suit Gundam Wing: Blind Target",
    n: "2 volumes",
    y1: 1998,
    y2: 1999,
    m: "manga",
    a: "na",
    s: "ja",
  },
  {
    detailId: "wing_episode_zero_manga",
    u: "ac",
    d: "A.C.",
    t: "Mobile Suit Gundam Wing: Episode Zero",
    n: "Prequel manga showing the Gundam pilots before the series. 1 tankobon (collected 1998)",
    y1: 1997,
    y2: 2004,
    m: "manga",
    a: "na",
    s: "en",
  },
  {
    detailId: "wing_frozen_teardrop_manga",
    u: "ac",
    d: "A.C.",
    t: "New Mobile Report Gundam Wing: Frozen Teardrop — Hanamoyu",
    n: "Manga adaptation of the Frozen Teardrop novel",
    y1: 2016,
    y2: 2021,
    m: "manga",
    a: "na",
    s: "ja",
  },
  {
    detailId: "wing_glory_of_the_losers_manga",
    u: "ac",
    d: "A.C.",
    t: "Mobile Suit Gundam Wing: Glory of the Losers",
    n: "14 volumes 2011-2019. Modern retelling of Wing TV. Per-volume dates approximate.",
    y1: 2010,
    y2: 2022,
    m: "manga",
    a: "na",
    s: "en",
  },
  {
    detailId: "wing_new_visual_tba",
    u: "ac",
    d: "A.C.",
    t: "Gundam Wing new visual project",
    n: "Announced; TBA",
    y1: 2026,
    y2: 2028,
    m: "tba",
    a: "tba",
    s: "tba",
  },
  {
    detailId: "wing_opmeteor_1996_ova",
    u: "ac",
    d: "A.C.",
    t: "Gundam Wing: Operation Meteor",
    n: "4-part OVA compiling series clips + new footage; never dubbed",
    y1: 1996,
    y2: 2017,
    m: "ova",
    a: "en",
    s: "en",
  },
];

export const acDetails: Record<string, EntryDetail | undefined> = {
  wing_1995_tv: {
    title: { ja: "新機動戦記ガンダムW", en: "Mobile Suit Gundam Wing" },
    u: "ac",
    type: "tv",
    source:
      "https://en.wikipedia.org/wiki/List_of_Mobile_Suit_Gundam_Wing_episodes",
    episodes: [
      ep(1, "少女が見た流星", "The Shooting Star She Saw", "1995-04-07", {
        en: "2000-03-06",
      }),
      ep(
        2,
        "死神と呼ばれるG（ガンダム）",
        "The Gundam Deathscythe",
        "1995-04-14",
        { en: "2000-03-07" },
      ),
      ep(3, "ガンダム5機確認", "Five Gundams Confirmed", "1995-04-21", {
        en: "2000-03-08",
      }),
      ep(4, "悪夢のビクトリア", "The Victoria Nightmare", "1995-04-28", {
        en: "2000-03-09",
      }),
      ep(5, "リリーナの秘密", "Relena's Secret", "1995-05-05", {
        en: "2000-03-10",
      }),
      ep(6, "パーティー・ナイト", "Party Night", "1995-05-12", {
        en: "2000-03-13",
      }),
      ep(7, "流血へのシナリオ", "Scenario for Bloodshed", "1995-05-19", {
        en: "2000-03-14",
      }),
      ep(8, "トレーズ暗殺", "The Treize Assassination", "1995-05-26", {
        en: "2000-03-15",
      }),
      ep(9, "亡国の肖像", "Portrait of a Ruined Country", "1995-06-02", {
        en: "2000-03-16",
      }),
      ep(10, "ヒイロ閃光に散る", "Heero, Distracted by Defeat", "1995-06-09", {
        en: "2000-03-17",
      }),
      ep(11, "幸福の行方", "The Whereabouts of Happiness", "1995-06-16", {
        en: "2000-03-20",
      }),
      ep(12, "迷える戦士たち", "Bewildered Warriors", "1995-06-23", {
        en: "2000-03-21",
      }),
      ep(13, "キャスリンの涙", "Catherine's Tears", "1995-06-30", {
        en: "2000-03-22",
      }),
      ep(14, "01爆破指令", "The Order to Destroy 01", "1995-07-07", {
        en: "2000-03-23",
      }),
      ep(
        15,
        "決戦の場所南極へ",
        "To the Battleground Antarctica",
        "1995-07-14",
        { en: "2000-03-24" },
      ),
      ep(16, "悲しき決戦", "The Sorrowful Battle", "1995-07-21", {
        en: "2000-03-27",
      }),
      ep(17, "裏切りの遠き故郷", "Betrayed by Home, Far Away", "1995-07-28", {
        en: "2000-03-28",
      }),
      ep(18, "トールギス破壊", "Tallgeese Destroyed", "1995-08-04", {
        en: "2000-03-29",
      }),
      ep(19, "バルジ強襲", "Assault on Barge", "1995-08-11", {
        en: "2000-03-30",
      }),
      ep(20, "潜入、月面基地", "The Lunar Base Infiltration", "1995-08-18", {
        en: "2000-03-31",
      }),
      ep(21, "悲しみのカトル", "Grief Stricken Quatre", "1995-08-25", {
        en: "2000-04-03",
      }),
      ep(22, "独立を巡る戦い", "The Fight for Independence", "1995-08-31", {
        en: "2000-04-04",
      }),
      ep(
        23,
        "死神に戻るデュオ",
        "Duo, the God of Death Once Again",
        "1995-09-01",
        { en: "2000-04-05" },
      ),
      ep(
        24,
        "ゼロと呼ばれたG（ガンダム）",
        "The Gundam They Called Zero",
        "1995-09-08",
        { en: "2000-04-06" },
      ),
      ep(25, "カトルVSヒイロ", "Quatre VS Heero", "1995-09-22", {
        en: "2000-04-07",
      }),
      ep(
        26,
        "燃えつきない流星",
        "The Eternal Flame of the Shooting Stars",
        "1995-09-29",
        { en: "2000-04-10" },
      ),
      ep(
        27,
        "勝利と敗北の軌跡",
        "The Locus of Victory and Defeat",
        "1995-10-06",
        { en: "2000-04-11" },
      ),
      ep(28, "すれ違う運命", "Passing Destinies", "1995-10-13", {
        en: "2000-04-12",
      }),
      ep(29, "戦場のヒロイン", "The Heroine of the Battlefield", "1995-10-20", {
        en: "2000-04-13",
      }),
      ep(30, "リリーナとの再会", "The Reunion with Relena", "1995-10-27", {
        en: "2000-04-14",
      }),
      ep(
        31,
        "ガラスの王国（サンクキングダム）",
        "The Glass Kingdom",
        "1995-11-03",
        { en: "2000-04-17" },
      ),
      ep(32, "死神とゼロの対決", "The God of Death Meets Zero", "1995-11-17", {
        en: "2000-04-18",
      }),
      ep(33, "孤独な戦場", "The Lonely Battlefield", "1995-11-24", {
        en: "2000-04-19",
      }),
      ep(34, "その名はエピオン", "And Its Name is Epyon", "1995-12-01", {
        en: "2000-04-20",
      }),
      ep(35, "ウーフェイ再び", "The Return of Wufei", "1995-12-08", {
        en: "2000-04-21",
      }),
      ep(
        36,
        "王国（サンクキングダム）崩壊",
        "Sanc Kingdom's Collapse",
        "1995-12-15",
        { en: "2000-04-24" },
      ),
      ep(37, "ゼロVSエピオン", "Zero VS Epyon", "1995-12-22", {
        en: "2000-04-25",
      }),
      ep(
        38,
        "女王（クイーン）リリーナ誕生",
        "The Birth of Queen Relena",
        "1996-01-12",
        { en: "2000-04-26" },
      ),
      ep(
        39,
        "トロワ戦場へ帰る",
        "Trowa's Return to the Battlefield",
        "1996-01-19",
        { en: "2000-04-27" },
      ),
      ep(40, "新たなる指導者", "A New Leader", "1996-01-26", {
        en: "2000-04-28",
      }),
      ep(41, "バルジ攻防戦", "Crossfire at Barge", "1996-02-02", {
        en: "2000-05-01",
      }),
      ep(42, "リーブラ発進", "Battleship Libra", "1996-02-09", {
        en: "2000-05-02",
      }),
      ep(43, "地上を撃つ巨光（オーロラ）", "Target: Earth", "1996-02-16", {
        en: "2000-05-03",
      }),
      ep(44, "出撃Gチーム", "Go Forth, Gundam Team", "1996-02-23", {
        en: "2000-05-04",
      }),
      ep(45, "決戦の予感", "Signs of the Final Battle", "1996-03-01", {
        en: "2000-05-05",
      }),
      ep(46, "ミリアルドの決断", "Milliardo's Decision", "1996-03-08", {
        en: "2000-05-08",
      }),
      ep(47, "激突する宇宙", "Collision in Space", "1996-03-15", {
        en: "2000-05-09",
      }),
      ep(48, "混迷への出撃", "Takeoff into Confusion", "1996-03-22", {
        en: "2000-05-10",
      }),
      ep(49, "最後の勝利者", "The Final Victor", "1996-03-29", {
        en: "2000-05-11",
      }),
    ],
    releases: [
      rel(
        "ja",
        "broadcast",
        "TV Asahi / ANN",
        "1995-04-07",
        "weekly",
        "1996-03-29",
      ),
      rel(
        "en",
        "broadcast",
        "Toonami (Cartoon Network)",
        "2000-03-06",
        "weekly",
        "2000-11-17",
      ),
      rel("en", "home_video", "Bandai Entertainment DVD", "2001", "box-set"),
      rel(
        "en",
        "home_video",
        "Right Stuf / Sunrise Blu-ray",
        "2017",
        "box-set",
      ),
      rel("en", "streaming", "Crunchyroll", "2024", "simulcast"),
    ],
  },
  wing_opmeteor_1996_ova: {
    title: {
      ja: "新機動戦記ガンダムW OPERATION METEOR",
      en: "Gundam Wing: Operation Meteor",
    },
    u: "ac",
    type: "ova",
    source:
      "https://en.wikipedia.org/wiki/List_of_Mobile_Suit_Gundam_Wing_episodes",
    note: "4-part OVA compiling series clips + new footage; never dubbed",
    episodes: [
      ep(
        1,
        "OPERATION METEOR I: オッドナンバーズ",
        "Operation Meteor I: Odd Numbers",
        "1996-04-25",
      ),
      ep(
        2,
        "OPERATION METEOR I: イーブンナンバーズ",
        "Operation Meteor I: Even Numbers",
        "1996-04-25",
      ),
      ep(
        3,
        "OPERATION METEOR II: オッドナンバーズ II",
        "Operation Meteor II: Odd Numbers II",
        "1996-10-25",
      ),
      ep(
        4,
        "OPERATION METEOR II: イーブンナンバーズ II",
        "Operation Meteor II: Even Numbers II",
        "1996-10-25",
      ),
    ],
    releases: [
      rel(
        "ja",
        "home_video",
        "OVA release",
        "1996-07-25",
        "box-set",
        "1996-10-25",
      ),
      rel("en", "home_video", "Right Stuf / Sunrise", "2017", "box-set"),
    ],
  },
  wing_endlesswaltz_1997_ova: {
    title: {
      ja: "新機動戦記ガンダムW Endless Waltz",
      en: "Gundam Wing: Endless Waltz",
    },
    u: "ac",
    type: "ova",
    source:
      "https://en.wikipedia.org/wiki/List_of_Mobile_Suit_Gundam_Wing_episodes",
    episodes: [
      ep(1, "静かなる軌道", "Silent Orbit", "1997-01-25", { en: "2000-11-10" }),
      ep(2, "過ぎ去りし流星", "Operation Meteor", "1997-04-25", {
        en: "2000-11-10",
      }),
      ep(3, "永遠への回帰", "Return to Forever", "1997-07-25", {
        en: "2000-11-10",
      }),
    ],
    releases: [
      rel(
        "ja",
        "home_video",
        "OVA release",
        "1997-01-25",
        "box-set",
        "1997-07-25",
      ),
      rel(
        "en",
        "broadcast",
        "Toonami (Cartoon Network)",
        "2000-10-20",
        "weekly",
      ),
      rel("en", "home_video", "Bandai Entertainment DVD", "2001", "box-set"),
      rel("en", "home_video", "Right Stuf / Sunrise", "2017", "box-set"),
    ],
  },
  wing_endlesswaltz_1998_film: {
    title: {
      ja: "新機動戦記ガンダムW Endless Waltz 特別篇",
      en: "Gundam Wing: Endless Waltz Special Edition",
    },
    u: "ac",
    type: "film",
    source:
      "https://en.wikipedia.org/wiki/List_of_Mobile_Suit_Gundam_Wing_episodes",
    episodes: [
      ep(
        1,
        "新機動戦記ガンダムW Endless Waltz 特別篇",
        "Endless Waltz Special Edition (compilation film)",
        "1998-08-01",
        { en: "2002-08-30" },
      ),
    ],
    releases: [
      rel(
        "ja",
        "theatrical",
        "Theatrical (Special Edition)",
        "1998-08-01",
        "theatrical",
      ),
      rel("en", "home_video", "Bandai Entertainment DVD", "2001", "box-set"),
    ],
  },
  wing_glory_of_the_losers_manga: {
    title: {
      ja: "新機動戦記ガンダムW Endless Waltz 敗者たちの栄光",
      en: "Mobile Suit Gundam Wing: Glory of the Losers",
    },
    u: "ac",
    type: "manga",
    source: "https://en.wikipedia.org/wiki/Mobile_Suit_Gundam_Wing",
    author: "Tomofumi Ogasawara",
    publisher: "Kadokawa Shoten",
    magazine: "Gundam Ace",
    note: "14 volumes 2011-2019. Modern retelling of Wing TV. Per-volume dates approximate.",
    episodes: [
      ep(1, "Volume 1", "Volume 1", "2011-03-23"),
      ep(2, "Volume 2", "Volume 2", "2011-10-21"),
      ep(3, "Volume 3", "Volume 3", "2012-06-22"),
      ep(4, "Volume 4", "Volume 4", "2013-01-23"),
      ep(5, "Volume 5", "Volume 5", "2013-06-22"),
      ep(6, "Volume 6", "Volume 6", "2013-11-26"),
      ep(7, "Volume 7", "Volume 7", "2014-07-26"),
      ep(8, "Volume 8", "Volume 8", "2014-12-26"),
      ep(9, "Volume 9", "Volume 9", "2015-06-26"),
      ep(10, "Volume 10", "Volume 10", "2015-12-26"),
      ep(11, "Volume 11", "Volume 11", "2016-06-25"),
      ep(12, "Volume 12", "Volume 12", "2017-01-26"),
      ep(13, "Volume 13", "Volume 13", "2017-10-26"),
      ep(14, "Volume 14", "Volume 14", "2018-01-26"),
    ],
    releases: [
      rel("ja", "print", "Kadokawa Gundam Ace", "2010-02-26", "serial", "2018"),
      rel(
        "en",
        "print",
        "Vertical Inc (English)",
        "2018-10-16",
        "serial",
        "2022-01-18",
      ),
    ],
  },
  wing_frozen_teardrop_novel: {
    title: {
      ja: "新機動戦記ガンダムW Frozen Teardrop",
      en: "Mobile Suit Gundam Wing: Frozen Teardrop",
    },
    u: "ac",
    type: "novel",
    source: "https://en.wikipedia.org/wiki/Mobile_Suit_Gundam_Wing",
    author: "Katsuyuki Sumizawa",
    publisher: "Kadokawa Shoten",
    magazine: "Gundam Ace",
    note: "Photo-novel sequel, serialised in Gundam Ace from 2010",
    episodes: [ep(1, "Serialisation begins", "Serialisation begins", "2010")],
    releases: [
      rel(
        "ja",
        "print",
        "Kadokawa Sneaker Bunko",
        "2010-08-26",
        "serial",
        "2016-07-26",
      ),
    ],
  },
  wing_episode_zero_manga: {
    title: {
      ja: "新機動戦記ガンダムW Episode Zero",
      en: "Mobile Suit Gundam Wing: Episode Zero",
    },
    u: "ac",
    type: "manga",
    source: "https://en.wikipedia.org/wiki/Mobile_Suit_Gundam_Wing",
    author: "Akira Kanbe (illustrator) / Katsuyuki Sumizawa (writer)",
    publisher: "Kadokawa Shoten",
    note: "Prequel manga showing the Gundam pilots before the series. 1 tankobon (collected 1998)",
    episodes: [
      ep(
        1,
        "Episode Zero (collected edition)",
        "Episode Zero (collected edition)",
        "1998",
      ),
    ],
    releases: [
      rel("ja", "print", "Gundam Ace / Kadokawa", "1997", "serial", "1998"),
      rel("en", "print", "TokyoPop / Viz (English)", "2004", "serial"),
    ],
  },
  wing_blind_target_1998_manga: {
    title: {
      ja: "新機動戦記ガンダムW BLIND TARGET",
      en: "Mobile Suit Gundam Wing: Blind Target",
    },
    u: "ac",
    type: "manga",
    source: "https://ja.wikipedia.org/wiki/新機動戦記ガンダムW_BLIND_TARGET",
    author: "Akimiya Yumiko (art), Sumizawa Katsuyuki (story)",
    publisher: "Kodansha",
    episodes: [
      ep(1, "Volume 1", "Volume 1", "1999"),
      ep(2, "Volume 2", "Volume 2", "1999"),
    ],
    releases: [rel("ja", "print", "Kodansha", "1998", "serial", "1999")],
  },
  wing_battlefield_pacifist_1998_manga: {
    title: {
      ja: "新機動戦記ガンダムW BATTLEFIELD OF PACIFIST",
      en: "Mobile Suit Gundam Wing: Battlefield of Pacifist",
    },
    u: "ac",
    type: "manga",
    source:
      "https://ja.wikipedia.org/wiki/新機動戦記ガンダムW_BATTLEFIELD_OF_PACIFIST",
    author: "Ohtagaki Kou (art), Sumizawa Katsuyuki (story)",
    publisher: "Kodansha",
    episodes: [ep(1, "Volume 1", "Volume 1", "1998")],
    releases: [
      rel("ja", "print", "Kodansha Bom Bom Comics", "1997", "serial", "1998"),
    ],
  },
  wing_frozen_teardrop_manga: {
    title: {
      ja: "新機動戦記ガンダムW Frozen Teardrop 花たんぽぽ",
      en: "New Mobile Report Gundam Wing: Frozen Teardrop — Hanamoyu",
    },
    u: "ac",
    type: "manga",
    source:
      "https://gundam.fandom.com/wiki/New_Victory_Report_Gundam_W:_Frozen_Teardrop",
    author: "Kurosaki Kabuto (art), Sumizawa Katsuyuki (story)",
    publisher: "Kadokawa",
    magazine: "Gundam Ace",
    note: "Manga adaptation of the Frozen Teardrop novel",
    episodes: [
      ep(1, "Volume 1", "Volume 1", "2017"),
      ep(2, "Volume 2", "Volume 2", "2018"),
      ep(3, "Volume 3", "Volume 3", "2019"),
      ep(4, "Volume 4", "Volume 4", "2020"),
      ep(5, "Volume 5", "Volume 5", "2021"),
    ],
    releases: [
      rel("ja", "print", "Kadokawa Gundam Ace", "2016", "serial", "2021"),
    ],
  },
  wing_new_visual_tba: {
    title: {
      ja: "新機動戦記ガンダムW (新ビジュアルプロジェクト)",
      en: "Gundam Wing new visual project",
    },
    u: "ac",
    type: "tv",
    source: "https://gundam.fandom.com/wiki/New_Mobile_Report_Gundam_W",
    note: "Announced at Gundam Wing 30th anniversary event. Format, title, and date TBA.",
    episodes: [],
    releases: [],
  },
};
