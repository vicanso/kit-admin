import Vue from 'vue';
import _ from 'lodash';

Vue.filter('number', (value, precision) => {
  const v = parseFloat(value);
  if (_.isNil(precision)) {
    return v.toLocaleString();
  }
  return _.round(v, precision).toLocaleString();
});

Vue.filter('capitalize', (value) => {
  if (!value) {
    return '';
  }
  const v = value.toString();
  return v.charAt(0).toUpperCase() + v.substring(1);
});
