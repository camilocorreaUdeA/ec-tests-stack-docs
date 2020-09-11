/**
 * @module secure - prehire/resolvers
 */
const fs = require('fs');
const path = require('path');
const {
  SELECTORS: {
    PREHIRE_OVERVIEW_TAB,
    WIDGET_CLEAR_TO_HIRE,
    WIDGET_NEED_REVIEW,
    WIDGET_WAITING_ON_CANDIDATE,
    PREHIRE_CANDIDATES_TAB,
    TOTAL_CANDIDATE_TABLE,
    FIRST_ITEM_WIDGET_DAYS_IN_SYSTEM,
    LAST_ITEM_WIDGET_DAYS_IN_SYSTEM,
    WIDGET_TABLE_BY_ISSUE,
    FIRST_ITEM_DATE_IN_SYSTEM_CANDIDATE_TABLE,
    INPUT_FILTER_CANDIDATE,
    POSITION_REQUIREMENTS,
    HIRING_STATUS_CALCULATE,
    REQUIREMENT_STATUS_CALCULATE,
    CANDIDATES_TABLE
  }
} = require('./constants');
const { config } = require(`../_config/${process.env.NODE_ENV}.config`);
const {
  convertSelectorTextToNum,
  convertSelectorReplacedTextToNum,
  waitStatusCalculate
} = require('./utils');
const { waitTextContentInSelector } = require('../../../../utils');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {number} clear to hire field
 * @returns {number} needs review field
 * @returns {number} waiting on candidate field
 * @returns {number} sum of above fields
 * @returns {number} total in candidates table
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and check numbers in candidate totals widget.
 */
const candidateTotal = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(PREHIRE_CANDIDATES_TAB);

  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(PREHIRE_OVERVIEW_TAB);
  await page.click(PREHIRE_OVERVIEW_TAB);

  await pendingXHR.waitForAllXhrFinished();

  const countClearToHire = await convertSelectorTextToNum({ page }, WIDGET_CLEAR_TO_HIRE);
  const countNeedReview = await convertSelectorTextToNum({ page }, WIDGET_NEED_REVIEW);

  const countWaitingOnCandidate = await convertSelectorTextToNum(
    { page },
    WIDGET_WAITING_ON_CANDIDATE
  );

  const sumWidgets = countClearToHire + countNeedReview + countWaitingOnCandidate;

  await page.click(PREHIRE_CANDIDATES_TAB);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CANDIDATES_TABLE);
  await page.waitFor(5000);

  const countTableCandidates = await convertSelectorTextToNum(
    { page },
    TOTAL_CANDIDATE_TABLE
  );

  return {
    countClearToHire,
    countNeedReview,
    countWaitingOnCandidate,
    sumWidgets,
    countTableCandidates
  };
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and check numbers in candidates by issue table widget.
 */
const byIssue = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(PREHIRE_OVERVIEW_TAB);
  await page.click(PREHIRE_OVERVIEW_TAB);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(`${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(1)`);

  await waitTextContentInSelector(
    { page },
    `${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(1)`,
    'Elapsed license'
  );

  await page.waitFor(`${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(2)`);
  await waitTextContentInSelector(
    { page },
    `${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(2)`,
    'Negative license status'
  );

  await page.waitFor(`${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(3)`);
  await waitTextContentInSelector(
    { page },
    `${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(3)`,
    'Board/Disciplinary action'
  );

  await page.waitFor(`${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(4)`);
  await waitTextContentInSelector(
    { page },
    `${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(4)`,
    'Name discrepancy'
  );

  await page.waitFor(`${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(5)`);
  await waitTextContentInSelector(
    { page },
    `${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(5)`,
    'License expiring prior to start date'
  );

  await page.waitFor(`${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(6)`);
  await waitTextContentInSelector(
    { page },
    `${WIDGET_TABLE_BY_ISSUE} > tr:nth-child(6)`,
    'Documentation should be verified'
  );
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {number} days in system
 * @returns {number} days in system
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and check numbers in candidate days in system widget.
 */
