import type { Entry, EntryDetail } from "../types";

// SD Gundam

export const sdEntries: Entry[] = [
  {
    detailId: "sd_gundam_force_2004_tv",
    u: "sd",
    d: "real",
    t: "Superior Defender Gundam Force",
    n: "TV, aired on Cartoon Network",
    y1: 2004,
    y2: 2004,
    m: "tv",
    a: "en",
    s: "en",
  },
  {
    detailId: "sd_gundam_sangoku_soketsuden_2019_ona",
    u: "sd",
    d: "real",
    t: "SD Gundam World Sangoku Soketsuden",
    n: "Three-Kingdoms style ONA",
    y1: 2019,
    y2: 2019,
    m: "ona",
    a: "ja",
    s: "en",
  },
  {
    detailId: "sd_gundam_world_heroes_2021_ona",
    u: "sd",
    d: "real",
    t: "SD Gundam World Heroes",
    n: "24-ep ONA",
    y1: 2021,
    y2: 2021,
    m: "ona",
    a: "en",
    s: "en",
  },
  {
    detailId: "gunpla_kun_2022_tv",
    u: "sd",
    d: "real",
    t: "Gunpla-Kun",
    n: "SD character anime shorts promoting Gunpla. Includes TV special, Build Metaverse special, and Gekijou shorts.",
    y1: 2021,
    y2: 2024,
    m: "ona",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_gundam_1988_ova",
    u: "sd",
    d: "real",
    t: "Mobile Suit SD Gundam",
    n: "5 episodes",
    y1: 1988,
    y2: 1990,
    m: "ova",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_gundam_force_hakai_2004_film",
    u: "sd",
    d: "real",
    t: "SD Gundam Force: Hakai Taishougun Arawaru!! Zako?",
    n: "Short film screened with SD Gundam Force episodes",
    y1: 2004,
    y2: 2004,
    m: "film",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_gundam_gyakushuu_1989_film",
    u: "sd",
    d: "real",
    t: "Mobile Suit SD Gundam no Gyakushuu",
    n: "Double-billed with Char's Counterattack; contained Arashi wo Yobu Gakuensai + SD Sengokuden Bakuchuu Oujou no Shou",
    y1: 1988,
    y2: 1989,
    m: "film",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_gundam_kinkyuu_1991_film",
    u: "sd",
    d: "real",
    t: "Musha Kishi Command SD Gundam Kinkyuu Shutsugeki",
    n: "Theatrical short double-billed with Gundam F91",
    y1: 1991,
    y2: 1991,
    m: "film",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_gundam_matsuri_1993_film",
    u: "sd",
    d: "real",
    t: "SD Gundam Matsuri",
    n: "Triple-bill anime film: SD Command Senki Super G-Arms + SD Sengokuden Tenkataiheiben + SD Gundam Gaiden Seikibutsu Monogatari",
    y1: 1993,
    y2: 1993,
    m: "film",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_gundam_sangokuden_2010_tv",
    u: "sd",
    d: "real",
    t: "SD Gundam Sangokuden Brave Battle Warriors",
    n: "Three Kingdoms-themed SD Gundam, weekly Sat from April 3 2010",
    y1: 2010,
    y2: 2011,
    m: "tv",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_gundam_world_sangoku_special_2020_ova",
    u: "sd",
    d: "real",
    t: "SD Gundam World Sangoku Soketsuden: Brave Battle Warriors",
    n: "Special OVA episodes of Sangoku Soketsuden",
    y1: 2020,
    y2: 2020,
    m: "ova",
    a: "ja",
    s: "ja",
  },
  {
    detailId: "sd_sangokuden_2010_film",
    u: "sd",
    d: "real",
    t: "Chō Denei-ban SD Gundam Sangokuden Brave Battle Warriors",
    y1: 2010,
    y2: 2010,
    m: "film",
    a: "ja",
    s: "ja",
  },
];

