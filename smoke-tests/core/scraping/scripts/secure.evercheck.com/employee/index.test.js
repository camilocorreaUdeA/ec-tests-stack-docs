const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('../../accounts.evercheck.com/accounts');
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const resolver = require('./resolvers');
const { hideChatAssistant, chatAssistantExist } = require('../utils');
const {
  SELECTORS: { CARD_FEATURE_EMPLOYEES, INPUT_SEARCH_EMPLOYEES }
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
  await page.waitFor(CARD_FEATURE_EMPLOYEES);
  if (await chatAssistantExist({ page })) await hideChatAssistant({ page });
  await page.click(CARD_FEATURE_EMPLOYEES);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(INPUT_SEARCH_EMPLOYEES);
});
afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Employee App', () => {
    it('Search By Name', async () => {
      const dataFound = await resolver.byName({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Search By Id Employee', async () => {
      const dataFound = await resolver.byIdEmployeeNumber({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Search By LCR', async () => {
      const dataFound = await resolver.byLCR({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Search By Name Top Bar', async () => {
      const dataFound = await resolver.byNameTop({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Search By Id Employee Top Bar', async () => {
      const dataFound = await resolver.byIdEmployeeNumberTop({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Search By LCR Top Bar', async () => {
      const dataFound = await resolver.byLCRTop({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Load position requirements', async () => {
      const dataFound = await resolver.loadPositionRequirements({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Check position requirements satisfied', async () => {
      const dataFound = await resolver.checkPositionRequirementSatisfied({
        page,
        pendingXHR
      });
      expect(dataFound).toBe(true);
    });
  });
});
