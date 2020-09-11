const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const {
  SELECTORS: {
    INPUT_USER_NAME,
    INPUT_PASSWORD,
    INPUT_BUTTON_LOGIN,
    WELCOME_MESSAGE,
    USER_AVATAR,
    SIGNOUT_OPTION }
} = require('./../_config/constants');

const login = async page => {
  await page.waitFor(INPUT_USER_NAME);
  await page.type(INPUT_USER_NAME, config.userName);
  await page.waitFor(INPUT_PASSWORD);
  await page.type(INPUT_PASSWORD, config.password);
  await page.click(INPUT_BUTTON_LOGIN);
  await page.waitFor(WELCOME_MESSAGE);
};
const loginPage = async page => {
  await page.goto(config.url);
};

const logout = async page => {
  await page.waitFor(1000);
  await page.waitFor(USER_AVATAR);
  await page.click(USER_AVATAR);
  await page.waitFor(1000);
  await page.waitFor(SIGNOUT_OPTION);
  await page.click(SIGNOUT_OPTION);
  await page.waitForNavigation();

};
module.exports = { login, loginPage, logout };
