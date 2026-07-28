# `api/`

The configured Axios instance (`withCredentials: true`, base URL, response
interceptor that unwraps `{ data }` and normalises `{ error }`) plus one typed
function per endpoint.

This is the only folder that knows the API's URL shape. Components and hooks
import functions from here; they never construct a request themselves.
