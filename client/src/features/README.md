# `features/`

Feature slices. Each folder holds the hooks, TanStack Query definitions and
feature-specific components for one domain concept, mirroring the backend's
`modules/` layout.

A feature may import from `api/`, `components/` and `hooks/`. It should not
import from another feature — shared code moves up a level instead.
