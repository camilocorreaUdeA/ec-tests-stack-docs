module.exports = {
  SELECTORS: {
    ITEM_FOUND:
      '#welcome-container > main > div > div > div > div > table > tbody > tr > td:nth-child(2) > div > div:nth-child(2)',
    ITEM_NOT_FOUND:
      '#welcome-container > main > div > div.container > div > div > table > tbody > tr > td',
    INPUT_SEARCH_EMPLOYEES: '#employees-toolbar',
    CARD_FEATURE_EMPLOYEES: '#employees',
    ICON_SEARCH_TOP:
      '#welcome-container > nav > div > div > ul > li.nav-item-icon > a > i',
    INPUT_SEARCH_TOP: '#react-select-2--value > div.Select-input > input',
    ITEM_FOUND_TOP: 'div.Select-option',
    ITEM_NOT_FOUND_TOP: '#react-select-2--list > div',
    ICON_CLEAR_TOP: '#welcome-container > nav > div > div > div > button > i',
    EMPLOYEES_ROW:
      '#welcome-container > main > div > div.container > div > div > table > tbody > tr',
    POSITIONS_TITLE: '#welcome-container > main > div > div.container > div > div > h3',
    POSITIONS_ROW:
      '#welcome-container > main > div > div.container > div > div > div.collapsible-panel-group > div',
    INPUT_SEARCH_UNKNOWN_POSITIONS: '#position-issue-info'
  },
  MESSAGES: {
    SELECTOR_NOT_FOUND: 'Requested selector not found',
    EMPLOYEE_NOT_FOUND: 'Requested employee not found',
    TITLE_NOT_CORRECT: 'Requested title not found in selector',
    POS_ROW_EMPTY: 'Position row is empty'
  }
};
