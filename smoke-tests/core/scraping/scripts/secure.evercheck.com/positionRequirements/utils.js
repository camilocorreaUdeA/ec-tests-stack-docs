/**
 * @module secure - positionRequirements/utils
 */
const { chatAssistantExist, hideChatAssistant } = require('../utils');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Helper function to add a position requirement by filling the requirements form
 */
const fillRequirement = async (
  { page },
  typeRequirement = {},
  stateOrBoard = {},
  profession = {}
) => {
  let response = {
    errorMessage: '',
    success: true
  };
  if (await chatAssistantExist({ page })) await hideChatAssistant({ page });
  await page.waitForSelector(typeRequirement.tagSelect);
  await page.click(typeRequirement.tagSelect);
  await page.waitFor(1000);
  await page.waitForSelector(typeRequirement.tagOptions);
  const isSelectedLicensed = await page.evaluate(typeRequirement => {
    const listOptionsTypes = document.querySelectorAll(typeRequirement.tagOptions);
    for (const optionType of listOptionsTypes) {
      const optionTypesText = optionType ? optionType.innerText : '';
      if (optionTypesText.includes(typeRequirement.name)) {
        optionType.querySelector('a').click();
        return true;
      }
    }
  }, typeRequirement);
  if (!isSelectedLicensed) {
    response.errorMessage = 'Error while select requirement type';
    response.success = false;
    return response;
  }
  await page.waitForSelector(stateOrBoard.tagSelect);
  await page.click(stateOrBoard.tagSelect);
  await page.waitForSelector(stateOrBoard.tagSearch);
  await page.type(stateOrBoard.tagSearch, stateOrBoard.name, {
    delay: 50
  });
  await page.waitFor(1000);
  await page.waitForSelector(stateOrBoard.options);
  const isSelectedStateOrBoard = await page.evaluate(stateOrBoard => {
    const options = document.querySelectorAll(stateOrBoard.options);
    for (const option of options) {
      const optionsText = option ? option.textContent : '';
      if (optionsText.includes(stateOrBoard.name)) {
        option.querySelector('p').click();
        return true;
      }
    }
  }, stateOrBoard);
  if (!isSelectedStateOrBoard) {
    response.errorMessage = 'Error while select state or board';
    response.success = false;
    return response;
  }
  await page.waitForSelector(profession.tagSelect);
  await page.waitFor(1500);
  await page.click(profession.tagSelect);
  await page.waitFor(1500);
  await page.waitForSelector(profession.tagSearch);
  await page.click(profession.tagSearch);
  await page.waitFor(1500);
  await page.type(profession.tagSearch, profession.name, {
    delay: 50
  });
  await page.waitFor(1500);
  const isSelectedPofession = await page.evaluate(profession => {
    const options = document.querySelectorAll(profession.options);
    for (const option of options) {
      const optionsText = option ? option.textContent : '';
      if (optionsText.includes(profession.name)) {
        option.querySelector('p').click();
        return true;
      }
    }
  }, profession);
  if (!isSelectedPofession) {
    response.errorMessage = 'Error while select profession';
    response.success = false;
    return response;
  }
  return response;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector-page selector
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Click on specified selector in requirements form
 */
const andRequirementsBtn = async ({ page }, btnTag) => {
  await page.waitForSelector(btnTag);
  await page.click(btnTag);
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector-page selector
 * @param {String} selector-page selector
 * @param {String} text-selector text
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Click button selector, then click on options menu and click specified option
 */
const chooseOptionBtnMore = async ({ page }, btnTag, optionsTag, textToChoose) => {
  await page.waitForSelector(btnTag);
  await page.click(btnTag);
  await page.waitForSelector(optionsTag);
  return await page.evaluate(
    (optionsTag, textToChoose) => {
      const options = document.querySelectorAll(optionsTag);
      for (const option of options) {
        const optionText = option ? option.textContent : '';
        if (optionText.includes(textToChoose)) {
          option.querySelector('a').click();
          return true;
        }
      }
    },
    optionsTag,
    textToChoose
  );
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector-page selector
 * @param {String} text-selector text
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Click on options menu and click specified option
 */
const chooseRequirementsOptions = async (
  { page },
  listRequirementTag,
  optionToChoose
) => {
  await page.waitForSelector(listRequirementTag);
  return await page.evaluate(
    (optionToChoose, listRequirementTag) => {
      const options = document.querySelectorAll(listRequirementTag);
      for (const option of options) {
        const optionText = option ? option.innerText : '';
        if (optionText === optionToChoose) {
          option.querySelector('a').click();
          return true;
        }
      }
    },
    optionToChoose,
    listRequirementTag
  );
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} selector-page selector
 * @param {String} text-selector text
 * @returns {number}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Click on options menu and check if a specified option exists and return the option's order number
 */
const getWorkgroupPosition = async ({ page }, optionsWorkGroups, workGroupToChoose) => {
  return await page.evaluate(
    (optionsWorkGroups, workGroupToChoose) => {
      let options = document.querySelectorAll(optionsWorkGroups);
      for (const [i, option] of options.entries()) {
        let optionText = option ? option.innerText : '';
        if (optionText.includes(workGroupToChoose)) return i + 1;
      }
    },
    optionsWorkGroups,
    workGroupToChoose
  );
};

module.exports = {
  fillRequirement,
  andRequirementsBtn,
  chooseOptionBtnMore,
  getWorkgroupPosition,
  chooseRequirementsOptions
};
