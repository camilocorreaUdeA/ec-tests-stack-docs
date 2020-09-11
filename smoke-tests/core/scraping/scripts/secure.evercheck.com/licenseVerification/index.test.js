const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('../../accounts.evercheck.com/accounts');
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const resolver = require('./resolvers');
const { hideChatAssistant, chatAssistantExist } = require('../utils');
const {
  SELECTORS: { CARD_LICENSE_VERIFICATION }
} = require('./constants');

const puppeteer = new Puppeteer(null, null);
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
  await page.waitFor(CARD_LICENSE_VERIFICATION);
  if (await chatAssistantExist({ page })) await hideChatAssistant({ page });
  await page.waitForFunction(
    CARD_LICENSE_VERIFICATION => {
      let item = document.querySelector(CARD_LICENSE_VERIFICATION);
      return item.textContent.includes('License Verification');
    },
    { waitUntil: 'load' },
    CARD_LICENSE_VERIFICATION
  );
  await page.click(CARD_LICENSE_VERIFICATION);
});
afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('LV App', () => {
    it('Pending Credentials Report (PCR)', async () => {
      const result = await resolver.pendingCredentialsReport({ page, pendingXHR });
      expect(result).toBe(true);
    });

    it('Disciplinary actions', async () => {
      const result = await resolver.disciplinaryActions({ page, pendingXHR });
      expect(result).toBe(true);
    });

    it('Name discrepancies', async () => {
      const result = await resolver.nameDiscrepancies({ page, pendingXHR });
      expect(result).toBe(true);
    });

    it('Position requirements report', async () => {
      const result = await resolver.positionRequirementReport({ page, pendingXHR });
      expect(result).toBe(true);
    });
  });
});
