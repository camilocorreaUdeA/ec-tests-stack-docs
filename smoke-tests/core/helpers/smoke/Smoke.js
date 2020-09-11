const { runCLI } = require('jest');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const TestClient = require('./../testClient');
const { error } = require('../logger');
const metricsClient = require('@condor-labs/metrics');

/**
 * @class Smoke
 * @constructor
 * @param {String} datacenter - JAX|BDU
 * @param {String} env - test|demo|production
 * @param {String} group - auth.evercheck.com .....
 * @classdesc Smoke Test class, contain methods: getTestFolderDetails, updateSuiteResultsKeys, updateGroupsByEnvironment and executeTest
 */
class Smoke {
  constructor(datacenter, env, group, workerType) {
    this.env = env;
    this.group = group;
    this.datacenter = datacenter;
    this.workerType = workerType;
  }

  /**
   * @method
   * @async
   * @returns {Object} Object with the folders that contain the tests to be executed
   * @summary This function returns an object with two keys groupTestFolder key and globalTestFolder key
   */
  getTestFolderDetails() {
    let groupTestFolder = this.group.includes('|')
      ? 'scraping.scripts'
      : `scraping.scripts.${this.group}`;

    let globalTestFolder = path.join(__dirname, '..', '..', 'scraping', 'scripts');

    return {
      groupTestFolder,
      globalTestFolder
    };
  }

   /**
   * @method
   * @async
   * @param {Object} formatResult - smoke tests results
   * @returns {Object} - Object with maped smoke tests results
   * @summary This function returns an object with the smoke tests results but replacing http with https
   */
  updateSuiteResultsKeys(formatResult) {
    const { suites } = formatResult;
    for (let key in suites) {
      let suite = suites[key];
      suites[key] = suite;
      suites[key].testSuite = key.replace('http://', '').replace('https://', '');
    }

    return formatResult;
  }

  /**
   * @method
   * @async
   * @param {String} group - group or groups to execute the smoke tests
   * @returns {String} - group
   */
  async updateGroupsByEnvironment(group) {
    const groups = [];
    let groupPath = group.includes('|')
      ? path.resolve(__dirname, '../../scraping/scripts')
      : path.resolve(__dirname, '../../scraping/scripts', group);

    if (!fs.existsSync(groupPath))
      throw new Error('The group does not exist in the path');

    const getConfigsInsideGroup = new Promise((resolve, reject) => {
      try {
        const options = {
          cwd: groupPath
        };
        const forFiles = function (err, files) {
          if (err) reject(err);
          resolve(files);
        };

        glob(`**/*${this.env}.config.js`, options, forFiles);
      } catch (e) {
        reject(e);
      }
    });

    const configFiles = await getConfigsInsideGroup;
    for (const configFile of configFiles) {
      let configFilePath = path.resolve(groupPath, configFile);
      const {
        config: { url }
      } = require(configFilePath);
      groups.push(url.replace('http://', '').replace('https://', ''));
    }

    return groups.length > 1 ? groups.join('|') : groups[0];
  }

  /**
   * @method
   * @async
   * @return smoke tests results
   * @summary This function executes the smoke tests, collects metrics and returns the results
   */
  async executeTest() {
    try {
      let groupUpdated;
      process.env.NODE_ENV = this.env;
      process.env.WORKER_TYPE = this.workerType;
      const { groupTestFolder, globalTestFolder } = this.getTestFolderDetails();
      const jestConfig = {
        _: [`${groupTestFolder}`],
        globals: { globalTest: true },
        runInBand: true,
        passWithNoTests: true,
        noStackTrace: true,
        silent: true,
        reporters: []
      };
      const testClient = new TestClient();
      if (this.env != 'demo') {
        groupUpdated = await this.updateGroupsByEnvironment(this.group);
        if (JSON.parse(process.env.SEND_METRICS) && groupUpdated)
          await testClient.collectMetricsBegin(this.datacenter, groupUpdated);
      }
      const smokeResults = await runCLI(jestConfig, [globalTestFolder]);
      const formatResult = await testClient.formatResult(smokeResults);
      if (this.env != 'demo') {
        if (JSON.parse(process.env.SEND_METRICS) && groupUpdated)
          await testClient.collectMetricsEnd(
            this.datacenter,
            this.updateSuiteResultsKeys(formatResult)
          );
      }
      return formatResult;
    } catch (e) {
      error(e);
    }
  }
}

module.exports = Smoke;
