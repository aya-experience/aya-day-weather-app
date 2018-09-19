import test from 'ava';
import { Nuxt, Builder } from 'nuxt';
import { resolve } from 'path';

// Handles tests related to /agencies/{agency}

let nuxt = null;
let agencyPage = null;

// Init Nuxt.js and start listening on localhost:3000
test.before('Init Nuxt.js', async () => {
  const rootDir = resolve(__dirname, '..');
  let config = {};
  config = require(resolve(rootDir, 'nuxt.config.js'));
  config.rootDir = rootDir; // project folder
  config.env.isDev = true; // dev build
  config.mode = 'universal'; // Isomorphic application
  nuxt = new Nuxt(config);
  await new Builder(nuxt).build();
  nuxt.listen(3003, 'localhost');
  agencyPage = await nuxt.renderAndGetWindow('http://localhost:3003/agencies/Paris');
});

// Close the nuxt instance once we finish our testing
test.after('Close Nuxt.js', async () => {
  nuxt.close();
});

test('[ROUTING] should display the correct city name in /agencies/Paris', async (t) => {
  const cityName = agencyPage.document.getElementsByTagName('H1')[0];
  t.is(cityName.textContent, 'Paris');
});

test('[HTML] should display a valid temperature in /agencies/Paris', async (t) => {
  let temperature = agencyPage.document.getElementsByTagName('H2')[0].textContent;
  // Remove the ° sign
  temperature = temperature.slice(0, -1);
  // Convert to Int
  temperature = parseInt(temperature, 10);
  // Check if the value is a valid number
  t.is(typeof !Number.isNaN(parseFloat(temperature)) && !Number.isNaN(temperature - 0), true);
});

test('[HTML] should display a valid previous temperature in /agencies/Paris', async (t) => {
  let temperature = agencyPage.document.getElementsByTagName('SPAN')[0].textContent;
  // Remove the ° sign
  temperature = temperature.slice(0, -1);
  // Convert to Int
  temperature = parseInt(temperature, 10);
  // Check if the value is a valid number
  t.is(typeof !Number.isNaN(parseFloat(temperature)) && !Number.isNaN(temperature - 0), true);
});

test('[HTML] should display a valid next temperature in /agencies/Paris', async (t) => {
  let temperature = agencyPage.document.getElementsByTagName('SPAN')[1].textContent;
  // Remove the ° sign
  temperature = temperature.slice(0, -1);
  // Convert to Int
  temperature = parseInt(temperature, 10);
  // Check if the value is a valid number
  t.is(typeof !Number.isNaN(parseFloat(temperature)) && !Number.isNaN(temperature - 0), true);
});
