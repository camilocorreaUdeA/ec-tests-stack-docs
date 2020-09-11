const moment = require('moment');
module.exports = {
  SELECTORS: {
    BUTTON_VIEW: 'div[type=hr]:nth-child(3) > button',
    START_DATE: ['#startDate', moment().subtract(2, 'years').format('MM/DD/YYYY')],
    END_DATE: ['#endDate', moment().format('MM/DD/YYYY')],
    SEARCH_BUTTON:
      '#welcome-container > main > div > div.container > div > form > div> button',
    RESULTS:
      '#welcome-container > main > div > div.container > div.table-wrapper.container > table > tbody > tr > td > div > a',
    NOT_FOUND:
      '#welcome-container > main > div > div.container > div.table-wrapper.container > table > tbody > tr > td',
    DIV_FORM: '#welcome-container > main > div > div.container > div',
    CARD_EXPIRATION_DATE: 'div[type=hr]:nth-child(2) > button',
    GRAPH_EXPIRATION_DATE: '.chartjs-size-monitor',
    CARD_LICENSE_STATUS_REPORT:
      '#welcome-container > main > div > div > div > div > div > div:nth-child(1) > button',
    ITEM_LICENSE_STATUS_REPORT:
      '#welcome-container > main > div > div.container > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1) > div >  div:nth-child(2)',
    CARD_FEATURE_REPORTS: '#reports',
    OUTSIDE_DATE_CONTAINER: '#welcome-container > main > div > div > div'
  },
  MESSAGES: {
    NO_TEXT_IN_TABLE: 'Table may not have required text'
  }
};
