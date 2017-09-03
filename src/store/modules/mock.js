import { MOCKS } from '@/http/apis';
import { setType } from '@/helpers/utils';
import {
  MOCK_LIST,
  MOCK_UPDATE,
  MOCK_ADD,
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
  [type(MOCK_LIST)]: createMutation('list'),
  [type(MOCK_UPDATE)]: createMutation('update'),
  [type(MOCK_ADD)]: createMutation('add'),
};

export const actions = {
  mockList: createAction('list', type(MOCK_LIST), MOCKS),
  mockUpdate: createAction('update', type(MOCK_UPDATE), MOCKS),
  mockAdd: createAction('add', type(MOCK_ADD), MOCKS),
};

export default {
  state,
  mutations,
};
