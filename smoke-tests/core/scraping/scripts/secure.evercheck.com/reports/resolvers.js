/**
 * @module secure - reports/resolvers
 */
const { waitDataTextInSelectors } = require('./utils');
const {
  SELECTORS: {
    RESULTS,
    END_DATE,
    DIV_FORM,
    NOT_FOUND,
    START_DATE,
    BUTTON_VIEW,
    SEARCH_BUTTON,
    CARD_EXPIRATION_DATE,
    GRAPH_EXPIRATION_DATE,
    CARD_LICENSE_STATUS_REPORT,
    ITEM_LICENSE_STATUS_REPORT,
    OUTSIDE_DATE_CONTAINER
  },
  MESSAGES: { NO_TEXT_IN_TABLE }
} = require('./constants');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to reports and then check the license status widget is loaded
 */
const licenseStatus = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(CARD_LICENSE_STATUS_REPORT);
  await page.click(CARD_LICENSE_STATUS_REPORT);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(ITEM_LICENSE_STATUS_REPORT);
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to reports, then click expiration date card and then check the expiration date graph widget is loaded
 */
const expirationDate = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(CARD_EXPIRATION_DATE);
  await page.click(CARD_EXPIRATION_DATE);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(GRAPH_EXPIRATION_DATE);
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to reports and then click on date renewed card, check table loads information
 */
const dateRenewed = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(BUTTON_VIEW);
  await page.click(BUTTON_VIEW);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(DIV_FORM);
  await page.waitForSelector(START_DATE[0]);
  await page.type(START_DATE[0], START_DATE[1]);
  await page.waitFor(1500);
  await page.click(OUTSIDE_DATE_CONTAINER);
  await page.waitForSelector(END_DATE[0]);
  await page.click(END_DATE[0]);
  await page.type(END_DATE[0], END_DATE[1]);
  await page.waitForSelector(SEARCH_BUTTON);
  await page.click(DIV_FORM);
  await pendingXHR.waitForAllXhrFinished();
  await page.click(SEARCH_BUTTON);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(5000);
  const tableHasText = await waitDataTextInSelectors({ page }, NOT_FOUND, RESULTS);
  if (!tableHasText) return NO_TEXT_IN_TABLE;
  return true;
};

module.exports = {
  dateRenewed,
  licenseStatus,
  expirationDate
};
