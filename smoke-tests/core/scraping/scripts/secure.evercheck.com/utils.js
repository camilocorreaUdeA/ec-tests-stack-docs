/**
 * @module secure - utils
 */
/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Checks if the chat assistant widget has been loaded
 */
const chatAssistantExist = async ({ page }) =>
  await page.$('div#hubspot-messages-iframe-container');

  /**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Hides the chat assistant widget
 */
const hideChatAssistant = async ({ page }) =>
  await page.evaluate(() => {
    document.querySelector('div#hubspot-messages-iframe-container').style.visibility =
      'hidden';
  });

module.exports = {
  hideChatAssistant,
  chatAssistantExist
};
