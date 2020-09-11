module.exports = {
  SELECTORS: {
    CARD: '#welcome-container > main > div > div.container > div > div > div',
    REPORT_SATISFIED:
      '#welcome-container > main > div > div.container > div > div > div:nth-child(5) > div > div > div:nth-child(1) > div > a > label',
    REPORT_NO_SATISFIED:
      '#welcome-container > main > div > div.container > div > div > div:nth-child(5) > div > div > div:nth-child(3) > div > a > label',
    REPORT_UNKNOWN:
      '#welcome-container > main > div > div.container > div > div > div:nth-child(5) > div > div > div:nth-child(5) > div > a',
    BACK_PAGE:
      '#welcome-container > main > div > div > div.eui-page-header > div > div > a',
    REPORT_LIST:
      '#welcome-container > main > div > div > div.container > div > div > table > tbody > tr',
    CARD_LICENSE_VERIFICATION: '#humanResources',
    DISCIPLINARY_ACTION_TAB: "[href='/hr/disciplinary-actions']",
    NAME_DISCREPANCIES_TAB: "[href='/hr/name-discrepancy']",
    NEED_REVIEW_DISCIPLINARY_ACTION_TAB: "[href='/hr/disciplinary-actions/needs-review']",
    DISCIPLINARY_ACTION_CLEAR_TO_WORK_TAB: `[href='/hr/disciplinary-actions/clear-to-work']`,
    DISCIPLINARY_ACTION_ACTIVITY_TAB: `[href='/hr/disciplinary-actions/activity']`,
    DISCIPLINARY_ACTION_NEED_REVIEW_TAB: `[href='/hr/disciplinary-actions/needs-review']`,
    PENDING_CREDENTIAL_TAB: `[href='/hr/credential-review']`,
    CREDENTIAL_REVIEW_NEED_REVIEW_TAB: `[href='/hr/credential-review/needs-review']`,
    CREDENTIAL_REVIEW_COMPLETED_TAB: `[href='/hr/credential-review/completed']`,
    NEED_REVIEW_BUTTON: 'table > tbody > tr:nth-child(1) > td > button',
    COMPLETE_BUTTON: 'table > tbody > tr:nth-child(1) > td > button'
  },
  MESSAGES: {
    TAB_BUTTON_NOT_FOUND: 'Requested tab//button not found'
  }
};
