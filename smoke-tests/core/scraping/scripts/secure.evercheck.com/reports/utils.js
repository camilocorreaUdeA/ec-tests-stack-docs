/**
 * @module secure - reports/utils
 */
/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - not found selector
 * @param {String} selector - results selector
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Waits until any of the passed selectors is rendered and check the text contents
 */
const waitDataTextInSelectors = async ({ page }, notFoundSelector, resultsSelector) => {
  return await page.waitForFunction(
    (notFoundSelector, resultsSelector) => {
      let notFound = document.querySelector(notFoundSelector);
      let found = document.querySelector(resultsSelector);

      const notFoundText = notFound ? notFound.textContent : '';
      const foundText = found ? found.textContent : '';

      return foundText.length > 1 || notFoundText.includes('No data found');
    },
    { waitUntil: 'load' },
    notFoundSelector,
    resultsSelector
  );
};

module.exports = { waitDataTextInSelectors };
