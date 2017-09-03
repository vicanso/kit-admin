import * as store from 'store/dist/store.modern';
import _ from 'lodash';
import EE from 'eventemitter3';

const emiter = new EE();

// 避免乱用本地缓存，所有缓存的key都需要先定义
const validKeys = [
  'stats',
];

export function on(...args) {
  emiter.on(...args);
}

export function set(key, value) {
  if (!_.includes(validKeys, key)) {
    throw new Error('invalid key');
  }
  store.set(key, value);
}

export function get(key) {
  return store.get(key);
}

export function remove(key) {
  return store.remove(key);
}

function createAddStats(category) {
  return function add(data) {
    const key = 'stats';
    const arr = get(key) || [];
    const max = 10;
    arr.push({
      category,
      ...data,
    });
    if (arr.length > max) {
      arr.shift();
    }
    set(key, arr);
    if (arr.length >= max) {
      emiter.emit(`${key}-full`);
    }
  };
}

export const addHttpStats = createAddStats('ajax');

export const addRouterStats = createAddStats('router');
