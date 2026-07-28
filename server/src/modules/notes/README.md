# `modules/notes/`

Note CRUD, search, sanitisation, sharing and export.

| File                  | Responsibility                                           |
| --------------------- | -------------------------------------------------------- |
| `notes.routes.ts`     | REST routes under `/api/notes`                           |
| `notes.controller.ts` | Request and response translation only                    |
| `notes.service.ts`    | Ownership and share-permission checks, HTML sanitisation |
| `notes.repository.ts` | Prisma queries, including the full-text search query     |
| `notes.schema.ts`     | Zod schemas for bodies and query parameters              |

All access checks go through a single `assertCanAccess` function in the service.
Sharing (PR #13) changes that one function rather than every endpoint — see
[ADR 0003](../../../../docs/adr/0003-layered-backend-architecture.md).

Implemented in PR #6 (`feat/notes-crud`).
