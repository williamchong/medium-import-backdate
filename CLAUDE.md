# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [README.md](README.md) for project overview, usage instructions, and available npm scripts.

## Quick Reference

- `npx vitest run path/to/test.ts` - Run a single test file
- Requires Node.js >= 20.0.0 (see `.nvmrc`)

## Architecture

**Nuxt 3** with TypeScript, TailwindCSS, and `@nuxtjs/i18n` (English + Chinese/Taiwan).

### Pages

- `pages/index.vue` - Date picker UI that generates backdated URLs in `/YYYY-MM-DD` format
- `pages/[date].vue` - Dynamic route that renders a page with `article:published_time` meta tag for Medium import; validates YYYY-MM-DD format and sets canonical link to homepage

### Other Key Files

- `layouts/default.vue` - App shell with header, footer, SEO meta, and JSON-LD structured data
- `error.vue` - Global error page (handles 404 and general errors)
- `i18n/locales/en-US.json`, `i18n/locales/zh-TW.json` - Translation files

### Analytics & Monitoring

- Google Analytics via `nuxt-gtag` module; tracking calls use `useTrackEvent()` composable (auto-imported from nuxt-gtag)
- Sentry for error monitoring via `@sentry/nuxt`

### Deployment

- Cloudflare Pages (`nitro.preset: 'cloudflare-pages'`)
- Production URL: https://medium-backdate.williamchong.cloud
- CI runs lint, typecheck, and build on push/PR (`.github/workflows/test.yml`)

### i18n Strategy

Uses `prefix_and_default` strategy — default locale (en) has no prefix, other locales get prefixed (e.g., `/zh/`). Browser language detection redirects on root only, no cookie.
