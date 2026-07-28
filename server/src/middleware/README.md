# `middleware/`

Cross-cutting Express middleware — request logging with correlation IDs,
authentication, rate limiting, and the global error handler.

The error handler is the only place in the codebase that turns a thrown error
into an HTTP response. Controllers never do this themselves; see
[`docs/architecture.md`](../../../docs/architecture.md).

Populated from PR #2 onwards.
