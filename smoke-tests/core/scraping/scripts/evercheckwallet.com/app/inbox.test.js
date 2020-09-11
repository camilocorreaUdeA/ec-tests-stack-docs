const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('./accounts');
const { checkInboxMessage } = require('./apps/inbox');

const puppeteer = new Puppeteer();
let page;
let pendingXHR;

beforeAll(async () => {
  page = await puppeteer.newPage();
  pendingXHR = new PendingXHR(page);
  await accounts.loginPage(page);
  await accounts.login(page);
});

beforeEach(async () => {
  await page.goto(config.url, { waitUntil: 'load' });
  await pendingXHR.waitForAllXhrFinished();
});

afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Inbox', () => {
    it('Check inbox messages are clickable', async () => {
      const dataFound = await checkInboxMessage({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });
  });
});
