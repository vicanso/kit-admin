import Vue from 'vue';

Vue.directive('focus', {
  inserted: e => e.focus(),
});
