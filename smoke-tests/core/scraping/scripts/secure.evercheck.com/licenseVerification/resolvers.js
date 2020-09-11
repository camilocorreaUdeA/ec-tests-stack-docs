/**
 * @module secure - licenseVerification/resolvers
 */
const {
  waitTextContentInSelector,
  waitTextExistsInSelector
} = require('../../../../utils');
const {
  SELECTORS: {
    DISCIPLINARY_ACTION_TAB,
    NAME_DISCREPANCIES_TAB,
    DISCIPLINARY_ACTION_CLEAR_TO_WORK_TAB,
    DISCIPLINARY_ACTION_ACTIVITY_TAB,
    DISCIPLINARY_ACTION_NEED_REVIEW_TAB,
    PENDING_CREDENTIAL_TAB,
    CREDENTIAL_REVIEW_NEED_REVIEW_TAB,
    CREDENTIAL_REVIEW_COMPLETED_TAB,
    COMPLETE_BUTTON,
    CARD,
    BACK_PAGE,
    REPORT_NO_SATISFIED,
    REPORT_UNKNOWN,
    REPORT_SATISFIED,
    REPORT_LIST
  },
  MESSAGES: { TAB_BUTTON_NOT_FOUND }
} = require('./constants');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to license verification section, and  then go to disciplinary actions widget.
 */
const disciplinaryActions = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();

  await page.waitFor(DISCIPLINARY_ACTION_TAB);
  await page.click(DISCIPLINARY_ACTION_TAB);
  await pendingXHR.waitForAllXhrFinished();

  await page.waitFor(DISCIPLINARY_ACTION_NEED_REVIEW_TAB);
  await page.click(DISCIPLINARY_ACTION_NEED_REVIEW_TAB);
  await pendingXHR.waitForAllXhrFinished();

  await page.waitFor(DISCIPLINARY_ACTION_CLEAR_TO_WORK_TAB);
  await page.click(DISCIPLINARY_ACTION_CLEAR_TO_WORK_TAB);
  await pendingXHR.waitForAllXhrFinished();

  await page.waitFor(DISCIPLINARY_ACTION_ACTIVITY_TAB);
  await page.click(DISCIPLINARY_ACTION_ACTIVITY_TAB);
  await pendingXHR.waitForAllXhrFinished();
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to license verification section, and go to name discrepancies widget.
 */
const nameDiscrepancies = async ({ page, pendingXHR }) => {
  await page.waitFor(NAME_DISCREPANCIES_TAB);
  await page.click(NAME_DISCREPANCIES_TAB);
  await pendingXHR.waitForAllXhrFinished();
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to license verification section, and go to pending credentials widget.
 */
const pendingCredentialsReport = async ({ page, pendingXHR }) => {
  await page.waitFor(PENDING_CREDENTIAL_TAB);
  const pendingCredentialsTabExists = await waitTextContentInSelector(
    { page },
    PENDING_CREDENTIAL_TAB,
    'PENDING CREDENTIALS'
  );
  if (!pendingCredentialsTabExists) return TAB_BUTTON_NOT_FOUND;

  await page.click(PENDING_CREDENTIAL_TAB);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CREDENTIAL_REVIEW_NEED_REVIEW_TAB);
  await page.click(CREDENTIAL_REVIEW_NEED_REVIEW_TAB);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CREDENTIAL_REVIEW_COMPLETED_TAB);
  const credentialsReviewTabExists = await waitTextContentInSelector(
    { page },
    CREDENTIAL_REVIEW_COMPLETED_TAB,
    'COMPLETED'
  );
  if (!credentialsReviewTabExists) return TAB_BUTTON_NOT_FOUND;

  await page.click(CREDENTIAL_REVIEW_COMPLETED_TAB);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(COMPLETE_BUTTON);
  const completeButtonExists = await waitTextContentInSelector(
    { page },
    COMPLETE_BUTTON,
    'Details'
  );
  if (!completeButtonExists) return TAB_BUTTON_NOT_FOUND;

  await page.click(COMPLETE_BUTTON);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector('.close');
  await page.waitFor(1000);
  await page.click('.close');
  await pendingXHR.waitForAllXhrFinished();

  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to license verification section, and go to position requirements widget.
 */
const positionRequirementReport = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CARD);
  await page.waitForSelector(REPORT_NO_SATISFIED);
  await page.click(REPORT_NO_SATISFIED);
  await pendingXHR.waitForAllXhrFinished();
  await waitTextExistsInSelector({ page }, REPORT_LIST);
  await page.waitForSelector(BACK_PAGE);
  await page.click(BACK_PAGE);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CARD);
  await page.waitForSelector(REPORT_SATISFIED);
  await page.click(REPORT_SATISFIED);
  await pendingXHR.waitForAllXhrFinished();
  await waitTextExistsInSelector({ page }, REPORT_LIST);
  await page.waitForSelector(BACK_PAGE);
  await page.click(BACK_PAGE);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CARD);
  await page.waitForSelector(REPORT_UNKNOWN);
  await page.click(REPORT_UNKNOWN);
  await pendingXHR.waitForAllXhrFinished();
  await waitTextExistsInSelector({ page }, REPORT_LIST);
  return true;
};

module.exports = {
  disciplinaryActions,
  nameDiscrepancies,
  pendingCredentialsReport,
  positionRequirementReport
};
