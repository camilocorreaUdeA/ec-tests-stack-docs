/**
 * @module secure - bulkUploads/resolvers
 */
const path = require('path');
const {
  SELECTORS: {
    ROWS,
    SELECT,
    FILTER_BUTTON,
    EMPLOYEE_OPTION,
    DOWNLOAD_BUTTON,
    SUMMARY_SECTION,
    WARNING_SECTION,
    REJECTION_SECTION,
    APPLY_FILTER_BUTTON
  },
  MESSAGES: {
    DOWNLOAD_TIME_EXCEEDED,
    FILE_NAME_NOT_FOUND
  }
} = require('./constants');
const { existFile, sleep, deleteFile } = require('../../../../utils');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Hello
 */
const downloadAndCheckSummary = async ({ page, pendingXHR }) => {
  const folderName = 'downloads';
  let attemps = 0;
  await page.waitForSelector(FILTER_BUTTON);
  await page.click(FILTER_BUTTON);
  await page.waitForSelector(SELECT);
  await page.click(SELECT);
  await page.waitForSelector(EMPLOYEE_OPTION);
  await page.click(EMPLOYEE_OPTION);
  await page.waitForSelector(APPLY_FILTER_BUTTON);
  await page.click(APPLY_FILTER_BUTTON);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(DOWNLOAD_BUTTON);
  await page.waitForFunction(
    ROWS => {
      const rows = document.querySelectorAll(ROWS);
      for (const row of rows) {
        const summary = row.querySelector('td:nth-child(1) > a');
        const summaryText = summary.textContent ? summary.textContent : '';
        return summaryText !== '';
      }
    },
    { waitUntil: 'load' },
    ROWS
  );
  const fileName = await page.evaluate(ROWS => {
    const rows = document.querySelectorAll(ROWS);
    for (const row of rows) {
      row.querySelector('td:nth-child(4) > a').click();
      row.querySelector('td:nth-child(1) > a').click();
      return row.querySelector('td:nth-child(1) > a').textContent;
    }
  }, ROWS);

  if (!fileName) return FILE_NAME_NOT_FOUND;
  const filePathDownloaded = path.join(__dirname, '../../../../', folderName, fileName);
  let isFileDownloaded = existFile(filePathDownloaded);

  const waitForDownload = async () => {
    await sleep(5000);
    isFileDownloaded = existFile(filePathDownloaded);
    attemps++;
  };
  while (!isFileDownloaded && attemps <= 5) await waitForDownload();

  if (!isFileDownloaded) return DOWNLOAD_TIME_EXCEEDED;
  deleteFile(filePathDownloaded);
  await page.waitForSelector(SUMMARY_SECTION);
  await page.waitForSelector(WARNING_SECTION);
  await page.waitForSelector(REJECTION_SECTION);

  return true;
};

module.exports = { downloadAndCheckSummary };
