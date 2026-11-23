# Design System

## Visual direction
- **Mode:** Experience (Portfolio). Lead with shipped production work from the first viewport and keep the interface quiet around it.
- **Aesthetic:** Crisp 1px hairlines, strict grid alignment, and no decorative shadows or gradients.

## Typography
All three themes share a single fixed font pairing so theme transitions never shift text metrics or line wrapping:
- **Sans (`Geist`):** Headings (`600`, `tracking-tight`, `text-wrap: balance`) and body prose (`400`, `leading-relaxed`, `text-wrap: pretty`).
- **Mono (`Geist Mono`):** Dates, repository names, stack tags, tabular counts, and technical metadata.

## Color systems
All components consume semantic CSS variables defined in `src/styles/global.css` and switched via `html[data-theme]`.

### 1. Precision Engineering (`data-theme="precision"`, default, dark)
- **Palette:** `#09090B` base, `#111113` surface, `#27272A` border (`#3F3F46` hover), `#FAFAFA` primary text, `#A1A1AA` secondary text, `#8E8E98` muted metadata (5.7:1 on `#111113`), `#10B981` accent, `#09090B` accent foreground.

### 2. Engineering Blueprint (`data-theme="blueprint"`, color)
- **Palette:** `#0B192C` base, `#112540` surface, `#223F66` border (`#3B659C` hover), `#F0F6FC` primary text, `#A8C0DC` secondary text, `#8FAAC9` muted metadata, `#F59E0B` amber accent, `#0B192C` accent foreground.

### 3. Daylight Paper (`data-theme="daylight"`, light)
- **Palette:** `#F1F2F4` base canvas, `#FFFFFF` card surface, `#C9CDD5` border (`#71717A` hover), `#09090B` primary text, `#3F3F46` secondary text, `#52525B` muted metadata (7.4:1 on `#FFFFFF`), `#047857` accent (5.4:1 on `#FFFFFF`), `#FFFFFF` accent foreground.

## Theme transition choreography
Theme switching is the single authored motion moment in the portfolio, with one signature per theme sharing the same 580ms/640ms timing and `cubic-bezier(0.22, 1, 0.36, 1)` curve:
- **Trigger:** User-initiated only, from the three-dot switcher in `src/components/Sidebar.astro`. Never runs automatically.
- **Precision (`precision`):** Radial `circle()` reveal expanding from the clicked dot paired with the `#hex-skin-grid` hexagonal mesh.
- **Editorial (`editorial`):** Diagonal `polygon()` sweep from left to right paired with the `#arch-skin-grid` orthogonal blueprint grid.
- **Daylight (`daylight`):** Top-down `inset()` shutter reveal paired with the `#paper-dot-grid` fine dot grid.
- **Accessibility:** `prefers-reduced-motion: reduce` bypasses both the clip-path animation and the SVG overlay for an instant swap. Active theme changes announce in `#theme-live-status` (`aria-live="polite"`).

## Structural grammar
- **Featured work:** Editorial artifact blocks with production links and hairline-divided architectural highlights.
- **GitHub Sync (`/api/repos`):** Discrete 1px cards with visibility filters (`All`, `Open Source`, `Private`), geometry-matched skeleton loaders, and strict private-repo sanitization (`repoUrl: null`).
- **Tech stack:** Two-column hairline specification matrix instead of nested cards.
- **Experience, education, and languages:** Two-column chronological ledger (`tabular-nums` date/location + role details) followed by three-column hairline strips for education and languages.

## Hard rules
- No kickers/eyebrows or decorative section numbers above headings.
- No gradient text, purple/cyan backgrounds, heavy shadows, glassmorphism, `rounded-3xl`, or emoji icons.
- Animate only `transform`, `opacity`, and `clip-path` (never `width` or `height`).
