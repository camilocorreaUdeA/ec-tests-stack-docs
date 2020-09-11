const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../../helpers/puppeteer');
const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const { checkActiveJobs } = require('./app');

const puppeteer = new Puppeteer(null, null);
let page;
let pendingXHR;

beforeAll(async () => {
  page = await puppeteer.newPage();
  pendingXHR = new PendingXHR(page);
});

beforeEach(async () => {
  await page.goto(config.url, { waitUntil: 'load' });
});

afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Check monitor show queues', () => {
    it('Check active jobs panel', async () => {
      const existActivePanel = await checkActiveJobs({ page, pendingXHR });
      expect(existActivePanel).toBe(true);
    });
  });
});
