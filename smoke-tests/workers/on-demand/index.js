require('dotenv').config();
const Worker = require('./Worker');
const { utils } = require('./helpers');
const { STATSD_HOST, STATSD_PORT, HOSTNAME, JOB } = process.env;
const metricsClient = require('@condor-labs/metrics');
const logger = require('./../../core/helpers/logger');

//Required Envs
const requiredEnvs = [
  'JOB',
  'ELK_HOST',
  'HOSTNAME',
  'AWS_REGION',
  'AWS_SQS_URL',
  'STATSD_HOST',
  'STATSD_PORT',
  'AWS_ACCESS_KEY_ID',
  'AWS_SQS_BATCH_SIZE',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_SQS_WAIT_TIME_SECONDS',
  'AWS_SQS_VISIBILITY_TIMEOUT'
];
utils.validateEnvFile(requiredEnvs);

const {
  AWS_REGION,
  AWS_SQS_URL,
  AWS_ACCESS_KEY_ID,
  AWS_SQS_BATCH_SIZE,
  AWS_SECRET_ACCESS_KEY,
  AWS_SQS_WAIT_TIME_SECONDS,
  AWS_SQS_VISIBILITY_TIMEOUT
} = process.env;

const poolParams = {
  queueUrl: AWS_SQS_URL,
  isCallback: false,
  batchSize: AWS_SQS_BATCH_SIZE,
  waitTimeSeconds: AWS_SQS_WAIT_TIME_SECONDS,
  visibilityTimeout: AWS_SQS_VISIBILITY_TIMEOUT
};

const awsCredentials = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
};

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
metricsClient.restartSignal();
metricsClient.socket.on('error', function (error) {
  logger.error(error);
});

//On Demand Worker instance
const onDemandWorker = new Worker(poolParams, awsCredentials);
onDemandWorker.setPollhandler();
onDemandWorker.pollQueue();

process.on('SIGINT', () => {
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.exit(0);
});

process.on('message', msg => {
  if (msg == 'shutdown') {
    process.exit(0);
  }
});
