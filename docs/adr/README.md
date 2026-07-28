# Architecture Decision Records

An ADR captures a decision that was expensive to make and would be expensive to
reverse, together with the context that made it the right call at the time.

The point is not ceremony. It is that six months later — or when a reviewer asks
"why MySQL and not MongoDB?" — the answer exists in the repository instead of in
someone's memory.

| ADR                                             | Decision                           | Status   |
| ----------------------------------------------- | ---------------------------------- | -------- |
| [0001](./0001-record-architecture-decisions.md) | Record architecture decisions      | Accepted |
| [0002](./0002-use-mysql-with-prisma.md)         | Use MySQL with Prisma, not MongoDB | Accepted |
| [0003](./0003-layered-backend-architecture.md)  | Layered backend architecture       | Accepted |
| [0004](./0004-jwt-in-httponly-cookies.md)       | JWT in an httpOnly cookie          | Accepted |
| [0005](./0005-typescript-across-the-stack.md)   | TypeScript in both workspaces      | Accepted |

## Format

Each record has the same four sections: **Context** (what forced a decision),
**Decision** (what was chosen), **Consequences** (what this costs as well as what
it buys), and **Alternatives considered**.

A record is never edited once accepted. If a decision is reversed, a new ADR
supersedes it and the old one is marked as such.
