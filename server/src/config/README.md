# `config/`

Loads environment variables and validates them against a schema at startup, so a
missing or malformed variable crashes the process immediately with a clear
message instead of surfacing as `undefined` deep in a request.

Everything else imports the validated, typed config object from here — no other
file reads `process.env` directly.

Populated in PR #2 (`feat/server-core`).
