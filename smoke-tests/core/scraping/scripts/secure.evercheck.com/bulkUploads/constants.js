module.exports = {
  SELECTORS: {
    FILTER_BUTTON:
      '#welcome-container > main > div > div > div > div.toolbar > div > button',
    SELECT:
      '#filter-popover > div.popover-content > div > div.select-wrapper.single-select > a',
    EMPLOYEE_OPTION:
      '#filter-popover > div.popover-content > div > div.select-wrapper.single-select > ul > li:nth-child(3) > a > div > span',
    APPLY_FILTER_BUTTON:
      '#filter-popover > div.popover-content > div > div > button.btn.btn-classic',
    DOWNLOAD_BUTTON:
      '#welcome-container > main > div > div.container > div > table > tbody > tr > td > a > button',
    ROWS: '#welcome-container > main > div > div.container > div > table > tbody > tr',
    SUMMARY_SECTION:
      '#welcome-container > main > div > div.container > div:nth-child(1) > div > div > table',
    WARNING_SECTION:
      '#welcome-container > main > div > div.container > div:nth-child(2) > div > div > table',
    REJECTION_SECTION:
      '#welcome-container > main > div > div.container > div:nth-child(3) > div > div > table',
  },
  MESSAGES: {
    DOWNLOAD_TIME_EXCEEDED: 'Exceeded download waiting time',
    FILE_NAME_NOT_FOUND: 'File name not found'
  }
};
