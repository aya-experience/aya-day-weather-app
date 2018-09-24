import test from 'ava';
import { Nuxt, Builder } from 'nuxt';
import { resolve } from 'path';

// UNIT TESTS FOR THE INDEX COMPONENT

let nuxt = null;

test.before('Init Nuxt.js', async () => {
  const rootDir = resolve(__dirname, '../..');
  let config = {};
  config = require(resolve(rootDir, 'nuxt.config.js'));
  config.rootDir = rootDir; // project folder
  config.env.isDev = true; // dev build
  config.mode = 'universal'; // Isomorphic application
  nuxt = new Nuxt(config);
  await new Builder(nuxt).build();
  nuxt.listen(3004, 'localhost');
});

test.after('Close Nuxt.js', async () => {
  nuxt.close();
});

test('[TEST] should be true', async (t) => {
  t.is(true, true);
});