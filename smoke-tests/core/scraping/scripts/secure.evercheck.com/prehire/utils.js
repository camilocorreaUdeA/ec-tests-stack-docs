/**
 * @module secure - prehire/utils
 */
/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @returns {number}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Converts text number to numeric type
 */
const convertSelectorTextToNum = async ({ page }, selector) => {
  await page.waitFor(selector);
  const number = await page.evaluate(
    selector => +document.querySelector(selector).textContent,
    selector
  );
  return number;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @returns {number}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Converts text number to numeric type in a specific selector
 */
const convertSelectorReplacedTextToNum = async ({ page }, selector) => {
  await page.waitFor(selector);
  const number = await page.evaluate(
    selector => +document.querySelector(selector).textContent.replace('days', ''),
    selector
  );
  return number;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Converts text number to numeric type
 */
const waitStatusCalculate = async ({ page }, selector) => {
  return await page.waitForFunction(
    selector => {
      let item = document.querySelector(selector);
      return !!item.textContent;
    },
    { waitUntil: 'load' },
    selector
  );
};

module.exports = {
  convertSelectorTextToNum,
  convertSelectorReplacedTextToNum,
  waitStatusCalculate
};
