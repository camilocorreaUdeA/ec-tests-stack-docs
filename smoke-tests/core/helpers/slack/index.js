const slack = require('@condor-labs/helpers').slack();
const logger = require('./../logger');
const slackWebhookSettings = {
  url: process.env.SLACK_WEBHOOK_URL,
  channel: process.env.SLACK_WEBHOOK_CHANNEL,
  username: process.env.SLACK_WEBHOOK_USERNAME
};
const elkHost = process.env.ELK_HOST;

const { containDecimal } = require('../../utils');

exports.sendSlackNotification = async (testResults, inputParams) => {
  let attachmentsOk = [];
  let attachmentsErrors = [];
  let urlDetail = `https://${elkHost}/app/kibana#/discover?_g=(refreshInterval:(pause:!t,value:0),time:(from:now%2Fd,mode:quick,to:now%2Fd))&_a=(columns:!(messageEvent.data),filters:!(),interval:auto,query:(language:lucene,query:'"%5C"uuid%5C":%5C"${inputParams.uuid}%5C""'),sort:!('@timestamp',desc))`;

  let totalFailed = 0;
  let totalPassed = 0;
  for (let key in testResults.suites) {
    let suite = testResults.suites[key];
    let suitePrefix = `[${inputParams.environment.toLowerCase()}] `;
    const isPassed = suite.status === 'passed';
    totalFailed += suite.numFailingTests;
    totalPassed += suite.numPassingTests;

    const suiteAttach = {
      fallback: `${suitePrefix}${suite.testSuite}`,
      title: `${suitePrefix}${suite.testSuite}${
        isPassed ? ` :white_check_mark: (${suite.numPassingTests})` : ``
      }`,
      text: isPassed
        ? ``
        : `
            Result: *${suite.status.toUpperCase()}*.
              :white_check_mark: Passed: ${suite.numPassingTests}
              :x: Failed: ${suite.numFailingTests}
          `,
      color: isPassed ? 'good' : 'danger',
      fields: []
    };
    if (suite.status === 'failed') {
      suiteAttach.pretext = 'TEST FAILED';
      for (let key2 in suite.flows) {
        let flow = suite.flows[key2];
        let { status, steps } = flow;
        if (status === 'failed') {
          const fieldObjects = Object.keys(steps)
            .filter(item => steps[item].status == 'failed')
            .map(item => {
              return {
                title: `${steps[item].fullName}`,
                value: steps[item].failureMessage,
                short: false
              };
            });
          suiteAttach.fields.push(...fieldObjects);
        }
      }
    }
    if (isPassed) {
      attachmentsOk.push(suiteAttach);
    } else {
      attachmentsErrors.push(suiteAttach);
    }
  }
  let total = totalFailed + totalPassed;
  let percentage = (totalPassed / total) * 100;
  percentage = !containDecimal(percentage) ? percentage : percentage.toFixed(1);
  let notifPayload = slackWebhookSettings;
  let webhookSettings = { url: process.env.SLACK_WEBHOOK_URL };
  delete notifPayload.url;

  notifPayload.text = `
*Smoke Results in ${inputParams.environment.toUpperCase()} on ${
    inputParams.datacenter
  } datacenter* (${percentage}%)
*See all results in <${urlDetail}|${elkHost}>*`;
  attachmentsOk.push(...attachmentsErrors);
  notifPayload.attachments = attachmentsOk;
  try {
    await slack.send(webhookSettings, notifPayload);
  } catch (e) {
    logger.error(e);
  }
};
