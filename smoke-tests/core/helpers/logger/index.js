const INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR';

const info = msg => {
  _log(msg, INFO);
};
const warn = msg => {
  _log(msg, WARNING);
};
const error = msg => {
  _log(msg, ERROR);
};
const _log = (msg, level) => {
  // check if this message is about an Error
  if (msg instanceof Error) {
    msg = {
      code: msg.code,
      message: msg.message,
      stack: msg.stack
    };
  }
  // check if this is a Json
  if (typeof msg === 'object') {
    msg = JSON.stringify(msg);
  } else {
    msg = JSON.stringify({ message: msg });
  }
  // send to stdout
  if (level === ERROR) {
    console.error(msg);
  } else if (level === WARNING) {
    console.warn(msg);
  } else if (level === INFO) {
    console.info(msg);
  } else {
    console.log(msg);
  }
};

module.exports = { info, warn, error };
