const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PUPPETEER } = require('../constants');
const logger = require('./../../helpers/logger');

/**
 * @class Puppeteer
 * @constructor
 * @param {Object} browserOptions - {
      headless: true,
      slowMo: 0,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-profile']
    }
 * @param {Object} viewportOptions - {
      width: 1024,
      height: 900
    }
 * @param {Number} timeout - 180000
 * @classdesc Puppeteer class, contains newPage method
 */

class Puppeteer {
  constructor(browserOptions, viewportOptions, timeout) {
    this.browserOptions = browserOptions || PUPPETEER.BROWSER_DEFAULT_OPTIONS;
    this.viewportOptions = viewportOptions || PUPPETEER.PAGE_VIEW_PORT_DEFAULT_OPTIONS;
    this.timeout = timeout || PUPPETEER.TIME_OUT;
  }

  /**
   * @method
   * @async
   * @returns {Page} PuppeteerPage
   * @summary This function opens a new browser window, then creates and returns a new page
   */
  async newPage() {
    const browser = await puppeteer.launch(this.browserOptions);
    const page = await browser.newPage();
    await page.setDefaultTimeout(this.timeout);
    await page.setViewport(this.viewportOptions);
    await page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: path.join(__dirname, '../../downloads')
    });

    page.closeAndDeleteCache = async () => {
      let [argUserDataDir] = await page
        .browser()
        .process()
        .spawnargs.filter(item => item.includes('--user-data-dir='));
      try {
        await page.close();
        await page.browser().close();
      } catch (error) {
        logger.error(error);
      } finally {
        if (argUserDataDir) {
          argUserDataDir = argUserDataDir.replace('--user-data-dir=', '');
          if (fs.existsSync(argUserDataDir)) fs.unlinkSync(argUserDataDir);
        }
      }
    };
    return page;
  }
}

module.exports = Puppeteer;
