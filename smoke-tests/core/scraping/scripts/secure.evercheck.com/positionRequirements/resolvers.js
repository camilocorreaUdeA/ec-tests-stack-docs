/**
 * @module secure - positionRequirements/resolvers
 */
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const {
  checkFilter,
  isArrayEquals,
  waitForTextInList,
  checkFilerAndClickFromList
} = require('../../../../utils');
const {
  fillRequirement,
  andRequirementsBtn,
  chooseOptionBtnMore,
  getWorkgroupPosition,
  chooseRequirementsOptions
} = require('./utils');
const {
  SELECTORS: {
    LIST,
    NEW_SET,
    PROFILE,
    OR_BUTTON,
    COME_BACK,
    INPUT_TBO,
    AND_BUTTON,
    SET_OPTIONS,
    MORE_BUTTON,
    LIST_SEARCH,
    SAVE_BUTTON,
    LIBRARY_ROWS,
    CHECKBOX_TBO,
    BACK_TO_LIST,
    LIST_TAB_LINK,
    LIBRARY_SEARCH,
    WORKGROUP_INPUT,
    INPUT_EDIT_NAME,
    IMPACTED_UNKNOW,
    WORKGROUPS_OPEN,
    BUTTON_SAVE_TBO,
    LIBRARY_OPTIONS,
    CONFIRM_CHANGES,
    UNKNOW_POSITIONS,
    CHECK_GROUP_LIST,
    LIBRARY_TAB_LINK,
    WORKGROUP_OPTION,
    WORKGROUPS_VALUE,
    INACTIVATE_BUTTON,
    WORKGROUPS_LABELS,
    REQUIREMENT_TYPES,
    REQUIREMENT_SEARCH,
    CONFIRM_DELETE_SET,
    OPTIONS_WORKGROUOPS,
    UNKNOW_REQUIREMENTS,
    INPUT_TOGGLE_STATUS,
    INPUT_POSITION_NAME,
    LIBRARY_EDIT_BUTTON,
    REQUIREMENT_2_TYPES,
    REQUIREMENT_3_TYPES,
    OPTIONS_MORE_BUTTON,
    ADD_POISITION_BUTTON,
    UNKNOW_POSITIONS_ROW,
    EDIT_BUTTON_NAME_TITLE,
    EDIT_BUTTON_BASIC_INFO,
    MANAGE_POSITION_BUTTON,
    UNKNOW_REQUIREMENTS_ROW,
    REQUIREMENT_TYPE_SELECT,
    MORE_OPTIONS_REQUIREMENT,
    REQUIREMENT_STATE_SELECT,
    CANCEL_BUTTON_BASIC_INFO,
    REQUIREMENT_2_SELECT_TYPE,
    REQUIREMENT_3_SELECT_TYPE,
    REQUREMENT_2_BOARD_SELECT,
    REQUIREMENT_SEARCH_OPTIONS,
    LIBRARY_CANCEL_EDIT_BUTTON,
    REQUIREMENT_3_STATE_SELECT,
    DELETE_EXISTING_REQUIREMENT,
    UNKNOW_REQUIREMENTS_DETAILS,
    NEW_REQUIREMENTS_BUTTON_SETS,
    REQUIREMENT_PROFESSION_SELECT,
    UNKNOW_REQUIREMENTS_FORM_INPUT,
    INPUT_SEARCH_UNKNOWN_POSITIONS,
    LIST_ADD_NEW_REQUIREMENTS_FROM,
    UNKNOW_REQUIREMENTS_FORM_CANCEL,
    UNKNOW_REQUIREMENTS_BUTTON_BACK,
    UNKNOW_REQUIREMENTS_FORM_BUTTON,
    REQUIREMENT_2_SELECT_PROFESSION,
    REQUIREMENT_3_SELECT_PROFESSION,
    INPUT_SEARCH_UNKNOWN_REQUIREMENTS,
    UNKNOW_REQUIREMENTS_DETAILS_TITTLE
  },
  MESSAGES: {
    NOT_FOUND,
    DIFFT_WORKGROUPS,
    WG_POS_NOT_FOUND,
    WG_SEARCH_FAILED,
    ERR_ADD_NEW_REQ,
    ERR_ADT_SETTING,
    ERR_ADD_REQ_LIB,
    NO_RES_LIB_SEARCH,
    ERR_CHOOSE_DEL,
    ERROR_DEL_CREAT_SET,
    UNKWN_POS_NOT_FOUND,
    UNKWN_REQ_NOT_FOUND,
    LIB_SEARCH_NOT_FOUND
  }
} = require('./constants');

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Check Position Requirements
 */
