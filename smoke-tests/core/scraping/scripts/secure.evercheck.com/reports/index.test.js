const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('../../accounts.evercheck.com/accounts');
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const resolver = require('./resolvers');
const { hideChatAssistant, chatAssistantExist } = require('../utils');
const {
  SELECTORS: { CARD_FEATURE_REPORTS }
} = require('./constants');

const puppeteer = new Puppeteer();
let page;
let pendingXHR;

beforeAll(async () => {
  page = await puppeteer.newPage();
  pendingXHR = new PendingXHR(page);
  await accounts.loginPage({ page });
  await accounts.login({ page });
});
beforeEach(async () => {
  await page.goto(config.url, { waitUntil: 'load' });
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(CARD_FEATURE_REPORTS);
  if (await chatAssistantExist({ page })) await hideChatAssistant({ page });
  await page.click(CARD_FEATURE_REPORTS);
  await pendingXHR.waitForAllXhrFinished();
});
afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Reports App', () => {
    it('License Status', async () => {
      const result = await resolver.licenseStatus({ page, pendingXHR });
      expect(result).toBe(true);
    });

    it('Expiration date report', async () => {
      const result = await resolver.expirationDate({ page, pendingXHR });
      expect(result).toBe(true);
    });

    it('Date renewed', async () => {
      const result = await resolver.dateRenewed({ page, pendingXHR });
      expect(result).toBe(true);
    });
  });
});