const daysInSystem = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(PREHIRE_OVERVIEW_TAB);
  await page.click(PREHIRE_OVERVIEW_TAB);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(FIRST_ITEM_WIDGET_DAYS_IN_SYSTEM);
  await waitTextContentInSelector({ page }, FIRST_ITEM_WIDGET_DAYS_IN_SYSTEM, 'days');

  const daysInSystemFirstItem = await convertSelectorReplacedTextToNum(
    { page },
    FIRST_ITEM_WIDGET_DAYS_IN_SYSTEM
  );

  await page.waitFor(LAST_ITEM_WIDGET_DAYS_IN_SYSTEM);
  await waitTextContentInSelector({ page }, LAST_ITEM_WIDGET_DAYS_IN_SYSTEM, 'days');

  const daysInSystemLastItem = await convertSelectorReplacedTextToNum(
    { page },
    LAST_ITEM_WIDGET_DAYS_IN_SYSTEM
  );

  return { daysInSystemFirstItem, daysInSystemLastItem };
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and check candidate days in system widget is loaded.
 */
const canditateListLoad = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(FIRST_ITEM_DATE_IN_SYSTEM_CANDIDATE_TABLE);
  await waitTextContentInSelector(
    { page },
    FIRST_ITEM_DATE_IN_SYSTEM_CANDIDATE_TABLE,
    'days'
  );
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and check candidate days in system widget is filtering.
 */
const canditateListFiltred = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(INPUT_FILTER_CANDIDATE);
  await page.type(INPUT_FILTER_CANDIDATE, config.PREHIRE_SEARCH);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(FIRST_ITEM_DATE_IN_SYSTEM_CANDIDATE_TABLE);
  await waitTextContentInSelector(
    { page },
    FIRST_ITEM_DATE_IN_SYSTEM_CANDIDATE_TABLE,
    'days'
  );
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and then click on candidates tab and check export button works.
 */
const candidateListExported = async ({ page, pendingXHR }) => {
  let [downloadPath] = page
    .browser()
    .process()
    .spawnargs.filter(item => item.includes('--user-data-dir='));
  downloadPath = downloadPath.replace('--user-data-dir=', '');
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath
  });
  await page.waitFor('#Candidates > div > div.toolbar > button');
  await page.click('#Candidates > div > div.toolbar > button');
  await pendingXHR.waitForAllXhrFinished();
  while (!fs.existsSync(path.join(downloadPath, 'candidates_list.xlsx'))) {
    // Check untill exist
  }
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and then click on candidates tab and check export button works.
 */
const candidatePositionRequirementLoad = async ({ page, pendingXHR }) => {
  await page.waitFor('div.view-requirements');
  await waitStatusCalculate({ page }, POSITION_REQUIREMENTS);

  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and then click on candidates tab and click on the first table entry and check position info status.
 */
const candidateHiringStatusCalcucate = async ({ page, pendingXHR }) => {
  await page.waitFor(HIRING_STATUS_CALCULATE);
  await waitStatusCalculate({ page }, HIRING_STATUS_CALCULATE);
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and then click on candidates tab and click on the first table entry and check position info requirements.
 */
const candidateRequirementStatusCalculate = async ({ page, pendingXHR }) => {
  await page.waitFor(REQUIREMENT_STATUS_CALCULATE);
  await waitStatusCalculate({ page }, REQUIREMENT_STATUS_CALCULATE);
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Prehire section, and then click on candidates tab and click on the first table entry and wait for general info start date
 */
const byStartDate = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor('#start-date > canvas');
  return true;
};

module.exports = {
  candidateTotal,
  byIssue,
  daysInSystem,
  canditateListLoad,
  canditateListFiltred,
  candidateListExported,
  candidatePositionRequirementLoad,
  candidateHiringStatusCalcucate,
  candidateRequirementStatusCalculate,
  byStartDate
};
