/**
 * 通过 `@/store/index.js` 一次性引入所有 vuex modules, actions, getters
 */

import _ from 'lodash';

const files = require.context('.', false, /\.js$/);
const modules = {};
const actions = {};
const getters = {};

const ignores = [
  './index.js',
  './common.js',
];

files.keys().forEach((key) => {
  if (_.includes(ignores, key)) {
    return;
  }

  const vuexObj = files(key);

  modules[key.replace(/(\.\/|\.js)/g, '')] = vuexObj.default;

  if (vuexObj.actions) _.extend(actions, vuexObj.actions);
  if (vuexObj.getters) _.extend(getters, vuexObj.getters);
});

export default {
  actions,
  getters,
  modules,
};
