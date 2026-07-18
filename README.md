# ecom

Turborepo + pnpm monorepo for a Medusa v2 e-commerce stack.

## Apps

| App | Path | Port | What it is |
| --- | --- | --- | --- |
| `backend` | `apps/backend` | 9000 | Medusa v2 server — the **admin panel is built in** at http://localhost:9000/app |
| `storefront` | `apps/storefront` | 8000 | Official Next.js starter storefront |

Shared config packages live in `packages/` (`@repo/eslint-config`, `@repo/typescript-config`).

## Commands (run from repo root)

```sh
pnpm install          # install everything
pnpm dev              # run backend + storefront together (turbo)
pnpm backend:dev      # run only the Medusa server
pnpm storefront:dev   # run only the storefront
pnpm build            # build all apps
```

## Database (NeonDB) — already configured

`apps/backend/.env` holds the Neon `DATABASE_URL` (pooled endpoint). Migrations have been run and
the starter's built-in seed (`src/migration-scripts/initial-data-seed.ts`) auto-created demo data:
a Europe region (dk, fr, de, it, es, se, gb), 4 demo products with inventory, a Default Sales
Channel, and a publishable API key (already wired into `apps/storefront/.env.local`).

Useful commands:

```sh
pnpm --filter backend exec medusa db:migrate                                # run new migrations
pnpm --filter backend exec medusa user -e you@example.com -p yourpassword   # add an admin user
pnpm --filter backend exec medusa exec ./src/scripts/get-publishable-key.ts # print API keys
```

> Tip: if `db:migrate` fails with `ECONNRESET`, Neon's pooler dropped the connection mid-DDL.
> Re-run it with `DATABASE_URL` pointing at the **direct** endpoint (remove `-pooler` from the
> host) — migrations resume where they left off. The pooled URL is fine for the running app.
