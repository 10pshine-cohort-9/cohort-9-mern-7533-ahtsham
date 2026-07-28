# `modules/`

Feature slices. One folder per domain concept, each containing the full vertical
stack for that feature:

```text
modules/notes/
├── notes.routes.ts       HTTP paths and request validation
├── notes.controller.ts   HTTP in, HTTP out
├── notes.service.ts      Business rules and authorisation
├── notes.repository.ts   Prisma queries
└── notes.schema.ts       Zod schemas shared by routes and types
```

Grouping by feature rather than by technical role means a change to notes touches
one directory instead of four. The layering rules — what each file may import —
are described in [`docs/architecture.md`](../../../docs/architecture.md).

`auth/` arrives in PR #4, `notes/` in PR #6.
