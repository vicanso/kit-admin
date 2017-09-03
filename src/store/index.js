import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import _ from 'lodash';

import modules from './modules';

Vue.use(Vuex);

const isProduction = process.env.NODE_ENV === 'production';
const debug = !isProduction;

const store = new Vuex.Store({
  ...modules,
  strict: debug,
  // store中使用的插件
  plugins: debug ? [createLogger()] : [],
});

export default store;
export function get(key) {
  return _.get(store.state, key);
}

export function getLang(key) {
  return _.get(store.state.lang, key);
}
