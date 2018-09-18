import test from 'ava';
import { Nuxt, Builder } from 'nuxt';
import { resolve } from 'path';

// PURPOSE OF E2E TESTING: exercise a complete production-like scenario.

// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt = null;

// Reference of our windows being tested
let homePage = null;
let agencyPage = null;

// Init Nuxt.js and start listening on localhost:3000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..');
  let config = {};
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'));
  } catch (e) {}
  config.rootDir = rootDir; // project folder
  config.env.isDev = true; // dev build
  config.mode = 'universal'; // Isomorphic application
  nuxt = new Nuxt(config);
  await new Builder(nuxt).build();
  nuxt.listen(3001, 'localhost');
  homePage = await nuxt.renderAndGetWindow('http://localhost:3001/');
  agencyPage = await nuxt.renderAndGetWindow('http://localhost:3001/agencies/Paris');
});

// Close the nuxt instance once we finish our testing
test.after('Close Nuxt.js', async t => {
  nuxt.close();
});

// API data testing
test('[API] Verify that the list of agencies exists and is not empty', async t => {
  const agencyList = homePage.document.getElementsByClassName('agency');
  for (var i = 0; i < agencyList.length; i++) {
    t.not(agencyList[i], null);
  }
});

test('[API] Verify that the list has the right number of agencies (8)', async t => {
  const agencyList = homePage.document.getElementsByClassName('agency');
  t.is(agencyList.length, 8);
});

test('[API] Verify that the winner agency card is populated with data', async t => {
  const winnerAgency = homePage.document.querySelector('.winnerAgency-data');
  t.not(winnerAgency, null);
});

test('[API] Verify that the /agency/Paris page displays a valid temparature value', async t => {
  var temperature = agencyPage.document.getElementsByTagName('H2')[0].textContent;
  // Remove the ° sign
  temperature = temperature.slice(0, -1);
  // Convert to Int
  temperature = parseInt(temperature);
  // Check if the value is a valid number
  t.is(typeof !isNaN(parseFloat(temperature)) && !isNaN(temperature - 0), true);
});

// HTML values testing
test('[HTML] Verify that the title of the page is correct', async t => {
  const pageTitle = homePage.document.getElementsByTagName('H1')[0];
  t.is(pageTitle.textContent, 'It’s a beautiful Zenday !');
});

test('[HTML] Verify that the subtitle of the page is correct', async t => {
  const pageSubtitle = homePage.document.getElementsByTagName('P')[0];
  t.is(
    pageSubtitle.textContent.trim(),
    'Pour connaître la meilleure météo  aujourd’hui parmi les agences Zenika.'
  );
});

// Routing testing
test('[ROUTING] Verify that we are on the correct URL path', async t => {
  const currentPath = homePage.location.pathname;
  t.is(currentPath, '/');
});

test('[ROUTING] Verify that the /agencies/Paris path displays correct informations', async t => {
  const cityName = agencyPage.document.getElementsByTagName('H1')[0];
  t.is(cityName.textContent, 'Paris');
});
