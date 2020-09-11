const SQS = require('@condor-labs/sqs');
const { Smoke } = require('../../core/helpers');
const { sendSlackNotification } = require('./../../core/helpers/slack');
const generadorUuId = require('uuidv4');
const { error, info } = require('../../core/helpers/logger');
const projectInfo = require('./package.json');
const { name: workerType } = projectInfo;

/**
 * @class Worker
 * @constructor
 * @param {Object} pollParams - {
 *      queueUrl: sqs url,
        isCallback: false by default,
        batchSize: sqs batch size,
        waitTimeSeconds: sqs wait time in seconds,
        visibilityTimeout: sqs visibility timeout
    }
 * @param {Object} credentials - {
        accessKeyId: aws access key id,
        secretAccessKey: aws access key,
        region: aws region
    }
 * @classdesc Worker class for on-demand tests, contains methods to poll SQS, execute tests and send results back to slack
 */
class Worker {
  constructor(pollParams, credentials) {
    this.pollParams = pollParams;
    this.credentials = credentials;
  }

  /**
   * @method
   * @async
   * @param {String} message
   * @summary Execute smoke tests and send results back to slack channel
   */
  async processMessages(message) {
    try {
      const { datacenter, env, group } = JSON.parse(message['Message']);
      const smokeTest = new Smoke(datacenter, env, group, workerType);
      const testResults = await smokeTest.executeTest();
      const uuid = generadorUuId.uuid();
      const params = {
        environment: env,
        datacenter: datacenter,
        uuid
      };
      info({ uuid, datacenter, ...testResults });
      if (testResults) await sendSlackNotification(testResults, params);
    } catch (e) {
      error(e);
    }
  }

  /**
   * @method
   * @summary Pull message from SQS and execute requested tests
   */
  setPollhandler() {
    this.pollParams.pollHandler = this.processMessages;
  }

  /**
   * @method
   * @summary Set connection to SQS
   */
  pollQueue() {
    SQS.poll(this.pollParams, this.credentials);
  }
}

module.exports = Worker;
