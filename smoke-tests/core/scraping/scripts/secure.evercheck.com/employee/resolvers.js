/**
 * @module secure - employee/resolvers
 */
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const {
  SELECTORS: {
    ITEM_FOUND,
    ITEM_NOT_FOUND,
    ICON_SEARCH_TOP,
    INPUT_SEARCH_EMPLOYEES,
    INPUT_SEARCH_TOP,
    ITEM_FOUND_TOP,
    ICON_CLEAR_TOP,
    ITEM_NOT_FOUND_TOP,
    EMPLOYEES_ROW,
    POSITIONS_TITLE,
    POSITIONS_ROW
  },
  MESSAGES: { EMPLOYEE_NOT_FOUND, TITLE_NOT_CORRECT, POS_ROW_EMPTY }
} = require('./constants');

const {
  waitEmployeeByParams,
  checkRequestedDataFound,
  setSelectorEmptyAndTypeInfo,
  waitSelectorTextIsNotEmpty,
  waitTitleText,
  positionsExist
} = require('./utils');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, type the employee name in the search panel, wait for response and evaluate the results obtained.
 */
const byName = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(INPUT_SEARCH_EMPLOYEES);
  await page.type(INPUT_SEARCH_EMPLOYEES, config.NAME_EMPLOYEE_SEARCH);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(500);

  const foundEmployee = await waitEmployeeByParams(
    { page },
    ITEM_NOT_FOUND,
    ITEM_FOUND,
    config.ID_EMPLOYER_NUMBER_SEARCH,
    'No data found'
  );

  if (!foundEmployee) return EMPLOYEE_NOT_FOUND;

  const dataFound = await checkRequestedDataFound(
    { page },
    ITEM_FOUND,
    config.ID_EMPLOYER_NUMBER_SEARCH
  );

  return dataFound;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, type the employee name in the top serach bar, wait for response and evaluate the results obtained.
 */
const byNameTop = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(ICON_SEARCH_TOP);
  await page.click(ICON_SEARCH_TOP);
  await page.waitForSelector(INPUT_SEARCH_TOP);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1500);
  const filter = async () => {
    await setSelectorEmptyAndTypeInfo(
      { page },
      INPUT_SEARCH_TOP,
      config.NAME_EMPLOYEE_SEARCH
    );
    await pendingXHR.waitForAllXhrFinished();
    await page.waitFor(3000);

    const foundEmployee = await waitEmployeeByParams(
      { page },
      ITEM_NOT_FOUND_TOP,
      ITEM_FOUND_TOP,
      config.NAME_EMPLOYEE_SEARCH,
      'No results found'
    );

    if (!foundEmployee) return EMPLOYEE_NOT_FOUND;

    const dataFound = await checkRequestedDataFound(
      { page },
      ITEM_FOUND_TOP,
      config.NAME_EMPLOYEE_SEARCH
    );

    return dataFound;
  };

  let attemps = 1;
  let isFound = await filter();
  while (!isFound && attemps <= 5) {
    isFound = await filter();
    attemps++;
  }

  await page.click(ICON_CLEAR_TOP);
  return isFound;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, type the employee id number in the search panel, wait for response and evaluate the results obtained.
 */
const byIdEmployeeNumber = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(INPUT_SEARCH_EMPLOYEES);
  await page.type(INPUT_SEARCH_EMPLOYEES, config.ID_EMPLOYER_NUMBER_SEARCH);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1500);

  const foundEmployee = await waitEmployeeByParams(
    { page },
    ITEM_NOT_FOUND,
    ITEM_FOUND,
    config.ID_EMPLOYER_NUMBER_SEARCH,
    'No data found'
  );

  if (!foundEmployee) return EMPLOYEE_NOT_FOUND;

  const dataFound = await checkRequestedDataFound(
    { page },
    ITEM_FOUND,
    config.ID_EMPLOYER_NUMBER_SEARCH
  );

  return dataFound;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, type the employee id number in the top search bar, wait for response and evaluate the results obtained.
 */
const byIdEmployeeNumberTop = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(ICON_SEARCH_TOP);
  await page.click(ICON_SEARCH_TOP);
  await page.waitForSelector(INPUT_SEARCH_TOP);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1500);

  const filter = async () => {
    await setSelectorEmptyAndTypeInfo(
      { page },
      INPUT_SEARCH_TOP,
      config.ID_EMPLOYER_NUMBER_SEARCH
    );
    await pendingXHR.waitForAllXhrFinished();
    await page.waitFor(1500);

    const foundEmployee = await waitEmployeeByParams(
      { page },
      ITEM_NOT_FOUND,
      ITEM_FOUND,
      config.NAME_EMPLOYEE_SEARCH,
      'No results found'
    );

    if (!foundEmployee) return EMPLOYEE_NOT_FOUND;

    const dataFound = await checkRequestedDataFound(
      { page },
      ITEM_FOUND_TOP,
      config.NAME_EMPLOYEE_SEARCH
    );

    return dataFound;
  };

  let attemps = 1;
  let isFound = await filter();
  while (!isFound && attemps <= 5) {
    isFound = await filter();
    attemps++;
  }

  await page.click(ICON_CLEAR_TOP);
  return isFound;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, type the employee license number in the search panel, wait for response and evaluate the results obtained.
 */
