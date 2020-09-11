const { config } = require(`./_config/${process.env.NODE_ENV}.config`);
const { Puppeteer } = require('./../../../../helpers/puppeteer');
const axios = require('axios');

const {
  SELECTORS: {
    UI: { TITLE, QUEUES_LIST }
  }
} = require('./_config/constants');

const puppeteer = new Puppeteer(null, null);
let page;

describe(`${config.url}`, () => {
  describe('Check API functionality', () => {
    let resultApi;
    beforeAll(async () => {
      resultApi = await axios.get(config.url);
    });

    it('Health Check', async () => {
      const {
        status,
        config: { url }
      } = resultApi;
      expect(status).toBe(200);
      expect(url).toBe(config.url);
    });
  });

  describe('Check queues load propertly', () => {
    beforeAll(async () => {
      page = await puppeteer.newPage();
      await page.authenticate({ username: config.username, password: config.password });
    });

    afterAll(async () => {
      await page.closeAndDeleteCache();
    });

    it('Check queues load propertly', async () => {
      await page.goto(`${config.url}/ui`);
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
      expect(totalQueuesLoaded).toBeGreaterThan(25);
    });
  });
});
