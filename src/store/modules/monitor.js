import { MONITORS } from '@/http/apis';
import { setType } from '@/helpers/utils';
import {
  MONITOR_LIST,
  MONITOR_UPDATE,
  MONITOR_ADD,
} from '@/store/mutation-types';
import {
  createMutation,
  createAction,
} from '@/store/modules/common';

const moduleName = 'monitor';
const type = setType(moduleName);

const state = {
  total: 0,
  items: null,
};

const mutations = {
  [type(MONITOR_LIST)]: createMutation('list'),
  [type(MONITOR_UPDATE)]: createMutation('update'),
  [type(MONITOR_ADD)]: createMutation('add'),
};

export const actions = {
  monitorList: createAction('list', type(MONITOR_LIST), MONITORS),
  monitorUpdate: createAction('update', type(MONITOR_UPDATE), MONITORS),
  monitorAdd: createAction('add', type(MONITOR_ADD), MONITORS),
};

export default {
  state,
  mutations,
};