const list = async ({ page, pendingXHR }) => {
  let positionReqToSearh;
  switch (process.env.WORKER_TYPE) {
    case 'on_demand':
      positionReqToSearh = config.LIST_SEARCH_ON_DEMAND;
      break;
    case 'on_frequence':
      positionReqToSearh = config.LIST_SEARCH_ON_FREQUENCE;
      break;

    default:
      positionReqToSearh = config.LIST_SEARCH_CORE;
      break;
  }
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(LIST_TAB_LINK);
  await page.click(LIST_TAB_LINK);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(LIST_SEARCH);
  await page.type(LIST_SEARCH, positionReqToSearh);
  await waitForTextInList({ page }, LIST);
  const isSuccessfulSearch = await page.evaluate(
    (LIST, positionReqToSearh) => {
      const positionList = document.querySelectorAll(LIST);
      for (const position of positionList) {
        const positionCodeElement = position.querySelector('td:nth-child(3) > p');
        const positionCode = positionCodeElement ? positionCodeElement.innerText : '';
        if (positionCode.includes(positionReqToSearh)) {
          position.querySelector('td:nth-child(2) > a').click();
          return true;
        }
      }
    },
    LIST,
    positionReqToSearh
  );
  if (!isSuccessfulSearch) return NOT_FOUND + config.LIST_SEARCH;
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(EDIT_BUTTON_NAME_TITLE);
  await page.click(EDIT_BUTTON_NAME_TITLE);
  await page.waitForSelector(EDIT_BUTTON_BASIC_INFO);
  await page.click(EDIT_BUTTON_BASIC_INFO);
  await page.waitForSelector(INPUT_EDIT_NAME);
  await page.type(INPUT_EDIT_NAME, 'TEST', { delay: 50 });
  await page.waitForSelector(INPUT_TOGGLE_STATUS);
  await page.click(INPUT_TOGGLE_STATUS);
  await page.waitFor(1000);
  await page.click(INPUT_TOGGLE_STATUS);
  await page.waitForSelector(CANCEL_BUTTON_BASIC_INFO);
  await page.click(CANCEL_BUTTON_BASIC_INFO);
  while (await page.$('#setRequirement1')) {
    await page.waitForSelector(MORE_OPTIONS_REQUIREMENT);
    await page.click(MORE_OPTIONS_REQUIREMENT);
    await page.waitFor(1000);
    await page.waitForSelector(DELETE_EXISTING_REQUIREMENT);
    await page.click(DELETE_EXISTING_REQUIREMENT);
    await page.waitForSelector(CONFIRM_DELETE_SET);
    await page.click(CONFIRM_DELETE_SET);
    await page.waitFor(2000);
    await pendingXHR.waitForAllXhrFinished();
    await page.waitForSelector(NEW_REQUIREMENTS_BUTTON_SETS);
  }
  await page.reload({ waitUntil: 'load' });
  await page.waitFor(2000);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(NEW_REQUIREMENTS_BUTTON_SETS);
  await page.waitForFunction(
    NEW_REQUIREMENTS_BUTTON_SETS => {
      const newReqBtn = document.querySelector(NEW_REQUIREMENTS_BUTTON_SETS);
      const btnTxt = newReqBtn ? newReqBtn.textContent : '';
      if (btnTxt.includes('ADD NEW')) {
        newReqBtn.querySelector('div').click();
        return true;
      }
    },
    { waitUntil: 'load' },
    NEW_REQUIREMENTS_BUTTON_SETS
  );
  await page.waitForSelector(NEW_SET);
  await page.click(`${NEW_SET}>${WORKGROUPS_OPEN}`);
  await page.waitForSelector(`${NEW_SET}>${WORKGROUPS_LABELS}`);
  await page.waitForSelector(OPTIONS_WORKGROUOPS);
  const workGroupFounds = await page.evaluate(LABELS_TAG => {
    const workgroups = [];
    const labels = document.querySelectorAll(LABELS_TAG);
    for (const label of labels) {
      const labelText = label.textContent ? label.textContent : '';
      workgroups.push(labelText);
    }
    return workgroups;
  }, `${NEW_SET}>${WORKGROUPS_LABELS}`);
  if (!isArrayEquals(workGroupFounds, config.WORKGROUPS)) return DIFFT_WORKGROUPS;

  const workGroupPos = await getWorkgroupPosition(
    { page },
    OPTIONS_WORKGROUOPS,
    config.WORKGROUPS[0]
  );
  if (!workGroupPos) return WG_POS_NOT_FOUND;

  const workgroupInputChoosedTag = WORKGROUP_INPUT.replace('[POS]', workGroupPos);
  const workgroupOptionChoosedTag = WORKGROUP_OPTION.replace('[POS]', workGroupPos);
  const workgroupValChoosedTag = WORKGROUPS_VALUE.replace('[POS]', workGroupPos + 1);

  await page.waitForSelector(`${NEW_SET}>${workgroupInputChoosedTag}`);
  await page.type(`${NEW_SET}>${workgroupInputChoosedTag}`, config.WORKGROUP_SEARCH, {
    delay: 50
  });
  await page.waitFor(1000);
  await page.waitForSelector(`${NEW_SET}>${workgroupOptionChoosedTag}`);
  await page.click(`${NEW_SET}>${workgroupOptionChoosedTag}`);
  await page.waitForSelector(workgroupValChoosedTag);
  const isCorrectSearch = await checkFilter(
    { page },
    workgroupValChoosedTag,
    config.WORKGROUP_SEARCH
  );

  if (!isCorrectSearch) return WG_SEARCH_FAILED;
  //Filling requirement 1
  const isFilledRequirement1 = await fillRequirement(
    { page },
    {
      name: 'Licensed as',
      tagSelect: REQUIREMENT_TYPE_SELECT,
      tagOptions: REQUIREMENT_TYPES
    },
    {
      name: config.REQUIREMENT1['stateOrBoard'],
      tagSelect: REQUIREMENT_STATE_SELECT,
      tagSearch: REQUIREMENT_SEARCH,
      options: REQUIREMENT_SEARCH_OPTIONS
    },
    {
      name: config.REQUIREMENT1['profession'],
      tagSelect: REQUIREMENT_PROFESSION_SELECT,
      tagSearch: REQUIREMENT_SEARCH,
      options: REQUIREMENT_SEARCH_OPTIONS
    }
  );
  if (!isFilledRequirement1.success) return isFilledRequirement1.errorMessage;
  await page.waitForFunction(
    OR_BUTTON => {
      const orButton = document.querySelector(OR_BUTTON);
      const orButtonTxt = orButton ? orButton.textContent : '';
      if (orButtonTxt.includes('OR')) {
        orButton.click();
        return true;
      }
    },
    { waitUntil: 'load' },
    OR_BUTTON
  );

  //Filling requirement 2
  const isFilledRequirement2 = await fillRequirement(
    { page },
    {
      name: 'Certified by',
      tagSelect: REQUIREMENT_2_SELECT_TYPE,
      tagOptions: REQUIREMENT_2_TYPES
    },
    {
      name: config.REQUIREMENT2['stateOrBoard'],
      tagSelect: REQUREMENT_2_BOARD_SELECT,
      tagSearch: REQUIREMENT_SEARCH,
      options: REQUIREMENT_SEARCH_OPTIONS
    },
    {
      name: config.REQUIREMENT2['profession'],
      tagSelect: REQUIREMENT_2_SELECT_PROFESSION,
      tagSearch: REQUIREMENT_SEARCH,
      options: REQUIREMENT_SEARCH_OPTIONS
    }
  );
  if (!isFilledRequirement2.success) return isFilledRequirement2.errorMessage;

  await andRequirementsBtn({ page }, AND_BUTTON);
  const isAddingNewRequirement = chooseRequirementsOptions(
    { page },
    LIST_ADD_NEW_REQUIREMENTS_FROM,
    'Add new requirement'
  );
  if (!isAddingNewRequirement) return ERR_ADD_NEW_REQ;

  //Filling requirement 3
  const isFilledRequirement3 = await fillRequirement(
    { page },
    {
      name: 'Licensed as',
      tagSelect: REQUIREMENT_3_SELECT_TYPE,
      tagOptions: REQUIREMENT_3_TYPES
    },
    {
      name: config.REQUIREMENT3['stateOrBoard'],
      tagSelect: REQUIREMENT_3_STATE_SELECT,
      tagSearch: REQUIREMENT_SEARCH,
      options: REQUIREMENT_SEARCH_OPTIONS
    },
    {
      name: config.REQUIREMENT3['profession'],
      tagSelect: REQUIREMENT_3_SELECT_PROFESSION,
      tagSearch: REQUIREMENT_SEARCH,
      options: REQUIREMENT_SEARCH_OPTIONS
    }
  );
  if (!isFilledRequirement3.success) return isFilledRequirement3.errorMessage;
  await page.waitForSelector(MORE_BUTTON);

  if (
    !(await chooseOptionBtnMore(
      { page },
      MORE_BUTTON,
      OPTIONS_MORE_BUTTON,
      'Additional settings'
    ))
  )
    return ERR_ADT_SETTING;
  await page.waitForSelector(CHECKBOX_TBO);
  await page.waitFor(1000);
  await page.click(CHECKBOX_TBO);
  await page.waitForSelector(INPUT_TBO);
  await page.type(INPUT_TBO, '30', {
    delay: 50
  });
  await page.waitForSelector(BUTTON_SAVE_TBO);
  await page.click(BUTTON_SAVE_TBO);
  await page.waitFor(1000);
  await andRequirementsBtn({ page }, AND_BUTTON);
  if (
    !(await chooseRequirementsOptions(
      { page },
      LIST_ADD_NEW_REQUIREMENTS_FROM,
      'Add from library'
    ))
  )
    return ERR_ADD_REQ_LIB;
  await page.waitForSelector(REQUIREMENT_SEARCH);
  await page.type(REQUIREMENT_SEARCH, config.LIBRARY_SEARCH, {
    delay: 50
  });
  if (
    !(await checkFilerAndClickFromList(
      { page },
      LIBRARY_OPTIONS,
      'p',
      config.LIBRARY_SEARCH
    ))
  )
    return NO_RES_LIB_SEARCH;
  if (!(await chooseOptionBtnMore({ page }, MORE_BUTTON, OPTIONS_MORE_BUTTON, 'Delete')))
    return ERR_CHOOSE_DEL;
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    (SAVE_BUTTON, CONFIRM_CHANGES) => {
      const saveButton = document.querySelector(SAVE_BUTTON);
      if (saveButton) saveButton.click();
      const confirmChanges = document.querySelector(CONFIRM_CHANGES);
      if (confirmChanges) return true;
    },
    { waitUntil: 'load' },
    SAVE_BUTTON,
    CONFIRM_CHANGES
  );
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CONFIRM_CHANGES);
  await page.click(CONFIRM_CHANGES);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(MORE_OPTIONS_REQUIREMENT);
  await page.click(MORE_OPTIONS_REQUIREMENT);
  if (!(await chooseRequirementsOptions({ page }, SET_OPTIONS, 'Delete')))
    return ERROR_DEL_CREAT_SET;
  await page.waitForFunction(
    CONFIRM_DELETE_SET => {
      const confirmDelete = document.querySelector(CONFIRM_DELETE_SET);
      if (confirmDelete) {
        confirmDelete.click();
        return true;
      }
    },
    { waitUntil: 'load' },
    CONFIRM_DELETE_SET
  );
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1000);
  await page.waitForSelector(BACK_TO_LIST);
  await page.click(BACK_TO_LIST);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(CHECK_GROUP_LIST);
  while (!(await page.$(INACTIVATE_BUTTON))) await page.click(CHECK_GROUP_LIST);
  await page.waitForSelector(INACTIVATE_BUTTON);
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Position Requirements, and check the functionality of Unknown positions and Unknown requirements widgets under Overview tab
 */
