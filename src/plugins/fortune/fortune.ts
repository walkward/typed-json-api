import * as fortune from 'fortune';
import * as fortunePostgres from 'fortune-postgres';

export const store = fortune({
  users: {
    firstname: String,
  },
}, {
  adapter: [ fortunePostgres, {
    url: 'postgres://user:de6a645113adf969363369ed4a25d3@localhost:5432/typed-json-api',
  }],
});
