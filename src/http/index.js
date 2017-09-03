import * as request from 'superagent';
import _ from 'lodash';

import plugins from '@/http/plugins';

request.Request.prototype.version = function version(v) {
  this.url = `/v${v}${this.url}`;
  return this;
};
request.Request.prototype.noCache = function noCache() {
  const method = this.method;
  // if get and head set Cache-Control:no-cache header
  // the If-None-Match field will not be added
  if (method === 'GET' || method === 'HEAD') {
    this.query({
      'cache-control': 'no-cache',
    });
  } else {
    this.set('Cache-Control', 'no-cache');
  }
  return this;
};

// request timeout(ms)
let requestTimeout = 5 * 1000;

export function timeout(ms) {
  if (_.isNumber(ms)) {
    requestTimeout = ms;
  }
  return requestTimeout;
}

function defaultHandle(req) {
  if (requestTimeout) {
    req.timeout(requestTimeout);
  }
  req.sortQuery();
  _.forEach(plugins, plugin => req.use(plugin));
  return req;
}

export function get(...args) {
  const req = request.get(...args);
  return defaultHandle(req);
}

export function post(...args) {
  const req = request.post(...args);
  return defaultHandle(req);
}

export function del(...args) {
  const req = request.del(...args);
  return defaultHandle(req);
}

export function put(...args) {
  const req = request.put(...args);
  return defaultHandle(req);
}

export function patch(...args) {
  const req = request.patch(...args);
  return defaultHandle(req);
}
