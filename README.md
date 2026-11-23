# Mauricio Saldarriaga - Developer Portfolio

Personal portfolio for Mauricio Saldarriaga Garcia, Full-Stack and Mobile Engineer. Built as a static Astro site paired with a Cloudflare Pages Function that syncs GitHub repositories tagged with `portfolio` at the edge.

Current release: `v0.5.1` (see [CHANGELOG.md](./CHANGELOG.md)).

## Why this stack

- **Astro 5 (static output):** Most of the site is static content (profile, featured work, stack, experience). Shipping static HTML keeps Time to First Byte low and limits client-side JavaScript to two small native TypeScript modules (~4.8 kB gzipped total) for language switching, clipboard copy, and the live GitHub feed.
- **Native TypeScript over a client UI framework:** The interactive pieces do not require a virtual DOM or state library. Skipping React or Vue on the client avoids extra hydration cost while keeping strict type checking through `astro check` and `tsc`.
- **Tailwind CSS v4 (`@tailwindcss/vite`):** Design tokens live in `src/styles/global.css` under `@theme`, keeping color, border, and font values centralized without a separate JS config file.
- **Cloudflare Pages + Pages Functions (`functions/api/repos.ts`):** Static assets serve directly from the edge while `/api/repos` runs as a Worker function. The GitHub token stays on the server side, and successful responses are cached at the edge (`s-maxage=3600, stale-while-revalidate=86400`) to avoid hitting GitHub rate limits.

## Architecture

```text
.
├── functions/
│   ├── api/repos.ts          # Edge endpoint: GitHub GraphQL query, sanitization, edge caching
│   └── tsconfig.json         # Workers type-checking configuration
├── public/
│   ├── _headers              # Cloudflare Pages security headers (CSP, HSTS, framing, permissions)
│   ├── cv.pdf                # Downloadable resume
│   ├── favicon.svg           # Monochrome SVG icon
│   └── locale-init.js        # Pre-paint ES/EN locale initialization (external for strict CSP)
├── src/
│   ├── components/           # Sidebar, FeaturedSection, GitHubProjectsSection, StackSection, ExperienceSection
│   ├── data/profile.ts       # Bilingual (ES/EN) profile data and UI copy
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro
│   ├── styles/global.css     # Palette tokens, typography rules, and locale visibility
│   └── types/github.ts       # Shared API contract between edge function and client
├── DESIGN.md                 # Visual system tokens, contrast ratios, and layout rules
├── CHANGELOG.md              # Semantic version history
└── wrangler.toml             # Cloudflare Pages local and deploy configuration
```

## Theme system and skin-shed transition

The portfolio ships three high-contrast color themes controlled by `data-theme` on `<html>`, sharing a single fixed font pairing (`Geist` and `Geist Mono`) so switching palettes never causes text reflow or layout jumps:

| Theme | Attribute | Base / Surface / Border | Accent | Mode |
|---|---|---|---|---|
| Precision Engineering | `precision` | `#09090B` / `#111113` / `#27272A` | `#10B981` | Dark |
| Editorial Architecture | `editorial` | `#0C0D10` / `#14161B` / `#23262F` | `#F59E0B` | Dark |
| Daylight Paper | `daylight` | `#F1F2F4` / `#FFFFFF` / `#C9CDD5` | `#047857` | Light |

### How the transition works

Instead of adding WebGL or an animation library, the theme switch uses native browser APIs so the page stays lightweight and runs on the GPU:

