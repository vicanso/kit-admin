import _ from 'lodash';

import globals from '@/helpers/globals';
import * as http from '@/http';
import * as localStore from '@/helpers/local-store';
import {
  STATS_PAGE,
  STATS_EXCEPTION,
  STATS,
} from '@/http/apis';

export function exceptions(data) {
  return http.post(STATS_EXCEPTION, data);
}

let isWatching = false;
export function startWatchStats() {
  if (isWatching) {
    return;
  }
  isWatching = true;
  localStore.on('stats-full', async () => {
    const statsKey = 'stats';
    const stats = localStore.get(statsKey);
    localStore.remove(statsKey);
    try {
      await http.post(STATS, stats);
    } catch (err) {
      console.error(err);
    }
  });
}

/**
 * 收集加载页面的数据，包括：
 * 屏幕数据
 * js加载时间
 * 页面加载时间
 */
export async function page() {
  const timing = globals.get('TIMING');
  const screenData = _.pick(
    globals.get('screen'),
    'width height availWidth availHeight'.split(' '),
  );
  const data = { screen: screenData };

  timing.end('js');
  timing.end('page');
  data.timing = timing.toJSON();
  try {
    await http.post(STATS_PAGE, data);
  } catch (err) {
    console.error(err);
  }
}
