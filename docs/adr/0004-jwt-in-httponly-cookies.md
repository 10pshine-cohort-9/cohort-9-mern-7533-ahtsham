# 0004 — JWT in an httpOnly cookie

**Status:** Accepted
**Date:** 2026-07-29

## Context

The application needs to carry an authenticated session between a React SPA and
the Express API. The two common approaches are a JWT stored in the browser by
JavaScript (`localStorage` or `sessionStorage`), or a token set by the server in
a cookie.

The application stores user-authored rich text and renders it as HTML. That makes
cross-site scripting the most consequential vulnerability in the project: any
successful injection runs with full access to whatever the page's JavaScript can
read.

## Decision

Issue a JWT and return it in an **httpOnly, SameSite=Lax, Secure** cookie. The
frontend never reads or stores the token; the browser attaches it automatically,
and requests are sent with credentials enabled.

## Consequences

- A successful XSS payload cannot read the session token, because JavaScript has
  no access to an httpOnly cookie. This is the main reason for the decision, and
  it composes with the server-side HTML sanitisation added alongside the note
  editor.
- CORS must be configured with an explicit origin and `credentials: true`;
  a wildcard origin will not work with credentialed requests.
- `SameSite=Lax` covers the common CSRF vectors for this application's routes.
  If a state-changing `GET` endpoint is ever added, a CSRF token becomes
  necessary — none is planned.
- Logout must clear the cookie server-side rather than deleting a client value.
- Local development runs over HTTP, so the `Secure` flag is set from configuration
  rather than hard-coded.

## Alternatives considered

**JWT in `localStorage`.** The most common tutorial approach and simpler to wire
up, because the frontend controls the token explicitly. Rejected: `localStorage`
is readable by any script on the page, so an XSS bug in a rich-text application
becomes full session theft.

**Server-side sessions in a store.** Straightforward revocation, which JWTs lack.
Rejected as unnecessary infrastructure for this project's scope; short token
lifetimes are an acceptable substitute here.
