import test from 'ava';
import { Nuxt, Builder } from 'nuxt';
import { resolve } from 'path';

let nuxt = null;
let errorPage = null;

// Init Nuxt.js and start listening on localhost:3002
// Init Nuxt.js with the wrong API URL to reach an error page
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..');
  let config = {};
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'));
  } catch (e) {}
  config.rootDir = rootDir; // project folder
  config.env.isDev = false; // prod build
  config.env.baseUrl = ''; // Set a false API URL
  config.mode = 'universal'; // Isomorphic application
  nuxt = new Nuxt(config);
  await new Builder(nuxt).build();
  nuxt.listen(3002, 'localhost');
  errorPage = await nuxt.renderAndGetWindow('http://localhost:3002/');
});

// HTML
test('[HTML] Verify that an unreachable server displays the right title and subtitle', async t => {
  const errorTitle = errorPage.document.getElementsByTagName('H1')[0];
  const errorSubtitle = errorPage.document.getElementsByTagName('P')[0];
  t.is(errorTitle.textContent.trim(), 'Uh oh... le serveur est injoignable !');
  t.is(
    errorSubtitle.textContent.trim(),
    'Nos ingénieurs travaillent nuit et jour pour régler ce soucis.'
  );
});

test('[HTML] Verify that an unreachable server displays a detailed error message', async t => {
  const errorDetails = errorPage.document.getElementsByTagName('P')[1];
  t.not(errorDetails.textContent.trim(), '');
});
