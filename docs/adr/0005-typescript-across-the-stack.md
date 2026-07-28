# 0005 — TypeScript in both workspaces

**Status:** Accepted
**Date:** 2026-07-28

## Context

The assignment names JavaScript or TypeScript, leaving the choice open. The
repository's CodeRabbit configuration, however, instructs the reviewer to "flag
missing TypeScript types as HIGH", which is a strong signal about what is
expected in review.

Separately, the project has a typed data layer (Prisma) and a shared request and
response contract between two workspaces. Both benefit from types that are
checked rather than documented.

## Decision

Use TypeScript in `server/` and `client/`, with `strict: true` and
`noUncheckedIndexedAccess` enabled in a shared `tsconfig.base.json`.

`npm run typecheck` runs in CI on every pull request, so a type error fails the
build rather than surfacing at runtime.

## Consequences

- Prisma's generated types reach the service layer, so a schema change that
  breaks a query is a compile error.
- The API response contract is expressed once as a type and shared, so the
  frontend cannot read a field the backend does not send.
- `noUncheckedIndexedAccess` forces explicit handling of possibly-absent array
  and record lookups. This is occasionally verbose and catches a real class of
  bug.
- A build step exists that plain JavaScript would not need.

## Alternatives considered

**JavaScript with JSDoc annotations.** Gives some editor support without a build
step. Rejected: it is not enforced in CI, and it would still be flagged by the
configured review rules.

**TypeScript in non-strict mode.** Easier to start. Rejected because most of the
value of TypeScript comes from strict null checking; without it, the type system
mostly documents rather than verifies.