const overview = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    UNKNOW_POSITIONS => {
      const unknowPositionList = document.querySelectorAll(UNKNOW_POSITIONS);
      for (const unknowPosition of unknowPositionList) {
        let unknowPositionText = unknowPosition ? unknowPosition.textContent : '';
        if (unknowPositionText !== '') {
          unknowPosition.querySelector('td > button').click();
          return true;
        }
      }
    },
    { waitUntil: 'load' },
    UNKNOW_POSITIONS
  );
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(UNKNOW_REQUIREMENTS_FORM_BUTTON);
  await page.waitForSelector(UNKNOW_REQUIREMENTS_FORM_INPUT);
  await page.type(UNKNOW_REQUIREMENTS_FORM_INPUT, 'TEST_REQUIREMENT', { delay: 50 });
  await page.click(UNKNOW_REQUIREMENTS_FORM_BUTTON);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(UNKNOW_REQUIREMENTS_BUTTON_BACK);
  await page.click(UNKNOW_REQUIREMENTS_BUTTON_BACK);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(UNKNOW_REQUIREMENTS_FORM_CANCEL);
  await page.click(UNKNOW_REQUIREMENTS_FORM_CANCEL);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    UNKNOW_REQUIREMENTS => {
      const unknowRequirementList = document.querySelectorAll(UNKNOW_REQUIREMENTS);
      for (const unknowRequirement of unknowRequirementList) {
        let unknowRequirementText = unknowRequirement
          ? unknowRequirement.textContent
          : '';
        if (unknowRequirementText !== '') {
          unknowRequirement.querySelector('td > button > div > span').click();
          return true;
        }
      }
    },
    { waitUntil: 'load' },
    UNKNOW_REQUIREMENTS
  );
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    (UNKNOW_REQUIREMENTS_DETAILS_TITTLE, UNKNOW_REQUIREMENTS_DETAILS) => {
      const titleTag = document.querySelector(UNKNOW_REQUIREMENTS_DETAILS_TITTLE);
      const detailTag = document.querySelector(UNKNOW_REQUIREMENTS_DETAILS);
      const titleText = titleTag ? titleTag.textContent : '';
      const detailText = detailTag ? detailTag.textContent : '';
      if (titleText === 'Requirement Sets' && detailText !== '') return true;
    },
    { waitUntil: 'load' },
    UNKNOW_REQUIREMENTS_DETAILS_TITTLE,
    UNKNOW_REQUIREMENTS_DETAILS
  );

  const isLoad = await page.evaluate(
    (UNKNOW_REQUIREMENTS_DETAILS_TITTLE, UNKNOW_REQUIREMENTS_DETAILS) => {
      const titleTag = document.querySelector(UNKNOW_REQUIREMENTS_DETAILS_TITTLE);
      const detailTag = document.querySelector(UNKNOW_REQUIREMENTS_DETAILS);
      const titleText = titleTag ? titleTag.textContent : '';
      const detailText = detailTag ? detailTag.textContent : '';
      if (titleText === 'Requirement Sets' && detailText !== '') return true;
    },
    UNKNOW_REQUIREMENTS_DETAILS_TITTLE,
    UNKNOW_REQUIREMENTS_DETAILS
  );

  return isLoad;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Position Requirements, then go to overview tab anc check by searching in the unknown positions widget
 */
