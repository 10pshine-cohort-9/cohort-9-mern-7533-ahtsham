# `modules/auth/`

Registration, login, logout and the current-session endpoint.

| File                 | Responsibility                                                |
| -------------------- | ------------------------------------------------------------- |
| `auth.routes.ts`     | `POST /register`, `POST /login`, `POST /logout`, `GET /me`    |
| `auth.controller.ts` | Reads the request, calls the service, sets the session cookie |
| `auth.service.ts`    | Password hashing, credential checks, token issuing            |
| `auth.repository.ts` | User lookups and inserts through Prisma                       |
| `auth.schema.ts`     | Zod schemas for the request bodies                            |

Implemented in PR #4 (`feat/auth-api`) and hardened in PR #5.
