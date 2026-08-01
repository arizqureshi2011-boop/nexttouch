# NextTouch

**Analyze. Improve. Elevate.**

NextTouch is a personal soccer training tracker. Most players who train on
their own — outside of official team practice — have no record of what they
worked on or whether it's actually paying off. NextTouch turns scattered,
inconsistent solo practice into a visible, motivating log of progress: log a
session, see it add up over time, know you're actually getting better.

> **Status:** early-stage / learning project. The full product plan —
> personas, MVP scope, roadmap — lives in [`docs/PRD.md`](docs/PRD.md).

## Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Frontend**: Next.js (TypeScript) — `apps/frontend`
- **Mobile**: Expo / React Native (TypeScript) — `apps/mobile`
- **Backend**: Node.js + Express + Prisma (TypeScript) — `apps/backend`
- **Database**: PostgreSQL
- **Shared**: `packages/shared` — types shared across web, mobile, and API

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL running locally (default `postgres` superuser, port 5432)

## Setup

```bash
pnpm install

# Copy the backend env template and fill in your local Postgres password
cp apps/backend/.env.example apps/backend/.env

# Create the database and run the first migration
pnpm db:migrate
```

## Development

```bash
# Run web + api together
pnpm dev

# Run mobile separately (opens Expo dev tools)
pnpm --filter @next-touch/mobile start
```

- Web: http://localhost:3000
- API: http://localhost:4000
