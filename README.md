# Next-Touch

Monorepo for the Next-Touch web app, mobile app, and API.

## Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Web**: Next.js (TypeScript) — `apps/web`
- **Mobile**: Expo / React Native (TypeScript) — `apps/mobile`
- **API**: Node.js + Express + Prisma (TypeScript) — `apps/api`
- **Database**: PostgreSQL
- **Shared**: `packages/shared` — types shared across web, mobile, and API

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL running locally (default `postgres` superuser, port 5432)

## Setup

```bash
pnpm install

# Copy the API env template and fill in your local Postgres password
cp apps/api/.env.example apps/api/.env

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
