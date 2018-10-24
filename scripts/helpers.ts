export function done(message: string) {
  console.log(message || 'Done!');
  process.exit(0);
}