const unknownPositions = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(INPUT_SEARCH_UNKNOWN_POSITIONS);
  await page.type(INPUT_SEARCH_UNKNOWN_POSITIONS, config.UNKNOW_POSITION_SEARCH);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1000);
  await page.waitForFunction(
    (UNKNOW_POSITIONS_ROW, UNKNOW_POSITION_SEARCH) => {
      const rows = document.querySelectorAll(UNKNOW_POSITIONS_ROW);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(UNKNOW_POSITION_SEARCH)) return true;
      }
    },
    { waitUntil: 'load' },
    UNKNOW_POSITIONS_ROW,
    config.UNKNOW_POSITION_SEARCH
  );
  const existUnknow = await page.evaluate(
    (UNKNOW_POSITIONS_ROW, UNKNOW_POSITION_SEARCH) => {
      const rows = document.querySelectorAll(UNKNOW_POSITIONS_ROW);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(UNKNOW_POSITION_SEARCH)) {
          row.querySelector('td:nth-child(3) > a').click();
          return true;
        }
      }
    },
    UNKNOW_POSITIONS_ROW,
    config.UNKNOW_POSITION_SEARCH
  );
  if (!existUnknow) return UNKWN_POS_NOT_FOUND;
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    (IMPACTED_UNKNOW, UNKNOW_POSITION_SEARCH) => {
      const rows = document.querySelectorAll(IMPACTED_UNKNOW);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(UNKNOW_POSITION_SEARCH)) return true;
      }
    },
    { waitUntil: 'load' },
    IMPACTED_UNKNOW,
    config.UNKNOW_POSITION_SEARCH
  );
  await page.waitForSelector(COME_BACK);
  await page.click(COME_BACK);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(ADD_POISITION_BUTTON);
  await page.click(ADD_POISITION_BUTTON);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(INPUT_POSITION_NAME);
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Position Requirements, then go to overview tab anc check by searching in the unknown requirements widget
 */
