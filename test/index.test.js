import test from 'ava';
import { Nuxt, Builder } from 'nuxt';
import { resolve } from 'path';

// PURPOSE OF E2E TESTING: exercise a complete production-like scenario.

// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt = null;

// Reference of our windows being tested
let homePage = null;

// Init Nuxt.js and start listening on localhost:3000
test.before('Init Nuxt.js', async () => {
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
});

// Close the nuxt instance once we finish our testing
test.after('Close Nuxt.js', async () => {
  nuxt.close();
});

test('[API] should display a list of agencies', async (t) => {
  const agencyList = homePage.document.getElementsByClassName('agency');
  for (var i = 0; i < agencyList.length; i++) {
    t.not(agencyList[i], null);
  }
});

test('[API] should display exactly 8 agencies', async (t) => {
  const agencyList = homePage.document.getElementsByClassName('agency');
  t.is(agencyList.length, 8);
});

test('[API] should display data in the winner agency card', async (t) => {
  const winnerAgency = homePage.document.querySelector('.winnerAgency-data');
  t.not(winnerAgency, null);
});

test('[API] should display a valid temperature value', async (t) => {
  var temperature = homePage.document.querySelector('.temperature').textContent;
  // Remove the ° sign
  temperature = temperature.slice(0, -1);
  // Convert to Int
  temperature = parseInt(temperature);
  // Check if the value is a valid number
  t.is(typeof !isNaN(parseFloat(temperature)) && !isNaN(temperature - 0), true);
});

test('[HTML] should display the correct title on the main page', async (t) => {
  const pageTitle = homePage.document.getElementsByTagName('H1')[0];
  t.is(pageTitle.textContent, 'It’s a beautiful Zenday !');
});

test('[HTML] should display the correct subtitle on the main page', async (t) => {
  const pageSubtitle = homePage.document.getElementsByTagName('P')[0];
  t.is(
    pageSubtitle.textContent.trim(),
    'Pour connaître la meilleure météo  aujourd’hui parmi les agences Zenika.'
  );
});

test('[HTML] should display the correct background image', async (t) => {
  const backgroundImage = homePage.document.querySelector('.home');
  const elementStyle = homePage.getComputedStyle(backgroundImage);
  t.not('', elementStyle.getPropertyValue('background-image'));
});

test('[ROUTING] should be on the correct URL path', async (t) => {
  const currentPath = homePage.location.pathname;
  t.is(currentPath, '/');
});
