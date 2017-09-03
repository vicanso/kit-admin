import _ from 'lodash';
import * as http from '@/http';

import {
  USERS,
  USERS_ROLES,
} from '@/http/apis';

import {
  createMutation,
  createAction,
} from '@/store/modules/common';

import { setType } from '@/helpers/utils';
import {
  USER_LIST,
  USER_ROLES_UPDATE,
} from '@/store/mutation-types';

const moduleName = 'account';
const type = setType(moduleName);

const state = {
  items: null,
  total: 0,
};

const mutations = {
  [type(USER_ROLES_UPDATE)](state, data) {
    /* eslint no-underscore-dangle:0 */
    const item = _.find(state.items, item => item._id === data.id);
    item.roles = data.roles;
  },
  [type(USER_LIST)]: createMutation('list'),
};


const accountRolesUpdate = async ({ commit }, data) => {
  const url = USERS_ROLES.replace(':id', data.id);
  await http.patch(url, {
    roles: data.roles,
  });
  commit(type(USER_ROLES_UPDATE), data);
};


export const actions = {
  accountList: createAction('list', type(USER_LIST), USERS),
  accountRolesUpdate,
};


export default {
  state,
  mutations,
};
