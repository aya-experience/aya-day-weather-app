/**
 * @jest-environment node
 */
import { Nuxt, Builder } from 'nuxt';

// Integration testing for error.vue

let nuxt = null;
let errorPage = null;
let config = {};
config = require('../../nuxt.config');

describe('[INTEGRATION] Error.test.js', () => {
  beforeAll(async () => {
    config.axios.baseURL = 'http://localhost:8081';
    nuxt = new Nuxt(config);
    await new Builder(nuxt).build();
    await nuxt.listen(3001, 'localhost');
    errorPage = await nuxt.renderAndGetWindow('http://localhost:3001/');
  });

  afterAll(() => {
    nuxt.close();
  });

  /**
   * @jest-environment jsdom
   */
  it('should display the right title when the server is unreachable', () => {
    const errorTitle = errorPage.document.getElementsByTagName('H1')[0];
    expect(errorTitle.textContent.trim()).toBe('Uh oh... le serveur est injoignable !');
  });

  it('should display the right subtitle when the server is unreachable', () => {
    const errorSubtitle = errorPage.document.getElementsByTagName('P')[0];
    expect(errorSubtitle.textContent.trim()).toBe(
      'Nos ingénieurs travaillent nuit et jour pour régler ce soucis.',
    );
  });

  it('should display a detailed error message when the server is unreachable', () => {
    const errorDetails = errorPage.document.getElementsByTagName('P')[1];
    expect(errorDetails.textContent.trim()).not.toBe('');
  });
});
