const fs = require('fs');

const sleep = miliseconds => new Promise(resolve => setTimeout(resolve, miliseconds));

const existFile = filePath => fs.existsSync(filePath);

const deleteFile = filePath => fs.unlinkSync(filePath);

const checkFilter = async ({ page }, tagOptions, textToSearch) => {
  return await page.evaluate(
    (tagOptions, textToSearch) => {
      const options = document.querySelectorAll(tagOptions);
      for (const option of options) {
        const optionText = option ? option.innerText : '';
        if (optionText.trim() === textToSearch.trim()) return true;
      }
    },
    tagOptions,
    textToSearch
  );
};

const isArrayEquals = (a, b) => {
  a = a.sort();
  b = b.sort();
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

const waitForTextInList = async ({ page }, tagList) => {
  return await page.waitForFunction(
    tagList => {
      const positionList = document.querySelectorAll(tagList);
      for (const position of positionList) {
        let positionText = position ? position.textContent : '';
        if (positionText !== '') return true;
      }
    },
    { waitUntil: 'load' },
    tagList
  );
};

const checkFilerAndClickFromList = async (
  { page },
  tagOptions,
  tagToClick,
  textToSearch
) => {
  await page.waitForSelector(tagOptions);
  return await page.evaluate(
    (tagOptions, tagToClick, textToSearch) => {
      const options = document.querySelectorAll(tagOptions);
      for (const option of options) {
        const optionText = option ? option.innerText : '';
        if (optionText.trim().includes(textToSearch.trim())) {
          option.querySelector(tagToClick).click();
          return true;
        }
      }
    },
    tagOptions,
    tagToClick,
    textToSearch
  );
};

const containDecimal = number => {
  const result = number - Math.floor(number) !== 0;
  return result ? true : false;
};

const waitTextContentInSelector = async ({ page }, selector, text) => {
  return await page.waitForFunction(
    (selector, text) => {
      const findSelector = document.querySelector(selector);
      if (!findSelector) return;
      if (!findSelector) return 'Requested selector not found';
      const selectorText = findSelector.textContent;
      return selectorText.includes(text);
    },
    { waitUntil: 'load' },
    selector,
    text
  );
};

const waitTextExistsInSelector = async ({ page }, selector) => {
  return await page.waitForFunction(
    selector => {
      let resutls = document.querySelector(selector);
      const foundText = resutls ? resutls.textContent : '';
      return foundText.length > 1;
    },
    {},
    selector
  );
};

module.exports = {
  sleep,
  existFile,
  deleteFile,
  checkFilter,
  isArrayEquals,
  containDecimal,
  waitForTextInList,
  checkFilerAndClickFromList,
  waitTextContentInSelector,
  waitTextExistsInSelector
};
