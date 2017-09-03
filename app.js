const express = require('express');
const util = require('util');
const fs = require('fs');
const path = require('path');


const config = require('./config/base');

const readFile = util.promisify(fs.readFile);
const app = express();
const port = process.env.PORT || 3018;

const pageUrls = [
  '/',
  '/register',
  '/login',
  '/lang',
  '/mock',
  '/monitor',
  '/setting',
];

function setConfig(html, lang = 'en') {
  const {
    staticMount,
    staticPrefix,
    appUrlPrefix,
  } = config;
  const reg = new RegExp(`${staticMount}/`, 'g');
  const newHtml = html.replace("env: 'development'", `env: '${config.env}'`)
    .replace('{{server}}', config.server)
    .replace('{{dc}}', config.dc)
    .replace("lang: 'en'", `lang: '${lang}'`)
    .replace("appUrlPrefix: ''", `appUrlPrefix: '${config.appUrlPrefix}'`);
  if (!staticPrefix && !appUrlPrefix) {
    return newHtml;
  }
  return newHtml.replace(reg, `${staticMount}/`);
}

async function pageRender(req, res) {
  const html = await readFile(path.resolve(config.assetPath, 'index.html'), 'utf8');
  let maxAge = 600;
  if (config.env === 'development') {
    maxAge = 0;
  }
  res.set('Cache-Control', `public, max-age=${maxAge}`);
  res.send(setConfig(html, req.lang));
}

// for dev test
if (process.env.DEV) {
  const proxyMiddleware = require('http-proxy-middleware');
  app.use(proxyMiddleware('/api', {
    target: 'http://127.0.0.1:5018',
  }));
}

app.use(config.staticMount, express.static(config.staticPath, {
  setHeaders: (res) => {
    if (config.env !== 'development') {
      res.set('Cache-Control', 'public, max-age=31536000, s-maxage=3600');
    }
  },
}));


app.use((req, res, next) => {
  const {
    appUrlPrefix,
  } = config;
  if (appUrlPrefix && req.url.indexOf(appUrlPrefix) === 0) {
    req.url = req.url.substring(appUrlPrefix.length);
  }
  req.originalUrl = req.url;
  if (!req.url) {
    res.redirect(`${config.appUrlPrefix}/`);
  }
  next();
});

app.use((req, res, next) => {
  const arr = req.url.split('/');
  if (['zh', 'en'].includes(arr[1])) {
    req.lang = arr[1];
    arr.splice(1, 1);
    req.url = arr.join('/') || '/';
  }
  req.originalUrl = req.url;
  next();
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

pageUrls.forEach((pageUrl) => {
  app.get(pageUrl, async (req, res) => {
    try {
      await pageRender(req, res);
    } catch (err) {
      console.error(err.stack);
      // TODO ERROR page
      res.status(500).send(err.message);
    }
  });
});

app.listen(port);

console.info(`> Listening at http://127.0.0.1:${port}/`);
