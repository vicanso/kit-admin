import globals from '@/helpers/globals';
import {
  getLang,
} from '@/store';

const APP_NAME = globals.get('CONFIG.app');

export default function errorHandler(req) {
  // 对出错信息做统计处理
  req.once('error', (err) => {
    const res = err.response;
    // TODO 主动中断，或者网络异常的出错
    if (!res) {
      if (err.code === 'ECONNABORTED') {
        err.message = getLang('common.httpAborted');
      }
      return;
    }
    const id = res.get('X-Response-Id');
    const body = res.body;
    if (id && body) {
      const code = body.code.replace(`${APP_NAME}-`, '');
      err.message = `${body.message} [${code}-${id.substring(0, 4)}]`;
    }
  });
}
