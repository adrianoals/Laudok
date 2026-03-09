# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Laudok is a Brazilian SaaS platform for managing engineering reports (laudos de engenharia) for condominiums. Built with Next.js 15 App Router, it currently serves as a marketing/sales funnel with Stripe payment integration. Backend features (auth, database, user dashboard) are not yet implemented.

## Commands

```bash
npm run dev          # Start dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
```

No test framework is configured yet.

## Architecture

**Tech stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS 4, Stripe

**Path alias:** `@/*` maps to `./src/*`

### Source Layout (`src/`)

- `app/` — Next.js App Router pages and API routes
  - `api/checkout/` — Stripe checkout session creation
  - `api/webhooks/stripe/` — Stripe webhook handler (subscription lifecycle events)
  - `api/contato/` — Contact form endpoint (console logging only, no email yet)
  - `api/auth/login/` — Stub (returns 501)
- `components/` — Organized by page: `home/`, `contato/`, `login/`, `layout/`
- `lib/stripe.ts` — Lazy-initialized Stripe client (handles missing env vars at build time)
- `lib/pelip-api.ts` — PELIP API integration (currently disabled)

### Key Patterns

- Pages are **Server Components** by default; interactive components use `'use client'`
- All styling via Tailwind utility classes — no CSS modules
- Brand colors: `laudok` (`#0086C2`), `laudok-dark` (`#034575`), `laudok-light` (`#e6f4fa`) defined in `tailwind.config.ts`
- Mobile-first responsive design; `PlansSection` uses Embla Carousel on mobile, CSS grid on desktop
- Stripe checkout creates sessions server-side, redirects client to Stripe-hosted page
- Three pricing tiers: Básico (R$299), Profissional (R$599), Enterprise (custom)

### Environment Variables

Required in `.env.local` (see `.env.example`):
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_BASICO`, `STRIPE_PRICE_ID_PROFISSIONAL`
- `NEXT_PUBLIC_APP_URL`

## Conventions

- Components: PascalCase filenames (`HeroSection.tsx`)
- Pages/routes: kebab-case directories (`termos-de-uso/`)
- All code and UI text in Brazilian Portuguese
- No global state management — local `useState` only
- API routes return JSON with descriptive error messages
- Deployed on Vercel; metadata base URL: `https://laudok.vercel.app`
