# Integration tests

Full HTTP round trips driven by Supertest against the Express application
exported from `src/app.ts`, backed by a real MySQL test database that is
truncated between suites.

These cover the paths unit tests cannot: authentication middleware, request
validation, the global error handler, and status codes.

The first of these arrive in PR #2 (`GET /api/health`) and PR #4 (the auth flow).
