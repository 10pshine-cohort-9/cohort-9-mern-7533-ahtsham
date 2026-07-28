# 0003 — Layered backend architecture

**Status:** Accepted
**Date:** 2026-07-29

## Context

The assignment requires unit tests that cover "controllers, services, and data
access layers". Those three layers can only be tested separately if they exist
separately — a controller that queries Prisma directly cannot be tested without a
database.

A second force: note sharing arrives later in the project. When it does, the
authorisation rule changes from "the note belongs to this user" to "the user owns
the note, or has a share record granting the required permission". If that check
is written inline in each route handler, the change touches every endpoint.

## Decision

Split the backend into four layers, grouped by feature under `src/modules/`:

- **Route** — binds an HTTP path to a controller and validates the request schema
- **Controller** — translates HTTP into plain arguments and results back into HTTP
- **Service** — enforces business rules and authorisation, throws domain errors
- **Repository** — executes Prisma queries and returns plain objects

Each layer may call only the layer directly beneath it. Services never import
`express` types; repositories never contain business conditionals.

Authorisation lives in a single service-layer function from the first notes
endpoint onward, even before sharing exists, so that adding sharing changes one
function instead of six endpoints.

## Consequences

- Services are unit-testable with a stubbed repository and no database.
- Controllers are integration-testable through Supertest without mocking business
  logic.
- More files per feature than a route-handler-does-everything approach. For a
  project of this size that is a real cost, accepted because the test requirement
  is explicit in the brief.
- The layering must be enforced by review; nothing in TypeScript prevents a
  controller from importing the repository directly.

## Alternatives considered

**Fat route handlers.** Fewer files and faster to write initially. Rejected
because it makes the required layer-by-layer tests impossible without a live
database, and because sharing would then require editing every endpoint.

**Group by technical role** (`controllers/`, `services/`, `repositories/` at the
top level). A common convention, but a change to notes then touches three distant
directories. Feature-first grouping keeps related code together, which matters
more as the number of features grows.
