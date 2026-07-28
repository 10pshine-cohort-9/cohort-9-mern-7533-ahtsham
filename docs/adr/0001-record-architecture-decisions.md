# 0001 — Record architecture decisions

**Status:** Accepted
**Date:** 2026-07-28

## Context

This project makes several decisions that are not obvious from reading the code:
which database, how sessions are carried, why the backend is split into three
layers. A reviewer looking at the finished repository can see _what_ was built
but not _why_ any alternative was rejected.

Without a record, that reasoning is re-litigated every time someone new looks at
the project, and the answers drift.

## Decision

Record significant decisions as numbered Markdown files in `docs/adr/`, following
Michael Nygard's ADR format.

A decision is worth a record when it is hard to reverse, when it constrains later
work, or when a reasonable engineer would ask "why not the other option?".
Routine choices — a variable name, a helper's location — are not recorded.

## Consequences

- Reviewers can answer "why?" without asking.
- Each significant decision costs a few minutes of writing.
- Records are immutable once accepted; reversals are new records that supersede
  the old one, so the history of thinking stays intact.

## Alternatives considered

**Document decisions in the README.** The README is read by someone trying to
_run_ the project; mixing rationale into it serves neither audience well and it
grows without bound.

**Document nothing.** Fastest today, but the reasoning is lost, and for an
assignment that is reviewed rather than merely run, the reasoning is much of the
value.
