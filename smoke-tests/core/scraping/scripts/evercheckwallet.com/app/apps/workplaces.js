const axios = require('axios');
const request_client = require('request-promise-native');
const {
  SELECTORS: {
    WORKPLACES: {
      TASKS_DIV,
      RESET_DIV,
      RESET_BUTTON,
      EMPLOYER_DIV,
      REQUIREMENTS,
      BUTTON_CONFIRM,
      BUTTON_CONTINUE,
      BUTTON_AUTOMATED_SUBMIT,
      SUBMIT_AUTOMATED_OPTIONS,
      LICENSE_NUMBER_AUTO_INPUT
    }
  }
} = require('./../_config/constants');
const { config } = require(`../_config/${process.env.NODE_ENV}.config`);

let origin;
let headers;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getLicenseNumber = () => {
  let licenseNumber = '1';
  for (let i = 0; i <= 5; i++) {
    licenseNumber += getRandomInt(1, 9);
  }
  return licenseNumber;
};

const navigateToRequirements = async ({ page, pendingXHR, professionName }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(EMPLOYER_DIV);
  await page.click(EMPLOYER_DIV);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    TASKS_DIV => {
      const taskElement = document.querySelector(TASKS_DIV);
      const taskText = taskElement ? taskElement.textContent : '';
      return taskText.includes('Submit your');
    },
    { waitUntil: 'load' },
    TASKS_DIV
  );
  await page.click(TASKS_DIV);
  await page.waitForSelector(REQUIREMENTS);
  await page.waitForSelector(SUBMIT_AUTOMATED_OPTIONS);
  await page.waitForFunction(
    (SUBMIT_AUTOMATED_OPTIONS, professionName) => {
      const automatedSubmitOptions = document.querySelectorAll(SUBMIT_AUTOMATED_OPTIONS);
      for (const automatedSubmitOption of automatedSubmitOptions) {
        const automatedSubmitText = automatedSubmitOption
          ? automatedSubmitOption.textContent
          : '';
        if (automatedSubmitText.toUpperCase().includes(professionName.toUpperCase())) {
          automatedSubmitOption.querySelector('i').click();
          return true;
        }
      }
    },
    {
      waitUntil: 'load'
    },
    SUBMIT_AUTOMATED_OPTIONS,
    professionName
  );
  return true;
};

const submitAutomated = async ({ page, pendingXHR }) => {
  const professionName = config.automated;
  const isSuccessfulProcess = await navigateToRequirements({
    page,
    pendingXHR,
    professionName
  });
  return isSuccessfulProcess;
};

const updateAutomated = async ({ page, pendingXHR }) => {
  const professionName = config.automated;
  const isSuccessfulProcess = await navigateToRequirements({
    page,
    pendingXHR,
    professionName
  });
  return isSuccessfulProcess;
};

const submitUnmonitored = async ({ page, pendingXHR }) => {
  const professionName = config.unmonitored;
  const isSuccessfulProcess = await navigateToRequirements({
    page,
    pendingXHR,
    professionName
  });
  return isSuccessfulProcess;
};

const updateUnmonitored = async ({ page, pendingXHR }) => {
  const professionName = config.unmonitored;
  const isSuccessfulProcess = await navigateToRequirements({
    page,
    pendingXHR,
    professionName
  });
  return isSuccessfulProcess;
};

const submitAHA = async ({ page, pendingXHR }) => {
  const professionName = config.heartcard;
  const isSuccessfulProcess = await navigateToRequirements({
    page,
    pendingXHR,
    professionName
  });
  return isSuccessfulProcess;
};

const updateAHA = async ({ page, pendingXHR }) => {
  const professionName = config.heartcard;
  const isSuccessfulProcess = await navigateToRequirements({
    page,
    pendingXHR,
    professionName
  });
  return isSuccessfulProcess;
};

const loadRequirements = async ({ page, pendingXHR }) => {
  const professionName = config.unmonitored;
  const isSuccessfulProcess = await navigateToRequirements({
    page,
    pendingXHR,
    professionName
  });
  return isSuccessfulProcess;
};

module.exports = {
  submitAHA,
  updateAHA,
  submitAutomated,
  updateAutomated,
  loadRequirements,
  submitUnmonitored,
  updateUnmonitored
};
