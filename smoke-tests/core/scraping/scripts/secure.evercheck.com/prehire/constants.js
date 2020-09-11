module.exports = {
  SELECTORS: {
    CARD_PREHIRE: '#prehire',
    PREHIRE_OVERVIEW_TAB: `[href='/prehire/overview']`,
    WIDGET_CLEAR_TO_HIRE:
      '#welcome-container > main > div > div > div > div > div > div:nth-child(1) > div > div > div > div:nth-child(1) > label',
    WIDGET_NEED_REVIEW:
      '#welcome-container > main > div > div > div > div > div > div:nth-child(1) > div > div > div > div:nth-child(2) > label',
    WIDGET_WAITING_ON_CANDIDATE:
      '#welcome-container > main > div > div > div > div > div > div:nth-child(1) > div > div > div > div:nth-child(3) > label',
    PREHIRE_CANDIDATES_TAB: `[href='/prehire/candidates']`,
    TOTAL_CANDIDATE_TABLE:
      '#Candidates > div > div > div:nth-child(2) > span > strong:nth-child(3)',
    FIRST_ITEM_WIDGET_DAYS_IN_SYSTEM:
      'div:nth-child(3) > div > div > div > table > tbody > tr:first-child > td:nth-child(3)',
    LAST_ITEM_WIDGET_DAYS_IN_SYSTEM:
      'div:nth-child(3) > div > div > div > table > tbody > tr:last-child > td:nth-child(3)',
    WIDGET_TABLE_BY_ISSUE: 'div:nth-child(2) > div > div > div > table > tbody',
    FIRST_ITEM_DATE_IN_SYSTEM_CANDIDATE_TABLE:
      '#Candidates > div > table > tbody > tr:nth-child(1) > td:nth-child(2)',
    INPUT_FILTER_CANDIDATE: '#candidates-toolbar',
    POSITION_REQUIREMENTS: 'div.view-requirements',
    HIRING_STATUS_CALCULATE:
      '#welcome-container > main > div > div > div.container > div > div:nth-child(3) > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(3)',
    REQUIREMENT_STATUS_CALCULATE:
      '#welcome-container > main > div > div > div.container > div > div:nth-child(3) > div > div > div > div > div > div > div:nth-child(3)',
    CANDIDATES_TABLE: '#Candidates > div > table > tbody > tr:nth-child(1) > td:nth-child(1)'
  }
};
