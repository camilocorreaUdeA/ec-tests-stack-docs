const metrics = require('@condor-labs/metrics');
const { sleep } = require('./../../utils');
const {
  METRICS_SMOKE_TESTS_TOTAL,
  METRICS_SMOKE_TESTS_STATUS,
  METRICS_SMOKE_TESTS_DURATION,
  METRICS_SMOKE_TESTS_LAST_TIME,
  METRICS_SMOKE_TESTS_SUITE_STATUS,
  METRICS_WAIT_TIME
} = require('./../constants');

/**
 * @class TestClient
 * @constructor
 * @param {String} datacenter - BDU|JAX
 * @param {String} testGroups - auth.evercheck.com, ...
 * @classdesc TestClient class, contains collectMetrics functions
 */
class TestClient {
  /**
   * @method
   * @async
   * @param {String} datacenter - JAX|BDU
   * @param {String} testGroups - auth.evercheck.com ....
   * @summary This function collects the first metrics (running)
   */
  async collectMetricsBegin(datacenter, testGroups) {
    let mtestGroups = testGroups.split('|');
    for (let i = 0; i < mtestGroups.length; i++) {
      // Suite testing just started (RUNNING = 1)
      metrics.gauge(METRICS_SMOKE_TESTS_SUITE_STATUS, 1, {
        datacenter,
        group: mtestGroups[i]
      });
    }
    // wait a  few miliseconds before continue saving metrics
    await sleep(METRICS_WAIT_TIME);
  }

   /**
   * @method
   * @async
   * @param {Object} result - Smoke tests results
   * @return {Object} Parsed smoke test results
   * @summary This function receives the smokes tests results and then parses them
   */
  async formatResult(result) {
    if (
      result.error ||
      !result.results ||
      !result.results.testResults ||
      result.results.testResults.length === 0
    ) {
      return result;
    }
    let ret = {
      status: 'passed',
      duration: 0,
      suites: {}
    };

    result.results.testResults.map(testR => {
      testR.testResults.map(testR2 => {
        // remove special chars
        let appName = testR2.ancestorTitles[0].replace('\b\f\n\r\t"\\', ''),
          flowName = testR2.ancestorTitles[1].replace('\b\f\n\r\t"\\', ''),
          stepName = testR2.title.replace('\b\f\n\r\t"\\', '');

        if (!ret.suites[appName]) {
          ret.suites[appName] = {
            testSuite: testR2.ancestorTitles[0],
            status: 'passed',
            duration: 0,
            failureMessages: [],
            numFailingTests: 0,
            numPassingTests: 0,
            flows: {}
          };
        }
        if (!ret.suites[appName]['flows'][flowName]) {
          ret.suites[appName]['flows'][flowName] = {
            status: 'passed',
            duration: 0,
            failureMessages: [],
            steps: {}
          };
        }
        // update root
        ret.duration += testR2.duration;
        if (ret.status == 'passed') {
          ret.status = testR2.status;
        }
        // update suite
        ret.suites[appName].duration += testR2.duration;
        let firstErrorMessage =
          testR2.failureMessages[0] && testR2.failureMessages[0].length
            ? testR2.failureMessages[0].split('\n')[0]
            : testR2.failureMessages;
        ret.suites[appName].failureMessages.push(firstErrorMessage);

        ret.suites[appName].numFailingTests += testR2.failureMessages.length > 0 ? 1 : 0;
        ret.suites[appName].numPassingTests += testR2.failureMessages.length > 0 ? 0 : 1;
        if (ret.suites[appName].status == 'passed') {
          ret.suites[appName].status = testR2.status;
        }
        // update flow
        ret.suites[appName]['flows'][flowName].duration += testR2.duration;
        let firstErrorMessage2 =
          testR2.failureMessages[0] && testR2.failureMessages[0].length
            ? testR2.failureMessages[0].split('\n')[0]
            : testR2.failureMessages;
        ret.suites[appName]['flows'][flowName].failureMessages.push(firstErrorMessage2);
        if (ret.suites[appName]['flows'][flowName].status == 'passed') {
          ret.suites[appName]['flows'][flowName].status = testR2.status;
        }
        // save step
        ret.suites[appName]['flows'][flowName]['steps'][stepName] = {
          duration: testR2.duration,
          status: testR2.status,
          fullName: testR2.fullName,
          failureMessage: firstErrorMessage2
        };
      });
    });
    return ret;
  }

  /**
   * @param {String} datacenter - JAX|BDU
   * @param {String} testGroups - auth.evercheck.com ....
   * @summary This function collects the final metrics (stopped)
   */
  async collectMetricsEnd(datacenter, result) {
    for (let key in result.suites) {
      let suite = result.suites[key];
      // Suite testing has been completed (STOPPED = 0)
      metrics.gauge(METRICS_SMOKE_TESTS_SUITE_STATUS, 0, {
        datacenter,
        group: suite.testSuite
      });
      // save failed tests by suite
      metrics.gauge(METRICS_SMOKE_TESTS_TOTAL, suite.numFailingTests, {
        datacenter,
        status: 'failed',
        group: suite.testSuite
      });
      // save successful tests by suite
      metrics.gauge(METRICS_SMOKE_TESTS_TOTAL, suite.numPassingTests, {
        datacenter,
        status: 'passed',
        group: suite.testSuite
      });
      for (let key2 in suite.flows) {
        let flow = suite.flows[key2];
        // save testing status by flow
        metrics.gauge(METRICS_SMOKE_TESTS_STATUS, flow.status === 'passed' ? 1 : 0, {
          datacenter,
          name: `${suite.testSuite} -> ${key2}`,
          group: suite.testSuite
        });
        // save testing duration by flow
        metrics.gauge(METRICS_SMOKE_TESTS_DURATION, flow.duration / 1000, {
          datacenter,
          name: `${suite.testSuite} -> ${key2}`,
          group: suite.testSuite,
          status: flow.status
        });
        // wait a  few miliseconds before continue saving metrics
        await sleep(METRICS_WAIT_TIME);
      }
      // save last-time updated
      metrics.gauge(METRICS_SMOKE_TESTS_LAST_TIME, Date.now(), {
        datacenter,
        group: suite.testSuite
      });
      // wait a  few miliseconds before continue saving metrics
      await sleep(METRICS_WAIT_TIME);
    }
  }
}

module.exports = TestClient;
