// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'es6-promise/auto';

import Vue from 'vue';
import _ from 'lodash';
import VuexRouterSync from 'vuex-router-sync';
import {
  Loading,
  Message,
  Form,
  FormItem,
  Input,
  Button,
  Menu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Submenu,
  Table,
  TableColumn,
  Pagination,
  Option,
  Select,
} from 'element-ui';
import '@/assets/theme/index.css';
import '@/assets/icons/iconfont.css';

import App from '@/app';
import router from '@/router';
import store from '@/store';

import * as statsService from '@/services/stats';
import '@/directives/index';
import '@/filters/index';
import globals from '@/helpers/globals';

const env = globals.get('CONFIG.env');

Vue.config.productionTip = env === 'production';

Vue.config.errorHandler = (err, vm, info) => {
  if (env === 'development') {
    // eslint-disable-next-line
    console.error(info);
    throw err;
  } else {
    // TODO add error log to backend
    console.error(err);
  }
};

VuexRouterSync.sync(store, router);

// 注入 router 和 store
Vue.$router = router;
Vue.$store = store;
// 注入全局都需要使用的ui组件
Vue.use(Loading)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Button)
  .use(Menu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Submenu)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Option)
  .use(Select);

Vue.prototype.$message = Message;
Vue.prototype.$alert = (err) => {
  Message({
    showClose: true,
    message: err.message,
    type: 'error',
  });
  if (env === 'development') {
    throw err;
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

_.defer(() => {
  statsService.startWatchStats();
  statsService.page();
});
