# Backend tests

Run with `npm test -w @notes-app/server`, or with coverage via
`npm run test:coverage -w @notes-app/server`.

| Folder         | What belongs here                                                |
| -------------- | ---------------------------------------------------------------- |
| `unit/`        | Services and pure logic, with dependencies stubbed; no database. |
| `integration/` | Real HTTP requests through Supertest against a test database.    |

Tests are written in the same pull request as the code they cover.

There is no stubbing library yet because nothing needs stubbing — the current
tests cover pure functions. Sinon is introduced in PR #4 alongside the first
service that has a repository to stub.

Coverage is produced by `c8` in `lcov` format, which is the format SonarQube
consumes in PR #14.
