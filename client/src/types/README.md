# `types/`

Shared TypeScript types, most importantly the API request and response
contract, kept in step with `server/src/shared/api-response.ts`.

Keeping the contract typed on both sides means the client cannot read a field
the server does not send — see
[ADR 0005](../../../docs/adr/0005-typescript-across-the-stack.md).
