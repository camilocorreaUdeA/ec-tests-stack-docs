const { Puppeteer } = require('./../../../../../helpers/puppeteer');
const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const {
  SELECTORS: {
    UI: { TITLE, QUEUES_LIST }
  }
} = require('./_config/constants');

const puppeteer = new Puppeteer(null, null);
let page;

beforeAll(async () => {
  page = await puppeteer.newPage();
  await page.authenticate({ username: config.username, password: config.password });
});

afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Check queues load propertly', () => {
    it('Check queues load propertly', async () => {
      await page.goto(config.url);
      await page.waitForSelector(TITLE);
      await page.waitForFunction(
        QUEUES_LIST => {
          const queuesRows = document.querySelectorAll(QUEUES_LIST);
          return queuesRows.length > 10;
        },
        { waitUntil: 'load' },
        QUEUES_LIST
      );
      const totalQueuesLoaded = await page.evaluate(QUEUES_LIST => {
        const queuesRows = document.querySelectorAll(QUEUES_LIST);
        return queuesRows.length;
      }, QUEUES_LIST);

      expect(totalQueuesLoaded).toBeGreaterThan(100);
    });
  });
});
