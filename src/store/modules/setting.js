import { SETTINGS } from '@/http/apis';
import { setType } from '@/helpers/utils';
import {
  SETTING_LIST,
  SETTING_UPDATE,
  SETTING_ADD,
} from '@/store/mutation-types';
import {
  createMutation,
  createAction,
} from '@/store/modules/common';

const moduleName = 'mock';
const type = setType(moduleName);

const state = {
  total: 0,
  items: null,
};

const mutations = {
  [type(SETTING_LIST)]: createMutation('list'),
  [type(SETTING_UPDATE)]: createMutation('update'),
  [type(SETTING_ADD)]: createMutation('add'),
};

export const actions = {
  settingList: createAction('list', type(SETTING_LIST), SETTINGS),
  settingUpdate: createAction('update', type(SETTING_UPDATE), SETTINGS),
  settingAdd: createAction('add', type(SETTING_ADD), SETTINGS),
};

export default {
  state,
  mutations,
};
