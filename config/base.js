const path = require('path');

const appUrlPrefix = process.env.APP_URL_PREFIX || '';
const assetsSubDirectory = 'static';
const assetsPublicPath = `${appUrlPrefix}/`;

exports.assetsSubDirectory = assetsSubDirectory;
exports.assetsPublicPath = assetsPublicPath;
exports.staticMount = assetsPublicPath + assetsSubDirectory;

exports.assetPath  = path.resolve(__dirname, '../dist');
exports.staticPath = path.resolve(__dirname, '../dist/static');

exports.env = process.env.NODE_ENV || 'development';
exports.server = process.env.SERVER || 'unknown';
exports.dc = process.env.DC || 'unknown';
exports.appUrlPrefix = appUrlPrefix;
