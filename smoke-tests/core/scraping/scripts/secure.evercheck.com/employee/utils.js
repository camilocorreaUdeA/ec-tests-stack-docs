/**
 * @module secure - employee/utils
 */
/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @param {String} selector - page selector
 * @param {String} params - employee params
 * @param {String} text - text in not found selector
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Awaits whether for employee params to be loaded in results selector or for some informative text in not found selector
 */
const waitEmployeeByParams = async (
  { page },
  notFoundSelector,
  resultsSelector,
  employeeParam,
  notFoundDataText
) => {
  return await page.waitForFunction(
    (notFoundSelector, resultsSelector, employeeParam, notFoundDataText) => {
      let notFound = document.querySelector(notFoundSelector);
      let results = document.querySelectorAll(resultsSelector);
      let notFoundText = notFound ? notFound.textContent : '';

      for (const item of results) {
        const employeeInfo = item ? item.textContent : '';
        if (employeeInfo.includes(employeeParam)) return true;
      }

      return notFoundText.includes(notFoundDataText);
    },
    { waitUntil: 'load' },
    notFoundSelector,
    resultsSelector,
    employeeParam,
    notFoundDataText
  );
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @param {String} params - employee params
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Checks if some text is found in the specified selector
 */
const checkRequestedDataFound = async ({ page }, selector, employeeParam) => {
  const infoChecked = await page.evaluate(
    (selector, employeeParam) => {
      const results = document.querySelectorAll(selector);
      if (!results || !results.length) return false;

      for (const item of results) {
        let idEmployeeFound = item ? item.textContent : '';
        if (idEmployeeFound.includes(employeeParam)) return true;
      }
    },
    selector,
    employeeParam
  );

  return infoChecked;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @param {String} info - text
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Empties the specified selector's contents and types in a new text
 */
const setSelectorEmptyAndTypeInfo = async ({ page }, selector, info) => {
  await page.evaluate(
    selector => (document.querySelector(selector).value = ''),
    selector
  );
  await page.type(selector, info, {
    delay: 50,
    clear: true
  });
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @param {String} selector - page selector
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Awaits until a specified selector is rendered and checks if it is empty (blank line)
 */
const waitSelectorTextIsNotEmpty = async ({ page }, selector) => {
  return await page.waitForFunction(
    selector => {
      const positionRow = document.querySelector(selector);
      const positionRowText = positionRow ? positionRow.textContent : '';
      if (positionRowText !== '') return true;
      return false;
    },
    { waitUntil: 'load' },
    selector
  );
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @param {String} title - text in selector
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Awaits until a specified selector is rendered and checks if its content matches the specified text
 */
const waitTitleText = async ({ page }, selector, title) => {
  return await page.waitForFunction(
    (selector, title) => {
      const titleSelector = document.querySelector(selector);
      const titleText = titleSelector ? titleSelector.textContent : '';
      return titleText.includes(title);
    },
    { waitUntil: 'load' },
    selector,
    title
  );
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector - page selector
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Checks if the specified selector contains any text entry
 */
const positionsExist = async ({ page }, selector) => {
  const existPositions = await page.evaluate(selector => {
    const positionRow = document.querySelector(selector);
    const positionRowText = positionRow ? positionRow.textContent : '';
    if (positionRowText !== '') return true;
    return false;
  }, selector);
  return existPositions;
};

module.exports = {
  waitEmployeeByParams,
  checkRequestedDataFound,
  setSelectorEmptyAndTypeInfo,
  waitSelectorTextIsNotEmpty,
  waitTitleText,
  positionsExist
};
