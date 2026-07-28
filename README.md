# Notes App — Cohort 9 MERN Assignment

Full-stack notes application: users sign up, write rich-text notes, search them,
share them with other users and edit them collaboratively in real time.

Built for the Cohort 9 MERN assignment by Ahtsham Adil.

## Tech stack

| Layer        | Technology                                             |
| ------------ | ------------------------------------------------------ |
| Backend      | Node.js, Express, TypeScript                           |
| Database     | MySQL 8 with Prisma                                    |
| Frontend     | React, TypeScript, Vite, TanStack Query, TipTap        |
| Logging      | Pino (`pino-http` for request/response logging)        |
| Testing      | Mocha, Chai, Supertest (backend); Jest, RTL (frontend) |
| Code quality | ESLint, Prettier, SonarQube                            |
| Real time    | Socket.IO with Yjs                                     |

## Prerequisites

- **Node.js 24 LTS** — the version is pinned in `.nvmrc`
- **Docker Desktop** — runs MySQL locally
- **npm 10+**

## Getting started

Install dependencies:

```bash
npm ci
```

Create your environment file from the template and fill in the values:

```bash
cp .env.example .env
```

Start MySQL:

```bash
npm run db:up
```

Stop it again when you are finished:

```bash
npm run db:down
```

## Available scripts

| Script                 | What it does                                 |
| ---------------------- | -------------------------------------------- |
| `npm run lint`         | Lint every workspace with ESLint             |
| `npm run lint:fix`     | Lint and auto-fix                            |
| `npm run format`       | Format the repository with Prettier          |
| `npm run format:check` | Fail if anything is unformatted (used by CI) |
| `npm run typecheck`    | Typecheck every workspace                    |
| `npm run build`        | Build every workspace                        |
| `npm run db:up`        | Start the MySQL container                    |
| `npm run db:down`      | Stop and remove the MySQL container          |

## Project layout

```text
.
├── server/              # Express + TypeScript API
│   └── src/
├── .github/
│   └── workflows/       # CI pipeline
├── docker-compose.yml   # MySQL for local development
└── tsconfig.base.json   # Shared TypeScript configuration
```

The `client/` React workspace is introduced in a later pull request.

## Branching and commits

- `main` — stable. Only receives `develop` via release pull requests.
- `develop` — integration branch. **All feature pull requests target `develop`.**
- `feat/*`, `chore/*`, `docs/*`, `ci/*` — short-lived branches cut from `develop`.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
and are enforced automatically by commitlint via a Husky `commit-msg` hook:

```text
feat: add note search endpoint
fix: reject expired session cookies
chore: add eslint and prettier
```

A Husky `pre-commit` hook runs ESLint and Prettier over staged files, so
formatting problems are fixed before they ever reach a pull request.

## Continuous integration

Every pull request into `main` or `develop` runs formatting, linting and
type checking. Test and coverage jobs are added alongside the first tests.
