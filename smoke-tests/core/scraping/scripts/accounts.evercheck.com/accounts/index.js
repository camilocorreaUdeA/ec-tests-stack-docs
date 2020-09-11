/**
 * @module accounts
 */
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const {
  SELECTORS: {
    INPUT_USER_NAME,
    INPUT_PASSWORD,
    INPUT_BUTTON_LOGIN,
    WELCOME_MESSAGE,
    USER_AVATAR,
    SIGNOUT_OPTION,
    SIGNIN_BUTTON
  }
} = require('./../_config/constants');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {String} username - login credentials
 * @param {String} password - login credentials
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Types username and password in login box and waits for welcome widget after successful login
 */
const login = async ({ page, userName = '', password = '' }) => {
  await page.type(INPUT_USER_NAME, userName || config.userName);
  await page.type(INPUT_PASSWORD, password || config.password);
  await page.click(INPUT_BUTTON_LOGIN);
  await page.waitFor(WELCOME_MESSAGE);
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to accounts-evercheck site and wait for username and password input fields
 */
const loginPage = async ({ page }) => {
  await page.goto(config.url);
  await page.waitForSelector(INPUT_USER_NAME);
  await page.waitForSelector(INPUT_PASSWORD);
  await page.waitForSelector(INPUT_BUTTON_LOGIN);
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Signouts from app
 */
const logout = async page => {
  await page.click(USER_AVATAR);
  await page.waitFor(SIGNOUT_OPTION);
  await page.click(SIGNOUT_OPTION);
  await page.waitFor(SIGNIN_BUTTON);
};
module.exports = { login, loginPage, logout };
