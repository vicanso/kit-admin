import _ from 'lodash';

function get(path, defaultValue) {
  /* eslint no-undef:0 */
  return _.get(window, path, defaultValue);
}

function set(path, value) {
  /* eslint no-undef:0 */
  _.set(window, path, value);
}

export default {
  get,
  set,
};
