require('dotenv').config();
const CronJob = require('cron').CronJob;
const { utils } = require('./helpers');
const { executeProcess } = require('./process');
const metricsClient = require('@condor-labs/metrics');
const logger = require('./../../core/helpers/logger');

//Required Envs
const requiredEnvs = [
  'JOB',
  'GROUP',
  'HOSTNAME',
  'NODE_ENV',
  'CRON_TIME',
  'DATACENTER',
  'STATSD_HOST',
  'STATSD_PORT'
];

utils.validateEnvFile(requiredEnvs);
const {
  JOB,
  GROUP,
  NODE_ENV,
  HOSTNAME,
  CRON_TIME,
  DATACENTER,
  STATSD_HOST,
  STATSD_PORT
} = process.env;

const statsDSettings = {
  host: STATSD_HOST,
  port: STATSD_PORT,
  globalTags: {
    instance: HOSTNAME,
    job: JOB
  }
};

metricsClient.connect(statsDSettings);
metricsClient.heartbeatSignal();
metricsClient.collectSystemInformation();
metricsClient.restartSignal();
metricsClient.socket.on('error', function (error) {
  logger.error(error);
});

let processIsRunning = false;

const smokeTestJob = new CronJob({
  cronTime: CRON_TIME,
  onTick: async () => {
    if (!processIsRunning) {
      processIsRunning = true;
      await executeProcess(DATACENTER, GROUP, NODE_ENV);
      processIsRunning = false;
    }
  },
  runOnInit: true
});

smokeTestJob.start();
