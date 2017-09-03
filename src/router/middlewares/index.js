// 将middlewares文件夹内，除index.js以外的文件所export的default function
// 放到middlewares数组中，export出去
// https://webpack.github.io/docs/context.html#context-module-api

const requireFiles    = require.context('.', false, /\.js$/);
const middlewareFiles = requireFiles.keys().filter(key => key !== './index.js');
const middlewares     = middlewareFiles.map(file => requireFiles(file).default);

export default middlewares;
