# `routes/`

React Router configuration and route guards.

`ProtectedRoute` checks the current session and redirects unauthenticated
visitors to the login page, so no page component has to check for itself.
