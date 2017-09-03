import _ from 'lodash';
import * as http from '@/http';

function list(state, data) {
  if (data.count) {
    state.total = data.count;
  }
  state.items = data.items;
}

function update(state, { id, data }) {
  const items = state.items;
  /* eslint no-underscore-dangle:0 */
  const index = _.findIndex(items, item => item._id === id);
  _.extend(items[index], data);
}

function add(state, data) {
  state.items.push(data);
}


function createListAction(mutationType, url) {
  return async ({ commit }, query) => {
    const res = await http.get(url)
      .query(query);
    commit(mutationType, res.body);
  };
}

function createAddAction(mutationType, url) {
  return async ({ commit }, data) => {
    const res = await http.post(url, data);
    commit(mutationType, res.body);
  };
}

function createUpdateAction(mutationType, url) {
  return async ({ commit }, { id, data }) => {
    await http.patch(`${url}/${id}`, data);
    commit(mutationType, {
      id,
      data,
    });
  };
}

export function createMutation(type) {
  const fns = {
    list,
    update,
    add,
  };
  return fns[type] || _.noop;
}

export function createAction(type, mutationType, url) {
  const fns = {
    list: createListAction,
    update: createUpdateAction,
    add: createAddAction,
  };
  return (fns[type] || _.noop)(mutationType, url);
}