export const sdDetails: Record<string, EntryDetail | undefined> = {
  gunpla_kun_2022_tv: {
    title: { ja: "ガンプラくん", en: "Gunpla-Kun" },
    u: "sd",
    type: "ona",
    source: "https://ja.wikipedia.org/wiki/ガンプラくん",
    note: "SD character anime shorts promoting Gunpla. Includes TV special, Build Metaverse special, and Gekijou shorts.",
    episodes: [
      {
        n: 1,
        title: { ja: "ガンプラくん、子供部屋に立つ！！", en: null },
        ja: "2021-08-19",
      },
      {
        n: 2,
        title: { ja: "ガンプラくん、道具を準備せよ", en: null },
        ja: "2021-08-19",
      },
      {
        n: 3,
        title: { ja: "ガンプラくん、用語にこだわる！", en: null },
        ja: "2021-08-19",
      },
      {
        n: 4,
        title: { ja: "ガンプラくん、ガンダムを語る！", en: null },
        ja: "2021-08-19",
      },
      {
        n: 5,
        title: { ja: "ガンプラくん、オレが主役！", en: null },
        ja: "2021-08-19",
      },
      {
        n: 6,
        title: { ja: "ガンプラくん、宿題をする！", en: null },
        ja: "2021-08-19",
      },
      {
        n: 7,
        title: { ja: "シャアザクくん、登場！！", en: null },
        ja: "2021-08-19",
      },
      {
        n: 8,
        title: { ja: "ガンプラくん、パーツを捜索する", en: null },
        ja: "2021-08-19",
      },
      {
        n: 9,
        title: { ja: "ガンプラくん、散る？", en: null },
        ja: "2021-08-19",
      },
      {
        n: 10,
        title: { ja: "ガンプラくん、任務完了！！", en: null },
        ja: "2021-08-19",
      },
      {
        n: 11,
        title: { ja: "ガンプラくん、新人現る！！", en: null },
        ja: "2022-09-29",
      },
      {
        n: 12,
        title: { ja: "ガンプラくん、名前を呼ぼう！", en: null },
        ja: "2022-10-13",
      },
      {
        n: 13,
        title: { ja: "ガンプラくん、物申す！", en: null },
        ja: "2022-10-27",
      },
      {
        n: 14,
        title: { ja: "ガンプラくん、長所を探そう！", en: null },
        ja: "2022-11-10",
      },
      {
        n: 15,
        title: { ja: "ガンプラくん、ガンプラを教える！", en: null },
        ja: "2022-11-24",
      },
      {
        n: 16,
        title: { ja: "ザクプラくんに相談しよう！", en: null },
        ja: "2022-12-08",
      },
      {
        n: 17,
        title: { ja: "ガンプラくん、用語にこだわる！", en: null },
        ja: "2022-12-22",
      },
      {
        n: 18,
        title: { ja: "νガンプラくんに相談しよう！", en: null },
        ja: "2023-01-12",
      },
      {
        n: 19,
        title: { ja: "エアプラくん、失敗する?!", en: null },
        ja: "2023-01-26",
      },
      {
        n: 20,
        title: { ja: "シャアザクくんに相談しよう！", en: null },
        ja: "2023-02-09",
      },
      {
        n: 21,
        title: { ja: "エアプラくん、卒業試験に臨む！", en: null },
        ja: "2023-02-23",
      },
      {
        n: 22,
        title: { ja: "エアプラくん、卒業おめでとう！！", en: null },
        ja: "2023-03-09",
      },
      {
        n: "SP1",
        title: { ja: "ガンプラくん、ついにガンプラ商品化！", en: null },
        ja: "2023-04-28",
      },
      {
        n: "SP2",
        title: { ja: "『ガンダムビルドメタバース』特別編", en: null },
        ja: "2023-10-20",
      },
      {
        n: "G1",
        title: { ja: "ガンプラくん劇場", en: null },
        ja: "2024-12-02",
      },
      {
        n: "G2",
        title: { ja: "ガンプラくん劇場 哀・戦士編", en: null },
        ja: "2024-12-02",
      },
      {
        n: "G3",
        title: { ja: "ガンプラくん劇場 めぐりあい宇宙編", en: null },
        ja: "2024-12-02",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "streaming",
        label: "YouTube Gundam Channel (web series)",
        start: "2021-08-19",
        end: "2023-04-28",
        schedule: "simulcast",
      },
      {
        region: "ja",
        channel: "broadcast",
        label: "TV Special: ガンプラくん、ガンダムベース攻略戦 (TV Tokyo)",
        start: "2022-03-21",
        schedule: "theatrical",
      },
      {
        region: "ja",
        channel: "streaming",
        label: "ガンプラくん劇場 (YouTube)",
        start: "2024-12-02",
        schedule: "simulcast",
      },
    ],
  },
  sd_gundam_1988_ova: {
    title: {
      ja: "機動戦士SDガンダム",
      en: "Mobile Suit SD Gundam (OVA series)",
    },
    u: "sd",
    type: "ova",
    source: "https://ja.wikipedia.org/wiki/機動戦士SDガンダム",
    episodes: [
      {
        n: 1,
        title: {
          ja: "MK-I: Gekitou-hen / Kyuujitsu-hen / Kessen-hen",
          en: "MK-I: Gekitou-hen / Kyuujitsu-hen / Kessen-hen",
        },
        ja: "1988-05-25",
      },
      {
        n: 2,
        title: {
          ja: "MK-II: Korogaru Colony Jiken / Ganso Gundam Meibamen-shuu / Gandan Densetsu",
          en: "MK-II: Korogaru Colony Jiken / Ganso Gundam Meibamen-shuu / Gandan Densetsu",
        },
        ja: "1989-06-25",
      },
      {
        n: 3,
        title: {
          ja: "MK-III: Uchuu no Shinpi Daisakusen + SD Sengokuden (4 chapters)",
          en: "MK-III: Uchuu no Shinpi Daisakusen + SD Sengokuden (4 chapters)",
        },
        ja: "1990-03-25",
      },
      {
        n: 4,
        title: {
          ja: "MK-IV: Yume no Maron-sha + SD Gundam Mou Race",
          en: "MK-IV: Yume no Maron-sha + SD Gundam Mou Race",
        },
        ja: "1990-09-25",
      },
      {
        n: 5,
        title: {
          ja: "MK-V: Hakobiya Ri-Gazi no Kiseki + SD Sengokuden + SD Gundam Souseiki",
          en: "MK-V: Hakobiya Ri-Gazi no Kiseki + SD Sengokuden + SD Gundam Souseiki",
        },
        ja: "1990-10-25",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "home_video",
        label: "Bandai VHS / laserdisc",
        start: "1988-05-25",
        end: "1990-10-25",
        schedule: "box-set",
      },
    ],
  },
  sd_gundam_force_2004_tv: {
    title: { ja: "SDガンダムフォース", en: "Superior Defender Gundam Force" },
    u: "sd",
    type: "tv",
    source: "https://en.wikipedia.org/wiki/Superior_Defender_Gundam_Force",
    note: "First aired in US on Cartoon Network Sep 12 2004; in Japan Jan 22 2005 - Jan 27 2006 (52 ep total, weekly Saturday on TV Asahi)",
    episodes: [
      { n: 1, title: { ja: "その名はキャプテン", en: null }, ja: "2004-01-07" },
      {
        n: 2,
        title: { ja: "輝け！ソウルドライブ", en: null },
        ja: "2004-01-14",
      },
      { n: 3, title: { ja: "天駆ける騎士 ゼロ", en: null }, ja: "2004-01-21" },
      {
        n: 4,
        title: { ja: "敵のムサイ艦を叩け！", en: null },
        ja: "2004-01-28",
      },
      {
        n: 5,
        title: { ja: "結成！ガンダムフォース", en: null },
        ja: "2004-02-04",
      },
      {
        n: 6,
        title: { ja: "炎の武者、ネオトピアを征く", en: null },
        ja: "2004-02-11",
      },
      {
        n: 7,
        title: { ja: "激走！ガンバイカー！", en: null },
        ja: "2004-02-18",
      },
      {
        n: 8,
        title: { ja: "姫とケーキと翼の騎士", en: null },
        ja: "2004-02-25",
      },
      { n: 9, title: { ja: "爆熱丸奮闘記", en: null }, ja: "2004-03-03" },
      {
        n: 10,
        title: { ja: "必殺！トリプルアタック！", en: null },
        ja: "2004-03-10",
      },
      {
        n: 11,
        title: { ja: "迷宮のラクロア・前編", en: null },
        ja: "2004-03-17",
      },
      {
        n: 12,
        title: { ja: "迷宮のラクロア・中編", en: null },
        ja: "2004-03-24",
      },
      {
        n: 13,
        title: { ja: "迷宮のラクロア・後編", en: null },
        ja: "2004-03-31",
      },
      {
        n: 14,
        title: { ja: "ガンダムフォースの秘密にせまれ", en: null },
        ja: "2004-04-07",
      },
      {
        n: 15,
        title: { ja: "音速の翼　ガンイーグル！", en: null },
        ja: "2004-04-14",
      },
      {
        n: 16,
        title: { ja: "深海の覇者　ガンダイバー！", en: null },
        ja: "2004-04-21",
      },
      {
        n: 17,
        title: { ja: "新たな刺客、その名は阿修羅丸", en: null },
        ja: "2004-04-28",
      },
      {
        n: 18,
        title: { ja: "S.D.G.基地　危機一髪！", en: null },
        ja: "2004-05-05",
      },
      {
        n: 19,
        title: { ja: "決闘！爆熱丸対阿修羅丸", en: null },
        ja: "2004-05-12",
      },
      { n: 20, title: { ja: "フェンの災難", en: null }, ja: "2004-05-19" },
      {
        n: 21,
        title: { ja: "覚醒！フェザードラゴン", en: null },
        ja: "2004-05-26",
      },
      { n: 22, title: { ja: "ビグ・ザム強襲", en: null }, ja: "2004-06-02" },
      {
        n: 23,
        title: { ja: "発動！キャプテンシステム", en: null },
        ja: "2004-06-09",
      },
      {
        n: 24,
        title: { ja: "ピンチ！ソウルドライブ強奪", en: null },
        ja: "2004-06-16",
      },
      {
        n: 25,
        title: { ja: "ネオトピア最大の危機", en: null },
        ja: "2004-06-23",
      },
      {
        n: 26,
        title: { ja: "決戦！コマンダー対キャプテン", en: null },
        ja: "2004-06-30",
      },
      {
        n: 27,
        title: { ja: "突入！ダークアクシズ", en: null },
        ja: "2004-07-07",
      },
      { n: 28, title: { ja: "三つの道", en: null }, ja: "2004-07-14" },
      {
        n: 29,
        title: { ja: "必殺技封印！？ミノフス境海の脅威", en: null },
        ja: "2004-07-21",
      },
      {
        n: 30,
        title: { ja: "復活！俺たちが主役だ！？", en: null },
        ja: "2004-07-28",
      },
      { n: 31, title: { ja: "魔剣エピオン", en: null }, ja: "2004-08-04" },
      { n: 32, title: { ja: "エピオン強襲！", en: null }, ja: "2004-08-11" },
      {
        n: 33,
        title: { ja: "奪還！呪われしラクロア姫", en: null },
        ja: "2004-08-18",
      },
      {
        n: 34,
        title: { ja: "黒き衣のラクロア姫", en: null },
        ja: "2004-08-25",
      },
      {
        n: 35,
        title: { ja: "天下一等！元気丸〜っ！の巻", en: null },
        ja: "2004-09-01",
      },
      {
        n: 36,
        title: { ja: "おにぎりと英智の園", en: null },
        ja: "2004-09-08",
      },
      {
        n: 37,
        title: { ja: "激突！闇のデスサイズ", en: null },
        ja: "2004-09-15",
      },
      { n: 38, title: { ja: "リリ姫、復活！", en: null }, ja: "2004-09-22" },
      { n: 39, title: { ja: "ガーベラの呼び声", en: null }, ja: "2004-09-29" },
      { n: 40, title: { ja: "騎馬王丸、襲来！", en: null }, ja: "2004-10-06" },
      {
        n: 41,
        title: { ja: "囚われたシュウトとリリ", en: null },
        ja: "2004-10-13",
      },
      { n: 42, title: { ja: "戦乱の天宮", en: null }, ja: "2004-10-20" },
      {
        n: 43,
        title: { ja: "究極の一手！騎馬王丸対シュウト", en: null },
        ja: "2004-10-27",
      },
      { n: 44, title: { ja: "爆心丸、炎上！！", en: null }, ja: "2004-11-03" },
      {
        n: 45,
        title: { ja: "ガンダムフォース集合！！", en: null },
        ja: "2004-11-10",
      },
      { n: 46, title: { ja: "虚武羅丸の涙", en: null }, ja: "2004-11-17" },
      { n: 47, title: { ja: "起動！武者大神将", en: null }, ja: "2004-11-24" },
      {
        n: 48,
        title: { ja: "炎の天地城、元気丸の叫び！", en: null },
        ja: "2004-12-01",
      },
      {
        n: 49,
        title: { ja: "破滅への序曲、ガーベラの正体", en: null },
        ja: "2004-12-08",
      },
      {
        n: 50,
        title: { ja: "世界消失！？ジェネラルの脅威", en: null },
        ja: "2004-12-15",
      },
      {
        n: 51,
        title: { ja: "大決戦！ジェネラルVSみんな", en: null },
        ja: "2004-12-22",
      },
      { n: 52, title: { ja: "帰り道", en: null }, ja: "2004-12-29" },
    ],
    releases: [
      {
        region: "ja",
        channel: "broadcast",
        label: "TV Tokyo (Fridays 17:00)",
        start: "2004-01-07",
        end: "2004-12-29",
        schedule: "weekly",
      },
      {
        region: "en",
        channel: "broadcast",
        label: "Cartoon Network US",
        start: "2004",
        end: "2005",
        schedule: "weekly",
      },
    ],
  },
  sd_gundam_force_hakai_2004_film: {
    title: {
      ja: "SDガンダムフォース 破壊大将軍あらわる!! ザコ?",
      en: "SD Gundam Force: Hakai Taishougun Arawaru!! Zako?",
    },
    u: "sd",
    type: "film",
    source: "https://ja.wikipedia.org/wiki/SDガンダムフォース",
    note: "Short film screened with SD Gundam Force episodes",
    episodes: [
      {
        n: 1,
        title: {
          ja: "SDガンダムフォース 破壊大将軍あらわる!! ザコ?",
          en: "Hakai Taishougun Arawaru!! Zako?",
        },
        ja: "2004",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "theatrical",
        label: "Screened with SD Gundam Force",
        start: "2004",
        schedule: "theatrical",
      },
    ],
  },
  sd_gundam_gyakushuu_1989_film: {
    title: {
      ja: "機動戦士SDガンダムの逆襲",
      en: "Mobile Suit SD Gundam no Gyakushuu",
    },
    u: "sd",
    type: "film",
    source: "https://ja.wikipedia.org/wiki/機動戦士SDガンダム",
    note: "Double-billed with Char's Counterattack; contained Arashi wo Yobu Gakuensai + SD Sengokuden Bakuchuu Oujou no Shou",
    episodes: [
      {
        n: 1,
        title: {
          ja: "嵐を呼ぶ学園祭",
          en: "Arashi wo Yobu Gakuensai (Storming School Festival)",
        },
        ja: "1988-05-25",
      },
      {
        n: 2,
        title: {
          ja: "SD戦国伝 暴終丸の章",
          en: "SD Sengokuden Bakuchuu Oujou no Shou",
        },
        ja: "1989-07-15",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "theatrical",
        label: "Theatrical double-bill (CCA / Patlabor)",
        start: "1988-05-25",
        end: "1989-07-15",
        schedule: "theatrical",
      },
    ],
  },
  sd_gundam_kinkyuu_1991_film: {
    title: {
      ja: "武者騎士コマンドSDガンダム緊急出撃",
      en: "Musha Kishi Command SD Gundam Kinkyuu Shutsugeki",
    },
    u: "sd",
    type: "film",
    source:
      "https://ja.wikipedia.org/wiki/武者・騎士・コマンド_SDガンダム緊急出撃",
    note: "Theatrical short double-billed with Gundam F91",
    episodes: [
      {
        n: 1,
        title: {
          ja: "武者騎士コマンドSDガンダム緊急出撃",
          en: "Musha Kishi Command SD Gundam Kinkyuu Shutsugeki",
        },
        ja: "1991-03-16",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "theatrical",
        label: "Double-billed with Gundam F91",
        start: "1991-03-16",
        schedule: "theatrical",
      },
      {
        region: "ja",
        channel: "home_video",
        label: "Bandai VHS/laserdisc",
        start: "1991-08-22",
        schedule: "box-set",
      },
    ],
  },
  sd_gundam_matsuri_1993_film: {
    title: { ja: "SDガンダムまつり", en: "SD Gundam Matsuri" },
    u: "sd",
    type: "film",
    source: "https://ja.wikipedia.org/wiki/機動戦士SDガンダム",
    note: "Triple-bill anime film: SD Command Senki Super G-Arms + SD Sengokuden Tenkataiheiben + SD Gundam Gaiden Seikibutsu Monogatari",
    episodes: [
      {
        n: 1,
        title: {
          ja: "SDコマンド戦記ガンダムフォース SUPER G-ARMS",
          en: "SD Command Senki Gundam Force SUPER G-ARMS",
        },
        ja: "1993-03-13",
      },
      {
        n: 2,
        title: {
          ja: "SD戦国伝 天下泰平編",
          en: "SD Sengokuden Tenkataiheiben",
        },
        ja: "1993-03-13",
      },
      {
        n: 3,
        title: {
          ja: "SDガンダム外伝 聖機兵物語",
          en: "SD Gundam Gaiden Seikibutsu Monogatari (chapters 1-2)",
        },
        ja: "1993-03-13",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "theatrical",
        label: "Theatrical triple-bill",
        start: "1993-03-13",
        schedule: "theatrical",
      },
    ],
  },
  sd_gundam_sangoku_soketsuden_2019_ona: {
    title: {
      ja: "SDガンダムワールド 三国創傑伝",
      en: "SD Gundam World Sangoku Soketsuden",
    },
    u: "sd",
    type: "ona",
    source: "https://en.wikipedia.org/wiki/SD_Gundam_World_Sangoku_Soketsuden",
    episodes: [
      {
        n: 1,
        title: { ja: "Dragon's Watch", en: "Dragon's Watch" },
        ja: "2019-07-26",
      },
      {
        n: 2,
        title: { ja: "Feel A Future", en: "Feel A Future" },
        ja: "2019-08-23",
      },
      { n: 3, title: { ja: "Blue Wing", en: "Blue Wing" }, ja: "2019-09-29" },
      { n: 4, title: { ja: "Red Tiger", en: "Red Tiger" }, ja: "2019-10-25" },
      {
        n: 5,
        title: { ja: "Three Spirits", en: "Three Spirits" },
        ja: "2019-11-22",
      },
      {
        n: 6,
        title: { ja: "Magma Power", en: "Magma Power" },
        ja: "2019-12-27",
      },
      {
        n: 7,
        title: { ja: "Yellow Pandemic", en: "Yellow Pandemic" },
        ja: "2020-01-24",
      },
      {
        n: 8,
        title: { ja: "BUG Eclipse", en: "BUG Eclipse" },
        ja: "2021-03-18",
      },
      { n: 9, title: { ja: "Libra", en: "Libra" }, ja: "2021-03-25" },
      { n: 10, title: { ja: "Try Alive", en: "Try Alive" }, ja: "2021-03-25" },
    ],
    releases: [
      {
        region: "ja",
        channel: "streaming",
        label: "YouTube / Bandai Channel",
        start: "2019-07-25",
        end: "2021-04-08",
        schedule: "simulcast",
      },
      {
        region: "en",
        channel: "streaming",
        label: "Gundam.info YouTube",
        start: "2019",
        schedule: "simulcast",
      },
    ],
  },
  sd_gundam_sangokuden_2010_tv: {
    title: {
      ja: "BB戦士三国伝",
      en: "SD Gundam Sangokuden Brave Battle Warriors",
    },
    u: "sd",
    type: "tv",
    source:
      "https://en.wikipedia.org/wiki/SD_Gundam_Sangokuden_Brave_Battle_Warriors",
    note: "Three Kingdoms-themed SD Gundam, weekly Sat from April 3 2010",
    episodes: [
      {
        n: 1,
        title: { ja: "英雄登場", en: "Birth of a Hero" },
        ja: "2010-04-03",
      },
      { n: 2, title: { ja: "出会い", en: "Encounter" }, ja: "2010-04-10" },
      {
        n: 3,
        title: { ja: "民のために", en: "For the People" },
        ja: "2010-04-17",
      },
      { n: 4, title: { ja: "暗殺者", en: "Assassin" }, ja: "2010-04-24" },
      {
        n: 5,
        title: { ja: "群雄集結", en: "The Heroes Gather" },
        ja: "2010-05-01",
      },
      {
        n: 6,
        title: { ja: "目標は虎牢関", en: "Capture the Koroukan" },
        ja: "2010-05-08",
      },
      {
        n: 7,
        title: { ja: "激突! 曹操対呂布", en: "Clash! Sousou vs Ryofu" },
        ja: "2010-05-15",
      },
      {
        n: 8,
        title: {
          ja: "たぎれ! 戦慄の暴将",
          en: "The Fearsome Generals Battle!",
        },
        ja: "2010-05-22",
      },
      {
        n: 9,
        title: { ja: "炎上! 光の都", en: "In Flames! Capital of Light" },
        ja: "2010-05-29",
      },
      { n: 10, title: { ja: "孫堅死す", en: "Sonken Dies" }, ja: "2010-06-05" },
      {
        n: 11,
        title: { ja: "趙雲推参!", en: "Chou-un Joins!" },
        ja: "2010-06-12",
      },
      {
        n: 12,
        title: { ja: "決戦前夜", en: "On the Eve of the Final Battle" },
        ja: "2010-06-19",
      },
      {
        n: 13,
        title: { ja: "発現! 天玉鎧", en: "It Descends! The Tengyokugai" },
        ja: "2010-06-26",
      },
      {
        n: 14,
        title: { ja: "劉備出立", en: "Ryuubi Departs" },
        ja: "2010-07-03",
      },
      {
        n: 15,
        title: { ja: "強き者と弱き者", en: "Rulers and Subjects" },
        ja: "2010-07-10",
      },
      {
        n: 16,
        title: { ja: "戦慄の幻影", en: "Mirage of Terror" },
        ja: "2010-07-17",
      },
      { n: 17, title: { ja: "新天地", en: "New Home" }, ja: "2010-07-24" },
      {
        n: 18,
        title: { ja: "江東の小覇王", en: "Little Conqueror of Koutou" },
        ja: "2010-07-31",
      },
      {
        n: 19,
        title: { ja: "皇帝宣言", en: "Emperor Declared" },
        ja: "2010-08-07",
      },
      {
        n: 20,
        title: { ja: "徐州陥落", en: "Joshuu Falls" },
        ja: "2010-08-14",
      },
      {
        n: 21,
        title: { ja: "劉備の選択", en: "Decision of Ryuubi" },
        ja: "2010-08-21",
      },
      {
        n: 22,
        title: { ja: "裏切りの城", en: "Castle of Betrayal" },
        ja: "2010-08-28",
      },
      {
        n: 23,
        title: { ja: "天と地", en: "Heaven and Earth" },
        ja: "2010-09-04",
      },
      {
        n: 24,
        title: { ja: "小覇王の挑戦", en: "Challenge of the Little Conqueror" },
        ja: "2010-09-11",
      },
      {
        n: 25,
        title: { ja: "さらば! 孫策", en: "Farewell! Sonsaku" },
        ja: "2010-09-18",
      },
      {
        n: 26,
        title: { ja: "真（まこと）の勇気", en: "Courage of Truth" },
        ja: "2010-09-25",
      },
      {
        n: 27,
        title: { ja: "暴れん坊見参!", en: "Ahoy, Ye Chaotic Corsairs!" },
        ja: "2010-10-02",
      },
      {
        n: 28,
        title: { ja: "江東の碧眼児", en: "Blue-eyed Children of Koutou" },
        ja: "2010-10-09",
      },
      {
        n: 29,
        title: { ja: "劉備の帰還（総集編1）", en: "Feedback of Ryuubi" },
        ja: "2010-10-16",
      },
      {
        n: 30,
        title: { ja: "再会、幽州（総集編2）", en: "Reunion, Yuushu" },
        ja: "2010-10-23",
      },
      {
        n: 31,
        title: { ja: "激闘白馬陣", en: "Fierce Fighting Hakuba Jin" },
        ja: "2010-10-30",
      },
      {
        n: 32,
        title: { ja: "関羽咆哮!", en: "Kan-u Roars!" },
        ja: "2010-11-06",
      },
      {
        n: 33,
        title: { ja: "冀州百万軍", en: "Kishuu's Million Troops" },
        ja: "2010-11-13",
      },
      {
        n: 34,
        title: { ja: "黄昏、易京楼", en: "Sunset, Ekikyourou" },
        ja: "2010-11-20",
      },
      {
        n: 35,
        title: { ja: "全軍官渡へ", en: "All Troops to Kanto" },
        ja: "2010-11-27",
      },
      {
        n: 36,
        title: { ja: "官渡の戦い", en: "Battle of Kanto" },
        ja: "2010-12-04",
      },
      { n: 37, title: { ja: "決別", en: "Farewell" }, ja: "2010-12-11" },
      {
        n: 38,
        title: { ja: "天に選ばれし覇者", en: "Champion Chosen by the Heavens" },
        ja: "2010-12-18",
      },
      {
        n: 39,
        title: { ja: "天に挑んだ修羅", en: "Shura Challenges the Heavens" },
        ja: "2010-12-25",
      },
      {
        n: 40,
        title: { ja: "千里を越えた絆", en: "Bonds Beyond a Thousand Miles" },
        ja: "2011-01-01",
      },
      {
        n: 41,
        title: {
          ja: "伏竜、天を翔ける",
          en: "Fukuryuu, Soaring to the Heavens",
        },
        ja: "2011-01-08",
      },
      {
        n: 42,
        title: {
          ja: "受け継いだ勇気（総集編3）",
          en: "Inheriting the Courage",
        },
        ja: "2011-01-15",
      },
      {
        n: 43,
        title: { ja: "天下三分の計", en: "Stratagem of 3-Way Division" },
        ja: "2011-01-22",
      },
      {
        n: 44,
        title: { ja: "龍帝剣、墜つ", en: "Ryuuteiken, Fallen One" },
        ja: "2011-01-29",
      },
      {
        n: 45,
        title: { ja: "激震! 長坂橋", en: "Shocking! Chouhankyou" },
        ja: "2011-02-05",
      },
      {
        n: 46,
        title: { ja: "孫権立つ", en: "Sonken Stands" },
        ja: "2011-02-12",
      },
      {
        n: 47,
        title: {
          ja: "天雷火砲",
          en: "Tenraikahou (Fire Cannon of Thunder Strike)",
        },
        ja: "2011-02-19",
      },
      {
        n: 48,
        title: { ja: "赤壁大決戦", en: "Battle of Red Cliffs" },
        ja: "2011-02-26",
      },
      {
        n: 49,
        title: { ja: "長江燃ゆ", en: "Choukou Burns" },
        ja: "2011-03-05",
      },
      {
        n: 50,
        title: { ja: "龍の輝き", en: "Radiance of the Dragon" },
        ja: "2011-03-12",
      },
      {
        n: 51,
        title: { ja: "三国の志", en: "Legacy of the Three Kingdoms" },
        ja: "2011-03-19",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "broadcast",
        label: "TV Tokyo",
        start: "2010-04-03",
        end: "2011-03-26",
        schedule: "weekly",
      },
    ],
  },
  sd_gundam_world_heroes_2021_ona: {
    title: {
      ja: "SDガンダムワールド ヒーローズ",
      en: "SD Gundam World Heroes",
    },
    u: "sd",
    type: "ona",
    source: "https://en.wikipedia.org/wiki/SD_Gundam_World_Heroes",
    note: "Streamed weekly on Gundam Info YouTube channel from April 8 2021",
    episodes: [
      {
        n: 1,
        title: { ja: "落ちてきた運命", en: "Falling Destiny" },
        ja: "2021-04-08",
      },
      {
        n: 2,
        title: { ja: "正義を呼ぶ声", en: "A Voice That Calls for Justice" },
        ja: "2021-04-15",
      },
      {
        n: 3,
        title: { ja: "もうひとりの悟空", en: "Another Wukong" },
        ja: "2021-04-22",
      },
      {
        n: 4,
        title: { ja: "大海原を越えて", en: "Across the Wilderness of the Sea" },
        ja: "2021-04-29",
      },
      {
        n: 5,
        title: { ja: "怨念の海底宮殿", en: "The Underwater Palace Of Enmity" },
        ja: "2021-05-06",
      },
      {
        n: 6,
        title: { ja: "魔王再臨", en: "The Demon King Has Come" },
        ja: "2021-05-13",
      },
      {
        n: 7,
        title: { ja: "裏切りの桔梗", en: "Traitor's Bellflower" },
        ja: "2021-05-20",
      },
      {
        n: 8,
        title: { ja: "第三の悟空", en: "A Third Wukong" },
        ja: "2021-05-27",
      },
      {
        n: 9,
        title: {
          ja: "敵か?味方か?怪盗X",
          en: "A Friend? A Foe? Phantom Thief X",
        },
        ja: "2021-06-03",
      },
      {
        n: 10,
        title: { ja: "忍び込め！夜の博物館", en: "Sneak In! The Night Museum" },
        ja: "2021-06-10",
      },
      {
        n: 11,
        title: { ja: "月はそこにある", en: "The Moon is There" },
        ja: "2021-06-17",
      },
      {
        n: 12,
        title: { ja: "悟空の使命", en: "Wukong's Mission" },
        ja: "2021-06-24",
      },
      {
        n: 13,
        title: {
          ja: "若き龍との出会い",
          en: "Encounter with the Young Dragon",
        },
        ja: "2021-07-01",
      },
      {
        n: 14,
        title: { ja: "紫黒の謀略", en: "Shikoku's Stratagem" },
        ja: "2021-07-08",
      },
      {
        n: 15,
        title: { ja: "歪められた正義", en: "Twisted Justice" },
        ja: "2021-07-15",
      },
      {
        n: 16,
        title: { ja: "悔恨の日々", en: "Days of Regret" },
        ja: "2021-07-22",
      },
      {
        n: 17,
        title: { ja: "騎士の矜持", en: "A Knight's Honor" },
        ja: "2021-07-29",
      },
      {
        n: 18,
        title: { ja: "誇り高き刀鍛冶", en: "Proud Swordsmith" },
        ja: "2021-08-05",
      },
      {
        n: 19,
        title: { ja: "悟空の記憶", en: "Wukong's Memories" },
        ja: "2021-08-12",
      },
      {
        n: 20,
        title: { ja: "魔王、再び", en: "Return of the Demon King" },
        ja: "2021-08-19",
      },
      {
        n: 21,
        title: { ja: "愛のカタチ", en: "The Shape of Love" },
        ja: "2021-08-26",
      },
      {
        n: 22,
        title: { ja: "窮奇、襲来", en: "Qiongqi Attacks" },
        ja: "2021-09-02",
      },
      {
        n: 23,
        title: { ja: "悟空の正体", en: "The Truth of Wukong" },
        ja: "2021-09-09",
      },
      {
        n: 24,
        title: { ja: "選んだ未来", en: "Chosen Future" },
        ja: "2021-09-16",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "streaming",
        label: "YouTube / Bandai Channel",
        start: "2021-04-22",
        end: "2021-12-16",
        schedule: "simulcast",
      },
      {
        region: "en",
        channel: "streaming",
        label: "Gundam.info YouTube",
        start: "2021",
        schedule: "simulcast",
      },
    ],
  },
  sd_gundam_world_sangoku_special_2020_ova: {
    title: {
      ja: "SDガンダムワールド三国創傑伝",
      en: "SD Gundam World Sangoku Soketsuden: Brave Battle Warriors",
    },
    u: "sd",
    type: "ova",
    source: "https://gundam.fandom.com/wiki/SD_Gundam_World_Sangoku_Soketsuden",
    note: "Special OVA episodes of Sangoku Soketsuden",
    episodes: [
      {
        n: 1,
        title: {
          ja: "SDガンダムワールド三国創傑伝",
          en: "Brave Battle Warriors Special",
        },
        ja: "2020",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "streaming",
        label: "YouTube Gundam Channel",
        start: "2020",
        schedule: "simulcast",
      },
    ],
  },
  sd_sangokuden_2010_film: {
    title: {
      ja: "超電影版SDガンダム三国伝 Brave Battle Warriors",
      en: "Chō Denei-ban SD Gundam Sangokuden Brave Battle Warriors",
    },
    u: "sd",
    type: "film",
    source:
      "https://en.wikipedia.org/wiki/SD_Gundam_Sangokuden_Brave_Battle_Warriors",
    episodes: [
      {
        n: 1,
        title: {
          ja: "超電影版SDガンダム三国伝 Brave Battle Warriors",
          en: "Chō Denei-ban",
        },
        ja: "2010-02-27",
      },
    ],
    releases: [
      {
        region: "ja",
        channel: "theatrical",
        label: "Theatrical release",
        start: "2010-02-27",
        schedule: "theatrical",
      },
    ],
  },
};
