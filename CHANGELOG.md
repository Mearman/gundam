## [1.16.2](https://github.com/Mearman/gundam/compare/v1.16.1...v1.16.2) (2026-05-21)

### Bug Fixes

* clearance-aware escape routing for all cross-row edges ([726a22c](https://github.com/Mearman/gundam/commit/726a22c7c4d72ad9137f5906dd777cb820b3caf2))

## [1.16.1](https://github.com/Mearman/gundam/compare/v1.16.0...v1.16.1) (2026-05-21)

### Bug Fixes

* synchronise entry positions between layout and edge routing ([3c47296](https://github.com/Mearman/gundam/commit/3c4729684b8994df3232397744eb3d5dcf761b7a))

## [1.16.0](https://github.com/Mearman/gundam/compare/v1.15.1...v1.16.0) (2026-05-21)

### Features

* octilinear edge routing with dynamic row gaps ([87cd708](https://github.com/Mearman/gundam/commit/87cd708b32ea92cc8af5890038d495b088e759a1))

### Refactoring

* integrate octilinear edge routing into relationship overlay ([d20bf2b](https://github.com/Mearman/gundam/commit/d20bf2b80c09a1c9ad47c1b0f733d68b0ce04bd2))
* widen row gap from 4 to 14px for edge routing channels ([730e938](https://github.com/Mearman/gundam/commit/730e9384b200cc4553796ff0b379144dce8d11a6))

## [1.15.1](https://github.com/Mearman/gundam/compare/v1.15.0...v1.15.1) (2026-05-20)

### Bug Fixes

* data accuracy corrections, remove duplicates, fix episode counts ([9a05ec0](https://github.com/Mearman/gundam/commit/9a05ec0a0dbc82b8270323ecb1bdcec65c85c409))

### Refactoring

* descriptive detail fields + epPlain + zero single-char names ([2b16b4e](https://github.com/Mearman/gundam/commit/2b16b4ec304b73d3f1647c7e38026d90e1f90ef6))
* episode date as { ja, en } object + y1/y2 → yearStart/yearEnd ([651ddce](https://github.com/Mearman/gundam/commit/651ddcebd9a7ff1cd82be06020d268844976554c))
* rename y1/y2 to yearStart/yearEnd in stacking algorithm ([2ca9504](https://github.com/Mearman/gundam/commit/2ca9504a90767dc5ecdea3b5c5bfb1fb4948a784))

## [1.15.0](https://github.com/Mearman/gundam/compare/v1.14.2...v1.15.0) (2026-05-20)

### Features

* add 5 TBA entries to timeline.ts for full JSON sync ([0758836](https://github.com/Mearman/gundam/commit/07588362d79f1c69ad285b28338ef1df8097b51c))
* regenerate details.ts with bilingual titles from JSON source ([16eb9c8](https://github.com/Mearman/gundam/commit/16eb9c807062ebeb8346b90473c0bc783d9aa79b))

### Bug Fixes

* adapt TimelineLanes tooltip to bilingual title schema ([c5bc11d](https://github.com/Mearman/gundam/commit/c5bc11ddb1d92d43e346b4e0989e365203c96f4e))

### Refactoring

* compact ep()/rel() factories reduce data modules by 61% ([408034a](https://github.com/Mearman/gundam/commit/408034a1e7b12373bae3d677f8eb8cac3898fac8))
* descriptive field names + det() factory ([a773e0f](https://github.com/Mearman/gundam/commit/a773e0f24aef0327217f736e853cfd41a1a27ce7))
* entry() factory + remove redundant detail fields ([9c62554](https://github.com/Mearman/gundam/commit/9c62554892a4b4e80c6ff44468c29160229404ed))
* restructure data modules by universe ([28e357e](https://github.com/Mearman/gundam/commit/28e357ece0b1b838cc65a9d8e19207c4cab37cca))

## [1.14.2](https://github.com/Mearman/gundam/compare/v1.14.1...v1.14.2) (2026-05-20)

### Chores

* trim SD Soketsuden episodes, refresh sources and relations ([dda6b66](https://github.com/Mearman/gundam/commit/dda6b66f8212d55b83a2e0d97a30f0f800920670))

## [1.14.1](https://github.com/Mearman/gundam/compare/v1.14.0...v1.14.1) (2026-05-20)

### Chores

* refresh detail data and relations from updated JSON ([ce0ab77](https://github.com/Mearman/gundam/commit/ce0ab77264e7da4ba54a98785ebff2405ec9d2c4))

## [1.14.0](https://github.com/Mearman/gundam/compare/v1.13.0...v1.14.0) (2026-05-20)

### Features

* update relations to 174 entries, refresh detail data ([4167904](https://github.com/Mearman/gundam/commit/416790447f8a1f6cce7a29a61582127e0305d085))

## [1.13.0](https://github.com/Mearman/gundam/compare/v1.12.0...v1.13.0) (2026-05-20)

### Features

* draw data-driven relation lines between entries ([965aad8](https://github.com/Mearman/gundam/commit/965aad8cea3db8c0859b65705bb61060e438751d))

## [1.12.0](https://github.com/Mearman/gundam/compare/v1.11.0...v1.12.0) (2026-05-20)

### Features

* show entry relations in tooltip ([6fd813d](https://github.com/Mearman/gundam/commit/6fd813d099fbca07b5afd5b91fde1a25d405e261))

## [1.11.0](https://github.com/Mearman/gundam/compare/v1.10.1...v1.11.0) (2026-05-20)

### Features

* add entry relations module, fix Legendary film universe ([3e24122](https://github.com/Mearman/gundam/commit/3e241221e82bd1f619136da0e4d97cbfbf3930f7))

## [1.10.1](https://github.com/Mearman/gundam/compare/v1.10.0...v1.10.1) (2026-05-20)

### Chores

* refresh detail data — enrich episodes, sources, metadata ([c5f0762](https://github.com/Mearman/gundam/commit/c5f0762fbca2935edab2ed271c3c67fd61d3a7e8))

## [1.10.0](https://github.com/Mearman/gundam/compare/v1.9.1...v1.10.0) (2026-05-20)

### Features

* add SEED Destiny Astray R, enrich Astray manga data ([4c62560](https://github.com/Mearman/gundam/commit/4c6256074b0844c348a0c42292c3253cc442f3a7))

## [1.9.1](https://github.com/Mearman/gundam/compare/v1.9.0...v1.9.1) (2026-05-20)

### Chores

* refresh detail data from updated JSON ([47398a1](https://github.com/Mearman/gundam/commit/47398a10ff49cea81c3ecc3f2f1198a60cb492bd))

## [1.9.0](https://github.com/Mearman/gundam/compare/v1.8.0...v1.9.0) (2026-05-20)

### Features

* refresh detail data from updated JSON source ([7fe7fcd](https://github.com/Mearman/gundam/commit/7fe7fcda7ba91e075df55779878a731db8fc2349))

## [1.8.0](https://github.com/Mearman/gundam/compare/v1.7.0...v1.8.0) (2026-05-20)

### Features

* add per-episode universe tagging for multi-universe entries ([0180b3e](https://github.com/Mearman/gundam/commit/0180b3e989c15ba6a348e21aca84b646b656df65))

## [1.7.0](https://github.com/Mearman/gundam/compare/v1.6.0...v1.7.0) (2026-05-20)

### Features

* support multi-universe entries with array u field ([8c33fb7](https://github.com/Mearman/gundam/commit/8c33fb7027a0a362da6475be43b073b7042cb2f4))

## [1.6.0](https://github.com/Mearman/gundam/compare/v1.5.0...v1.6.0) (2026-05-20)

### Features

* add 123 entries from detail data to timeline ([1ab6698](https://github.com/Mearman/gundam/commit/1ab66986917508bb61b561efef965c699401b26d))

## [1.5.0](https://github.com/Mearman/gundam/compare/v1.4.5...v1.5.0) (2026-05-20)

### Features

* show all detail data in entry tooltips ([6b9ef26](https://github.com/Mearman/gundam/commit/6b9ef26fd6d535e1b91aa87b907c15a4862781bb))

## [1.4.5](https://github.com/Mearman/gundam/compare/v1.4.4...v1.4.5) (2026-05-20)

### Chores

* refresh detailed Gundam release metadata ([39ce156](https://github.com/Mearman/gundam/commit/39ce1566d315ad0ac3afe3b5675159c7bb31d35c))

## [1.4.4](https://github.com/Mearman/gundam/compare/v1.4.3...v1.4.4) (2026-05-20)

### Bug Fixes

* add semantic-release npm plugin to bump package.json version ([b421338](https://github.com/Mearman/gundam/commit/b421338c504b0bf866973989763fbb332b1f3bd5))

## [1.4.3](https://github.com/Mearman/gundam/compare/v1.4.2...v1.4.3) (2026-05-20)

### Bug Fixes

* configure semantic-release to commit version bump to package.json ([e08302c](https://github.com/Mearman/gundam/commit/e08302cccc305321298878d8da34c69079db28c5))

## [1.4.2](https://github.com/Mearman/gundam/compare/v1.4.1...v1.4.2) (2026-05-20)

### Bug Fixes

* pages-deploy depends on pages-build, not release directly ([0ba1e22](https://github.com/Mearman/gundam/commit/0ba1e22e5a4c53d449a13a95c48f12e489fd1ae1))

## [1.4.1](https://github.com/Mearman/gundam/compare/v1.4.0...v1.4.1) (2026-05-20)

### Bug Fixes

* build pages after release for correct version ([4c42d70](https://github.com/Mearman/gundam/commit/4c42d705906aae47727bda1f7f42c6a0b4a60aab))

## [1.4.0](https://github.com/Mearman/gundam/compare/v1.3.6...v1.4.0) (2026-05-20)

### Features

* display version link in footer from package.json ([fcf8fdf](https://github.com/Mearman/gundam/commit/fcf8fdf12e43541ad0fdbe33f3e6c3978d58fb9e))

## [1.3.6](https://github.com/Mearman/gundam/compare/v1.3.5...v1.3.6) (2026-05-20)

### Chores

* refresh detailed Gundam release metadata ([e5af0c4](https://github.com/Mearman/gundam/commit/e5af0c4e3eb3ca58b4a9112d68236eecccd60aa7))

## [1.3.5](https://github.com/Mearman/gundam/compare/v1.3.4...v1.3.5) (2026-05-20)

### Bug Fixes

* pin zoom controls to viewport, not scroll content ([89e2e76](https://github.com/Mearman/gundam/commit/89e2e76d65f3fdb48fdb69e527d1fe259dfc91af))

## [1.3.4](https://github.com/Mearman/gundam/compare/v1.3.3...v1.3.4) (2026-05-20)

### Bug Fixes

* allow vertical page scrolling in timeline tracks ([96e9911](https://github.com/Mearman/gundam/commit/96e9911f0a12f01d8c1a7b86e80c83b094d59ec0))

## [1.3.3](https://github.com/Mearman/gundam/compare/v1.3.2...v1.3.3) (2026-05-20)

### Chores

* refresh detailed Gundam release metadata ([16327bb](https://github.com/Mearman/gundam/commit/16327bb89872ed3c5ac363203adcb2a73e8b7149))

## [1.3.2](https://github.com/Mearman/gundam/compare/v1.3.1...v1.3.2) (2026-05-20)

### Chores

* allow manual workflow dispatch on CI ([6c22152](https://github.com/Mearman/gundam/commit/6c221526be8f2d8ae8e2e4b509c03e9e4e199b4c))

## [1.3.1](https://github.com/Mearman/gundam/compare/v1.3.0...v1.3.1) (2026-05-20)

### Chores

* trigger CI redeploy ([c1cb887](https://github.com/Mearman/gundam/commit/c1cb887d7d70def43fd04c2850914867f194afef))

## [1.3.0](https://github.com/Mearman/gundam/compare/v1.2.3...v1.3.0) (2026-05-20)

### Features

* add panning and zooming to the timeline ([09389b2](https://github.com/Mearman/gundam/commit/09389b2ed041babb4c9957e858c4215ee723d6a9))

## [1.2.3](https://github.com/Mearman/gundam/compare/v1.2.2...v1.2.3) (2026-05-20)

### Chores

* refresh detailed Gundam release metadata ([35ff1a0](https://github.com/Mearman/gundam/commit/35ff1a04dc7e4d1e2f7cf16cde2095fd77502eb7))

## [1.2.2](https://github.com/Mearman/gundam/compare/v1.2.1...v1.2.2) (2026-05-20)

### Chores

* refresh detailed Gundam release metadata ([465de0c](https://github.com/Mearman/gundam/commit/465de0caa69732cd4caf63523dcc620a22889d13))

## [1.2.1](https://github.com/Mearman/gundam/compare/v1.2.0...v1.2.1) (2026-05-20)

### Chores

* refresh detailed Gundam release metadata ([df645f8](https://github.com/Mearman/gundam/commit/df645f87465603e937dfdc2237eeadb2b9172af7))

## [1.2.0](https://github.com/Mearman/gundam/compare/v1.1.2...v1.2.0) (2026-05-20)

### Features

* add detailed Gundam release metadata ([7898289](https://github.com/Mearman/gundam/commit/789828976b2d993ebeeb24d59ced3bd3aa2c9744))
* show detailed release metadata in entry tooltips ([ebdba80](https://github.com/Mearman/gundam/commit/ebdba80a8ff0dd26a367b7cf69ee7af7aebdc354))

## [1.1.2](https://github.com/Mearman/gundam/compare/v1.1.1...v1.1.2) (2026-05-20)

### Bug Fixes

* resolve timeline spacing and axis layout issues ([eb31145](https://github.com/Mearman/gundam/commit/eb31145d96b0fa87b0cd40418a46f7d5a8fe6f49))

## [1.1.1](https://github.com/Mearman/gundam/compare/v1.1.0...v1.1.1) (2026-05-20)

### Refactoring

* replace axis toggle with three-position segmented control ([94acbc2](https://github.com/Mearman/gundam/commit/94acbc2c832ac5f779c6d347cf4249d8f8a7be73))

## [1.1.0](https://github.com/Mearman/gundam/compare/v1.0.0...v1.1.0) (2026-05-20)

### Features

* add axis mode toggle to filter bar ([9c01ff8](https://github.com/Mearman/gundam/commit/9c01ff8b0261c5769ffdc09aae3cfec918c8d545))
* add story and both rendering modes with relationship overlay ([eaf8036](https://github.com/Mearman/gundam/commit/eaf8036664293707b2912f7909aef641fa22c497))
* add story timeline data layer with in-universe date parsing ([cf82325](https://github.com/Mearman/gundam/commit/cf8232507435e65d7886e804738b895391b9a553))

## 1.0.0 (2026-05-19)

### Features

* add app entry point and shell ([f9d5a2b](https://github.com/Mearman/gundam/commit/f9d5a2b2dfe3862238751f8c06169bf23b237284))
* add FilterBar, Legend, and YearAxis components ([b1911f0](https://github.com/Mearman/gundam/commit/b1911f0e52c58ec42e02155ef0fbf4fd169719ed))
* add initial app component and styles ([96e8db2](https://github.com/Mearman/gundam/commit/96e8db2aed292747fa2d9254fd42ff8c8780a90d))
* add SSR prerender pipeline for static HTML output ([6b5347c](https://github.com/Mearman/gundam/commit/6b5347c97a7f4eedafcf95bb538b0ade20e31843))
* add timeline data layer with types, stacking, and helpers ([0a9dd73](https://github.com/Mearman/gundam/commit/0a9dd737b690c0766bf43b7ef26e037450cafa88))
* add vanilla-extract global and timeline styles ([f6cb4a9](https://github.com/Mearman/gundam/commit/f6cb4a9720dcedf3df981b18090902070df5941b))
* add vanilla-extract vite plugin ([8306b22](https://github.com/Mearman/gundam/commit/8306b225e04cad7fffbb765bb555e5da377fe3fc))
* rewrite App as gundam timeline viewer ([886362f](https://github.com/Mearman/gundam/commit/886362f1141eccedb9c7c23a25579a1b68173c63))

### Bug Fixes

* resolve lint errors in timeline and entry-client ([cbe7ab4](https://github.com/Mearman/gundam/commit/cbe7ab4c892c5dabaf8a35c6f9e71e5213490ccc))
* use customStyle helper for CSS custom properties ([cfe357d](https://github.com/Mearman/gundam/commit/cfe357d93ffdb33aefb0bec32da096467f03f535))

### Documentation

* add readme ([4a08c7d](https://github.com/Mearman/gundam/commit/4a08c7d365edce9af1ae0e49f83bbdf1c352c46d))

### CI

* add commit lint job and release job to ci workflow ([8bb4d40](https://github.com/Mearman/gundam/commit/8bb4d40959db56267a96b7577bea9931595ded7e))
* add dependabot auto-merge workflow ([e7584bf](https://github.com/Mearman/gundam/commit/e7584bfe785af4ed4618b2501e375a128431d446))
* add dependabot config ([cc002ee](https://github.com/Mearman/gundam/commit/cc002ee44f7734d763f4da64446fd590549fc994))
* add github pages deploy workflow ([f7082fd](https://github.com/Mearman/gundam/commit/f7082fd69463d60c9885894f312eb5261c0b7ab0))
* pin github actions to exact versions ([0b69597](https://github.com/Mearman/gundam/commit/0b69597198d023f61d82ce5dbcb7d8762016319d))

### Chores

* add commitlint config ([c61ad7f](https://github.com/Mearman/gundam/commit/c61ad7f0e37e267670fd286ec9c51931231270e0))
* add husky, lint-staged, and commitlint ([1c1ec1d](https://github.com/Mearman/gundam/commit/1c1ec1d4caf5b054165c5cc0f7102bf81d6cf6f8))
* add lint-staged config ([d39a8c3](https://github.com/Mearman/gundam/commit/d39a8c3d3a7a3d79b7484fbab6a6681b6f6ed4fb))
* add pnpm workspace build allowlist ([1ef48a9](https://github.com/Mearman/gundam/commit/1ef48a944db3c4b0e83350734540cd2db69a2e24))
* add prettier and integrate with eslint ([c564e46](https://github.com/Mearman/gundam/commit/c564e46f821c40adcb43ec3d8aa161d89e3f6b4c))
* add semantic-release config ([6e056d2](https://github.com/Mearman/gundam/commit/6e056d2223e43b3654a6075794c317f0b02b5ef7))
* add static assets ([9badff6](https://github.com/Mearman/gundam/commit/9badff653e458e749e3071da037358bf296c7a73))
* configure eslint ([0138709](https://github.com/Mearman/gundam/commit/0138709b36155301406c70b4db9ade0f1d9b009e))
* configure typescript ([0627898](https://github.com/Mearman/gundam/commit/062789893862d676edf776b0ec05e6e20f920112))
* configure vite with github pages base path ([4adf18a](https://github.com/Mearman/gundam/commit/4adf18adce596ce0ac0d92124b177597028043b7))
* convert eslint config to typescript ([105b90b](https://github.com/Mearman/gundam/commit/105b90b352100bcd4019e73bb5f6eb9dfad812c3))
* ignore .eslintcache ([4c0d23f](https://github.com/Mearman/gundam/commit/4c0d23f9f3e4f46ceffa9d7d1f72d20b775d7103))
* move config files into tsconfig.node for type-checking ([0d1db9f](https://github.com/Mearman/gundam/commit/0d1db9f652abccbacc8f0e74c493ed7ed8bbff0e))
* pin node 26 ([b6cfbe7](https://github.com/Mearman/gundam/commit/b6cfbe72be494e7e57de38184fedc62768512c67))
* pin node version via .tool-versions ([7eb12e8](https://github.com/Mearman/gundam/commit/7eb12e8ec1411985fa2ecdf013726f92724bbbad))
* remove vite scaffold files ([2563ff7](https://github.com/Mearman/gundam/commit/2563ff7711963f4380b0c0da4e21b364a559348f))
* scaffold vite react-typescript project ([7b91292](https://github.com/Mearman/gundam/commit/7b91292738477248426dd6279f8d6e85955373ec))
* upgrade eslint with [@eslint-react](https://github.com/eslint-react), jsx-a11y, strict rules ([d33e7c5](https://github.com/Mearman/gundam/commit/d33e7c54a65ab69bfc90b001e296ff43d2214828))
* use projectService for config files, drop allowDefaultProject ([8f981f2](https://github.com/Mearman/gundam/commit/8f981f2a4402202b615cd14ef11cdf1b2d0274aa))
