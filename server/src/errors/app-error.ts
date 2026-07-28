import { HttpStatus, type HttpStatusCode } from '../shared/http-status.js';
import type { ErrorCode } from '../shared/api-response.js';

/**
 * Base class for every error this application throws deliberately.
 *
 * Services and repositories throw these; they are never caught locally and never
 * turned into a response by a controller. A single error-handling middleware
 * (added in PR #2) catches them, logs them and shapes the HTTP response.
 */
export class AppError extends Error {
  readonly statusCode: HttpStatusCode;
  readonly code: ErrorCode;
  readonly details: unknown;

  /**
   * Distinguishes an expected failure ("that note does not exist") from a bug
   * ("cannot read property of undefined"). The error middleware logs
   * non-operational errors at a higher level and never leaks their message.
   */
  readonly isOperational: boolean = true;

  constructor(message: string, statusCode: HttpStatusCode, code: ErrorCode, details?: unknown) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, new.target);
  }
}

/** 400 — the request body, params or query failed schema validation. */
export class ValidationError extends AppError {
  constructor(message = 'Request validation failed', details?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR', details);
  }
}

/** 401 — no valid session was presented. */
export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
  }
}

/**
 * 403 — the caller is authenticated but not allowed to perform this action.
 *
 * Note: a note belonging to a different user returns NotFoundError, not this.
 * Returning 403 there would confirm that the note exists, which leaks
 * information to an attacker enumerating IDs.
 */
export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, HttpStatus.FORBIDDEN, 'FORBIDDEN');
  }
}

/** 404 — the resource does not exist, or the caller may not know that it does. */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, HttpStatus.NOT_FOUND, 'NOT_FOUND');
  }
}

/** 409 — the request conflicts with current state, e.g. a duplicate email. */
export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, HttpStatus.CONFLICT, 'CONFLICT');
  }
}

/** 429 — the caller exceeded a rate limit. */
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later') {
    super(message, HttpStatus.TOO_MANY_REQUESTS, 'RATE_LIMITED');
  }
}

/** Type guard used by the error middleware to separate our errors from crashes. */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
