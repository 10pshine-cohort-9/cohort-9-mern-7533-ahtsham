/**
 * The API returns exactly two response shapes. Both are declared here so the
 * server and the React client can agree on the contract in one place.
 *
 * See docs/architecture.md — "API response contract".
 */

/** Machine-readable failure reasons. Clients may branch on these; messages are for humans. */
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

export interface ApiSuccess<T> {
  data: T;
}

export interface ApiFailure {
  error: {
    code: ErrorCode;
    message: string;
    /** Field-level validation problems, present only on VALIDATION_ERROR. */
    details?: unknown;
    /** Correlates this response with the server log line that recorded it. */
    requestId?: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

/** Narrows an ApiResponse to its success branch. */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccess<T> {
  return 'data' in response;
}
