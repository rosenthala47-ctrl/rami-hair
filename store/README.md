<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa DTC Starter
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://circleci.com/gh/medusajs/medusa">
    <img src="https://circleci.com/gh/medusajs/medusa.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/develop/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

# Medusa DTC Starter

A production-ready monorepo starter for direct-to-consumer ecommerce stores powered by Medusa and Next.js. Includes a fully featured storefront with product browsing, cart, checkout, customer accounts, and order management.

## Features

- All of [Medusa's commerce features](https://docs.medusajs.com/resources/commerce-modules)
- Multi-region support with automatic country detection
- Product catalog with variant selection
- Cart with promotion codes
- Multi-step checkout with shipping and payment
- Customer accounts with order history and address management
- Order transfer between accounts

## Getting Started

### Deploy with Medusa Cloud

The fastest way to get started is deploying with [Medusa Cloud](https://cloud.medusajs.com):

1. [Create a Medusa Cloud account](https://cloud.medusajs.com)
2. Deploy this starter directly from your dashboard

### Local Installation

> **Prerequisites:**
>
> - [Node.js](https://nodejs.org/) v20+
> - [PostgreSQL](https://www.postgresql.org/) v16+
> - [Redis](https://redis.io/)
> - **npm** — this project was scaffolded with `create-medusa-app --use-npm`. The root `package.json` / `package-lock.json` are authoritative; don't introduce a pnpm or yarn lockfile alongside them.

This project is already installed and running in the current dev environment: local Postgres (`medusa_dev` database) and Redis, dependencies installed, migrations run, demo data seeded, and an admin user created (see below). To set it up in a fresh environment:

```bash
# 1. Start Postgres and Redis
service postgresql start   # or your platform's equivalent
redis-server --daemonize yes

# 2. Create the database (once)
psql -c "CREATE USER medusa WITH PASSWORD 'medusa_dev_pw' CREATEDB;"
psql -c "CREATE DATABASE medusa_dev OWNER medusa;"

# 3. Install dependencies (from the store/ root)
npm install

# 4. Configure the backend
cp apps/backend/.env.template apps/backend/.env
# then set in apps/backend/.env:
#   DATABASE_URL=postgres://medusa:medusa_dev_pw@localhost:5432/medusa_dev
#   REDIS_URL=redis://localhost:6379

# 5. Run migrations and create an admin user
cd apps/backend
npx medusa db:migrate
npx medusa user -e you@example.com -p <a-real-password>
cd ../..

# 6. Configure the storefront
cp apps/storefront/.env.template apps/storefront/.env.local 2>/dev/null || true
# NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY - get it from Medusa Admin (Settings >
# Publishable API keys) once the backend is running, or query the
# `api_key` table directly in dev.

# 7. Run everything
npm run dev   # backend on :9000 (admin dashboard at /app), storefront on :8000
```

**Current local admin login:** `admin@dropship.local` / `DevAdmin123!` — dev-only, rotate before any real deployment.

## Stripe payments

`apps/backend/medusa-config.ts` only registers the Stripe payment provider **when `STRIPE_API_KEY` is set** — until then, the backend runs on Medusa's built-in manual/test payment provider, so the full cart → checkout → order flow is testable without a Stripe account. Once you have real Stripe keys (a Phase 0 step in `docs/roadmap.md`):

1. Set `STRIPE_API_KEY` and `STRIPE_WEBHOOK_SECRET` in `apps/backend/.env`.
2. Set `NEXT_PUBLIC_STRIPE_KEY` (the **publishable** key, `pk_...`) in `apps/storefront/.env.local`.
3. Restart the backend, then enable Stripe as a payment provider for the relevant region in Medusa Admin (Settings → Regions → Payment providers).

No code changes are required to activate it.

## Configuration

The storefront is configured via environment variables in `apps/storefront/.env.local`:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Publishable API key from your Medusa backend | — |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | URL of your Medusa backend | `http://localhost:9000` |
| `NEXT_PUBLIC_DEFAULT_REGION` | Default region country code | `dk` |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the storefront | `https://localhost:8000` |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key (optional, see above) | — |

The backend is configured via `apps/backend/.env` — see `apps/backend/.env.template` for the full list, including `STRIPE_API_KEY` / `STRIPE_WEBHOOK_SECRET`.

## Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [Medusa Cloud](https://cloud.medusajs.com)
