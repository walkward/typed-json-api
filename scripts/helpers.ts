import log from '../src/utils/log';

export function done(message: string) {
  log.info(message || 'Done!');
  process.exit(0);
}
