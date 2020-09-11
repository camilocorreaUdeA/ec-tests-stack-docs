const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('./accounts');
const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const {
  SELECTORS: {
    WORKPLACES: { APP }
  }
} = require('./_config/constants');
const {
  submitAHA,
  updateAHA,
  submitAutomated,
  updateAutomated,
  submitUnmonitored,
  updateUnmonitored,
  loadRequirements
} = require('./apps/workplaces');

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
  await page.waitForSelector(APP);
  await page.click(APP);
  await pendingXHR.waitForAllXhrFinished();
});

afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Workplaces', () => {
    it('Submit automated LCR', async () => {
      const dataFound = await submitAutomated({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Update automated LCR', async () => {
      const dataFound = await updateAutomated({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Submit unmonitored', async () => {
      const dataFound = await submitUnmonitored({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Update unmonitored', async () => {
      const dataFound = await updateUnmonitored({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Submit AHA', async () => {
      const dataFound = await submitAHA({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Update AHA', async () => {
      const dataFound = await updateAHA({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });

    it('Load requirements', async () => {
      const dataFound = await loadRequirements({ page, pendingXHR });
      expect(dataFound).toBe(true);
    });
  });
});
