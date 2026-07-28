import { expect } from 'chai';

import {
  AppError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  UnauthorizedError,
  ValidationError,
  isAppError,
} from '../../src/errors/index.js';
import { HttpStatus } from '../../src/shared/http-status.js';

describe('AppError hierarchy', () => {
  describe('AppError', () => {
    it('carries the status code, error code and message it was given', () => {
      const error = new AppError('Something broke', HttpStatus.CONFLICT, 'CONFLICT');

      expect(error.message).to.equal('Something broke');
      expect(error.statusCode).to.equal(409);
      expect(error.code).to.equal('CONFLICT');
    });

    it('is marked operational so the error middleware can separate it from a crash', () => {
      const error = new AppError('Expected failure', HttpStatus.NOT_FOUND, 'NOT_FOUND');

      expect(error.isOperational).to.equal(true);
    });

    it('takes its name from the concrete subclass, not from Error', () => {
      expect(new NotFoundError().name).to.equal('NotFoundError');
      expect(new ValidationError().name).to.equal('ValidationError');
    });

    it('is a real Error, so stack traces and instanceof both work', () => {
      const error = new NotFoundError('Note');

      expect(error).to.be.instanceOf(Error);
      expect(error).to.be.instanceOf(AppError);
      expect(error.stack).to.be.a('string');
    });

    it('attaches optional details for field-level failures', () => {
      const details = [{ field: 'email', message: 'must be a valid email' }];
      const error = new ValidationError('Invalid body', details);

      expect(error.details).to.deep.equal(details);
    });
  });

  describe('status code mapping', () => {
    const cases: ReadonlyArray<[AppError, number, string]> = [
      [new ValidationError(), 400, 'VALIDATION_ERROR'],
      [new UnauthorizedError(), 401, 'UNAUTHORIZED'],
      [new ForbiddenError(), 403, 'FORBIDDEN'],
      [new NotFoundError(), 404, 'NOT_FOUND'],
      [new ConflictError(), 409, 'CONFLICT'],
      [new RateLimitError(), 429, 'RATE_LIMITED'],
    ];

    cases.forEach(([error, expectedStatus, expectedCode]) => {
      it(`maps ${error.name} to ${expectedStatus} / ${expectedCode}`, () => {
        expect(error.statusCode).to.equal(expectedStatus);
        expect(error.code).to.equal(expectedCode);
      });
    });
  });

  describe('NotFoundError', () => {
    it('names the missing resource in its message', () => {
      expect(new NotFoundError('Note').message).to.equal('Note not found');
    });

    it('falls back to a generic message when no resource is named', () => {
      expect(new NotFoundError().message).to.equal('Resource not found');
    });
  });

  describe('isAppError', () => {
    it('accepts every error in the hierarchy', () => {
      expect(isAppError(new NotFoundError())).to.equal(true);
      expect(isAppError(new ValidationError())).to.equal(true);
    });

    it('rejects a plain Error, which the middleware must treat as a crash', () => {
      expect(isAppError(new Error('boom'))).to.equal(false);
    });

    it('rejects non-error values thrown by accident', () => {
      expect(isAppError('not an error')).to.equal(false);
      expect(isAppError(null)).to.equal(false);
      expect(isAppError(undefined)).to.equal(false);
    });
  });
});
