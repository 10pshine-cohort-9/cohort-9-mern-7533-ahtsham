# Client

React single-page application: Vite, TypeScript, React Router, TanStack Query
and TipTap for rich text.

> **Status:** the directory structure is in place; the Vite application, its
> `package.json` and its tooling are added in PR #8 (`feat/client-foundation`).
> Until then this workspace is not part of the npm workspaces list, so `npm ci`
> and CI ignore it.

## Structure

```
client/src/
├── api/            Axios instance and typed endpoint functions
├── components/     Reusable presentational components
├── features/       Feature slices — hooks, queries and feature components
│   ├── auth/
│   └── notes/
├── hooks/          Generic reusable hooks
├── pages/          Route-level screens
├── routes/         Router configuration and route guards
└── types/          Shared TypeScript types, including the API contract
```

## Rules

- Components never call `axios` directly. Network access goes through `api/`,
  wrapped in a TanStack Query hook inside the relevant `features/` folder.
- `pages/` compose feature components; they contain layout, not business logic.
- Anything used by more than one feature moves to `components/` or `hooks/`.