const unknownRequirements = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(INPUT_SEARCH_UNKNOWN_REQUIREMENTS);
  await page.type(INPUT_SEARCH_UNKNOWN_REQUIREMENTS, config.UNKNOW_REQUIREMENT_SEARCH);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1000);
  await page.waitForFunction(
    (UNKNOW_REQUIREMENTS_ROW, UNKNOW_REQUIREMENT_SEARCH) => {
      const rows = document.querySelectorAll(UNKNOW_REQUIREMENTS_ROW);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(UNKNOW_REQUIREMENT_SEARCH)) return true;
      }
    },
    { waitUntil: 'load' },
    UNKNOW_REQUIREMENTS_ROW,
    config.UNKNOW_REQUIREMENT_SEARCH
  );
  const existUnknow = await page.evaluate(
    (UNKNOW_REQUIREMENTS_ROW, UNKNOW_REQUIREMENT_SEARCH) => {
      const rows = document.querySelectorAll(UNKNOW_REQUIREMENTS_ROW);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(UNKNOW_REQUIREMENT_SEARCH)) {
          row.querySelector('td:nth-child(3) > a').click();
          return true;
        }
      }
    },
    UNKNOW_REQUIREMENTS_ROW,
    config.UNKNOW_REQUIREMENT_SEARCH
  );
  if (!existUnknow) return UNKWN_REQ_NOT_FOUND;
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForFunction(
    (IMPACTED_UNKNOW, UNKNOW_REQUIREMENT_SEARCH) => {
      const rows = document.querySelectorAll(IMPACTED_UNKNOW);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(UNKNOW_REQUIREMENT_SEARCH)) return true;
      }
    },
    { waitUntil: 'load' },
    IMPACTED_UNKNOW,
    config.UNKNOW_REQUIREMENT_SEARCH
  );
  await page.waitForSelector(COME_BACK);
  await page.click(COME_BACK);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(MANAGE_POSITION_BUTTON);
  await page.click(MANAGE_POSITION_BUTTON);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(PROFILE);
  return true;
};

