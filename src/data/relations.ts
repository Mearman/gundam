export type RelationType =
  | "adapted_from"
  | "alternate_version"
  | "compilation_of"
  | "prequel_to"
  | "reboot_of"
  | "reedit_of"
  | "sequel_to"
  | "side_story_of"
  | "spinoff_from";

export interface EntryRelation {
  from: string;
  type: RelationType;
  to: string;
}

export const ENTRY_RELATIONS: EntryRelation[] = [
  {
    from: "msg_1981_compilation_films",
    type: "compilation_of",
    to: "msg_1979_tv",
  },
  {
    from: "msg_tomino_novel_trilogy",
    type: "alternate_version",
    to: "msg_1979_tv",
  },
  { from: "msg_0079_kondo_manga", type: "adapted_from", to: "msg_1979_tv" },
  { from: "msg_okazaki_manga", type: "adapted_from", to: "msg_1979_tv" },
  { from: "gundam_san_manga", type: "spinoff_from", to: "msg_1979_tv" },
  { from: "gundam_san_2014_tv", type: "adapted_from", to: "gundam_san_manga" },
  { from: "gundam_g40_2020_ona", type: "adapted_from", to: "msg_1979_tv" },
  { from: "zero80_1989_ova", type: "side_story_of", to: "msg_1979_tv" },
  { from: "msteam08_1996_ova", type: "side_story_of", to: "msg_1979_tv" },
  { from: "blue_destiny_1997_manga", type: "side_story_of", to: "msg_1979_tv" },
  {
    from: "lost_war_chronicles_2002_manga",
    type: "side_story_of",
    to: "msg_1979_tv",
  },
  { from: "developers_2004_manga", type: "side_story_of", to: "msg_1979_tv" },
  {
    from: "ecole_du_ciel_2002_manga",
    type: "side_story_of",
    to: "msg_1979_tv",
  },
  {
    from: "requiem_for_vengeance_2024_ona",
    type: "side_story_of",
    to: "msg_1979_tv",
  },
  { from: "green_divers_2001_film", type: "side_story_of", to: "msg_1979_tv" },
  {
    from: "battlefield_record_2009_ova",
    type: "side_story_of",
    to: "msg_1979_tv",
  },
  {
    from: "gundam_perfect_mission_2009_ova",
    type: "spinoff_from",
    to: "msg_1979_tv",
  },
  {
    from: "johnny_ridden_2010_manga",
    type: "side_story_of",
    to: "msg_1979_tv",
  },
  { from: "msteam08_manga", type: "adapted_from", to: "msteam08_1996_ova" },
  {
    from: "msteam08_1999_novel",
    type: "adapted_from",
    to: "msteam08_1996_ova",
  },
  {
    from: "msteam08_millers_report_1998_film",
    type: "compilation_of",
    to: "msteam08_1996_ova",
  },
  {
    from: "msteam08_3d_2013_special",
    type: "side_story_of",
    to: "msteam08_1996_ova",
  },
  { from: "origin_2001_manga", type: "prequel_to", to: "msg_1979_tv" },
  { from: "origin_2015_ova", type: "adapted_from", to: "origin_2001_manga" },
  { from: "origin_advent_2019_tv", type: "reedit_of", to: "origin_2015_ova" },
  {
    from: "origin_movie_edition_2024_film",
    type: "reedit_of",
    to: "origin_2015_ova",
  },
  {
    from: "origin_msd_doan_2016_manga",
    type: "spinoff_from",
    to: "origin_2001_manga",
  },
  {
    from: "cucuruz_doan_2022_film",
    type: "adapted_from",
    to: "origin_msd_doan_2016_manga",
  },
  { from: "zz_1986_tv", type: "sequel_to", to: "zeta_1985_tv" },
  {
    from: "zeta_new_translation_2005_films",
    type: "compilation_of",
    to: "zeta_1985_tv",
  },
  { from: "zeta_define_2011_manga", type: "adapted_from", to: "zeta_1985_tv" },
  {
    from: "advance_of_zeta_wings_2002_manga",
    type: "side_story_of",
    to: "zeta_1985_tv",
  },
  {
    from: "advance_of_zeta_titans_2012_manga",
    type: "sequel_to",
    to: "advance_of_zeta_wings_2002_manga",
  },
  {
    from: "advance_of_zeta_traitor_2014_manga",
    type: "sequel_to",
    to: "advance_of_zeta_titans_2012_manga",
  },
  { from: "sentinel_1988_novel", type: "side_story_of", to: "zeta_1985_tv" },
  { from: "cda_2002_manga", type: "prequel_to", to: "zeta_1985_tv" },
  {
    from: "chars_counterattack_1988_film",
    type: "sequel_to",
    to: "zz_1986_tv",
  },
  {
    from: "beltorchikas_children_1988_novel",
    type: "alternate_version",
    to: "chars_counterattack_1988_film",
  },
  {
    from: "high_streamer_1987_novel",
    type: "adapted_from",
    to: "chars_counterattack_1988_film",
  },
  {
    from: "hathaway_flash_1989_novel",
    type: "sequel_to",
    to: "chars_counterattack_1988_film",
  },
  {
    from: "hathaway_manga_2020_manga",
    type: "adapted_from",
    to: "hathaway_flash_1989_novel",
  },
  {
    from: "hathaway_2021_film",
    type: "adapted_from",
    to: "hathaway_flash_1989_novel",
  },
  { from: "hathaway_2021_film", type: "sequel_to", to: "narrative_2018_film" },
  {
    from: "hathaway_sorcery_2026_film",
    type: "sequel_to",
    to: "hathaway_2021_film",
  },
  {
    from: "hathaway_chokou_tba_film",
    type: "sequel_to",
    to: "hathaway_sorcery_2026_film",
  },
  {
    from: "f91_1991_film",
    type: "sequel_to",
    to: "chars_counterattack_1988_film",
  },
  { from: "victory_1993_tv", type: "sequel_to", to: "f91_1991_film" },
  { from: "gsaviour_2000_film", type: "sequel_to", to: "victory_1993_tv" },
  { from: "crossbone_1994_manga", type: "sequel_to", to: "f91_1991_film" },
  {
    from: "crossbone_skullheart_2002_manga",
    type: "sequel_to",
    to: "crossbone_1994_manga",
  },
  {
    from: "crossbone_steelseven_2006_manga",
    type: "sequel_to",
    to: "crossbone_skullheart_2002_manga",
  },
  {
    from: "crossbone_ghost_2011_manga",
    type: "sequel_to",
    to: "crossbone_steelseven_2006_manga",
  },
  {
    from: "crossbone_dust_2016_manga",
    type: "sequel_to",
    to: "crossbone_ghost_2011_manga",
  },
  {
    from: "crossbone_x11_2021_manga",
    type: "side_story_of",
    to: "crossbone_dust_2016_manga",
  },
  {
    from: "crossbone_lovepiece_2022_manga",
    type: "side_story_of",
    to: "crossbone_1994_manga",
  },
  {
    from: "crossbone_seeraeuber_2024_manga",
    type: "sequel_to",
    to: "crossbone_lovepiece_2022_manga",
  },
  {
    from: "crossbone_zeroiber_2024_manga",
    type: "prequel_to",
    to: "crossbone_1994_manga",
  },
  { from: "zero83_1991_ova", type: "prequel_to", to: "zeta_1985_tv" },
  {
    from: "zero83_rebellion_manga",
    type: "adapted_from",
    to: "zero83_1991_ova",
  },
  { from: "re010_2022_manga", type: "side_story_of", to: "zero83_1991_ova" },
  { from: "mayfly_2001_manga", type: "side_story_of", to: "zero83_1991_ova" },
  {
    from: "zero83_afterglow_1992_film",
    type: "compilation_of",
    to: "zero83_1991_ova",
  },
  {
    from: "msigloo_apocalypse_2006_ova",
    type: "sequel_to",
    to: "msigloo_hidden_2004_ova",
  },
  {
    from: "msigloo2_gravity_front_2008_ova",
    type: "spinoff_from",
    to: "msigloo_hidden_2004_ova",
  },
  {
    from: "unicorn_2007_novel",
    type: "sequel_to",
    to: "chars_counterattack_1988_film",
  },
  { from: "unicorn_2010_ova", type: "adapted_from", to: "unicorn_2007_novel" },
  { from: "unicorn_re0096_2016_tv", type: "reedit_of", to: "unicorn_2010_ova" },
  {
    from: "unicorn_bd_2010_manga",
    type: "alternate_version",
    to: "unicorn_2007_novel",
  },
  {
    from: "moon_gundam_2017_manga",
    type: "side_story_of",
    to: "unicorn_2007_novel",
  },
  {
    from: "silver_phantom_2024_vr",
    type: "side_story_of",
    to: "unicorn_2010_ova",
  },
  { from: "narrative_2018_film", type: "sequel_to", to: "unicorn_2010_ova" },
  {
    from: "narrative_2018_novel",
    type: "adapted_from",
    to: "narrative_2018_film",
  },
  { from: "twilight_axis_2017_ona", type: "sequel_to", to: "unicorn_2010_ova" },
  {
    from: "twilight_axis_red_trace_2017_film",
    type: "compilation_of",
    to: "twilight_axis_2017_ona",
  },
  {
    from: "thunderbolt_2015_ona",
    type: "adapted_from",
    to: "thunderbolt_2012_manga",
  },
  {
    from: "thunderbolt_december_sky_2016_film",
    type: "reedit_of",
    to: "thunderbolt_2015_ona",
  },
  {
    from: "thunderbolt_bandit_flower_2017_film",
    type: "sequel_to",
    to: "thunderbolt_december_sky_2016_film",
  },
  {
    from: "gaia_gear_1992_radio",
    type: "adapted_from",
    to: "gaia_gear_1987_novel",
  },
  {
    from: "gaia_gear_1987_novel",
    type: "sequel_to",
    to: "chars_counterattack_1988_film",
  },
  { from: "seed_2003_manga", type: "adapted_from", to: "seed_2002_tv" },
  {
    from: "seed_special_2004_films",
    type: "compilation_of",
    to: "seed_2002_tv",
  },
  {
    from: "seed_after_phase_2004_ova",
    type: "side_story_of",
    to: "seed_2002_tv",
  },
  {
    from: "seed_msv_astray_2004_ova",
    type: "side_story_of",
    to: "seed_2002_tv",
  },
  { from: "seed_astray_manga", type: "side_story_of", to: "seed_2002_tv" },
  {
    from: "seed_astray_r_2004_manga",
    type: "side_story_of",
    to: "seed_2002_tv",
  },
  {
    from: "seed_eclipse_2021_manga",
    type: "side_story_of",
    to: "seed_2002_tv",
  },
  { from: "reseed_2024_manga", type: "adapted_from", to: "seed_2002_tv" },
  {
    from: "seed_x_astray_2003_manga",
    type: "sequel_to",
    to: "seed_astray_manga",
  },
  { from: "seed_destiny_2004_tv", type: "sequel_to", to: "seed_2002_tv" },
  {
    from: "seed_destiny_magazine_z_manga",
    type: "adapted_from",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_destiny_special_2006_films",
    type: "compilation_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_destiny_final_plus_2005_special",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_destiny_edge_2005_manga",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_destiny_edge_desire_2008_manga",
    type: "sequel_to",
    to: "seed_destiny_edge_2005_manga",
  },
  {
    from: "seed_destiny_astray_2004_manga",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_delta_astray_2006_manga",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_frame_astrays_2007_manga",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_vs_astray_2010_manga",
    type: "sequel_to",
    to: "seed_frame_astrays_2007_manga",
  },
  {
    from: "seed_astray_b_2012_manga",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_destiny_astray_r_2013_manga",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_stargazer_2006_ona",
    type: "side_story_of",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_stargazer_compilation_2006_ova",
    type: "compilation_of",
    to: "seed_stargazer_2006_ona",
  },
  {
    from: "seed_freedom_2024_film",
    type: "sequel_to",
    to: "seed_destiny_2004_tv",
  },
  {
    from: "seed_freedom_2024_manga",
    type: "adapted_from",
    to: "seed_freedom_2024_film",
  },
  { from: "seed_freedom_zero_tba", type: "prequel_to", to: "seed_2002_tv" },
  { from: "wing_opmeteor_1996_ova", type: "side_story_of", to: "wing_1995_tv" },
  { from: "wing_endlesswaltz_1997_ova", type: "sequel_to", to: "wing_1995_tv" },
  {
    from: "wing_endlesswaltz_1998_film",
    type: "reedit_of",
    to: "wing_endlesswaltz_1997_ova",
  },
  { from: "wing_episode_zero_manga", type: "prequel_to", to: "wing_1995_tv" },
  {
    from: "wing_battlefield_pacifist_1998_manga",
    type: "sequel_to",
    to: "wing_endlesswaltz_1997_ova",
  },
  {
    from: "wing_blind_target_1998_manga",
    type: "side_story_of",
    to: "wing_1995_tv",
  },
  {
    from: "wing_glory_of_the_losers_manga",
    type: "adapted_from",
    to: "wing_1995_tv",
  },
  {
    from: "wing_frozen_teardrop_novel",
    type: "sequel_to",
    to: "wing_endlesswaltz_1997_ova",
  },
  {
    from: "wing_frozen_teardrop_manga",
    type: "adapted_from",
    to: "wing_frozen_teardrop_novel",
  },
  { from: "wing_new_visual_tba", type: "sequel_to", to: "wing_1995_tv" },
  { from: "g_gundam_1994_manga", type: "adapted_from", to: "g_gundam_1994_tv" },
  { from: "g_gundam_1995_novel", type: "adapted_from", to: "g_gundam_1994_tv" },
  {
    from: "g_gundam_fight_7th_1996_manga",
    type: "prequel_to",
    to: "g_gundam_1994_tv",
  },
  {
    from: "super_g_gundam_2010_manga",
    type: "adapted_from",
    to: "g_gundam_1994_tv",
  },
  { from: "turn_a_2002_films", type: "compilation_of", to: "turn_a_1999_tv" },
  { from: "turn_a_manga", type: "adapted_from", to: "turn_a_1999_tv" },
  {
    from: "reconguista_films_2019",
    type: "compilation_of",
    to: "reconguista_2014_tv",
  },
  { from: "reconguista_2014_tv", type: "sequel_to", to: "turn_a_1999_tv" },
  { from: "gundam00_manga", type: "adapted_from", to: "gundam00_2007_tv" },
  {
    from: "gundam00_special_edition_2009_ova",
    type: "compilation_of",
    to: "gundam00_2007_tv",
  },
  { from: "gundam00_2010_film", type: "sequel_to", to: "gundam00_2007_tv" },
  { from: "gundam00p_2007_manga", type: "prequel_to", to: "gundam00_2007_tv" },
  {
    from: "gundam00f_2008_manga",
    type: "side_story_of",
    to: "gundam00_2007_tv",
  },
  {
    from: "gundam00v_2008_manga",
    type: "side_story_of",
    to: "gundam00_2007_tv",
  },
  {
    from: "gundam00i_2009_manga",
    type: "side_story_of",
    to: "gundam00_2007_tv",
  },
  {
    from: "gundam00i_2314_2010_manga",
    type: "sequel_to",
    to: "gundam00i_2009_manga",
  },
  {
    from: "gundam00n_2012_manga",
    type: "side_story_of",
    to: "gundam00_2007_tv",
  },
  { from: "age_novel_2012", type: "adapted_from", to: "age_2011_tv" },
  {
    from: "age_memory_of_eden_2013_ova",
    type: "compilation_of",
    to: "age_2011_tv",
  },
  {
    from: "ibo_steel_moon_2016_manga",
    type: "side_story_of",
    to: "ibo_2015_tv",
  },
  { from: "ibo_gekkou_2016_manga", type: "side_story_of", to: "ibo_2015_tv" },
  { from: "ibo_urdrhunt_2022_ona", type: "sequel_to", to: "ibo_2015_tv" },
  {
    from: "ibo_urdrhunt_movie_2025_film",
    type: "compilation_of",
    to: "ibo_urdrhunt_2022_ona",
  },
  { from: "ibo_makan_tba_film", type: "sequel_to", to: "ibo_2015_tv" },
  {
    from: "wfm_vanadis_heart_manga",
    type: "prequel_to",
    to: "witch_from_mercury_2022_tv",
  },
  {
    from: "gunpla_builders_beginning_g_2010_ova",
    type: "spinoff_from",
    to: "msg_1979_tv",
  },
  {
    from: "build_fighters_2013_tv",
    type: "sequel_to",
    to: "gunpla_builders_beginning_g_2010_ova",
  },
  {
    from: "build_fighters_try_2014_tv",
    type: "sequel_to",
    to: "build_fighters_2013_tv",
  },
  {
    from: "build_fighters_try_island_wars_2016_ova",
    type: "sequel_to",
    to: "build_fighters_try_2014_tv",
  },
  {
    from: "build_fighters_battlogue_2017_ona",
    type: "sequel_to",
    to: "build_fighters_try_2014_tv",
  },
  {
    from: "build_fighters_gm_counterattack_2017_ona",
    type: "sequel_to",
    to: "build_fighters_2013_tv",
  },
  {
    from: "build_divers_2018_tv",
    type: "sequel_to",
    to: "build_fighters_try_2014_tv",
  },
  {
    from: "build_divers_manga",
    type: "adapted_from",
    to: "build_divers_2018_tv",
  },
  {
    from: "build_divers_battlogue_2020_ona",
    type: "sequel_to",
    to: "build_divers_2018_tv",
  },
  {
    from: "build_divers_rerise_2019_ona",
    type: "sequel_to",
    to: "build_divers_2018_tv",
  },
  {
    from: "build_divers_rerise_manga",
    type: "adapted_from",
    to: "build_divers_rerise_2019_ona",
  },
  {
    from: "build_metaverse_2023_ona",
    type: "sequel_to",
    to: "build_divers_rerise_2019_ona",
  },
  {
    from: "build_real_2021_live",
    type: "spinoff_from",
    to: "build_divers_2018_tv",
  },
  {
    from: "breaker_battlogue_2021_ona",
    type: "spinoff_from",
    to: "build_divers_rerise_2019_ona",
  },
  {
    from: "gundam_exa_2011_manga",
    type: "spinoff_from",
    to: "build_fighters_2013_tv",
  },
  {
    from: "gundam_exa_vs_2014_manga",
    type: "sequel_to",
    to: "gundam_exa_2011_manga",
  },
  {
    from: "sd_gundam_gyakushuu_1989_film",
    type: "sequel_to",
    to: "sd_gundam_1988_ova",
  },
  {
    from: "sd_gundam_matsuri_1993_film",
    type: "sequel_to",
    to: "sd_gundam_gyakushuu_1989_film",
  },
  {
    from: "sd_gundam_kinkyuu_1991_film",
    type: "spinoff_from",
    to: "sd_gundam_1988_ova",
  },
  {
    from: "sd_gundam_force_hakai_2004_film",
    type: "side_story_of",
    to: "sd_gundam_force_2004_tv",
  },
  {
    from: "sd_gundam_sangokuden_2010_tv",
    type: "spinoff_from",
    to: "sd_gundam_force_2004_tv",
  },
  {
    from: "sd_sangokuden_2010_film",
    type: "compilation_of",
    to: "sd_gundam_sangokuden_2010_tv",
  },
  {
    from: "sd_gundam_sangoku_soketsuden_2019_ona",
    type: "reboot_of",
    to: "sd_gundam_sangokuden_2010_tv",
  },
  {
    from: "sd_gundam_world_sangoku_special_2020_ova",
    type: "compilation_of",
    to: "sd_gundam_sangoku_soketsuden_2019_ona",
  },
  {
    from: "sd_gundam_world_heroes_2021_ona",
    type: "sequel_to",
    to: "sd_gundam_sangoku_soketsuden_2019_ona",
  },
  {
    from: "gquuuuuux_beginning_2025_film",
    type: "prequel_to",
    to: "gquuuuuux_2025_tv",
  },
  { from: "gquuuuuux_2025_tv", type: "alternate_version", to: "msg_1979_tv" },
  {
    from: "for_the_barrel_2000_novel",
    type: "alternate_version",
    to: "msg_1979_tv",
  },
  {
    from: "gunpla_kun_2022_tv",
    type: "spinoff_from",
    to: "build_divers_rerise_2019_ona",
  },
  { from: "x_1996_tv", type: "alternate_version", to: "msg_1979_tv" },
  { from: "gundam_evolve_2001_ova", type: "spinoff_from", to: "msg_1979_tv" },
  {
    from: "mission_to_the_rise_1998_film",
    type: "alternate_version",
    to: "msg_1979_tv",
  },
  {
    from: "ring_of_gundam_2009_film",
    type: "alternate_version",
    to: "msg_1979_tv",
  },
  { from: "gundam_legendary_tba", type: "adapted_from", to: "msg_1979_tv" },
  {
    from: "gquuuuuux_beginning_2025_film",
    type: "compilation_of",
    to: "gquuuuuux_2025_tv",
  },
];
/** Human-readable labels for relation types. */
export const RELATION_LABELS: Record<RelationType, string> = {
  adapted_from: "Adapted from",
  alternate_version: "Alternate version of",
  compilation_of: "Compilation of",
  prequel_to: "Prequel to",
  reboot_of: "Reboot of",
  reedit_of: "Re-edit of",
  sequel_to: "Sequel to",
  side_story_of: "Side story of",
  spinoff_from: "Spinoff from",
};

/** Inverse relation labels — for "what points to this entry". */
export const INVERSE_RELATION_LABELS: Record<RelationType, string> = {
  adapted_from: "Adapted as",
  alternate_version: "Alternate version in",
  compilation_of: "Compiled in",
  prequel_to: "Prequelled by",
  reboot_of: "Rebooted as",
  reedit_of: "Re-edited as",
  sequel_to: "Followed by",
  side_story_of: "Has side stories",
  spinoff_from: "Spun off as",
};

/**
 * Get all relations involving a given entry.
 * Returns outgoing (this → other) and incoming (other → this) relations.
 */
export function getRelationsForEntry(detailId: string): {
  outgoing: EntryRelation[];
  incoming: EntryRelation[];
} {
  const outgoing: EntryRelation[] = [];
  const incoming: EntryRelation[] = [];
  for (const rel of ENTRY_RELATIONS) {
    if (rel.from === detailId) {
      outgoing.push(rel);
    }
    if (rel.to === detailId) {
      incoming.push(rel);
    }
  }
  return { outgoing, incoming };
}
