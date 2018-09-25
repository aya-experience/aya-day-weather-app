/**
 * @jest-environment node
 */
import { Nuxt, Builder } from 'nuxt';

// Integration testing for index.vue

let nuxt = null;
let homePage = null;
let config = {};
config = require('../../nuxt.config');

describe('[INTEGRATION] Index.test.js', () => {
  beforeAll(async () => {
    config.env.isDev = false; // dev build
    nuxt = new Nuxt(config);
    await new Builder(nuxt).build();
    await nuxt.listen(3000, 'localhost');
    homePage = await nuxt.renderAndGetWindow('http://localhost:3000/');
  });

  afterAll(() => {
    nuxt.close();
  });

  /**
   * @jest-environment jsdom
   */
  it('should display a list of agencies', () => {
    const agencyList = homePage.document.getElementsByClassName('agency');
    for (let i = 0; i < agencyList.length; i += 1) {
      expect(agencyList[i]).not.toBe(null);
    }
  });

  it('should have exaclty 8 agencies', () => {
    const agencyList = homePage.document.getElementsByClassName('agency');
    expect(agencyList.length).toBe(8);
  });

  it('should display data in the winner agency card', () => {
    const winnerAgency = homePage.document.getElementsByClassName('.winnerAgency-data');
    expect(winnerAgency).not.toBe(null);
  });

  it('should get & display a valid temperature value', () => {
    const temperature = homePage.document.querySelector('.temperature').textContent;
    expect.stringMatching(temperature, '/(d+|d+.d+)s*°C/');
  });

  it('should display the correct title', () => {
    const pageTitle = homePage.document.getElementsByTagName('H1')[0];
    expect(pageTitle.textContent).toBe('It’s a beautiful Zenday !');
  });

  it('should display the correct subtitle', () => {
    const pageSubtitle = homePage.document.getElementsByTagName('P')[0];
    expect(pageSubtitle.textContent.trim()).toBe(
      'Pour connaître la meilleure météo  aujourd’hui parmi les agences Zenika.',
    );
  });

  it('should display the correct background image', () => {
    const backgroundImage = homePage.document.querySelector('.home');
    const elementStyle = homePage.getComputedStyle(backgroundImage);
    expect(elementStyle.getPropertyValue('background-image')).not.toBe('');
  });

  it('should be on the correct URL path', () => {
    const currentPath = homePage.location.pathname;
    expect(currentPath).toBe('/');
  });
});
