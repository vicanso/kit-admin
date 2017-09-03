const requireFiles = require.context('.', false, /\.js$/);
// 由此http的plugin有顺序要求，不能直接读取当前目录
const pluginFiles = [
  './common-header.js',
  './prefix.js',
  './lang.js',
  './stats.js',
  './error.js',
];
const plugins = pluginFiles.map(file => requireFiles(file).default);

export default plugins;
