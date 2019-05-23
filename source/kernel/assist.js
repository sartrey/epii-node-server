const chokidar = require('chokidar');
const logger = require('./logger.js');

/**
 * define internal method
 *
 * @param  {Object} target
 * @param  {String} key
 * @param  {*=} value
 * @param  {Object=} options
 */
function internal(target, key, value, options) {
  if (!target) return;
  Object.defineProperty(target, key, {
    value,
    writable: false,
    configurable: false,
    enumerable: (options && options.enumerable) || true
  });
}

/**
 * convert any object to array
 *
 * @param  {*=} o
 * @return {*[]}
 */
function arrayify(o) {
  if (o == null) return [];
  return Array.isArray(o) ? o : [o];
}

/**
 * try to watch with custom callback
 *
 * @param  {String} target
 * @param  {Function} callback
 * @return {Object} fs.Watcher
 */
function tryWatch(target, callback) {
  if (!target) {
    return logger.halt('invalid watch target');
  }
  if (!callback || typeof callback !== 'function') {
    return logger.halt('invalid watch callback');
  }
  return chokidar.watch(
    target,
    {
      persistent: true,
      ignoreInitial: true,
      followSymlinks: false
    }
  )
    .on('all', callback);
}

module.exports = {
  internal,
  arrayify,
  tryWatch
};
