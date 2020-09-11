const { Smoke } = require('../../core/helpers');
const generadorUuId = require('uuidv4');
const { info, error } = require('../../core/helpers/logger');
const projectInfo = require('./package.json');
const { name: workerType } = projectInfo;

/**
 * @class Worker
 * @constructor
 * @param {String} datacenter - datacenter: bdu/jax
 * @param {String} group - test group
 * @param {String} env - environment: test, demo, prod
 * @throws {error} Thrown if smoke test unexpectedly fails
 * @classdesc Worker class for on-frequence tests, contains a method to execute the requested tests
 */
class Worker {
  constructor(datacenter, group, env) {
    this.env = env;
    this.group = group;
    this.datacenter = datacenter;
  }

  /**
   * @method
   * @async
   * @summary Execute smoke tests and store results in logger instance
   */
  async processSmoke() {
    try {
      const smokeTest = new Smoke(this.datacenter, this.env, this.group, workerType);
      const result = await smokeTest.executeTest();
      info({ uuid: generadorUuId.uuid(), datacenter: this.datacenter, ...result });
    } catch (e) {
      error(e);
    }
  }
}

module.exports = Worker;
