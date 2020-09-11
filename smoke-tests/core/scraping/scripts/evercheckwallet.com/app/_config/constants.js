module.exports = {
  SELECTORS: {
    INPUT_USER_NAME: '#username',
    INPUT_PASSWORD: '#password',
    INPUT_BUTTON_LOGIN: '[type=submit]',
    WELCOME_MESSAGE: '#root > div > div > div > div:nth-child(2) > div > span',
    LINK_LOGOUT:
      ' #welcome-container > nav > div > div > ul > li > ul > li:nth-child(6) > a',
    USER_AVATAR:
      '#root > div > div > div > div:nth-child(1) > div > div > div.eui-navbar-bar > div > button',
    SIGNOUT_OPTION:
      '#root > div > div > div > div:nth-child(1) > div > div > div.eui-navbar-bar > div > div > a:nth-child(5)',
    WORKPLACES: {
      APP:
        '#root > div > div > div > div > div.container > div > div > a:nth-child(1) > div',
      EMPLOYER_DIV:
        '#root > div > div > div > div > div.container > div > div > div > div',
      TASKS_DIV:
        '#root > div > div > div > div > div > div:nth-child(2) > div > div > div',
      REQUIREMENTS:
        '#root > div > div > div > div > div > div > div > div > div > div > i',
      SUBMIT_AUTOMATED_OPTIONS:
        '#root > div > div > div > div> div.container > div > div > div > div',
      BUTTON_AUTOMATED_SUBMIT:
        '#root > div > div > div > div > div.container > div> div > button',
      LICENSE_NUMBER_AUTO_INPUT: '#licenseNumber',
      BUTTON_CONTINUE:
        '#root > div > div > div > div > div.container > div > div > div > div > form > button.eui-btn.eui-btn-primary.eui-btn-classic',
      BUTTON_CONFIRM:
        '#root > div > div > div > div > div.container > div > div > div > button.eui-btn.eui-btn-primary.eui-btn-classic',
      RESET_DIV: '#test > button > div',
      RESET_BUTTON: '#test > div > a'
    },
    INBOX: {
      MESSAGE_LIST:
        '#root > div > div > div > div > div.container > div > div> div > table > tbody > tr',
      TASKS_DIV:
        '#root > div > div > div > div > div > div:nth-child(2) > div > div > div'
    }
  }
};
