const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('../../accounts.evercheck.com/accounts');
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const resolver = require('./resolvers');
const { hideChatAssistant, chatAssistantExist } = require('../utils');
const {
  SELECTORS: { CARD, TITTLE }
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
  await page.waitFor(CARD);
  if (await chatAssistantExist({ page })) await hideChatAssistant({ page });
  await page.click(CARD);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(TITTLE);
});
afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Position Requirements App', () => {
    it('Positions and Requirements Overview', async () => {
      const dataFound = await resolver.overview({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });
    it('Positions and Requirements List', async () => {
      const dataFound = await resolver.list({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });
    it('Unknown Positions Widget', async () => {
      const dataFound = await resolver.unknownPositions({
        page,
        pendingXHR
      });
      expect(dataFound).toBe(true);
    });
    it('Unknown Requirements Widget', async () => {
      const dataFound = await resolver.unknownRequirements({
        page,
        pendingXHR
      });
      expect(dataFound).toBe(true);
    });
    it('Positions Requirements Library', async () => {
      const dataFound = await resolver.library({
        page,
        pendingXHR
      });
      expect(dataFound).toBe(true);
    });
  });
});