1. **Semantic CSS tokens (`src/styles/global.css`):** Every component reads CSS variables (`--color-bg-base`, `--color-surface`, `--color-border`, `--color-accent`, `--font-sans`, `--font-mono`). Switching themes only updates `document.documentElement.dataset.theme` and the `<meta name="theme-color">` tag.
2. **Pre-paint persistence (`public/locale-init.js`):** A small external script runs synchronously in `<head>` before first paint to read `portfolio-theme` and `portfolio-locale` from `localStorage`. Keeping it external avoids `'unsafe-inline'` in the Content Security Policy while preventing a flash of the default theme on reload.
3. **Origin calculation (`src/components/Sidebar.astro`):** When a user clicks one of the three theme dots, `getBoundingClientRect()` captures the button center `(x, y)` and computes the maximum radius to the farthest corner of the viewport using `Math.hypot`.
4. **View Transitions API (`document.startViewTransition`):** Default crossfade animations on `::view-transition-old(root)` and `::view-transition-new(root)` are disabled in CSS. Each incoming theme runs its own `clip-path` choreography over 580ms (`cubic-bezier(0.22, 1, 0.36, 1)`):
   - `precision`: radial `circle()` expansion from the clicked dot + hexagonal SVG mesh (`#hex-skin-grid`).
   - `editorial`: diagonal `polygon()` sweep from left to right + orthogonal architectural grid (`#arch-skin-grid`).
   - `daylight`: top-down `inset()` shutter reveal + engineering notebook dot grid (`#paper-dot-grid`).
5. **Transient SVG overlay (`#cyber-skin-wave` in `src/layouts/BaseLayout.astro`):** A fixed `pointer-events-none` SVG `<pattern>` tinted with the incoming theme accent sweeps alongside the `clip-path` over 640ms, fades to `opacity: 0`, and hides on completion so resting pages stay completely clean.
6. **Reduced motion and browser fallback:** If `prefers-reduced-motion: reduce` is active or the browser does not support `document.startViewTransition`, `applyTheme()` updates the tokens immediately without running animations.

## Security model

- **Private repository sanitization:** `functions/api/repos.ts` fetches owned public and private repositories tagged `portfolio`. When `isPrivate` is `true`, `repoUrl` is always forced to `null` before returning JSON. Only `name`, `description`, `homepageUrl`, `updatedAt`, `languages`, and `topics` are sent to the browser.
- **Strict Content Security Policy:** `public/_headers` enforces `script-src 'self'` with no `'unsafe-inline'` scripts, `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and HSTS.
- **Input validation across boundaries:** Language hex colors are validated against `/^#[0-9A-Fa-f]{6}$/` and external links are restricted to `http:` or `https:` on both the server and the client.
- **Safe local fallback:** Local mock repositories only activate when running on `localhost` without a `cf-ray` header. Live Cloudflare traffic never falls back to mock data.
- **Secret handling:** `.dev.vars` and `.env*` are ignored in `.gitignore`. Production tokens are stored only as encrypted Cloudflare Pages Secrets.

## Local development

Prerequisites: Node.js 20+ and `pnpm`.

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. (Optional) Connect live GitHub data locally by copying `.dev.vars.example` to `.dev.vars` and adding a fine-grained GitHub Personal Access Token with read-only Metadata access:

   ```bash
   cp .dev.vars.example .dev.vars
   ```

   Without `.dev.vars`, `/api/repos` serves local sample repositories so you can test the layout and filters offline.

3. Run type checks and build:

   ```bash
   pnpm run typecheck
   pnpm run build
   ```

4. Preview the static build together with Cloudflare Pages Functions:

   ```bash
   pnpm run pages:dev
   ```

   The app will be available at `http://localhost:8788`.

## Deployment (Cloudflare Pages)

- **Build command:** `pnpm build`
- **Build output directory:** `dist`
- **Environment variables (Production & Preview):**
  - `GITHUB_TOKEN` (Secret): Fine-grained PAT with read-only Metadata access on repositories you want to sync.
  - `GITHUB_USERNAME`: `RedStabros` (also set in `wrangler.toml`).

## Versioning

This project follows Semantic Versioning (`MAJOR.MINOR.PATCH`):

- `0.x.y`: Active pre-1.0 development while adding sections, interactive features, and visual refinements.
- `1.0.0`: First public production launch with live GitHub sync enabled on Cloudflare Pages.
- `MINOR`: New sections, interactive capabilities, or API fields.
- `PATCH`: Visual fixes, copy updates, accessibility adjustments, or security hardening.

All notable changes are tracked in [CHANGELOG.md](./CHANGELOG.md).
