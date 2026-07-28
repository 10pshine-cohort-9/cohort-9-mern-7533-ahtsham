# `lib/`

Configured singletons for third-party libraries — the Pino logger and the Prisma
client. Each is constructed once here and imported everywhere else, so there is
exactly one connection pool and one logger configuration.

Nothing in this folder contains application logic. If a file here would need to
know what a "note" is, it belongs in `modules/` instead.

Populated in PR #2 (logger) and PR #3 (Prisma client).
