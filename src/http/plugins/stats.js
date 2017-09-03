import _ from 'lodash';

import debug from '@/helpers/debug';
import httpTiming from '@/helpers/http-timing';
import {
  addHttpStats,
} from '@/helpers/local-store';

let requestCount = 0;
const doingRequest = {};
// 对于/sys/, /stats/的请求不统计性能
const rejectUrls = ['/api/sys/', '/api/stats/'];
const isReject = url => !!_.find(rejectUrls, item => url.indexOf(item) === 0);
const getProcessingTime = (serverTiming) => {
  if (!serverTiming) {
    return 0;
  }
  const result = serverTiming.match(/\S+?=(\d+\.\d+);/);
  if (!result || result.length < 2) {
    return 0;
  }
  return _.round(result[1]);
};

export default function stats(req) {
  if (isReject(req.url)) {
    return;
  }
  const url = req.url;
  const method = req.method;
  const key = `${method}:${url}`;
  requestCount += 1;
  const requestId = requestCount;
  debug('request [%d] %s', requestId, key);
  if (!doingRequest[key]) {
    doingRequest[key] = 0;
  }
  doingRequest[key] += 1;
  const count = doingRequest[key];
  if (count > 1) {
    debug('parallelRequest:%s', key);
  }
  const options = {};
  let setTiming = null;
  const finished = _.once((res) => {
    if (res && res.get) {
      const serverTiming = res.get('Server-Timing');
      const processing = getProcessingTime(serverTiming);
      const cost = Date.now() - options.startedAt;
      _.extend(options, {
        use: cost,
        processing,
        network: cost - processing,
        status: res.status,
        hit: parseInt(res.get('X-Hits') || 0, 10),
      });
      setTiming(_.extend({
        serverTiming,
      }, _.pick(options, ['status', 'use'])));
      delete options.startedAt;
      _.defer(() => {
        addHttpStats(options);
      });
    }
  });
  req.once('request', () => {
    options.url = req.url;
    options.method = req.method;
    options.startedAt = Date.now();
    options.status = -1;
    setTiming = httpTiming.add(_.pick(options, ['method', 'url']));
  });
  req.once('error', finished);
  req.once('response', finished);
}
