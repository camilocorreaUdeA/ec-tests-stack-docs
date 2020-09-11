const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('../../accounts.evercheck.com/accounts');
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const resolver = require('./resolvers.js');
const { hideChatAssistant, chatAssistantExist } = require('../utils');

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
  await page.goto(`${config.url}/bulk-uploads`, { waitUntil: 'load' });
  await pendingXHR.waitForAllXhrFinished();
  if (await chatAssistantExist({ page })) await hideChatAssistant({ page });
});

afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Bulk Uploads', () => {
    it('Employees download and summary', async () => {
      const result = await resolver.downloadAndCheckSummary({ page, pendingXHR });
      expect(result).toBe(true);
    });
  });
});
