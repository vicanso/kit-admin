import _ from 'lodash';
import { LANGS } from '@/http/apis';
import * as http from '@/http';
import { setType } from '@/helpers/utils';
import {
  LANG_LIST,
  LANG_LIST_ALL,
  LANG_UPDATE,
  LANG_ADD,
} from '@/store/mutation-types';
import globals from '@/helpers/globals';
import {
  createMutation,
  createAction,
} from '@/store/modules/common';

const moduleName = 'lang';
const type = setType(moduleName);

const common = {
  en: {
    loading: 'loading...',
    confirm: 'confirm',
    cancel: 'cancel',
    httpAborted: 'The request is timeout, please try again later',
  },
  zh: {
    loading: '正在加载……',
    confirm: '确认',
    cancel: '取消',
    httpAborted: '请求超时，请稍候再试',
  },
};

const state = {
  user: null,
  basic: null,
  common: common[globals.get('CONFIG.lang')],
  items: null,
  total: 0,
};

const mutations = {
  [type(LANG_LIST)](state, data) {
    _.forEach(data, (value, key) => {
      state[key] = value;
    });
  },
  [type(LANG_LIST_ALL)]: createMutation('list'),
  [type(LANG_UPDATE)]: createMutation('update'),
  [type(LANG_ADD)]: createMutation('add'),
};

const langList = async ({ commit }, category) => {
  let catList = category;
  if (!_.isArray(catList)) {
    catList = [category];
  }
  catList = _.filter(catList, cat => !state[cat]);
  if (catList.length === 0) {
    return;
  }
  const res = await http.get(`${LANGS}/lang`)
    .query({
      category: catList,
    });
  commit(type(LANG_LIST), res.body);
};


export const actions = {
  langList,
  langListAll: createAction('list', type(LANG_LIST_ALL), LANGS),
  langUpdate: createAction('update', type(LANG_UPDATE), LANGS),
  langAdd: createAction('add', type(LANG_ADD), LANGS),
};

export default {
  state,
  mutations,
};