/**
 * @function
 * @async
 * @param {page} puppeteer-page - page
 * @param {pendingXHR} pending-xhr-puppeteer - pending-xhr-puppeteer
 * @returns {Boolean}
 * @throws {TimeOut} Thrown if a selector is not rendered before a fixed time threshold.
 * @summary Go to Position Requirements, then click on Library tab and check information loaded in table
 */
const library = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(LIBRARY_TAB_LINK);
  await page.click(LIBRARY_TAB_LINK);
  await pendingXHR.waitForAllXhrFinished();
  await page.waitFor(1000);
  await page.waitForSelector(LIBRARY_SEARCH);
  await page.type(LIBRARY_SEARCH, config.LIBRARY_SEARCH);
  await page.waitForFunction(
    (LIBRARY_ROWS, LIBRARY_SEARCH) => {
      const rows = document.querySelectorAll(LIBRARY_ROWS);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(LIBRARY_SEARCH)) return true;
      }
    },
    { waitUntil: 'load' },
    LIBRARY_ROWS,
    config.LIBRARY_SEARCH
  );
  const existLibrary = await page.evaluate(
    (LIBRARY_ROWS, LIBRARY_SEARCH) => {
      const rows = document.querySelectorAll(LIBRARY_ROWS);
      for (const row of rows) {
        const rowText = row ? row.textContent : '';
        if (rowText.includes(LIBRARY_SEARCH)) {
          row.querySelector('td:nth-child(2) > a').click();
          return true;
        }
      }
    },
    LIBRARY_ROWS,
    config.LIBRARY_SEARCH
  );
  if (!existLibrary) return LIB_SEARCH_NOT_FOUND;
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(LIBRARY_EDIT_BUTTON);
  await page.click(LIBRARY_EDIT_BUTTON);
  await page.waitForSelector(LIBRARY_CANCEL_EDIT_BUTTON);
  await page.click(LIBRARY_CANCEL_EDIT_BUTTON);
  return true;
};

module.exports = {
  list,
  library,
  overview,
  unknownPositions,
  unknownRequirements
};
