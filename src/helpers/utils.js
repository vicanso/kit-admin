import _ from 'lodash';
import globals from '@/helpers/globals';
import { sha256 } from '@/helpers/crypto';

export const setType = moduleName => mutationName => `${moduleName}/${mutationName}`; // eslint-disable-line

export const genPassword = (account, password) => {
  const pwd = sha256(password);
  const app = globals.get('CONFIG.app', 'unknown');
  return sha256(`${account}-${pwd}-${app}`);
};

export function isJsonString(str) {
  if (!str || !_.isString(str)) {
    return false;
  }
  return str.charAt(0) === '{' && str.charAt(str.length - 1) === '}';
}

export function jsonIsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
