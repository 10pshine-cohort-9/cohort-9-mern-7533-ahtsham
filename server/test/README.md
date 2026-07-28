# Backend tests

Run with `npm test -w @notes-app/server`, or with coverage via
`npm run test:coverage -w @notes-app/server`.

| Folder         | What belongs here                                                          |
| -------------- | -------------------------------------------------------------------------- |
| `unit/`        | Services and pure logic. Dependencies are stubbed with Sinon; no database. |
| `integration/` | Real HTTP requests through Supertest against a test database.              |

Tests are written in the same pull request as the code they cover.

Coverage is produced by `c8` in `lcov` format, which is the format SonarQube
consumes in PR #14.
