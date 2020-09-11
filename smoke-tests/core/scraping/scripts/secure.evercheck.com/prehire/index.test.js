const { PendingXHR } = require('pending-xhr-puppeteer');
const { Puppeteer } = require('../../../../helpers/puppeteer');
const accounts = require('../../accounts.evercheck.com/accounts');
const { config } = require(`./../_config/${process.env.NODE_ENV}.config`);
const resolver = require('./resolvers');
const { hideChatAssistant, chatAssistantExist } = require('../utils');
const {
  SELECTORS: { PREHIRE_CANDIDATES_TAB }
} = require('./constants');

const puppeteer = new Puppeteer(null, null);
let page;
let pendingXHR;

beforeAll(async () => {
  page = await puppeteer.newPage();
  pendingXHR = new PendingXHR(page);
  await accounts.loginPage({ page });
  await accounts.login({ page });
});
beforeEach(async () => {
  await page.goto(`${config.url}/prehire`);
  await pendingXHR.waitForAllXhrFinished();
  if (await chatAssistantExist({ page })) await hideChatAssistant({ page });
});

afterAll(async () => {
  await page.closeAndDeleteCache();
});

describe(`${config.url}`, () => {
  describe('Prehire widgets', () => {
    it('Candidate Totals', async () => {
      const result = await resolver.candidateTotal({ page, pendingXHR });
      const { sumWidgets, countTableCandidates } = result;
      expect(!!result).toBe(true);
      expect(countTableCandidates).toBe(sumWidgets);
    });

    it('Candidates: by issue', async () => {
      const result = await resolver.byIssue({ page, pendingXHR });
      expect(result).toBe(true);
    });

    it('Candidates: days in system', async () => {
      const result = await resolver.daysInSystem({ page, pendingXHR });
      const { daysInSystemFirstItem, daysInSystemLastItem } = result;
      expect(!!result).toBe(true);
      expect(daysInSystemFirstItem).toBeGreaterThanOrEqual(daysInSystemLastItem);
    });

    it('Candidates: by start date', async () => {
      const result = await resolver.byStartDate({ page, pendingXHR });
      expect(!!result).toBe(true);
    });
  });

  describe('Candidate List', () => {
    beforeEach(async () => {
      await page.waitFor(PREHIRE_CANDIDATES_TAB);
      await page.click(PREHIRE_CANDIDATES_TAB);
    });

    it('Check that the candidates list loads', async () => {
      const result = await resolver.canditateListLoad({ page, pendingXHR });
      expect(!!result).toBe(true);
    });

    it('Check that the candidates list can be filtered', async () => {
      const result = await resolver.canditateListFiltred({ page, pendingXHR });
      expect(!!result).toBe(true);
    });

    it('Check that that candidates list can be exported', async () => {
      const result = await resolver.candidateListExported({ page, pendingXHR });
      expect(!!result).toBe(true);
    });
  });

  describe('Candidate Profiles', () => {
    beforeEach(async () => {
      await page.goto(`${config.url}/prehire/candidates`);
      await pendingXHR.waitForAllXhrFinished();
      const FIST_ITEM_PROFILE_CANDIDATE_TABLE =
        '#Candidates > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > div > div > a';
      await page.waitFor(FIST_ITEM_PROFILE_CANDIDATE_TABLE);

      await page.waitForFunction(
        FIST_ITEM_PROFILE_CANDIDATE_TABLE => {
          let item = document.querySelector(FIST_ITEM_PROFILE_CANDIDATE_TABLE);
          return !!item.textContent;
        },
        { waitUntil: 'load' },
        FIST_ITEM_PROFILE_CANDIDATE_TABLE
      );
      await page.click(FIST_ITEM_PROFILE_CANDIDATE_TABLE);
      await pendingXHR.waitForAllXhrFinished();
      await page.waitFor(2500);
      await page.waitFor('#undefined-ecPanel-0-expanded');
      await page.click('#undefined-ecPanel-0-expanded');
      await pendingXHR.waitForAllXhrFinished();
    });

    it('Check that position requirements load', async () => {
      const result = await resolver.candidatePositionRequirementLoad({
        page,
        pendingXHR
      });
      expect(!!result).toBe(true);
    });

    it('Check that hiring status calculates ', async () => {
      const result = await resolver.candidateHiringStatusCalcucate({
        page,
        pendingXHR
      });
      expect(!!result).toBe(true);
    });

    it('Check that the requirements status calculates', async () => {
      const result = await resolver.candidateRequirementStatusCalculate({
        page,
        pendingXHR
      });
      expect(!!result).toBe(true);
    });
  });
});
