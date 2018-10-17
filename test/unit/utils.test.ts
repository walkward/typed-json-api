/**
 * Testing utils
 */

import test from 'ava';

import { AppError } from '../../utils/errors';

test('Custom error object property tests', (t) => {
  const message = 'Sample Error';
  const err = new AppError(message, true);
  t.is(err.isOperational, true);
  t.is(err.message, message);
});
