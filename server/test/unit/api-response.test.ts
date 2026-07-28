import { expect } from 'chai';

import { isApiSuccess, type ApiResponse } from '../../src/shared/api-response.js';

interface Note {
  id: number;
  title: string;
}

describe('isApiSuccess', () => {
  it('narrows a success response so `data` is reachable', () => {
    const response: ApiResponse<Note> = { data: { id: 1, title: 'My note' } };

    expect(isApiSuccess(response)).to.equal(true);

    // The point of the guard: this only compiles inside the narrowed branch.
    if (isApiSuccess(response)) {
      expect(response.data.title).to.equal('My note');
    }
  });

  it('rejects a failure response', () => {
    const response: ApiResponse<Note> = {
      error: { code: 'NOT_FOUND', message: 'Note not found' },
    };

    expect(isApiSuccess(response)).to.equal(false);
  });

  it('treats a success response carrying null data as a success', () => {
    // A 204-style endpoint still uses the success shape.
    const response: ApiResponse<null> = { data: null };

    expect(isApiSuccess(response)).to.equal(true);
  });
});
