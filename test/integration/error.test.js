import test from 'ava';
import { Nuxt, Builder } from 'nuxt';
import { resolve } from 'path';

// INTEGRATION TESTS FOR THE ERROR PAGE

let nuxt = null;
let errorPage = null;

test.before('Init Nuxt.js', async () => {
  const rootDir = resolve(__dirname, '../..');
  let config = {};
  config = require(resolve(rootDir, 'nuxt.config.js'));
  config.rootDir = rootDir; // project folder
  config.env.isDev = false; // prod build
  config.env.baseUrl = ''; // Set a false API URL
  config.mode = 'universal'; // Isomorphic application
  nuxt = new Nuxt(config);
  await new Builder(nuxt).build();
  nuxt.listen(3002, 'localhost');
  errorPage = await nuxt.renderAndGetWindow('http://localhost:3002/');
});

// Close the nuxt instance once we finish our testing
test.after('Close Nuxt.js', async () => {
  nuxt.close();
});

test('[HTML] should display the right title when the server is unreachable', async (t) => {
  const errorTitle = errorPage.document.getElementsByTagName('H1')[0];
  t.is(errorTitle.textContent.trim(), 'Uh oh... le serveur est injoignable !');
});

test('[HTML] should display the right subtitle when the server is unreachable', async (t) => {
  const errorSubtitle = errorPage.document.getElementsByTagName('P')[0];
  t.is(
    errorSubtitle.textContent.trim(),
    'Nos ingénieurs travaillent nuit et jour pour régler ce soucis.',
  );
});

test('[HTML] should display a detailed error message when the server is unreachable', async (t) => {
  const errorDetails = errorPage.document.getElementsByTagName('P')[1];
  t.not(errorDetails.textContent.trim(), '');
});
