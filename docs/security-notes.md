# Security notes

## Dependency audit policy

CI enforces `npm audit --omit=dev --audit-level=high`, which fails the build on a
high or critical advisory in a **runtime** dependency — anything that is actually
shipped and reachable by a request.

Development-only advisories are recorded here instead of blocking the build. The
reasoning is that a vulnerability is only a vulnerability if it is reachable, and
a test runner that executes trusted, checked-in test files is not exposed to
attacker-controlled input.

### Accepted development-only advisories

As of 2026-07-29, `npm audit` reports 6 advisories (5 high, 1 low), all reached
through `mocha`'s dependency tree:

| Package                | Advisory                                | Reached via              |
| ---------------------- | --------------------------------------- | ------------------------ |
| `brace-expansion`      | DoS through unbounded expansion         | mocha → minimatch → glob |
| `minimatch`            | Depends on vulnerable `brace-expansion` | mocha → glob             |
| `glob`                 | Depends on vulnerable `minimatch`       | mocha                    |
| `diff`                 | DoS in `parsePatch` / `applyPatch`      | mocha                    |
| `serialize-javascript` | RCE via `RegExp.flags`, CPU exhaustion  | mocha                    |

**Why these are accepted rather than fixed:**

1. `mocha` is a `devDependency`. None of these packages are installed by
   `npm ci --omit=dev` and none are present in a production build.
2. Mocha 11.7.6 is the latest published release and still resolves these
   versions. There is no upgrade that fixes them.
3. `npm audit fix --force` proposes **downgrading** Mocha to 11.3.0, which is
   both a breaking change and an older release. That is not a fix.
4. `overrides` were attempted and npm did not apply them to Mocha's nested
   copies, so they were removed rather than left in place giving a false
   impression of mitigation.
5. The advisories require attacker-controlled input — a malicious patch string,
   a crafted object to serialise. Test input in this repository is written by us
   and reviewed before it is merged.

**Review trigger:** re-check on every Mocha release, and immediately if any of
these packages ever appears in the runtime dependency tree.

## Application security measures

These are implemented across later pull requests and listed here so the whole
picture is in one place.

| Concern                 | Measure                                                          | PR  |
| ----------------------- | ---------------------------------------------------------------- | --- |
| Password storage        | bcrypt with cost factor 12                                       | #4  |
| Session theft via XSS   | JWT in an httpOnly, SameSite=Lax, Secure cookie                  | #4  |
| Credential enumeration  | Identical error for unknown email and wrong password             | #4  |
| Brute force             | Rate limiting on `/api/auth/*`                                   | #5  |
| Common header attacks   | `helmet`                                                         | #5  |
| Cross-origin requests   | CORS restricted to a single configured origin, credentials on    | #5  |
| Stored XSS in rich text | `sanitize-html` on write, DOMPurify on render                    | #7  |
| Resource enumeration    | A note owned by someone else returns 404, never 403              | #6  |
| Untrusted import files  | Imported notes pass through the same sanitiser as pasted content | #12 |
| Secret leakage in logs  | Pino `redact` on `password`, `authorization` and cookie headers  | #2  |
