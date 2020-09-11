const {
  SELECTORS: { TITTLE }
} = require('../_config/constants');
const checkActiveJobs = async ({ page, pendingXHR }) => {
  await pendingXHR.waitForAllXhrFinished();
  await page.waitForSelector(TITTLE);
  return true;
};

module.exports = { checkActiveJobs };
