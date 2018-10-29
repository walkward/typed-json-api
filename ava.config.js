/*!
 * File summary...
 */

export default {
  compileEnhancements: false,
  extensions: [
    'ts',
  ],
  files: [
    'test/**/*.test.ts',
  ],
  sources: [
    'src/**/*.ts',
    '!dist/**/*',
  ],
  require: [
    'ts-node/register',
    'tsconfig-paths/register',
    'dotenv/config',
  ],
};
