const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const {
  SELECTORS: { WELCOME_MESSAGE }
} = require('./_config/constants');
const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../helpers/puppeteer');
const accounts = require('./accounts');

const puppeteer = new Puppeteer();
let page;
let pendingXHR;

beforeAll(async () => {
  page = await puppeteer.newPage();
  pendingXHR = new PendingXHR(page);
  await accounts.loginPage({ page });
});

afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Login to secure.evercheck.com', () => {
    it('Login to secure.evercheck.com', async () => {
      await accounts.login({ page });
      const value = await page.evaluate(
        ({ WELCOME_MESSAGE }) => document.querySelector(WELCOME_MESSAGE).textContent,
        { WELCOME_MESSAGE }
      );
      expect(value).toBe('Welcome to EverCheck!');
    });

    it('Logout of secure.evercheck.com', async () => {
      await accounts.logout(page);
      expect(page.url()).toBe(config.urlEvercheck);
    });
  });
});
