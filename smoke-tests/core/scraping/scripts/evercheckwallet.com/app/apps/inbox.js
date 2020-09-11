const {
  SELECTORS: {
    INBOX: { MESSAGE_LIST, TASKS_DIV }
  }
} = require('./../_config/constants');

const checkInboxMessage = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    MESSAGE_LIST => {
      const messagesList = document.querySelectorAll(MESSAGE_LIST);
      for (const messageList of messagesList) {
        let messageLinkText = messageList ? messageList.textContent : '';
        if (messageLinkText !== '') {
          messageList.querySelector('tr > td:nth-child(2)').click();
          return true;
        }
      }
    },
    { waitUntil: 'load' },
    MESSAGE_LIST
  );
  await pendingXHR.waitForAllXhrFinished();
  return true;
};

module.exports = {
  checkInboxMessage
};