const byLCR = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(INPUT_SEARCH_EMPLOYEES);
  await page.type(INPUT_SEARCH_EMPLOYEES, config.LRC_EMPLOYEE_SEARCH);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1500);

  const foundEmployee = await waitEmployeeByParams(
    { page },
    ITEM_NOT_FOUND,
    ITEM_FOUND,
    config.ID_EMPLOYER_NUMBER_SEARCH,
    'No data found'
  );

  if (!foundEmployee) return EMPLOYEE_NOT_FOUND;

  const dataFound = await checkRequestedDataFound(
    { page },
    ITEM_FOUND,
    config.ID_EMPLOYER_NUMBER_SEARCH
  );

  return dataFound;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, type the employee license number in the top search bar, wait for response and evaluate the results obtained.
 */
const byLCRTop = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(ICON_SEARCH_TOP);
  await page.click(ICON_SEARCH_TOP);
  await page.waitForSelector(INPUT_SEARCH_TOP);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1500);

  const filter = async () => {
    await setSelectorEmptyAndTypeInfo(
      { page },
      INPUT_SEARCH_TOP,
      config.LRC_EMPLOYEE_SEARCH
    );
    await pendingXHR.waitForAllXhrFinished();
    await page.waitFor(1500);

    const foundEmployee = await waitEmployeeByParams(
      { page },
      ITEM_NOT_FOUND_TOP,
      ITEM_FOUND_TOP,
      config.NAME_EMPLOYEE_SEARCH,
      'No results found'
    );

    if (!foundEmployee) return EMPLOYEE_NOT_FOUND;

    const dataFound = await checkRequestedDataFound(
      { page },
      ITEM_FOUND_TOP,
      config.NAME_EMPLOYEE_SEARCH
    );

    return dataFound;
  };

  let attemps = 1;
  let isFound = await filter();
  while (!isFound && attemps <= 5) {
    isFound = await filter();
    attemps++;
  }

  await page.click(ICON_CLEAR_TOP);
  return isFound;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, click on employee profiles and wait until position requirements panel is loaded.
 */
const loadPositionRequirements = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    EMPLOYEES_ROW => {
      const employeeList = document.querySelectorAll(EMPLOYEES_ROW);
      for (const employee of employeeList) {
        let rowText = employee ? employee.textContent : '';
        if (rowText !== '') {
          employee.querySelector('td > div > div > a').click();
          return true;
        }
      }
    },
    { waitUntil: 'load' },
    EMPLOYEES_ROW
  );
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(2500);
  const isTitleCorrect = waitTitleText({ page }, POSITIONS_TITLE, 'Current positions');
  if (!isTitleCorrect) return TITLE_NOT_CORRECT;
  await page.waitFor(2500);
  const positionsRowNotEmpty = await waitSelectorTextIsNotEmpty({ page }, POSITIONS_ROW);
  if (!positionsRowNotEmpty) return false;
  await page.waitFor(2500);
  const positionExists = await positionsExist({ page }, POSITIONS_ROW);
  if (!positionExists) return false;
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean} Boolean
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to employee section, click on employee profiles, search and choose an employee with positions satisfied, wait until position requirements panel loads and check if the message on display is 'requirement satisfied'
 */
const checkPositionRequirementSatisfied = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(INPUT_SEARCH_EMPLOYEES);
  await page.type(INPUT_SEARCH_EMPLOYEES, config.ID_EMPLOYEE_NUMBER_POS_SATIFIED);
  await pendingXHR.waitForAllXhrFinished();

  const foundEmployee = await waitEmployeeByParams(
    { page },
    ITEM_NOT_FOUND,
    ITEM_FOUND,
    config.ID_EMPLOYEE_NUMBER_POS_SATIFIED,
    'No data found'
  );

  if (!foundEmployee) return EMPLOYEE_NOT_FOUND;

  const isFound = await page.evaluate(
    (ITEM_FOUND, idEmployeeNumber) => {
      const results = document.querySelectorAll(ITEM_FOUND);
      if (!results || !results.length) return;

      for (const item of results) {
        const idEmployeeFound = item.textContent;
        if (idEmployeeFound.includes(idEmployeeNumber)) {
          item.querySelector('span').click();
          return true;
        }
      }
    },
    ITEM_FOUND,
    config.ID_EMPLOYEE_NUMBER_POS_SATIFIED
  );

  if (!isFound) return;

  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(5000);
  const isTitleCorrect = waitTitleText({ page }, POSITIONS_TITLE, 'Current positions');
  if (!isTitleCorrect) return TITLE_NOT_CORRECT;
  await page.waitFor(5000);
  const positionsRowNotEmpty = await waitSelectorTextIsNotEmpty({ page }, POSITIONS_ROW);
  if (!positionsRowNotEmpty) return POS_ROW_EMPTY;
  await page.click(POSITIONS_ROW);
  await page.waitFor(5000);
  const positionIsSatisfied = await page.evaluate(POSITIONS_ROW => {
    const positionRow = document.querySelector(POSITIONS_ROW);
    const requirementText = positionRow.querySelector(
      'div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > p'
    )
      ? positionRow.querySelector(
          'div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(2) > p'
        ).textContent
      : '';

    if (requirementText === 'Requirements satisfied') return true;
  }, POSITIONS_ROW);

  return positionIsSatisfied;
};

module.exports = {
  byLCR,
  byName,
  byLCRTop,
  byNameTop,
  byIdEmployeeNumber,
  byIdEmployeeNumberTop,
  loadPositionRequirements,
  checkPositionRequirementSatisfied
};
