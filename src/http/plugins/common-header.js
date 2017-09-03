import shortid from 'shortid';

export default function common(req) {
  req.set({
    'X-Requested-With': 'XMLHttpRequest',
    'X-Request-Id': shortid(),
    'X-Requested-At': Date.now(),
  });
  if (!req.get('Accept')) {
    req.set('Accept', 'application/json');
  }
}
