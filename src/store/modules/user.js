import {
  USERS_ME,
  USERS_LOGIN,
  USERS_REGISTER,
  USERS_LOGOUT,
} from '@/http/apis';
import * as http from '@/http';
import { sha256 } from '@/helpers/crypto';
import {
  setType,
  genPassword,
} from '@/helpers/utils';
import {
  USER_INFO,
} from '@/store/mutation-types';

const moduleName = 'user';
const type = setType(moduleName);

const state = {
  info: null,
};

const mutations = {
  [type(USER_INFO)](state, data) {
    state.info = data;
  },
};


const userGet = async ({ commit }) => {
  const res = await http.get(USERS_ME)
    .noCache();
  commit(type(USER_INFO), res.body);
};

const userLogin = async ({ commit }, { account, password }) => {
  let res = await http.get(USERS_LOGIN)
    .noCache();
  const token = res.body.token;
  const code = sha256(genPassword(account, password) + token);
  res = await http.post(USERS_LOGIN, {
    account,
    password: code,
  });
  commit(type(USER_INFO), res.body);
};

const userRegister = async ({ commit }, { account, password, email }) => {
  const res = await http.post(USERS_REGISTER, {
    account,
    password: genPassword(account, password),
    email,
  });
  commit(type(USER_INFO), res.body);
};

const userLogout = async ({ commit }) => {
  await http.del(USERS_LOGOUT)
    .noCache();
  commit(type(USER_INFO), {
    anonymous: true,
  });
};

export const actions = {
  userGet,
  userLogin,
  userRegister,
  userLogout,
};

export default {
  state,
  mutations,
};
