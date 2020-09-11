module.exports = {
  SELECTORS: {
    CARD: '#position > div',
    TITTLE: '#welcome-container > main > div > div > div > div > h2',
    UNKNOW_POSITIONS:
      '#welcome-container > main > div > div > div.container > div > div:nth-child(1) > div > div > div > div > div > table > tbody > tr',

    UNKNOW_REQUIREMENTS_FORM_BUTTON:
      '#welcome-container > main > div > div > div.container > div > div > div > div > form > div > div > button.btn.btn-classic> div > span',
    UNKNOW_REQUIREMENTS_FORM_INPUT: '#positionName',
    UNKNOW_REQUIREMENTS_BUTTON_BACK:
      '#welcome-container > main > div > div > div.container > div > div > div > div > button > div > span',
    UNKNOW_REQUIREMENTS_FORM_CANCEL: '#backButton > div > span',
    UNKNOW_REQUIREMENTS:
      '#welcome-container > main > div > div > div.container > div > div:nth-child(2) > div > div > div > div > div > table > tbody > tr',
    UNKNOW_REQUIREMENTS_DETAILS_TITTLE:
      '#welcome-container > main > div > div > div.container > div > div > h3',
    UNKNOW_REQUIREMENTS_DETAILS: '#viewtest0 > div',
    LIST: '#Positions > div > table > tbody > tr',
    LIST_TAB_LINK:
      '#welcome-container > main > div > div > div > div > ul > li:nth-child(2) > a',
    EMPLOYEES_ROW:
      '#welcome-container > main > div > div.container > div > div > table > tbody > tr',
    POSITIONS_TITLE: '#welcome-container > main > div > div.container > div > div > h3',
    POSITIONS_ROW:
      '#welcome-container > main > div > div.container > div > div > div.collapsible-panel-group > div',
    INPUT_SEARCH_UNKNOWN_POSITIONS: '#position-issue-info',
    UNKNOW_POSITIONS_ROW:
      '#welcome-container > main > div > div > div.container > div > div:nth-child(1) > div > div > div > div > div > table > tbody > tr',
    UNKNOW_REQUIREMENTS_ROW:
      '#welcome-container > main > div > div > div > div > div:nth-child(2) > div > div > div > div > div > table > tbody > tr',
    IMPACTED_UNKNOW:
      '#welcome-container > main > div > div > div.container > div > div > table > tbody > tr',
    COME_BACK:
      '#welcome-container > main > div > div > div.eui-page-header > div > div > a',
    ADD_POISITION_BUTTON:
      '#welcome-container > main > div > div > div.container > div > div:nth-child(1) > div> div > div > div > div > table > tbody > tr > td > button',
    MANAGE_POSITION_BUTTON:
      '#welcome-container > main > div > div > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div > table > tbody > tr > td > button',
    INPUT_POSITION_NAME: '#positionName',
    INPUT_SEARCH_UNKNOWN_REQUIREMENTS: '#sets-issue-info',
    PROFILE:
      '#welcome-container > main > div > div > div > div > div > div.panel.panel-default > div',
    LIBRARY_TAB_LINK:
      '#welcome-container > main > div > div > div > div > ul > li:nth-child(3) > a',
    LIBRARY_SEARCH: '#library-toolbar',
    LIBRARY_ROWS: '#Library > div > table > tbody > tr',
    LIBRARY_EDIT_BUTTON: '#default-view > div:nth-child(2) > button',
    LIBRARY_CANCEL_EDIT_BUTTON: '#cancel_default_view_button > div > span',
    LIST_SEARCH: '#positions-toolbar',
    EDIT_BUTTON_NAME_TITLE:
      '#welcome-container > main > div > div > div.eui-page-header > div > div:nth-child(2) > div > div > div > h2 > form > div > button > i',
    EDIT_BUTTON_BASIC_INFO: '#default-view > div > button',
    INPUT_EDIT_NAME: '#code',
    CANCEL_BUTTON_BASIC_INFO: '#cancel_default_view_button > div > span',
    INPUT_TOGGLE_STATUS: '#edit-view > div > div > form > label > label > span',
    NEW_REQUIREMENTS_BUTTON_SETS:
      '#welcome-container > main > div > div > div > div > div > div > div > button',
    NEW_SET: '#edittest1',
    WORKGROUPS_OPEN: 'div > div > div > button > div > span',
    WORKGROUPS_LABELS: 'div > div > div > div > div > form > div > label',
    WORKGROUP_INPUT:
      'div > div > div > div > div > form > div:nth-child([POS]) > div > div > span > div > input',
    WORKGROUP_OPTION:
      'div > div > div > div > div > form > div:nth-child([POS]) > div > div.Select-menu-outer',
    WORKGROUPS_VALUE: '#react-select-[POS]--value-0',
    REQUIREMENT_TYPE_SELECT: '#type',
    REQUIREMENT_TYPES: '#edittest1 > div > div > div > div > div > div > div > ul > li',
    REQUIREMENT_STATE_SELECT:
      '#edittest1 > div > div.requirements-builder > div > div.profession-container > div > div > span > span > button',
    REQUIREMENT_SEARCH: '#query',
    REQUIREMENT_SEARCH_OPTIONS: '#dropdownSelectPopover > div.popover-content > ul > li',
    REQUIREMENT_PROFESSION_SELECT:
      '#edittest1 > div > div > div > div > div > div > span:nth-child(5) > span > button',
    OR_BUTTON: '#edittest1 > div > div > div > div > div > div > div > div.or-button > p',
    REQUIREMENT_2_SELECT_TYPE: 'div:nth-child(2) > div > div > #type',
    REQUIREMENT_2_TYPES:
      '#edittest1 > div > div > div > div > div:nth-child(2) > div > div > ul > li',
    REQUREMENT_2_BOARD_SELECT:
      '#edittest1 > div > div > div > div > div:nth-child(2) > div > span > span > button',
    REQUIREMENT_2_SELECT_PROFESSION:
      '#edittest1 > div > div > div > div > div:nth-child(2) > div > span:nth-child(5) > span > button > div > span',
    AND_BUTTON: '#and-button',
    LIST_ADD_NEW_REQUIREMENTS_FROM: '#edittest1 > div > div> div > span > div > ul > li',
    REQUIREMENT_3_SELECT_TYPE:
      '#edittest1 > div > div > div:nth-child(2) > div > div > div > div > button',
    REQUIREMENT_3_TYPES:
      '#edittest1 > div > div > div:nth-child(2) > div > div > div > div > ul > li',
    REQUIREMENT_3_STATE_SELECT:
      '#edittest1 > div > div > div:nth-child(2) > div > div > div > span > span > button',
    REQUIREMENT_3_SELECT_PROFESSION:
      '#edittest1 > div > div > div:nth-child(2) > div > div > div > span:nth-child(5) > span > button',
    MORE_BUTTON:
      '#edittest1 > div > div > div:nth-child(2) > div > div > div > div > div > button > i',
    OPTIONS_MORE_BUTTON:
      '#edittest1 > div > div > div:nth-child(2) > div > div > div > div > div > ul > li',
    CHECKBOX_TBO: 'body > div > div > div > div > div > form > div > div > label > div',
    INPUT_TBO:
      'body > div > div > div > div > div > form > div > div > div > div > input[type=text]',
    BUTTON_SAVE_TBO:
      'body > div > div > div > div > div > form > div.modal-footer > button.btn-primary',
    LIBRARY_OPTIONS: 'body > div > div > div.modal > div > div > div > div > ul > li',
    SAVE_BUTTON: '#edittest1 > div > div.buttons > button.btn-primary',
    CONFIRM_CHANGES: '#action',
    MORE_OPTIONS_REQUIREMENT: '#viewtest1 > div > div > div > div > button > i',
    CONFIRM_DELETE_SET:
      'body > div > div > div.fade.in.modal > div > div > div.modal-footer > button.btn-primary',
    SET_OPTIONS: '#viewtest1 > div > div > div > div > ul > li',
    BACK_TO_LIST: '#welcome-container > main > div > div > div > div > div > li > a',
    CHECK_GROUP_LIST: '#Positions > div > table > thead > tr > th > label > div',
    INACTIVATE_BUTTON: '#selection-view > div > div > button> div > span',
    DELETE_EXISTING_REQUIREMENT:
      '#viewtest1 > div > div > div > div > ul > li:nth-child(1) > a',
    OPTIONS_WORKGROUOPS: '#edittest1 > div > div > div > div > div > form > div'
  },
  MESSAGES: {
    NOT_FOUND: 'Not found',
    DIFFT_WORKGROUPS: 'Workgroups are different',
    WG_POS_NOT_FOUND: 'No workgroup position has been found',
    WG_SEARCH_FAILED: 'Workgroup search failed',
    ERR_ADD_NEW_REQ:
      'Error while adding new requirement for option (Add new requirement)',
    ERR_ADT_SETTING: 'Error while choosing additional settings',
    ERR_ADD_REQ_LIB: 'Error while adding requirements from library',
    NO_RES_LIB_SEARCH: 'No results for library search',
    ERR_CHOOSE_DEL: 'Error while choosing delete option',
    ERROR_DEL_CREAT_SET: 'Error while deleting the created set',
    UNKWN_POS_NOT_FOUND: 'Unknown position not found',
    UNKWN_REQ_NOT_FOUND: 'Unknown requirement search not found',
    LIB_SEARCH_NOT_FOUND: 'Library search not found'
  }
};
