# Changelog

All notable changes to this portfolio are documented in this file.
This project follows Semantic Versioning (`MAJOR.MINOR.PATCH`).

## [0.5.1] - 2026-11-22

### Added
- Per-theme transition signatures sharing the same `580ms` exponential easing: radial `circle()` + hexagonal mesh for `precision`, diagonal `polygon()` + orthogonal blueprint grid for `editorial`, and top-down `inset()` shutter + dot grid for `daylight`.

## [0.5.0] - 2026-11-22

### Added
- Added `daylight` (Daylight Paper) light theme (`#FAFAFA` base, `#FFFFFF` surface, `#E4E4E7` border, `#047857` emerald accent with WCAG AA contrast) for dramatic dark-to-light skin-shed transitions.
- Added `--color-accent-fg` token so CTA button text maintains high contrast on both dark and light themes.
- Added a Languages strip in `ExperienceSection.astro` clarifying Spanish (Native), English (`EF SET C2 Reading & Listening`, `B1-B2 Speaking`), and Italian (Elementary).

### Changed
- Locked typography to a single font pairing (`Geist` and `Geist Mono`) across all three themes (`precision`, `editorial`, `daylight`) to eliminate text reflow during transitions and reduce Google Fonts requests.
- Updated the sidebar status label to `Bogotá, CO · Remoto` / `Bogotá, CO · Remote`.

## [0.4.0] - 2026-11-22

### Added
- Multi-theme dark mode switcher in `Sidebar.astro` supporting three color and typography systems: Precision Engineering (`#09090B`, `#10B981`, `Geist` / `Geist Mono`), Editorial Architecture (`#0C0D10`, `#F59E0B`, `Satoshi` / `Plus Jakarta Sans` + `IBM Plex Mono`), and Stone Night (`#111110`, `#38BDF8` + `#4ADE80`, `Instrument Sans` / `Fira Code`).
- Radial cybernetic skin-shed transition using the native View Transitions API (`document.startViewTransition`) paired with a transient SVG hexagonal mesh sweep (`#cyber-skin-wave`), with instant fallback for `prefers-reduced-motion`.
- Pre-paint theme persistence in `public/locale-init.js` so reloads keep the selected palette without flashing.

## [0.3.0] - 2026-11-22

### Security
- Added `public/_headers` with strict Content-Security-Policy (`script-src 'self'`), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`.
- Moved pre-paint locale initialization to `public/locale-init.js` so no inline scripts are required.
- Added strict hex color validation and `http(s)` URL checks on both `functions/api/repos.ts` and `src/components/GitHubProjectsSection.astro`.
- Guarded `isLocalDevelopment()` against live Cloudflare traffic using the `cf-ray` header and added an 8-second `AbortSignal.timeout` on GitHub GraphQL fetches.
- Replaced `innerHTML` usage in `Sidebar.astro` copy-email feedback with class toggling on pre-rendered elements.

### Changed
- Expanded local development fallback in `functions/api/repos.ts` to 10 sample repositories (5 public, 5 private) for layout and filter testing before connecting live GitHub credentials.
- Rewrote source code comments across all files in plain English.

## [0.2.0] - 2026-11-22

### Added
- Documented the visual system in `DESIGN.md`.
- Added visibility filter controls (`All`, `Open Source`, `Private`) with `tabular-nums` counters and polite screen-reader status updates to `GitHubProjectsSection.astro`.
- Added a skip-to-content link in `BaseLayout.astro` and a clipboard email copy button in `Sidebar.astro`.

### Changed
- Removed decorative eyebrows and section numbers from headings and navigation.
- Reordered main sections so shipped production projects (`Ciudad Friki`, `GSS Group`) appear first.
- Converted `StackSection.astro` into a hairline specification matrix and `ExperienceSection.astro` into a two-column chronological ledger.
- Raised `--color-text-muted` to `#8E8E98` for WCAG AA contrast compliance on `#111113` and `#09090B`.
- Adjusted the mobile anchor navigation bar so all four section links fit at 375px without horizontal scrolling.

## [0.1.0] - 2026-11-22

### Added
- Initial Astro 5 + TypeScript + Tailwind CSS v4 + Cloudflare Pages Functions scaffold.
- Edge endpoint `functions/api/repos.ts` querying GitHub GraphQL with private repository sanitization and edge cache headers.
- Bilingual (`ES` / `EN`) profile data in `src/data/profile.ts` populated from Mauricio Saldarriaga's CV and downloadable `public/cv.pdf`.
- Responsive sticky sidebar and scrolling content layout following the Precision Engineering dark palette.
