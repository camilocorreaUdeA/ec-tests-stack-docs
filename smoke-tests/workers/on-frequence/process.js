/**
 * @module on-demand process
 */
const { error } = require('../../core/helpers/logger');

/**
 * @function
 * @async
 * @param {String} datacenter- datacenter: bdu/jax
 * @param {String} group- test group
 * @param {String} env -environment: test, demo, prod
 * @throws {error} Thrown if smoke test unexpectedly fails
 * @summary Executes on-demand smoke test
 */
exports.executeProcess = async (datacenter, group, env) => {
  try {
    const Worker = require('./Worker');
    const onFrequenceWorker = new Worker(datacenter, group, env);
    await onFrequenceWorker.processSmoke();
  } catch (e) {
    error(e);
  }
};
